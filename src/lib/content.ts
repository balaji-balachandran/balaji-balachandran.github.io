import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

/** Content lives in this repo, under content/. */
export const CONTENT_ROOT = path.join(process.cwd(), "content");

export type CollectionName = "publications" | "teaching" | "portfolio";

const DIRS: Record<CollectionName, string> = {
  publications: "publications",
  teaching: "teaching",
  portfolio: "portfolio",
};

export interface Doc {
  slug: string;
  /** Original permalink from the source frontmatter, kept for reference. */
  permalink?: string;
  title: string;
  date?: string;
  excerpt?: string;
  venue?: string;
  location?: string;
  type?: string;
  category?: string;
  citation?: string;
  paperurl?: string;
  slidesurl?: string;
  bibtexurl?: string;
  tags?: string[];
  body: string;
  sourceFile: string;
}

/** Entries are named `YYYY-MM-DD-title.md`; strip the date for a clean slug. */
function slugFromFilename(file: string): string {
  return file
    .replace(/\.(md|markdown|html)$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readDir(dir: string): string[] {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.(md|markdown|html)$/i.test(f))
    .filter((f) => !f.startsWith("."));
}

/** All entries in a collection, newest first. */
export function getCollection(name: CollectionName): Doc[] {
  const dir = DIRS[name];
  const docs = readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_ROOT, dir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      ...(data as Omit<Doc, "slug" | "body" | "sourceFile">),
      title: String(data.title ?? slugFromFilename(file)),
      // YAML gives Date objects; normalise to ISO strings so they survive the
      // server -> client boundary.
      date: data.date ? new Date(data.date).toISOString() : undefined,
      slug: slugFromFilename(file),
      body: content,
      sourceFile: path.join(dir, file),
    } as Doc;
  });

  // Some entries carry duplicate `permalink` values, so slugs come from the
  // filename instead; that keeps every document reachable.
  const seen = new Map<string, string>();
  for (const d of docs) {
    const clash = seen.get(d.slug);
    if (clash) {
      console.warn(`[content] duplicate slug "${d.slug}": ${clash} vs ${d.sourceFile}`);
    }
    seen.set(d.slug, d.sourceFile);
  }

  return docs.sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0));
}

export interface SiteConfig {
  title?: string;
  description?: string;
  url?: string;
  author?: {
    name?: string;
    avatar?: string;
    bio?: string;
    description?: string;
    location?: string;
    email?: string;
    googlescholar?: string;
    github?: string;
    linkedin?: string;
  };
  [k: string]: unknown;
}

/**
 * config.yml uses YAML anchors (&name / *name), which js-yaml resolves
 * natively.
 */
export function getSiteConfig(): SiteConfig {
  const full = path.join(CONTENT_ROOT, "config.yml");
  if (!fs.existsSync(full)) return {};
  return (yaml.load(fs.readFileSync(full, "utf8")) ?? {}) as SiteConfig;
}
