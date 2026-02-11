/* ============================================================
   EE-Partner Advisory Board -Slide Deck Application
   ============================================================ */

// ─── Slide Data (editable content object) ────────────────────
// Each slide is an object with: id, title, overline, subtitle,
// and a `blocks` array of content components.
//
// Block types:
//   { type: "callout",   text, attribution? }
//   { type: "kpi-grid",  items: [{ value, label, sublabel? }] }
//   { type: "two-col",   left: { title, content }, right: { title, content } }
//   { type: "bullets",   heading?, items: [string] }
//   { type: "flow",      stages: [{ number?, title, desc? }] }
//   { type: "section-heading", text }
//   { type: "tags",      items: [string] }
//   { type: "nda-form"  }  (special: renders the NDA gate)
//   { type: "nda-text",  html }
//   { type: "html",      html }  (raw HTML for custom blocks)
//   { type: "cta-btn",   text, href? }

const SLIDES = [
  {
    id: "nda",
    title: "Advisory Board Information Document",
    stepperTitle: "Confidentiality & NDA",
    overline: "EE-Partner",
    subtitle: "Strategic Overview, Track Record and Growth Vision",
    secondarySubtitle: "Confidential Briefing for Potential Advisory Board Collaboration",
    recipient: "Prof. Andrea De Mauro",
    cssClass: "title-slide",
    blocks: [
      {
        type: "nda-text",
        html: `
          <h4>Confidentiality Notice</h4>
          <p>This document contains confidential and proprietary information regarding EE-Partner, its affiliated activities, and the planned development of a new AI-focused company.</p>
          <p>The information provided may include:</p>
          <ul>
            <li>Business strategies and operational approaches</li>
            <li>Financial information and performance indicators</li>
            <li>Growth objectives and market positioning</li>
            <li>Client relationships and partnerships</li>
            <li>Organizational structures and future plans</li>
          </ul>
          <p>This material is shared exclusively for the purpose of evaluating a potential advisory board collaboration.</p>
          <p>Recipients agree to treat all information contained in this document as strictly confidential. The content must not be disclosed, reproduced, distributed, or used for any purpose outside the evaluation of a potential collaboration without prior written consent from EE-Partner.</p>
          <p>The confidentiality obligation applies to all information shared in this document and remains valid regardless of whether a formal advisory relationship is established.</p>

          <h4>NDA Confirmation</h4>
          <p>To proceed with reviewing this document, recipients are requested to confirm their agreement to the confidentiality terms stated above.</p>
          <p>By confirming, the recipient acknowledges:</p>
          <ul>
            <li>Acceptance of confidentiality obligations</li>
            <li>Commitment to non-disclosure of shared information</li>
            <li>Use of information solely for advisory evaluation purposes</li>
          </ul>
        `
      },
      { type: "nda-form" }
    ]
  },
  {
    id: "vision",
    title: "Vision & Market Opportunity",
    overline: "Slide 2 of 8",
    subtitle: "Italy's SME landscape and the AI adoption gap.",
    blocks: [
      // ── Market Context ──
      { type: "section-heading", text: "Market Context" },
      {
        type: "paragraph",
        text: "SMEs are the backbone of the Italian economy. Italy is one of Europe's most SME-driven economies -and the central driver of economic stability, innovation, and employment."
      },
      {
        type: "kpi-grid",
        items: [
          { value: "99.9%", label: "Of All Companies", sublabel: "are SMEs in Italy" },
          { value: "~75%", label: "Workforce Share", sublabel: "employed by SMEs" },
          { value: "~65%", label: "Value Creation", sublabel: "of non-financial business sector" },
        ]
      },

      // ── AI Adoption Gap ──
      { type: "section-heading", text: "The AI Adoption Gap" },
      {
        type: "paragraph",
        text: "Despite growing awareness, AI adoption among Italian companies remains significantly behind other European markets."
      },
      {
        type: "compare-bars",
        items: [
          { label: "Italy", value: 8, suffix: "%", note: "of enterprises actively use AI" },
          { label: "Germany", value: 20, suffix: "%", note: "of enterprises integrating AI" },
        ],
        caption: "This gap highlights a substantial opportunity for structured AI enablement in Italy."
      },

      // ── Competitive Landscape ──
      { type: "section-heading", text: "Competitive Landscape" },
      {
        type: "paragraph",
        text: "The Italian AI landscape for SMEs is fragmented. Generic providers exist, but there is a clear gap in:"
      },
      {
        type: "bullets",
        items: [
          "Practical and execution-oriented AI enablement",
          "SME-focused transformation approaches",
          "Structured adoption frameworks tailored to operational workflows",
          "Accessible, business outcome-driven AI integration",
        ]
      },

      // ── Vision & Positioning ──
      { type: "section-heading", text: "Our Vision" },
      {
        type: "callout",
        text: "EE-Partner makes AI accessible, viable, and effective for Italian SMEs - turning it from an abstract concept into a measurable business lever that drives efficiency, decision quality, and competitiveness."
      },
      {
        type: "callout",
        text: "We take Italian SMEs from AI curiosity to measurable business outcomes through pragmatic, execution-focused integration.",
        attribution: "Positioning Statement"
      },
    ]
  },
  {
    id: "approach",
    title: "EE-Partner Approach",
    overline: "Slide 3 of 8",
    subtitle: "Enabling AI Adoption -a two-dimensional enablement model.",
    blocks: [
      // ── Positioning ──
      {
        type: "callout",
        text: "We combine AI enablement and implementation to drive sustainable, organisation-wide adoption. Workshops build readiness and trust; process-driven automation delivers measurable business impact."
      },

      // ── Two Pillars ──
      { type: "section-heading", text: "Two-Dimensional Enablement Model" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "1. Individual & Organisational AI Enablement",
          subtitle: "Empowering employees and management to confidently work with AI in daily workflows.",
          bullets: [
            "AI workshops and training programmes",
            "Hands-on tool enablement across software ecosystems",
            "Awareness building and AI literacy development",
            "Productivity optimisation at the individual level",
            "Change management and cultural integration of AI",
          ]
        },
        right: {
          title: "2. Process-Driven AI Implementation & Automation",
          subtitle: "Institutional AI integration through structured automation and workflow optimisation.",
          bullets: [
            "Identification of automation potential within business processes",
            "AI-supported workflow optimisation",
            "Implementation of AI-enabled tool stacks",
            "Process standardisation and scaling",
            "Performance and efficiency monitoring",
          ]
        }
      },

      // ── Delivery Journey ──
      {
        type: "journey",
        heading: "Integrated Delivery Journey",
        description: "Both dimensions reinforce each other. We typically start with workshops and enablement - building trust, understanding workflows, and creating readiness - before transitioning into larger implementation and automation projects.",
        groups: [
          {
            label: "Build Trust",
            stages: [
              { number: "1", title: "Enablement Entry", desc: "Workshops & training", icon: "🎓" },
              { number: "2", title: "Trust Building", desc: "Relationship & understanding", icon: "🤝" },
              { number: "3", title: "Readiness", desc: "Opportunity identification", icon: "🔍" },
            ]
          },
          {
            label: "Deliver Impact",
            stages: [
              { number: "4", title: "Implementation", desc: "AI integration projects", icon: "⚙️" },
              { number: "5", title: "Scale", desc: "Automation & expansion", icon: "🚀" },
            ]
          }
        ]
      },

      // ── Strategic Value ──
      {
        type: "callout",
        text: "We treat AI adoption not as a technology project, but as a holistic transformation - combining people, processes, and technology to maximise long-term client impact.",
        attribution: "Strategic Value"
      },
    ]
  },
  {
    id: "revenue",
    title: "Revenue Model & Growth Targets",
    overline: "Slide 4 of 8",
    subtitle: "Project-based consulting revenue, margin structure, and 2026/2027 growth roadmap.",
    blocks: [
      // -- Revenue Generation Model --
      { type: "section-heading", text: "Revenue Generation Model" },
      {
        type: "paragraph",
        text: "We operate a project-based consulting and implementation model, proven through our German market experience. Pricing is based on daily consulting and development rates."
      },
      { type: "section-heading", text: "Proven Rates - Based on German Market Experience" },
      {
        type: "kpi-grid",
        items: [
          { value: "\u20AC1,500-2,000", label: "Daily Rate", sublabel: "Current German market rate" },
          { value: "\u20AC15k+", label: "Entry Engagements", sublabel: "Typical starting projects in DE" },
          { value: "\u20AC100k+", label: "Large Projects", sublabel: "Full implementation scope in DE" },
        ]
      },
      {
        type: "kpi-highlight",
        value: "Recurring",
        label: "Follow-Up Projects",
        sublabel: "Clients frequently expand AI adoption across departments"
      },
      {
        type: "bullets",
        heading: "Project-Based Offer Structure",
        items: [
          "Defined maximum project hour allocation with transparent cost ceiling",
          "Timesheet-based tracking - billing only for actual hours used",
          "Tailored proposals based on project complexity and delivery scope",
          "Clear ROI evaluation capability based on project outcomes",
          "Workshops serve as strategic entry points for long-term partnerships",
        ]
      },

      // -- Margin Structure --
      { type: "section-heading", text: "Margin & Business Economics" },
      {
        type: "paragraph",
        text: "Our model is time-based at its core - but AI-driven productivity allows us to scale output far beyond traditional consulting. Licences, tools, and API costs are billed directly to clients."
      },
      {
        type: "bullets",
        items: [
          "Core cost structure is primarily consulting and development time",
          "Limited fixed infrastructure requirements",
          "Strong contribution margins driven by expertise-based delivery",
          "AI-augmented delivery enables disproportionate output per consultant",
        ]
      },

      // -- Growth Roadmap --
      { type: "section-heading", text: "Growth Roadmap" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "2026 - Market Entry & Validation",
          subtitle: "Revenue Target: \u20AC150,000",
          bullets: [
            "Establish market presence in Italy",
            "Acquire first client projects",
            "Validate positioning and service offering",
            "Build local network and partnerships",
            "Develop initial market reputation",
          ]
        },
        right: {
          title: "2027 - Market Expansion & Scaling",
          subtitle: "Revenue Target: \u20AC1.5 Million",
          bullets: [
            "Expand client portfolio",
            "Strengthen brand credibility and trust",
            "Increase recurring and follow-up projects",
            "Develop structured acquisition processes",
            "Identify industry-specific AI solution patterns",
          ]
        }
      },

      // -- Scaling Strategy --
      { type: "section-heading", text: "Scaling Strategy" },
      {
        type: "bullets",
        items: [
          "Leveraging existing delivery resources from Germany",
          "Integrating trained AI talent from internal programmes (e.g. AI Master participants)",
          "Expanding local delivery capacity as market traction increases",
          "Building repeatable AI implementation frameworks across verticals",
        ]
      },

      // -- Positioning --
      {
        type: "callout",
        text: "EE-Partner combines high-margin expertise consulting with scalable implementation delivery. AI-powered productivity turns a time-based model into a genuinely scalable business.",
        attribution: "Strategic Positioning"
      },
    ]
  },
  {
    id: "track-record",
    title: "Track Record & Existing Ventures",
    overline: "Slide 5 of 8",
    subtitle: "Proven AI enablement and implementation experience through SH&Partner and Asuno.",
    blocks: [
      // -- Intro --
      {
        type: "callout",
        text: "EE-Partner builds on proven AI enablement and implementation experience through SH&Partner and Asuno - combining market education, delivery capability, and partnership-driven growth."
      },

      // -- Two Ventures Side by Side --
      { type: "section-heading", text: "Founding Ventures" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "SH&Partner",
          subtitle: "AI Enablement & Market Development - Founded 2024",
          bullets: [
            "AI enablement workshops and training programmes",
            "Organisational AI readiness development",
            "Change management and employee adoption strategies",
            "AI productivity optimisation across business functions",
            "Grown to an eight-person team with early German market presence",
          ]
        },
        right: {
          title: "Asuno",
          subtitle: "AI Implementation & Automation - Based in Singapore",
          bullets: [
            "Three complementary founders: business, automation, AI development",
            "Extended team of experienced software developers and specialists",
            "End-to-end delivery of complex automation and AI projects",
            "Partnership-driven acquisition through PE firms and consulting companies",
            "Systematic vertical expansion into industry-specific solutions",
          ]
        }
      },

      // -- Asuno Traction --
      { type: "section-heading", text: "Asuno - Growth & Market Traction" },
      {
        type: "kpi-grid",
        items: [
          { value: "\u20AC2M", label: "2026 Revenue Target", sublabel: "Targeted objective for Asuno" },
          { value: "Strong", label: "Client Traction", sublabel: "Accelerating since late 2025" },
          { value: "PE & Consulting", label: "Partner Channels", sublabel: "Portfolio company introductions" },
        ]
      },
      {
        type: "paragraph",
        text: "Asuno delivers service-based implementation engagements with strong margins. Strategic partnerships with PE firms and consulting companies open doors to portfolio companies - significantly reducing acquisition cost."
      },

      // -- Capability Bridge --
      { type: "section-heading", text: "Strategic Relevance for EE-Partner" },
      {
        type: "flow",
        stages: [
          { number: "Venture 1", title: "SH&Partner", desc: "AI Enablement & Market Education" },
          { number: "Venture 2", title: "Asuno", desc: "AI Implementation & Technical Delivery" },
          { number: "Combined", title: "EE-Partner", desc: "Integrated Market Expansion Platform", highlight: true },
        ]
      },
      {
        type: "bullets",
        heading: "Combined Strategic Foundation",
        items: [
          "Proven client acquisition approaches and partnership-driven scaling",
          "Validated AI enablement and implementation frameworks",
          "Cross-industry implementation experience",
          "Established international delivery capabilities",
          "Operational foundation for Italian SME market expansion",
        ]
      },
    ]
  },
  {
    id: "italy-entry",
    title: "Italian Market Entry Strategy",
    overline: "Slide 6 of 8",
    subtitle: "Network-driven growth, pilot-based learning, and systematic industry scaling.",
    blocks: [
      // -- Positioning --
      {
        type: "callout",
        text: "EE-Partner enters the Italian market through network-driven growth, pilot-based learning, and systematic industry scaling - leveraging what we've already proven in Germany."
      },

      // -- Market Entry Flow --
      {
        type: "journey",
        heading: "Market Entry Journey",
        description: "A structured six-stage approach - from leveraging our existing network to building lasting strategic partnerships in the Italian market.",
        groups: [
          {
            label: "Enter & Learn",
            stages: [
              { number: "1", title: "Network & Partnerships", desc: "Leverage existing relationships", icon: "🔗" },
              { number: "2", title: "Pilot Projects", desc: "Initial client engagements", icon: "🧪" },
              { number: "3", title: "Market Understanding", desc: "Industry dynamics & learning", icon: "📊" },
            ]
          },
          {
            label: "Validate & Scale",
            stages: [
              { number: "4", title: "Industry Validation", desc: "Use case clustering", icon: "✅" },
              { number: "5", title: "Systematic Scaling", desc: "Vertical expansion", icon: "📈" },
              { number: "6", title: "Strategic Partnerships", desc: "Long-term relationships", icon: "🤝" },
            ]
          }
        ]
      },

      // -- Core Principles --
      { type: "section-heading", text: "Core Market Entry Principles" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "1. Leveraging Existing Networks",
          subtitle: "Partnership-driven introductions as primary acquisition channel.",
          bullets: [
            "Industry partnerships and consulting collaborations",
            "Investor and private equity connections",
            "Local business networks",
            "Relationship-based trust building",
          ]
        },
        right: {
          title: "2. Reputation Through Execution",
          subtitle: "Credibility through demonstrable client outcomes.",
          bullets: [
            "Delivering high-impact pilot projects",
            "Creating measurable client value",
            "Generating long-term strategic partnerships",
            "Building market credibility through proven results",
          ]
        }
      },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "3. Pilots as Market Learning",
          subtitle: "Early engagements as structured learning opportunities.",
          bullets: [
            "Understand local industry dynamics",
            "Identify high-impact AI use cases",
            "Refine service positioning",
            "Adapt delivery frameworks to Italian business culture",
          ]
        },
        right: {
          title: "4. Systematic Industry Expansion",
          subtitle: "Structured vertical expansion once insight is achieved.",
          bullets: [
            "Identify high-impact use case clusters",
            "Develop repeatable solution frameworks",
            "Expand industry-specific partnerships",
            "Scale client acquisition within validated sectors",
          ]
        }
      },

      // -- Founder Advantage --
      { type: "section-heading", text: "Founders' Competitive Advantage" },
      {
        type: "paragraph",
        text: "Our key advantage: we've already built and scaled this model in Germany. The playbook is validated - what remains is adapting it to Italian business culture."
      },
      {
        type: "bullets",
        items: [
          "Proven market entry blueprint from German AI transformation market",
          "Deep understanding of organisational AI transformation challenges",
          "Validated implementation methodologies",
          "Existing technical delivery infrastructure and capabilities",
        ]
      },

      // -- Strategic Summary --
      {
        type: "callout",
        text: "We bring proven frameworks, existing delivery infrastructure, and international experience - enabling us to replicate a successful AI adoption model efficiently within the Italian SME market.",
        attribution: "Strategic Execution Advantage"
      },
    ]
  },
  {
    id: "advisory-board",
    title: "Advisory Board Collaboration Model",
    overline: "Slide 7 of 8",
    subtitle: "A strategic partnership built on trust, open exchange, and long-term value creation.",
    blocks: [
      // -- Philosophy --
      {
        type: "callout",
        text: "We see our advisory board as a genuine strategic partnership - professional, efficient, and personally rewarding. It's about real sparring, real impact, and mutual value. Prof. De Mauro, we see exactly this potential in you and believe your expertise and network would be a strong addition to our board.",
      },

      // -- Role & Criteria side by side --
      { type: "section-heading", text: "Role & Selection Criteria" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "Advisory Board Role",
          subtitle: "Supporting our development in the Italian market.",
          bullets: [
            "Strategic guidance and market insight",
            "Industry-specific expertise and knowledge sharing",
            "Network access and relationship development",
            "Positioning and credibility building",
            "Sparring partner for growth and scaling decisions",
          ]
        },
        right: {
          title: "Selection Criteria",
          subtitle: "3-4 complementary members with strategic alignment.",
          bullets: [
            "Strong professional network",
            "Deep domain or industry expertise",
            "Market reputation and credibility",
            "Strategic mindset and entrepreneurial understanding",
            "Personal compatibility and shared collaboration values",
          ]
        }
      },

      // -- Compensation --
      { type: "section-heading", text: "Compensation & Incentive Structure" },
      {
        type: "kpi-grid",
        items: [
          { value: "Equity", label: "Minority Participation", sublabel: "Aligned with long-term company success" },
          { value: "10%", label: "Founder Referral Fee", sublabel: "On project revenue from introduced leads" },
          { value: "3-4", label: "Advisory Members", sublabel: "Targeted board composition" },
        ]
      },
      {
        type: "paragraph",
        text: "Each advisory board member receives a minority equity stake. The exact allocation depends on board size, level of involvement, and long-term contribution."
      },

      // -- Collaboration Model --
      { type: "section-heading", text: "Collaboration & Communication" },
      {
        type: "two-col",
        variant: "card",
        left: {
          title: "Engagement Format",
          bullets: [
            "Regular strategic exchange meetings",
            "Flexible, on-demand sparring discussions",
            "Involvement in selected strategic initiatives",
            "Informal and efficient communication channels",
          ]
        },
        right: {
          title: "Cultural Principles",
          bullets: [
            "Strategically valuable and economically beneficial",
            "Personally rewarding and trust-based",
            "Transparent and time-respectful",
            "No unnecessary formal structures",
          ]
        }
      },

      // -- Closing --
      {
        type: "callout",
        text: "We're building a board that actively shapes the company - not a decorative title, but a real partnership with strategic, economic, and personal upside.",
        attribution: "Advisory Board Vision"
      },
    ]
  },
  {
    id: "closing",
    title: "Next Steps",
    overline: "Slide 8 of 8",
    subtitle: "How we move forward together.",
    blocks: [
      {
        type: "flow",
        stages: [
          { number: "Step 1", title: "Initial Meeting", desc: "Explore alignment & mutual fit" },
          { number: "Step 2", title: "Trial Collaboration", desc: "Test the working dynamic" },
          { number: "Step 3", title: "Advisory Board Meeting", desc: "Full board in Rome/Milan" },
        ]
      },
      { type: "section-heading", text: "Proposed Path Forward" },
      {
        type: "bullets",
        items: [
          "Schedule an initial meeting to discuss overlaps, shared interests, and collaboration potential",
          "Evaluate mutual fit and ensure the partnership works well for everyone involved",
          "Begin a trial collaboration phase to test the working dynamic in practice",
          "Convene a full advisory board meeting in Rome or Milan - bringing all members together to get to know each other, brainstorm, and drive the company forward",
        ]
      },
      {
        type: "callout",
        text: "We look forward to exploring this opportunity together, Prof. De Mauro, and to building something meaningful for the Italian market.",
      }
    ]
  }
];


