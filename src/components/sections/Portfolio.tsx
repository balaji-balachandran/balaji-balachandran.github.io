import { getCollection } from "@/lib/content";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Add or edit files in content/portfolio/. */
export async function Portfolio() {
  const docs = getCollection("portfolio");
  if (docs.length === 0) return null;

  return (
    <Section id="portfolio" heading="Portfolio">
      {await Promise.all(docs.map((doc) => <Entry key={doc.slug} doc={doc} />))}
    </Section>
  );
}
