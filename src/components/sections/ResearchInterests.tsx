import { getResearchInterests } from "@/lib/data";
import { Section } from "./Section";

/** Edit content/research-interests.yml. */
export function ResearchInterests() {
  const { heading, interests } = getResearchInterests();
  if (interests.length === 0) return null;

  return (
    <Section id="research" heading={heading}>
      <div className="interest-pills">
        {interests.map((label) => (
          <span key={label} className="pill">
            {label}
          </span>
        ))}
      </div>
    </Section>
  );
}
