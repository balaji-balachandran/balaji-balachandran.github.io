// Builds the deployable static site into out/.
//
// `next build` and `next dev` share the .next directory, and on Windows a
// build run against a live dev server corrupts the dev server's chunks (it
// starts 404ing CSS and throwing "Cannot find module ./vendor-chunks/..."),
// so refuse to build while one is listening.
import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const DEV_PORT = 3000;

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

const { status } = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
});

if (status === 0) {
  // GitHub Pages runs Jekyll over a site unless this file is present, and
  // Jekyll skips any directory starting with an underscore -- which would
  // drop the whole of /_next and serve an unstyled page.
  writeFileSync("out/.nojekyll", "");
}

process.exit(status ?? 1);
