import { getBiography } from "@/lib/data";
import { getSiteConfig } from "@/lib/content";
import { Section } from "./Section";

/** Edit content/biography.yml. */
export function Biography() {
  const { heading, paragraphs, note } = getBiography();
  const cfg = getSiteConfig();

  return (
    <Section id="biography" heading={heading} showHeading={false}>
      {/* <h1 className="page__title">Hello{cfg.title ?? heading}</h1> */}

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
