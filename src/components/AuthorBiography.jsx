import React, { useState } from "react";
import Markdown from "./Markdown.jsx";
import { videoEmbed } from "../video.js";

function BiographyVideo({ block }) {
  const [consented, setConsented] = useState(false);
  const embed = videoEmbed(block.url);
  return <figure className="author-biography-media">
    {embed ? consented
      ? <div className="video-embed"><iframe src={embed.src} title={block.title || `Vídeo de ${embed.service}`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-presentation" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
      : <div className="embed-card"><p>{block.title || `Vídeo de ${embed.service}`}</p><button type="button" onClick={() => setConsented(true)}>Carregar vídeo de {embed.service}</button><small>El vídeo extern només es carrega quan ho demanes.</small></div>
      : <p>El vídeo no està disponible.</p>}
    {block.caption && <figcaption>{block.caption}</figcaption>}
  </figure>;
}

export default function AuthorBiography({ blocks = [] }) {
  return <article className="author-personal-copy author-biography">
    {blocks.map((block, index) => {
      if (block.type === "text") return <div className="author-biography-text text-block" key={index}><Markdown>{block.body || ""}</Markdown></div>;
      if (block.type === "image") return <figure className="author-biography-media" key={index}><img src={block.src} alt={block.alt || ""} loading="lazy" decoding="async" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
      if (block.type === "video") return <BiographyVideo block={block} key={index} />;
      return null;
    })}
  </article>;
}
