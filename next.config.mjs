// Where the site is deployed.
//
// balaji-balachandran.github.io is a GitHub Pages *user* site, which is served
// from the domain root, so no prefix is needed. cs.stanford.edu instead serves
// personal pages out of /~balajib; to build for there, run
//   DEPLOY_BASE_PATH=/~balajib npm run build
// Getting this wrong costs you every stylesheet and script on the page.
const DEPLOY_BASE_PATH = process.env.DEPLOY_BASE_PATH ?? "";

// Only production builds get the prefix; dev stays at localhost:3000/.
const BASE_PATH =
  process.env.NODE_ENV === "production" ? DEPLOY_BASE_PATH : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the user profile directory makes Next infer
  // the wrong workspace root; pin it to this project.
  outputFileTracingRoot: import.meta.dirname,

  // Emit a plain folder of HTML/CSS/JS to out/ -- no Node process on the
  // server, so the result can be rsync'd to any static host. Everything here
  // prerenders, so nothing is lost.
  output: "export",

  // Write /playground/index.html rather than /playground.html, so a stock
  // nginx/Apache serves the URL /playground without any rewrite rules.
  trailingSlash: true,

  // The site is served from a subdirectory (cs.stanford.edu/~balajib), not a
  // domain root, so every emitted URL needs that prefix or the browser looks
  // for /_next/... at the domain root and gets nothing. Applied to production
  // builds only, so `npm run dev` still serves plain http://localhost:3000/.
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH || undefined,

  // Same value for our own raw paths (see src/lib/base-path.ts). Inlined at
  // build time because NEXT_PUBLIC_* is substituted into the client bundle.
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
};
export default nextConfig;
