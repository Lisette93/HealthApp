# HealthApp — Balans

## Overview
Balans är en mobilapp som samlar träning, återhämtning och kost på ett ställe. Målet är att förenkla vardagens beslut kring välmående: användaren får ett val i taget ("Vad behöver din kropp idag?"), korta pass (15–30 min) som går att göra hemma, samt en lugn överblick över veckan i stället för mätvärden att jaga.

Sex skärmar ingår: Start, Power (passlista), Passdetalj, Reset (återhämtning), Näring (recept) och Min rutin (veckoöverblick).

Målgrupp: personer som vill leva hälsosamt men har begränsad tid och möts av för mycket, motstridig information.
Designmål: förenkla vardagens beslut · samla träning, mindfulness och kost · stödja hälsa som hållbar livsstil · visa kvalitet och tillit · skapa en lugn och inspirerande upplevelse.

## About the Design Files
Filerna i `design/` är **designreferenser skrivna i HTML** — prototyper som visar avsett utseende och beteende, inte produktionskod att kopiera rakt av. Uppgiften är att **återskapa dessa skärmar i målkodbasens befintliga miljö** (React Native, Swift/SwiftUI, Kotlin/Compose, React + Tailwind osv.) med dess etablerade mönster, komponenter och navigationslösning. Finns ingen kodbas ännu: välj ramverk själv — designen är mobil-först och fungerar bra i React Native eller SwiftUI.

Öppna `design/Health App - Skärmar.dc.html` i en webbläsare för att se alla sex skärmar sida vid sida. Varje skärm är en 360×760 px ram med attributet `data-screen-label` ("01 Start", "02 Power", …). Layouten är rent inline-CSS och flex/grid — ingen stylesheet att återanvända.

## Fidelity
**High-fidelity.** Färger, typografi, radier, mellanrum och innehåll är slutgiltiga och ska återskapas pixelnära. Skärmarna är statiska mockar: interaktion (navigation, timers, filterval) är specificerad i text nedan, inte implementerad i HTML-filen.

## Screens / Views

Gemensamt för alla skärmar: ram 360×760 px (iPhone-liknande logisk bredd), bakgrund `#faf4ee` (Reset: `#f6efe9`), innehållet i en vertikal flex-kolumn. Tab bar 72 px hög längst ner på skärm 01, 02, 04, 05, 06 (inte på passdetaljen). Horisontell standardmarginal 22 px (passdetalj 24 px).

### 01 · Start ("Dagens val")
**Syfte:** ett enda beslut — vad kroppen behöver idag — plus möjlighet att återupta pågående pass.
**Layout (topp → botten):**
1. **Hero**, 250 px hög, full bredd, foto `yoga-girl.png` (`background-position: 50% 34%`, `cover`). Scrim: `linear-gradient(180deg, rgba(45,38,31,.30), rgba(45,38,31,.78))`. Innehåll nederst (22 px sidor, 22 px botten, 14 px gap):
   - "God morgon, Elin" — Cormorant Garamond 30 px, line-height 1.15, `#fff`
   - "Du har gjort 3 pass den här veckan" — Jost 13 px, `#fff`, line-height 1.5
   - Knapp "Testa appen gratis" — bakgrund `#b99e85`, text `#fff` 14 px, padding 12/22 px, radius 999 px, letter-spacing .04em (bara i marknadsföringsläge/före onboarding)
2. **"Vad behöver din kropp idag?"** — Cormorant Garamond 24 px `#3d342c`, 26 px topp-padding.
3. **Kategorirad**, horisontellt scrollande, 14 px gap: två kort 150×190 px + ett "peek"-kort 90×190 px (visar att raden går att dra). Kort = foto + scrim `linear-gradient(180deg, rgba(45,38,31,.2), rgba(45,38,31,.72))`, radius 22 px.
   - POWER: foto `woman-in-white-outfit…JPG`; etikett centrerad vertikalt: Cormorant Garamond 22 px `#fff`, letter-spacing .16em, bakgrund `rgba(122,99,79,.95)`, padding 8/16 px, radius 8 px; undertext "Energi & styrka" 11 px `#fff` nederst
   - RESET: foto `yoga-girl2.png`; etikettbakgrund `rgba(96,88,78,.95)`; undertext "Andning & vila"