// ─── State ───────────────────────────────────────────────────
const STATE = {
  currentSlide: 0,
  ndaConfirmed: false,
  ndaData: null,       // { name, date, signature? }
  totalSlides: SLIDES.length,
};

const NDA_STORAGE_KEY = "ee_partner_nda_confirmed";

// ─── DOM references ──────────────────────────────────────────
const $stepper       = document.getElementById("stepper");
const $slideContainer= document.getElementById("slide-container");
const $btnPrev       = document.getElementById("btn-prev");
const $btnNext       = document.getElementById("btn-next");
const $navCurrent    = document.getElementById("nav-current");
const $navTotal      = document.getElementById("nav-total");
const $ndaOverlay    = document.getElementById("nda-overlay");
const $mobileProgress= document.getElementById("mobile-progress");


// ─── Initialization ──────────────────────────────────────────
function init() {
  loadNdaStatus();
  renderStepper();
  renderAllSlides();
  updateNavigation();
  bindEvents();
  goToSlide(0);
}

function loadNdaStatus() {
  // NDA must be signed fresh every session - no persistence
  STATE.ndaConfirmed = false;
  STATE.ndaData = null;
}

function saveNdaStatus(name) {
  const data = {
    confirmed: true,
    name: name,
    date: new Date().toISOString(),
  };
  STATE.ndaConfirmed = true;
  STATE.ndaData = data;
  // Session only - no localStorage persistence
}


