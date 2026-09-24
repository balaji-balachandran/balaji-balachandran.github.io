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

All content is markdown with YAML frontmatter under `content/`. Add a file and
it appears on the page automatically — no code changes needed.

```
content/
├── config.yml            site title, author name, bio, social handles
├── pages/about.md        the Biography section (raw HTML and <style> allowed)
├── publications/         one .md per publication
├── teaching/             one .md per teaching entry
└── portfolio/            one .md or .html per portfolio item
```

Recognised frontmatter keys: `title`, `date`, `excerpt`, `venue`, `location`,
`type`, `category`, `citation`, `paperurl`, `slidesurl`, `bibtexurl`. Entries are
sorted newest first by `date`.

Images and PDFs are static files in `public/images/` and `public/files/`,
referenced as `/images/foo.png` and `/files/bar.pdf`.

The sidebar reads `author` from `content/config.yml`. Set
`author_profile: false` in a page's frontmatter to hide it on that page.

## Layout

| File | Role |
| --- | --- |
| `src/lib/content.ts` | Reads `content/` — collections, pages and `config.yml` (YAML anchors supported) |
| `src/lib/markdown.ts` | remark/rehype pipeline: GFM, KaTeX math (`$$...$$`), raw HTML |
| `src/app/page.tsx` | The single page and its sections |
| `src/components/Sidebar.tsx` | Author panel: avatar, socials, affiliations, CV link |
| `src/components/Shell.tsx` | Two-column grid; sidebar visibility per page |
| `src/app/globals.css` | All styling. Layout knobs are CSS variables at the top: `--x-large`, `--rail`, `--rail-gap` |

Slugs come from filenames rather than any `permalink` frontmatter, so duplicate
permalinks in source content can't make entries shadow each other.

## Known gaps

- `public/files/John_Doe_CV.pdf` is referenced by the sidebar's Download CV
  button but does not exist yet; add it or edit `src/components/Sidebar.tsx`.
- Math in frontmatter (`title`, `excerpt`) is not rendered — only in page bodies.
- Font Awesome loads from a CDN, declared in `src/app/layout.tsx`.
