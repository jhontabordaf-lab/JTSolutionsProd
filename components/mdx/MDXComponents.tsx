import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX without import
  Callout,

  // Headings
  h2: ({ children }) => (
    <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text tracking-tight mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-semibold text-xl text-light-text dark:text-dark-text tracking-tight mt-8 mb-3">
      {children}
    </h3>
  ),

  // Body
  p: ({ children }) => (
    <p className="text-base sm:text-[17px] text-light-muted dark:text-dark-muted leading-[1.75] mb-5">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-light-text dark:text-dark-text">
      {children}
    </strong>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="mb-5 flex flex-col gap-2 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 flex flex-col gap-2 pl-0 list-none counter-reset-[item]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-base text-light-muted dark:text-dark-muted leading-relaxed">
      <span
        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  ),

  // Divider
  hr: () => (
    <hr className="my-10 border-0 border-t border-light-border dark:border-dark-border" />
  ),

  // Blockquote — fallback if Callout not used
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-brand pl-6 text-light-muted dark:text-dark-muted italic">
      {children}
    </blockquote>
  ),
};
