import site from "../content/site.json";

const authorFiles = import.meta.glob("../content/authors/*.json", { eager: true, import: "default" });
const postFiles = import.meta.glob("../content/posts/*.json", { eager: true, import: "default" });

const fileStem = (path) => path.split("/").pop().replace(/\.json$/, "");
const normalisePath = (value = "") => String(value).replace(/^\.\.\//, "").replace(/^\.\//, "");

function normaliseAuthor(author, path) {
  const handle = author.handle || fileStem(path);
  return { ...author, id: handle, handle, sourcePath: normalisePath(path) };
}

export const authors = Object.entries(authorFiles)
  .map(([path, author]) => normaliseAuthor(author, path))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

const authorsByReference = new Map();
authors.forEach((author) => {
  const filename = `content/authors/${fileStem(author.sourcePath)}.json`;
  [author.id, author.handle, author.sourcePath, filename, `../${filename}`].forEach((key) => authorsByReference.set(normalisePath(key), author));
});

export function resolveAuthor(reference) {
  return authorsByReference.get(normalisePath(reference)) ?? null;
}

function normalisePost(post, path) {
  const slug = post.slug || fileStem(path);
  return { ...post, id: slug, slug, author: resolveAuthor(post.author), blocks: Array.isArray(post.blocks) ? post.blocks : [] };
}

export const allPosts = Object.entries(postFiles).map(([path, post]) => normalisePost(post, path));
export const posts = allPosts
  .filter((post) => post.status === "published" && post.author)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const featuredPosts = posts
  .filter((post) => post.featured)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));

export { site };
