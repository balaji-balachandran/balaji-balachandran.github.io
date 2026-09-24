import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/** Content lives in this repo, under content/. */
export const CONTENT_ROOT = path.join(process.cwd(), "content");

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
    orcid?: string;
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
