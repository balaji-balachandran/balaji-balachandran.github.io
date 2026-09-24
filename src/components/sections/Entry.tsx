import { Item } from "@/lib/data";
import { formatDate, renderMarkdown } from "@/lib/markdown";

/** One item in a list-backed section (publication, course, project). */
export async function Entry({ item }: { item: Item }) {
  const links = [
    item.paper && { label: "Paper", href: item.paper },
    item.slides && { label: "Slides", href: item.slides },
    item.bibtex && { label: "BibTeX", href: item.bibtex },
  ].filter(Boolean) as { label: string; href: string }[];

  // `description` wins; `summary` is the fallback.
  const body = item.description
    ? await renderMarkdown(item.description)
    : (item.summary ?? "");

  return (
    <article className="entry">
      <h3 className="entry__title">{item.title}</h3>
      <p className="meta">
        {[item.type, item.venue, item.location, formatDate(item.date)]
          .filter(Boolean)
          .join(" | ")}
      </p>
      {body && <div className="excerpt" dangerouslySetInnerHTML={{ __html: body }} />}
      {links.length > 0 && (
        <p className="links">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="btn" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </p>
      )}
      {item.citation && (
        <p className="citation-inline" dangerouslySetInnerHTML={{ __html: item.citation }} />
      )}
    </article>
  );
}
