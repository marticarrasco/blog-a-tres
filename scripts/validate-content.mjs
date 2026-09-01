import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const listJson = (folder) => readdirSync(join(root, folder)).filter((name) => name.endsWith(".json")).map((name) => [name, readJson(join(root, folder, name))]);
const authors = listJson("content/authors");
const posts = listJson("content/posts");
const errors = [];
const warnings = [];
const handles = new Set();
const authorRefs = new Set();
const slugs = new Set();
const referencedAssets = new Set();
const allowedImages = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const allowedServices = new Set(["youtube", "twitter", "instagram", "webpage"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function checkImage(value, label, required = false) {
  if (!value) { if (required) errors.push(`${label}: falta una imatge obligatòria.`); return; }
  if (!value.startsWith("/assets/articles/")) { errors.push(`${label}: la ruta ha d'estar dins /assets/articles/.`); return; }
  const extension = extname(value).toLowerCase();
  if (!allowedImages.has(extension)) errors.push(`${label}: format no admès (${extension || "sense extensió"}).`);
  const diskPath = join(root, "public", value.replace(/^\//, ""));
  if (!existsSync(diskPath)) errors.push(`${label}: no existeix ${value}.`);
  else if (statSync(diskPath).size > 5 * 1024 * 1024) errors.push(`${label}: supera el límit de 5 MB.`);
  referencedAssets.add(value.replace(/^\//, ""));
}

for (const [name, author] of authors) {
  const prefix = `Autor ${name}`;
  if (!author.name || !author.handle || !author.role || !author.bio) errors.push(`${prefix}: falten camps obligatoris.`);
  if (!slugPattern.test(author.handle || "")) errors.push(`${prefix}: handle insegur.`);
  if (handles.has(author.handle)) errors.push(`${prefix}: handle duplicat.`);
  handles.add(author.handle);
  authorRefs.add(`content/authors/${name}`);
  authorRefs.add(author.handle);
  if (author.avatar) checkImage(author.avatar, `${prefix} avatar`);
}

for (const [name, post] of posts) {
  const prefix = `Article ${name}`;
  if (!post.title || !post.slug || !post.author || !post.publishedAt || !post.updatedAt || !post.status || !post.summary || !Array.isArray(post.blocks)) errors.push(`${prefix}: falten camps obligatoris.`);
  if (!slugPattern.test(post.slug || "")) errors.push(`${prefix}: slug insegur.`);
  if (slugs.has(post.slug)) errors.push(`${prefix}: slug duplicat.`);
  slugs.add(post.slug);
  if (!["draft", "published", "archived"].includes(post.status)) errors.push(`${prefix}: estat desconegut.`);
  if (!authorRefs.has(String(post.author).replace(/^\.\.\//, ""))) errors.push(`${prefix}: autor inexistent (${post.author}).`);
  if (Number.isNaN(Date.parse(post.publishedAt)) || Number.isNaN(Date.parse(post.updatedAt))) errors.push(`${prefix}: data no vàlida.`);
  if (new Date(post.updatedAt) < new Date(post.publishedAt)) warnings.push(`${prefix}: updatedAt és anterior a publishedAt.`);
  checkImage(post.cover, `${prefix} portada`, post.status === "published");
  const opinions = post.blocks.filter((block) => block.type === "opinion");
  if (opinions.length > 1) errors.push(`${prefix}: només es permet una opinió alternativa.`);
  post.blocks.forEach((block, index) => {
    const blockLabel = `${prefix}, bloc ${index + 1}`;
    if (!["text", "image", "embed", "opinion"].includes(block.type)) errors.push(`${blockLabel}: tipus desconegut.`);
    if (block.type === "image") checkImage(block.src, `${blockLabel} imatge`, true);
    if (block.type === "opinion" && !authorRefs.has(String(block.author).replace(/^\.\.\//, ""))) errors.push(`${blockLabel}: autor d'opinió inexistent.`);
    if (block.type === "embed") {
      if (!allowedServices.has(block.service)) errors.push(`${blockLabel}: servei d'embed no permès.`);
      try { if (new URL(block.url).protocol !== "https:") errors.push(`${blockLabel}: l'embed ha d'usar HTTPS.`); } catch { errors.push(`${blockLabel}: URL d'embed no vàlida.`); }
    }
  });
}

const assetRoot = join(root, "public", "assets", "articles");
if (existsSync(assetRoot)) {
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
  walk(assetRoot).forEach((file) => {
    const relative = file.slice(join(root, "public").length + 1).replaceAll("\\", "/");
    if (!referencedAssets.has(relative)) warnings.push(`Actiu no utilitzat: /${relative}`);
  });
}

warnings.forEach((warning) => console.warn(`Avís: ${warning}`));
if (errors.length) { errors.forEach((error) => console.error(`Error: ${error}`)); process.exit(1); }
console.log(`Contingut validat: ${posts.length} articles i ${authors.length} autors.`);
