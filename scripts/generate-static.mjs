import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = join(root, "public");
const site = JSON.parse(readFileSync(join(root, "content", "site.json"), "utf8"));
const authors = readdirSync(join(root, "content", "authors")).filter((name) => name.endsWith(".json")).map((name) => JSON.parse(readFileSync(join(root, "content", "authors", name), "utf8"))).sort((a, b) => a.order - b.order);
const posts = readdirSync(join(root, "content", "posts")).filter((name) => name.endsWith(".json")).map((name) => JSON.parse(readFileSync(join(root, "content", "posts", name), "utf8"))).filter((post) => post.status === "published");
const base = String(process.env.VITE_SITE_URL || site.url || "http://localhost:5173").replace(/\/$/, "");
const routes = ["/", "/articles", "/autors", "/manifest", "/privacitat", "/avis-legal", "/comentaris", "/contacte", ...authors.map((author) => `/autors/${author.handle}`), ...posts.map((post) => `/articles/${post.slug}`)];
const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character]);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escapeXml(`${base}${route === "/" ? "" : route}`)}</loc></url>`).join("\n")}\n</urlset>\n`;
mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap);
writeFileSync(join(publicDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
console.log(`Fitxers SEO generats per a ${routes.length} rutes.`);