4. **"Fortsätt där du var"** — rubrik 24 px + länk "Se allt" 12 px `#a08a73`. Kort: bakgrund `#f2e8dd`, radius 20 px, padding 16 px, 14 px gap; miniatyr 64×64 px radius 16 px (foto `woman-stretches-on-mat…JPG`); "Core balance" 15 px `#3d342c`; "25 min · 12 min kvar" 12 px `#8b7d6f`; progressbar 4 px hög, spår `#e2d3c1`, fyllnad `#b99e85` vid 52 %.
5. **Tab bar** (se Komponenter).

### 02 · Power (passlista)
**Syfte:** välja pass utan att öppna detaljvyn i onödan — tid och nivå syns direkt i listan.
**Layout:**
1. Dekor: två cirklar 260 px / 240 px, `border: 1px solid #ece0d2`, absolut placerade (top −60 / right −90, top 120 / left −120) — lugn bakgrundsrytm.
2. Rubrik centrerad, 38 px topp-padding: "POWER" Cormorant Garamond 38 px letter-spacing .2em `#3d342c`; underrubrik "Rörelse för energi och stabilitet" Cormorant Garamond *italic* 16 px `#7d6f62`.
3. **Filterchips** (10 px gap): aktivt "Nivå 2" — bakgrund `#3d342c`, text `#faf4ee` 13 px, 6 px punkt `#d8bfa5`, padding 9/15 px, radius 999 px. Inaktiva "Tid", "Tempo" — bakgrund `#f1e7dc`, text `#6d6055`, border `1px solid #e6d9ca`. Chipen visar **valt värde**, inte bara kategorinamn.
4. Hjälptext: "Alla pass är 15–30 minuter och anpassade att utföra när och var du vill." 12 px `#8b7d6f`, line-height 1.6.
5. **Passkort**, 150 px höga, radius 22 px, 14 px gap, foto + scrim `linear-gradient(180deg, rgba(45,38,31,.55), rgba(45,38,31,.3) 45%, rgba(45,38,31,.78))`:
   - *Morning flow* (foto `yoga-girl.png`, extra skugga `0 14px 30px -18px rgba(90,70,52,.6)` = markerad): titel Cormorant Garamond 25 px `#fff`; badge "POPULÄR" bakgrund `rgba(255,255,255,.92)`, text `#5c4433` 10 px letter-spacing .1em uppercase, radius 999 px; metapiller nederst "20 min", "Nivå 2" — bakgrund `rgba(250,244,238,.22)`, text `#fff` 12 px, padding 6/12 px
   - *Core balance* (foto `woman-in-white-outfit…JPG`): "25 min", "Nivå 3"
   - *Power strength* (foto `yoga-girl2.png`): "30 min"
6. Tab bar, "Träning" aktiv.

### 03 · Passdetalj (Morning flow)
**Syfte:** svara på "är det här rätt för mig just nu" och starta passet.
**Layout:**
1. Hero 300 px, foto `yoga-girl.png` (`50% 32%`), scrim `linear-gradient(180deg, rgba(45,38,31,.35), rgba(45,38,31,.08) 38%, rgba(250,244,238,.98) 82%)` — tonar ut i sidbakgrunden.
   - Tillbaka-knapp: 34×34 px cirkel `rgba(250,244,238,.85)`, glyf "←" `#5c4433` 15 px, top/left 22/20 px. Favorit "♡" samma cirkel till höger.
   - Nederst: kicker "POWER · FLOW" 11 px letter-spacing .18em `#8a6a4f`; titel "Morning flow" Cormorant Garamond 34 px `#3d342c`.
