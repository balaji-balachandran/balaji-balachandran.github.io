import { getItems } from "@/lib/data";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Edit content/teaching.yml. */
export async function Teaching() {
  const items = getItems("teaching");
  if (items.length === 0) return null;

  return (
    <Section id="teaching" heading="Teaching">
      {await Promise.all(
        items.map((item, i) => <Entry key={`${item.title}-${i}`} item={item} />),
      )}
    </Section>
  );
}
