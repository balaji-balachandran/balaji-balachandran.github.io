import { Item } from "@/lib/data";
import { getSiteConfig } from "@/lib/content";
import { formatDate, renderMarkdown } from "@/lib/markdown";
import { CiteButton } from "./CiteButton";
import { asset } from "@/lib/base-path";

/** One item in a list-backed section (publication, course, project). */
export async function Entry({ item }: { item: Item }) {
  const links = [
    item.paper && { label: "Paper", href: asset(item.paper) },
    item.slides && { label: "Slides", href: asset(item.slides) },
    item.bibtex && { label: "BibTeX", href: asset(item.bibtex) },
  ].filter(Boolean) as { label: string; href: string }[];

  // `description` wins; `summary` is the fallback.
  const body = item.description
    ? await renderMarkdown(item.description)
    : (item.summary ?? "");

  // Emphasise the site owner's own name in the author list.
  const me = getSiteConfig().author?.name?.trim().toLowerCase();

  return (
    <article className="entry">
      <h3 className="entry__title">{item.title}</h3>

      {item.authors && item.authors.length > 0 && (
        <p className="authors">
          {item.authors.map((name, i) => (
            <span key={`${name}-${i}`}>
              {i > 0 && ", "}
              <span
                className={
                  me && name.trim().toLowerCase() === me ? "authors__self" : undefined
                }
              >
                {name}
              </span>
            </span>
          ))}
        </p>
      )}
      <p className="meta">
        {[item.type, item.venue, item.location, formatDate(item.date)]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {body && <div className="excerpt" dangerouslySetInnerHTML={{ __html: body }} />}
      {(links.length > 0 || item.citation) && (
        <div className="links">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="btn" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
          {item.citation && <CiteButton citation={item.citation} />}
        </div>
      )}
    </article>
  );
}
