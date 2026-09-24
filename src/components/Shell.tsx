import { getSiteConfig } from "@/lib/content";
import { Sidebar } from "@/components/Sidebar";

/**
 * Two-column shell: author sidebar on the left, section content on the right.
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
