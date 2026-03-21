"use client";

interface ToolTextareaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  className?: string;
}

export default function ToolTextarea({
  value,
  onChange,
  label,
  placeholder = "Enter text...",
  rows = 8,
  readOnly = false,
  className = "",
}: ToolTextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className="w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
