import { getCollection } from "@/lib/content";
import { Section } from "./Section";
import { Entry } from "./Entry";

/** Add or edit files in content/teaching/. */
export async function Teaching() {
  const docs = getCollection("teaching");
  if (docs.length === 0) return null;

  return (
    <Section id="teaching" heading="Teaching">
      {await Promise.all(docs.map((doc) => <Entry key={doc.slug} doc={doc} />))}
    </Section>
  );
}
