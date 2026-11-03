// Builds the deployable static site into out/.
//
// `next build` and `next dev` share the .next directory, and on Windows a
// build run against a live dev server corrupts the dev server's chunks (it
// starts 404ing CSS and throwing "Cannot find module ./vendor-chunks/..."),
// so refuse to build while one is listening.
import { spawnSync } from "node:child_process";
import { renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const DEV_PORT = 3000;

// `--base /~balajib` builds for a subdirectory deployment; with no flag the
// site is built for a domain root. Passed as a flag rather than an env var
// because `VAR=x cmd` is not portable to the cmd.exe npm uses on Windows.
const baseFlag = process.argv.indexOf("--base");
if (baseFlag !== -1 && process.argv[baseFlag + 1]) {
  process.env.DEPLOY_BASE_PATH = process.argv[baseFlag + 1];
}
const BASE = process.env.DEPLOY_BASE_PATH ?? "";

// Each target gets its own directory. Next always exports to out/, so a
// prefixed build is moved aside afterwards -- otherwise whichever target was
// built last silently overwrites the other, and deploying the wrong one gives
// a page with no styling (every /_next path resolves against the wrong root).
const OUT = BASE ? "out-stanford" : "out";

async function devServerRunning() {
  try {
    await fetch(`http://localhost:${DEV_PORT}/`, {
      signal: AbortSignal.timeout(1500),
    });
    return true;
  } catch {
    return false;
  }
}

if (await devServerRunning()) {
  console.error(
    `\nSomething is already serving port ${DEV_PORT} -- probably \`npm run dev\`.\n` +
      "Building now would corrupt its .next directory. Stop it first, then\n" +
      "re-run `npm run build`.\n",
  );
  process.exit(1);
}

// Next does not prune files an earlier export left behind.
rmSync("out", { recursive: true, force: true });
rmSync(OUT, { recursive: true, force: true });

const { status } = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    // `npm run build` puts node_modules/.bin on PATH, but running this script
    // directly with node does not -- without this, `next` is not found.
    PATH: `${path.resolve("node_modules/.bin")}${path.delimiter}${process.env.PATH}`,
  },
});

if (status === 0) {
  if (OUT !== "out") renameSync("out", OUT);

  // GitHub Pages runs Jekyll over a site unless this file is present, and
  // Jekyll skips any directory starting with an underscore -- which would
  // drop the whole of /_next and serve an unstyled page.
  writeFileSync(`${OUT}/.nojekyll`, "");

  console.log(
    `
Built for base path "${BASE || "/"}" -> ${OUT}/` +
      `
Deploy ${OUT}/ and nothing else.
`,
  );
}

process.exit(status ?? 1);
