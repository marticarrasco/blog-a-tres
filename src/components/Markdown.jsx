import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function safeUrl(url = "") {
  const value = String(url).trim();
  if (value.startsWith("/") || value.startsWith("#")) return value;
  try {
    const parsed = new URL(value);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? value : "#";
  } catch {
    return "#";
  }
}

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      urlTransform={safeUrl}
      components={{
        a: ({ href = "", children: linkChildren, ...props }) => {
          const safeHref = safeUrl(href);
          const external = /^https?:/i.test(safeHref);
          return <a href={safeHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>{linkChildren}</a>;
        },
        img: ({ src = "", alt = "", ...props }) => <img src={safeUrl(src)} alt={alt} loading="lazy" decoding="async" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