// ─── Stepper ─────────────────────────────────────────────────
function renderStepper() {
  const logo = document.createElement("div");
  logo.className = "stepper__logo";
  logo.innerHTML = '<img src="assets/logo.png" alt="EE-Partner" class="stepper__logo-img" />';
  logo.style.cursor = "pointer";
  logo.addEventListener("click", () => goToSlide(0));

  const list = document.createElement("ul");
  list.className = "stepper__list";

  SLIDES.forEach((slide, i) => {
    const li = document.createElement("li");
    li.className = "stepper__item";
    li.dataset.index = i;

    const num = document.createElement("span");
    num.className = "stepper__number";
    num.textContent = i + 1;

    const label = document.createElement("span");
    label.className = "stepper__label";
    label.textContent = slide.stepperTitle || slide.title;

    li.appendChild(num);
    li.appendChild(label);
    list.appendChild(li);
  });

  $stepper.innerHTML = "";
  $stepper.appendChild(logo);
  $stepper.appendChild(list);
}

function updateStepper() {
  const items = $stepper.querySelectorAll(".stepper__item");
  items.forEach((item, i) => {
    item.classList.remove("stepper__item--active", "stepper__item--completed", "stepper__item--locked");

    if (i === STATE.currentSlide) {
      item.classList.add("stepper__item--active");
    } else if (i > 0 && !STATE.ndaConfirmed) {
      item.classList.add("stepper__item--locked");
    } else if (i < STATE.currentSlide) {
      item.classList.add("stepper__item--completed");
    }
  });
}


