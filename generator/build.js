const L = require("./lib");
const { C, T, box, pill, circleNum, content, takeaway, source, icon } = L;
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const { jcu } = require("./jcu");
const { crm } = require("./crm");

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


(async () => {
  const out = process.argv[2] || "out";
  for (const [fn, name] of [[jcu, "01_JCU_From_Idea_to_Market"], [sales, "02_LUISS_Sales_AI-Native_Sales_Organization"], [crm, "03_LUISS_CRM_Future_of_CRM"]]) {
    const pres = await fn();
    const file = `${out}/${name}.pptx`;
    await pres.writeFile({ fileName: file });
    await applyTheme(file, L.THEME);
    console.log("wrote", file);
  }
})().catch((e) => { console.error(e); process.exit(1); });
