import { Doc } from "@/lib/content";
import { formatDate, renderMarkdown } from "@/lib/markdown";

/** One item in a collection-backed section (publication, course, project). */
export async function Entry({ doc }: { doc: Doc }) {
  const links = [
    doc.paperurl && { label: "Paper", href: doc.paperurl },
    doc.slidesurl && { label: "Slides", href: doc.slidesurl },
    doc.bibtexurl && { label: "BibTeX", href: doc.bibtexurl },
  ].filter(Boolean) as { label: string; href: string }[];

  // Prefer the file body (markdown, may contain math); fall back to excerpt.
  const body = doc.body.trim()
    ? await renderMarkdown(doc.body)
    : doc.excerpt ?? "";

  return (
    <article className="entry">
      <h3 className="entry__title">{doc.title}</h3>
      <p className="meta">
        {[doc.type, doc.venue, doc.location, formatDate(doc.date)]
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
      {doc.citation && (
        <p className="citation-inline" dangerouslySetInnerHTML={{ __html: doc.citation }} />
      )}
    </article>
  );
}
