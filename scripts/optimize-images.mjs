import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
const directory = path.resolve("public/images");
const sources = path.resolve("assets/source-images");
for (const file of await readdir(sources)) {
  if (!file.endsWith(".jpg")) continue;
  const name = file === "chowmein.jpg" ? "rice" : path.basename(file, ".jpg");
  await sharp(path.join(sources, file))
    .rotate()
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(directory, `${name}.webp`));
}
await sharp(path.join(sources, "momo.jpg"))
  .resize({ width: 1920 })
  .webp({ quality: 86 })
  .toFile(path.join(directory, "hero.webp"));
console.log("Local photographs optimized as WebP.");
