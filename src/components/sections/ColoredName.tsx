/**
 * Renders an institution/company name, cycling `colors` across its words.
 * One colour paints the whole name, two alternate, and so on. With no colors
 * the name is left to the stylesheet.
 *
 * Shared by Teaching and Experience.
 */
export function ColoredName({
  name,
  colors,
  className,
}: {
  name: string;
  colors?: string[];
  className?: string;
}) {
  if (!colors || colors.length === 0) {
    return <span className={className}>{name}</span>;
  }

  const words = name.split(/(\s+)/); // keep the whitespace as its own entries
  let wordIndex = 0;

  return (
    <span className={className}>
      {words.map((part, i) => {
        if (/^\s+$/.test(part)) return part;
        const color = colors[wordIndex++ % colors.length];
        return (
          <span key={i} style={{ color }}>
            {part}
          </span>
        );
      })}
    </span>
  );
}
