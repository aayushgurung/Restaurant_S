import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Stock photography is illustrative, not photography of Palpasa's own dishes.
// Keep the original sources and optimized assets reproducible from this manifest.
const manifest = JSON.parse(
  await readFile(new URL("./menu-images.json", import.meta.url), "utf8"),
);
const output = path.resolve("public/images/menu");
const sources = path.resolve("assets/source-images/menu");
await mkdir(output, { recursive: true });
await mkdir(sources, { recursive: true });
for (const [name, image] of Object.entries(manifest)) {
  if (process.argv.length > 2 && !process.argv.slice(2).includes(name))
    continue;
  const target = path.join(output, `${name}.webp`);
  if (process.argv.length === 2) {
    try {
      await access(target);
      continue;
    } catch {
      /* Download missing assets. */
    }
  }
  const url =
    image.url ||
    `https://images.unsplash.com/photo-${image.photo}?auto=format&fit=crop&w=1100&q=85`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(45000),
    headers: {
      "User-Agent": "PalpasaCafeMenu/1.0 (illustrative menu photography)",
    },
  });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const original = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(sources, `${name}.jpg`), original);
  await sharp(original)
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(output, `${name}.webp`));
  console.log(`Downloaded and optimized: ${name}`);
}
