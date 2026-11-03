import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "../globals.css";
import "../sections.css";
import { getSiteConfig } from "@/lib/content";
import { SECTIONS } from "@/lib/sections";
import { absoluteUrl, buildJsonLd, getSeo, siteUrl } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const cfg = getSiteConfig();
  const seo = getSeo(cfg);
  const a = cfg.author ?? {};
  const name = a.name ?? cfg.title ?? "Academic Site";
  const url = siteUrl(cfg);
  const description = seo.description ?? a.bio ?? cfg.description;
  const image = seo.image ?? a.avatar;

  return {
    // Resolves any relative URL in this object. Set from `url` in config.yml.
    metadataBase: url ? new URL(url) : undefined,
    title: {
      default: seo.title ?? name,
      template: `%s - ${name}`,
    },
    description,
    // Tells search engines which URL is the real one, so the various ways of
    // reaching this page do not look like duplicate content.
    alternates: { canonical: `${url}/` },
    authors: [{ name, url: url || undefined }],
    creator: name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      type: "profile",
      siteName: name,
      title: seo.title ?? name,
      description,
      url: `${url}/`,
      locale: "en_US",
      ...(image && {
        images: [{ url: absoluteUrl(`/images/${image}`, cfg), alt: name }],
      }),
    },
    twitter: {
      // The avatar is square, so the large-image card would letterbox it.
      card: "summary",
      title: seo.title ?? name,
      description,
      ...(image && { images: [absoluteUrl(`/images/${image}`, cfg)] }),
    },
    icons: {
      icon: [
        { url: absoluteUrl("/images/favicon.svg", cfg), type: "image/svg+xml" },
        { url: absoluteUrl("/images/favicon-32x32.png", cfg), sizes: "32x32" },
        { url: absoluteUrl("/images/favicon-192x192.png", cfg), sizes: "192x192" },
      ],
      apple: absoluteUrl("/images/apple-touch-icon-180x180.png", cfg),
    },
  };
}

/**
 * Root layout for the site itself. /playground has its own separate root
 * layout, so nothing here (including the stylesheets above) reaches it.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cfg = getSiteConfig();

  return (
    <html lang="en">
      <head>
        {/* Font Awesome, used by the sidebar's social and CV icons. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        {/* schema.org description of the person and their publications; see
            src/lib/seo.ts. Built from config.yml and publications.yml, so it
            cannot drift from what the page shows. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(cfg)) }}
        />
      </head>
      <body>
        <header className="masthead">
          <div className="wrap masthead__inner">
            <Link href="/" className="masthead__title">
              {cfg.author?.name ?? "Home"}
            </Link>
            {/* Generated from SECTIONS so the nav always matches the page. */}
            <nav className="masthead__nav">
              {SECTIONS.map(({ id, label }) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer">
          <div className="wrap">
            <p>
              Borrowed heavily from{" "}
              <a href="https://minimalacademicsite.github.io/">minimalacademicsite.github.io</a>.
              Graphic resources from{" "}
              <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer">
                Flaticon
              </a>
              . &copy; {new Date().getFullYear()} {cfg.author?.name ?? cfg.title}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
