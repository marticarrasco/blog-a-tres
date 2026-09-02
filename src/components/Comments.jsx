import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../content.js";
import "@waline/client/style";

export default function Comments({ slug }) {
  const containerRef = useRef(null);
  const [error, setError] = useState("");
  const serverURL = import.meta.env.VITE_WALINE_SERVER_URL;

  useEffect(() => {
    if (!site.commentsEnabled || !serverURL || !containerRef.current) return undefined;
    let instance;
    let cancelled = false;
    import("@waline/client")
      .then(({ init }) => {
        if (cancelled || !containerRef.current) return;
        instance = init({
          el: containerRef.current,
          serverURL,
          path: `/articles/${slug}`,
          lang: "ca",
          login: "disable",
          meta: ["nick"],
          requiredMeta: ["nick"],
          imageUploader: false,
          wordLimit: [2, 2000],
          commentSorting: "latest",
          locale: {
            placeholder: "Escriu el teu comentari. Es publicarà immediatament.",
          },
          copyright: false,
          dark: false,
        });
      })
      .catch(() => setError("No hem pogut carregar els comentaris. Torna-ho a provar més tard."));
    return () => { cancelled = true; instance?.destroy?.(); };
  }, [serverURL, slug]);

  if (!site.commentsEnabled) return null;
  if (!serverURL) {
    return <section className="comments-placeholder" aria-live="polite"><MessageCircle size={19} /><div><strong>Conversa temporalment tancada</strong><p>Els comentaris s’activaran quan el servei estiga disponible.</p></div></section>;
  }
  return <section aria-label="Comentaris"><p className="comment-privacy">En comentar, el teu nom i el contingut del missatge es publicaran. No et demanem correu electrònic.</p>{error ? <p className="form-error" role="alert">{error}</p> : <div ref={containerRef} className="comments-waline" />}</section>;
}
