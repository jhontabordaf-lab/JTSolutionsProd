import { cn } from "@/lib/utils";

type ContainerElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerElement;
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
