/** Shared wrapper: gives every section its anchor id and heading. */
export function Section({
  id,
  heading,
  showHeading = true,
  children,
}: {
  id: string;
  heading: string;
  /** The biography leads the page, so it uses the page title instead. */
  showHeading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      {showHeading && <h2 className="section-title">{heading}</h2>}
      {children}
    </section>
  );
}
