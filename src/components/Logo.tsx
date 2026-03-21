/**
 * Inline SVG logo component — renders crisp at any size,
 * no external file dependency, works in both light and dark mode.
 */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Toolbox icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="6" fill="currentColor" className="text-primary" />
        <rect x="6" y="14" width="20" height="12" rx="2" fill="white" opacity="0.95" />
        <rect x="5" y="12" width="22" height="4" rx="1.5" fill="white" />
        <rect x="12" y="8" width="8" height="5" rx="1.5" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="14" y="18.5" width="4" height="4" rx="1" fill="currentColor" className="text-primary" />
      </svg>

      {showText && (
        <span className={`${s.text} font-bold tracking-tight`}>
          <span className="text-foreground">Toolbox</span>
          <span className="text-primary">Hub</span>
        </span>
      )}
    </span>
  );
}
