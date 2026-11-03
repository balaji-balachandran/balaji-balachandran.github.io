import { getBiography } from "@/lib/data";
import { getSiteConfig } from "@/lib/content";
import { Section } from "./Section";

/** Edit content/biography.yml. */
export function Biography() {
  const { heading, paragraphs, note } = getBiography();
  const cfg = getSiteConfig();

  return (
    <Section id="biography" heading={heading} showHeading={false}>
      {/*
        The page had no <h1> at all -- it started at <h2> -- which leaves
        crawlers without a top-level subject for the document. This supplies
        one without changing the design: .visually-hidden keeps it out of
        sight but in the accessibility tree and the markup.
      */}
      <h1 className="visually-hidden">
        {cfg.author?.name ?? heading}
        {cfg.author?.description ? ` - ${cfg.author.description}` : ""}
      </h1>

      {paragraphs.map((html, i) => (
        <div key={i} className="content-text" dangerouslySetInnerHTML={{ __html: html }} />
      ))}

      {note?.text && (
        <div className="collab-box">
          {note.icon && <i className={note.icon} />}{" "}
          <span dangerouslySetInnerHTML={{ __html: note.text }} />
        </div>
      )}
    </Section>
  );
}