2. **Metarad**: tre lika breda kort, bakgrund `#f2e8dd`, radius 16 px, padding 12 px, 10 px gap: "20 / minuter", "Nivå 2 / medel", "Matta / utrustning" (värde 16 px `#3d342c`, etikett 11 px `#8b7d6f`).
3. **Beskrivning** 13 px `#6d6055`, line-height 1.75: "Ett mjukt men aktivt flöde som väcker höfter, rygg och axlar. Passet börjar lugnt och byggs upp mot stabilitet – passar direkt efter uppstigning."
4. **"Så går passet till"** Cormorant Garamond 21 px + fyra rader: sifferbricka 26 px cirkel `#e8dccd`, text `#6d6055` 11 px; radtitel 13 px `#3d342c`; tid 12 px `#a08a73`; avdelare `1px solid #eee2d5` (ej på sista raden).
   1 Andning & uppvärmning 4 min · 2 Flow – solhälsning 8 min · 3 Stabilitet & balans 5 min · 4 Nedvarvning 3 min
5. **Sticky bottenzon**: gradient `linear-gradient(180deg, rgba(250,244,238,0), #faf4ee 40%)`; primärknapp "Starta passet" — bakgrund `#3d342c`, text `#faf4ee` 15 px, padding 16 px, radius 999 px, flex 1; sekundär rund knapp 52 px "↓" (ladda ner offline), border `1px solid #ddcdb9`, ikon `#8a6a4f`.

### 04 · Reset (återhämtning)
**Syfte:** motvikten till Power — en övning erbjuds först, resten ligger under.
**Layout:**
1. Rubrik centrerad: "RESET" 38 px letter-spacing .2em; "Andning, vila och stillhet" italic 16 px `#7d6f62`.
2. **Andningscirkel**: ytterring 196 px, `border: 1px solid #e0d0bd`; innercirkel 152 px, bakgrund `#efe2d3`; i mitten "4 · 7 · 8" Cormorant Garamond 30 px `#3d342c` och tillstånd "ANDAS IN" 11 px letter-spacing .14em `#8b7d6f`. Under: "3 minuter · sänk pulsen före sömn" 12 px. Knapp "Börja andas" — `#3d342c` / `#faf4ee`, padding 13/30 px, radius 999 px.
3. **"Korta sessioner"** 22 px + länk "Visa alla 12" 12 px `#8a6a4f` på samma rad. Två kort: bakgrund `#fdf8f3`, radius 18 px, padding 14 px; miniatyr 46 px radius 14 px; titel 14 px; meta 11 px `#8b7d6f`; chevron "▸" `#8a6a4f`.
   - "Kvällsnedvarvning · 10 min · guidad" (foto `woman-practices-yoga…jpg`)
   - "Stretch för stel rygg · 8 min · rörlighet" (foto `yoga-girl2.png`)
4. Tab bar (bakgrund `#f1e7dc` här), "Träning" aktiv.

### 05 · Näring (recept)
**Syfte:** koppla kosten till träningen — filtret "Efter passet" är förvalt när ett pass just avslutats.
**Layout:**
1. Rubrik "Näring" Cormorant Garamond 30 px + "Enkla recept med råvaror du redan har hemma" 13 px `#8b7d6f`.
2. **Sökfält** (attrapp): bakgrund `#f1e7dc`, border `1px solid #e6d9ca`, radius 999 px, padding 12/18 px, placeholder "Sök recept eller råvara" 13 px `#a08a73`.
3. **Kategorichips** 12 px: aktivt "Efter passet" (`#3d342c`/`#faf4ee`), inaktiva "Frukost", "Under 20 min".
4. **Huvudrecept**: kort 180 px, radius 22 px, scrim `linear-gradient(180deg, rgba(45,38,31,.3), rgba(45,38,31,.78))`; titel "Proteinbowl med linser" Cormorant Garamond 26 px `#fff`; piller "15 min", "28 g protein" 11 px. **Bilden är fortfarande en platshållare** (streckmönster + monospace-etikett "BILD: SKÅLAR MED GRÖNT") — ersätt med matfoto.
5. **Två listrader**: bakgrund `#f4ebe1`, radius 20 px, padding 14 px, miniatyr 68 px radius 16 px (platshållare): "Havregrynsgröt med tahini · 10 min · frukost · 12 g protein"; "Kikärtsgryta med spenat · 25 min · middag · 22 g protein".
6. Fotrad: "Veckans inköpslista är uppdaterad" 12 px `#8b7d6f` + länk "Öppna" `#8a6a4f`.
7. Tab bar, "Kost" aktiv.

