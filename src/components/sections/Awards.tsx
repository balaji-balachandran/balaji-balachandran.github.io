import { getAwards } from "@/lib/data";
import { Section } from "./Section";

/** Edit content/awards.yml. */
export function Awards() {
  const entries = getAwards();
  if (entries.length === 0) return null;

  return (
    <Section id="awards" heading="Awards">
      <ul className="awards">
        {entries.map((e, i) => (
          <li key={`${e.award}-${i}`} className="awards__item">
            {/* Both fields accept inline HTML, as in the other sections. */}
            <span
              className="awards__name"
              dangerouslySetInnerHTML={{ __html: e.award }}
            />
            {e.date && (
              <span
                className="awards__date"
                dangerouslySetInnerHTML={{ __html: String(e.date) }}
              />
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
