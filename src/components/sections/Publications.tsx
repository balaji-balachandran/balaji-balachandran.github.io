import { getCollection } from "@/lib/content";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Add or edit files in content/publications/. */
export async function Publications() {
  const docs = getCollection("publications");
  if (docs.length === 0) return null;

  return (
    <Section id="publications" heading="Publications">
      {await Promise.all(docs.map((doc) => <Entry key={doc.slug} doc={doc} />))}
    </Section>
  );
}