### 06 · Min rutin (veckoöverblick)
**Syfte:** visa rytm, inte siffror att jaga — stödjer designmålet "hållbar livsstil".
**Layout:**
1. Header: "Min rutin" 30 px + "Vecka 38" 13 px `#8b7d6f`; avatar 46 px cirkel (foto `yoga-girl2.png`).
2. **Veckokort**: bakgrund `#f1e7dc`, radius 24 px, padding 20 px, 16 px gap.
   - "3 av 4 pass klara" 13 px `#6d6055` + "75%" Cormorant Garamond 22 px
   - progressbar 6 px, spår `#e2d3c1`, fyllnad `#b99e85` 75 %
   - 7-kolumners grid (6 px gap): bokstav 10 px `#a08a73` + stapel 30 px hög radius 9 px — genomfört `#b99e85`, tomt `#e2d3c1`, kommande `#efe2d3` med `1px dashed #d9c7b2` (M,O,F genomförda; L,S kommande)
3. **"Idag"** 22 px + tre rader (bakgrund `#f4ebe1`, radius 18 px, padding 14 px): kryssruta 30 px cirkel — klar = `#b99e85` med vit "✓", ej klar = `1px solid #d9c7b2`.
   - "Morning flow · 20 min · klart 07:15" (klar) · "Proteinbowl med linser · Lunch · 15 min" · "Kvällsnedvarvning · 10 min · 21:30"
4. **Insiktsruta**: border `1px solid #eadfd1`, radius 18 px, padding 16 px; "Din rutin håller i 5 veckor" Cormorant Garamond *italic* 17 px; "Små pass på vardagar och en längre session i helgen – fortsätt så." 12 px `#8b7d6f`.
5. Tab bar, "Rutin" aktiv.

## Components

**Tab bar** — höjd 72 px, bakgrund `#f4ebe1` (`#f1e7dc` på Reset), `border-top: 1px solid #e6d9ca`, `padding-bottom: 8px` (safe area), 4-kolumners grid. Varje flik: kolumn, centrerad, 6 px gap, 21×21 px SVG-linjeikon (`viewBox 0 0 20 20`, `stroke: currentColor`, `fill: none`, runda ändar) + etikett 10 px letter-spacing .08em. Aktiv: färg `#8a6a4f`, `stroke-width 1.7`. Inaktiv: `#b3a394`, `stroke-width 1.4`. Flikar/ikoner: Hem (hus), Träning (puls), Kost (skål), Rutin (kalender). Ersätt gärna med kodbasens ikonbibliotek (Feather/SF Symbols: `house`, `activity`/`waveform.path.ecg`, `bowl`/`takeoutbag`, `calendar`) — behåll storlek, färger och tjocklekar.

**Piller/chip** — radius 999 px, 12–13 px text. Tre varianter: aktiv mörk (`#3d342c`/`#faf4ee`), inaktiv ljus (`#f1e7dc`, text `#6d6055`, border `#e6d9ca`), glas över foto (`rgba(250,244,238,.22)`, text `#fff`).

**Kort över foto** — radius 22 px, alltid en scrim ovanpå bilden (se värden per skärm). Vit text ska klara 4,5:1 mot det komponerade underlaget; bilderna är ljusa så scrimen är obligatorisk.

