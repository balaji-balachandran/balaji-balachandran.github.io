# personal-website

Personal academic website built with Next.js (App Router). A single page with
Biography, Publications, Teaching and Portfolio sections, plus an author
sidebar.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static prerender
npm start       # serve the production build
```

Note: don't run `npm run build` while `npm run dev` is live — they share
`.next`, and the build clobbers the dev server's assets. If pages come back
unstyled or you see `Cannot find module './vendor-chunks/...'`, stop both,
`rm -rf .next`, and restart.

## Editing content

Everything editable lives in `content/`, one file per section. No code changes
needed.

```
content/
├── config.yml                site title, author name, bio, social handles
├── biography.yml             Biography paragraphs + the callout box
├── research-interests.yml    the interest pills
├── news.yml                  the Recent News timeline
├── publications.yml          Publications
├── teaching.yml              Teaching experience
└── portfolio.yml             Portfolio items
```

Every file is a plain list, newest first — the order in the file is the order
on the page. Adding a news item is three lines:

```yaml
items:
  - date: Mar 2026
    text: Accepted a fully-funded Ph.D. offer at <strong>UES</strong>.
    milestone: true      # optional, highlights the entry
```

Publications, teaching and portfolio share one shape. Every field is optional
except `title`:

```yaml
items:
  - title: Aspect-Based Sentiment Analysis of Amazon Product Reviews
    date: "2025-01-01"          # used for sorting and display
    venue: ICTCS 2025, Amman, Jordan
    type: Undergraduate course  # teaching entries
    location: City, Country
    category: conferences
    description: |-             # markdown, inline HTML and $$...$$ math
      Longer text, rendered under the heading.
    summary: One-liner          # shown only when description is absent
    paper: https://doi.org/...  # renders a "Paper" button
    slides: /files/slides1.pdf  # renders a "Slides" button
    bibtex: /files/paper1.bib   # renders a "BibTeX" button
    citation: Author, A. (2025). Title. Venue.
```

Images and PDFs are static files in `public/images/` and `public/files/`,
referenced as `/images/foo.png` and `/files/bar.pdf`.

## Adding or reordering sections

`src/lib/sections.tsx` is the single source of truth for what appears on the
page and in the nav bar:

```ts
export const SECTIONS = [
  { id: "biography", label: "Biography", Component: Biography },
  { id: "news",      label: "News",      Component: News },
  ...
];
```

`id` is the anchor target, `label` is the nav text. Reorder the list to reorder
the page — the nav follows automatically, so the two cannot drift apart.

Each section is one component in `src/components/sections/`, and each reads its
own data file. To add a new section: write the component, add it to the list.

## Layout

| File | Role |
| --- | --- |
| `src/lib/content.ts` | Reads `config.yml` (YAML anchors supported) |
| `src/lib/markdown.ts` | remark/rehype pipeline: GFM, KaTeX math (`$$...$$`), raw HTML |
| `src/lib/sections.tsx` | The ordered section registry driving the page and nav |
| `src/lib/data.ts` | Typed readers for the YAML data files |
| `src/components/sections/` | One component per section, plus shared `Section` and `Entry` |
| `src/components/Sidebar.tsx` | Author panel: avatar, socials, affiliations, CV link |
| `src/components/Shell.tsx` | Two-column grid; sidebar visibility per page |
| `src/app/globals.css` | Page layout. Knobs are CSS variables at the top: `--x-large`, `--rail`, `--rail-gap` |
| `src/app/sections.css` | Section styling: timeline, pills, callout box, section titles |

## Known gaps

- `public/files/John_Doe_CV.pdf` is referenced by the sidebar's Download CV
  button but does not exist yet; add it or edit `src/components/Sidebar.tsx`.
- Math in frontmatter (`title`, `excerpt`) is not rendered — only in file bodies.
- Font Awesome loads from a CDN, declared in `src/app/layout.tsx`.
