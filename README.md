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

Everything editable lives in `content/`. No code changes needed.

```
content/
├── config.yml                site title, author name, bio, social handles
├── biography.yml             Biography paragraphs + the callout box
├── research-interests.yml    the interest pills
├── news.yml                  the Recent News timeline
├── publications/             one .md per publication
├── teaching/                 one .md per teaching entry
└── portfolio/                one .md or .html per portfolio item
```

**The YAML files** are plain lists, newest first. Adding a news item means
adding three lines:

```yaml
items:
  - date: Mar 2026
    text: Accepted a fully-funded Ph.D. offer at <strong>UES</strong>.
    milestone: true      # optional, highlights the entry
```

`text` and the biography paragraphs accept inline HTML (`<strong>`, `<em>`,
`<a>`).

**The collection folders** take markdown with YAML frontmatter. Recognised
keys: `title`, `date`, `excerpt`, `venue`, `location`, `type`, `category`,
`citation`, `paperurl`, `slidesurl`, `bibtexurl`. Sorted newest first by `date`.
The file body renders below the heading; if it is empty, `excerpt` is used
instead. Bodies support markdown, inline HTML and `$$...$$` math.

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
| `src/lib/content.ts` | Reads `content/` — collections, pages and `config.yml` (YAML anchors supported) |
| `src/lib/markdown.ts` | remark/rehype pipeline: GFM, KaTeX math (`$$...$$`), raw HTML |
| `src/lib/sections.tsx` | The ordered section registry driving the page and nav |
| `src/lib/data.ts` | Typed readers for the YAML data files |
| `src/components/sections/` | One component per section, plus shared `Section` and `Entry` |
| `src/components/Sidebar.tsx` | Author panel: avatar, socials, affiliations, CV link |
| `src/components/Shell.tsx` | Two-column grid; sidebar visibility per page |
| `src/app/globals.css` | Page layout. Knobs are CSS variables at the top: `--x-large`, `--rail`, `--rail-gap` |
| `src/app/sections.css` | Section styling: timeline, pills, callout box, section titles |

Slugs come from filenames rather than any `permalink` frontmatter, so duplicate
permalinks in source content can't make entries shadow each other.

## Known gaps

- `public/files/John_Doe_CV.pdf` is referenced by the sidebar's Download CV
  button but does not exist yet; add it or edit `src/components/Sidebar.tsx`.
- Math in frontmatter (`title`, `excerpt`) is not rendered — only in file bodies.
- Font Awesome loads from a CDN, declared in `src/app/layout.tsx`.