**Primärknapp** — `#3d342c` bakgrund, `#faf4ee` text, radius 999 px, padding 16 px, 15 px, letter-spacing .04em. **Sekundär rund** — 52 px, border `1px solid #ddcdb9`, ikon `#8a6a4f`.

## Interactions & Behavior
Att implementera (specificerat, ej byggt i HTML):

- **Tab bar** → växla mellan Hem, Träning (Power), Kost (Näring), Rutin. Behåll scrollposition per flik.
- **Kategorikort på Start** → POWER öppnar skärm 02, RESET öppnar skärm 04. Raden scrollar horisontellt (snap på kortbredd + 14 px gap).
- **Passkort (02)** → passdetalj (03) med shared-element-övergång på bilden om plattformen stödjer det, annars push höger→vänster, 260 ms `cubic-bezier(.22,.61,.36,1)`.
- **Tillbaka "←" (03)** → tillbaka till 02. **♡** togglar favorit (fylld glyf + haptic light).
- **"Starta passet" (03)** → passuppspelning (ej designad ännu): föreslå fullskärm med steglista från "Så går passet till", nedräkning per block och pausbar timer. **"↓"** laddar ner offline (progress i knappen).
- **Filterchips (02)** → öppnar en bottom sheet per kategori (Nivå 1–3, Tid 15/20/25/30 min, Tempo lugnt/medel/högt). Chippen visar valt värde och blir mörk; "rensa" återställer till kategorinamnet. Listan filtreras direkt, 150 ms fade.
- **Andningscirkel (04)** → "Börja andas" startar 4-7-8-cykel: innercirkel skalar 1.0 → 1.12 under 4 s in, håller 7 s, 8 s ut (`ease-in-out`), texten byter mellan "Andas in / Håll / Andas ut", räknare i mitten. Paus vid tryck. Minska rörelse: respektera `prefers-reduced-motion` / Reduce Motion — då bara textbyte.
- **Sessionsrad (04)/receptrad (05)** → respektive detaljvy. "Visa alla 12" → full lista.
- **Kategorichips (05)** → filtrera; "Efter passet" sätts automatiskt i 2 timmar efter avklarat pass.
- **Kryssrutor (06)** → markera dagens punkt som klar: fyllnad tonar in 180 ms, progressbar och "x av 4"/procent animeras 400 ms, dagens stapel byter färg. Optimistisk uppdatering.
- **Hover/press** (om webb/desktop): kort lyfter `translateY(-2px)` och skugga `0 18px 34px -20px rgba(90,70,52,.5)`; knappar mörkas 6 %.
- **Tomma tillstånd**: "Fortsätt där du var" visas bara om ett pass är påbörjat; veckokortet visar "Din första vecka" om ingen historik finns.
- **Responsivt**: designen är 360 px bred; allt innehåll skalar i bredd, bilderna behåller `cover`. Testa 320 px (rubriker till 26/34 px) och stora textstorlekar — inga fasta höjder på textblock.

## State Management
- `activeTab: 'home' | 'training' | 'nutrition' | 'routine'`
- `trainingFilters: { level?: 1|2|3, duration?: number, tempo?: 'calm'|'medium'|'high' }`
- `sessions: Session[]` (id, titel, minuter, nivå, tempo, bild, populär, block[])
- `resumeSession: { sessionId, secondsRemaining } | null`
- `favorites: Set<sessionId>`
- `breathing: { running: boolean, phase: 'in'|'hold'|'out', secondsLeft: number }` (timer, pausbar, stoppas när appen går i bakgrunden)
- `recipes: Recipe[]`, `recipeFilter: 'post-workout' | 'breakfast' | 'quick'` (sätts av `lastWorkoutCompletedAt`)
- `week: { completed: number, planned: number, days: DayState[] }`, `todayItems: { id, title, meta, done }[]`
- Datahämtning: pass, recept och veckoplan är läsdata (cachea per dag); klarmarkering och favoriter är skrivningar (optimistiska, kö vid offline).

