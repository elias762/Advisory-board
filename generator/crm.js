const L = require("./lib");
const { C, T, box, pill, circleNum, content, takeaway, source, icon } = L;

async function crm() {
  const pres = L.newPres("The Future of CRM: AI-Native Customer Relationships");

  await L.mentiSlide(pres, { title: "Before we start: you, customers and AI", questions: [
    { type: "WORD CLOUD", q: "One word: what is a CRM to you today?" },
    { type: "POLL", q: "Who will manage customer relationships in 2030?", opts: "People · AI agents · both, with clear rules" },
    { type: "POLL", q: "Would you let an AI agent answer a customer complaint without human review?", opts: "Yes · only small cases · never" },
    { type: "SCALE 1–5", q: "How much do you trust companies with your personal customer data?" },
    { type: "POLL · REPEAT", q: "As CMO with €1M for CRM — where does it go first?", opts: "Data quality · AI agents · new software · people" },
  ] });
  await L.demoSlide(pres, { lens: "applied to customers: millions of interactions turned into one customer view and a next best action." });
  L.titleSlide(pres, { title: "The Future of CRM: AI-Native Customer Relationships",
    subtitle: "How CRM systems will work, how AI gets into them — and what still holds from the textbook.",
    notes: "Promise: three questions for the hour. How will CRM work in 2030? What does such a system look like and how do companies get there? And which of the theories you study still hold — spoiler: most of them, but the execution changes completely." });
  await L.impulseBlock(pres, {
    chatgpt: { note: "For CRM: customers now ask an AI assistant before they ask your brand — a new touchpoint nobody owns yet.", so: "For CRM: customers now ask an AI assistant before they ask your brand — a new touchpoint." },
    iq: { note: "Ask: if AI reasons this well, why do most customer service interactions still feel like 2010?" },
    jobs: { note: "For CRM: answering a standard question is a clean task; repairing a damaged relationship is messy. That is where people stay.", so: "Answering a standard question is a clean task. Rescuing a relationship is messy — that stays human." },
    skills: { note: "CRM roles move to AI and big data plus empathy and service orientation — technology and human skills together.", so: "The CRM profile of 2030: AI and data skills plus empathy and service orientation." },
    aug: { topicTag: "CRM", overlap: "Agents handle millions of routine interactions — people own the relationships that matter and set the rules." },
  });

  L.rethinkSlide(pres, { title: "Rethinking CRM", sub: "The classic CRM types — how they worked, what AI does today, what AI-native means",
    notes: "Use the taxonomy the students know from the course: operational, analytical, collaborative CRM — plus CRM as strategy. Walk left to right. Middle column = most companies in 2026: AI features on top of the same CRM. Right column = AI-native: the work itself is done by agents, the CRM becomes the company's learning system.",
    rows: [
      ["Operational CRM", "Sales, service and marketing records typed in by hand", "Auto-logging, AI-written emails and call summaries", "Agents run service, sales and marketing tasks end-to-end"],
      ["Analytical CRM", "Monthly reports and RFM segments", "Predictive scores: churn, CLV, propensity", "A segment of one — models update with every interaction"],
      ["Collaborative CRM", "Silos between departments and partners", "Shared dashboards across teams", "One customer context shared by people, agents and partners"],
      ["Strategic CRM", "CRM as an IT project", "AI pilots on top of the CRM", "The CRM as the company's learning system"],
    ], foot: "The taxonomy from your course still holds. What changes is who does the work — and how fast the system learns." });

  // Textbook anchors
  {
    const s = content(pres, "Back to the textbook: the theory holds", "Four concepts from your CRM course — and what AI changes about them",
      "Academic anchor slide. Kumar & Reinartz on customer lifetime value; Payne & Frow's strategic CRM framework (Journal of Marketing, 2005); Lemon & Verhoef on customer experience across the journey (Journal of Marketing, 2016); Morgan & Hunt's commitment–trust theory (Journal of Marketing, 1994). Message: the concepts are not outdated — AI makes them executable at scale. Ask: which of the four becomes MORE important with AI? (Answer: trust.)");
    T(s, "CONCEPT", { x: 0.6, y: 1.92, w: 3.5, h: 0.25, fontSize: 9, bold: true, color: C.muted, charSpacing: 1 });
    T(s, "WHAT IT SAYS", { x: 4.35, y: 1.92, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.muted, charSpacing: 1 });
    T(s, "WHAT AI CHANGES", { x: 8.55, y: 1.92, w: 4, h: 0.25, fontSize: 9, bold: true, color: C.blue, charSpacing: 1 });
    const rows = [
      ["Customer lifetime value", "Kumar & Reinartz", "Invest in customers according to their future value, not past revenue", "CLV predicted per customer, updated daily — and acted on by agents"],
      ["Strategic CRM framework", "Payne & Frow, 2005", "Strategy, value creation, multichannel integration, information management, performance", "Information management and channel integration become largely automated"],
      ["Customer journey", "Lemon & Verhoef, 2016", "Experience is created across touchpoints — many outside the firm's control", "Journeys orchestrated in real time — including the customer's own AI assistant"],
      ["Commitment–trust theory", "Morgan & Hunt, 1994", "Relationships rest on commitment and trust", "When AI speaks for the brand, trust becomes the scarce asset"],
    ];
    const rh = 0.88, gap = 0.1;
    rows.forEach(([n, a, says, ai], i) => {
      const y = 2.22 + i * (rh + gap), hot = i === 3;
      box(s, 0.6, y, 12.13, rh, { fill: hot ? C.navy : C.light });
      T(s, n, { x: 0.8, y: y + 0.13, w: 3.4, h: 0.36, fontSize: 14, bold: true, color: hot ? C.white : C.navy });
      T(s, a, { x: 0.8, y: y + 0.5, w: 3.4, h: 0.28, fontSize: 11, italic: true, color: hot ? C.blue2 : C.blue });
      T(s, says, { x: 4.35, y, w: 3.95, h: rh, fontSize: 12, color: hot ? C.line : C.grey, valign: "middle" });
      T(s, ai, { x: 8.55, y, w: 4.0, h: rh, fontSize: 12.5, bold: true, color: hot ? C.white : C.navy, valign: "middle" });
    });
    T(s, "Takeaway: AI does not replace CRM theory — it finally makes it executable at scale.", { x: 0.6, y: 6.2, w: 12.1, h: 0.35, fontSize: 13, bold: true, color: C.blue });
  }

  // Architecture 2030
  {
    const s = content(pres, "The CRM of 2030: a system that acts", "What a future CRM system looks like — from storing data to taking action",
      "Walk bottom-up. Data: unified, consented first-party data, connected to ERP, commerce and service systems — ideally without copying it around. Intelligence: classic predictive models plus LLMs that understand unstructured data (emails, calls, reviews — most customer information is text). Agents: software that acts within rules. Interaction: every channel, including the customer's own AI assistant. Governance runs through every layer: GDPR, consent, EU AI Act, audit trail, human escalation.");
    const layers = [
      ["INTERACTION", "Every channel: web, app, email, chat, voice — and the customer's own AI assistant", C.ice, C.navy, "MdForum"],
      ["AGENTS", "Service, sales and marketing agents act within guardrails — people handle the exceptions", C.blue, C.white, "MdSmartToy"],
      ["INTELLIGENCE", "Predictive models (churn, CLV, next best action) + LLMs that read emails, calls and reviews", C.slate, C.white, "MdPsychology"],
      ["DATA", "Unified, consented customer data — linked to ERP, e-commerce and service systems", C.navy, C.white, "MdStorage"],
    ];
    const lh = 0.92, gap = 0.1, y0 = 1.95;
    for (let i = 0; i < 4; i++) {
      const [n, t, f, c, ic] = layers[i], y = y0 + i * (lh + gap);
      box(s, 0.6, y, 7.35, lh, { fill: f });
      s.addImage({ data: await icon("md", ic, c), x: 0.85, y: y + 0.27, w: 0.4, h: 0.4 });
      T(s, n, { x: 1.45, y: y + 0.1, w: 2.2, h: 0.3, fontSize: 11, bold: true, color: c, charSpacing: 1 });
      T(s, t, { x: 1.45, y: y + 0.38, w: 6.3, h: 0.5, fontSize: 12, color: c });
    }
    const gh = 4 * lh + 3 * gap;
    box(s, 8.1, y0, 0.95, gh, { fill: C.white, line: C.navy, lineW: 1.5 });
    T(s, [{ text: "GOVERNANCE & TRUST", options: { bold: true, fontSize: 12, breakLine: true } }, { text: "GDPR · AI Act · consent · audit trail", options: { fontSize: 9.5 } }], { x: 8.1, y: y0, w: 0.95, h: gh, color: C.navy, align: "center", valign: "middle", vert: "vert270" });
    T(s, "WHAT IS NEW", { x: 9.4, y: 1.95, w: 3.3, h: 0.3, fontSize: 10, bold: true, color: C.blue, charSpacing: 1 });
    const nw = [["From records to context", "Most customer knowledge is text — LLMs make it usable."], ["From dashboards to actions", "The system does not only show the next best action — it takes it."], ["From one channel owner to many agents", "Including agents that act for the customer."]];
    nw.forEach(([h1, t], i) => {
      const y = 2.35 + i * 1.3;
      circleNum(s, i + 1, 9.4, y, 0.4, C.blue);
      T(s, h1, { x: 9.95, y: y - 0.02, w: 2.8, h: 0.5, fontSize: 13, bold: true });
      T(s, t, { x: 9.95, y: y + 0.45, w: 2.8, h: 0.7, fontSize: 11.5, color: C.grey });
    });
    takeaway(s, [{ text: "From system of record to system of action: ", options: { bold: true, color: C.blue2 } }, { text: "the CRM stops waiting for input and starts doing the work." }], 6.2, 0.5);
  }

  // A day in the CRM of 2030
  {
    const s = content(pres, "A day in the CRM of 2030", "One complaint, five steps, a few minutes — case: a European online fashion brand",
      "Illustrative flow. Today: the ticket waits in a queue, a service agent opens three systems, the customer waits two days and may be gone. 2030: the agent understands the context (high CLV, second late delivery), acts within a clear rule (compensation below €50 autonomous, above that a human approves), and the outcome flows back into the churn model. Ask: where would you set the threshold — and who decides?");
    const st = [["MdMarkEmailUnread", "Signal", "A loyal customer writes an angry email: second late delivery"],
      ["MdManageSearch", "Understand", "Agent reads tone, order history and CLV: high-value, churn risk up"],
      ["MdRule", "Decide", "Rule: compensation under €50 is autonomous, above needs a human"],
      ["MdBolt", "Act", "Apology, voucher and priority shipping — ERP updated, reason logged"],
      ["MdAutorenew", "Learn", "Did she buy again? The outcome trains the churn model"]];
    for (let i = 0; i < 5; i++) {
      const x = 0.6 + i * 2.45, [ic, h1, t] = st[i], hot = i === 2;
      box(s, x, 1.95, 2.28, 2.45, { fill: hot ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.2, 2.13, 0.4, hot ? C.blue2 : C.blue);
      s.addImage({ data: await icon("md", ic, hot ? C.white : C.blue), x: x + 1.7, y: 2.13, w: 0.38, h: 0.38 });
      T(s, h1, { x: x + 0.2, y: 2.7, w: 1.95, h: 0.4, fontSize: 14, bold: true, color: hot ? C.white : C.navy });
      T(s, t, { x: x + 0.2, y: 3.1, w: 1.95, h: 1.2, fontSize: 11.5, color: hot ? C.line : C.grey });
    }
    pill(s, "ILLUSTRATIVE", 0.6, 4.65, 1.6, { fill: C.line, color: C.navy });
    box(s, 0.6, 5.05, 5.95, 1.15, { fill: C.light });
    T(s, [{ text: "Today  ", options: { bold: true, color: C.muted } }, { text: "The ticket waits in a queue, a service agent opens three systems, the customer waits two days — and may be gone.", options: { color: C.grey } }],
      { x: 0.85, y: 5.05, w: 5.5, h: 1.15, fontSize: 12.5, valign: "middle" });
    box(s, 6.78, 5.05, 5.95, 1.15, { fill: C.navy });
    T(s, [{ text: "2030  ", options: { bold: true, color: C.blue2 } }, { text: "Answered in minutes, within clear rules. People handle the cases above the threshold — and the relationships that matter.", options: { color: C.white } }],
      { x: 7.03, y: 5.05, w: 5.5, h: 1.15, fontSize: 12.5, valign: "middle" });
  }

  // Integration patterns
  {
    const s = content(pres, "How AI gets into an existing CRM", "Four integration patterns — from switching on a feature to building your own layer",
      "Practical slide. Most companies start with 1 or 2 and move toward 3 and 4 as they learn. Examples are illustrative, not recommendations: built-in copilots such as Salesforce Agentforce, HubSpot Breeze or Microsoft Dynamics 365 Copilot; workflow tools such as Make, Zapier or n8n; agents that use the CRM's API or a standard connector protocol such as MCP; a data platform (warehouse) with own models, results written back into the CRM. The roadmap at the bottom is the same in every case: data quality first.");
    const ps = [
      ["Built-in copilots", "Switch on the AI of your CRM vendor", "e.g. Agentforce, HubSpot Breeze, Dynamics 365 Copilot", "Fast start · limited to the platform's data", 1],
      ["Workflow automation", "CRM events trigger AI steps via APIs", "e.g. Make, Zapier, n8n", "Quick wins · needs maintenance", 2],
      ["AI agents with connectors", "Agents read and write the CRM through APIs or MCP", "One agent across CRM, ERP, email", "Flexible · needs clear permissions", 3],
      ["Data platform + own models", "CRM, ERP and web data in one warehouse, own models", "Results written back to the CRM", "Most control · highest effort", 4],
    ];
    ps.forEach(([h1, t, ex, tr, lvl], i) => {
      const x = 0.6 + i * 3.09, hot = i === 2;
      box(s, x, 1.95, 2.86, 3.15, { fill: hot ? C.navy : C.light });
      T(s, "0" + (i + 1), { x: x + 0.22, y: 2.1, w: 1, h: 0.4, fontSize: 16, bold: true, color: hot ? C.blue2 : C.blue });
      for (let k = 0; k < 4; k++) s.addShape("ellipse", { x: x + 1.65 + k * 0.26, y: 2.22, w: 0.17, h: 0.17, fill: { color: k < lvl ? (hot ? C.blue2 : C.blue) : (hot ? "2A3170" : C.line) }, line: { type: "none" } });
      T(s, h1, { x: x + 0.22, y: 2.55, w: 2.45, h: 0.6, fontSize: 14, bold: true, color: hot ? C.white : C.navy });
      T(s, t, { x: x + 0.22, y: 3.15, w: 2.45, h: 0.7, fontSize: 12, color: hot ? C.white : C.navy });
      T(s, ex, { x: x + 0.22, y: 3.85, w: 2.45, h: 0.55, fontSize: 10.5, italic: true, color: hot ? C.line : C.grey });
      T(s, tr, { x: x + 0.22, y: 4.45, w: 2.45, h: 0.55, fontSize: 10.5, bold: true, color: hot ? C.blue2 : C.blue });
    });
    T(s, "EFFORT  ●○○○ → ●●●●", { x: 9.6, y: 1.62, w: 3.13, h: 0.25, fontSize: 9, bold: true, color: C.muted, align: "right" });
    T(s, "THE ROADMAP — THE SAME IN EVERY CASE", { x: 0.6, y: 5.3, w: 8, h: 0.3, fontSize: 10, bold: true, color: C.muted, charSpacing: 1 });
    const rm = ["Clean data", "One use case", "Human in the loop", "Measure", "Scale"];
    rm.forEach((t, i) => {
      const x = 0.6 + i * 2.45;
      s.addShape("chevron", { x, y: 5.65, w: 2.4, h: 0.6, fill: { color: i === 0 ? C.navy : i === 4 ? C.blue : C.ice }, line: { type: "none" } });
      T(s, t, { x: x + 0.3, y: 5.65, w: 1.85, h: 0.6, fontSize: 12, bold: true, color: i === 0 || i === 4 ? C.white : C.navy, align: "center", valign: "middle" });
    });
  }

  // Live demo: agent in CRM
  {
    const s = content(pres, "Live: an AI agent inside the CRM", "Pattern 03 on stage — an agent reads, analyses and writes back to a CRM",
      "Prepared base: a sandbox CRM with synthetic customers, connected to Claude Code via the CRM's API (or an MCP connector). Run the prompt, show the agent querying, computing and writing tasks back into the CRM — open the CRM, not the code. Then let the room add a guardrail or change the segment (e.g. “only customers who agreed to marketing emails”). Point out: nothing is sent — people review.");
    const st = [["MdStorage", "Sandbox CRM", "Synthetic customers, orders and tickets"], ["MdLink", "Connect", "Claude Code via API or MCP connector"], ["MdAnalytics", "Analyse", "Find falling order frequency, estimate CLV"], ["MdTask", "Write back", "Draft emails as tasks — a person approves"]];
    for (let i = 0; i < 4; i++) {
      const x = 0.6 + i * 3.09, [ic, h1, t] = st[i];
      box(s, x, 1.95, 2.86, 2.0, { fill: i === 3 ? C.navy : C.light });
      circleNum(s, i + 1, x + 0.22, 2.15, 0.42, i === 3 ? C.blue2 : C.blue);
      s.addImage({ data: await icon("md", ic, i === 3 ? C.white : C.blue), x: x + 2.25, y: 2.15, w: 0.4, h: 0.4 });
      T(s, h1, { x: x + 0.22, y: 2.75, w: 2.45, h: 0.4, fontSize: 14, bold: true, color: i === 3 ? C.white : C.navy });
      T(s, t, { x: x + 0.22, y: 3.15, w: 2.45, h: 0.7, fontSize: 12, color: i === 3 ? C.line : C.grey });
    }
    pill(s, "LIVE DEMO  ·  CLAUDE CODE", 0.6, 4.3, 2.8, { fill: C.blue });
    T(s, [{ text: "You set the rules. ", options: { bold: true } }, { text: "Change the segment or add a guardrail — for example “only customers who agreed to marketing emails” — and the agent reruns in seconds." }],
      { x: 0.6, y: 4.75, w: 5.9, h: 1.4, fontSize: 13, color: C.navy });
    box(s, 6.85, 4.3, 5.88, 1.95, { fill: C.navy });
    T(s, "THE PROMPT ON STAGE", { x: 7.1, y: 4.42, w: 5, h: 0.3, fontSize: 10, bold: true, color: C.blue2, charSpacing: 1 });
    T(s, "Find customers whose order frequency dropped by half in the last 90 days. Estimate their CLV. For the top 10, draft a personal win-back email and create a review task. Do not send anything.",
      { x: 7.1, y: 4.75, w: 5.4, h: 1.4, fontSize: 12, color: C.white, fontFace: "Courier New" });
  }

  await L.enginesSlide(pres, { title: "Beyond your own data: five AI engines", sub: "Your CRM knows today's customers — BMV adds evidence about the ones you don't have yet",
    colHead: "WHAT IT ADDS TO THE CRM", notes: "BMV complements the CRM: own data to serve existing customers; external, simulated and real-world evidence for decisions about new segments, offers or channels. All five write into one evidence ledger with weights — the same logic a good analytical CRM should follow.",
    rows: ["What competitors offer your customers — prices, reviews, rules", "How many potential customers exist per segment", "How a segment reacts to a new offer — before the campaign", "Simulated customers test a new loyalty or pricing model", "Real reactions from prospects to a new offer"],
    foot: "your CRM explains today's customers — real tests reveal tomorrow's." });

  await L.challengeSlide(pres, { title: "Design an AI-native CRM for LUISS", sub: "Groups of 3–4, AI on your phone — your university is the company, you are the customer",
    notes: "Relatable case: LUISS itself. Customer lifecycle: applicant → student → alumnus → recruiter / donor. Lifetime value of an alumnus is a real concept (donations, recruiting, reputation). Each group picks one moment of truth (e.g. admission decision, first-semester drop-out risk, graduation, first job). Two or three groups pitch; the rest submit via Menti. Repeat Menti question 5 afterwards.",
    stages: [["3 min", "Map"], ["3 min", "Design"], ["2 min", "Guard"], ["2 min", "Pitch"]],
    steps: ["The lifecycle: applicant → student → alumnus → recruiter or donor. Where is data — where is it lost?", "One agent at one moment of truth: what does it do, with which data?", "One KPI and one guardrail: what may the agent never do without a human?", "30 seconds: moment, agent, data, KPI, guardrail."],
    handIn: ["Moment of truth", "Agent use case", "Data needed", "KPI", "Guardrail"], qrNote: "Lifecycle template + prompt",
    foot: "Remember Morgan & Hunt: would you, as a student, trust this agent? If not, the design fails." });

  await L.changeSlide(pres, { title: "What this means for CRM — and for you", sub: "Four shifts for anyone working with customers in the next five years",
    notes: "Close with careers. Then repeat Menti question 5 (CMO budget) and compare with the first vote. Pair discussion option (2 min): which CRM role would you want in 2030?",
    cards: [
      ["MdManageAccounts", "From CRM user to agent manager", "You will configure, supervise and improve agents — not fill in fields."],
      ["MdVerifiedUser", "Data quality is strategy", "Clean, consented first-party data is the moat. An agent is only as good as the data it acts on."],
      ["MdInsights", "New KPIs", "Next to CLV and retention: AI resolution rate, escalation rate — and how well forecasts match reality."],
      ["MdHandshake", "Trust is the differentiator", "Commitment–trust still applies: customers stay with brands they trust with their data and with their agents."],
    ], foot: "Three statements: the theory holds · the CRM becomes a system of action · trust is the scarcest asset." });
  L.closingSlide(pres, { notes: "Repeat Menti question 5 (CMO budget), compare with the first vote. Q&A.",
    work: "Thesis topics on AI-native CRM, agents and customer data; pilot participation." });
  return pres;
}
module.exports = { crm };
