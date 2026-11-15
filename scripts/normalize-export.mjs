import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

// Next.js 16.4's Windows exporter passes platform separators to its segment
// filename encoder, which only replaces '/'. The browser requests the flat,
// dot-separated filename on every platform. Preserve the generated payloads
// verbatim and provide those filenames without modifying Next.js internals.
const root = path.resolve("out");
let copied = 0;

async function copySegments(directory, routeDirectory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await copySegments(source, routeDirectory);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const filename = path.relative(routeDirectory, source).split(path.sep).join(".");
      await copyFile(source, path.join(routeDirectory, filename));
      copied++;
    }
  }
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const child = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) await copySegments(child, directory);
    else await visit(child);
  }
}
await visit(root);
console.log(`Static navigation assets checked (${copied} Windows paths normalized).`);
