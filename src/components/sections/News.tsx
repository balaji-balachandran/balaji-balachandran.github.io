import { getNews } from "@/lib/data";
import { Section } from "./Section";

/** Edit content/news.yml. */
export function News() {
  const { heading, items } = getNews();
  if (items.length === 0) return null;

  return (
    <Section id="news" heading={heading}>
      <div className="news-scroll-container">
        {items.map((item, i) => (
          <div
            key={`${item.date}-${i}`}
            className={item.milestone ? "timeline-item milestone" : "timeline-item"}
          >
            <div className="timeline-date">{item.date}</div>
            <div
              className="timeline-content"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
