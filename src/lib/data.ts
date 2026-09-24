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
