# Propostes de millora — Entre línies

**Data:** 9 d’octubre de 2026  
**Estat:** millores 1 i 2 implementades; les millores 3–5 continuen pendents d’implementació
**Abast:** cinc millores independents per al blog existent

Aquest document concreta cinc millores per al blog. Les dues primeres ja estan implementades; les altres tres es poden treballar en branques independents, mantenint les dependències indicades.

## Objectius comuns

- Ajudar els lectors a trobar i descobrir articles rellevants.
- Donar als autors més control sobre la manera de presentar el seu treball.
- Mantindre la publicació senzilla des de Pages CMS i compatible amb el model de contingut actual.
- No fer públics camps editorials que només servisquen per a organitzar, cercar o gestionar els articles.
- Mantindre privats els esborranys i els articles arxivats en totes les noves vistes i notificacions.



## 1. Articles destacats per autor — implementada



### Objectiu

Permetre que cada autor trie quins dels seus articles publicats considera més representatius o importants —els seus articles insígnia— i que aquests tinguen prioritat en les superfícies de descoberta del blog.

### Comportament proposat

- Cada article té un indicador editorial de destacat, desactivat per defecte.
- Cada autor destacarà els articles que té atribuïts, seguint la convenció editorial. L’edició continua sent compartida entre els tres editors.
- Només els articles publicats podran aparéixer com a destacats públics. Els esborranys i arxivats no es mostraran encara que el camp estiga activat.
- Els articles destacats tenen prioritat en els llistats públics, respectant l’ordenació seleccionada. En la secció de portada, els tres destacats més recents apareixen primer. La interfície no mostra una etiqueta de «destacat».
- No hi ha un màxim de destacats. Dins del grup de destacats, l’ordre és per data de publicació més recent.



### Límits i dependències

La web permet als tres editors modificar tots els articles. La propietat per autor és una convenció editorial indicada en Pages CMS; l’edició compartida continua disponible.

## 2. Tipus o classificació editorial



### Objectiu

Assignar a cada article un tipus que descriga la seua forma o intenció editorial. Els tipus no classifiquen el tema: un text sobre tecnologia, per exemple, pot ser alhora d’actualitat o de reflexió.

### Catàleg inicial proposat

Es proposa començar amb sis tipus, amb un únic tipus principal per article:

1. **Opinió** — defensa o argumenta una posició personal sobre una qüestió.
2. **Actualitat** — parteix d’un fet recent o d’un debat públic per aportar context o una lectura pròpia.
3. **Reflexió** — desenvolupa una idea o pregunta amb una mirada més personal o assagística, sense dependre necessàriament d’una notícia recent.
4. **Divulgació** — explica un concepte, un tema o un debat per fer-lo més comprensible.
5. **Experiència** — parteix d’una vivència, observació o relat personal per compartir-ne aprenentatges o preguntes.
6. **Diàleg** — resposta, rèplica o intercanvi d’idees relacionat amb altres articles o veus.

El catàleg és una proposta per validar editorialment. Si les distincions resulten difícils d’aplicar, es pot reduir a quatre o cinc opcions. El tipus serà metadada estructurada i editable, no text lliure; els noms i valors interns s’han de mantindre estables si es canvien les etiquetes visibles.

### Comportament proposat

- El lector podrà filtrar el llistat d’articles per tipus.
- El tipus es podrà combinar amb els filtres d’autor i data de la cerca.
- Queda pendent decidir si el tipus es mostrarà a la targeta o a la pàgina de l’article. No és necessari mostrar-lo per poder usar-lo com a filtre.

**Implementació:** el catàleg s'ha afegit a Pages CMS i a la validació del contingut. El filtre de tipus es pot combinar amb l'autor i l'ordenació per data disponible al llistat. El camp és opcional per compatibilitat amb articles antics; els articles publicats actuals ja tenen una classificació inicial. Els tipus no es mostren en les targetes ni en la pàgina de l'article.



## 3. Paraules clau per article



### Objectiu

Permetre que l’autor afija una llista curta de termes que descriguen els conceptes, noms o temes concrets d’un article. Les paraules clau ajudaran a trobar contingut relacionat i no tenen per què ser visibles per als lectors.

### Comportament proposat

- Camp opcional editable des de Pages CMS, introduït com una llista de paraules o frases separades per comes.
- El sistema normalitzarà espais sobrants i evitarà duplicats que només diferisquen per majúscules/minúscules.
- Les paraules clau no es mostraran com a contingut de l’article en la primera versió.
- La cerca podrà trobar articles a partir d’aquestes metadades. El sistema no les tractarà com a substitut del títol, el resum o el cos de l’article.
- Cal establir una longitud màxima per paraula clau i un límit raonable de termes per article durant la implementació.



## 4. Cercador i filtres d’articles



### Objectiu

Oferir una pàgina o secció de cerca que permeta trobar articles per contingut i refinar els resultats amb criteris editorials i temporals.

### Abast funcional proposat

