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
const HEX = { navy: "141B2E", slate: "4A5A78", teal: "1F6F7A", bronze: "9C6F3F", grey: "5C6679", muted: "959DAC", line: "D9DDE4", tint: "F2F3F5" };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "KI-gestützter Vertrieb im Conventional Tunneling";
pres.author = "SH&Partner";
pres.company = "SH&amp;Partner";
const C = pres.SchemeColor;
const COL = { navy: C.text1, slate: C.text2, white: C.background1, tint: C.background2, teal: C.accent1, bronze: C.accent2, grey: C.accent3, muted: C.accent4, line: C.accent5 };

const FOOTER = "KI-gestützter Vertrieb im Conventional Tunneling  ·  Projektverständnis";

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
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.68, w: 10.5, h: 0.5, fontSize: 22, bold: true, color: COL.navy, align: "left", valign: "top", margin: 0 }, text: "" } },
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
const numDot = (slide, n, x, y, d = 0.36, fill = COL.navy) => {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: "Nummer " + n });
  T(slide, String(n), { x, y, w: d, h: d, fontSize: 9, bold: true, color: COL.white, align: "center", valign: "middle" });
};
async function iconDot(slide, Comp, x, y, d, fill, name) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill }, objectName: name + " Kreis" });
  const p = d * 0.26;
  slide.addImage({ data: await icon(Comp, "FFFFFF"), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + " Icon", altText: name });
}

