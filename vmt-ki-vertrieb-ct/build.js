const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fi = require("react-icons/fi");
// Writes the theme colors into the deck; set APPLY_THEME to the pptx skill's scripts/apply_theme.js
const { applyTheme } = process.env.APPLY_THEME ? require(process.env.APPLY_THEME) : { applyTheme: async () => {} };

const OUT = process.argv[2] || "VMT_KI_Vertrieb_CT.pptx";
const A = (f) => path.join(__dirname, "assets", f);
const MARKET = require("./market.js");

// SH&Partner house palette (from reference decks)
const THEME = {
  name: "SH Partner",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "141B2E", lt1: "FFFFFF", dk2: "4A5A78", lt2: "F2F3F5",
    accent1: "1F6F7A", accent2: "9C6F3F", accent3: "5C6679", accent4: "959DAC",
    accent5: "D9DDE4", accent6: "FBC000", hlink: "1F6F7A", folHlink: "4A5A78",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "KI-gestützter Vertrieb im Conventional Tunneling";
pres.author = "SH&Partner";
pres.company = "SH&amp;Partner";
const C = pres.SchemeColor;
const COL = { navy: C.text1, slate: C.text2, white: C.background1, tint: C.background2, teal: C.accent1, bronze: C.accent2, grey: C.accent3, muted: C.accent4, line: C.accent5 };

const FOOTER = "KI-gestützter Vertrieb im Conventional Tunneling  ·  AI Tender Radar";

async function icon(Comp, color) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: 256, strokeWidth: 1.8 }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: COL.navy },
  objects: [
    { image: { x: 7.234, y: 0, w: 6.099, h: 5.5698, path: A("wave_dark_c.png"), altText: "" } },
    { image: { x: 0.85, y: 0.75, w: 1.9, h: 0.354, path: A("sh_white.png"), altText: "SH&Partner Logo" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.85, y: 2.45, w: 10.0, h: 1.3, fontSize: 30, bold: true, color: COL.white, align: "left", valign: "bottom", margin: 0 }, text: "" } },
    { line: { x: 0.85, y: 3.85, w: 6.75, h: 0, line: { color: COL.slate, width: 1 } } },
    { placeholder: { options: { name: "subtitle", type: "body", x: 0.85, y: 3.98, w: 9.6, h: 0.7, fontSize: 24, color: COL.white, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "date", type: "body", x: 0.85, y: 6.76, w: 6.0, h: 0.24, fontSize: 9.5, color: COL.muted, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: COL.white },
  margin: [0.5, 0.6, 0.7, 0.6],
  objects: [
    { image: { x: 8.3, y: 0, w: 5.033, h: 2.8, path: A("wave_light_c.png"), altText: "" } },
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.42, w: 9.0, h: 0.22, fontSize: 8.5, bold: true, charSpacing: 3, color: COL.teal, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.68, w: 11.0, h: 0.5, fontSize: 22, bold: true, color: COL.navy, align: "left", valign: "top", margin: 0 }, text: "" } },
    { image: { x: 0.6, y: 6.93, w: 1.05, h: 0.196, path: A("sh_dark.png"), altText: "SH&Partner Logo" } },
    { text: { text: FOOTER, options: { x: 1.85, y: 6.92, w: 8.0, h: 0.22, fontSize: 8, color: COL.muted, margin: 0, valign: "middle" } } },
  ],
  slideNumber: { x: 12.15, y: 6.92, w: 0.6, h: 0.22, fontSize: 8, color: COL.muted, align: "right", margin: 0 },
});

// ---------- Helpers ----------
const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, ...opts });
const label = (slide, text, x, y, w, color = COL.muted) =>
  T(slide, text.toUpperCase(), { x, y, w, h: 0.2, fontSize: 7.5, bold: true, charSpacing: 3, color, objectName: "Label " + text });
const card = (slide, x, y, w, h, name, fill = COL.white) =>
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: COL.line, width: 0.75 },
    shadow: fill === COL.white ? { type: "outer", color: "000000", blur: 6, offset: 1.5, angle: 90, opacity: 0.12 } : undefined,
    objectName: name,
  });
