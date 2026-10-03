// Shared design system + slide builders for the three guest-lecture decks
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");

const A = (f) => path.join(__dirname, "assets", f);

const C = {
  navy: "0F1341", grey: "5B6270", light: "F3F7FC", blue: "2E6FBF", blue2: "4A8FDB",
  muted: "8A93A3", ice: "D9E8F8", line: "C9D3E3", slate: "6A7FA8", white: "FFFFFF",
};
const THEME = {
  name: "EE-Partner Lecture", headFontFace: "Montserrat", bodyFontFace: "Montserrat",
  colors: { dk1: C.navy, lt1: C.white, dk2: C.grey, lt2: C.light, accent1: C.blue, accent2: C.blue2,
    accent3: C.muted, accent4: C.ice, accent5: C.line, accent6: C.slate, hlink: C.blue, folHlink: C.slate },
};
const W = 13.333, H = 7.5;

// ---------- icons ----------
const iconCache = {};
async function icon(lib, name, color, size = 256) {
  const key = `${lib}/${name}/${color}`;
  if (iconCache[key]) return iconCache[key];
  const mod = require(`react-icons/${lib}`);
  const Comp = mod[name];
  if (!Comp) throw new Error(`icon ${lib}/${name} missing`);
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return (iconCache[key] = "image/png;base64," + buf.toString("base64"));
}

// ---------- presentation + layouts ----------
function newPres(title) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = title;
  pres.author = "EE-Partner";
  pres.company = "EE-Partner";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };

  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.white },
    objects: [
      { image: { path: A("wave_content.png"), x: W - 6.4, y: 0, w: 6.4, h: 2.2 } },
      { image: { path: A("logo_t.png"), x: 0.62, y: 6.88, w: 1.25, h: 0.46 } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.55, w: 8.6, h: 0.75, fontFace: "Montserrat",
          fontSize: 28, bold: true, color: C.navy, valign: "top", align: "left", margin: 0 }, text: "Title" } },
      { placeholder: { options: { name: "sub", type: "body", x: 0.6, y: 1.32, w: 9.6, h: 0.4, fontFace: "Montserrat",
          fontSize: 13, color: C.grey, valign: "top", align: "left", margin: 0 }, text: "Subtitle" } },
    ],
    slideNumber: { x: 12.1, y: 7.0, w: 0.6, h: 0.3, fontFace: "Montserrat", fontSize: 9, color: C.muted, align: "right" },
  });
  pres.defineSlideMaster({
    title: "DARK",
    background: { color: C.navy },
    objects: [
      { image: { path: A("wave_content_dark.png"), x: W - 6.4, y: 0, w: 6.4, h: 2.2 } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.55, w: 9.2, h: 0.85, fontFace: "Montserrat",
          fontSize: 30, bold: true, color: C.white, valign: "top", align: "left", margin: 0 }, text: "Title" } },
      { placeholder: { options: { name: "sub", type: "body", x: 0.6, y: 1.42, w: 10.2, h: 0.45, fontFace: "Montserrat",
          fontSize: 14, color: C.line, valign: "top", align: "left", margin: 0 }, text: "Subtitle" } },
    ],
    slideNumber: { x: 12.1, y: 7.0, w: 0.6, h: 0.3, fontFace: "Montserrat", fontSize: 9, color: C.slate, align: "right" },
  });
  pres.defineSlideMaster({
    title: "STATEMENT",
    background: { color: C.navy },
    objects: [
      { image: { path: A("wave_content_dark.png"), x: W - 6.4, y: 0, w: 6.4, h: 2.2 } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.75, w: 10.4, h: 1.4, fontFace: "Montserrat",
          fontSize: 34, bold: true, color: C.white, valign: "top", align: "left", margin: 0 }, text: "Title" } },
      { placeholder: { options: { name: "sub", type: "body", x: 0.6, y: 2.25, w: 10.4, h: 0.45, fontFace: "Montserrat",
          fontSize: 16, color: C.blue2, valign: "top", align: "left", margin: 0 }, text: "Subtitle" } },
    ],
    slideNumber: { x: 12.1, y: 7.0, w: 0.6, h: 0.3, fontFace: "Montserrat", fontSize: 9, color: C.slate, align: "right" },
  });
  pres.defineSlideMaster({
    title: "TITLE",
    background: { color: C.white },
    objects: [
      { image: { path: A("wave_title.png"), x: W - 7.5, y: 0, w: 7.5, h: 7.5 } },
      { image: { path: A("logo_t.png"), x: 0.62, y: 0.32, w: 1.96, h: 0.72 } },
    ],
  });
  return pres;
}

