import ResultCard from "./ResultCard";

interface Stat {
  label: string;
  value: string | number;
}

interface ResultGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ResultGrid({ stats, columns = 3, className = "" }: ResultGridProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={`grid gap-4 ${gridCols} ${className}`}>
      {stats.map((stat) => (
        <ResultCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
}