// ─── Slide Rendering ─────────────────────────────────────────
function renderAllSlides() {
  $slideContainer.innerHTML = "";
  SLIDES.forEach((slide, i) => {
    const el = createSlideElement(slide, i);
    $slideContainer.appendChild(el);
  });
  $navTotal.textContent = STATE.totalSlides;
}

function createSlideElement(slide, index) {
  const div = document.createElement("div");
  div.className = "slide";
  if (slide.cssClass) div.classList.add(slide.cssClass);
  div.dataset.index = index;
  div.id = `slide-${slide.id}`;

  const inner = document.createElement("div");
  inner.className = "slide__inner";

  // Header
  if (slide.overline) {
    const overline = document.createElement("div");
    overline.className = "slide__overline";
    overline.textContent = slide.overline;
    inner.appendChild(overline);
  }

  if (slide.title) {
    const title = document.createElement("h1");
    title.className = "slide__title";
    title.textContent = slide.title;
    inner.appendChild(title);
  }

  if (slide.subtitle) {
    const sub = document.createElement("p");
    sub.className = "slide__subtitle";
    sub.textContent = slide.subtitle;
    inner.appendChild(sub);
  }

  if (slide.secondarySubtitle) {
    const sub2 = document.createElement("p");
    sub2.className = "slide__subtitle slide__subtitle--secondary";
    sub2.textContent = slide.secondarySubtitle;
    inner.appendChild(sub2);
  }

  if (slide.recipient) {
    const recip = document.createElement("div");
    recip.className = "slide__recipient";
    recip.innerHTML = `<span class="slide__recipient-label">Prepared for</span><span class="slide__recipient-name">${escapeHtml(slide.recipient)}</span>`;
    inner.appendChild(recip);
  }

  // Divider (skip for title/closing slides)
  if (!slide.cssClass || (!slide.cssClass.includes("title-slide") && !slide.cssClass.includes("closing-slide"))) {
    const divider = document.createElement("div");
    divider.className = "slide__divider";
    inner.appendChild(divider);
  }

  // Body
  const body = document.createElement("div");
  body.className = "slide__body";

  if (slide.blocks) {
    slide.blocks.forEach(block => {
      body.appendChild(renderBlock(block));
    });
  }

  inner.appendChild(body);
  div.appendChild(inner);
  return div;
}


