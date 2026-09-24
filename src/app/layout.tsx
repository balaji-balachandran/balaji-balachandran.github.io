import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";
import { getSiteConfig } from "@/lib/content";

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

export default function RootLayout({
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
            <nav className="masthead__nav">
              <a href="#biography">Biography</a>
              <a href="#publications">Publications</a>
              <a href="#teaching">Teaching</a>
              <a href="#portfolio">Portfolio</a>
            </nav>
          </div>
        </header>

        <main className="main">{children}</main>

        <footer className="footer">
          <div className="wrap">
            <p>
              &copy; {new Date().getFullYear()} {cfg.author?.name ?? cfg.title}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
