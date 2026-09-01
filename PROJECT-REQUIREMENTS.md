# Document de requisits del projecte

## Entre línies — Blog a tres veus

**Versió:** 1.0  
**Data:** 31 d’agost de 2026  
**Estat:** base de requisits per començar la implementació  
**Propietari tècnic:** Martí  
**Equip editorial:** tres autors

Aquest document és la font de veritat del projecte. Recull les decisions preses fins ara, les necessitats editorials, l’arquitectura prevista, les restriccions de cost i els punts que encara s’han de validar abans de publicar.

## 1. Resum executiu

Entre línies és un blog col·laboratiu on tres persones publiquen textos d’opinió sobre qualsevol tema que els interesse. El propòsit principal no és monetitzar el projecte ni representar una doctrina comuna: és pensar amb més profunditat a través de l’escriptura, ordenar idees, explorar punts de vista i deixar oberta la possibilitat de revisar-los.

Cada article representa l’opinió personal del seu autor. Els autors poden discrepar entre ells i poden publicar respostes o rèpliques. El projecte comú és l’acte d’escriure i conversar, no el contingut ideològic concret de cada text.

La web serà una aplicació moderna i estàtica, publicada a Vercel, amb el contingut guardat al repositori de GitHub i editat mitjançant Pages CMS. Els autors han de poder crear i editar articles sense tocar codi. Els comentaris públics no han d’exigir autenticació amb GitHub i els tres autors han de poder moderar-los i eliminar-los.

## 2. Decisions confirmades