// ─── Block Renderers ─────────────────────────────────────────
function renderBlock(block) {
  switch (block.type) {
    case "callout":       return renderCallout(block);
    case "kpi-grid":      return renderKpiGrid(block);
    case "kpi-highlight": return renderKpiHighlight(block);
    case "two-col":       return renderTwoCol(block);
    case "bullets":       return renderBullets(block);
    case "flow":          return renderFlow(block);
    case "journey":       return renderJourney(block);
    case "section-heading": return renderSectionHeading(block);
    case "paragraph":     return renderParagraph(block);
    case "compare-bars":  return renderCompareBars(block);
    case "tags":          return renderTags(block);
    case "nda-form":      return renderNdaForm();
    case "nda-text":      return renderNdaText(block);
    case "html":          return renderHtml(block);
    case "cta-btn":       return renderCtaBtn(block);
    default:
      const empty = document.createElement("div");
      empty.textContent = `[Unknown block type: ${block.type}]`;
      return empty;
  }
}

function renderCallout(block) {
  const div = document.createElement("div");
  div.className = "callout";
  const text = document.createElement("p");
  text.className = "callout__text";
  text.textContent = block.text;
  div.appendChild(text);
  if (block.attribution) {
    const attr = document.createElement("p");
    attr.className = "callout__attribution";
    attr.textContent = block.attribution;
    div.appendChild(attr);
  }
  return div;
}

