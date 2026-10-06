import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, ChevronLeft, ExternalLink, Menu, MessageCircle, Share2, X } from "lucide-react";
import Markdown from "./components/Markdown.jsx";
import Comments from "./components/Comments.jsx";
import Seo from "./components/Seo.jsx";
import { authors, featuredPosts, posts, resolveAuthor, site } from "./content.js";

const descriptions = {
  home: "Un espai compartit per escriure, discutir i entendre millor les idees.",
  articles: "Explora tots els articles publicats a Entre línies i filtra'ls per autor o data.",
  authors: "Coneix les tres veus independents que escriuen a Entre línies.",
};

function usePath() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, "") || "/");
  const navigate = (to) => {
    const next = to.replace(/\/$/, "") || "/";
    window.history.pushState({}, "", next);
    setPath(next);
  };
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return { path, navigate };
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.unobserve(node);
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function threadPath({ startX, targetX, targetY, endX, height, sway, heroBoundary }) {
  const y = Math.max(110, Math.min(height - 110, targetY));
  const clampX = (value) => Math.max(18, Math.min(342, value));
  const knotY1 = Math.max(100, Math.min(heroBoundary * .46, y - 280));
  const knotY2 = Math.max(knotY1 + 92, Math.min(heroBoundary * .86, y - 160));
  const knotY3 = Math.max(knotY2 + 92, Math.min(heroBoundary + 120, y - 70));
  const topCenter = 286;
  return `M ${startX} -90 C ${clampX(startX + 22)} 42, ${clampX(topCenter - sway * .28)} ${knotY1 * .62}, ${clampX(topCenter + sway * .2)} ${knotY1} C ${clampX(topCenter + sway * .64)} ${knotY1 + 54}, ${clampX(topCenter - sway * .78)} ${knotY2 - 52}, ${clampX(topCenter + sway * .14)} ${knotY2} C ${clampX(topCenter - sway * .76)} ${knotY2 + 62}, ${clampX(targetX + sway * .95)} ${Math.max(knotY3 + 30, y - 150)}, ${targetX} ${y} C ${clampX(targetX + sway)} ${Math.min(height, y + 100)}, ${clampX(endX - sway)} ${height * .82}, ${endX} ${height + 90}`;
}

function GlobalThreads({ path }) {
  const fieldRef = useRef(null);
  const [targets, setTargets] = useState([
    { x: 72, y: 610 },
    { x: 180, y: 610 },
    { x: 288, y: 610 },
  ]);
  const [heroBoundary, setHeroBoundary] = useState(360);
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return undefined;
    const measure = () => {
      const fieldRect = field.getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll(".author-tile, .author-profile")).slice(0, 3);
      if (cards.length < 3 || fieldRect.height <= 0) return;
      setTargets(cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          x: Math.max(18, Math.min(342, ((rect.left + rect.width / 2 - fieldRect.left) / fieldRect.width) * 360)),
          y: ((rect.top + rect.height / 2 + window.scrollY - (fieldRect.top + window.scrollY)) / fieldRect.height) * 1200,
        };
      }));
      const hero = document.querySelector(".hero");
      if (hero) setHeroBoundary(Math.max(220, ((hero.getBoundingClientRect().bottom - fieldRect.top) / fieldRect.height) * 1200));
    };
    const frame = requestAnimationFrame(measure);
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    const authorGrid = document.querySelector(".author-grid, .authors-page-grid");
    resizeObserver?.observe(field.parentElement);
    if (authorGrid) resizeObserver?.observe(authorGrid);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [path]);
  const height = 1200;
  const threads = [
    { className: "global-thread-orange", startX: 264, endX: 290, sway: 132, target: targets[0] },
    { className: "global-thread-blue", startX: 280, endX: 180, sway: -126, target: targets[1] },
    { className: "global-thread-green", startX: 296, endX: 70, sway: 118, target: targets[2] },
  ];
  return <div ref={fieldRef} className="global-thread-field" aria-hidden="true"><svg className="global-threads" viewBox={`0 0 360 ${height}`} preserveAspectRatio="none">{threads.map(({ className, startX, endX, sway, target }) => { const d = threadPath({ startX, targetX: target.x, targetY: target.y, endX, height, sway, heroBoundary }); return <g className={`global-thread ${className}`} key={className}><path d={d} /><path className="global-thread-highlight" d={d} /></g>; })}</svg></div>;
}

