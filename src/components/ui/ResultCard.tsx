interface ResultCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function ResultCard({ label, value, className = "" }: ResultCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-muted p-4 text-center ${className}`}>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