| Àmbit | Decisió |
| --- | --- |
| Naturalesa | Blog col·laboratiu, no blog personal. |
| Autoria | Tres autors independents. Un article té un únic autor en el model inicial. |
| Opinió | Els articles expressen opinions personals, no la posició oficial del projecte. |
| Temes | No hi ha una llista tancada de temes: cada autor pot escriure sobre allò que vulga. |
| Discrepàncies | Es permeten opinions contràries, rèpliques i articles de resposta. |
| Opinió alternativa | Un article pot incloure una caixa clarament separada amb una aportació breu d’un altre autor. |
| Publicació | Cada autor pot publicar els seus textos. Tots tres podran editar tots els articles. |
| CMS | Pages CMS. |
| Gestió del contingut | Fitxers del repositori de GitHub, versionats amb Git. |
| Foundation | El blog personal de Martí, [`marticarrasco-personal-site`](https://github.com/marticarrasco/marticarrasco-personal-site), serà la referència visual i tècnica principal. |
| Hosting | Vercel, pla Hobby, sense despesa. |
| Idiomes | Català, castellà i anglès, sense versions multilingües obligatòries ni camps d’idioma inicials. |
| Etiquetes | No s’inclouen en la primera versió. |
| Publicació futura | No cal programar publicacions. |
| Estats | Esborrany, publicat i arxivat/privat. |
| Lectura | No es mostrarà temps estimat de lectura. |
| Articles relacionats | No s’inclouen inicialment. |
| Índex | No s’inclou índex automàtic en la primera versió. |
| Portada | Manifest, articles destacats manuals, destacats per autor i llistat complet filtrable. |
| Comentaris | Identitat amb nom, sense obligar a iniciar sessió amb GitHub. |
| Moderació | Els tres autors han de poder moderar i eliminar comentaris. |
| Cost | No s’han d’afegir serveis de pagament ni dependències que obliguen a pagar per l’ús previst. |

## 3. Propòsit i principis editorials

### 3.1 Propòsit

El blog ha de facilitar que els autors:

- transformen intuïcions en idees articulades;
- escriguen per pensar i no només per publicar;
- ordenen arguments i consideren punts de vista diferents;
- deixen un registre públic del seu procés de reflexió;
- conversen amb lectors i amb els altres autors;
- puguen canviar d’opinió sense que el text deixe de ser una peça vàlida del projecte.

### 3.2 Principis

1. **Pluralitat:** no cal que els autors coincidisquen.
2. **Responsabilitat personal:** cada autor respon del seu article.
3. **Claredat:** les aportacions d’altres autors han d’estar visualment separades.
4. **Profunditat:** la interfície ha d’afavorir la lectura pausada i la reflexió.
5. **Simplicitat editorial:** publicar no ha de requerir coneixements tècnics.
6. **Reversibilitat:** els canvis de contingut han de quedar versionats a GitHub i els articles problemàtics es poden arxivar o retirar.
7. **Cost zero:** s’han de prioritzar serveis amb plans gratuïts suficients per a un blog de trànsit baix.

### 3.3 Política de conflictes

Si un article genera conflicte, els tres autors intentaran arribar a un acord. En última instància, podran retirar-lo o passar-lo a estat arxivat. Aquesta política és editorial i no s’ha de substituir per una moderació automàtica de les opinions.

## 4. Públic i casos d’ús

### 4.1 Persones usuàries

- **Lector:** consulta articles, autors, manifest, enllaços i comentaris; pot compartir articles.
- **Autor/editor:** entra a Pages CMS, crea i edita articles, gestiona imatges i canvia l’estat de publicació.
- **Moderador:** qualsevol dels tres autors; revisa, aprova, oculta o elimina comentaris.
- **Responsable tècnic:** manté el repositori, la configuració de Pages CMS, Vercel i el servei de comentaris.

### 4.2 Històries d’usuari principals

- Com a lector, vull entendre ràpidament què és el projecte i quina filosofia té.
- Com a lector, vull descobrir articles destacats i articles de cada autor.
- Com a lector, vull filtrar i ordenar tots els articles per autor i data.
- Com a lector, vull saber qui ha escrit un article i quan es va publicar o actualitzar.
- Com a lector, vull llegir textos amb format ric, imatges, vídeos i contingut incrustat.
- Com a lector, vull comentar amb un nom sense haver d’utilitzar GitHub.
- Com a autor, vull crear un article des d’un formulari visual sense editar JSON ni Markdown manualment.
- Com a autor, vull pujar una portada i imatges dins de l’article.
- Com a autor, vull desar un article com a esborrany i publicar-lo quan estiga preparat.
- Com a autor, vull editar qualsevol article del projecte, perquè els tres autors comparteixen la responsabilitat editorial.
- Com a moderador, vull veure els comentaris pendents i eliminar els que siguen inadequats.
- Com a equip, volem que qualsevol canvi important quede registrat i siga recuperable.

## 5. Arquitectura d’informació

### 5.1 Pàgines públiques

- `/` — portada.
- `/articles` — explorador de tots els articles.
- `/articles/:slug` — lectura d’un article.
- `/autors` — llistat dels tres autors.
- `/autors/:handle` — pàgina individual d’un autor amb biografia i articles.
- `/manifest` — manifest complet, si es decideix oferir també una URL pròpia.
- Pàgines legals — política de privacitat, cookies si n’hi ha, avís legal i contacte, segons la jurisdicció i la necessitat final.
- Pàgina 404 — resposta clara per a rutes inexistents.

### 5.2 Navegació

La navegació principal ha d’incloure com a mínim el nom del projecte, Articles, Autors i Manifest. El peu de pàgina ha d’incloure la informació legal disponible, contacte i enllaços socials si es confirmen.

## 6. Requisits de la portada

La portada ha de presentar el projecte com una experiència editorial, no només com una graella de posts.

### 6.1 Manifest visual

- Mostrar una introducció o un fragment del manifest a la primera pantalla.
- Permetre expandir-lo en fer clic o activar-lo amb teclat.
- L’expansió ha d’incloure una animació curta, suau i accessible.
- L’animació no pot impedir la lectura, el focus de teclat ni la navegació amb `prefers-reduced-motion`.
- El manifest complet ha de ser editable des de Pages CMS.

### 6.2 Articles destacats

- L’equip ha d’escollir manualment quins articles apareixen com a destacats.
- La selecció no depèn només de la data.
- S’ha de poder definir un ordre manual.
- La presentació pot ser un carrusel o una composició editorial equivalent.
- Si és un carrusel, ha d’incloure controls visibles, navegació amb teclat, focus correcte i una alternativa que permeta consultar tots els articles sense moure’s automàticament.
- Els articles arxivats o no publicats no poden aparéixer.

### 6.3 Destacats per autor

- Mostrar una selecció d’articles associats a cadascun dels tres autors.
- La secció ha de continuar funcionant encara que un autor encara no tinga molts articles.
- La informació de cada autor ha d’enllaçar a la seua pàgina individual.

### 6.4 Tots els articles

- Mostrar el llistat complet d’articles públics.
- Permetre seleccionar un o més autors.
- Permetre ordenar, com a mínim, per data de publicació i per data d’actualització.
- Indicar visualment l’autor, la data, el títol, el resum i la portada.
- No mostrar esborranys ni articles arxivats.
- La interfície de filtres ha de funcionar amb teclat i ser usable en mòbil.

## 7. Requisits de la pàgina d’article

Cada article públic ha de mostrar:

- títol;
- autor;
- data de publicació;
- data d’actualització quan siga diferent o rellevant;
- imatge de portada;
- resum o entradeta;
- cos de l’article amb format ric;
- cites i enllaços externs;
- botons per compartir;
- comentaris, si el sistema està actiu;
- enllaços a la pàgina de l’autor i a altres articles disponibles.

No s’inclouen inicialment temps estimat de lectura, índex automàtic ni articles relacionats automàtics.

### 7.1 URL i slug

- Cada article ha de tenir un `slug` explícit.
- El canvi del títol no ha de canviar automàticament l’URL.
- Si un slug canvia expressament, s’ha de valorar una redirecció des de l’URL anterior.
- El slug ha de ser estable, llegible i segur per a URL.
- No s’han d’utilitzar títols com a única font automàtica de la URL sense revisió.

### 7.2 Opinió d’un altre autor

- Un article pot incloure una aportació breu d’un altre autor.
- Aquesta aportació ha d’aparéixer dins d’una caixa o secció clarament diferenciada del text principal.
- Ha de mostrar el nom i l’enllaç de l’autor que fa l’aportació.
- No s’ha de confondre amb coautoria ni amb una opinió oficial del projecte.
- En el model inicial hi haurà com a màxim una aportació alternativa per article, llevat que l’equip decidisca ampliar-ho.

## 8. Requisits de contingut i editor

Pages CMS és l’editor escollit. L’objectiu és que els autors treballen des d’una interfície visual i no des del codi.

### 8.1 Camps d’un article

| Camp | Obligatori | Requisits |
| --- | --- | --- |
| Títol | Sí | Text clar i llegible. |
| Slug/URL | Sí | Estable; no canvia automàticament amb el títol. |
| Autor | Sí | Un únic autor, seleccionat de la col·lecció d’autors. |
| Data de publicació | Sí | Representa la data de l’article/publicació editorial. |
| Data d’actualització | Recomanat | S’ha d’actualitzar quan el text canvia de forma significativa. |
| Estat | Sí | `draft`, `published` o `archived`. |
| Article destacat | Sí | Booleà per a la selecció manual. |
| Ordre del destacat | No | Número per ordenar manualment els destacats. |
| Resum | Sí | Text curt per a targetes, portada i SEO. |
| Portada | Sí en la pràctica | Imatge obligatòria per mantenir una identitat visual consistent. |
| Contingut | Sí | Llista de blocs visuals. |

### 8.2 Format del contingut

L’editor ha de permetre com a mínim:

- paràgrafs;
- títols i subtítols;
- negreta;
- cursiva;
- enllaços;
- llistes;
- cites;
- separadors o salts visuals quan siguen necessaris;
- imatges;
- GIFs;
- vídeos;
- embeds de xarxes socials i pàgines web;
- caixa d’opinió alternativa.

El contingut pot guardar-se com Markdown enriquit dins de blocs, però aquesta complexitat no ha de ser visible per a l’autor en l’edició normal.

### 8.3 Estat editorial

- `draft`: només visible per a l’equip editor i no entra en la web pública.
- `published`: visible públicament i indexable, si compleix les condicions SEO.
- `archived`: deixa de ser públic, però es conserva al repositori per a historial i possible recuperació.
- Canviar l’estat ha de ser una acció explícita.
- La compilació pública només ha d’incloure articles `published`.

### 8.4 Edició col·laborativa

- Cada autor ha de tenir el seu propi accés a l’editor.
- No s’han de compartir contrasenyes ni tokens personals.
- Els tres autors podran editar tots els articles.
- Pages CMS ha de connectar-se al repositori de GitHub del projecte mitjançant el mecanisme oficial corresponent.
- L’accés editorial no s’ha de resoldre exposant un token de GitHub al navegador públic.
- La configuració del repositori i de Pages CMS ha de quedar documentada per poder revocar o substituir accessos.

La via preferida és utilitzar la invitació de col·laboradors de Pages CMS amb comptes individuals. S’ha de validar en la configuració real si els tres autors poden iniciar sessió amb el flux desitjat sense haver d’utilitzar GitHub directament. Si el servei allotjat no ho permet de manera fiable, caldrà decidir entre acceptar l’autenticació GitHub per als editors o desplegar una instància pròpia de Pages CMS, que afegeix manteniment i dependències.

## 9. Autors

### 9.1 Pàgina individual

Cada autor ha de tenir una pàgina pròpia amb:

- nom;
- fotografia o avatar opcional;
- identificador estable;
- frase curta o rol descriptiu;
- biografia enriquida;
- enllaços personals o socials;
- llistat dels seus articles publicats;
- articles destacats si n’hi ha.

### 9.2 Ordenació

L’ordre de presentació dels autors ha de ser editable amb un camp explícit, no dependre del nom del fitxer ni de l’ordre accidental del directori.

## 10. Imatges, vídeos i embeds

### 10.1 Imatges

- Portada obligatòria per als articles publicats.
- Imatges il·limitades dins del cos, dins dels límits de hosting i repositori.
- Mida màxima inicial: 5 MB per fitxer.
- Acceptar els formats d’imatge habituals compatibles amb el navegador; com a mínim JPEG, PNG, WebP i GIF. Cal decidir específicament si s’acceptarà SVG.
- No es pressuposa compressió automàtica. Si es vol afegir més endavant, haurà de ser una millora explícita.
- Cada imatge interna pot definir amplada: petita, mitjana, gran o completa.
- Cada imatge interna pot definir alineació: esquerra, centrada o dreta.
- Text alternatiu opcional en el model actual; s’ha d’oferir una recomanació editorial perquè s’emplene quan la imatge aporte informació.
- Peu d’imatge opcional.
- Les imatges de portada i les imatges internes han de tenir rutes separades per facilitar l’organització.

### 10.2 Protecció d’actius

- Una imatge no s’ha de poder esborrar des de l’editor si encara està referenciada per un article.
- Abans d’implementar aquesta protecció cal definir com es comproven les referències: cerca al contingut, inventari generat o validació en un script de compilació.
- El sistema ha d’avisar dels fitxers no utilitzats, però no els ha d’eliminar automàticament.
- Els noms de fitxer han de ser segurs i, preferiblement, independents de caràcters problemàtics o accents.

### 10.3 Vídeos i GIFs

- Es permeten GIFs com a imatges.
- Es permeten vídeos, preferiblement mitjançant URL externa per no carregar fitxers grans al repositori.
- Si s’accepta pujada directa de vídeo, caldrà fixar límit, formats, mida i impacte sobre Vercel/GitHub.
- No s’ha de fer reproducció automàtica amb so.

### 10.4 Embeds

El model ha d’incloure un bloc d’embed amb servei, URL i títol accessible opcional. S’han de considerar:

- X/Twitter;
- Instagram;
- YouTube;
- pàgines web mitjançant iframe o alternativa segura.

Abans de donar-ho per tancat cal validar cada servei en producció, perquè les xarxes socials poden canviar APIs, bloquejar iframes o exigir scripts de tercers. Els embeds han d’estar en una llista permesa, amb `sandbox` i política de continguts quan siga possible. També s’ha de valorar el seu impacte en privacitat i rendiment.

## 11. Comentaris i moderació

### 11.1 Necessitats

- Els lectors poden comentar sense autenticar-se amb GitHub.
- En la primera versió, el lector pot indicar només un nom o sobrenom.
- No s’ha d’exigir correu electrònic si no és necessari.
- El sistema ha de guardar els comentaris fora del repositori editorial principal o en una infraestructura adequada per a dades de comentaris.
- Els tres autors han de poder revisar, ocultar i eliminar comentaris.
- Cal disposar de protecció contra spam, enllaços maliciosos, HTML insegur i abusos automatitzats.
- Cal indicar al lector que el nom i el contingut del comentari es publiquen.
- No s’ha d’introduir seguiment publicitari ni perfils innecessaris.

### 11.2 Solució preferida a validar

La proposta actual és **Waline desplegat a Vercel amb una base de dades PostgreSQL gratuïta a Neon**:

```text
Lector ──> component de comentaris ──> Waline ──> Neon PostgreSQL
                                      │
                                      └── panell de moderació per als autors
```

Configuració funcional desitjada:

- inici de sessió desactivat per als lectors;
- sobrenom obligatori;
- correu opcional o no sol·licitat;
- comentaris en moderació abans de publicar, almenys inicialment;
- els tres autors com a moderadors independents;
- eliminació i ocultació des del panell;
- domini limitat al web del projecte;
- protecció antispam i, si cal, CAPTCHA no intrusiu.

La documentació consultada de Waline confirma comentaris anònims i moderació, però cal fer una prova real per confirmar que la versió triada permet exactament tres comptes independents amb permisos d’administració. No s’ha de substituir Giscus fins que aquesta prova siga satisfactòria.

### 11.3 Alternatives considerades

| Sistema | Avantatges | Inconvenients per a aquest projecte |
| --- | --- | --- |
| Giscus | Gratuït, madur, desa els comentaris a GitHub Discussions. | Exigeix iniciar sessió amb GitHub; per això no compleix la necessitat dels lectors. |
| Waline + Neon | Comentaris anònims, moderació, PostgreSQL, desplegament compatible amb Vercel. | Cal validar els tres administradors i gestionar una base de dades externa. |
| Artalk | Anònim, moderació i múltiples administradors documentats. | Requereix un servidor persistent; encaixa pitjor amb un frontend estàtic de Vercel. |
| Remark42 | Anònim, moderació, autohosting i dades en un fitxer. | Necessita un servei persistent i una gestió pròpia del desplegament. |
| Staticman | Comentaris com a fitxers de GitHub i flux de moderació basat en canvis. | Cal mantenir una API pròpia amb secrets; és més fràgil i menys còmode per als moderadors. |
| Twikoo | Gratuït, anònim i amb moderació. | Cal revisar documentació, hosting, privacitat i maduresa del flux triat. |
| Cusdis | Simplicitat inicial. | Projecte arxivat/deprecated; no recomanat com a base nova. |

## 12. Pipeline de publicació i dades

### 12.1 Contingut editorial

```text
Autor
  ↓ accés individual
Pages CMS
  ↓ canvis versionats
Repositori GitHub
  ↓ webhook / integració de desplegament
Vercel
  ↓ compilació
Web pública estàtica
```

- El repositori conté articles, autors, configuració del lloc i mitjans.
- Pages CMS escriu els canvis al repositori.
- Vercel compila automàticament després d’un canvi.
- Els fitxers no publicats queden fora del resultat públic.
- GitHub és també l’historial de canvis i la còpia de recuperació del contingut editorial.

### 12.2 Comentaris

Els comentaris no han de provocar commits ni reconstruccions del web. Han de seguir un circuit independent:

```text
Lector → Waline → Neon
                 ↓
         moderació dels autors
```

### 12.3 Gratuïtat

La solució ha de mantenir-se dins de:

- Vercel Hobby per a la web;
- allotjament GitHub dins dels límits normals del repositori;
- Pages CMS en la modalitat disponible per al projecte;
- Waline desplegat en un projecte compatible amb el pla gratuït;
- Neon Free per a PostgreSQL, si Waline és la solució final.

En Neon, les **100 hores mensuals de computació** són hores de capacitat de computació, no un nombre de peticions. De manera simplificada, 1 unitat de computació durant 100 hores equival a 100 CU-hours; 0,25 unitats durant 400 hores també. Per a un blog amb poc trànsit hauria de ser suficient, especialment perquè la base de dades pot entrar en repòs quan està inactiva, però s’ha de monitorar el consum.

No s’ha d’utilitzar una base SQLite en el disc local d’un servei gratuït efímer, perquè les dades es podrien perdre en reinicis o desplegaments. Si el servei de comentaris requerix un servidor persistent, s’ha de reconsiderar la plataforma abans de publicar.

## 13.1 Foundation visual i tècnica

Després de revisar diverses plantilles open source de blogs, la decisió és no adoptar-ne cap com a base principal. Les plantilles externes solen estar pensades per a un únic autor i imposen una identitat visual que no representa tan bé el projecte.

La base preferida serà el projecte personal de Martí:

- [marticarrasco-personal-site a GitHub](https://github.com/marticarrasco/marticarrasco-personal-site)

Aquest projecte servirà com a referència per a:

- sistema visual;
- tipografia i jerarquia de lectura;
- navegació;
- responsive i adaptació a mòbil;
- components d’articles;
- portada i composició general;
- SEO i metadades;
- accessibilitat;
- pipeline GitHub → Vercel;
- organització del codi;
- decisions d’interacció i animació que ja hagen demostrat funcionar.

No s’ha de copiar cegament tot el projecte. Cal conservar-ne la identitat i les decisions que ens agraden, però adaptar el model al caràcter col·laboratiu i editorial de Entre línies.

### Adaptacions necessàries

Sobre aquesta fundació s’hauran d’afegir o adaptar:

- tres autors amb pàgina individual;
- articles amb autor explícit i editable;
- articles destacats escollits manualment;
- filtres i ordenació per autor i data;
- manifest editorial expandible a la portada;
- bloc d’opinió alternativa clarament separat;
- estats d’esborrany, publicat i arxivat;
- edició mitjançant Pages CMS;
- càrrega de portades i imatges internes;
- vídeos i embeds de serveis permesos;
- sistema de comentaris sense autenticació GitHub;
- moderació compartida entre els tres autors;
- polítiques editorials pròpies del projecte;
- metadades i textos legals del nou blog.

### Criteri d’implementació

Abans de migrar a un framework o plantilla nova, s’ha de comprovar si la necessitat es pot resoldre reutilitzant o adaptant el codi del projecte personal. Una migració només estarà justificada si aporta un benefici clar en mantenibilitat, rendiment, accessibilitat o integració amb Pages CMS.

## 13. SEO

Cada pàgina pública ha de tenir:

- `title` específic i descriptiu;
- descripció meta derivada del resum o definida per contingut;
- URL canònica;
- Open Graph i Twitter/X Card;
- imatge social basada en la portada quan siga possible;
- dades estructurades `Article` o `BlogPosting` amb autor i dates;
- `lang` coherent amb el contingut real de cada pàgina, encara que el web siga multilingüe sense sistema de traduccions;
- sitemap generat;
- `robots.txt` coherent amb el caràcter públic de la web;
- no indexar esborranys ni arxivats;
- enllaços interns clars entre article i autor;
- gestió de pàgines 404 i redireccions si canvien slugs.

Cal evitar prometre una indexació perfecta quan els articles poden barrejar català, castellà i anglès. El SEO ha d’estar subordinat a la claredat editorial i a l’accessibilitat.

## 14. Accessibilitat

Requisits mínims:

- contrast suficient;
- HTML semàntic i jerarquia correcta de títols;
- focus visible;
- navegació completa amb teclat;
- botons i controls amb noms accessibles;
- carrusel sense moviment obligatori i amb suport per a moviment reduït;
- textos alternatius quan la imatge tinga funció informativa;
- no transmetre informació només amb color;
- disseny usable amb zoom i en mòbil;
- vídeos amb controls i, quan siga viable, subtítols;
- embeds amb títol accessible i alternativa quan fallen;
- missatges d’error comprensibles en filtres, comentaris i formularis.

Tot contingut introduït pels autors i pels comentaristes s’ha de sanejar abans de renderitzar-se.

## 15. Privacitat, legal i seguretat

Abans de la publicació cal decidir i redactar:

- avís legal, si és aplicable;
- política de privacitat;
- política de comentaris i moderació;
- contacte del projecte;
- tractament del nom i del contingut dels comentaris;
- ús de cookies o tecnologies similars;
- càrrega de scripts de tercers dels embeds;
- política de retirada de contingut;
- llicència dels textos i imatges, si l’equip vol explicitar-la.

Mesures tècniques:

- mai exposar tokens de GitHub, secrets de Neon o claus de servei al client;
- mantenir les variables sensibles només en entorns de servidor;
- restringir el servei de comentaris al domini de producció;
- sanejar Markdown/HTML i embeds;
- limitar mida i tipus de fitxers;
- protegir contra spam, XSS, CSRF quan siga aplicable i abusos de formularis;
- actualitzar dependències, especialment el servidor de comentaris;
- fer còpies o confiar en l’historial de GitHub per al contingut editorial;
- tenir una manera documentada de revocar l’accés d’un autor.

## 16. Requisits no funcionals

### Rendiment

- Primera càrrega lleugera i sense enviar funcionalitats editorials al navegador públic.
- Imatges amb dimensions i `loading` adequats.
- Embeds carregats de manera diferida quan siga possible.
- No carregar scripts de tercers fins que siguen necessaris.
- La interfície ha de continuar sent usable en connexions mòbils normals.

### Compatibilitat

- Navegadors moderns d’escriptori i mòbil.
- Disseny responsive.
- Rutes profundes funcionals en Vercel.

### Mantenibilitat

- Contingut separat de la lògica de presentació.
- Model de dades explícit i documentat.
- Components petits per a article, autor, targeta, filtre, manifest i comentaris.
- Validació de contingut abans de publicar.
- Build reproduïble amb una instal·lació neta.
- README amb passos de desenvolupament, desplegament i configuració de serveis.

### Observabilitat

- Vercel ha de permetre detectar builds fallides.
- Cal documentar on consultar errors del servei de comentaris.
- S’ha de poder comprovar periòdicament l’ús de Neon i els límits dels serveis gratuïts.
- No cal analítica d’usuari en la primera versió, llevat que l’equip la demane expressament.

## 17. Model de dades inicial

### Article

```json
{
  "title": "Títol de l’article",
  "slug": "titol-de-larticle",
  "author": "content/authors/marti.json",
  "publishedAt": "2026-08-31",
  "updatedAt": "2026-08-31",
  "status": "draft",
  "featured": false,
  "featuredOrder": 1,
  "summary": "Resum breu.",
  "cover": "/assets/articles/covers/portada.webp",
  "blocks": []
}
```

### Autor

```json
{
  "order": 1,
  "name": "Nom de l’autor",
  "handle": "nom-de-lautor",
  "role": "Frase curta",
  "bio": "Biografia.",
  "avatar": "/assets/articles/avatars/avatar.webp",
  "links": []
}
```

### Configuració del lloc

Ha d’incloure com a mínim nom, subtítol, manifest i una bandera per activar o desactivar comentaris. La bandera permet desplegar la web abans d’haver acabat la integració del sistema de comentaris.

## 18. Criteris d’acceptació de la primera versió

La primera versió es considerarà preparada quan:

1. La portada mostra el manifest expandible, destacats manuals, secció per autor i llistat filtrable.
2. Les tres pàgines d’autor funcionen amb dades editables.
3. Un autor pot crear un article complet des de Pages CMS sense editar codi.
4. L’article pot incloure format ric, portada, imatges internes, cites, enllaços i almenys els embeds validats.
5. L’estat `draft` no és públic i `archived` tampoc.
6. El canvi de títol no trenca l’URL perquè el slug és independent.
7. Els tres autors poden editar qualsevol article.
8. La portada només mostra com a destacats articles publicats.
9. El web es desplega automàticament amb Vercel després d’un canvi al repositori.
10. No hi ha secrets exposats en el JavaScript públic.
11. El sistema de comentaris permet comentar amb nom sense GitHub.
12. Els tres autors poden moderar i eliminar comentaris des d’un panell autenticat.
13. Hi ha protecció contra spam i contingut HTML insegur.
14. El web és navegable amb teclat i usable en mòbil.
15. Cada article públic té metadades bàsiques de SEO i compartició.
16. Existeixen textos legals mínims i un contacte real o una decisió explícita de no publicar-los encara.
17. Una instal·lació neta pot executar el projecte i construir-lo sense errors.

## 19. Qüestions pendents de decisió

Aquestes preguntes no bloquegen l’arquitectura inicial, però sí alguns detalls d’implementació o publicació:

1. Quin serà el nom definitiu, domini i identitat visual?
2. El repositori de GitHub serà públic o privat?
3. El flux d’accés de Pages CMS amb comptes individuals per als tres autors funcionarà tal com es vol en la instància allotjada?
4. Waline confirma tres moderadors independents en la versió que es desplegarà?
5. Els comentaris es publicaran directament o sempre quedaran pendents d’aprovació?
6. Es permetran noms repetits o caldrà alguna identificació addicional contra suplantacions?
7. S’acceptarà SVG? I pujada directa de vídeo, o només vídeos externs?
8. Quins serveis d’embed es validaran en el llançament inicial?
9. Quin contacte i quins textos legals s’utilitzaran?
10. Els articles retirats quedaran només arxivats internament o es mostrarà algun avís públic?
11. Es voldrà una política de revisions visible per al lector o només l’historial intern de GitHub?
12. Es volen activar analítica, RSS, newsletter o integració automàtica amb xarxes socials? No formen part del mínim actual.

## 20. Roadmap proposat

### Fase 1 — Fonaments

- Fixar nom, identitat, domini i repositori.
- Completar dades reals dels autors.
- Consolidar el model de contingut i la validació de slugs.
- Confirmar l’accés dels tres autors a Pages CMS.

### Fase 2 — Experiència pública

- Polir portada, manifest i destacats.
- Completar filtres, pàgines d’autor, 404 i responsive.
- Afegir SEO, sitemap i metadades socials.
- Revisar accessibilitat amb teclat, contrast i moviment reduït.

### Fase 3 — Comentaris

- Fer una prova aïllada de Waline + Neon.
- Confirmar nom sense GitHub, moderació i tres administradors.
- Configurar antispam, sanejament, domini i política de privacitat.
- Activar comentaris amb una bandera de configuració.

### Fase 4 — Publicació

- Configurar producció a Vercel.
- Verificar variables d’entorn i secrets.
- Fer una publicació de prova amb un article real.
- Comprovar rutes, imatges, embeds, compartició, comentaris i retirada d’un article.
- Documentar manteniment, actualització de dependències i recuperació.

### Fase 5 — Millores posteriors

- RSS i metadades avançades.
- Millores d’imatge o compressió automàtica.
- Cerca interna.
- Historial de revisions visible.
- Integracions socials o automatització de difusió.
- Més opcions de comentaris, reaccions o notificacions, només si aporten valor real.

## 21. Referències tècniques

- [Pages CMS — documentació](https://pagescms.org/docs/)
- [Pages CMS — col·laboradors](https://pagescms.org/docs/configuration/collaborators/)
- [Pages CMS — autenticació](https://pagescms.org/docs/development/authentication/)
- [Waline](https://waline.js.org/en/)
- [Waline — propietats del client](https://waline.js.org/en/reference/client/props.html)
- [Waline — desplegament a Vercel](https://waline.js.org/en/guide/deploy/vercel.html)
- [Neon — pla gratuït](https://neon.com/pricing)
- [Artalk](https://artalk.js.org/)
- [Remark42](https://remark42.com/)
- [Giscus](https://github.com/giscus/giscus)