- Camp de text lliure per cercar en títol, resum, cos de l’article i paraules clau.
- Filtres combinables per autor, tipus d’article i interval de dates.
- Possibilitat d’esborrar tots els filtres i tornar a veure el llistat complet.
- Resultats limitats exclusivament a articles publicats.
- Ordenació predeterminada per rellevància quan hi ha una consulta de text, amb una opció visible per ordenar per data (més recents o més antics). Sense consulta, es poden mostrar els més recents primer.
- Estat sense resultats comprensible i acció per llevar filtres.
- Els filtres seleccionats haurien de poder compartir-se en l’URL, si l’arquitectura actual ho permet, perquè la vista siga enllaçable i es conserve en recarregar.
- Els camps de cerca i els filtres han de ser accessibles amb teclat i etiquetes clares.



### Regles de cerca

- La cerca no ha d’indexar ni retornar esborranys, articles arxivats o contingut privat.
- La cerca per text hauria de tolerar diferències de majúscules i espais; es pot valorar la insensibilitat als accents.
- Els filtres s’apliquen conjuntament: si se selecciona un autor, un tipus i un interval, un resultat ha de complir tots els criteris.
- La data utilitzada serà la data de publicació, no l’última data d’edició. L’interval inclourà els dies inicial i final seleccionats.
- En ser un blog estàtic, la primera opció a avaluar és generar l’índex de cerca durant el build i cercar al navegador, sense afegir una base de dades o servei extern. Cal comprovar l’impacte sobre la mida de descàrrega i el rendiment quan s’implemente.



## 5. Avisos de nous articles per correu



### Objectiu

Permetre que un lector deixe el seu correu i reba un missatge quan es publique un article nou. És un avís per cada publicació, no necessàriament una newsletter periòdica o un resum de contingut.

### Flux proposat

1. El lector introdueix el correu en un formulari amb una explicació clara de què rebrà.
2. La subscripció es confirma abans d’activar els avisos, preferiblement mitjançant un enllaç de confirmació al correu.
3. Quan es publique un article nou, el sistema envia un avís amb el títol, l’autor, un resum breu si està disponible i l’enllaç a l’article.
4. Cada missatge inclou un mecanisme senzill per donar-se de baixa; la baixa s’aplica als missatges futurs.
5. Només es notifiquen publicacions noves. Editar un article ja publicat, desar un esborrany o arxivar-lo no ha de generar un avís de nova publicació.



### Requisits de confiança i operació

- L’adreça de correu és una dada personal: abans d’implementar-ho cal definir on es guarda, qui hi té accés, durant quant de temps es conserva i com s’esborra.
- El formulari ha d’explicar el propòsit i la freqüència esperada, recollir consentiment afirmatiu i enllaçar la informació de privacitat aplicable.
- Cal previndre subscripcions automatitzades i enviaments duplicats per a una mateixa publicació.
- Cal triar un servei d’enviament i subscripcions compatible amb l’arquitectura estàtica i el pressupost del projecte. No s’ha de posar cap clau privada al frontend.
- Si no es pot garantir confirmació, baixa i gestió segura de les adreces, la funcionalitat no està preparada per publicar-se.



## Dependències i ordre suggerit

Les cinc propostes es poden implementar en branques independents. Per reduir conflictes i reutilitzar el model de metadades, es recomana aquest ordre:

1. **Destacats per autor** — camp editorial i regles d’ordenació.
2. **Tipus d’article** — catàleg estable i filtre corresponent.
3. **Paraules clau** — camp editorial i normalització.
4. **Cerca i filtres** — depén dels camps de tipus i paraules clau per cobrir el comportament complet; pot començar amb autor i data si s’implementa abans.
5. **Avisos per correu** — treball independent, però requereix decidir servei, privacitat i flux de confirmació abans de desplegar.

Noms orientatius de branques: `codex/destacats-per-autor`, `codex/tipus-articles`, `codex/paraules-clau`, `codex/cerca-articles` i `codex/avisos-per-correu`.

## Decisions pendents abans del desenvolupament

- Els articles destacats es prioritzaran en els llistats sense etiqueta visual; la portada en mostra els tres més recents.
- Com s’assegura —o s’entén editorialment— que un autor només destaque els seus articles, mantenint l’edició compartida?
- S’aprova el catàleg de sis tipus? Es permetrà que algun article no en tinga?
- Quants termes es permetran per article i es mostraran mai als lectors?
- La cerca cobrirà el text complet de tots els articles o un índex/resum? Com es tractaran els accents i les paraules molt comunes?
- Quina superfície del lloc allotjarà la cerca i quins controls d’ordenació s’oferiran?
- Quin servei gestionarà les adreces i els correus, i quina política de privacitat i retenció s’aplicarà?
- Els avisos s’enviaran immediatament en publicar o es poden agrupar? La proposta actual és enviament immediat, un correu per article.



## Criteris generals de finalització

Una millora es considerarà preparada quan:

- els camps editorials es puguen gestionar sense editar codi ni JSON manualment;
- la validació del contingut rebutge valors invàlids sense trencar articles antics;
- els llistats públics i el cercador només utilitzen articles publicats;
- els controls siguen usables amb teclat i en mòbil;
- la documentació i els criteris de privacitat necessaris estiguen actualitzats;
- el canvi es puga revisar i integrar des de la branca pròpia sense barrejar funcionalitats no relacionades.

