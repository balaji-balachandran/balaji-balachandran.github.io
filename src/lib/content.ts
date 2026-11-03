import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/** Content lives in this repo, under content/. */
export const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * The CV versions offered by the sidebar's Download CV button, in this order.
 * Each is a path under public/. Leave one out to drop it from the menu.
 */
export interface CvVersions {
  /** The condensed resume. */
  onepage?: string;
  /** The complete CV. */
  full?: string;
}

/** A logo shown in the sidebar's Affiliations block. */
export interface Affiliation {
  name: string;
  /** Filename in public/images/. */
  logo: string;
  url?: string;
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
    orcid?: string;
    /**
     * The CV, as a path under public/ (e.g. /files/one-page-resume.pdf), or
     * as a map of versions to offer. With more than one version the Download
     * CV button expands on click; with one it is a plain link. Omit to hide
     * the button entirely.
     */
    cv?: string | CvVersions;
  };
  /** Omit or leave empty to hide the Affiliations block. */
  affiliations?: Affiliation[];
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