function renderKpiGrid(block) {
  const grid = document.createElement("div");
  grid.className = "kpi-grid";
  block.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "kpi-card";

    const val = document.createElement("div");
    val.className = "kpi-card__value";
    val.textContent = item.value;

    const label = document.createElement("div");
    label.className = "kpi-card__label";
    label.textContent = item.label;

    card.appendChild(val);
    card.appendChild(label);

    if (item.sublabel) {
      const sub = document.createElement("div");
      sub.className = "kpi-card__sublabel";
      sub.textContent = item.sublabel;
      card.appendChild(sub);
    }

    grid.appendChild(card);
  });
  return grid;
}

function renderKpiHighlight(block) {
  const el = document.createElement("div");
  el.className = "kpi-highlight";

  const val = document.createElement("div");
  val.className = "kpi-highlight__value";
  val.textContent = block.value;

  const label = document.createElement("div");
  label.className = "kpi-highlight__label";
  label.textContent = block.label;

  const text = document.createElement("div");
  text.className = "kpi-highlight__text";

  text.appendChild(val);
  text.appendChild(label);
  el.appendChild(text);

  if (block.sublabel) {
    const sub = document.createElement("div");
    sub.className = "kpi-highlight__sublabel";
    sub.textContent = block.sublabel;
    el.appendChild(sub);
  }

  return el;
}

function renderTwoCol(block) {
  const grid = document.createElement("div");
  grid.className = "two-col";

  [block.left, block.right].forEach((col, i) => {
    const colDiv = document.createElement("div");
    colDiv.className = "two-col__block";
    if (block.variant) colDiv.classList.add("two-col__block--" + block.variant);

    const h3 = document.createElement("h3");
    h3.textContent = col.title;
    colDiv.appendChild(h3);

    if (col.subtitle) {
      const sub = document.createElement("p");
      sub.className = "two-col__subtitle";
      sub.textContent = col.subtitle;
      colDiv.appendChild(sub);
    }

    if (col.content) {
      const p = document.createElement("p");
      p.textContent = col.content;
      colDiv.appendChild(p);
    }

    if (col.bullets) {
      const ul = document.createElement("ul");
      ul.className = "bullet-list";
      col.bullets.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
      });
      colDiv.appendChild(ul);
    }

    grid.appendChild(colDiv);
  });

  return grid;
}

function renderBullets(block) {
  const wrapper = document.createElement("div");
  if (block.heading) {
    const h = document.createElement("h3");
    h.className = "section-heading";
    h.textContent = block.heading;
    wrapper.appendChild(h);
  }
  const ul = document.createElement("ul");
  ul.className = "bullet-list";
  block.items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
  wrapper.appendChild(ul);
  return wrapper;
}

function renderFlow(block) {
  const container = document.createElement("div");
  container.className = "flow";

  block.stages.forEach((stage, i) => {
    const stageEl = document.createElement("div");
    stageEl.className = "flow__stage" + (stage.highlight ? " flow__stage--highlight" : "");

    if (stage.number) {
      const num = document.createElement("div");
      num.className = "flow__stage-number";
      num.textContent = stage.number;
      stageEl.appendChild(num);
    }

    const title = document.createElement("div");
    title.className = "flow__stage-title";
    title.textContent = stage.title;
    stageEl.appendChild(title);

    if (stage.desc) {
      const desc = document.createElement("div");
      desc.className = "flow__stage-desc";
      desc.textContent = stage.desc;
      stageEl.appendChild(desc);
    }

    container.appendChild(stageEl);

    // Arrow between stages
    if (i < block.stages.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "flow__arrow";
      arrow.innerHTML = '<svg viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      container.appendChild(arrow);
    }
  });

  return container;
}