const solid = (slide, x, y, w, h, fill, name, radius = 0.06) =>
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: { color: fill }, objectName: name });
const numDot = (slide, n, x, y, d = 0.36, fill = COL.navy, txt = COL.white) => {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: "Nummer " + n });
  T(slide, String(n), { x, y, w: d, h: d, fontSize: 9, bold: true, color: txt, align: "center", valign: "middle" });
};
async function iconDot(slide, Comp, x, y, d, fill, name) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: name + " Kreis" });
  const p = d * 0.26;
  slide.addImage({ data: await icon(Comp, "FFFFFF"), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + " Icon", altText: name });
}
const arrowR = (slide, x, y, name) =>
  slide.addShape(pres.shapes.RIGHT_ARROW, { x, y, w: 0.26, h: 0.2, fill: { color: COL.muted }, line: { color: COL.muted }, objectName: name });
const bar = (slide, y, runs, name, h = 0.55) => {
  solid(slide, 0.6, y, 12.15, h, COL.navy, name);
  T(slide, runs, { x: 0.85, y, w: 11.7, h, fontSize: 10.5, color: COL.white, valign: "middle" });
};
const eur = (n) => n.toLocaleString("de-DE") + " €";

(async () => {
  // ================= 1 · Titel =================
  pres.addSection({ title: "Titel" });
  let s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Titel" });
  s.addImage({ path: A("vmt_white.png"), x: 3.2, y: 0.71, w: 1.95, h: 0.433, objectName: "Logo VMT", altText: "VMT Logo" });
  s.addText("KI-gestützter Vertrieb im Conventional Tunneling", { placeholder: "title" });
  s.addText("AI Tender Radar: Zielbild, Lösungsansatz und Wirtschaftlichkeit", { placeholder: "subtitle" });
  s.addText("21.10.2026", { placeholder: "date" });

  // ================= 2 · Verständnis =================
  pres.addSection({ title: "Projektverständnis" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Projektverständnis" });
  s.addText("AUSGANGSLAGE", { placeholder: "kicker" });
  s.addText("Unser Verständnis", { placeholder: "title" });

  label(s, "Ausgangslage im CT-Bereich", 0.6, 1.6, 5.6);
  const base = [
    ["CT rückt in den Fokus", "Nach diversen Produktentwicklungen steht der Conventional-Tunneling-Bereich stärker im Fokus. Der konventionelle Vortrieb ist kaum automatisiert und bietet viel Potenzial."],
    ["Projekte gehen am Vertrieb vorbei", "Für CT gibt es weder Prozess noch CRM. Relevante Projekte werden zu spät, zufällig oder gar nicht entdeckt."],
    ["Überblick und Kontakte aufbauen", "Zunächst soll ein Marktüberblick entstehen, Kontakte zu ausführenden Baufirmen und ARGEn aufgebaut und der Vertrieb gestärkt werden."],
  ];
  base.forEach(([h, d], i) => {
    const y = 1.98 + i * 1.08;
    numDot(s, i + 1, 0.6, y);
    T(s, h, { x: 1.12, y: y - 0.03, w: 5.2, h: 0.28, fontSize: 12, bold: true, color: COL.navy });
    T(s, d, { x: 1.12, y: y + 0.27, w: 5.2, h: 0.66, fontSize: 10.5, color: COL.grey, valign: "top" });
  });

  card(s, 6.75, 1.6, 6.0, 3.6, "Ansatz Fläche", COL.tint);
  label(s, "Unser Ansatz", 7.0, 1.8, 5.5, COL.teal);
  T(s, "Diesen Prozess lösen wir hervorragend mit künstlicher Intelligenz", { x: 7.0, y: 2.05, w: 5.5, h: 0.5, fontSize: 12, bold: true, color: COL.navy, valign: "top" });
  const steps = [
    ["Erkennen", "Vergaben an Baufirmen und ARGEn automatisch finden", COL.slate],
    ["Bewerten", "Relevanz nach CT-Kriterien prüfen und priorisieren", COL.teal],
    ["Übergeben", "Treffer mit Ansprechpartner an den Vertrieb liefern", COL.navy],
  ];
  steps.forEach(([h, d, c], i) => {
    const y = 2.72 + i * 0.8;
    solid(s, 7.0, y, 1.75, 0.6, c, "Schritt " + h);
    T(s, h, { x: 7.0, y, w: 1.75, h: 0.6, fontSize: 10.5, bold: true, color: COL.white, align: "center", valign: "middle" });
    T(s, d, { x: 8.95, y, w: 3.6, h: 0.6, fontSize: 10.5, color: COL.navy, valign: "middle" });
    if (i < 2) s.addShape(pres.shapes.DOWN_ARROW, { x: 7.79, y: y + 0.63, w: 0.17, h: 0.14, fill: { color: COL.muted }, line: { color: COL.muted }, objectName: "Pfeil " + (i + 1) });
  });

  bar(s, 5.6, [
    { text: "Rollenverteilung:  ", options: { bold: true } },
    { text: "Die KI liefert die Projekte, der VMT-Vertrieb verkauft. Eine automatisierte Kontaktaufnahme ist nicht vorgesehen." },
  ], "Rollen Fläche");
  s.addNotes("Quellen: Workshop VMT am 06.10.2026 (Vertrieb, IT, kaufmännische Leitung) und Besprechungszusammenfassung vom 07.10.2026.");

  // ================= 3 · Herausforderung =================
  pres.addSection({ title: "Herausforderung" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Herausforderung" });
  s.addText("HERAUSFORDERUNG", { placeholder: "kicker" });
  s.addText("Den Zuschlag früh genug erfahren, inklusive Ansprechpartner", { placeholder: "title" });

  solid(s, 0.6, 1.6, 4.2, 4.55, COL.navy, "Leitfrage Fläche", 0.08);
  label(s, "Leitfrage", 0.9, 1.9, 3.6, COL.muted);
  T(s, "Wie erfährt der VMT-Vertrieb zuverlässig, welches CT-Projekt an welche Baufirma bzw. ARGE vergeben wurde und wen er dort ansprechen kann?", {
    x: 0.9, y: 2.25, w: 3.6, h: 2.6, fontSize: 17, bold: true, color: COL.white, valign: "top", lineSpacingMultiple: 1.1,
  });
  T(s, "Kernanforderung: Qualität vor Menge. Wenige relevante Treffer statt einer Flut an Meldungen.", { x: 0.9, y: 5.15, w: 3.6, h: 0.7, fontSize: 10, italic: true, color: COL.line, valign: "bottom" });

  const ch = [
    [fi.FiLayers, "Verstreute Signale", "Zuschläge erscheinen in LinkedIn-Posts, Newsrooms, Fachpresse und Vergabeportalen, mehrsprachig und uneinheitlich.", COL.slate],
    [fi.FiLinkedin, "LinkedIn schwer erschließbar", "Wichtigste Quelle, aber ohne offizielle Suche nach Posts unbekannter Autoren. Scraping ist keine Option.", COL.teal],
    [fi.FiFilter, "Relevanz filtern", "Nur Teilschnitt oder Drill & Blast, Neubau oder Sanierung, Länge > 200 m, Durchmesser > ca. 2–3 m.", COL.bronze],
    [fi.FiUserCheck, "Ansprechpartner fehlt", "Entscheidend ist die Projekt- oder Bauleitung der ARGE. Diese Information steht selten in der Meldung.", COL.navy],
  ];
  for (let i = 0; i < ch.length; i++) {
    const [Ic, h, d, c] = ch[i];
    const x = 5.15 + (i % 2) * 3.85, y = 1.6 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 3.6, 2.2, "Karte " + h);
    await iconDot(s, Ic, x + 0.25, y + 0.25, 0.5, c, h);
    T(s, h, { x: x + 0.25, y: y + 0.9, w: 3.1, h: 0.3, fontSize: 12, bold: true, color: COL.navy });
    T(s, d, { x: x + 0.25, y: y + 1.22, w: 3.1, h: 0.85, fontSize: 10.5, color: COL.grey, valign: "top" });
  }
  s.addNotes("LinkedIn: Die offiziellen Schnittstellen decken nur eigene bzw. freigegebene Seiten ab; die LinkedIn-Nutzungsbedingungen (Abschnitt 8.2) untersagen automatisierte Datensammlung.");

  // ================= 4 · Zielbild =================
  pres.addSection({ title: "Zielbild" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Zielbild" });
  s.addText("ZIELBILD", { placeholder: "kicker" });
  s.addText("Jede relevante CT-Vergabe landet beim Vertrieb", { placeholder: "title" });

  const flow = [
    ["Bauherr vergibt", "Zuschlag an Baufirma oder ARGE", COL.slate],
    ["Gewinner kommuniziert", "LinkedIn-Post, Pressemitteilung, Vergabeportal", COL.slate],
    ["Radar erkennt", "Finden, filtern, anreichern, bewerten", COL.teal],
    ["Vertrieb wird aktiv", "Anruf bei der Projektleitung, bevor die Pakete vergeben sind", COL.navy],
  ];
  flow.forEach(([h, d, c], i) => {
    const x = 0.6 + i * 3.07;
    s.addShape(i === 0 ? pres.shapes.PENTAGON : pres.shapes.CHEVRON, { x, y: 1.55, w: 3.0, h: 0.5, fill: { color: c }, line: { color: c }, objectName: "Ablauf " + h });
    T(s, `${i + 1}   ${h}`, { x: x + (i === 0 ? 0.2 : 0.35), y: 1.55, w: 2.5, h: 0.5, fontSize: 10.5, bold: true, color: COL.white, valign: "middle" });
    T(s, d, { x: x + (i === 0 ? 0.2 : 0.35), y: 2.12, w: 2.55, h: 0.42, fontSize: 9.5, color: COL.grey, valign: "top" });
  });

  card(s, 0.6, 2.85, 5.0, 3.4, "Inhalt Fläche", COL.tint);
  label(s, "Inhalt je Treffer", 0.85, 3.05, 4.5, COL.teal);
  const hit = [
    [fi.FiMapPin, "Projekt und Bauherr", "Name, Ort, Auftraggeber"],
    [fi.FiBriefcase, "Gewinner bzw. ARGE", "Beauftragte Baufirma und ARGE-Partner"],
    [fi.FiTool, "Technik", "Länge, Durchmesser, Vortriebsart, Neubau oder Sanierung"],
    [fi.FiPhone, "Ansprechpartner", "Projekt- oder Bauleitung mit Telefon, E-Mail, LinkedIn"],
    [fi.FiStar, "Quelle und Score", "Nachvollziehbar und priorisiert"],
  ];
  for (let i = 0; i < hit.length; i++) {
    const [Ic, h, d] = hit[i];
    const y = 3.38 + i * 0.56;
    await iconDot(s, Ic, 0.85, y, 0.38, COL.navy, h);
    T(s, h, { x: 1.38, y: y - 0.03, w: 4.0, h: 0.22, fontSize: 10.5, bold: true, color: COL.navy });
    T(s, d, { x: 1.38, y: y + 0.19, w: 4.0, h: 0.22, fontSize: 9.5, color: COL.grey });
  }

  card(s, 5.85, 2.85, 6.9, 3.4, "Beispiel Treffer");
  label(s, "Beispiel · Vergabe erfolgt · DE", 6.1, 3.05, 4.5, COL.teal);
  solid(s, 11.2, 3.0, 1.3, 0.3, COL.teal, "Score Fläche");
  T(s, "SCORE 10/10", { x: 11.2, y: 3.0, w: 1.3, h: 0.3, fontSize: 8, bold: true, charSpacing: 1, color: COL.white, align: "center", valign: "middle" });
  T(s, "Tunnel Kauerndorf, B 289 Oberfranken", { x: 6.1, y: 3.35, w: 6.4, h: 0.35, fontSize: 14, bold: true, color: COL.navy });
  const fields = [
    ["Gewinner", "ARGE Feldhaus Bergbau / Eiffage Infra-Süd"],
    ["Bauherr", "Staatliches Bauamt Bayreuth"],
    ["Ereignis", "Zuschlag veröffentlicht am 19.08.2026"],
    ["Timing", "Baustelle ab Ende 09/2026, Tunnelanschlag Q1 2027"],
    ["Technik", "ca. 750 m, davon 626 m bergmännisch, 2 Rettungsstollen"],
    ["Kontakt", "folgt im Anreicherungsschritt"],
  ];
  fields.forEach(([k, v], i) => {
    const x = 6.1 + (i % 2) * 3.25, y = 3.88 + Math.floor(i / 2) * 0.62;
    label(s, k, x, y, 3.0);
    T(s, v, { x, y: y + 0.2, w: 3.05, h: 0.38, fontSize: 10, color: COL.navy, valign: "top" });
  });
  T(s, "Beispiel aus öffentlichen Quellen: Pressemitteilung StBA Bayreuth 57/2026, Projektseite Eiffage.", { x: 6.1, y: 5.82, w: 6.4, h: 0.25, fontSize: 8, italic: true, color: COL.muted });
  s.addNotes("Beispiel-Treffer: Staatliches Bauamt Bayreuth, Pressemitteilung 57/2026 vom 19.08.2026 (https://www.stbabt.bayern.de/service/medien/pressemitteilungen/2026/57/index.html); bergmännische Länge und Rettungsstollen laut Eiffage-Projektseite (https://eiffage-infra.de/aktuelles/detail/kauerndorf-die-heimliche-hauptstadt-des-tunnelbaus-1401/).");

  // ================= 5 · Technischer Lösungsansatz =================
  pres.addSection({ title: "Lösungsansatz" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lösungsansatz" });
  s.addText("TECHNISCHER LÖSUNGSANSATZ", { placeholder: "kicker" });
  s.addText("Drei Quellen, eine KI-Pipeline, ein Digest", { placeholder: "title" });

  const src = [
    ["Automatisch · Web", "Deep Research", "Newsrooms von Baufirmen und Bauherren, Fachpresse, Vergabeportale (TED, DTVP, evergabe-online, simap.ch)"],
    ["Automatisch · LinkedIn", "Datenanbieter", "Keyword-Suche über öffentliche LinkedIn-Posts, Lieferung per API"],
    ["Manuell · ein Klick", "Weiterleitung durch den Vertrieb", "LinkedIn-Funde per Teilen-Funktion an den Radar (Teams oder E-Mail)"],
  ];
  src.forEach(([k, h, d], i) => {
    const y = 1.6 + i * 1.12;
    card(s, 0.6, y, 3.6, 1.0, "Quelle " + h);
    label(s, k, 0.8, y + 0.12, 3.2, COL.teal);
    T(s, h, { x: 0.8, y: y + 0.32, w: 3.2, h: 0.24, fontSize: 11, bold: true, color: COL.navy });
    T(s, d, { x: 0.8, y: y + 0.56, w: 3.25, h: 0.4, fontSize: 8.5, color: COL.grey, valign: "top" });
    arrowR(s, 4.3, y + 0.4, "Pfeil Quelle " + (i + 1));
  });

  solid(s, 4.7, 1.6, 3.95, 3.24, COL.navy, "Pipeline Fläche", 0.08);
  label(s, "AI Tender Radar · KI-Pipeline", 4.95, 1.78, 3.5, COL.muted);
  const pipe = [
    ["Erkennen", "Vergabe-Signale identifizieren"],
    ["Zusammenführen", "Duplikate über Quellen bündeln"],
    ["Filtern", "K.-o.-Kriterien für CT anwenden"],
    ["Anreichern", "Technik, ARGE-Partner, Kontakte"],
    ["Bewerten", "Score je Treffer, Priorisierung"],
  ];
  pipe.forEach(([h, d], i) => {
    const y = 2.12 + i * 0.53;
    numDot(s, i + 1, 4.95, y, 0.34, COL.white, COL.navy);
    T(s, h, { x: 5.42, y: y - 0.04, w: 3.1, h: 0.22, fontSize: 10.5, bold: true, color: COL.white });
    T(s, d, { x: 5.42, y: y + 0.17, w: 3.1, h: 0.2, fontSize: 9, color: COL.line });
  });
  arrowR(s, 8.76, 3.12, "Pfeil Ausgabe");

  card(s, 9.15, 1.6, 3.6, 3.24, "Ausgabe Fläche");
  label(s, "Täglich an den Vertrieb", 9.4, 1.78, 3.1, COL.teal);
  T(s, "Digest", { x: 9.4, y: 2.02, w: 3.1, h: 0.35, fontSize: 15, bold: true, color: COL.navy });
  T(s, [
    { text: "Per E-Mail oder Excel, Format zunächst offen", options: { bullet: true, breakLine: true } },
    { text: "CT Product Champion prüft und verteilt an die regionalen Vertriebler", options: { bullet: true, breakLine: true } },
    { text: "Feedback zu jedem Treffer schärft Filter und Score", options: { bullet: true } },
  ], { x: 9.4, y: 2.5, w: 3.15, h: 2.2, fontSize: 10, color: COL.navy, valign: "top", paraSpaceAfter: 6 });

  label(s, "Offene Architekturentscheidungen", 0.6, 5.2, 12.0);
  const open = [
    ["Betrieb", "als Service oder intern bei VMT"],
    ["Sprachmodell", "eigenes Modell oder Anbindung per API"],
    ["Datenanbieter", "Freigabe der Datenherkunft durch die VMT-IT"],
  ];
  open.forEach(([h, d], i) => {
    const x = 0.6 + i * 4.15;
    numDot(s, i + 1, x, 5.5);
    T(s, [{ text: h + ": ", options: { bold: true } }, { text: d }], { x: x + 0.47, y: 5.45, w: 3.4, h: 0.46, fontSize: 10.5, color: COL.navy, valign: "middle" });
  });
  s.addNotes("LinkedIn kommt auf zwei Wegen in den Radar: automatisch über einen Datenanbieter (z. B. Octolens ab 159 $/Monat, Coresignal) und manuell über die Teilen-Funktion. Scraping ist wegen der LinkedIn-Nutzungsbedingungen keine produktive Grundlage. Optional ergänzbar: TED-Zuschlagsbekanntmachungen über die offene TED-API.");

  // ================= 6 · Erkennungslogik und Pilot =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lösungsansatz" });
  s.addText("TECHNISCHER LÖSUNGSANSATZ", { placeholder: "kicker" });
  s.addText("Erkennungslogik und Pilotierung", { placeholder: "title" });

  card(s, 0.6, 1.6, 6.0, 3.6, "Logik Fläche", COL.tint);
  label(s, "Signale", 0.85, 1.8, 5.5, COL.teal);
  const sig = [
    ["Primär", "Vergabe eines CT-Projekts an eine Baufirma bzw. ARGE", COL.teal],
    ["Indirekt", "Neu gegründete ARGE, Wechsel von Bau- oder Projektleitern in eine ARGE", COL.slate],
    ["Nachrangig", "Planung, Genehmigung, Ausschreibung des Bauherrn", COL.muted],
  ];
  sig.forEach(([k, d, c], i) => {
    const y = 2.1 + i * 0.5;
    solid(s, 0.85, y, 1.15, 0.3, c, "Signal " + k);
    T(s, k.toUpperCase(), { x: 0.85, y, w: 1.15, h: 0.3, fontSize: 7.5, bold: true, charSpacing: 1, color: COL.white, align: "center", valign: "middle" });
    T(s, d, { x: 2.15, y, w: 4.3, h: 0.3, fontSize: 10, color: COL.navy, valign: "middle" });
  });
  label(s, "Filter · anfangs weit, dann schärfen", 0.85, 3.75, 5.5, COL.teal);
  const chips = ["Neubau oder Sanierung", "Teilschnitt oder Drill & Blast", "Keine offene Bauweise", "Länge > 200 m", "Durchmesser > ca. 2–3 m"];
  const chipW = [1.85, 2.15, 1.75, 1.3, 1.85];
  let cx = 0.85, cy = 4.05;
  chips.forEach((t, i) => {
    if (cx + chipW[i] > 6.4) { cx = 0.85; cy += 0.45; }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: chipW[i], h: 0.32, rectRadius: 0.16, fill: { color: COL.white }, line: { color: COL.line, width: 0.75 }, objectName: "Filter " + t });
    T(s, t, { x: cx, y: cy, w: chipW[i], h: 0.32, fontSize: 9, color: COL.navy, align: "center", valign: "middle" });
    cx += chipW[i] + 0.12;
  });

  label(s, "Pilotierung in drei Stufen", 7.0, 1.6, 5.7);
  const pilot = [
    ["Ab Tag 1: automatisch starten", "Deep Research und Pilot mit einem Datenanbieter laufen, der Vertrieb erhält den Digest."],
    ["2–4 Wochen: messen und klären", "Abgleich mit bereits bekannten Projekten, Prüfung der Datenherkunft durch die VMT-IT."],
    ["Danach: ausbauen", "Kontakte anreichern, Quellen und Regionen erweitern, Übertrag auf weitere Produktbereiche."],
  ];
  pilot.forEach(([h, d], i) => {
    const y = 1.95 + i * 1.12;
    numDot(s, i + 1, 7.0, y);
    T(s, h, { x: 7.5, y: y - 0.03, w: 5.2, h: 0.26, fontSize: 11, bold: true, color: COL.navy });
    T(s, d, { x: 7.5, y: y + 0.25, w: 5.2, h: 0.62, fontSize: 10, color: COL.grey, valign: "top" });
  });

  bar(s, 5.65, [
    { text: "Scope Proof of Concept:  ", options: { bold: true } },
    { text: "nur Conventional Tunneling, DACH bzw. Mitteleuropa inkl. Frankreich und UK. Erst die Informationsqualität beweisen, dann Oberfläche und CRM-Integration." },
  ], "Scope Fläche");
  s.addNotes("Messgrößen im Pilot: Trefferquote, Präzision, Verzögerung gegenüber der Erstmeldung, Anteil bereits bekannter Projekte, Kosten je Treffer. Der Pilot mit einem Datenanbieter startet nur mit ausdrücklicher Zustimmung von VMT.");

  // ================= 7 · Commercial: CAC =================
  pres.addSection({ title: "Commercial" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Commercial" });
  s.addText("COMMERCIAL", { placeholder: "kicker" });
  s.addText("Zielgröße: Akquisitionskosten je zusätzlich identifiziertem Projekt", { placeholder: "title" });

  card(s, 0.6, 1.6, 6.0, 2.85, "CAC Fläche", COL.tint);
  label(s, "Customer Acquisition Cost (CAC)", 0.85, 1.8, 5.5, COL.teal);
  const calc = [
    ["Ø Projektvolumen", "250 T€", "laut VMT", COL.slate],
    ["CAC-Satz", "1 %", "Zielwert", COL.teal],
    ["Max. CAC je Projekt", eur(MARKET.cacPerProject), "Obergrenze", COL.navy],
  ];
  calc.forEach(([k, v, sub, c], i) => {
    const x = 0.85 + i * 1.92;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.15, w: 1.6, h: 1.1, rectRadius: 0.06, fill: { color: COL.white }, line: { color: COL.line, width: 0.75 }, objectName: "Wert " + k });
    T(s, k, { x, y: 2.22, w: 1.6, h: 0.22, fontSize: 8.5, color: COL.grey, align: "center" });
    T(s, v, { x, y: 2.46, w: 1.6, h: 0.45, fontSize: 19, bold: true, color: c, align: "center", valign: "middle" });
    T(s, sub, { x, y: 2.93, w: 1.6, h: 0.22, fontSize: 8, color: COL.muted, align: "center" });
    if (i < 2) T(s, i === 0 ? "×" : "=", { x: x + 1.6, y: 2.15, w: 0.32, h: 1.1, fontSize: 18, color: COL.muted, align: "center", valign: "middle" });
  });
  T(s, [
    { text: "CAC  =  ", options: { bold: true } },
    { text: "Kosten des Radars  ÷  zusätzlich identifizierte relevante CT-Projekte" },
  ], { x: 0.85, y: 3.5, w: 5.5, h: 0.3, fontSize: 10.5, color: COL.navy });
  T(s, "Erreicht ist das Ziel, sobald die Kosten je identifiziertem Projekt bei höchstens 2.500 € liegen.", { x: 0.85, y: 3.88, w: 5.5, h: 0.5, fontSize: 9.5, color: COL.grey, valign: "top" });

  label(s, "Warum diese Zielgröße", 7.0, 1.6, 5.7);
  const why = [
    ["Vertriebliche Verantwortung bei VMT", "Der Abschluss liegt beim VMT-Vertrieb. Gemessen wird, was der Radar liefert: zusätzliche Projekte."],
    ["Zusätzlich heißt zuvor unbekannt", "Es zählen nur relevante Projekte, die der Vertrieb noch nicht auf dem Schirm hatte."],
    ["Bewertung nach 6–12 Monaten", "Der CT Product Champion bestätigt die Relevanz je Treffer."],
  ];
  why.forEach(([h, d], i) => {
    const y = 1.95 + i * 0.9;
    numDot(s, i + 1, 7.0, y);
    T(s, h, { x: 7.5, y: y - 0.03, w: 5.2, h: 0.26, fontSize: 11, bold: true, color: COL.navy });
    T(s, d, { x: 7.5, y: y + 0.25, w: 5.2, h: 0.5, fontSize: 10, color: COL.grey, valign: "top" });
  });

  label(s, "Einordnung am Funnel", 0.6, 4.95, 12.0);
  const funnel = [
    ["10", "zusätzliche Projekte", COL.slate],
    [eur(10 * MARKET.cacPerProject), "CAC-Budget bei 2.500 € je Projekt", COL.teal],
    ["2", "Abschlüsse (Quote laut VMT gut)", COL.bronze],
    ["≈ 500 T€", "Auftragsvolumen bei Ø 250 T€", COL.navy],
  ];
  funnel.forEach(([v, d, c], i) => {
    const x = 0.6 + i * 3.1;
    T(s, v, { x, y: 5.2, w: 2.85, h: 0.5, fontSize: 22, bold: true, color: c });
    T(s, d, { x, y: 5.72, w: 2.85, h: 0.3, fontSize: 9.5, color: COL.grey });
    if (i < 3) arrowR(s, x + 2.7, 5.36, "Pfeil Funnel " + (i + 1));
  });
  s.addNotes("Zielgröße laut kaufmännischer Leitung VMT (Workshop 06.10.2026): CAC je Lead ca. 1 % des durchschnittlichen Deal-Volumens von 200–250 T€, also unter ca. 2.500 €, nach 6–12 Monaten. Funnel-Einordnung: 6–10 Leads mit 2 Abschlüssen wurden als gute Quote genannt.");

  // ================= 8 · Markt und Payback =================
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Commercial" });
  s.addText("COMMERCIAL", { placeholder: "kicker" });
  s.addText(MARKET.title, { placeholder: "title" });

  card(s, 0.6, 1.6, 5.6, 4.0, "Markt Fläche", COL.tint);
  label(s, MARKET.marketLabel, 0.85, 1.8, 5.1, COL.teal);
  const head = { bold: true, color: COL.grey, fontSize: 8.5 };
  const rows = [[
    { text: "Region", options: head },
    { text: "Im Bau (parallel)", options: { ...head, align: "right" } },
    { text: "Neue Vergaben p. a.", options: { ...head, align: "right" } },
  ]];
  MARKET.rows.forEach((r, i) => {
    const total = i === MARKET.rows.length - 1;
    const o = { fontSize: 10, color: COL.navy, bold: total };
    rows.push([{ text: r[0], options: o }, { text: r[1], options: { ...o, align: "right" } }, { text: r[2], options: { ...o, align: "right" } }]);
  });
  s.addTable(rows, {
    x: 0.85, y: 2.1, w: 5.1, colW: [2.0, 1.5, 1.6], rowH: 0.34, margin: [0.03, 0.05, 0.03, 0.05],
    border: { type: "solid", pt: 0.5, color: "D9DDE4" }, fill: { color: "FFFFFF" }, fontFace: "Arial", valign: "middle",
  });
  T(s, MARKET.marketNote, { x: 0.85, y: 2.1 + 0.34 * rows.length + 0.15, w: 5.1, h: 5.45 - (2.1 + 0.34 * rows.length + 0.15), fontSize: 8.5, color: COL.grey, valign: "top" });

  label(s, "Payback in Monaten · CAC-Budget 2.500 € je Projekt", 6.55, 1.6, 6.2);
  const ph = [[{ text: "Zusätzlich identifizierte Projekte p. a.", options: { ...head } }]];
  MARKET.invest.forEach((v) => ph[0].push({ text: "Kosten " + (v / 1000) + " T€", options: { ...head, align: "center" } }));
  MARKET.projectsPerYear.forEach((n) => {
    const row = [{ text: String(n), options: { fontSize: 10.5, bold: true, color: COL.navy } }];
    MARKET.invest.forEach((v) => {
      const m = (v * 12) / (n * MARKET.cacPerProject);
      const good = m <= 12;
      row.push({ text: m.toFixed(m < 10 ? 1 : 0).replace(".", ",") + " Mon.", options: { fontSize: 10.5, align: "center", bold: good, color: good ? COL.white : COL.navy, fill: { color: good ? "1F6F7A" : "FFFFFF" } } });
    });
    ph.push(row);
  });
  s.addTable(ph, {
    x: 6.55, y: 1.9, w: 6.2, colW: [2.6, ...MARKET.invest.map(() => 3.6 / MARKET.invest.length)], rowH: 0.38, margin: [0.03, 0.06, 0.03, 0.06],
    border: { type: "solid", pt: 0.5, color: "D9DDE4" }, fill: { color: "FFFFFF" }, fontFace: "Arial", valign: "middle",
  });
  const tableEnd = 1.9 + 0.38 * ph.length;
  T(s, [
    { text: "Lesart: ", options: { bold: true } },
    { text: "Payback = Monate, bis die zusätzlich identifizierten Projekte × 2.500 € die Kosten des Radars decken. Markiert: Payback innerhalb von 12 Monaten." },
  ], { x: 6.55, y: tableEnd + 0.15, w: 6.2, h: 0.6, fontSize: 9, color: COL.grey, valign: "top" });
  T(s, MARKET.breakEven, { x: 6.55, y: tableEnd + 0.8, w: 6.2, h: 5.6 - tableEnd - 0.8, fontSize: 10.5, bold: true, color: COL.navy, valign: "top" });

  bar(s, 5.85, [{ text: "Fazit:  ", options: { bold: true } }, { text: MARKET.conclusion }], "Fazit Fläche");
  s.addNotes(MARKET.notes);

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
