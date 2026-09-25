import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "../globals.css";
import "../sections.css";
import { getSiteConfig } from "@/lib/content";
import { SECTIONS } from "@/lib/sections";

export function generateMetadata(): Metadata {
  const cfg = getSiteConfig();
  return {
    title: {
      default: cfg.author?.name ?? cfg.title ?? "Academic Site",
      template: `%s - ${cfg.title ?? "Home"}`,
    },
    description: cfg.description,
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
              Borrowed heavily from <a href="https://minimalacademicsite.github.io/">minimalacademicsite.github.io</a>. &copy; {new Date().getFullYear()} {cfg.author?.name ?? cfg.title}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