// ---------- primitives ----------
function T(slide, text, o) {
  slide.addText(text, Object.assign({ isTextBox: true, fontFace: "Montserrat", margin: 0, valign: "top", color: C.navy, fontSize: 13 }, o));
}
function box(slide, x, y, w, h, o = {}) {
  slide.addShape(o.round === false ? "rect" : "roundRect", Object.assign({ x, y, w, h, rectRadius: 0.08,
    fill: { color: o.fill || C.light }, line: o.line ? { color: o.line, width: o.lineW || 1, dashType: o.dash } : { type: "none" } },
    o.shadow ? { shadow: { type: "outer", color: "0F1341", opacity: 0.12, blur: 8, offset: 2, angle: 90 } } : {}));
}
function pill(slide, text, x, y, w, o = {}) {
  box(slide, x, y, w, o.h || 0.3, { fill: o.fill || C.blue, line: o.line });
  T(slide, text, { x, y, w, h: o.h || 0.3, fontSize: o.size || 9, bold: true, color: o.color || C.white, align: "center", valign: "middle", charSpacing: 1 });
}
function circleNum(slide, n, x, y, d, fill = C.blue, color = C.white, size = 12) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" } });
  T(slide, String(n), { x, y, w: d, h: d, align: "center", valign: "middle", bold: true, fontSize: size, color });
}
function content(pres, title, sub, notes) {
  const s = pres.addSlide({ masterName: "CONTENT" });
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "sub" });
  if (notes) s.addNotes(notes);
  return s;
}
function dark(pres, title, sub, notes) {
  const s = pres.addSlide({ masterName: "DARK" });
  s.addText(title, { placeholder: "title" });
  if (sub) s.addText(sub, { placeholder: "sub" });
  if (notes) s.addNotes(notes);
  return s;
}
function takeaway(slide, runs, y = 6.2, h = 0.55) {
  box(slide, 0.6, y, 12.13, h, { fill: C.navy });
  T(slide, runs, { x: 0.85, y, w: 11.7, h, fontSize: 13, color: C.white, valign: "middle" });
}
function source(slide, text, y = 6.62, x = 2.1, w = 9.6) {
  T(slide, text, { x, y, w, h: 0.25, fontSize: 9, color: C.muted, italic: true });
}

// ---------- shared opening slides ----------
async function mentiSlide(pres, d) {
  const s = dark(pres, "Before we start: your view on AI", "Five quick questions on Menti — answers stay on screen and we come back to them at the end.",
    "Interactive Menti survey (placeholder — insert join code and QR). Run the five questions back to back, about 60 seconds each. Read out one surprising answer per question. Save the results: questions marked “repeat” are asked again at the end.\n\n" +
    d.questions.map((q, i) => `${i + 1}. ${q.q}${q.opts ? "  Options: " + q.opts : ""}`).join("\n"));
  // placeholder frame
  box(s, 0.6, 2.2, 3.3, 4.55, { fill: "1B2156", line: C.blue2, dash: "dash", lineW: 1.25 });
  s.addImage({ data: await icon("md", "MdQrCode2", C.ice), x: 1.5, y: 2.65, w: 1.5, h: 1.5 });
  pill(s, "PLACEHOLDER", 1.3, 4.4, 1.9, { fill: C.blue2 });
  T(s, "Interactive Menti survey", { x: 0.8, y: 4.9, w: 2.9, h: 0.35, fontSize: 14, bold: true, color: C.white, align: "center" });
  T(s, "menti.com  ·  code [ ____ ]\nQR code + live results", { x: 0.8, y: 5.3, w: 2.9, h: 0.8, fontSize: 12, color: C.line, align: "center" });
  // five questions
  const y0 = 2.2, hq = 0.83, gap = 0.1;
  d.questions.forEach((q, i) => {
    const y = y0 + i * (hq + gap);
    box(s, 4.2, y, 8.53, hq, { fill: "1B2156" });
    circleNum(s, i + 1, 4.38, y + (hq - 0.45) / 2, 0.45, C.blue2, C.white, 13);
    T(s, q.q, { x: 5.0, y: y + 0.08, w: 5.3, h: hq - 0.16, fontSize: 13, bold: true, color: C.white, valign: "middle" });
    pill(s, q.type, 10.5, y + 0.1, 2.05, { h: 0.24, size: 8, fill: C.blue });
    T(s, q.opts || "", { x: 10.5, y: y + 0.38, w: 2.05, h: 0.4, fontSize: 9, color: C.line, valign: "top", align: "left" });
  });
  return s;
}

