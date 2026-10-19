const path = require("path");
const pptxgen = require("pptxgenjs");
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
const HAIR = "D9DDE4";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "KI-gestützter Vertrieb im Conventional Tunneling";
pres.author = "SH&Partner";
pres.company = "SH&amp;Partner";
const C = pres.SchemeColor;
const COL = { navy: C.text1, slate: C.text2, white: C.background1, tint: C.background2, teal: C.accent1, grey: C.accent3, muted: C.accent4, line: C.accent5 };

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: COL.navy },
  objects: [
    { image: { x: 0, y: 0, w: 13.333, h: 7.5, path: A("wave_title.png"), altText: "" } },
    { image: { x: 0.85, y: 0.75, w: 1.9, h: 0.354, path: A("sh_white.png"), altText: "SH&Partner Logo" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.85, y: 2.3, w: 7.6, h: 1.5, fontSize: 32, bold: true, color: COL.white, align: "left", valign: "bottom", margin: 0, lineSpacingMultiple: 1.05 }, text: "" } },
    { placeholder: { options: { name: "subtitle", type: "body", x: 0.85, y: 4.0, w: 7.6, h: 0.5, fontSize: 16, color: COL.line, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "date", type: "body", x: 0.85, y: 6.76, w: 6.0, h: 0.24, fontSize: 9.5, color: COL.muted, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: COL.white },
  margin: [0.5, 0.6, 0.7, 0.6],
  objects: [
    { image: { x: 8.3, y: 0, w: 5.033, h: 2.8, path: A("wave_light_c.png"), altText: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.55, w: 10.6, h: 0.9, fontSize: 22, bold: true, color: COL.navy, align: "left", valign: "top", margin: 0 }, text: "" } },
    { image: { x: 0.6, y: 6.93, w: 1.05, h: 0.196, path: A("sh_dark.png"), altText: "SH&Partner Logo" } },
    { placeholder: { options: { name: "footer", type: "body", x: 1.85, y: 6.92, w: 8.0, h: 0.22, fontSize: 8, color: COL.muted, margin: 0, valign: "middle" }, text: "" } },
  ],
  slideNumber: { x: 12.15, y: 6.92, w: 0.6, h: 0.22, fontSize: 8, color: COL.muted, align: "right", margin: 0 },
});

// ---------- Helpers ----------
const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, ...opts });
const hair = (slide, x, y, w, name, color = COL.line) => slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: 0.75 }, objectName: name });
const kicker = (slide, text, x, y, w) => T(slide, text, { x, y, w, h: 0.25, fontSize: 11, bold: true, color: COL.teal, objectName: "Zwischenüberschrift " + text });
const content = (title, chapter, section) => {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  s.addText("AI Tender Radar  ·  " + chapter, { placeholder: "footer" });
  return s;
};
// Text column with a hairline on top: bold heading, grey body
const column = (slide, x, y, w, head, body, bodyH = 0.9) => {
  hair(slide, x, y, w, "Linie " + head);
  T(slide, head, { x, y: y + 0.14, w, h: 0.28, fontSize: 12, bold: true, color: COL.navy });
  T(slide, body, { x, y: y + 0.46, w, h: bodyH, fontSize: 10.5, color: COL.grey, valign: "top", lineSpacingMultiple: 1.1 });
};
const flowArrow = (slide, x1, y1, x2, y2, name) =>
  slide.addShape(pres.shapes.LINE, { x: x1, y: Math.min(y1, y2), w: x2 - x1, h: Math.abs(y2 - y1), flipV: y2 < y1, line: { color: COL.muted, width: 1, endArrowType: "triangle" }, objectName: name });
const eur = (n) => n.toLocaleString("de-DE") + " €";

