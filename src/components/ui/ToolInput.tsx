"use client";

interface ToolInputProps {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "url";
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function ToolInput({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  min,
  max,
  step,
  className = "",
}: ToolInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