function renderJourney(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "journey";

  // Header area
  const header = document.createElement("div");
  header.className = "journey__header";
  const heading = document.createElement("h3");
  heading.className = "journey__heading";
  heading.textContent = block.heading;
  header.appendChild(heading);
  if (block.description) {
    const desc = document.createElement("p");
    desc.className = "journey__desc";
    desc.textContent = block.description;
    header.appendChild(desc);
  }
  wrapper.appendChild(header);

  // Timeline area
  const timeline = document.createElement("div");
  timeline.className = "journey__timeline";

  // Flatten all stages for the track
  const allStages = block.groups.flatMap(g => g.stages);

  // Track line
  const track = document.createElement("div");
  track.className = "journey__track";
  timeline.appendChild(track);

  // Groups
  const groupsRow = document.createElement("div");
  groupsRow.className = "journey__groups";

  block.groups.forEach((group, gi) => {
    const groupEl = document.createElement("div");
    groupEl.className = "journey__group";

    // Group label
    const groupLabel = document.createElement("div");
    groupLabel.className = "journey__group-label";
    groupLabel.textContent = group.label;
    groupEl.appendChild(groupLabel);

    // Stages in this group
    const stagesRow = document.createElement("div");
    stagesRow.className = "journey__stages";

    group.stages.forEach((stage) => {
      const stageEl = document.createElement("div");
      stageEl.className = "journey__stage";

      const node = document.createElement("div");
      node.className = "journey__node";

      const circle = document.createElement("div");
      circle.className = "journey__circle";
      circle.textContent = stage.number;
      node.appendChild(circle);

      if (stage.icon) {
        const icon = document.createElement("div");
        icon.className = "journey__icon";
        icon.textContent = stage.icon;
        node.appendChild(icon);
      }

      stageEl.appendChild(node);

      const info = document.createElement("div");
      info.className = "journey__info";
      const title = document.createElement("div");
      title.className = "journey__stage-title";
      title.textContent = stage.title;
      info.appendChild(title);
      if (stage.desc) {
        const d = document.createElement("div");
        d.className = "journey__stage-desc";
        d.textContent = stage.desc;
        info.appendChild(d);
      }
      stageEl.appendChild(info);
      stagesRow.appendChild(stageEl);
    });

    groupEl.appendChild(stagesRow);
    groupsRow.appendChild(groupEl);
  });

  timeline.appendChild(groupsRow);
  wrapper.appendChild(timeline);
  return wrapper;
}

function renderSectionHeading(block) {
  const h = document.createElement("h3");
  h.className = "section-heading";
  h.textContent = block.text;
  return h;
}

function renderParagraph(block) {
  const p = document.createElement("p");
  p.className = "slide-paragraph";
  p.textContent = block.text;
  return p;
}

function renderCompareBars(block) {
  const wrapper = document.createElement("div");
  wrapper.className = "compare-bars";

  // Find max value for scaling
  const maxVal = Math.max(...block.items.map(item => item.value));

  block.items.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "compare-bars__row";

    const label = document.createElement("div");
    label.className = "compare-bars__label";
    label.textContent = item.label;

    const trackWrap = document.createElement("div");
    trackWrap.className = "compare-bars__track-wrap";

    const track = document.createElement("div");
    track.className = "compare-bars__track";

    const fill = document.createElement("div");
    fill.className = "compare-bars__fill";
    if (i === 0) fill.classList.add("compare-bars__fill--primary");
    const pct = item.value; // raw percentage value for visual width
    fill.dataset.target = pct + "%";
    fill.style.width = "0%";

    const valSpan = document.createElement("span");
    valSpan.className = "compare-bars__value";
    valSpan.textContent = item.value + (item.suffix || "");

    track.appendChild(fill);
    trackWrap.appendChild(track);
    trackWrap.appendChild(valSpan);

    const note = document.createElement("div");
    note.className = "compare-bars__note";
    note.textContent = item.note || "";

    row.appendChild(label);
    row.appendChild(trackWrap);
    if (item.note) row.appendChild(note);

    wrapper.appendChild(row);
  });

  if (block.caption) {
    const caption = document.createElement("p");
    caption.className = "compare-bars__caption";
    caption.textContent = block.caption;
    wrapper.appendChild(caption);
  }

  return wrapper;
}

function renderTags(block) {
  const div = document.createElement("div");
  div.className = "tag-list";
  block.items.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    div.appendChild(span);
  });
  return div;
}

function renderNdaText(block) {
  const div = document.createElement("div");
  div.className = "nda-text";
  div.innerHTML = block.html;
  return div;
}

function renderHtml(block) {
  const div = document.createElement("div");
  div.innerHTML = block.html;
  return div;
}

function renderCtaBtn(block) {
  const btn = document.createElement("button");
  btn.className = "cta-btn";
  btn.textContent = block.text;
  if (block.href) {
    btn.addEventListener("click", () => window.open(block.href, "_blank"));
  }
  return btn;
}


// ─── NDA Form ────────────────────────────────────────────────
function renderNdaForm() {
  const form = document.createElement("div");
  form.className = "nda-form";
  form.id = "nda-form";

  if (STATE.ndaConfirmed) {
    form.innerHTML = `
      <div class="nda-form__confirmed">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#059669"/><path d="M7 11.5L9.5 14L15 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        NDA confirmed by ${escapeHtml(STATE.ndaData.name)} on ${new Date(STATE.ndaData.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </div>
    `;
    return form;
  }

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  form.innerHTML = `
    <div class="nda-form__checkbox-row">
      <input type="checkbox" id="nda-agree" />
      <label class="nda-form__checkbox-label" for="nda-agree">
        I confirm that I have read and agree to the confidentiality terms.
      </label>
    </div>
    <div class="nda-form__field">
      <label class="nda-form__label" for="nda-name">Full Name *</label>
      <input class="nda-form__input" type="text" id="nda-name" placeholder="Enter your full name" autocomplete="name" />
    </div>
    <div class="nda-form__date">Date: ${today}</div>
    <div class="nda-form__field">
      <label class="nda-form__signature-label">Signature (optional)</label>
      <canvas class="nda-form__signature-pad" id="nda-signature" width="480" height="80"></canvas>
      <div class="nda-form__signature-hint">Draw your signature above, or leave blank.</div>
    </div>
    <button class="nda-form__btn" id="nda-confirm-btn" disabled>
      Confirm &amp; Continue
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  `;

  // Defer event binding until DOM is ready
  requestAnimationFrame(() => initNdaFormEvents());

  return form;
}

