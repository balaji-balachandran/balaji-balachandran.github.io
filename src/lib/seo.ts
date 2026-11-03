import { getSiteConfig, type SiteConfig } from "./content";
import { getItems } from "./data";

/** The `seo:` block in content/config.yml. */
export interface SeoConfig {
  title?: string;
  description?: string;
  /** Filename in public/images/, used for the link-preview card. */
  image?: string;
  jobTitle?: string;
  affiliation?: string;
  alumniOf?: string;
  knowsAbout?: string[];
}

/**
 * The site's own absolute base, with no trailing slash -- e.g.
 * "https://cs.stanford.edu/~balajib". Taken from `url` in config.yml.
 *
 * Note this already includes the deployment subdirectory, so paths are joined
 * onto it directly rather than through asset() in src/lib/base-path.ts, which
 * would prefix the subdirectory a second time.
 */
export function siteUrl(cfg: SiteConfig = getSiteConfig()): string {
  return (cfg.url ?? "").replace(/\/+$/, "");
}

/** Joins a site-root-relative path onto siteUrl() as an absolute URL. */
export function absoluteUrl(p: string, cfg: SiteConfig = getSiteConfig()): string {
  return `${siteUrl(cfg)}${p.startsWith("/") ? p : `/${p}`}`;
}

export function getSeo(cfg: SiteConfig = getSiteConfig()): SeoConfig {
  return (cfg.seo ?? {}) as SeoConfig;
}

/** The profile URLs that identify the same person elsewhere. */
function sameAs(cfg: SiteConfig): string[] {
  const a = cfg.author ?? {};
  return [
    a.googlescholar &&
      `https://scholar.google.com/citations?user=${a.googlescholar}`,
    a.github && `https://github.com/${a.github}`,
    a.linkedin && `https://www.linkedin.com/in/${a.linkedin}`,
    a.orcid && `https://orcid.org/${a.orcid}`,
  ].filter(Boolean) as string[];
}

/**
 * Structured data for the page, as a schema.org graph: who the page is about,
 * and what they have published. Search engines use this to build knowledge
 * panels and author attribution -- it is the single highest-value SEO addition
 * for an academic page, because the prose alone does not tell a crawler that
 * "Balaji Balachandran" is a person rather than a phrase.
 */
export function buildJsonLd(cfg: SiteConfig = getSiteConfig()): object {
  const a = cfg.author ?? {};
  const seo = getSeo(cfg);
  const url = siteUrl(cfg);
  const personId = `${url}/#person`;

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: a.name,
    url,
    description: seo.description ?? a.bio ?? cfg.description,
  };
  if (a.avatar) person.image = absoluteUrl(`/images/${a.avatar}`, cfg);
  if (a.email) person.email = `mailto:${a.email}`;
  if (seo.jobTitle) person.jobTitle = seo.jobTitle;
  if (seo.affiliation) {
    person.affiliation = { "@type": "Organization", name: seo.affiliation };
    person.worksFor = { "@type": "Organization", name: seo.affiliation };
  }
  if (seo.alumniOf) {
    person.alumniOf = { "@type": "CollegeOrUniversity", name: seo.alumniOf };
  }
  if (seo.knowsAbout?.length) person.knowsAbout = seo.knowsAbout;
  const profiles = sameAs(cfg);
  if (profiles.length) person.sameAs = profiles;

  // Each publication, so the paper can surface against its own title and be
  // attributed back to the person above.
  const articles = getItems("publications").map((item) => {
    const article: Record<string, unknown> = {
      "@type": "ScholarlyArticle",
      headline: item.title,
      name: item.title,
      author: (item.authors ?? [a.name].filter(Boolean)).map((n) =>
        n === a.name ? { "@id": personId } : { "@type": "Person", name: n },
      ),
      mainEntityOfPage: { "@id": `${url}/#webpage` },
    };
    if (item.date) article.datePublished = item.date;
    if (item.summary ?? item.description) {
      article.abstract = item.summary ?? item.description;
    }
    if (item.venue) {
      article.isPartOf = { "@type": "Periodical", name: item.venue };
      article.publisher = { "@type": "Organization", name: item.venue };
    }
    if (item.paper) article.url = absoluteUrl(item.paper, cfg);
    if (item.doi) {
      // The DOI is the canonical identifier for the paper, so this is what
      // ties this page's copy to the version of record at the publisher.
      article.identifier = {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value: item.doi,
      };
      article.sameAs = `https://doi.org/${item.doi}`;
    }
    return article;
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url: `${url}/`,
        name: a.name,
        description: seo.description ?? cfg.description,
        publisher: { "@id": personId },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#webpage`,
        url: `${url}/`,
        name: seo.title ?? a.name,
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
      ...articles,
    ],
  };
}