function Link({ to, navigate, children, className, ...props }) {
  return <a href={to} className={className} onClick={(event) => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); navigate(to); } }} {...props}>{children}</a>;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ca-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function Header({ navigate, path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const items = [["/articles", "Articles"], ["/autors", "Autors"], ["/manifest", "Manifest"]];
  return <header className="site-header"><Link className="wordmark" to="/" navigate={navigate} aria-label="Entre línies, inici"><img className="brand-logo brand-logo-header" src="/assets/brand/entre-linies-logo.png" alt="" /></Link><nav id="main-navigation" className={open ? "site-nav is-open" : "site-nav"} aria-label="Navegació principal">{items.map(([to, label]) => <Link key={to} to={to} navigate={navigate} aria-current={path === to ? "page" : undefined}>{label}</Link>)}</nav><button className="menu-toggle" onClick={() => setOpen((value) => !value)} type="button" aria-label={open ? "Tancar menú" : "Obrir menú"} aria-expanded={open} aria-controls="main-navigation">{open ? <X size={20} /> : <Menu size={20} />}</button></header>;
}

function Cover({ post, compact = false, priority = false }) {
  return <div className={`cover ${compact ? "cover-compact" : ""}`}>{post.cover ? <img src={post.cover} alt={post.coverAlt || `Portada de l'article «${post.title}»`} loading={priority ? "eager" : "lazy"} decoding="async" /> : <><span className="cover-number">{String(post.featuredOrder || 1).padStart(2, "0")}</span><span className="cover-word">pensar<br />junts</span></>}</div>;
}

function AuthorMark({ author, large = false }) {
  const className = `author-mark voice-mark-${author?.order || 1} ${large ? "author-mark-large" : ""}`;
  if (author?.avatar) return <span className={className}><img src={author.avatar} alt="" loading="lazy" decoding="async" /></span>;
  if (author?.handle === "alejandro-pascual") return <span className={className} aria-hidden="true"><AlejandroSilhouette /></span>;
  return <span className={className} aria-hidden="true">{author?.name?.slice(0, 1) || "?"}</span>;
}

function AlejandroSilhouette() {
  return <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path fill="transparent" fillRule="evenodd" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" d="M19 91L44 10H56L81 91H65L60 72H40L35 91H19ZM44 59H56L50 31L44 59Z" /></svg>;
}

function AuthorInitial({ author }) {
  if (author?.handle === "alejandro-pascual") return <span className="author-initial author-silhouette" aria-hidden="true"><AlejandroSilhouette /></span>;
  return <span className="author-initial" aria-hidden="true">{author.name.slice(0, 1)}</span>;
}

function AuthorSocialLinks({ author, className = "author-links", ariaLabel = `Xarxes de ${author.name}` }) {
  return <nav className={className} aria-label={ariaLabel}>
    {author.linkedin && <a href={author.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ExternalLink size={14} /></a>}
    {author.twitter && <a href={author.twitter} target="_blank" rel="noopener noreferrer">Twitter / X<ExternalLink size={14} /></a>}
    {author.links?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={14} /></a>)}
  </nav>;
}

function ArticleMeta({ post, navigate, linked = true }) {
  const author = <><AuthorMark author={post.author} />{post.author.name}</>;
  return <div className="article-meta">{linked ? <Link to={`/autors/${post.author.handle}`} navigate={navigate}>{author}</Link> : <span className="article-author-static">{author}</span>}<span>{formatDate(post.publishedAt)}</span></div>;
}

function ArticleCard({ post, navigate, featured = false }) {
  const [ref, visible] = useReveal();
  return <article ref={ref} className={`${featured ? "article-card article-card-featured" : "article-card"} voice-${post.author.order} reveal-item ${visible ? "is-visible" : ""}`}><Link to={`/articles/${post.slug}`} navigate={navigate}><div className="article-card-copy"><ArticleMeta post={post} navigate={navigate} linked={false} /><h3>{post.title}</h3><p>{post.summary}</p></div><Cover post={post} compact={!featured} priority={featured && post.featuredOrder === 1} /><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span></Link></article>;
}

function Manifest({ navigate }) {
  const [ref, visible] = useReveal();
  const preview = site.manifest.split("\n\n").slice(0, 3).join("\n\n");
  return <section ref={ref} className={`manifest-section reveal-section ${visible ? "is-visible" : ""}`}><div className="manifest-section-shell"><div className="manifest-section-content"><p className="manifest-label">MANIFEST EDITORIAL</p><div className="manifest-section-lower"><div className="manifest-text manifest-preview"><Markdown>{preview}</Markdown></div><Link className="manifest-link" to="/manifest" navigate={navigate}>Llegir el manifest <ArrowUpRight size={16} /></Link></div></div></div></section>;
}

function AuthorHighlights({ navigate }) {
  const [ref, visible] = useReveal();
  return <section ref={ref} className={`author-band reveal-section ${visible ? "is-visible" : ""}`}><div className="section-shell"><div className="section-heading"><h2>Tres veus</h2><Link className="quiet-link" to="/autors" navigate={navigate}>Veure autors <ArrowUpRight size={15} /></Link></div><div className="author-grid">{authors.map((author) => <article className="author-tile" key={author.id}><Link to={`/autors/${author.handle}`} navigate={navigate}><AuthorInitial author={author} /><h3>{author.name}</h3><p>{author.role}</p><span className="author-action">Veure la seva veu <ArrowUpRight size={16} /></span></Link></article>)}</div></div></section>;
}

function ArticlesExplorer({ navigate, heading = true }) {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("published-desc");
  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const filtered = posts
    .filter((post) => selected.length === 0 || selected.includes(post.author.id))
    .sort((a, b) => {
      const field = order.startsWith("updated") ? "updatedAt" : "publishedAt";
      const direction = order.endsWith("desc") ? -1 : 1;
      return (new Date(a[field]) - new Date(b[field])) * direction;
    });
  return <section className={heading ? "articles-explorer" : "section-shell section-block articles-home"}>{!heading && <div className="section-heading"><h2>Articles</h2><Link className="quiet-link" to="/articles" navigate={navigate}>Veure tots <ArrowUpRight size={15} /></Link></div>}<div className="filters" aria-label="Filtres d'articles"><div className="filter-pills"><button className={selected.length === 0 ? "active" : ""} onClick={() => setSelected([])} type="button">Tots</button>{authors.map((author) => { const active = selected.includes(author.id); return <button className={active ? "active" : ""} key={author.id} onClick={() => toggle(author.id)} type="button" aria-pressed={active}>{active && <Check size={13} />}{author.name}</button>; })}</div><label className="sort-select">{order.endsWith("desc") ? <ArrowDown size={15} /> : <ArrowUp size={15} />}<span className="sr-only">Ordenar articles</span><select value={order} onChange={(event) => setOrder(event.target.value)}><option value="published-desc">Més recents</option><option value="published-asc">Més antics</option><option value="updated-desc">Actualitzats</option></select></label></div><div className="article-grid">{filtered.slice(0, heading ? 12 : 8).map((post) => <ArticleCard key={post.id} post={post} navigate={navigate} />)}</div></section>;
}

function Home({ navigate }) {
  return <main><Seo title={site.name} description={descriptions.home} /><section className="hero section-shell"><div className="hero-copy"><h1>Les idees també<br />necessiten temps.</h1><p>Escrivim, precisament, per intentar aclarir-les.</p></div></section><Manifest navigate={navigate} /><section className="section-shell section-block featured-section"><div className="section-heading"><h2>Destacats</h2><Link className="quiet-link" to="/articles" navigate={navigate}>Veure articles <ArrowUpRight size={15} /></Link></div><div className="featured-grid">{featuredPosts.slice(0, 3).map((post) => <ArticleCard key={post.id} post={post} navigate={navigate} featured />)}</div></section><AuthorHighlights navigate={navigate} /><ArticlesExplorer navigate={navigate} heading={false} /></main>;
}

function ArticlesPage({ navigate }) {
  return <main className="page-shell collection-page"><Seo title="Articles" description={descriptions.articles} path="/articles" /><header className="simple-page-heading"><h1>Articles</h1></header><ArticlesExplorer navigate={navigate} /></main>;
}

function AuthorsPage({ navigate }) {
  return <main className="page-shell collection-page"><Seo title="Autors" description={descriptions.authors} path="/autors" /><header className="simple-page-heading"><p className="eyebrow">Les veus del projecte</p><h1>Autors</h1></header><div className="authors-page-grid">{authors.map((author) => <article className="author-profile" key={author.id}><Link to={`/autors/${author.handle}`} navigate={navigate}><AuthorInitial author={author} /><h2>{author.name}</h2><p>{author.role}</p><span className="author-action">Veure perfil i articles <ArrowUpRight size={16} /></span></Link></article>)}</div></main>;
}

function AuthorPage({ author, navigate }) {
  if (!author) return <NotFound navigate={navigate} />;
  const authored = posts.filter((post) => post.author.id === author.id);
  const isPersonalProfile = author.handle === "marti-carrasco";
  const isDetailedProfile = Boolean(author.headline || author.intro || author.about?.length || author.topics?.length || author.principles?.length);
  if (isPersonalProfile) return <main className="author-detail author-detail-personal">
    <Seo title={author.name} description={author.about?.[0] || author.role} path={`/autors/${author.handle}`} image={author.avatar || "/og.png"} />
    <header className="author-personal-hero" style={{ "--profile-background": `url("${author.profileBackground || ""}")` }}>
      <img className="author-personal-photo" src={author.avatar} alt={`Retrat de ${author.name}`} />
      <div className="author-personal-heading"><h1>{author.name}</h1><AuthorSocialLinks author={author} className="author-personal-socials" ariaLabel={`Xarxes de ${author.name} a la capçalera`} /></div>
    </header>
    {authored.length > 0 && <section className="author-publications-preview section-shell" aria-labelledby="author-publications-preview-heading">
      <div className="section-heading"><h2 id="author-publications-preview-heading">Articles publicats</h2><a className="quiet-link" href="#author-all-articles">Veure’ls tots <ArrowUpRight size={15} /></a></div>
      <div className="author-preview-row">{authored.slice(0, 3).map((post) => <ArticleCard key={post.id} post={post} navigate={navigate} />)}</div>
    </section>}
    <div className="author-personal-content section-shell">
      <article className="author-personal-copy">{author.about?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
      <AuthorSocialLinks author={author} />
      <section id="author-all-articles" className="author-writing author-personal-writing" aria-labelledby="author-all-articles-heading">
        <div className="section-heading"><div><p className="eyebrow">Textos publicats</p><h2 id="author-all-articles-heading">Tots els articles de {author.name}</h2></div></div>
        {authored.length > 0 ? <div className="article-grid author-articles">{authored.map((post) => <ArticleCard key={post.id} post={post} navigate={navigate} />)}</div> : <p>Encara no hi ha articles publicats.</p>}
      </section>
    </div>
  </main>;
  return <main className={`page-shell author-detail${isDetailedProfile ? " author-detail-rich" : ""}`}><Seo title={author.name} description={author.headline || author.role} path={`/autors/${author.handle}`} image={author.avatar || "/og.png"} /><header className="author-detail-header"><AuthorMark author={author} large /><div><p className="eyebrow">Una veu d'Entre línies</p><h1>{author.name}</h1><p>{author.role}</p></div></header>{isDetailedProfile && <><section className="author-introduction"><p className="author-headline">{author.headline}</p><p>{author.intro}</p></section><section className="author-story"><div className="author-story-label"><span>01</span><span>Des d'on escric</span></div><div className="author-story-copy">{author.about?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section><section className="author-topics"><div className="section-heading"><div><p className="eyebrow">Quatre fils que es repeteixen</p><h2>Temes que em fan preguntes</h2></div></div><div className="author-topic-grid">{author.topics?.map((topic, index) => <article className="author-topic" key={topic.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{topic.title}</h3><p>{topic.text}</p></article>)}</div></section><section className="author-method"><div className="author-method-heading"><p className="eyebrow">Una manera de treballar</p><h2>Abans de publicar, intento...</h2></div><ol>{author.principles?.map((principle) => <li key={principle}>{principle}</li>)}</ol></section></>}<section className="section-block author-writing"><div className="section-heading"><div><p className="eyebrow">Textos publicats</p><h2>{authored.length ? "Articles de Martí" : "Encara no hi ha articles"}</h2></div></div><div className="article-grid author-articles">{authored.map((post) => <ArticleCard key={post.id} post={post} navigate={navigate} />)}</div></section>{author.links?.length > 0 && <nav className="author-links" aria-label={`Enllaços de ${author.name}`}>{author.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={14} /></a>)}</nav>}</main>;
}

function ManifestPage() { return <main className="manifest-page-modern"><Seo title="Manifest" description="El manifest editorial d'Entre línies: escriure per entendre millor." path="/manifest" /><div className="manifest-page-inner"><article><p className="manifest-label">Manifest Editorial</p><h1>Una mica de context</h1><div className="manifest-page-divider" /><div className="manifest-long"><Markdown>{site.manifest}</Markdown></div></article></div></main>; }

function safeExternalUrl(value) {
  try { const url = new URL(value); return ["https:"].includes(url.protocol) ? url : null; } catch { return null; }
}

function EmbedBlock({ block }) {
  const [consented, setConsented] = useState(false);
  const url = safeExternalUrl(block.url);
  const label = block.service === "twitter" ? "Publicació de X / Twitter" : block.service === "instagram" ? "Publicació d'Instagram" : block.service === "youtube" ? "Vídeo de YouTube" : "Pàgina web";
  if (!url) return <aside className="embed-card embed-error"><strong>Contingut extern no disponible</strong><p>L’adreça no és segura o no és vàlida.</p></aside>;
  const youtubeId = block.service === "youtube" && (url.hostname.includes("youtu.be") ? url.pathname.slice(1) : url.searchParams.get("v"));
  if (youtubeId && consented) return <div className="video-embed"><iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`} title={block.title || "Vídeo de YouTube"} loading="lazy" sandbox="allow-scripts allow-same-origin allow-presentation" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>;
  return <aside className="embed-card"><div><ExternalLink size={17} /><span>{label}</span></div><p>{block.title || "Contingut extern"}</p>{youtubeId ? <button type="button" onClick={() => setConsented(true)}>Carregar vídeo de YouTube</button> : <a href={url.href} target="_blank" rel="noopener noreferrer">Obrir al servei original <ArrowUpRight size={15} /></a>}<small>El contingut extern només es carrega quan ho demanes.</small></aside>;
}

function ArticleBlocks({ post }) {
  return <div className="article-body">{post.blocks.map((block, index) => { if (block.type === "text") return <div className="text-block" key={index}><Markdown>{block.body}</Markdown></div>; if (block.type === "image") return <figure className={`article-image image-${block.width || "large"} align-${block.align || "center"}`} key={index}><img src={block.src} alt={block.alt || ""} loading="lazy" decoding="async" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>; if (block.type === "embed") return <EmbedBlock block={block} key={index} />; if (block.type === "opinion") { const author = resolveAuthor(block.author); if (!author) return null; return <aside className="opinion-block" key={index}><div className="opinion-heading"><AuthorMark author={author} /><div><p className="eyebrow">Una altra mirada</p><strong>{author.name}</strong></div></div><Markdown>{block.body}</Markdown></aside>; } return null; })}</div>;
}

function ShareButton({ post }) {
  const [status, setStatus] = useState("");
  const share = async () => { try { const url = window.location.href; if (navigator.share) await navigator.share({ title: post.title, url }); else { await navigator.clipboard.writeText(url); setStatus("Enllaç copiat"); } } catch (error) { if (error?.name !== "AbortError") setStatus("No s'ha pogut compartir"); } };
  return <div><button className="share-button" type="button" onClick={share}><Share2 size={16} />Compartir</button><span className="share-status" aria-live="polite">{status}</span></div>;
}

function ArticlePage({ post, navigate }) {
  if (!post) return <NotFound navigate={navigate} />;
  const articleUrl = `${String(site.url || window.location.origin).replace(/\/$/, "")}/articles/${post.slug}`;
  const articleJsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.summary, image: new URL(post.cover, articleUrl).href, datePublished: post.publishedAt, dateModified: post.updatedAt, mainEntityOfPage: articleUrl, author: { "@type": "Person", name: post.author.name, url: `${String(site.url || window.location.origin).replace(/\/$/, "")}/autors/${post.author.handle}` }, publisher: { "@type": "Organization", name: site.name } };
  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
  return <main className="article-page"><Seo title={post.title} description={post.summary} path={`/articles/${post.slug}`} image={post.cover} type="article" jsonLd={articleJsonLd} lang={post.lang || "ca"} /><div className="article-header"><Link className="back-link" to="/articles" navigate={navigate}><ChevronLeft size={16} />Articles</Link><ArticleMeta post={post} navigate={navigate} /><h1>{post.title}</h1><p className="article-summary">{post.summary}</p><Cover post={post} priority /></div><div className="article-layout"><ArticleBlocks post={post} /><aside className="article-aside"><ShareButton post={post} /><div className="aside-note"><MessageCircle size={17} /><span>Una idea no s'acaba quan es publica.</span></div></aside></div>{more.length > 0 && <section className="article-more"><div className="section-heading"><h2>Més articles</h2></div><div className="article-grid">{more.map((item) => <ArticleCard key={item.id} post={item} navigate={navigate} />)}</div></section>}{site.commentsEnabled && <section className="article-comments"><div className="section-heading"><h2>Comentaris</h2></div><Comments slug={post.slug} /></section>}</main>;
}

const legalPages = {
  "/privacitat": ["Privacitat", "Privacitat sense perfils innecessaris", "No utilitzem analítica publicitària ni creem perfils de lectura. Quan els comentaris estiguen actius, el nom i el text aportats es publicaran i es guardaran al servei de comentaris. Els continguts externs només es carreguen després d’una acció explícita."],
  "/avis-legal": ["Avís legal", "Un projecte editorial independent", "Entre línies és un projecte compartit sense finalitat comercial. Cada article expressa l’opinió personal del seu autor. La titularitat, el domini i la llicència definitiva dels textos s’indicaran abans del llançament públic."],
  "/comentaris": ["Política de comentaris", "Conversa oberta, moderació clara", "Els comentaris poden discrepar, però no poden incloure assetjament, spam, dades personals alienes ni contingut il·legal. Es publicaran immediatament. Els tres autors podran ocultar o eliminar aportacions i documentaran les decisions sensibles."],
  "/contacte": ["Contacte", "Encara no publiquem un canal de contacte", "L’equip ha decidit no mostrar una adreça provisional. Abans del llançament públic s’afegirà un canal real i es definirà qui respon les consultes i les peticions de retirada de contingut."],
};

function LegalPage({ path }) { const [label, title, body] = legalPages[path]; return <main className="page-shell legal-page"><Seo title={label} description={body} path={path} /><p className="eyebrow">{label}</p><h1>{title}</h1><div className="manifest-long"><p>{body}</p></div></main>; }

function NotFound({ navigate }) { return <main className="page-shell not-found"><Seo title="Pàgina no trobada" description="Aquesta pàgina no existeix o ja no és pública." path={window.location.pathname} /><p className="eyebrow">Error 404</p><h1>Aquesta línia<br /><em>no porta enlloc.</em></h1><p>La pàgina no existeix, ha canviat d’adreça o ja no és pública.</p><Link className="text-button" to="/" navigate={navigate}>Tornar a l’inici <ArrowUpRight size={15} /></Link></main>; }

function Footer({ navigate }) {
  return <footer className="site-footer">
    <div className="footer-top">
      <Link className="footer-logo-link" to="/" navigate={navigate} aria-label="Entre línies, inici"><img className="brand-logo brand-logo-footer" src="/assets/brand/entre-linies-logo.png" alt="" loading="lazy" decoding="async" /></Link>
      <nav className="footer-links" aria-label="Informació del projecte"><Link to="/manifest" navigate={navigate}>Manifest</Link><Link to="/privacitat" navigate={navigate}>Privacitat</Link><Link to="/comentaris" navigate={navigate}>Comentaris</Link><Link to="/contacte" navigate={navigate}>Contacte</Link><Link to="/avis-legal" navigate={navigate}>Avís legal</Link></nav>
    </div>
    <section className="footer-voices" aria-labelledby="footer-voices-heading">
      <h2 id="footer-voices-heading">Les tres veus</h2>
      <div className="footer-people">{authors.map((author) => <address className="footer-person" key={author.id}>
        <strong>{author.name}</strong>
        {author.email ? <a href={`mailto:${author.email}`}>{author.email}</a> : <span className="footer-placeholder">Correu pendent d'afegir</span>}
        <div className="footer-socials">
          {author.linkedin ? <a href={author.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ExternalLink size={13} /></a> : <span className="footer-placeholder">LinkedIn pendent</span>}
          {author.twitter ? <a href={author.twitter} target="_blank" rel="noopener noreferrer">Twitter / X<ExternalLink size={13} /></a> : <span className="footer-placeholder">Twitter / X pendent</span>}
          {author.links?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={13} /></a>)}
        </div>
      </address>)}</div>
    </section>
    <div className="footer-bottom"><small>© 2026</small></div>
  </footer>;
}

export default function App() {
  const { path, navigate } = usePath();
  const articleSlug = path.match(/^\/articles\/([^/]+)$/)?.[1];
  const authorHandle = path.match(/^\/autors\/([^/]+)$/)?.[1];
  const isReadingPage = Boolean(articleSlug || authorHandle || path === "/manifest" || legalPages[path]);
  let page;
  if (path === "/") page = <Home navigate={navigate} />;
  else if (path === "/articles") page = <ArticlesPage navigate={navigate} />;
  else if (path === "/autors") page = <AuthorsPage navigate={navigate} />;
  else if (path === "/manifest") page = <ManifestPage />;
  else if (legalPages[path]) page = <LegalPage path={path} />;
  else if (articleSlug) page = <ArticlePage post={posts.find((item) => item.slug === articleSlug)} navigate={navigate} />;
  else if (authorHandle) page = <AuthorPage author={authors.find((item) => item.handle === authorHandle)} navigate={navigate} />;
  else page = <NotFound navigate={navigate} />;
  return <><a className="skip-link" href="#main-content">Saltar al contingut</a><ReadingProgress /><div className={`site-frame${isReadingPage ? " is-reading-page" : ""}`}>{path === "/" && <GlobalThreads path={path} />}<Header navigate={navigate} path={path} /><div id="main-content">{page}</div><Footer navigate={navigate} /></div></>;
}
