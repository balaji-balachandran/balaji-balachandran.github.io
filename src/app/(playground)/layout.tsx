import type { Metadata } from "next";
import "./playground.css";

export const metadata: Metadata = {
  title: "Playground",
  // Keep experiments out of search results.
  robots: { index: false, follow: false },
};

/**
 * A second root layout, fully independent of the site's.
 *
 * Because this route group declares its own <html>/<body>, nothing from
 * src/app/(site)/layout.tsx applies here -- not globals.css, not
 * sections.css, not the masthead or footer. Only playground.css loads, so
 * you are starting from a blank slate.
 *
 * Trade-off: moving between / and /playground is a full page load rather
 * than a client-side transition. That is inherent to separate root layouts,
 * and is what guarantees the isolation.
 */
export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
