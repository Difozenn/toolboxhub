"use client";

import { useState, useCallback } from "react";

interface HistoryEntry {
  expression: string;
  result: string;
}

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

type Token = { type: "number"; value: number } | { type: "op"; value: string } | { type: "func"; value: string } | { type: "paren"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, "");

  while (i < s.length) {
    if (/[0-9.]/.test(s[i])) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) { num += s[i]; i++; }
      tokens.push({ type: "number", value: parseFloat(num) });
    } else if (s[i] === "(" || s[i] === ")") {
      tokens.push({ type: "paren", value: s[i] });
      i++;
    } else if ("+-*/^".includes(s[i])) {
      // Handle unary minus
      if (s[i] === "-" && (tokens.length === 0 || tokens[tokens.length - 1].type === "op" || (tokens[tokens.length - 1].type === "paren" && tokens[tokens.length - 1].value === "("))) {
        let num = "-";
        i++;
        while (i < s.length && /[0-9.]/.test(s[i])) { num += s[i]; i++; }
        if (num === "-") {
          tokens.push({ type: "op", value: "-" });
        } else {
          tokens.push({ type: "number", value: parseFloat(num) });
        }
      } else {
        tokens.push({ type: "op", value: s[i] });
        i++;
      }
    } else if (/[a-z]/i.test(s[i])) {
      let name = "";
      while (i < s.length && /[a-z]/i.test(s[i])) { name += s[i]; i++; }
      const lower = name.toLowerCase();
      if (lower === "pi") {
        tokens.push({ type: "number", value: Math.PI });
      } else if (lower === "e" && (i >= s.length || s[i] !== "x")) {
        tokens.push({ type: "number", value: Math.E });
      } else {
        tokens.push({ type: "func", value: lower });
      }
    } else if (s[i] === "!") {
      tokens.push({ type: "op", value: "!" });
      i++;
    } else {
      i++;
    }
  }
  return tokens;
}

function parseExpression(tokens: Token[], pos: { i: number }): number {
  let left = parseTerm(tokens, pos);
  while (pos.i < tokens.length && tokens[pos.i].type === "op" && (tokens[pos.i].value === "+" || tokens[pos.i].value === "-")) {
    const op = tokens[pos.i].value;
    pos.i++;
    const right = parseTerm(tokens, pos);
    left = op === "+" ? left + right : left - right;
  }
  return left;
}

function parseTerm(tokens: Token[], pos: { i: number }): number {
  let left = parsePower(tokens, pos);
  while (pos.i < tokens.length && tokens[pos.i].type === "op" && (tokens[pos.i].value === "*" || tokens[pos.i].value === "/")) {
    const op = tokens[pos.i].value;
    pos.i++;
    const right = parsePower(tokens, pos);
    left = op === "*" ? left * right : left / right;
  }
  return left;
}

function parsePower(tokens: Token[], pos: { i: number }): number {
  let left = parseUnary(tokens, pos);
  // Handle factorial
  while (pos.i < tokens.length && tokens[pos.i].type === "op" && tokens[pos.i].value === "!") {
    pos.i++;
    left = factorial(Math.round(left));
  }
  if (pos.i < tokens.length && tokens[pos.i].type === "op" && tokens[pos.i].value === "^") {
    pos.i++;
    const right = parsePower(tokens, pos);
    left = Math.pow(left, right);
  }
  return left;
}

function parseUnary(tokens: Token[], pos: { i: number }): number {
  if (pos.i < tokens.length && tokens[pos.i].type === "op" && tokens[pos.i].value === "-") {
    pos.i++;
    return -parseAtom(tokens, pos);
  }
  return parseAtom(tokens, pos);
}

function parseAtom(tokens: Token[], pos: { i: number }): number {
  if (pos.i >= tokens.length) return NaN;
  const token = tokens[pos.i];

  if (token.type === "func") {
    pos.i++;
    // Expect parenthesis
    const arg = parseAtom(tokens, pos);
    switch (token.value) {
      case "sin": return Math.sin(arg);
      case "cos": return Math.cos(arg);
      case "tan": return Math.tan(arg);
      case "sqrt": return Math.sqrt(arg);
      case "log": return Math.log10(arg);
      case "ln": return Math.log(arg);
      case "abs": return Math.abs(arg);
      default: return NaN;
    }
  }

  if (token.type === "paren" && token.value === "(") {
    pos.i++;
    const val = parseExpression(tokens, pos);
    if (pos.i < tokens.length && tokens[pos.i].type === "paren" && tokens[pos.i].value === ")") {
      pos.i++;
    }
    return val;
  }

  if (token.type === "number") {
    pos.i++;
    return token.value;
  }

  pos.i++;
  return NaN;
}

