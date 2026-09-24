import { getItems } from "@/lib/data";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Edit content/portfolio.yml. */
export async function Portfolio() {
  const items = getItems("portfolio");
  if (items.length === 0) return null;

  return (
    <Section id="portfolio" heading="Portfolio">
      {await Promise.all(
        items.map((item, i) => <Entry key={`${item.title}-${i}`} item={item} />),
      )}
    </Section>
  );
}
