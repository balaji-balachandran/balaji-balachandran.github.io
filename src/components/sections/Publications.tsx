import { getItems } from "@/lib/data";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Edit content/publications.yml. */
export async function Publications() {
  const items = getItems("publications");
  if (items.length === 0) return null;

  return (
    <Section id="publications" heading="Publications">
      {await Promise.all(
        items.map((item, i) => <Entry key={`${item.title}-${i}`} item={item} />),
      )}
    </Section>
  );
}
