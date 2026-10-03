const L = require("./lib");
const { C, T, box, pill, circleNum, content, takeaway, source, icon } = L;

async function jcu() {
  const pres = L.newPres("From Idea to Market: Building an AI-Native Business");

  await L.mentiSlide(pres, { title: "Before we start: you and AI", questions: [
    { type: "POLL", q: "Be honest: did AI help with your last university assignment?", opts: "Yes · a bit · no · I plead the fifth" },
    { type: "WORD CLOUD", q: "If building cost nothing — what would you build?" },
    { type: "POLL", q: "Will a one-person company be worth $1 billion before 2030?", opts: "Yes · no · it already happened" },
    { type: "POLL", q: "What worries you more about AI and your career?", opts: "It takes my job · I don't use it well enough · nothing" },
    { type: "POLL · REPEAT", q: "After graduation, would you rather…", opts: "Start my own company · join a startup · join a corporate" },
  ] });
  await L.demoSlide(pres, { lens: "turning millions of data points into a go / no-go for a new business idea." });
  L.titleSlide(pres, { title: "From Idea to Market: Building an AI-Native Business",
    subtitle: "Why building is no longer the hard part — and what is.",
    notes: "Title after the opening demo. Promise: in the next hour we show why building a product has become almost free — and why that makes one skill more valuable than ever: knowing what is worth building. The room builds and tests one idea live." });
  await L.impulseBlock(pres, {
    chatgpt: { note: "For founders: customers adopt new tools this fast — and so do your competitors.", so: "For founders: your market — and your competitors — can now move this fast too." },
    iq: { note: "Ask: if the AI in your pocket outscores most people on reasoning tests, what is still your job as a founder?" },
    jobs: { note: "For students: AI raises the bar on clean tasks; the edge is in messy work — ambiguity, customers, judgement.", so: "AI takes the clean tasks. Building a company is messy work — that is where you add value." },
    skills: { note: "Link to their studies: analytical thinking, AI literacy and curiosity are the founder's skill set.", so: "The founder profile of 2030: AI-literate, analytical, creative — and curious enough to test." },
    aug: { topicTag: "FOUNDERS", overlap: "A founder who lets AI research, build and test — and keeps judgement on what is worth building." },
  });

  // 2015 vs 2026
  {
    const s = content(pres, "2015 vs. 2026: what it takes to launch", "Same idea, same goal — first real customer signal",
      "Illustrative, but realistic orders of magnitude. 2015: weeks of research, an agency or a developer for months, a launch campaign, then waiting for feedback. 2026: one founder with AI agents does the whole loop in a weekend. Let the 2026 bar sink in — it is almost invisible. Ask: what does this do to the value of an idea? (Answer: ideas got cheaper; validated ideas did not.)");
    pill(s, "ILLUSTRATIVE", 0.6, 1.95, 1.6, { fill: C.line, color: C.navy });
    const seg = [["Research", "6 weeks", 6], ["Prototype", "3 months", 13], ["Launch", "4 weeks", 4], ["First feedback", "2 months", 8]];
    const total = 31, x0 = 2.3, full = 10.43;
    T(s, "2015", { x: 0.6, y: 2.5, w: 1.5, h: 0.8, fontSize: 26, bold: true, color: C.slate, valign: "middle" });
    let x = x0;
    seg.forEach(([n, d, w], i) => {
      const bw = (w / total) * full - 0.05;
      s.addShape("rect", { x, y: 2.5, w: bw, h: 0.8, fill: { color: ["283070", C.slate, "8796B8", C.line][i] }, line: { type: "none" } });
      T(s, [{ text: n, options: { bold: true, breakLine: true } }, { text: d }], { x: x + 0.1, y: 2.5, w: bw - 0.15, h: 0.8, fontSize: 11, color: i === 3 ? C.navy : C.white, valign: "middle" });
      x += bw + 0.05;
    });
    T(s, "2026", { x: 0.6, y: 3.55, w: 1.5, h: 0.8, fontSize: 26, bold: true, color: C.blue, valign: "middle" });
    s.addShape("rect", { x: x0, y: 3.55, w: 0.12, h: 0.8, fill: { color: C.blue }, line: { type: "none" } });
    T(s, [{ text: "The whole loop: one weekend.", options: { bold: true, color: C.blue } }, { text: "  Research 30 min · prototype 3 h · launch 1 h · first signal 48 h", options: { color: C.grey } }],
      { x: x0 + 0.3, y: 3.55, w: 10, h: 0.8, fontSize: 13, valign: "middle" });
    const stats = [["Team", "5 people", "1 founder + agents"], ["Budget", "€100,000+", "< €500"], ["Time to first signal", "~ 6 months", "1 weekend"]];
    stats.forEach(([h1, a, b], i) => {
      const bx = 0.6 + i * 4.1;
      box(s, bx, 4.75, 3.85, 1.65, { fill: i === 2 ? C.navy : C.light });
      T(s, h1.toUpperCase(), { x: bx + 0.25, y: 4.9, w: 3.4, h: 0.3, fontSize: 10, bold: true, color: i === 2 ? C.blue2 : C.muted, charSpacing: 1 });
      T(s, a, { x: bx + 0.25, y: 5.25, w: 3.4, h: 0.35, fontSize: 14, color: i === 2 ? C.line : C.muted, strike: "sngStrike" });
      T(s, b, { x: bx + 0.25, y: 5.62, w: 3.4, h: 0.6, fontSize: 22, bold: true, color: i === 2 ? C.white : C.navy });
    });
  }

  // Tiny teams
  {
    const s = content(pres, "Tiny teams, giant outcomes", "The first generation of AI-native companies — reported figures",
      "Reported figures from company statements and press coverage (2023–2025) — verify the latest numbers before the lecture. The point is not the exact number but the ratio: revenue per employee that used to need hundreds of people. All three are AI products — but more importantly they run AI-native: small teams, agents in every function, shipping daily.");
    const cs = [
      ["Lovable", "Sweden · AI app builder", "$100M", "annual recurring revenue about 8 months after launch"],
      ["Cursor", "USA · AI code editor", "$100M", "annual recurring revenue in roughly a year, with a small team"],
      ["Midjourney", "USA · AI image generation", "~$200M", "revenue in 2023 with a team of around 40, no outside funding"],
    ];
    cs.forEach(([n, sub, big, t], i) => {
      const x = 0.6 + i * 4.1, hot = i === 1;
      box(s, x, 1.95, 3.85, 3.65, { fill: hot ? C.navy : C.light });
      T(s, n, { x: x + 0.3, y: 2.15, w: 3.3, h: 0.5, fontSize: 22, bold: true, color: hot ? C.white : C.navy });
      T(s, sub, { x: x + 0.3, y: 2.65, w: 3.3, h: 0.3, fontSize: 11, color: hot ? C.line : C.grey });
      T(s, big, { x: x + 0.3, y: 3.2, w: 3.3, h: 1.0, fontSize: 48, bold: true, color: hot ? C.blue2 : C.blue });
      T(s, t, { x: x + 0.3, y: 4.3, w: 3.3, h: 0.9, fontSize: 13, color: hot ? C.white : C.navy });
      T(s, "REPORTED", { x: x + 0.3, y: 5.2, w: 3.3, h: 0.25, fontSize: 9, bold: true, color: hot ? C.slate : C.muted, charSpacing: 1 });
    });
    takeaway(s, [{ text: "What they share: ", options: { bold: true, color: C.blue2 } }, { text: "AI is not only in the product — it runs the company. Small teams, agents everywhere, shipping every day." }], 5.85, 0.6);
    source(s, "Sources: company statements and press reports, 2023–2025. Figures as reported, not audited.", 6.55, 0.6 + 1.5, 9);
  }

  await L.aiNativeSlide(pres, { sub: "AI-native is not using more AI tools — it is building the company around them",
    notes: "Definition used for the rest of the session. Contrast: an AI-enabled startup writes its pitch deck with ChatGPT; an AI-native startup has agents that research, build, test and report every week — and the founders decide on evidence.",
    enabled: "ChatGPT writes the pitch deck, the copy and the business plan. The steps and the decisions stay the same — just faster.",
    native: "Agents research, build and test continuously; founders set hypotheses and decide on evidence. Small teams do what took 20 people.",
    p: ["Founders choose what to test — agents research, build and run it", "“Students will pay for this” is an assumption with a kill criterion", "Each experiment sharpens the next — learning compounds", "A click, sign-up or payment outweighs any AI-generated forecast"],
    line: "an AI-native company does not just generate answers faster — it tests its assumptions faster than anyone else." });

  // Build-Measure-Learn
  {
    const s = content(pres, "Build – Measure – Learn, AI edition", "Lean Startup (Ries, 2011): AI collapses “build” — “learn” becomes the bottleneck",
      "Academic anchor: Eric Ries' build–measure–learn loop and Steve Blank's customer development. AI shrinks Build from months to hours and Measure from weeks to days. Learn — deciding what the evidence means and what to do next — is still human. The CB Insights post-mortems show the real killer: no market need. When building is almost free, the scarce skill is knowing what is worth building.");
    const nodes = [["Build", "months → hours", 2.35, 1.95, C.light, C.navy], ["Measure", "weeks → days", 4.3, 4.1, C.light, C.navy], ["Learn", "still human — the new bottleneck", 0.4, 4.1, C.navy, C.white]];
    const D = 2.05;
    nodes.forEach(([n, t, x, y, f, c]) => {
      s.addShape("ellipse", { x, y, w: D, h: D, fill: { color: f }, line: { color: n === "Learn" ? C.blue2 : C.line, width: 2 } });
      T(s, n, { x, y: y + 0.5, w: D, h: 0.45, fontSize: 18, bold: true, color: c, align: "center" });
      T(s, t, { x: x + 0.2, y: y + 0.98, w: D - 0.4, h: 0.6, fontSize: 11, color: n === "Learn" ? C.blue2 : C.blue, align: "center", bold: true });
    });
    const arr = (x1, y1, x2, y2) => s.addShape("line", { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      flipH: x2 < x1, flipV: y2 < y1, line: { color: C.slate, width: 2, endArrowType: "triangle" } });
    arr(4.3, 3.55, 4.85, 4.15);   // build -> measure
    arr(4.25, 5.6, 2.55, 5.6);    // measure -> learn
    arr(1.75, 4.1, 2.35, 3.45);   // learn -> build
    // right side
    box(s, 7.25, 1.95, 5.48, 2.55, { fill: C.navy });
    T(s, "35%", { x: 7.5, y: 2.1, w: 3, h: 1.1, fontSize: 60, bold: true, color: C.white });
    T(s, "of failed startups name “no market need” as a reason — they built something nobody wanted.", { x: 7.5, y: 3.25, w: 5.0, h: 0.9, fontSize: 14, color: C.line });
    T(s, "Source: CB Insights, startup post-mortems (2021).", { x: 7.5, y: 4.12, w: 5, h: 0.3, fontSize: 9, italic: true, color: C.slate });
    box(s, 7.25, 4.7, 5.48, 1.7, { fill: C.light });
    T(s, "The new founder question", { x: 7.5, y: 4.85, w: 5, h: 0.4, fontSize: 14, bold: true });
    T(s, [{ text: "Not “can we build it?” — ", options: { color: C.grey } }, { text: "“what is the cheapest test that could prove us wrong this week?”", options: { bold: true, color: C.blue } }],
      { x: 7.5, y: 5.25, w: 5.0, h: 1.0, fontSize: 14 });
  }

  // Live demo
  {
    const s = content(pres, "Live: from your idea to a tested product", "The room picks the idea — AI builds it and puts it in front of you",
      "Prepared base: landing page, two variants, QR code, click tracking, live dashboard. Take the top answer from Menti question 2 (“If building cost nothing…”) as the idea. A student names a change — new audience, new headline, a third variant. Claude Code makes it in the running page; open the result in the browser, not the code. Leave the page live: the clicks feed the “Said vs. did” slide later.");
    const st = [["MdHowToVote", "You pick the idea", "Top answer from Menti question 2"], ["MdWeb", "AI builds it", "Landing page and two value propositions"], ["MdQrCode2", "You visit it", "QR code — every phone in the room"], ["MdQueryStats", "We measure", "Clicks on “Get early access”, live"]];
    for (let i = 0; i < 4; i++) {
      const x = 0.6 + i * 3.09, [ic, h1, t] = st[i];
      box(s, x, 1.95, 2.86, 2.0, { fill: i === 3 ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.22, 2.15, 0.42, i === 3 ? C.blue2 : C.blue);
      s.addImage({ data: await icon("md", ic, i === 3 ? C.white : C.blue), x: x + 2.25, y: 2.15, w: 0.4, h: 0.4 });
      T(s, h1, { x: x + 0.22, y: 2.75, w: 2.45, h: 0.4, fontSize: 14, bold: true, color: i === 3 ? C.white : C.navy });
      T(s, t, { x: x + 0.22, y: 3.15, w: 2.45, h: 0.7, fontSize: 12, color: i === 3 ? C.line : C.grey });
    }
    pill(s, "LIVE DEMO  ·  CLAUDE CODE", 0.6, 4.3, 2.8, { fill: C.blue });
    T(s, [{ text: "You ask, the product changes. ", options: { bold: true } }, { text: "Name a change — a new audience, a new headline, a third variant. Claude Code builds it into the running page in minutes. We open the result, not the code." }],
      { x: 0.6, y: 4.75, w: 5.9, h: 1.4, fontSize: 13, color: C.navy });
    box(s, 6.85, 4.3, 5.88, 1.85, { fill: C.navy });
    T(s, "THE PROMPT ON STAGE", { x: 7.1, y: 4.42, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
    T(s, "Build a landing page for [idea]. Create variant A and B with two different value propositions, each with a measurable “Get early access” button. Show clicks per variant in a live dashboard.",
      { x: 7.1, y: 4.75, w: 5.4, h: 1.3, fontSize: 12, color: C.white, fontFace: "Courier New" });
  }

  await L.enginesSlide(pres, { title: "How we validate at AI speed: five engines", sub: "Our system for the “learn” step — three kinds of evidence in one ledger",
    colHead: "FOR YOUR STARTUP", notes: "This is what systematic, AI-native validation looks like — the professional version of what the groups will do by hand in the challenge.",
    rows: ["Who are the competitors and what do they charge?", "How many people really have the problem?", "Which message gets attention — before you spend?", "How does the market react to a different price?", "Do real people sign up, book or pay?"],
    foot: "interviews explain — only a real test shows whether people click, sign up or pay." });

  await L.challengeSlide(pres, { title: "The 10-Minute Startup Speed-Run", sub: "Groups of 3–4, AI on your phone — from a problem you know to a test you could run this week",
    notes: "Run a visible countdown. Rules: the problem must be one someone in the group has personally. In step 2 every number gets a tag (researched / estimated). In step 3 each group runs the skeptical-investor prompt from the QR. Two or three groups pitch; the rest submit via Menti. Best test design wins a coffee.",
    stages: [["2 min", "Problem"], ["3 min", "Size it"], ["3 min", "Test it"], ["2 min", "Pitch"]],
    steps: ["A problem someone in your group really has. Who else has it?", "Let AI estimate the market and a price. Tag every number: researched or estimated.", "Your riskiest assumption — and a 48-hour test with a kill criterion.", "30 seconds: problem, customer, assumption, test, kill criterion."],
    handIn: ["Problem", "Customer", "Riskiest assumption", "48-hour test", "Kill criterion"], qrNote: "skeptical-investor prompt included",
    foot: "The best pitch is not the best idea — it is the cheapest test that could prove you wrong." });

  // Said vs did
  {
    const s = content(pres, "Said vs. did: your live result", "What the room said in Menti vs. what the room clicked on the landing page",
      "Fill in live: left bar = share who said in Menti they would sign up / use it; right bar = share of visitors who clicked “Get early access”. The gap is almost always large. Weight: statements 0.7, behaviour 1.0 — and even a click is not a payment. Then repeat Menti question 5 (start a company?) and compare with the first vote.");
    pill(s, "EXAMPLE VALUES — REPLACE WITH LIVE RESULT", 0.6, 1.95, 4.6, { fill: C.line, color: C.navy });
    s.addChart(pres.charts.BAR, [{ name: "Share of the room", labels: ["Said they would use it", "Clicked “Get early access”"], values: [0.68, 0.21] }],
      { x: 0.5, y: 2.4, w: 7.2, h: 3.7, barDir: "col", chartColors: [C.slate, C.blue], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0%",
        dataLabelColor: C.navy, dataLabelFontSize: 14, dataLabelFontFace: "+mn-lt", catAxisLabelColor: C.navy, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
        valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 1, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 70 });
    box(s, 8.1, 1.95, 4.63, 2.55, { fill: C.navy });
    T(s, "The say–do gap", { x: 8.35, y: 2.1, w: 4.1, h: 0.45, fontSize: 18, bold: true, color: C.white });
    T(s, "People are kind in surveys and honest with their clicks — and even more honest with their money. This gap is where most startups die.", { x: 8.35, y: 2.6, w: 4.1, h: 1.7, fontSize: 13, color: C.line });
    box(s, 8.1, 4.7, 4.63, 1.4, { fill: C.light });
    T(s, "Weight of evidence", { x: 8.35, y: 4.8, w: 4, h: 0.35, fontSize: 12, bold: true });
    [["What people say (Menti)", "0.7"], ["What people do (click)", "1.0"]].forEach(([a, b], i) => {
      T(s, a, { x: 8.35, y: 5.2 + i * 0.38, w: 3.2, h: 0.34, fontSize: 12, color: C.grey });
      T(s, b, { x: 11.6, y: 5.2 + i * 0.38, w: 0.9, h: 0.34, fontSize: 13, bold: true, align: "right" });
    });
    takeaway(s, [{ text: "Repeat Menti question 5: ", options: { bold: true, color: C.blue2 } }, { text: "start your own company, join a startup or a corporate — did today change your answer?" }], 6.25, 0.5);
  }

  await L.changeSlide(pres, { title: "What this means for you", sub: "Four shifts for anyone who wants to build something in the next five years",
    notes: "Close the rethink with the students' own future. Ask: which of these shifts scares you, which excites you? Then the closing slide.",
    cards: [
      ["MdRocketLaunch", "You can start before you graduate", "A product, a landing page, first customers — the barrier is no longer money or a dev team."],
      ["MdSmartToy", "Your first hires may be agents", "Research, design, code, outreach. Your job: direct them — and check their work."],
      ["MdPsychology", "Taste and judgement become the edge", "Anyone can build. Choosing the right problem and reading evidence honestly is what remains scarce."],
      ["MdSpeed", "Learn faster than the market", "The winner is not who builds fastest, but who learns fastest which idea really works."],
    ], foot: "Next step: take one assumption from your own project and design a 48-hour test with a kill criterion." });
  L.closingSlide(pres, { notes: "One slide, no pitch. Q&A. Photograph the Menti results and the say–do chart for the follow-up post.",
    work: "Thesis topics, internships and pilot participation for students." });
  return pres;
}
module.exports = { jcu };