(async () => {
  // ================= 1 · Titel =================
  pres.addSection({ title: "Titel" });
  let s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Titel" });
  s.addImage({ path: A("vmt_white.png"), x: 3.2, y: 0.71, w: 1.95, h: 0.433, objectName: "Logo VMT", altText: "VMT Logo" });
  s.addText("KI-gestützter Vertrieb im Conventional Tunneling", { placeholder: "title" });
  s.addText("Projektverständnis und Lösungsansatz", { placeholder: "subtitle" });
  s.addText("19.10.2026", { placeholder: "date" });

  // ================= 2 · Verständnis =================
  pres.addSection({ title: "Projektverständnis" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Projektverständnis" });
  s.addText("AUSGANGSLAGE", { placeholder: "kicker" });
  s.addText("Unser bisheriges Verständnis", { placeholder: "title" });

  label(s, "Ausgangslage im CT-Bereich", 0.6, 1.6, 5.6);
  const base = [
    ["Projektgetriebenes Geschäft", "Konventioneller Vortrieb (z. B. Spreng- und Baggervortrieb, NATM) mit vielen, häufig kleineren Projekten, international verteilt."],
    ["Verstreute Informationen", "Projekt- und Ausschreibungsdaten liegen in unterschiedlichen Quellen, Sprachen und Formaten vor und werden heute manuell zusammengetragen."],
    ["Begrenzte Vertriebskapazität", "Recherche, Qualifizierung und Angebotsvorbereitung binden Zeit, die im direkten Kundenkontakt fehlt."],
  ];
  base.forEach(([h, d], i) => {
    const y = 1.98 + i * 1.08;
    numDot(s, i + 1, 0.6, y);
    T(s, h, { x: 1.12, y: y - 0.03, w: 5.1, h: 0.28, fontSize: 12, bold: true, color: COL.navy });
    T(s, d, { x: 1.12, y: y + 0.27, w: 5.1, h: 0.62, fontSize: 10.5, color: COL.grey, valign: "top" });
  });

  card(s, 6.75, 1.6, 6.0, 3.6, "Zielbild Fläche", COL.tint);
  label(s, "Zielbild", 7.0, 1.8, 5.5, COL.teal);
  T(s, "KI unterstützt den CT-Vertrieb entlang des gesamten Vertriebsprozesses", { x: 7.0, y: 2.05, w: 5.5, h: 0.5, fontSize: 12, bold: true, color: COL.navy, valign: "top" });
  const steps = [
    ["Identifizieren", "Relevante Projekte weltweit früh erkennen", COL.slate],
    ["Qualifizieren", "Passung und Chancen bewerten, priorisieren", COL.teal],
    ["Ansprechen", "Kontakt und Angebot gezielt vorbereiten", COL.navy],
  ];
  steps.forEach(([h, d, c], i) => {
    const y = 2.72 + i * 0.8;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.0, y, w: 1.75, h: 0.6, rectRadius: 0.06, fill: { color: c }, line: { color: c }, objectName: "Schritt " + h });
    T(s, h, { x: 7.0, y, w: 1.75, h: 0.6, fontSize: 10.5, bold: true, color: COL.white, align: "center", valign: "middle" });
    T(s, d, { x: 8.95, y, w: 3.6, h: 0.6, fontSize: 10.5, color: COL.navy, valign: "middle" });
    if (i < 2) s.addShape(pres.shapes.DOWN_ARROW, { x: 7.79, y: y + 0.63, w: 0.17, h: 0.14, fill: { color: COL.muted }, line: { color: COL.muted }, objectName: "Pfeil " + (i + 1) });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.6, w: 12.15, h: 0.55, rectRadius: 0.06, fill: { color: COL.navy }, line: { color: COL.navy }, objectName: "Validierung Fläche" });
  T(s, [
    { text: "Gemeinsam zu validieren:  ", options: { bold: true } },
    { text: "Zielmärkte und Kundengruppen, heutiger Vertriebsprozess im CT-Bereich, verfügbare Daten- und Informationsquellen." },
  ], { x: 0.85, y: 5.6, w: 11.7, h: 0.55, fontSize: 10.5, color: COL.white, valign: "middle" });
  s.addNotes("Verständnis aus den bisherigen Gesprächen. Punkte sind als Hypothesen formuliert und im Termin mit VMT zu bestätigen bzw. zu korrigieren.");

  // ================= 3 · Herausforderung =================
  pres.addSection({ title: "Herausforderung" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Herausforderung" });
  s.addText("HERAUSFORDERUNG", { placeholder: "kicker" });
  s.addText("Relevante CT-Projekte früher erkennen und gezielter bearbeiten", { placeholder: "title" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.6, w: 4.2, h: 4.55, rectRadius: 0.08, fill: { color: COL.navy }, line: { color: COL.navy }, objectName: "Leitfrage Fläche" });
  label(s, "Leitfrage", 0.9, 1.9, 3.6, COL.muted);
  T(s, "Wie kann der CT-Vertrieb mit den vorhandenen Ressourcen mehr relevante Projekte früher erkennen, besser bewerten und gezielter bearbeiten?", {
    x: 0.9, y: 2.25, w: 3.6, h: 2.4, fontSize: 18, bold: true, color: COL.white, valign: "top", paraSpaceAfter: 0, lineSpacingMultiple: 1.1,
  });
  T(s, "Kernanforderung: Unterstützung des Vertriebs, nicht Ersatz vertrieblicher Entscheidungen.", { x: 0.9, y: 5.15, w: 3.6, h: 0.7, fontSize: 10, italic: true, color: COL.line, valign: "bottom" });

  const ch = [
    [fi.FiLayers, "Fragmentierte Datenlage", "Ausschreibungsportale, Fachpresse, Behörden- und Unternehmensseiten: mehrsprachig und uneinheitlich strukturiert.", COL.slate],
    [fi.FiFilter, "Relevanz schwer erkennbar", "Ob ein Projekt passt, hängt von Vortriebsart, Projektphase und Beteiligten ab und steht selten explizit in den Unterlagen.", COL.teal],
    [fi.FiClock, "Enges Zeitfenster", "Der beste Zeitpunkt für die Ansprache liegt früh im Projekt, bevor Ausrüstung und Lieferanten feststehen.", COL.bronze],
    [fi.FiUsers, "Wissen an Personen gebunden", "Marktkenntnis und Kontakte liegen bei Einzelnen und sind nur teilweise systematisch dokumentiert.", COL.navy],
  ];
  for (let i = 0; i < ch.length; i++) {
    const [Ic, h, d, c] = ch[i];
    const x = 5.15 + (i % 2) * 3.85, y = 1.6 + Math.floor(i / 2) * 2.35;
    card(s, x, y, 3.6, 2.2, "Karte " + h);
    await iconDot(s, Ic, x + 0.25, y + 0.25, 0.5, c, h);
    T(s, h, { x: x + 0.25, y: y + 0.9, w: 3.1, h: 0.3, fontSize: 12, bold: true, color: COL.navy });
    T(s, d, { x: x + 0.25, y: y + 1.22, w: 3.1, h: 0.85, fontSize: 10.5, color: COL.grey, valign: "top" });
  }

  // ================= 4 · Technischer Lösungsansatz (Platzhalter) =================
  pres.addSection({ title: "Lösungsansatz" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Lösungsansatz" });
  s.addText("LÖSUNGSANSATZ", { placeholder: "kicker" });
  s.addText("Technischer Lösungsansatz", { placeholder: "title" });
  T(s, "Wie wir die Herausforderung technisch lösen", { x: 0.6, y: 1.2, w: 9.0, h: 0.3, fontSize: 12, italic: true, color: COL.grey });

  const blocks = [
    [fi.FiDatabase, "Datenquellen", COL.slate],
    [fi.FiCpu, "KI-Verarbeitung", COL.teal],
    [fi.FiTarget, "Ergebnis im Vertrieb", COL.navy],
  ];
  for (let i = 0; i < blocks.length; i++) {
    const [Ic, h, c] = blocks[i];
    const x = 0.6 + i * 4.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.85, w: 3.85, h: 3.6, rectRadius: 0.08, fill: { color: COL.tint }, line: { color: COL.muted, width: 1, dashType: "dash" }, objectName: "Platzhalter " + h });
    await iconDot(s, Ic, x + 0.3, 2.15, 0.5, c, h);
    T(s, h, { x: x + 0.95, y: 2.15, w: 2.7, h: 0.5, fontSize: 13, bold: true, color: COL.navy, valign: "middle" });
    T(s, "Inhalte folgen", { x: x + 0.3, y: 3.3, w: 3.25, h: 0.4, fontSize: 11, italic: true, color: COL.muted, align: "center" });
    if (i < 2) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 3.88, y: 3.42, w: 0.24, h: 0.2, fill: { color: COL.muted }, line: { color: COL.muted }, objectName: "Pfeil " + (i + 1) });
  }
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.75, w: 12.15, h: 0.45, rectRadius: 0.06, fill: { color: COL.tint }, line: { color: COL.line }, objectName: "Hinweis Fläche" });
  T(s, "Detaillierung des technischen Ansatzes folgt im nächsten Schritt.", { x: 0.85, y: 5.75, w: 11.7, h: 0.45, fontSize: 10.5, color: COL.grey, valign: "middle" });
  s.addNotes("Platzhalter: Struktur steht, Inhalte zur technischen Lösung werden ergänzt.");

  // ================= 5 · Commercial =================
  pres.addSection({ title: "Commercial" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Commercial" });
  s.addText("COMMERCIAL", { placeholder: "kicker" });
  s.addText("Was der Ansatz für den Commercial-Bereich bedeutet", { placeholder: "title" });

  const eff = [
    [fi.FiTrendingUp, "Mehr Pipeline", "Breitere und frühere Sicht auf CT-Projekte in den Zielmärkten.", "Qualifizierte Leads je Monat", COL.slate],
    [fi.FiZap, "Höhere Effizienz", "Weniger manuelle Recherche, mehr Zeit für Kundengespräche.", "Rechercheaufwand je Lead", COL.teal],
    [fi.FiAward, "Bessere Trefferquote", "Fokus auf Projekte mit hoher Passung und realistischer Abschlusschance.", "Angebots- und Abschlussquote", COL.bronze],
    [fi.FiShare2, "Geteiltes Marktwissen", "Projekt- und Kundenwissen wird systematisch erfasst und im Team nutzbar.", "Abdeckung der Projekte im CRM", COL.navy],
  ];
  for (let i = 0; i < eff.length; i++) {
    const [Ic, h, d, m, c] = eff[i];
    const x = 0.6 + i * 3.1;
    card(s, x, 1.6, 2.85, 3.0, "Karte " + h);
    await iconDot(s, Ic, x + 0.25, 1.85, 0.5, c, h);
    T(s, h, { x: x + 0.25, y: 2.5, w: 2.35, h: 0.3, fontSize: 12, bold: true, color: COL.navy });
    T(s, d, { x: x + 0.25, y: 2.82, w: 2.35, h: 0.8, fontSize: 10.5, color: COL.grey, valign: "top" });
    s.addShape(pres.shapes.LINE, { x: x + 0.25, y: 3.75, w: 2.35, h: 0, line: { color: COL.line, width: 0.75 }, objectName: "Trenner " + h });
    label(s, "Messgröße", x + 0.25, 3.87, 2.35, c);
    T(s, m, { x: x + 0.25, y: 4.1, w: 2.35, h: 0.35, fontSize: 10.5, bold: true, color: COL.navy, valign: "top" });
  }

  label(s, "Voraussetzungen", 0.6, 4.95, 12.0);
  const pre = [
    "Klares Zielprofil für relevante CT-Projekte",
    "Einbindung in Vertriebsprozess und CRM",
    "Vertrieb entscheidet, KI liefert Vorschläge",
  ];
  pre.forEach((t, i) => {
    const x = 0.6 + i * 4.15;
    numDot(s, i + 1, x, 5.3);
    T(s, t, { x: x + 0.47, y: 5.3, w: 3.5, h: 0.36, fontSize: 10.5, bold: true, color: COL.navy, valign: "middle" });
  });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
