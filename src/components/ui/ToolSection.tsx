interface ToolSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ToolSection({ title, children, className = "" }: ToolSectionProps) {
  return (
    <div className={`rounded-xl border border-border p-4 sm:p-6 ${className}`}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      )}
      {children}
    </div>
  );
}
