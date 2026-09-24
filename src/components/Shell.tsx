import { getSiteConfig } from "@/lib/content";
import { Sidebar } from "@/components/Sidebar";

/**
 * Two-column shell. `showSidebar` follows the page's `author_profile`
 * frontmatter, defaulting to on.
 */
export function Shell({
  showSidebar,
  children,
}: {
  showSidebar: boolean;
  children: React.ReactNode;
}) {
  const cfg = getSiteConfig();
  return (
    <div className={showSidebar ? "layout layout--sidebar" : "layout"}>
      {showSidebar && <Sidebar cfg={cfg} />}
      <div className="layout__main">{children}</div>
    </div>
  );
}
