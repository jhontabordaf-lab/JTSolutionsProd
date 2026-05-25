import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

export function Callout({ children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "my-8 flex gap-4 rounded-card-lg border border-brand/20 bg-brand/5 px-6 py-5",
        className
      )}
    >
      <span
        className="mt-0.5 h-4 w-1 shrink-0 rounded-full bg-brand"
        aria-hidden="true"
      />
      <p className="text-sm leading-relaxed text-light-text dark:text-dark-text italic">
        {children}
      </p>
    </aside>
  );
}
