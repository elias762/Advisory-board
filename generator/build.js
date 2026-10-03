const L = require("./lib");
const { C, T, box, pill, circleNum, content, takeaway, source, icon } = L;
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

// ======================= JCU =======================
async function jcu() {
  const pres = L.newPres("From Idea to Market: Building an AI-Native Business");
  await L.mentiSlide(pres, { questions: [
    { type: "POLL", q: "How often do you use AI tools like ChatGPT, Claude or Gemini?", opts: "Never · weekly · daily · all the time" },
    { type: "WORD CLOUD", q: "One word: what makes a company “AI-native”?" },
    { type: "POLL", q: "How long would it take you today to go from an idea to a working prototype?", opts: "1 day · 1 week · 1 month · 6+ months" },
    { type: "RANKING", q: "Which step of launching a startup will AI change the most?", opts: "Research · product · marketing · validation" },
    { type: "POLL · REPEAT", q: "Would you invest €100,000 in a startup idea an AI helped you build?", opts: "Yes · no · need evidence" },
  ] });
  await L.demoSlide(pres, { lens: "applied to a new business idea, from market data to a go / no-go." });
  L.titleSlide(pres, { title: "From Idea to Market: Building an AI-Native Business",
    subtitle: "How AI is changing the way companies understand customers, develop products and launch.",
    notes: "Title after the opening demo. Promise: by the end of this session the room has rethought how a company goes from idea to market — and tested one assumption with real behaviour." });
  await L.impulseBlock(pres, {
    chatgpt: { note: "For founders: your customers adopt new tools this fast — and so do your competitors.", so: "For founders: your market — and your competitors — can now move this fast too." },
    iq: { note: "Ask: if the AI in your pocket outscores most people on reasoning, what is still your job as a founder?" },
    jobs: { note: "For students: AI raises the bar on clean tasks; your edge is the messy work — ambiguity, customers, judgement.", so: "AI takes the clean tasks. Building a company is messy work — that is where you add value." },
    skills: { note: "Link to their studies: analytical thinking + AI literacy + curiosity is the founder's skill set.", so: "The founder profile of 2030: AI-literate, analytical, creative — and curious enough to test." },
    aug: { topicTag: "FOUNDERS", overlap: "A founder who lets AI research, build and test — and keeps judgement on what is worth building." },
  });
  L.rethinkSlide(pres, { title: "Rethinking the path from idea to market", sub: "How launching a business worked, what AI enables today — and what AI-native means",
    notes: "Walk the rows left to right. The middle column is what most companies do today: the same process, faster. The right column is the rethink: the company is built as a testing system. Ask: which column describes the last student project you did?",
    rows: [
      ["Market research", "Weeks of desk research or an agency", "Research agents read the market in minutes", "Continuous market sensing — every number tagged with its source"],
      ["Product", "Months and a dev team for a first prototype", "A working prototype in an afternoon", "Many prototypes in parallel — each one a test"],
      ["Marketing", "One campaign, launched and hoped for", "Ten AI-generated variants instead of one", "Autonomous experiments, measured live"],
      ["Decision", "Gut feeling and a pitch deck", "An AI-written business plan", "Evidence-weighted: go, iterate or stop"],
    ], foot: "The trap in the middle column: AI makes it easy to produce a convincing plan — not a validated one." });
  await L.aiNativeSlide(pres, { sub: "AI-native is not using more AI tools — it is building the company around them",
    notes: "Definition used for the rest of the session. Example contrast: an AI-enabled startup writes its pitch deck with ChatGPT; an AI-native startup has agents that research, test and report every week, and the founders decide on evidence.",
    enabled: "ChatGPT writes the pitch deck, the copy and the business plan. The steps and the decisions stay the same — just faster.",
    native: "Agents research, build and test continuously; founders set hypotheses and decide on evidence. Small teams do what took 20 people.",
    p: ["Founders choose what to test — agents research, build and run it", "“Students will pay €60 a year” is an assumption with a kill criterion", "Each experiment sharpens the next — learning compounds", "A click, sign-up or payment outweighs any AI-generated forecast"],
    line: "an AI-native company does not just generate answers faster — it tests its assumptions faster than anyone else." });
  // Quantify
  {
    const s = content(pres, "Can AI quantify a business opportunity?", "Yes — and it will happily invent the numbers. Label every one.",
      "Show live how AI researches and quantifies in 60 seconds — then how easily it fabricates a figure. Rule for the rest of the day: a number without a tag does not go on a pitch. Menti scale: how confident are you in the 20,000?");
    pill(s, "ILLUSTRATIVE — NOT VERIFIED MARKET DATA", 0.6, 1.95, 4.2, { fill: C.line, color: C.navy });
    const nums = [["20,000", "potential customers"], ["5%", "assumed conversion"], ["€60", "annual price"], ["€60,000", "annual revenue"]];
    const ops = ["×", "×", "="];
    nums.forEach(([n, l], i) => {
      const x = 0.6 + i * 2.0;
      T(s, n, { x, y: 2.45, w: 1.75, h: 0.6, fontSize: i === 3 ? 22 : 24, bold: true, color: i === 3 ? C.blue : C.navy });
      T(s, l, { x, y: 3.05, w: 1.75, h: 0.3, fontSize: 11, color: C.grey });
      if (i < 3) T(s, ops[i], { x: x + 1.62, y: 2.5, w: 0.35, h: 0.5, fontSize: 20, color: C.muted, align: "center" });
    });
    s.addChart(pres.charts.BAR, [{ name: "Annual revenue (€)", labels: ["Pessimistic", "Realistic", "Optimistic"], values: [18000, 60000, 144000] }],
      { x: 0.5, y: 3.5, w: 7.6, h: 2.6, barDir: "col", chartColors: [C.blue], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "€#,##0",
        dataLabelColor: C.navy, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt", catAxisLabelColor: C.grey, catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt",
        valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 80 });
    T(s, "Pessimistic 10,000 × 3% × €60  ·  Realistic 20,000 × 5% × €60  ·  Optimistic 30,000 × 8% × €60", { x: 0.6, y: 6.15, w: 7.6, h: 0.3, fontSize: 10, color: C.muted });
    box(s, 8.6, 1.95, 4.13, 4.5, { fill: C.light });
    T(s, "Three tags for every number", { x: 8.85, y: 2.1, w: 3.7, h: 0.4, fontSize: 14, bold: true });
    [["RESEARCHED", C.blue, "From a named source, with a date"], ["ESTIMATED", C.slate, "Your assumption — say so, and say why"], ["MEASURED", C.navy, "Observed behaviour: clicks, replies, payments"]]
      .forEach(([t, c, d], i) => { const y = 2.7 + i * 1.2; pill(s, t, 8.85, y, 1.75, { fill: c }); T(s, d, { x: 8.85, y: y + 0.4, w: 3.7, h: 0.65, fontSize: 12, color: C.grey }); });
  }
  // Live prototype
  {
    const s = content(pres, "Idea to tested product in an afternoon", "Live: what AI can do beyond a chat window",
      "Prepared base: landing page, two variants, QR code, click tracking, live dashboard. A student names a change — new audience, new headline, a third variant. Claude Code makes it in the running page; open the result in the browser, not the code. Say what took how long.");
    const st = [["MdEditNote", "Describe the idea", "Product and target group in plain words"], ["MdWeb", "Generate the product", "Landing page and messaging"], ["MdCallSplit", "Build a test", "Two propositions, two calls-to-action"], ["MdQueryStats", "Measure interest", "Clicks and sign-ups, live"]];
    for (let i = 0; i < 4; i++) {
      const x = 0.6 + i * 3.09, [ic, h1, t] = st[i];
      box(s, x, 1.95, 2.86, 2.0, { fill: i === 3 ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.22, 2.15, 0.42, i === 3 ? C.blue2 : C.blue);
      s.addImage({ data: await icon("md", ic, i === 3 ? C.white : C.blue), x: x + 2.25, y: 2.15, w: 0.4, h: 0.4 });
      T(s, h1, { x: x + 0.22, y: 2.75, w: 2.45, h: 0.4, fontSize: 14, bold: true, color: i === 3 ? C.white : C.navy });
      T(s, t, { x: x + 0.22, y: 3.15, w: 2.45, h: 0.7, fontSize: 12, color: i === 3 ? C.line : C.grey });
    }
    pill(s, "LIVE DEMO  ·  CLAUDE CODE", 0.6, 4.3, 2.8, { fill: C.blue });
    T(s, [{ text: "You ask, the prototype changes. ", options: { bold: true } }, { text: "A student names a change — a new audience, a new headline, a third variant. Claude Code builds it into the running landing page; we open the result, not the code." }],
      { x: 0.6, y: 4.75, w: 5.9, h: 1.4, fontSize: 13, color: C.navy });
    box(s, 6.85, 4.3, 5.88, 1.85, { fill: C.navy });
    T(s, "THE PROMPT ON STAGE", { x: 7.1, y: 4.42, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
    T(s, "Update our landing page for [idea]. Create variant A (save time) and B (better applications), each with a measurable “Get early access” button. Show conversion per variant in the dashboard.",
      { x: 7.1, y: 4.75, w: 5.4, h: 1.3, fontSize: 12, color: C.white, fontFace: "Courier New" });
  }
  await L.enginesSlide(pres, { title: "A real venture validator: five AI engines", sub: "Our system, applied to the business you just built — three kinds of evidence in one ledger",
    colHead: "FOR YOUR STARTUP TODAY", notes: "Map each engine to what the groups will do by hand with ChatGPT. This is what systematic, AI-native validation looks like.",
    rows: ["Who are the competitors, what do they charge students?", "How many students are really in the target group?", "Which of your two messages gets attention first?", "How does the market react at €60 vs €30 a year?", "Do real customers sign up when asked?"],
    foot: "interviews explain — only a real test shows whether buyers reply, book or pay." });
  // Verdict (simplified)
  {
    const s = content(pres, "How evidence becomes a verdict", "Cheap evidence first, real evidence only where uncertainty remains — a rule decides, not the AI",
      "For Bachelors: keep it to the three stages and one rule — nothing is “validated” without real behaviour. Mention a real anonymised campaign figure next to the classroom click rate.");
    const st = [["Secondary", "E4 + E5", "Fast and cheap. Sets priors on market size, prices, competitors.", "0.2 – 0.9"], ["Simulated", "E2 + E3", "Narrows where real evidence is worth the spend. Never validates alone.", "0.4"], ["Real", "E1", "Slow (14–21 days). The only kind that reaches “validated”.", "0.7 – 1.0"]];
    st.forEach(([h1, e, t, wgt], i) => {
      const x = 0.6 + i * 4.1, hot = i === 2;
      box(s, x, 1.95, 3.85, 2.55, { fill: hot ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.22, 2.15, 0.45, hot ? C.blue2 : C.blue);
      T(s, h1, { x: x + 0.8, y: 2.15, w: 2.9, h: 0.45, fontSize: 16, bold: true, color: hot ? C.white : C.navy, valign: "middle" });
      T(s, e, { x: x + 0.8, y: 2.6, w: 2.9, h: 0.3, fontSize: 11, bold: true, color: hot ? C.blue2 : C.blue });
      T(s, t, { x: x + 0.22, y: 3.05, w: 3.4, h: 0.8, fontSize: 12, color: hot ? C.line : C.grey });
      T(s, [{ text: "weight  ", options: { fontSize: 10, color: hot ? C.line : C.muted } }, { text: wgt, options: { fontSize: 18, bold: true, color: hot ? C.white : C.navy } }], { x: x + 0.22, y: 3.9, w: 3.4, h: 0.45 });
    });
    const v = [["Stop", C.line, C.navy, "score below –0.4"], ["Iterate", C.slate, C.white, "between –0.4 and +0.4"], ["Go", C.blue, C.white, "above +0.4, with real behaviour"]];
    T(s, "THE VERDICT  ·  weighted evidence per hypothesis, from –1 to +1", { x: 0.6, y: 4.8, w: 8, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
    v.forEach(([h1, f, c, t], i) => { const x = 0.6 + i * 4.1; pill(s, h1, x, 5.15, 1.5, { fill: f, color: c, h: 0.42, size: 13 }); T(s, t, { x: x + 1.65, y: 5.15, w: 2.3, h: 0.42, fontSize: 12, color: C.grey, valign: "middle" }); });
    takeaway(s, [{ text: "One rule: ", options: { bold: true, color: C.blue2 } }, { text: "below 30 real observations, confidence never exceeds “medium” — however convincing the AI sounds." }], 5.95, 0.55);
  }
  await L.challengeSlide(pres, { title: "The 10-Minute AI Startup Challenge", sub: "Groups of 3–4, AI on your phone — one idea, ten minutes, one evidence-based recommendation",
    notes: "Run the countdown. Minute 3–5: every group runs the skeptical-investor prompt. Validation: group propositions become the two landing-page variants; the room clicks. Remaining groups submit the four fields via Menti.",
    steps: ["Market size and revenue model from the data sheet. Tag every number.", "One value proposition, one message — and the assumption behind it.", "Scan the QR, see one variant, click or don't. Votes ≠ purchase intent.", "45 seconds: market, revenue, evidence, open assumption, next test."],
    handIn: ["Market", "Revenue", "Evidence", "Next test"], qrNote: "skeptical-investor prompt included",
    foot: "Repeat of Menti question 5 at the end: would you now invest €100,000 — and what changed your mind, the pitch or the clicks?" });
  await L.changeSlide(pres, { title: "How AI-native will change founding", sub: "What this means for you — over the next five years",
    notes: "Close the rethink. Four shifts, then the closing slide. Ask: which of these shifts scares you, which excites you? Then repeat Menti question 5 and compare with the first vote.",
    cards: [
      ["MdBolt", "Building becomes cheap", "A prototype, a landing page, a campaign — hours instead of months. What used to be the barrier is now a commodity."],
      ["MdGroups", "Tiny teams, big companies", "Founders with agents launch what used to need 20 people. Team size stops being a signal of ambition."],
      ["MdPsychology", "Judgement becomes scarce", "Choosing which problem is worth solving — and which assumption to test first — is the human edge."],
      ["MdSpeed", "Speed of learning wins", "The winner is not who builds fastest, but who learns fastest which idea really works."],
    ], foot: "Next step for you: take one assumption from your own project and design a one-week test with a kill criterion." });
  L.closingSlide(pres, { notes: "One slide, no pitch. Q&A. Photograph the Menti results for the follow-up post.",
    work: "Thesis topics, internships and pilot participation for students." });
  return pres;
}

// ======================= SALES =======================
async function sales() {
  const pres = L.newPres("The AI-Native Sales Organization");
  await L.mentiSlide(pres, { questions: [
    { type: "WORD CLOUD", q: "What is the hardest part of selling today?" },
    { type: "POLL · REPEAT", q: "How many cold emails does a B2B seller need for one qualified meeting?", opts: "20 · 50 · 100 · 200+" },
    { type: "POLL", q: "Which sales task should AI take over first?", opts: "Research · first message · follow-ups · forecasting" },
    { type: "OPEN TEXT", q: "Which part of selling should AI never take over?" },
    { type: "POLL", q: "By 2030, will companies employ more or fewer salespeople?", opts: "More · same · fewer · different profile" },
  ] });
  await L.demoSlide(pres, { lens: "applied to sales: which companies have the pain, who to contact, with which message." });
  L.titleSlide(pres, { title: "The AI-Native Sales Organization",
    subtitle: "How to identify customers, quantify their problems, build a sales engine and validate real demand with AI.",
    notes: "Running case: an AI sales assistant for small businesses. Live case: one real, anonymised cold-email campaign." });
  await L.impulseBlock(pres, {
    chatgpt: { note: "For sales: buyers adopt AI this fast too — your next buyer researches you with an AI before you ever call.", so: "For sales: your buyers adopted AI this fast too — they research you before you call them." },
    iq: { note: "Ask: if AI can reason this well, which part of a sales conversation still needs a human?" },
    jobs: { note: "For sales: research and first drafts are clean tasks; negotiation and trust are messy. That is where sellers stay.", so: "Research and first drafts are clean tasks. Trust, negotiation and judgement are messy — the seller's territory." },
    skills: { note: "Sales profile shifts to analytical thinking + empathy + AI literacy.", so: "The seller of 2030: AI-literate and analytical — with empathy and active listening as the differentiator." },
    aug: { topicTag: "SALES", overlap: "A seller who lets AI research, write and classify — and spends the time on diagnosis, trust and the deal." },
  });
  L.rethinkSlide(pres, { title: "Rethinking sales", sub: "How selling worked, what AI enables today — and what AI-native sales means",
    notes: "Walk the rows. The middle column is most sales teams in 2026: same funnel, AI-generated emails at scale — which mainly produces more spam. The right column is the rethink: diagnosis first, every campaign an experiment.",
    rows: [
      ["Prospecting", "Bought lead lists and cold calling", "AI research on every account", "Agents find who has the pain — before anyone is contacted"],
      ["Messaging", "One pitch for everyone", "Personalised emails at scale", "Every message tests a declared hypothesis"],
      ["Pipeline", "CRM as a contact list, manual reports", "Auto-logging and reply classification", "The pipeline as a learning system"],
      ["The seller", "Persuader, driven by volume", "Seller with an AI assistant", "Half analyst, half relationship builder"],
    ], foot: "The trap in the middle column: AI makes it cheap to send more — not to sell better." });
  await L.aiNativeSlide(pres, { sub: "AI-native sales is not sending more emails — it is diagnosing before persuading",
    notes: "Definition for the session. AI-enabled: same funnel, more volume. AI-native: the funnel is redesigned — research and simulation decide whom to contact and with what; the seller approves the hypothesis and owns the conversation.",
    enabled: "AI writes the emails and the call notes. Same lead list, same pitch, same funnel — just more volume.",
    native: "Agents research the market, simulate the buyer and run campaigns as experiments. The seller decides the hypothesis and owns the meeting.",
    p: ["Agents research, write and classify — the seller approves the hypothesis", "“Trades owners will reply to a time-saving angle” — tested, not assumed", "Every reply updates the segment, the message and the price", "A booked meeting outweighs any lead score"],
    line: "sell less, ask more — AI does the diagnosis, the human builds the trust." });
  // Context engine
  {
    const s = content(pres, "From market data to pain points", "E4 Context Engine: AI extracts what sources state — it must not infer",
      "Demo or screenshot of the Context Engine. Groups of 3–4 (4 min): three pain hypotheses for small-business owners — and for each, the evidence you would need before writing a single email. Inferred lines are the ones that cost sales teams the most.");
    T(s, "CONTEXT ENGINE OUTPUT  ·  AI SALES ASSISTANT FOR SMALL BUSINESSES", { x: 0.6, y: 1.95, w: 8, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
    const r = [["Owners lose 6–8 h a week on follow-ups and quotes", "forum sample, n ≈ 40", "ESTIMATED", C.slate],
      ["Comparable tools priced €49–€149 per month", "6 vendor websites, Sept 2026", "RESEARCHED", C.blue],
      ["Top complaint in reviews: “too complex to set up”", "review platforms, 120 reviews", "RESEARCHED", C.blue],
      ["Owners would pay for a tool that writes follow-ups", "no source", "INFERRED — NOT EVIDENCE", C.line]];
    r.forEach(([t, src, tag, c], i) => {
      const y = 2.35 + i * 0.92, bad = i === 3;
      box(s, 0.6, y, 7.6, 0.8, { fill: bad ? C.white : C.light, line: bad ? C.line : undefined, dash: bad ? "dash" : undefined });
      T(s, t, { x: 0.8, y: y + 0.08, w: 4.9, h: 0.4, fontSize: 13, bold: true, color: bad ? C.muted : C.navy });
      T(s, src, { x: 0.8, y: y + 0.48, w: 4.9, h: 0.26, fontSize: 10, color: C.muted });
      pill(s, tag, 5.75, y + 0.25, 2.3, { fill: c, color: bad ? C.navy : C.white, size: 8 });
    });
    box(s, 8.6, 1.95, 4.13, 3.95, { fill: C.navy });
    T(s, "Stated vs inferred", { x: 8.85, y: 2.15, w: 3.7, h: 0.4, fontSize: 16, bold: true, color: C.white });
    T(s, [{ text: "Stated: ", options: { bold: true, color: C.blue2 } }, { text: "a source says it, with a date and a sample. Grade it and keep it.", options: { breakLine: true } },
      { text: " ", options: { breakLine: true } },
      { text: "Inferred: ", options: { bold: true, color: C.blue2 } }, { text: "sounds plausible, nobody said it. It becomes a hypothesis — never a fact on a slide." }],
      { x: 8.85, y: 2.7, w: 3.7, h: 2.2, fontSize: 13, color: C.white });
    T(s, "The difference between research and fiction.", { x: 8.85, y: 5.15, w: 3.7, h: 0.6, fontSize: 12, italic: true, color: C.line });
    takeaway(s, [{ text: "Exercise · 4 min · ", options: { bold: true, color: C.blue2 } }, { text: "three pain hypotheses for small-business owners — and the evidence you need before writing a single email." }], 6.15, 0.55);
  }
  // E1 engine loop
  {
    const s = content(pres, "The AI-native sales engine", "E1 Cold Email Engine: an autonomous experiment loop — every campaign tests a declared hypothesis",
      "This is the Cold Email Engine explained as a sales process. Live demo with Claude Code: students give the ICP and two pain angles; the prospecting tool generates both campaign variants and a qualification checklist. Rehearse the live change twice.");
    const st = [["MdTravelExplore", "Find", "List from the ICP: firmographics and signals"], ["MdEdit", "Personalise", "One message per company, public facts only"], ["MdSend", "Send & track", "Email only, declared hypothesis, 14–21 days"], ["MdCategory", "Classify", "Every reply on a fixed taxonomy"], ["MdInsights", "Learn", "Reply and meeting rate per segment × variant"]];
    for (let i = 0; i < 5; i++) {
      const x = 0.6 + i * 2.45, [ic, h1, t] = st[i], hot = i === 4;
      box(s, x, 1.95, 2.28, 2.15, { fill: hot ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.2, 2.13, 0.4, hot ? C.blue2 : C.blue);
      s.addImage({ data: await icon("md", ic, hot ? C.white : C.blue), x: x + 1.7, y: 2.13, w: 0.38, h: 0.38 });
      T(s, h1, { x: x + 0.2, y: 2.7, w: 1.95, h: 0.4, fontSize: 14, bold: true, color: hot ? C.white : C.navy });
      T(s, t, { x: x + 0.2, y: 3.1, w: 1.95, h: 0.9, fontSize: 11.5, color: hot ? C.line : C.grey });
    }
    T(s, "THE HYPOTHESIS FORMAT", { x: 0.6, y: 4.35, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
    box(s, 0.6, 4.7, 6.1, 1.1, { fill: C.ice });
    T(s, "“If we message [segment] about [pain] with [angle], at least X% will reply positively within 14 days.”", { x: 0.8, y: 4.7, w: 5.7, h: 1.1, fontSize: 13, italic: true, color: C.navy, valign: "middle" });
    T(s, "REPLY TAXONOMY", { x: 7.0, y: 4.35, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
    [["Interested", C.blue], ["Not now", C.slate], ["Wrong person", C.slate], ["Unsubscribe", C.line]].forEach(([t, c], i) => pill(s, t, 7.0 + (i % 2) * 2.9, 4.7 + Math.floor(i / 2) * 0.42, 2.75, { fill: c, color: c === C.line ? C.navy : C.white }));
    pill(s, "Objection: price / timing / trust / no need", 7.0, 5.54, 5.65, { fill: C.navy });
    takeaway(s, [{ text: "Live demo · Claude Code: ", options: { bold: true, color: C.blue2 } }, { text: "you give the ICP and two pain angles — the tool builds both campaign variants live." }], 6.15, 0.55);
  }
  await L.enginesSlide(pres, { title: "Five AI engines behind AI-native sales", sub: "E1 is the one you see — four more decide where it is worth sending at all",
    colHead: "WHAT IT MEANS FOR SALES", notes: "Sales students see only E1 in most tools. The point: E4/E5 decide the list, E2/E3 decide the message and price, E1 proves it. All five write into one ledger.",
    rows: ["Which segment has the pain, which objections are public?", "How many in-target companies exist — the funnel ceiling", "Which of two messages wins attention before the first send", "Price elasticity and dealbreakers — your negotiation prep", "Reply, positive and meeting rate per segment × variant"],
    foot: "simulation narrows the bet — only a real reply, meeting or contract proves it." });
  await L.challengeSlide(pres, { title: "The 10-Minute Sales Challenge", sub: "Groups of 3–4, AI on your phone — build the sales case: who buys, why, and how you would know",
    notes: "Say explicitly: the vote is declarative evidence (weight 0.7), not behaviour. Two or three pitches; the rest submit via Menti.",
    steps: ["ICP size, customer ROI and the funnel to €100k ARR — every number tagged.", "One outreach message and the single assumption it rests on.", "Two messages per group go to Menti. The class votes and names the first objection.", "45 seconds: ICP, ROI, funnel maths, evidence from the vote, next experiment."],
    handIn: ["ICP", "Pain (quantified)", "Message", "Qualification", "Success metric"], qrNote: "Segments: trades · agencies · e-commerce",
    foot: "Remember: a vote is what people say. A reply is what people do." });
  // Real campaign
  {
    const s = content(pres, "What a real campaign looks like", "What the room preferred vs. what real buyers did",
      "Replace the illustrative funnel with the real anonymised campaign (sample sizes!). Resolve Menti question 2 with the real emails-per-meeting figure. The pipeline is a learning system: it feeds product, pricing and strategy.");
    pill(s, "ANONYMISED CAMPAIGN  ·  REPLACE WITH REAL FIGURES", 0.6, 1.95, 4.8, { fill: C.line, color: C.navy });
    s.addChart(pres.charts.BAR, [{ name: "Contacts", labels: ["Sent", "Delivered", "Replied", "Positive", "Meeting"], values: [5000, 4800, 200, 60, 30] }],
      { x: 0.5, y: 2.35, w: 7.4, h: 3.25, barDir: "bar", chartColors: [C.blue], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0",
        dataLabelColor: C.navy, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt", catAxisLabelColor: C.navy, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
        catAxisOrientation: "maxMin", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60 });
    T(s, "Reply 4.0% · positive 1.2% · meeting 0.6% · cycle 14–21 days · top objections: timing, “we have a tool”, price", { x: 0.6, y: 5.65, w: 7.4, h: 0.45, fontSize: 11, color: C.grey });
    box(s, 8.35, 1.95, 4.38, 2.35, { fill: C.navy });
    T(s, "Answer to Menti question 2", { x: 8.6, y: 2.1, w: 3.9, h: 0.35, fontSize: 12, bold: true, color: C.blue2 });
    T(s, "≈ 170", { x: 8.6, y: 2.5, w: 3.9, h: 0.9, fontSize: 48, bold: true, color: C.white });
    T(s, "emails per qualified meeting", { x: 8.6, y: 3.45, w: 3.9, h: 0.6, fontSize: 13, color: C.line });
    box(s, 8.35, 4.45, 4.38, 1.65, { fill: C.light });
    T(s, "Weight by kind of evidence", { x: 8.6, y: 4.55, w: 3.9, h: 0.35, fontSize: 12, bold: true });
    [["Real behaviour (replies)", "1.0"], ["Real statement (the vote)", "0.7"], ["Simulated", "0.4"]].forEach(([a, b], i) => {
      T(s, a, { x: 8.6, y: 4.95 + i * 0.36, w: 3.0, h: 0.32, fontSize: 11.5, color: C.grey });
      T(s, b, { x: 11.6, y: 4.95 + i * 0.36, w: 0.9, h: 0.32, fontSize: 12, bold: true, align: "right" });
    });
    takeaway(s, [{ text: "The pipeline is a learning system, not a list: ", options: { bold: true, color: C.blue2 } }, { text: "it feeds product, pricing and strategy." }], 6.25, 0.5);
  }
  await L.changeSlide(pres, { title: "How AI-native will change sales", sub: "The seller of 2030: half analyst, half relationship builder",
    notes: "Sales force organisation and motivation: pay for documented learning per contact, not only for meetings. Recruit for curiosity and structure. Optional exercise (4 min): objection role play in pairs with real objections from the campaign dashboard. Then Menti question 2 resolved and closing.",
    cards: [
      ["MdSmartToy", "Agents run the top of the funnel", "List, research, first message, follow-ups and reply classification — done by AI, approved by humans."],
      ["MdSwapHoriz", "Buyers bring their own AI", "Procurement agents compare offers before a human talks. Your data and claims must survive machine scrutiny."],
      ["MdHandshake", "Humans own trust and the deal", "Diagnosis, the meeting, pricing judgement, negotiation — and saying no to bad-fit leads."],
      ["MdMilitaryTech", "Paid for learning, not only volume", "Teams are measured on documented insight per contact — every objection is data for product and pricing."],
    ], foot: "Three statements to take home: diagnose before you persuade · every campaign is an experiment · behaviour outweighs opinion." });
  L.closingSlide(pres, { notes: "Q&A. Hypothesis format and reply taxonomy as a handout for project work.",
    work: "Hypothesis format and reply taxonomy as a handout for your project work. Thesis topics and pilots." });
  return pres;
}

// ======================= CRM =======================
async function crm() {
  const pres = L.newPres("The AI-Powered Customer Ecosystem");
  await L.mentiSlide(pres, { questions: [
    { type: "WORD CLOUD", q: "One word: what is a CRM to you today?" },
    { type: "POLL", q: "Who holds the most valuable customer information?", opts: "Manufacturer · distributor · retailer · consumer" },
    { type: "POLL · REPEAT", q: "As CEO of a consumer brand, what would you invest in first?", opts: "Marketing · data integration · AI forecast" },
    { type: "SCALE 0–100%", q: "How much would you let an AI forecast decide your production plan?" },
    { type: "POLL", q: "By 2030, who manages customer relationships?", opts: "People · AI agents · both" },
  ] });
  await L.demoSlide(pres, { lens: "applied to a value chain: linking supply data and customer behaviour." });
  L.titleSlide(pres, { title: "The AI-Powered Customer Ecosystem",
    subtitle: "Connecting supply-side value chains with demand-side behaviour through CRM, data and artificial intelligence.",
    notes: "Running case: a fictional European sports-drink brand — produces, ships to distributors, sells through retailers and its own shop, barely knows its end customers." });
  await L.impulseBlock(pres, {
    chatgpt: { note: "For CRM: customers now ask an AI assistant before they ask your brand — a new channel nobody owns yet.", so: "For CRM: customers now ask an AI assistant before they ask your brand — a new channel." },
    iq: { note: "Ask: if AI reasons this well, why do most companies still decide production with spreadsheets?" },
    jobs: { note: "For CRM: forecasting a clean data series is easy for AI; aligning four actors in a value chain is messy.", so: "Forecasting is a clean task. Aligning manufacturer, distributor and retailer is messy — that is the CRM job." },
    skills: { note: "CRM roles move to AI and big data + systems thinking — exactly the top-right quadrant.", so: "The CRM role of 2030: AI and big data plus systems thinking — the top-right quadrant." },
    aug: { topicTag: "CRM", overlap: "AI connects millions of signals along the chain — people decide what to share, whom to trust and what to do." },
  });
  L.rethinkSlide(pres, { title: "Rethinking CRM", sub: "How CRM worked, what AI enables today — and what an AI-native customer ecosystem means",
    notes: "Walk the rows. Middle column: most companies today — an AI layer on top of the same silos. Right column: the rethink — the CRM becomes a shared evidence structure across the value chain, with agents that act.",
    rows: [
      ["Data", "Contact records in silos", "Unified customer data, cleaned by AI", "A shared evidence ledger across the value chain"],
      ["Insight", "Monthly manual reports", "AI dashboards and forecasts", "Real-time signals, each with a weight"],
      ["Action", "Reactive campaigns", "Next-best-action suggestions", "Agents act — humans set the guardrails"],
      ["Relationship", "Owned by whoever sells", "Omnichannel journeys", "Supply and demand side learn together"],
    ], foot: "The trap in the middle column: AI on top of silos gives you faster reports — not a connected customer." });
  await L.aiNativeSlide(pres, { sub: "An AI-native CRM is not a smarter contact database — it is the structure that lets the whole chain learn",
    notes: "Definition for the session. Governance point early: integration rests on permitted access, suitable identifiers and clear governance. For most decisions, aggregate sales by product × region × week are enough — no person-level join needed.",
    enabled: "An AI assistant on top of the CRM writes emails, scores leads and summarises reports. The silos stay where they were.",
    native: "Manufacturer, distributor, retailer and consumer signals flow into one structure. Agents forecast, detect gaps and propose actions.",
    p: ["Agents forecast and propose — humans approve stock and campaign moves", "“Redistribute to South” is a hypothesis until next week's sell-out", "Every forecast is checked against reality — the model calibrates", "Point-of-sale behaviour outweighs what a survey says"],
    line: "connect customer behaviour with supply decisions — and make every interaction part of a learning process." });
  // Two worlds
  {
    const s = content(pres, "Two worlds, disconnected", "The brand knows it shipped 1,000 cases — not who bought them, or why",
      "Menti open text option: in your last purchase, where did the manufacturer learn anything about you? Usually: nowhere. That is the gap. Two logics in one company: B2B upwards to the distributor, B2C downwards to the consumer.");
    const row = async (y, label, items, fill, col, icons) => {
      T(s, label, { x: 0.6, y, w: 8, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
      for (let i = 0; i < 4; i++) {
        const x = 0.6 + i * 3.09;
        box(s, x, y + 0.38, 2.86, 0.9, { fill });
        s.addImage({ data: await icon("md", icons[i], col === C.white ? C.blue2 : C.blue), x: x + 0.22, y: y + 0.6, w: 0.45, h: 0.45 });
        T(s, items[i], { x: x + 0.85, y: y + 0.38, w: 1.9, h: 0.9, fontSize: 15, bold: true, color: col, valign: "middle" });
        if (i < 3) T(s, "›", { x: x + 2.86, y: y + 0.38, w: 0.23, h: 0.9, fontSize: 18, color: C.muted, align: "center", valign: "middle" });
      }
    };
    await row(1.9, "SUPPLY SIDE  ·  WHAT THE COMPANY DECIDES", ["Production", "Distribution", "Retail", "Inventory"], C.navy, C.white, ["MdFactory", "MdLocalShipping", "MdStorefront", "MdInventory2"]);
    box(s, 0.6, 3.38, 12.13, 0.85, { fill: C.white, line: C.blue2, dash: "dash", lineW: 1.25 });
    T(s, [{ text: "Missing connection: shared customer intelligence. ", options: { bold: true, color: C.blue } }, { text: "Two or three handovers where the signal is lost." }], { x: 0.85, y: 3.38, w: 11.7, h: 0.85, fontSize: 14, color: C.navy, valign: "middle" });
    await row(4.4, "DEMAND SIDE  ·  WHAT THE CUSTOMER DOES", ["Awareness", "Purchase", "Consumption", "Loyalty"], C.light, C.navy, ["MdVisibility", "MdShoppingCart", "MdLocalDrink", "MdFavorite"]);
    takeaway(s, [{ text: "Lead question for today: ", options: { bold: true, color: C.blue2 } }, { text: "how do we connect these two worlds — without pooling every piece of personal data?" }], 6.15, 0.55);
  }
  // Quantify gap
  {
    const s = content(pres, "Quantify the cost of disconnected data", "Same product, same period, two regions — what would you recommend to the manufacturer?",
      "Likely answer: redistribute. Push back on cost, shelf life, expected demand. The correct Menti answer is “cannot know from this data” — that is the lesson. Students then estimate what better availability could be worth, tagged “estimated”.");
    pill(s, "ILLUSTRATIVE DATA  ·  ZERO OPENING STOCK, NO RETURNS", 0.6, 1.95, 4.9, { fill: C.line, color: C.navy });
    s.addChart(pres.charts.BAR, [{ name: "Units shipped", labels: ["North", "South"], values: [1000, 300] }, { name: "Units sold", labels: ["North", "South"], values: [400, 290] }],
      { x: 0.5, y: 2.35, w: 6.4, h: 3.7, barDir: "col", chartColors: [C.navy, C.blue2], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "#,##0",
        dataLabelColor: C.navy, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt", catAxisLabelColor: C.navy, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
        valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: true, legendPos: "b", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: C.grey, barGapWidthPct: 70 });
    const st = [["Sell-through", "40%", "97%"], ["Remaining stock", "600", "10"]];
    T(s, "North", { x: 9.6, y: 1.95, w: 1.4, h: 0.3, fontSize: 11, bold: true, color: C.muted, align: "center" });
    T(s, "South", { x: 11.15, y: 1.95, w: 1.4, h: 0.3, fontSize: 11, bold: true, color: C.muted, align: "center" });
    st.forEach(([l, a, b], i) => {
      const y = 2.3 + i * 0.85;
      box(s, 7.3, y, 5.43, 0.72, { fill: C.light });
      T(s, l, { x: 7.5, y, w: 2.1, h: 0.72, fontSize: 13, bold: true, valign: "middle" });
      T(s, a, { x: 9.6, y, w: 1.4, h: 0.72, fontSize: 18, bold: true, color: C.navy, align: "center", valign: "middle" });
      T(s, b, { x: 11.15, y, w: 1.4, h: 0.72, fontSize: 18, bold: true, color: C.blue, align: "center", valign: "middle" });
    });
    box(s, 7.3, 4.1, 5.43, 1.95, { fill: C.navy });
    T(s, "MENTI  ·  How much revenue did South lose to the stockout?", { x: 7.5, y: 4.2, w: 5.1, h: 0.55, fontSize: 12, bold: true, color: C.white });
    T(s, "0  ·  < €5k  ·  €5–20k  ·  > €20k  ·  cannot know from this data", { x: 7.5, y: 4.75, w: 5.1, h: 0.4, fontSize: 11, color: C.line });
    T(s, "The lost demand in South is not in the data — the stockout hides it.", { x: 7.5, y: 5.2, w: 5.1, h: 0.7, fontSize: 12, italic: true, color: C.blue2 });
    takeaway(s, [{ text: "AI can only learn from what the chain shares: ", options: { bold: true, color: C.blue2 } }, { text: "redistribution depends on cost, shelf life — and evidence you don't have yet." }], 6.25, 0.5);
  }
  // Live demo channel intelligence
  {
    const s = content(pres, "From data to decisions — live", "Integration pays off only when it changes a decision and an action",
      "Live demo with Claude Code: students choose the new input — a third region, last year's demand, returns or a promotion calendar. Claude Code adds it to the prepared app, the dashboard recalculates and a new recommendation appears. Synthetic data, one live change. Bridge: recommendation agents, IoT shelf sensors and RFID are further behavioural sources with weight 1.0.");
    const st = [["MdShowChart", "Demand forecasting", "Regional demand from history, seasonality, external factors", "FORECAST ERROR"], ["MdInventory2", "Inventory optimisation", "Detect imbalances, recommend redistribution", "STOCKOUT RATE"], ["MdPeople", "Customer intelligence", "Buying behaviour across channels and regions", "REPEAT PURCHASE"], ["MdBolt", "Next-best action", "Campaign, assortment change or distributor action", "INCREMENTAL REVENUE"]];
    for (let i = 0; i < 4; i++) {
      const x = 0.6 + i * 3.09, [ic, h1, t, k] = st[i];
      box(s, x, 1.95, 2.86, 2.2, { fill: C.light });
      s.addShape("ellipse", { x: x + 0.22, y: 2.13, w: 0.55, h: 0.55, fill: { color: C.ice }, line: { type: "none" } });
      s.addImage({ data: await icon("md", ic, C.blue), x: x + 0.33, y: 2.24, w: 0.33, h: 0.33 });
      T(s, h1, { x: x + 0.22, y: 2.8, w: 2.5, h: 0.4, fontSize: 13.5, bold: true });
      T(s, t, { x: x + 0.22, y: 3.18, w: 2.5, h: 0.55, fontSize: 11, color: C.grey });
      T(s, "KPI · " + k, { x: x + 0.22, y: 3.78, w: 2.5, h: 0.28, fontSize: 9, bold: true, color: C.blue, charSpacing: 1 });
    }
    pill(s, "LIVE DEMO  ·  CLAUDE CODE  ·  CHANNEL INTELLIGENCE", 0.6, 4.45, 4.6, { fill: C.blue });
    T(s, "You choose the new input: a third region, last year's demand, returns or a promotion calendar. Claude Code adds it to the prepared app — the dashboard recalculates and a new recommendation appears.",
      { x: 0.6, y: 4.9, w: 5.9, h: 1.3, fontSize: 13, color: C.navy });
    box(s, 6.85, 4.45, 5.88, 1.8, { fill: C.navy });
    T(s, "AI RECOMMENDATION", { x: 7.1, y: 4.58, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
    T(s, "Investigate excess stock in North and stockout risk in South before deciding on replenishment.", { x: 7.1, y: 4.9, w: 5.4, h: 0.7, fontSize: 13, color: C.white });
    T(s, "1,300 shipped  ·  690 sold  ·  610 remaining", { x: 7.1, y: 5.7, w: 5.4, h: 0.35, fontSize: 12, bold: true, color: C.line });
  }
  await L.enginesSlide(pres, { title: "Five AI engines along the value chain", sub: "Each engine produces data for the customer intelligence layer — three kinds of evidence, one ledger",
    colHead: "WHAT IT PRODUCES FOR THE CHAIN", notes: "Each engine is a data producer for the shared structure. BMV complements the CRM: own data for serving today's customers, external and behavioural evidence for betting on new channels or categories.",
    rows: ["Competitor assortments, retail prices, reviews, regulation", "Points of sale and consumers per region — the demand ceiling", "Consumer response to a pack, claim or price — before listing", "Simulated distributors, retailers, consumers — channel elasticity", "Real reactions from trade partners to a new channel"],
    foot: "a sell-out, a reorder or a partner's reply outweighs any forecast — and calibrates it." });
  await L.challengeSlide(pres, { title: "The AI CRM Challenge", sub: "Groups of 3–4, AI on your phone — find the gap, price it, recommend an action",
    notes: "The hidden slice is a quick test of a recommendation, not market validation — say so. Two or three pitches; the rest via Menti.",
    steps: ["The key information gap between manufacturer, distributor and consumer — the opportunity in €, tagged.", "One operational or marketing action, with the actor who executes it.", "We release next week's sell-out by region. Does your recommendation survive?", "45 seconds: gap, impact, action, did it survive, what you still need."],
    handIn: ["Data gap", "Financial impact", "AI recommendation", "Validation method"], qrNote: "Week 5 sell-out released at minute 5",
    foot: "Repeat of Menti question 3 at the end: as CEO, what would you invest in first — and did your answer change?" });
  await L.changeSlide(pres, { title: "How AI-native will change CRM", sub: "From a system of records to a system that acts — and learns",
    notes: "Close the rethink. Pair discussion (2 min): would you pay a key-account manager for a documented distributor objection the same as for an order? Then repeat Menti question 3 and the closing slide.",
    cards: [
      ["MdSmartToy", "From records to agents", "The CRM no longer waits for input: agents forecast, detect gaps and propose the next action — humans approve."],
      ["MdSupportAgent", "The consumer's AI is a new channel", "Customers ask their AI assistant what to buy. Brands must be understandable to machines, not only to people."],
      ["MdShare", "Shared data, clear governance", "Value comes from what the chain shares — permitted access and aggregates, not pooling every personal detail."],
      ["MdTrackChanges", "New KPIs: calibration", "Not just revenue per customer — forecast error, stockout rate and how fast the model learns from reality."],
    ], foot: "Three statements: connect behaviour with supply decisions · make every interaction a learning loop · turn fragmented data into action." });
  L.closingSlide(pres, { notes: "Repeat Menti question 3, compare with the first vote. Q&A.",
    work: "Thesis topics on channel intelligence and validation, pilot participation." });
  return pres;
}

(async () => {
  const out = process.argv[2] || "out";
  for (const [fn, name] of [[jcu, "01_JCU_From_Idea_to_Market"], [sales, "02_LUISS_Sales_AI-Native_Sales_Organization"], [crm, "03_LUISS_CRM_AI-Powered_Customer_Ecosystem"]]) {
    const pres = await fn();
    const file = `${out}/${name}.pptx`;
    await pres.writeFile({ fileName: file });
    await applyTheme(file, L.THEME);
    console.log("wrote", file);
  }
})().catch((e) => { console.error(e); process.exit(1); });