async function demoSlide(pres, d) {
  const s = dark(pres, "Live: AI linking millions of data points",
    "Emidio demonstrates a highly complex AI workflow we developed — " + d.lens,
    "PLACEHOLDER — live demo by Emidio (approx. 5–7 minutes). The workflow connects millions of data points from many sources into one decision. Frame it with the lecture's lens: " + d.lens + "\nAfterwards ask the room: what would this have taken a team ten years ago? Bridge to the title slide.");
  box(s, 0.6, 2.25, 8.1, 4.5, { fill: "1B2156", line: C.blue2, dash: "dash", lineW: 1.25 });
  s.addImage({ path: A("network.png"), x: 0.8, y: 2.4, w: 7.7, h: 4.2, transparency: 25 });
  box(s, 2.55, 3.9, 4.2, 1.15, { fill: C.navy, line: C.blue2 });
  pill(s, "PLACEHOLDER  ·  LIVE DEMO", 3.25, 4.03, 2.8, { fill: C.blue2 });
  T(s, "Emidio · AI workflow on screen", { x: 2.6, y: 4.45, w: 4.1, h: 0.45, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle" });
  const items = [
    ["md", "MdHub", "Millions of data points", "Many sources linked in one model"],
    ["md", "MdSmartToy", "Multiple AI agents", "Research, matching and scoring in one flow"],
    ["md", "MdInsights", "From data to decision", "The output is a recommendation, not a dashboard"],
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.25 + i * 1.53, [lib, ic, h1, h2] = items[i];
    box(s, 9.0, y, 3.73, 1.38, { fill: "1B2156" });
    s.addShape("ellipse", { x: 9.2, y: y + 0.42, w: 0.55, h: 0.55, fill: { color: C.blue }, line: { type: "none" } });
    s.addImage({ data: await icon(lib, ic, C.white), x: 9.32, y: y + 0.54, w: 0.31, h: 0.31 });
    T(s, h1, { x: 9.95, y: y + 0.22, w: 2.65, h: 0.4, fontSize: 13, bold: true, color: C.white });
    T(s, h2, { x: 9.95, y: y + 0.62, w: 2.65, h: 0.62, fontSize: 11, color: C.line });
  }
  return s;
}

function titleSlide(pres, d) {
  const s = pres.addSlide({ masterName: "TITLE" });
  T(s, d.title, { x: 0.62, y: 2.25, w: 7.2, h: 1.9, fontSize: 40, bold: true, color: C.navy, valign: "bottom" });
  T(s, d.subtitle, { x: 0.62, y: 4.35, w: 6.6, h: 1.0, fontSize: 16, color: C.grey });
  T(s, "Rome, October 2026", { x: 0.62, y: 6.65, w: 4, h: 0.35, fontSize: 12, color: C.muted });
  s.addNotes(d.notes);
  return s;
}

// ---------- shared AI impulse slides ----------
function chatgptSlide(pres, d) {
  const s = content(pres, "ChatGPT: 1 million users in just 5 days", "Time it took to reach 1 million users",
    "AI impulse 1 — adoption speed. Netflix needed 3.5 years, Airbnb 2.5, Twitter 2. ChatGPT needed five days (launch Nov 30, 2022). The bar for ChatGPT is barely visible — that is the point. " + d.note);
  const rows = [["Netflix", 3.5, "3.5 years"], ["Airbnb", 2.5, "2.5 years"], ["Twitter", 2.0, "2 years"], ["ChatGPT", 5 / 365, "5 days"]];
  const x0 = 2.3, maxW = 5.6, y0 = 2.2, rh = 0.62, gap = 0.4;
  s.addShape("line", { x: x0, y: y0 - 0.2, w: 0, h: rows.length * (rh + gap) + 0.0, line: { color: C.line, width: 1 } });
  rows.forEach(([n, v, lab], i) => {
    const y = y0 + i * (rh + gap), hot = n === "ChatGPT";
    T(s, n, { x: 0.6, y, w: 1.5, h: rh, fontSize: 15, bold: hot, color: hot ? C.blue : C.navy, align: "right", valign: "middle" });
    const bw = Math.max(0.09, (v / 3.5) * maxW);
    s.addShape("rect", { x: x0, y, w: bw, h: rh, fill: { color: hot ? C.blue : (i === 0 ? C.navy : i === 1 ? "283070" : C.slate) }, line: { type: "none" } });
    if (hot) T(s, lab, { x: x0 + 0.25, y, w: 2, h: rh, fontSize: 15, bold: true, color: C.blue, valign: "middle" });
    else T(s, lab, { x: x0, y, w: bw, h: rh, fontSize: 14, color: C.white, align: "center", valign: "middle" });
  });
  box(s, 8.7, 2.0, 4.03, 3.85, { fill: C.navy });
  T(s, "5", { x: 8.95, y: 2.2, w: 3.6, h: 1.4, fontSize: 88, bold: true, color: C.white });
  T(s, "days", { x: 10.0, y: 2.85, w: 2.4, h: 0.6, fontSize: 28, bold: true, color: C.blue2 });
  T(s, "from launch to one million users — faster than any consumer product before it.", { x: 8.95, y: 3.75, w: 3.55, h: 1.0, fontSize: 14, color: C.white });
  T(s, d.so, { x: 8.95, y: 4.85, w: 3.55, h: 0.85, fontSize: 12, color: C.line, italic: true });
  source(s, "Source: Statista, based on company announcements. ChatGPT launched on 30 November 2022.", 6.35, 0.6, 7.6);
  return s;
}

function iqSlide(pres, d) {
  const s = content(pres, "AI's IQ: from 96 to 136 in one year", "Best AI model on standardised IQ tests — one year apart",
    "AI impulse 2 — capability speed. In 2024 the best model scored around 96 on an offline IQ test (not in any training data). In 2025 the best model (o3) reached 136 on the Mensa Norway test — roughly the top 1% of people. Caveat to say out loud: IQ tests measure pattern reasoning, not judgement or experience. " + d.note);
  // left stat column
  box(s, 0.6, 2.0, 3.6, 2.0, { fill: C.light });
  T(s, "2024", { x: 0.85, y: 2.15, w: 3, h: 0.35, fontSize: 13, bold: true, color: C.muted });
  T(s, "IQ 96", { x: 0.85, y: 2.5, w: 3.2, h: 0.9, fontSize: 44, bold: true, color: C.slate });
  T(s, "Best model, offline test", { x: 0.85, y: 3.45, w: 3.2, h: 0.35, fontSize: 12, color: C.grey });
  box(s, 0.6, 4.2, 3.6, 2.0, { fill: C.navy });
  T(s, "2025", { x: 0.85, y: 4.35, w: 3, h: 0.35, fontSize: 13, bold: true, color: C.blue2 });
  T(s, "IQ 136", { x: 0.85, y: 4.7, w: 3.2, h: 0.9, fontSize: 44, bold: true, color: C.white });
  T(s, "Best model, Mensa Norway test", { x: 0.85, y: 5.65, w: 3.2, h: 0.35, fontSize: 12, color: C.line });
  // charts
  box(s, 4.55, 2.0, 8.18, 2.0, { fill: C.white, line: C.line });
  s.addImage({ path: A("iq2024.png"), x: 4.75, y: 2.25, w: 6.45, h: 1.64 });
  T(s, "2024", { x: 11.3, y: 2.2, w: 1.3, h: 0.4, fontSize: 16, bold: true, color: C.slate, align: "right" });
  box(s, 4.55, 4.2, 8.18, 2.0, { fill: C.white, line: C.line });
  s.addImage({ path: A("iq2025.png"), x: 5.25, y: 4.28, w: 5.13, h: 1.86 });
  T(s, "2025", { x: 11.3, y: 4.4, w: 1.3, h: 0.4, fontSize: 16, bold: true, color: C.blue, align: "right" });
  source(s, "Source: TrackingAI.org (MaximumTruth.org) — IQ scores, average of last 7 tests. Average human = 100.", 6.35, 0.6, 12);
  return s;
}

function jobsSlide(pres, d) {
  const s = content(pres, "Why AI is (still) hardly replacing jobs", "Capability is rising fast — but real work is messy",
    "AI impulse 3 — reality check. METR measured AI success on tasks that take a human professional one hour or less. On clean, well-defined tasks success went from ~0 to ~95% within three years; on messy tasks — unclear goals, many tools, changing context — it is around 60%. Most real jobs are messy. " + d.note);
  const pts = [
    ["md", "MdWorkOff", "So far, hardly any job losses from AI"],
    ["md", "MdAccountTree", "AI hits its limits in complex, dynamic workflows"],
    ["md", "MdBusinessCenter", "Office and routine work stable so far — despite automation risk"],
    ["md", "MdTrendingUp", "Demand for AI skills is growing sharply"],
  ];
  pts.forEach(([lib, ic, t], i) => {
    const y = 2.05 + i * 0.98;
    s.addShape("ellipse", { x: 0.6, y, w: 0.62, h: 0.62, fill: { color: C.ice }, line: { type: "none" } });
    s.__icons = s.__icons || []; s.__icons.push([lib, ic, 0.74, y + 0.14]);
    T(s, t, { x: 1.45, y, w: 5.6, h: 0.62, fontSize: 16, color: C.navy, valign: "middle" });
  });
  box(s, 0.6, 6.0, 6.45, 0.62, { fill: C.light });
  T(s, [{ text: "For you: ", options: { bold: true } }, { text: d.so }], { x: 0.8, y: 6.0, w: 6.1, h: 0.62, fontSize: 12, color: C.navy, valign: "middle" });
  // chart card
  box(s, 7.4, 1.9, 5.33, 4.95, { fill: C.navy });
  T(s, "AI's ability to automate jobs is constrained by task “messiness”", { x: 7.65, y: 2.05, w: 4.9, h: 0.6, fontSize: 13, bold: true, color: C.white });
  T(s, "AI task success rate by messiness of the task (%)", { x: 7.65, y: 2.65, w: 4.9, h: 0.3, fontSize: 10, color: C.line });
  const xs = [2022.15, 2023.05, 2023.65, 2024.1, 2024.2, 2024.42, 2024.52, 2024.62, 2024.83];
  s.addChart(pres.charts.SCATTER, [
    { name: "X", values: xs },
    { name: "Least messy", values: [1, 47, 64, 64, 71, 73, 84, 81, 95] },
    { name: "Messiest", values: [0.5, 21, 22, 17, 36, 42, 40, 50, 62] },
  ], { x: 7.5, y: 2.95, w: 5.1, h: 3.35, lineSize: 0, lineDataSymbol: "circle", lineDataSymbolSize: 9,
    chartColors: [C.ice, C.blue2], valAxisMinVal: 0, valAxisMaxVal: 100, valAxisMajorUnit: 20,
    catAxisMinVal: 2022, catAxisMaxVal: 2025.5, catAxisMajorUnit: 1, catAxisLabelFormatCode: "0",
    valAxisLabelColor: C.line, catAxisLabelColor: C.line, valAxisLabelFontSize: 10, catAxisLabelFontSize: 10,
    valAxisLabelFontFace: "+mn-lt", catAxisLabelFontFace: "+mn-lt",
    valGridLine: { color: "2A3170", size: 0.75 }, catGridLine: { color: "2A3170", size: 0.75 },
    showLegend: true, legendPos: "b", legendColor: C.white, legendFontSize: 10, legendFontFace: "+mn-lt",
    plotArea: { fill: { color: C.navy } } });
  T(s, "Tasks taking a human professional ≤ 1 hour. Source: METR / Measuring AI Ability (values read from published chart).", { x: 7.65, y: 6.3, w: 4.9, h: 0.45, fontSize: 9, color: C.line, italic: true });
  return s;
}

function skillsSlide(pres, d) {
  const s = content(pres, "Core skills in 2030", "Share of employers calling a skill core today (x) vs expecting it to grow by 2030 (y)",
    "AI impulse 4 — what becomes valuable. Top right quadrant = core now and growing: AI and big data leads by far, followed by technological literacy, creative and analytical thinking, resilience, curiosity and lifelong learning. Programming sits lower than people expect — AI writes code. " + d.note);
  box(s, 0.6, 1.88, 6.45, 4.72, { fill: C.white, line: C.line });
  s.addImage({ path: A("wef.png"), x: 0.7, y: 1.95, w: 6.25, h: 4.58 });
  const take = [
    ["AI and big data", "the fastest-growing skill of all — almost 9 in 10 employers expect it to grow"],
    ["Thinking skills stay core", "analytical thinking, creative thinking, systems thinking"],
    ["Human skills rise with AI", "resilience, curiosity and lifelong learning, leadership"],
  ];
  take.forEach(([h1, h2], i) => {
    const y = 1.9 + i * 1.12;
    circleNum(s, i + 1, 7.45, y + 0.05, 0.42, C.blue, C.white, 12);
    T(s, h1, { x: 8.05, y, w: 4.68, h: 0.38, fontSize: 14, bold: true });
    T(s, h2, { x: 8.05, y: y + 0.38, w: 4.68, h: 0.65, fontSize: 12, color: C.grey });
  });
  box(s, 7.45, 5.3, 5.28, 1.3, { fill: C.navy });
  T(s, d.so, { x: 7.7, y: 5.3, w: 4.85, h: 1.3, fontSize: 13, color: C.white, valign: "middle" });
  source(s, "Source: World Economic Forum, Future of Jobs Report 2025, Figure 3.6.", 6.65, 2.1, 6);
  return s;
}

function augmentedSlide(pres, d) {
  const s = content(pres, "“Augmented Intelligence”", "Not human or machine — the value sits in the overlap",
    "AI impulse 5 — the bridge to today's topic. Human intelligence brings judgement, context, trust and responsibility. Artificial intelligence brings speed, scale and pattern recognition. Augmented intelligence is the overlap — and that is where the rest of this lecture lives. " + d.note);
  s.addShape("ellipse", { x: 0.9, y: 1.95, w: 5.0, h: 4.75, fill: { color: C.ice, transparency: 15 }, line: { color: C.blue2, width: 3 } });
  s.addShape("ellipse", { x: 3.9, y: 1.95, w: 5.0, h: 4.75, fill: { color: C.slate, transparency: 45 }, line: { color: C.navy, width: 3 } });
  T(s, "Human\nIntelligence", { x: 1.2, y: 3.85, w: 2.6, h: 0.9, fontSize: 18, bold: true, color: C.blue, align: "center", valign: "middle" });
  T(s, "Augmented\nIntelligence", { x: 3.95, y: 3.85, w: 1.9, h: 0.9, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle" });
  T(s, "Artificial\nIntelligence", { x: 6.0, y: 3.85, w: 2.6, h: 0.9, fontSize: 18, bold: true, color: C.navy, align: "center", valign: "middle" });
  const col = [
    ["HUMAN", C.blue, "Judgement, context, trust, responsibility"],
    ["AI", C.navy, "Speed, scale, pattern recognition, tireless testing"],
    ["AUGMENTED — " + d.topicTag, C.slate, d.overlap],
  ];
  col.forEach(([h1, c, t], i) => {
    const y = 2.05 + i * 1.5;
    pill(s, h1, 9.4, y, h1.length > 12 ? 3.33 : 1.4, { fill: c });
    T(s, t, { x: 9.4, y: y + 0.42, w: 3.33, h: 0.95, fontSize: 13, color: C.navy });
  });
  return s;
}

async function impulseBlock(pres, d) {
  chatgptSlide(pres, d.chatgpt);
  iqSlide(pres, d.iq);
  const js = jobsSlide(pres, d.jobs);
  for (const [lib, ic, x, y] of js.__icons) js.addImage({ data: await icon(lib, ic, C.blue), x, y, w: 0.34, h: 0.34 });
  skillsSlide(pres, d.skills);
  augmentedSlide(pres, d.aug);
}

// ---------- topic slides ----------
function rethinkSlide(pres, d) {
  const s = content(pres, d.title, d.sub, d.notes);
  const lx = 0.6, lw = 2.0, cx = [2.8, 6.15, 9.5], cw = 3.23, y0 = 1.95;
  const heads = [["BEFORE", C.line, C.navy], ["NOW, WITH AI", C.blue2, C.white], ["AI-NATIVE", C.navy, C.white]];
  heads.forEach(([h1, f, c], i) => pill(s, h1, cx[i], y0, cw, { fill: f, color: c, h: 0.38, size: 11 }));
  const rh = 0.86, gap = 0.12;
  d.rows.forEach((r, j) => {
    const y = y0 + 0.55 + j * (rh + gap);
    T(s, r[0], { x: lx, y, w: lw, h: rh, fontSize: 14, bold: true, color: C.navy, valign: "middle" });
    for (let i = 0; i < 3; i++) {
      box(s, cx[i], y, cw, rh, { fill: i === 2 ? C.navy : i === 1 ? C.ice : C.light });
      T(s, r[i + 1], { x: cx[i] + 0.18, y, w: cw - 0.36, h: rh, fontSize: 12.5, color: i === 2 ? C.white : C.navy, valign: "middle", bold: i === 2 });
    }
  });
  T(s, d.foot, { x: 0.6, y: 6.5, w: 12.1, h: 0.3, fontSize: 11, color: C.grey, italic: true });
  return s;
}

async function aiNativeSlide(pres, d) {
  const s = content(pres, "What we mean by “AI-native”", d.sub, d.notes);
  // left: enabled vs native
  box(s, 0.6, 1.95, 5.6, 1.85, { fill: C.light });
  pill(s, "AI-ENABLED", 0.85, 2.15, 1.7, { fill: C.line, color: C.navy });
  T(s, "The old process, plus an AI tool", { x: 0.85, y: 2.55, w: 5.2, h: 0.4, fontSize: 15, bold: true });
  T(s, d.enabled, { x: 0.85, y: 2.98, w: 5.2, h: 0.75, fontSize: 12, color: C.grey });
  box(s, 0.6, 4.0, 5.6, 2.05, { fill: C.navy });
  pill(s, "AI-NATIVE", 0.85, 4.2, 1.7, { fill: C.blue2 });
  T(s, "The process redesigned around what AI makes cheap", { x: 0.85, y: 4.6, w: 5.2, h: 0.65, fontSize: 15, bold: true, color: C.white });
  T(s, d.native, { x: 0.85, y: 5.25, w: 5.2, h: 0.75, fontSize: 12, color: C.line });
  // right: four principles
  const pr = [
    ["md", "MdSmartToy", "Agents do the work, humans set direction", d.p[0]],
    ["md", "MdScience", "Every decision is a hypothesis", d.p[1]],
    ["md", "MdAutorenew", "Every loop makes the system smarter", d.p[2]],
    ["md", "MdFactCheck", "Evidence beats opinion", d.p[3]],
  ];
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 1.04, [lib, ic, h1, t] = pr[i];
    s.addShape("ellipse", { x: 6.6, y: y + 0.12, w: 0.6, h: 0.6, fill: { color: C.ice }, line: { type: "none" } });
    s.addImage({ data: await icon(lib, ic, C.blue), x: 6.74, y: y + 0.26, w: 0.32, h: 0.32 });
    T(s, h1, { x: 7.4, y: y + 0.05, w: 5.33, h: 0.36, fontSize: 14, bold: true });
    T(s, t, { x: 7.4, y: y + 0.42, w: 5.33, h: 0.55, fontSize: 12, color: C.grey });
  }
  takeaway(s, [{ text: "In one line: ", options: { bold: true, color: C.blue2 } }, { text: d.line }], 6.2, 0.55);
  return s;
}

async function enginesSlide(pres, d) {
  const s = content(pres, d.title, d.sub, d.notes);
  const eng = [
    ["E4", "Context Engine", "LLM research agent", "Reads competitor sites, reviews, regulation and news — extracts only what sources state"],
    ["E5", "Aggregate Research", "Statistical agent", "Official statistics, TAM / SAM / SOM — top-down and bottom-up"],
    ["E2", "Simulated Mind", "Neuro-AI model", "Predicts a segment's attention and valuation response to a message or price"],
    ["E3", "Market World", "Multi-agent simulation", "A synthetic market of buyer archetypes — trusted only once calibrated"],
    ["E1", "Cold Email Engine", "Autonomous experiment", "Finds, writes, sends, classifies replies — real behaviour, measured"],
  ];
  T(s, "ENGINE  ·  AI MECHANISM", { x: 0.6, y: 1.92, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.muted, charSpacing: 1 });
  T(s, "WHAT IT DOES", { x: 4.55, y: 1.92, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.muted, charSpacing: 1 });
  T(s, d.colHead, { x: 8.85, y: 1.92, w: 3.9, h: 0.25, fontSize: 9, bold: true, color: C.blue, charSpacing: 1 });
  const rh = 0.74, gap = 0.08;
  eng.forEach(([id, n, mech, what], i) => {
    const y = 2.22 + i * (rh + gap), last = id === "E1";
    box(s, 0.6, y, 12.13, rh, { fill: last ? C.ice : C.light });
    circleNum(s, id, 0.75, y + 0.14, 0.46, last ? C.blue : C.navy, C.white, 11);
    T(s, n, { x: 1.35, y: y + 0.08, w: 3.1, h: 0.32, fontSize: 13, bold: true });
    T(s, mech.toUpperCase(), { x: 1.35, y: y + 0.42, w: 3.1, h: 0.25, fontSize: 9, bold: true, color: C.blue, charSpacing: 1 });
    T(s, what, { x: 4.55, y, w: 4.1, h: rh, fontSize: 11, color: C.grey, valign: "middle" });
    T(s, d.rows[i], { x: 8.85, y, w: 3.75, h: rh, fontSize: 12, bold: true, color: C.navy, valign: "middle" });
  });
  takeaway(s, [{ text: "Behaviour over opinion: ", options: { bold: true, color: C.blue2 } }, { text: d.foot }], 6.4, 0.42);
  return s;
}

async function challengeSlide(pres, d) {
  const s = dark(pres, d.title, d.sub, d.notes);
  const st = [["3 min", "Quantify"], ["2 min", "Develop"], ["2 min", "Validate"], ["3 min", "Pitch"]];
  const cw = 2.86, gap = 0.23;
  st.forEach(([t, h1], i) => {
    const x = 0.6 + i * (cw + gap);
    box(s, x, 2.2, cw, 2.55, { fill: "1B2156" });
    pill(s, t, x + 0.2, 2.4, 0.95, { fill: C.blue2 });
    T(s, h1, { x: x + 0.2, y: 2.85, w: cw - 0.4, h: 0.45, fontSize: 18, bold: true, color: C.white });
    T(s, d.steps[i], { x: x + 0.2, y: 3.35, w: cw - 0.4, h: 1.3, fontSize: 12, color: C.line });
  });
  T(s, "WHAT EVERY GROUP HANDS IN (MENTI)", { x: 0.6, y: 5.05, w: 6, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
  const n = d.handIn.length, bw = (8.9 - (n - 1) * 0.15) / n;
  d.handIn.forEach((h1, i) => {
    box(s, 0.6 + i * (bw + 0.15), 5.42, bw, 0.6, { fill: C.navy, line: C.slate });
    T(s, h1, { x: 0.6 + i * (bw + 0.15), y: 5.42, w: bw, h: 0.6, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle" });
  });
  box(s, 9.85, 5.05, 2.88, 1.0, { fill: C.blue });
  s.addImage({ data: await icon("md", "MdQrCode2", C.white), x: 10.0, y: 5.2, w: 0.7, h: 0.7 });
  T(s, "QR → data sheet + prompt\n" + d.qrNote, { x: 10.8, y: 5.1, w: 1.85, h: 0.9, fontSize: 10, color: C.white, valign: "middle" });
  T(s, d.foot, { x: 0.6, y: 6.35, w: 12.1, h: 0.4, fontSize: 12, color: C.line, italic: true });
  return s;
}

async function changeSlide(pres, d) {
  const s = content(pres, d.title, d.sub, d.notes);
  const cw = 5.95, ch = 1.95;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * (cw + 0.23), y = 1.95 + Math.floor(i / 2) * (ch + 0.2);
    const [ic, h1, t] = d.cards[i];
    box(s, x, y, cw, ch, { fill: i === 3 ? C.navy : C.light });
    s.addShape("ellipse", { x: x + 0.25, y: y + 0.28, w: 0.66, h: 0.66, fill: { color: i === 3 ? C.blue : C.ice }, line: { type: "none" } });
    s.addImage({ data: await icon("md", ic, i === 3 ? C.white : C.blue), x: x + 0.41, y: y + 0.44, w: 0.34, h: 0.34 });
    T(s, h1, { x: x + 1.15, y: y + 0.25, w: cw - 1.4, h: 0.5, fontSize: 15, bold: true, color: i === 3 ? C.white : C.navy, valign: "middle" });
    T(s, t, { x: x + 1.15, y: y + 0.8, w: cw - 1.4, h: 1.05, fontSize: 12.5, color: i === 3 ? C.line : C.grey });
  }
  if (d.foot) T(s, d.foot, { x: 0.6, y: 6.32, w: 12.1, h: 0.4, fontSize: 12, color: C.blue, bold: true });
  return s;
}

function closingSlide(pres, d) {
  const s = pres.addSlide({ masterName: "STATEMENT" });
  s.addText("AI can generate a strategy. Evidence tells you whether it works.", { placeholder: "title" });
  s.addText("The advantage is not generating answers faster — it is testing assumptions faster.", { placeholder: "sub" });
  s.addNotes(d.notes);
  const st = [["Identify", "Find the opportunity"], ["Quantify", "Build the business case"], ["Experiment", "Collect real evidence"], ["Decide", "Go, iterate or stop"]];
  const cw = 2.86, gap = 0.23;
  st.forEach(([h1, t], i) => {
    const x = 0.6 + i * (cw + gap);
    box(s, x, 3.1, cw, 1.45, { fill: "1B2156" });
    T(s, "0" + (i + 1), { x: x + 0.22, y: 3.23, w: 1, h: 0.4, fontSize: 14, bold: true, color: C.blue2 });
    T(s, h1, { x: x + 0.22, y: 3.63, w: cw - 0.4, h: 0.4, fontSize: 17, bold: true, color: C.white });
    T(s, t, { x: x + 0.22, y: 4.05, w: cw - 0.4, h: 0.35, fontSize: 12, color: C.line });
  });
  T(s, "WHO WE ARE", { x: 0.6, y: 4.95, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
  T(s, "EE-Partner (Milan) and asuno (Singapore) build AI-native systems for B2B companies — process automation for the DACH Mittelstand, and the Business Model Validator: an AI validation layer between idea and investment.",
    { x: 0.6, y: 5.3, w: 5.9, h: 1.2, fontSize: 12, color: C.line });
  T(s, "WORK WITH US", { x: 6.85, y: 4.95, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
  T(s, d.work, { x: 6.85, y: 5.3, w: 5.88, h: 0.7, fontSize: 12, color: C.line });
  T(s, "Contact: [e-mail / LinkedIn]", { x: 6.85, y: 6.05, w: 5.88, h: 0.35, fontSize: 12, bold: true, color: C.white });
  s.addImage({ path: A("logo_w.png"), x: 0.62, y: 6.62, w: 1.25, h: 0.46 });
  return s;
}

module.exports = { C, THEME, W, H, A, icon, newPres, T, box, pill, circleNum, content, dark, takeaway, source,
  mentiSlide, demoSlide, titleSlide, impulseBlock, rethinkSlide, aiNativeSlide, enginesSlide, challengeSlide, changeSlide, closingSlide };
