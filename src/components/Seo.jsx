import { useEffect } from "react";
import { site } from "../content.js";

function upsertMeta(selector, attrs) {
  let node = document.head.querySelector(selector);
  if (!node) { node = document.createElement("meta"); document.head.appendChild(node); }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) { node = document.createElement("link"); node.rel = rel; document.head.appendChild(node); }
  node.href = href;
}

export default function Seo({ title, description, path = "/", image, type = "website", jsonLd, lang = "ca" }) {
  useEffect(() => {
    const origin = String(site.url || window.location.origin).replace(/\/$/, "");
    const canonical = `${origin}${path === "/" ? "" : path}`;
    const imageUrl = new URL(image || "/og.png", `${origin}/`).href;
    const fullTitle = title === site.name ? title : `${title} — ${site.name}`;
    document.title = fullTitle;
    document.documentElement.lang = lang;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    [["og:title", fullTitle], ["og:description", description], ["og:type", type], ["og:url", canonical], ["og:image", imageUrl]].forEach(([property, content]) => upsertMeta(`meta[property="${property}"]`, { property, content }));
    [["twitter:card", "summary_large_image"], ["twitter:title", fullTitle], ["twitter:description", description], ["twitter:image", imageUrl]].forEach(([name, content]) => upsertMeta(`meta[name="${name}"]`, { name, content }));
    upsertLink("canonical", canonical);
    let script = document.head.querySelector('script[data-page-jsonld="true"]');
    if (jsonLd) {
      if (!script) { script = document.createElement("script"); script.type = "application/ld+json"; script.dataset.pageJsonld = "true"; document.head.appendChild(script); }
      script.textContent = JSON.stringify(jsonLd);
    } else script?.remove();
  }, [title, description, path, image, type, jsonLd, lang]);
  return null;
}
