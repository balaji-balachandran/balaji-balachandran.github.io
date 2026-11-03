import { getExperience } from "@/lib/data";
import { Section } from "./Section";
import { ColoredName } from "./ColoredName";

const SEP = " · ";

/** Edit content/experience.yml. */
export function Experience() {
  const entries = getExperience();
  if (entries.length === 0) return null;

  return (
    <Section id="experience" heading="Industry Experience">
      {entries.map((e, i) => (
        <article key={`${e.role}-${i}`} className="entry">
          <h3 className="entry__title">{e.role}</h3>
          {(e.organization || e.location || e.date) && (
            <p className="meta">
              {e.organization && (
                <ColoredName
                  name={e.organization}
                  colors={e.colors}
                  className="experience__org"
                />
              )}
              {e.organization && e.location && SEP}
              {e.location}
              {(e.organization || e.location) && e.date && SEP}
              {e.date}
            </p>
          )}
          {e.details && e.details.length > 0 && (
            <ul className="experience__details">
              {e.details.map((d, j) => (
                /* Accepts inline HTML, as in the other sections. */
                <li key={j} dangerouslySetInnerHTML={{ __html: d }} />
              ))}
            </ul>
          )}
        </article>
      ))}
    </Section>
  );
}
