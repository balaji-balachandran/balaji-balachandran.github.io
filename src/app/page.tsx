import {
  getPage,
  getSiteConfig,
  getCollection,
  showsAuthorProfile,
  Doc,
} from "@/lib/content";
import { renderMarkdown, formatDate } from "@/lib/markdown";
import { Shell } from "@/components/Shell";

/** Sections rendered down the single page, in order. */
const SECTIONS = [
  { id: "publications", heading: "Publications", name: "publications" },
  { id: "teaching", heading: "Teaching", name: "teaching" },
  { id: "portfolio", heading: "Portfolio", name: "portfolio" },
] as const;

function Entry({ doc }: { doc: Doc }) {
  const links = [
    doc.paperurl && { label: "Paper", href: doc.paperurl },
    doc.slidesurl && { label: "Slides", href: doc.slidesurl },
    doc.bibtexurl && { label: "BibTeX", href: doc.bibtexurl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article className="entry">
      <h3 className="entry__title">{doc.title}</h3>
      <p className="meta">
        {[doc.type, doc.venue, doc.location, formatDate(doc.date)]
          .filter(Boolean)
          .join(" | ")}
      </p>
      {doc.excerpt && (
        <div className="excerpt" dangerouslySetInnerHTML={{ __html: doc.excerpt }} />
      )}
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

export default async function Home() {
  const cfg = getSiteConfig();
  const about = getPage("about");
  const bio = about ? await renderMarkdown(about.body) : "";

  return (
    <Shell showSidebar={showsAuthorProfile("about")}>
      {/* _pages/about.md already contains its own "Research Interests" and
          "Recent News" headings, so it is rendered as one biography block. */}
      <section id="biography" className="section">
        <h1 className="page__title">{about?.title ?? cfg.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: bio }} />
      </section>

      {SECTIONS.map(({ id, heading, name }) => {
        const docs = getCollection(name);
        if (docs.length === 0) return null;
        return (
          <section key={id} id={id} className="section">
            <h2 className="section__heading">{heading}</h2>
            {docs.map((d) => (
              <Entry key={d.slug} doc={d} />
            ))}
          </section>
        );
      })}
    </Shell>
  );
}
