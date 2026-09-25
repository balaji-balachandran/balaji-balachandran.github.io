import { Shell } from "@/components/Shell";
import { SECTIONS } from "@/lib/sections";

/**
 * The whole site is this one page. Its contents come from SECTIONS in
 * src/lib/sections.tsx -- to reorder, add or remove a section, edit that list.
 */
export default function Home() {
  return (
    <Shell showSidebar>
      {SECTIONS.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </Shell>
  );
}
