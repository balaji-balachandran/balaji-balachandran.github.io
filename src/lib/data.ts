import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { CONTENT_ROOT } from "./content";

function load<T>(file: string, fallback: T): T {
  const full = path.join(CONTENT_ROOT, file);
  if (!fs.existsSync(full)) return fallback;
  return (yaml.load(fs.readFileSync(full, "utf8")) ?? fallback) as T;
}

/* ---- content/biography.yml ---- */
export interface Biography {
  heading: string;
  paragraphs: string[];
  note?: { icon?: string; text?: string };
}
export const getBiography = () =>
  load<Biography>("biography.yml", { heading: "Biography", paragraphs: [] });

/* ---- content/research-interests.yml ---- */
export interface ResearchInterests {
  heading: string;
  interests: string[];
}
export const getResearchInterests = () =>
  load<ResearchInterests>("research-interests.yml", {
    heading: "Research Interests",
    interests: [],
  });

/* ---- content/news.yml ---- */
export interface NewsItem {
  date: string;
  text: string;
  milestone?: boolean;
}
export interface News {
  heading: string;
  items: NewsItem[];
}
export const getNews = () =>
  load<News>("news.yml", { heading: "Recent News", items: [] });

/* ---- content/publications.yml, portfolio.yml ---- */

/** One item in a list-backed section. */
export interface Item {
  title: string;
  /** Author names in order. The site author's own name is emphasised. */
  authors?: string[];
  type?: string;
  date?: string;
  venue?: string;
  location?: string;
  category?: string;
  /** Long form, rendered as markdown. */
  description?: string;
  /** Shown only when there is no description. */
  summary?: string;
  paper?: string;
  slides?: string;
  bibtex?: string;
  citation?: string;
  /** Bare DOI, e.g. 10.1145/3777912.3839788. Feeds the structured data. */
  doi?: string;
}

export type ItemList = "publications" | "portfolio";

export function getItems(list: ItemList): Item[] {
  const { items } = load<{ items?: Item[] }>(`${list}.yml`, {});
  return items ?? [];
}

/* ---- content/teaching.yml ---- */

/** Teaching entries are a simple three-field list. */
export interface TeachingEntry {
  classname: string;
  role?: string;
  university?: string;
  /**
   * Colours cycled across the words of `university`. One entry colours the
   * whole name; two alternate; and so on. Omit to use the CSS default.
   */
  colors?: string[];
  date?: string;
}

export function getTeaching(): TeachingEntry[] {
  const { items } = load<{ items?: TeachingEntry[] }>("teaching.yml", {});
  return items ?? [];
}

/* ---- content/experience.yml ---- */

/** One job / research position. */
export interface ExperienceEntry {
  /** The position title, shown as the entry heading. */
  role: string;
  organization?: string;
  /**
   * Colours cycled across the words of `organization`. One colour paints the
   * whole name; two alternate; and so on. Omit to use the CSS default.
   */
  colors?: string[];
  location?: string;
  date?: string;
  /** Optional bullet points. Each accepts inline HTML. */
  details?: string[];
}

export function getExperience(): ExperienceEntry[] {
  const { items } = load<{ items?: ExperienceEntry[] }>("experience.yml", {});
  return items ?? [];
}

/* ---- content/awards.yml ---- */

export interface AwardEntry {
  award: string;
  date?: string;
}

export function getAwards(): AwardEntry[] {
  const { items } = load<{ items?: AwardEntry[] }>("awards.yml", {});
  return items ?? [];
}