function initNdaFormEvents() {
  const checkbox = document.getElementById("nda-agree");
  const nameInput = document.getElementById("nda-name");
  const confirmBtn = document.getElementById("nda-confirm-btn");
  const signatureCanvas = document.getElementById("nda-signature");

  if (!checkbox || !nameInput || !confirmBtn) return;

  function validateForm() {
    const valid = checkbox.checked && nameInput.value.trim().length >= 2;
    confirmBtn.disabled = !valid;
  }

  checkbox.addEventListener("change", validateForm);
  nameInput.addEventListener("input", validateForm);

  confirmBtn.addEventListener("click", () => {
    if (confirmBtn.disabled) return;
    saveNdaStatus(nameInput.value.trim());
    // Re-render the NDA form to show confirmed state
    const formEl = document.getElementById("nda-form");
    if (formEl) {
      formEl.innerHTML = `
        <div class="nda-form__confirmed">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#059669"/><path d="M7 11.5L9.5 14L15 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          NDA confirmed by ${escapeHtml(STATE.ndaData.name)} on ${new Date(STATE.ndaData.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      `;
    }
    updateStepper();
    updateNavigation();
    updateNdaOverlay();
    // Auto-advance to next slide
    setTimeout(() => goToSlide(1), 600);
  });

  // Signature pad drawing
  if (signatureCanvas) {
    initSignaturePad(signatureCanvas);
  }
}

function initSignaturePad(canvas) {
  const ctx = canvas.getContext("2d");
  let drawing = false;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function startDraw(e) {
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault();
  }

  function draw(e) {
    if (!drawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    e.preventDefault();
  }

  function endDraw() {
    drawing = false;
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseleave", endDraw);
  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", endDraw);
}


// ─── Navigation ──────────────────────────────────────────────
function goToSlide(index) {
  if (index < 0 || index >= STATE.totalSlides) return;
  // Block navigation past NDA if not confirmed
  if (index > 0 && !STATE.ndaConfirmed) return;

  const prevIndex = STATE.currentSlide;
  STATE.currentSlide = index;

  const slides = $slideContainer.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("slide--active", "slide--exit-left", "slide--blurred");
    if (i === index) {
      slide.classList.add("slide--active");
      // Reset scroll position
      slide.scrollTop = 0;
      // Re-trigger compare-bar animations
      animateCompareBars(slide);
    } else if (i > 0 && !STATE.ndaConfirmed) {
      slide.classList.add("slide--blurred");
    }
  });

  updateStepper();
  updateNavigation();
  updateNdaOverlay();
  updateMobileProgress();
}

function animateCompareBars(slideEl) {
  const fills = slideEl.querySelectorAll(".compare-bars__fill");
  fills.forEach(fill => {
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = fill.dataset.target || "0%";
      });
    });
  });
}

function nextSlide() {
  goToSlide(STATE.currentSlide + 1);
}

function prevSlide() {
  goToSlide(STATE.currentSlide - 1);
}

function updateNavigation() {
  $navCurrent.textContent = STATE.currentSlide + 1;
  $btnPrev.disabled = STATE.currentSlide === 0;

  // Disable next if on first slide and NDA not confirmed, or on last slide
  if (STATE.currentSlide === STATE.totalSlides - 1) {
    $btnNext.disabled = true;
  } else if (STATE.currentSlide === 0 && !STATE.ndaConfirmed) {
    $btnNext.disabled = true;
  } else {
    $btnNext.disabled = false;
  }
}

function updateNdaOverlay() {
  // Show overlay only when on slide > 0 and NDA not confirmed
  // In practice, navigation is blocked, but this is a safety net
  if (STATE.currentSlide > 0 && !STATE.ndaConfirmed) {
    $ndaOverlay.classList.remove("hidden");
  } else {
    $ndaOverlay.classList.add("hidden");
  }
}

function updateMobileProgress() {
  const pct = ((STATE.currentSlide + 1) / STATE.totalSlides) * 100;
  $mobileProgress.style.setProperty("--progress-pct", pct + "%");
  const bar = $mobileProgress.querySelector(".mobile-progress-bar");
  if (bar) bar.style.setProperty("--progress-pct", pct + "%");
  const label = $mobileProgress.querySelector(".mobile-progress-label");
  if (label) label.textContent = `${STATE.currentSlide + 1}/${STATE.totalSlides}`;
}


// ─── Event Binding ───────────────────────────────────────────
function bindEvents() {
  $btnNext.addEventListener("click", nextSlide);
  $btnPrev.addEventListener("click", prevSlide);

  // Mobile logo → go to first slide
  const mobileLogo = $mobileProgress.querySelector(".mobile-progress__logo");
  if (mobileLogo) {
    mobileLogo.style.cursor = "pointer";
    mobileLogo.addEventListener("click", () => goToSlide(0));
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevSlide();
    }
  });

  // Stepper click navigation
  $stepper.addEventListener("click", (e) => {
    const item = e.target.closest(".stepper__item");
    if (!item) return;
    const index = parseInt(item.dataset.index, 10);
    if (isNaN(index)) return;
    // Allow clicking to NDA slide always, others only if confirmed
    if (index === 0 || STATE.ndaConfirmed) {
      goToSlide(index);
    }
  });
}


// ─── Utilities ───────────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}


// ─── Boot ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