(async () => {
  // ================= 1 · Titel =================
  pres.addSection({ title: "Titel" });
  let s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Titel" });
  s.addImage({ path: A("vmt_white.png"), x: 3.2, y: 0.71, w: 1.95, h: 0.433, objectName: "Logo VMT", altText: "VMT Logo" });
  s.addText("KI-gestützter Vertrieb im Conventional Tunneling", { placeholder: "title" });
  s.addText("AI Tender Radar: Zielbild, Lösung und Wirtschaftlichkeit", { placeholder: "subtitle" });
  s.addText("21.10.2026", { placeholder: "date" });

  // ================= 2 · Verständnis =================
  pres.addSection({ title: "Ausgangslage" });
  s = content("CT rückt in den Fokus, doch relevante Projekte\nerreichen den Vertrieb zu spät", "Ausgangslage", "Ausgangslage");
  [
    ["Neuer Schwerpunkt", "Nach mehreren Produktentwicklungen steht der CT-Bereich stärker im Fokus. Der konventionelle Vortrieb ist kaum automatisiert und bietet entsprechend Potenzial."],
    ["Projekte gehen am Vertrieb vorbei", "Für CT gibt es weder Prozess noch CRM. Projekte werden zu spät, zufällig oder gar nicht entdeckt."],
    ["Erst Überblick, dann Wachstum", "Zunächst braucht es einen Marktüberblick und Kontakte zu den ausführenden Baufirmen und ARGEn, um vertrieblich zuzulegen."],
  ].forEach(([h, d], i) => column(s, 0.6, 1.85 + i * 1.3, 6.6, h, d, 0.7));

  s.addShape(pres.shapes.RECTANGLE, { x: 7.75, y: 1.85, w: 5.0, h: 3.75, fill: { color: COL.tint }, line: { color: COL.tint }, objectName: "Ansatz Fläche" });
  kicker(s, "Unser Ansatz", 8.1, 2.1, 4.3);
  T(s, "Künstliche Intelligenz übernimmt die Marktbeobachtung.", { x: 8.1, y: 2.42, w: 4.3, h: 0.7, fontSize: 15, bold: true, color: COL.navy, valign: "top" });
  s.addShape(pres.shapes.LINE, { x: 8.17, y: 3.45, w: 0, h: 1.4, line: { color: COL.muted, width: 0.75 }, objectName: "Zeitstrahl" });
  [
    ["Erkennen", "Vergaben an Baufirmen und ARGEn finden"],
    ["Bewerten", "Relevanz nach CT-Kriterien prüfen"],
    ["Übergeben", "Treffer mit Ansprechpartner an den Vertrieb"],
  ].forEach(([h, d], i) => {
    const y = 3.38 + i * 0.7;
    s.addShape(pres.shapes.OVAL, { x: 8.1, y, w: 0.14, h: 0.14, fill: { color: COL.teal }, line: { color: COL.teal }, objectName: "Punkt " + h });
    T(s, [{ text: h, options: { bold: true, color: COL.navy, breakLine: true } }, { text: d, options: { color: COL.grey } }], { x: 8.45, y: y - 0.06, w: 4.1, h: 0.5, fontSize: 10.5, valign: "top" });
  });

  hair(s, 0.6, 5.95, 12.15, "Linie Fazit");
  T(s, [
    { text: "Die KI liefert die Projekte, ", options: { color: COL.navy } },
    { text: "der VMT-Vertrieb verkauft.", options: { color: COL.teal } },
  ], { x: 0.6, y: 6.08, w: 12.0, h: 0.4, fontSize: 14, bold: true });
  s.addNotes("Quellen: Workshop VMT am 06.10.2026 (Vertrieb, IT, kaufmännische Leitung) und Besprechungszusammenfassung vom 07.10.2026. Eine automatisierte Kontaktaufnahme ist ausdrücklich nicht vorgesehen.");

  // ================= 3 · Herausforderung =================
  s = content("Das entscheidende Signal ist der Zuschlag,\nidealerweise mit Ansprechpartner", "Herausforderung", "Ausgangslage");
  T(s, "Projektphasen aus Sicht des VMT-Vertriebs", { x: 0.6, y: 1.85, w: 8, h: 0.25, fontSize: 10, color: COL.grey });
  const phases = [
    ["Planung", "Für den Vertrieb noch zu früh"],
    ["Genehmigung", "Planer beeinflussbar, aber aufwendig"],
    ["Ausschreibung", "Bietende Baufirmen noch unbekannt"],
    ["Vergabe an Baufirma oder ARGE", "Wichtigste Information, idealerweise mit Kontakt"],
    ["Baubeginn", "Bis hierhin bleibt Zeit für den Vertrieb"],
  ];
  const pw = 12.15 / 5;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6 + 3 * pw, y: 2.25, w: pw, h: 1.75, fill: { color: COL.tint }, line: { color: COL.tint }, objectName: "Hervorhebung Vergabe" });
  hair(s, 0.6, 2.65, 12.15, "Phasenlinie", COL.muted);
  phases.forEach(([h, d], i) => {
    const x = 0.6 + i * pw, hot = i === 3;
    const dd = hot ? 0.2 : 0.14;
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: 2.65 - dd / 2, w: dd, h: dd, fill: { color: hot ? COL.teal : COL.white }, line: { color: hot ? COL.teal : COL.muted, width: 1 }, objectName: "Phase " + h });
    T(s, h, { x: x + 0.15, y: 2.9, w: pw - 0.3, h: 0.45, fontSize: 11, bold: true, color: hot ? COL.teal : COL.navy, valign: "top" });
    T(s, d, { x: x + 0.15, y: 3.35, w: pw - 0.3, h: 0.5, fontSize: 9.5, color: COL.grey, valign: "top" });
  });

  [
    ["Signale sind verstreut", "Zuschläge erscheinen in LinkedIn-Beiträgen, Pressemitteilungen, Fachpresse und Vergabeportalen, mehrsprachig und uneinheitlich."],
    ["LinkedIn rechtssicher einbinden", "LinkedIn ist die wichtigste Quelle für Zuschläge. Eingebunden wird sie über einen Datenanbieter und die Funde des Vertriebs, nicht über Scraping."],
    ["Relevanz und Kontakt ergänzen", "Relevant sind nur Teilschnitt- oder Sprengvortrieb ab 200 m. Die Projekt- oder Bauleitung steht selten in der Meldung."],
  ].forEach(([h, d], i) => column(s, 0.6 + i * 4.15, 4.6, 3.85, h, d, 1.1));
  s.addNotes("Projektphasen und Einordnung laut VMT-Vorbereitung zum Workshop (AI Tender Radar, 01.10.2026). LinkedIn: Offizielle Schnittstellen decken nur eigene bzw. freigegebene Seiten ab; automatisierte Datensammlung ist laut Nutzungsbedingungen (Abschnitt 8.2) untersagt.");

  // ================= 4 · Zielbild =================
  pres.addSection({ title: "Zielbild und Lösung" });
  s = content("Zielbild: Jede relevante Vergabe erreicht\nden Vertrieb mit Ansprechpartner", "Zielbild", "Zielbild und Lösung");

  // Digest mock-up
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.8, w: 7.4, h: 4.55, fill: { color: COL.white }, line: { color: HAIR, width: 1 }, objectName: "Digest Rahmen" });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.8, w: 7.4, h: 0.45, fill: { color: COL.tint }, line: { color: HAIR, width: 1 }, objectName: "Digest Kopf" });
  T(s, [{ text: "AI Tender Radar", options: { bold: true, color: COL.navy } }, { text: "   Tagesdigest vom 21.10.2026", options: { color: COL.grey } }], { x: 0.85, y: 1.8, w: 5.0, h: 0.45, fontSize: 10, valign: "middle" });
  T(s, "3 neue Treffer", { x: 5.8, y: 1.8, w: 2.0, h: 0.45, fontSize: 9, color: COL.grey, align: "right", valign: "middle" });

  T(s, "Tunnel Kauerndorf, B 289 Oberfranken", { x: 0.85, y: 2.45, w: 5.6, h: 0.32, fontSize: 14, bold: true, color: COL.navy });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.85, y: 2.47, w: 0.9, h: 0.28, rectRadius: 0.05, fill: { color: COL.teal }, line: { color: COL.teal }, objectName: "Score" });
  T(s, "Score 10", { x: 6.85, y: 2.47, w: 0.9, h: 0.28, fontSize: 8.5, bold: true, color: COL.white, align: "center", valign: "middle" });
  T(s, "Vergabe erfolgt  ·  Deutschland  ·  Quelle: Pressemitteilung StBA Bayreuth", { x: 0.85, y: 2.78, w: 6.9, h: 0.25, fontSize: 9, color: COL.grey });
  [
    ["Gewinner", "ARGE Feldhaus Bergbau / Eiffage Infra-Süd"],
    ["Bauherr", "Staatliches Bauamt Bayreuth"],
    ["Technik", "ca. 750 m, davon 626 m bergmännisch"],
    ["Timing", "Zuschlag 19.08.2026, Tunnelanschlag Q1 2027"],
    ["Ansprechpartner", "Projektleitung der ARGE (Anreicherung)"],
    ["Ansatzpunkt", "Vermessung und Profilkontrolle vor dem Anschlag"],
  ].forEach(([k, v], i) => {
    const x = 0.85 + (i % 2) * 3.5, y = 3.25 + Math.floor(i / 2) * 0.62;
    T(s, k, { x, y, w: 3.3, h: 0.2, fontSize: 8.5, color: COL.muted });
    T(s, v, { x, y: y + 0.2, w: 3.3, h: 0.36, fontSize: 10, color: COL.navy, valign: "top" });
  });
  hair(s, 0.85, 5.2, 6.9, "Digest Trenner");
  [0, 1].forEach((i) => {
    const y = 5.42 + i * 0.4;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y, w: 3.4 - i * 0.8, h: 0.13, fill: { color: COL.tint }, line: { color: COL.tint }, objectName: "Weiterer Treffer " + (i + 1) });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y: y + 0.19, w: 5.2 - i * 1.2, h: 0.08, fill: { color: COL.tint }, line: { color: COL.tint }, objectName: "Weiterer Treffer Text " + (i + 1) });
  });

  kicker(s, "Inhalt jedes Treffers", 8.5, 1.8, 4.2);
  ["Projekt und Bauherr", "Gewinner bzw. ARGE", "Technik: Länge, Durchmesser, Vortriebsart", "Ansprechpartner der Projekt- oder Bauleitung", "Quelle und Score"].forEach((t, i) => {
    const y = 2.2 + i * 0.42;
    hair(s, 8.5, y, 4.25, "Linie Inhalt " + (i + 1));
    T(s, t, { x: 8.5, y: y + 0.08, w: 4.25, h: 0.3, fontSize: 10.5, color: COL.navy, valign: "middle" });
  });
  kicker(s, "Weg in den Vertrieb", 8.5, 4.55, 4.2);
  T(s, "Täglich per E-Mail oder Excel an den CT Product Champion, der an die regionalen Vertriebler verteilt. Keine automatisierte Kontaktaufnahme.", { x: 8.5, y: 4.88, w: 4.25, h: 1.0, fontSize: 10.5, color: COL.grey, valign: "top", lineSpacingMultiple: 1.1 });
  s.addNotes("Beispiel-Treffer aus öffentlichen Quellen: Staatliches Bauamt Bayreuth, Pressemitteilung 57/2026 vom 19.08.2026 (https://www.stbabt.bayern.de/service/medien/pressemitteilungen/2026/57/index.html); bergmännische Länge laut Eiffage-Projektseite (https://eiffage-infra.de/aktuelles/detail/kauerndorf-die-heimliche-hauptstadt-des-tunnelbaus-1401/). Der Kontakt wird im Anreicherungsschritt ergänzt.");

  // ================= 5 · Lösungsansatz =================
  s = content("Lösungsansatz: drei Quellen, eine KI-Pipeline, ein täglicher Digest", "Lösungsansatz", "Zielbild und Lösung");
  const srcs = [
    ["Deep Research", "Newsrooms, Fachpresse, Vergabeportale"],
    ["LinkedIn-Datenanbieter", "Keyword-Suche in öffentlichen Beiträgen"],
    ["Funde des Vertriebs", "Weiterleitung per Teilen-Funktion"],
  ];
  kicker(s, "Quellen", 0.6, 1.75, 3.5);
  srcs.forEach(([h, d], i) => {
    const y = 2.1 + i * 0.68;
    hair(s, 0.6, y, 3.5, "Linie Quelle " + (i + 1));
    T(s, [{ text: h, options: { bold: true, color: COL.navy, breakLine: true } }, { text: d, options: { color: COL.grey, fontSize: 9.5 } }], { x: 0.6, y: y + 0.08, w: 3.5, h: 0.52, fontSize: 11, valign: "top" });
    flowArrow(s, 4.15, y + 0.32, 4.6, 3.12, "Pfeil Quelle " + (i + 1));
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 4.65, y: 1.75, w: 4.3, h: 2.75, fill: { color: COL.navy }, line: { color: COL.navy }, objectName: "Pipeline Fläche" });
  T(s, "KI-Pipeline", { x: 4.95, y: 1.92, w: 3.7, h: 0.3, fontSize: 12, bold: true, color: COL.white });
  [
    ["Erkennen", "Vergabe-Signale finden"],
    ["Zusammenführen", "Duplikate bündeln"],
    ["Filtern", "CT-Kriterien anwenden"],
    ["Anreichern", "Technik, ARGE, Kontakte"],
    ["Bewerten", "Score je Treffer"],
  ].forEach(([h, d], i) => {
    const y = 2.33 + i * 0.4;
    s.addShape(pres.shapes.LINE, { x: 4.95, y, w: 3.7, h: 0, line: { color: COL.slate, width: 0.75 }, objectName: "Linie Schritt " + (i + 1) });
    T(s, h, { x: 4.95, y: y + 0.05, w: 1.6, h: 0.3, fontSize: 10.5, bold: true, color: COL.white, valign: "middle" });
    T(s, d, { x: 6.55, y: y + 0.05, w: 2.1, h: 0.3, fontSize: 9.5, color: COL.line, valign: "middle" });
  });
  flowArrow(s, 9.0, 2.45, 9.45, 2.45, "Pfeil Digest");

  kicker(s, "Ausgabe", 9.55, 1.75, 3.2);
  hair(s, 9.55, 2.1, 3.2, "Linie Ausgabe");
  T(s, [{ text: "Täglicher Digest", options: { bold: true, color: COL.navy, breakLine: true } }, { text: "An den CT Product Champion. Sein Feedback je Treffer schärft Filter und Score.", options: { color: COL.grey, fontSize: 9.5 } }], { x: 9.55, y: 2.18, w: 3.2, h: 1.0, fontSize: 11, valign: "top" });

  [
    ["Relevanzfilter", "Neubau oder Sanierung, Teilschnitt oder Drill & Blast, Länge über 200 m, Durchmesser über ca. 2–3 m. Anfangs weit gefasst, dann geschärft."],
    ["Pilot", "Start mit Deep Research und einem Datenanbieter. Nach 2–4 Wochen Abgleich mit bekannten Projekten, danach Ausbau um Kontakte und Regionen."],
    ["Offene Entscheidungen", "Betrieb als Service oder intern bei VMT, eigenes Sprachmodell oder Anbindung per API, Freigabe der Datenherkunft durch die VMT-IT."],
  ].forEach(([h, d], i) => column(s, 0.6 + i * 4.15, 4.9, 3.85, h, d, 1.0));
  T(s, "Scope Proof of Concept: Conventional Tunneling in DACH bzw. Mitteleuropa inkl. Frankreich und UK. Erst Informationsqualität, dann Oberfläche und CRM.", { x: 0.6, y: 6.4, w: 12.15, h: 0.25, fontSize: 9, italic: true, color: COL.muted });
  s.addNotes("LinkedIn kommt auf zwei Wegen in den Radar: automatisch über einen Datenanbieter (z. B. Octolens ab 159 $/Monat, Coresignal) und manuell über die Teilen-Funktion des Vertriebs. Scraping ist wegen der LinkedIn-Nutzungsbedingungen keine produktive Grundlage. Signale: primär Vergabe an Baufirma/ARGE, indirekt neue ARGEn und Wechsel von Bau-/Projektleitern. Der Pilot mit einem Datenanbieter startet nur mit Zustimmung von VMT.");

  // ================= 6 · Commercial =================
  pres.addSection({ title: "Commercial" });
  s = content("Der Radar trägt sich ab 8 bis 12 zusätzlich\nidentifizierten Projekten pro Jahr", "Commercial", "Commercial");

  kicker(s, "Zielgröße: Akquisitionskosten je zusätzlichem Projekt", 0.6, 1.75, 6.4);
  const eq = [["250 T€", "Ø Projektvolumen", COL.navy, 1.85], ["×", "", COL.muted, 0.6], ["1 %", "CAC-Satz", COL.navy, 1.1], ["=", "", COL.muted, 0.6], [eur(MARKET.cacPerProject), "max. CAC je Projekt", COL.teal, 2.2]];
  let ex = 0.6;
  eq.forEach(([v, cap, c, w]) => {
    T(s, v, { x: ex, y: 2.1, w, h: 0.6, fontSize: 30, bold: v.length > 1, color: c, align: cap ? "left" : "center", valign: "middle" });
    if (cap) T(s, cap, { x: ex, y: 2.72, w, h: 0.25, fontSize: 9.5, color: COL.grey });
    ex += w;
  });
  T(s, "Gemessen wird an zusätzlich identifizierten relevanten Projekten, da der Abschluss beim VMT-Vertrieb liegt. Bewertung nach 6–12 Monaten.", { x: 0.6, y: 3.15, w: 6.2, h: 0.55, fontSize: 10.5, color: COL.grey, valign: "top", lineSpacingMultiple: 1.1 });

  hair(s, 0.6, 3.95, 6.2, "Linie Markt");
  kicker(s, "Markt: neue relevante CT-Vergaben pro Jahr", 0.6, 4.1, 6.2);
  T(s, MARKET.awardsTotal, { x: 0.6, y: 4.45, w: 2.2, h: 0.75, fontSize: 40, bold: true, color: COL.navy, valign: "middle" });
  T(s, "in Zentraleuropa (DACH, Frankreich, UK), eigene Schätzung. VMT schätzt allein für DACH 20–30.", { x: 2.95, y: 4.5, w: 3.85, h: 0.7, fontSize: 10.5, color: COL.grey, valign: "middle" });
  T(s, MARKET.awardsByCountry, { x: 0.6, y: 5.35, w: 6.2, h: 0.3, fontSize: 9.5, color: COL.grey });

  kicker(s, "Payback in Monaten", 7.6, 1.75, 5.1);
  const hb = (top) => [{ type: "none" }, { type: "none" }, { pt: 0.75, color: HAIR }, { type: "none" }].map((b, i) => (i === 0 && top ? { pt: 0.75, color: HAIR } : b));
  const tbl = [[
    { text: "Zusätzliche Projekte p. a.", options: { bold: true, color: COL.grey, fontSize: 9.5, border: hb(true) } },
    ...MARKET.invest.map((v) => ({ text: "Kosten " + v / 1000 + " T€", options: { bold: true, color: COL.grey, fontSize: 9.5, align: "right", border: hb(true) } })),
  ]];
  MARKET.projectsPerYear.forEach((n) => {
    tbl.push([
      { text: String(n), options: { fontSize: 12, bold: true, color: COL.navy, border: hb() } },
      ...MARKET.invest.map((v) => {
        const m = (v * 12) / (n * MARKET.cacPerProject);
        const ok = m <= 12;
        return { text: m.toFixed(m < 10 ? 1 : 0).replace(".", ",") + " Mon.", options: { fontSize: 12, bold: ok, color: ok ? COL.teal : COL.grey, align: "right", border: hb() } };
      }),
    ]);
  });
  s.addTable(tbl, { x: 7.6, y: 2.1, w: 5.15, colW: [2.35, 1.4, 1.4], rowH: 0.48, margin: [0.04, 0.05, 0.04, 0.05], fill: { color: "FFFFFF" }, fontFace: "Arial", valign: "middle" });
  T(s, [
    { text: "Break-even bei 8 Projekten (20 T€) bzw. 12 Projekten (30 T€). ", options: { bold: true, color: COL.navy } },
    { text: "Payback = Monate, bis zusätzliche Projekte × 2.500 € die Kosten decken. Kostenszenarien illustrativ.", options: { color: COL.grey } },
  ], { x: 7.6, y: 4.75, w: 5.15, h: 0.9, fontSize: 10, valign: "top", lineSpacingMultiple: 1.1 });
  s.addNotes(MARKET.notes);

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
