import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mono";
  size?: number;
  className?: string;
}

export function Logo({ variant = "full", size = 36, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {variant === "full" && (
        <span
          className="flex items-baseline leading-none"
          aria-label="JT Solutions"
        >
          <span className="font-display font-bold text-[1.1rem] text-light-text dark:text-dark-text tracking-tight">
            JT
          </span>
          <span className="font-body font-medium text-[1.1rem] text-light-muted dark:text-dark-muted tracking-tight">
            Solutions
          </span>
        </span>
      )}
    </div>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="44" height="44" rx="9" fill="#2563FF" />
      {/* J — vertical stem + left hook at bottom */}
      <rect x="12" y="9" width="5" height="19" fill="white" />
      <rect x="7" y="23" width="10" height="5" fill="white" />
      {/* T — crossbar + centered stem */}
      <rect x="21" y="9" width="14" height="5" fill="white" />
      <rect x="26" y="14" width="4" height="21" fill="white" />
    </svg>
  );
}
