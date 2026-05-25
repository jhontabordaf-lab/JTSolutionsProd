import fs from "fs";
import path from "path";
import matter from "gray-matter";

const casosDir = path.join(process.cwd(), "content", "casos");

export interface CaseFrontmatter {
  title: string;
  excerpt: string;
  client: string;
  industry: string;
  services: string[];
  date: string;
  duration: string;
  featured?: boolean;
  results: Array<{ metric: string; label: string }>;
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseFrontmatter;
  content: string;
}

export function getCaseSlugs(): string[] {
  return fs
    .readdirSync(casosDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseBySlug(slug: string): CaseStudy {
  const filePath = path.join(casosDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as CaseFrontmatter,
    content,
  };
}

export function getAllCases(): CaseStudy[] {
  return getCaseSlugs()
    .map((slug) => getCaseBySlug(slug))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