## Design Tokens

**Färger**
| Token | Hex | Användning |
|---|---|---|
| bg/base | `#faf4ee` | skärmbakgrund |
| bg/base-warm | `#f6efe9` | Reset-skärmen |
| bg/surface | `#f4ebe1` | kort, tab bar |
| bg/surface-2 | `#f2e8dd` | metakort, listkort |
| bg/surface-3 | `#f1e7dc` | chips, veckokort, Reset tab bar |
| bg/surface-4 | `#fdf8f3` | sessionskort på Reset |
| bg/inset | `#efe2d3` | andningscirkel, kommande dag |
| ink/primary | `#3d342c` | rubriker, primärknapp |
| ink/secondary | `#6d6055` | brödtext |
| ink/tertiary | `#8b7d6f` | meta |
| ink/quaternary | `#a08a73` | småetiketter |
| accent/brown | `#8a6a4f` | länkar, aktiv flik |
| accent/sand | `#b99e85` | progress, CTA på foto |
| accent/deep | `#5c4433` | text på ljus badge |
| line/soft | `#eee2d5` | avdelare |
| line/base | `#e6d9ca` | kortkanter, tab bar |
| line/strong | `#ddcdb9` / `#d9c7b2` | knappkant, streckad |
| track | `#e2d3c1` | progress-spår, tom dag |
| decor/ring | `#ece0d2` | dekorcirklar |
| ink/on-photo | `#ffffff` | text över foto (kräver scrim) |
| scrim/dark | `rgba(45,38,31,α)` | α .08–.78, se per skärm |
| glass/light | `rgba(250,244,238,.22)` | piller över foto |

**Typografi** — Cormorant Garamond (display: 38 / 34 / 30 / 26 / 25 / 24 / 22 / 21 / 17 px; vikt 300–500; italic för underrubriker) och Jost (UI: 16 / 15 / 14 / 13 / 12 / 11 / 10 px; vikt 300–500). Letter-spacing: .2em på "POWER"/"RESET", .18em kicker, .14em tillståndstext, .1em badge, .08em flikar, .04em knappar. Line-height 1.5–1.75 i brödtext, 1.1–1.15 i rubriker. Byt gärna Jost mot kodbasens sans (t.ex. SF Pro / Inter-ersättare) — behåll Cormorant Garamond för displaytext, den bär varumärket.

**Spacing** 4 / 5 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 26 / 30 / 38 px.
**Radier** 8 / 9 / 14 / 16 / 18 / 20 / 22 / 24 / 34 (ram) / 999 px.
**Skuggor** kort: `0 14px 30px -18px rgba(90,70,52,.6)`; telefonram (bara för presentationen): `0 26px 60px -24px rgba(90,70,52,.45)`.

## Assets
Foton i `design/uploads/` (användarens egna bilder, varma inomhusmiljöer):
- `yoga-girl.png` — sidostretch med växter → Start-hero, Morning flow-kort, passdetalj-hero
- `yoga-girl2.png` — armar upp bakifrån → RESET-kort, Power strength, Reset-miniatyr, avatar
- `woman-in-white-outfit-stretches-body-on-mat-…JPG` → POWER-kort, Core balance
- `woman-practices-yoga-on-mat-indoors-…jpg` → Kvällsnedvarvning-miniatyr
- `woman-stretches-on-mat-in-light-filled-room-…JPG` → "Fortsätt där du var"-miniatyr, peek-kort

**Saknas:** matfoton för Näring-skärmen (tre platshållare: en bowl 180 px och två miniatyrer 68 px). Ikoner är inline-SVG i HTML:en — ersätt med kodbasens ikonbibliotek.

## Files
- `design/Health App - Skärmar.dc.html` — alla sex skärmar (öppna i webbläsare)
- `design/support.js` — runtime som HTML-filen behöver för att rendera; ingen del av designen
- `design/uploads/` — bilderna filen refererar
