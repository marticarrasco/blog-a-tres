# Entre línies — Blog a tres veus

Web editorial col·laborativa construïda amb React i Vite. El contingut viu en fitxers JSON, s’edita amb Pages CMS i es publica com un lloc estàtic a Vercel. Els esborranys i articles arxivats no entren al web públic.

## Desenvolupament

Requisits: Node.js 20 o superior.

```bash
npm ci
npm run dev
```

Validació i build de producció:

```bash
npm run validate:content
npm run build
npm run preview
```

La validació comprova camps obligatoris, slugs, autors, dates, portades, mida i format d’imatges, embeds segurs i el límit d’una opinió alternativa. També avisa d’actius no utilitzats, però no els elimina.

## Contingut i Pages CMS

- Articles: `content/posts/*.json`
- Autors: `content/authors/*.json`
- Configuració: `content/site.json`
- Editor: `.pages.yml`
- Portades: `public/assets/articles/covers/`
- Imatges internes: `public/assets/articles/inline/`
- Avatars: `public/assets/articles/avatars/`

La font de veritat és [PROJECT-REQUIREMENTS.md](PROJECT-REQUIREMENTS.md). El model de Pages CMS permet text enriquit, imatges, embeds i una opinió alternativa. Els fitxers d’imatge acceptats són JPEG, PNG, WebP i GIF, amb noms sanejats i un límit de 5 MB verificat abans del build. SVG i pujada directa de vídeo queden desactivats en la primera versió.

Per donar accés editorial, instal·la l’aplicació oficial de Pages CMS al repositori i invita els tres autors com a col·laboradors individuals. No compartisques contrasenyes ni tokens. Cada invitació es revoca des de Pages CMS; l’accés de GitHub App es revoca des de la configuració del repositori. Els col·laboradors poden editar contingut i mitjans, però només una persona amb accés GitHub pot canviar `.pages.yml`.

## Desplegament a Vercel

1. Connecta el repositori de GitHub a un projecte Vercel.
2. Usa `npm run build` i el directori `dist`.
3. Defineix `VITE_SITE_URL` amb el domini públic.
4. Si els comentaris ja estan validats, defineix `VITE_WALINE_SERVER_URL` i activa `commentsEnabled` a `content/site.json`.

`vercel.json` manté les rutes profundes de l’SPA i afegeix capçaleres de seguretat. Cada canvi de Pages CMS crea un canvi versionat a GitHub i Vercel el torna a desplegar. Els fitxers `sitemap.xml` i `robots.txt` es generen durant el build.

## Comentaris: Waline + Neon

El client de Waline està integrat, però la bandera de comentaris es manté desactivada fins que l’entorn real supere la prova d’acceptació. El lector només veu el camp de nom; no cal GitHub ni correu. El servidor de Waline i la base Neon són projectes separats i els seus secrets no entren mai al JavaScript públic.

Abans d’activar-lo cal:

- desplegar Waline a Vercel amb PostgreSQL de Neon;
- limitar l’origen al domini del blog;
- crear i provar tres comptes de moderació independents;
- activar moderació prèvia i protecció antispam/Turnstile si és necessària;
- verificar aprovació, ocultació i eliminació;
- revisar errors a Vercel i consum al panell de Neon.

La desactivació és immediata: posa `commentsEnabled` a `false`. Per revocar un moderador, elimina o desactiva el seu compte al panell de Waline. Per substituir credencials, rota-les a Neon/Vercel i torna a desplegar el servei, mai el frontend.

## Decisions conscients de la primera versió

- El domini, el contacte públic i la llicència final encara no estan confirmats; el lloc ho declara explícitament.
- YouTube es carrega amb consentiment i domini `youtube-nocookie.com`. X, Instagram i pàgines arbitràries utilitzen un enllaç segur fins que cada embed es valide en producció.
- Les imatges referenciades no s’esborren automàticament. El validador detecta referències trencades i avisa d’arxius orfes.
- Les dades editorials es recuperen des de l’historial de GitHub; els comentaris es recuperen i administren des de Neon/Waline.

## Variables d’entorn

Consulta `.env.example`. Les variables amb prefix `VITE_` són configuració pública; no hi poses secrets. Les credencials de Neon, GitHub i administració de Waline només pertanyen als entorns de servidor dels serveis corresponents.
