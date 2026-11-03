import { getTeaching } from "@/lib/data";
import { Section } from "./Section";
import { ColoredName } from "./ColoredName";

const SEP = " · ";

/** Edit content/teaching.yml. */
export function Teaching() {
  const entries = getTeaching();
  if (entries.length === 0) return null;

  return (
    <Section id="teaching" heading="Teaching">
      {entries.map((e, i) => (
        <article key={`${e.classname}-${i}`} className="entry">
          <h3 className="entry__title">{e.classname}</h3>
          {(e.role || e.university || e.date) && (
            <p className="meta">
              {e.role}
              {e.role && e.university && SEP}
              {e.university && (
                <ColoredName
                  name={e.university}
                  colors={e.colors}
                  className="teaching__university"
                />
              )}
              {(e.role || e.university) && e.date && SEP}
              {e.date}
            </p>
          )}
        </article>
      ))}
    </Section>
  );
}
