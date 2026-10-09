export function videoEmbed(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
      const id = host === "youtu.be" ? parsed.pathname.slice(1) : parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)\/?$/)?.[1] || (parsed.pathname === "/watch" ? parsed.searchParams.get("v") : null);
      if (/^[a-zA-Z0-9_-]{11}$/.test(id || "")) return { src: `https://www.youtube-nocookie.com/embed/${id}`, service: "YouTube" };
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
      const id = parsed.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1];
      if (id) return { src: `https://player.vimeo.com/video/${id}`, service: "Vimeo" };
    }
  } catch { /* An invalid URL can be corrected in the CMS. */ }
  return null;
}