function evaluate(expr: string): string {
  try {
    const tokens = tokenize(expr);
    if (tokens.length === 0) return "0";
    const pos = { i: 0 };
    const result = parseExpression(tokens, pos);
    if (isNaN(result)) return "Error";
    if (!isFinite(result)) return "Infinity";
    // Clean display
    const rounded = parseFloat(result.toPrecision(12));
    return String(rounded);
  } catch {
    return "Error";
  }
}

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const append = useCallback((val: string) => {
    setDisplay((prev) => (prev === "0" || prev === "Error" ? val : prev + val));
  }, []);

  const handleCalc = useCallback(() => {
    const result = evaluate(display);
    setHistory((prev) => [{ expression: display, result }, ...prev].slice(0, 20));
    setDisplay(result);
  }, [display]);

  const clear = useCallback(() => setDisplay("0"), []);
  const backspace = useCallback(() => {
    setDisplay((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  }, []);

  const opBtns = ["/", "*", "-", "+"];
  const funcBtns = [
    { label: "sin", val: "sin(" },
    { label: "cos", val: "cos(" },
    { label: "tan", val: "tan(" },
    { label: "sqrt", val: "sqrt(" }, // Changed from unicode
    { label: "log", val: "log(" },
    { label: "ln", val: "ln(" },
    { label: "x^y", val: "^" },
    { label: "n!", val: "!" },
    { label: "pi", val: "pi" },
    { label: "e", val: "e" },
    { label: ")", val: ")" },
    { label: "1/x", val: "" },
  ];

  const handleFunc = useCallback(
    (val: string, label: string) => {
      if (label === "1/x") {
        const result = evaluate(`1/(${display})`);
        setDisplay(result);
        return;
      }
      append(val);
    },
    [append, display]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          {showHistory ? "Calculator" : `History (${history.length})`}
        </button>
        {history.length > 0 && (
          <button
            onClick={() => setHistory([])}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {showHistory ? (
        <div className="rounded-xl border border-border bg-muted p-4 max-h-[420px] overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">No calculations yet</p>
          ) : (
            <div className="space-y-2">
              {history.map((entry, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDisplay(entry.result);
                    setShowHistory(false);
                  }}
                  className="w-full text-left rounded-lg border border-border bg-background p-3 hover:bg-primary/5 transition-colors"
                >
                  <p className="text-sm text-muted-foreground font-mono truncate">{entry.expression}</p>
                  <p className="text-lg font-semibold text-foreground font-mono">= {entry.result}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Display */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <div className="text-right font-mono text-2xl text-foreground break-all min-h-[40px] leading-tight">
              {display}
            </div>
          </div>

          {/* Advanced functions */}
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {funcBtns.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleFunc(btn.val, btn.label)}
                className="rounded-lg border border-border bg-muted px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Main buttons */}
          <div className="grid grid-cols-4 gap-2">
            {/* Clear and Backspace */}
            <button
              onClick={clear}
              className="rounded-lg bg-red-500/15 px-3 py-3.5 text-base font-semibold text-red-600 transition-colors hover:bg-red-500/25"
            >
              AC
            </button>
            <button
              onClick={backspace}
              className="col-span-2 rounded-lg border border-border bg-muted px-3 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              DEL
            </button>
            <button
              onClick={() => append(")")}
              className="rounded-lg border border-border bg-muted px-3 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-primary/5"
            >
              )
            </button>
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "(", "+"].map((btn) => {
              const isOp = opBtns.includes(btn);
              return (
                <button
                  key={btn}
                  onClick={() => append(btn)}
                  className={`rounded-lg px-3 py-3.5 text-base font-medium transition-colors ${
                    isOp
                      ? "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                      : "border border-border bg-muted text-foreground hover:bg-primary/5"
                  }`}
                >
                  {btn}
                </button>
              );
            })}
            <button
              onClick={handleCalc}
              className="col-span-4 rounded-lg bg-primary px-3 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary/90"
            >
              =
            </button>
          </div>
        </>
      )}
    </div>
  );
}
