/** Single source of site copy for Imperium Business Intelligence Ltd. */

export const site = {
  name: "Imperium BI",
  legalName: "Imperium Business Intelligence Ltd",
  companyNo: "12077518",
  domain: "imperium-bi.co.uk",
  email: "andrew.hoyle@imperium-bi.co.uk",
  phone: "+447860575576",
  phoneDisplay: "07860 575 576",
  linkedin: "https://www.linkedin.com/in/andrew-hoyle-625378129",
  address: "29 Cliffe Avenue, Margate, Kent CT9 5DU",
  hero: {
    eyebrow: "Finance · BI · AI",
    titleLead: "Finance that runs",
    titleAccent: "itself",
    lead: "CIMA-qualified finance leadership and finance-systems expertise. I own the numbers end to end and rebuild the reporting around them — leaving behind a finance function that runs itself. Plus BI, analytics and AI for teams that need it.",
    sub: "Fractional or interim — senior finance leadership without the full-time hire.",
    availability: "Available now · Fractional, interim or contract",
    quote: "“I make things that as a kid I could only have dreamed of.”",
  },
};

export const nav: { label: string; href: string }[] = [
  { label: "Fractional", href: "/fractional" },
  { label: "Finance", href: "/finance" },
  { label: "Data & BI", href: "/data-bi" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Stat = { stat: string; unit?: string; label: string };
export const stats: Stat[] = [
  { stat: "25", unit: "yr", label: "Finance & BI experience" },
  { stat: "CIMA", label: "ACMA · CGMA qualified" },
  { stat: "1:1", label: "Owner-led delivery" },
  { stat: "UK", label: "Remote-first" },
];

export type Service = {
  key: string;
  name: string;
  sector: string;
  blurb: string;
  detail: { body: string; points: string[] };
};

export const financeServices: Service[] = [
  {
    key: "interimfc",
    name: "Interim Financial Control",
    sector: "Interim",
    blurb:
      "Hands-on FC and Financial Controller cover that owns the numbers end to end — close, management accounts and board reporting.",
    detail: {
      body: "Hands-on interim FC / Financial Controller cover for organisations in transition — a safe pair of hands that owns month-end close, management accounts, budgeting and board reporting from day one.",
      points: [
        "Full ownership of the close and management accounts",
        "Board and stakeholder reporting",
        "Available immediately, inside or outside IR35",
        "25 years across IB product control, SME finance and FP&A",
      ],
    },
  },
  {
    key: "close",
    name: "Month-End Close Automation",
    sector: "Close",
    blurb:
      "Take your close from weeks to days, with reporting that runs itself instead of a report pack and a manual.",
    detail: {
      body: "Most closes are slow because they are manual. I redesign the process and the data behind it so your month-end runs in days, not weeks — and keeps running after I leave.",
      points: [
        "Close taken from weeks to days",
        "Automated reconciliations and reporting",
        "A finance function that runs itself, not a manual",
        "Real, measurable savings through process redesign",
      ],
    },
  },
  {
    key: "fpa",
    name: "FP&A & Forecasting",
    sector: "FP&A",
    blurb:
      "Budgets, forecasts and cashflow the board can actually rely on — built on numbers that reconcile to one source.",
    detail: {
      body: "Budgets, forecasts and cashflow the board can actually rely on — built on a data model where every number reconciles to a single source of truth.",
      points: [
        "Budgeting, forecasting and variance analysis",
        "Driver-based models and scenarios",
        "Cashflow forecasting and liquidity",
        "Reconciles to management and statutory reporting",
      ],
    },
  },
  {
    key: "cashflow",
    name: "Cashflow & Board Reporting",
    sector: "Reporting",
    blurb: "Clear cashflow visibility and board packs that tell the story, not just the figures.",
    detail: {
      body: "Board packs that tell the story, not just the figures — clear cashflow visibility and reporting that gives leadership the confidence to decide.",
      points: [
        "Board and investor reporting packs",
        "Cashflow and working-capital visibility",
        "KPIs tied to the numbers that matter",
        "Designed for the reader, not the accountant",
      ],
    },
  },
  {
    key: "finmodel",
    name: "Finance Data Modelling",
    sector: "Data model",
    blurb:
      "Chart of accounts, cost-centre hierarchy and a semantic layer so management, statutory and operational reporting reconcile.",
    detail: {
      body: "The foundation everything else rests on: a chart of accounts, cost-centre hierarchy and semantic layer designed so management, statutory and operational reporting all reconcile to one source.",
      points: [
        "Chart of accounts and cost-centre design",
        "Semantic layer above the GL",
        "One source of truth across report types",
        "Built in SQL, Power BI and Python",
      ],
    },
  },
  {
    key: "finsystems",
    name: "Finance Systems (ERP/GL)",
    sector: "Systems",
    blurb:
      "SAP and Oracle GL, finance-side UAT and sign-off on upgrades and rollouts — without disrupting the close.",
    detail: {
      body: "Finance-side leadership on system change — SAP and Oracle GL environments, UAT and sign-off on upgrades and rollouts, delivered without disrupting the close.",
      points: [
        "SAP and Oracle GL and reporting environments",
        "Finance-side UAT and sign-off",
        "Upgrades and rollouts managed around the close",
        "Requirements that reflect how finance actually works",
      ],
    },
  },
  {
    key: "controls",
    name: "Controls & Reconciliation",
    sector: "Controls",
    blurb:
      "Rebuild reporting and reconciliation under pressure — valuation adjustments, sign-offs and controls that hold up.",
    detail: {
      body: "Repeatedly brought in to stabilise and rebuild reporting and reconciliation under regulatory pressure — the origin of the finance-automation specialism.",
      points: [
        "Balance-sheet substantiation and reconciliation",
        "Valuation adjustments and prudent valuation",
        "Quarterly sign-offs and control frameworks",
        "Rebuilt processes that hold up under scrutiny",
      ],
    },
  },
  {
    key: "statutory",
    name: "Statutory & Regulatory Reporting",
    sector: "Compliance",
    blurb:
      "Statutory accounts and regulatory submissions (PRA/FSA, UK & US GAAP) delivered accurately and on time.",
    detail: {
      body: "Statutory accounts and regulatory submissions delivered accurately and on time — PRA and FSA submissions under UK and US GAAP, with the controls to back them.",
      points: [
        "Statutory accounts and disclosures",
        "Regulatory submissions (PRA / FSA)",
        "UK and US GAAP",
        "Audit-ready supporting evidence",
      ],
    },
  },
];

export const dataServices: Service[] = [
  {
    key: "reporting",
    name: "BI Dashboards & Reporting",
    sector: "Reporting",
    blurb:
      "Interactive Power BI and Tableau dashboards that put the right numbers in front of the right people, refreshed automatically.",
    detail: {
      body: "We design interactive dashboards in Power BI or Tableau that turn scattered spreadsheets and system exports into a single, always-current view of your business.",
      points: [
        "Executive and operational dashboards",
        "Automated daily/weekly refresh",
        "Drill-down from KPI to detail",
        "Mobile-friendly and shareable",
      ],
    },
  },
  {
    key: "pipelines",
    name: "Data Pipelines & Warehousing",
    sector: "Data engineering",
    blurb:
      "Reliable ETL and data models that bring your systems together into one trusted source of truth.",
    detail: {
      body: "We build the plumbing behind good reporting: reliable ETL processes and data models that bring your systems together into one trusted source of truth.",
      points: [
        "ETL / ELT pipelines from your systems",
        "A clean, well-modelled data warehouse",
        "Scheduled, monitored and alerting",
        "Documented and maintainable",
      ],
    },
  },
  {
    key: "analytics",
    name: "Analytics & Insight",
    sector: "Analytics",
    blurb: "Turning raw data into forecasts, KPIs and clear answers that drive better decisions.",
    detail: {
      body: "Beyond reporting what happened, we help you understand why — and what is likely to happen next. Forecasts, KPIs and clear answers.",
      points: [
        "KPI definition and performance frameworks",
        "Trend analysis and forecasting",
        "Ad-hoc deep-dives",
        "Plain-English interpretation",
      ],
    },
  },
  {
    key: "cleansing",
    name: "Data Cleansing & Migration",
    sector: "Data quality",
    blurb: "Deduplicating, validating and migrating data so you can trust what you're looking at.",
    detail: {
      body: "Bad data quietly undermines every report built on it. We deduplicate, validate and migrate your data so you can trust what you are looking at.",
      points: [
        "Deduplication and validation rules",
        "Standardising formats and reference data",
        "Safe migration between systems",
        "Ongoing data-quality monitoring",
      ],
    },
  },
  {
    key: "automation",
    name: "Automation & Custom Tools",
    sector: "Software",
    blurb: "Bespoke software and automations that take the manual work out of your reporting.",
    detail: {
      body: "Where off-the-shelf tools fall short, we build bespoke software and automations that take the repetitive, manual work out of your reporting and back-office.",
      points: [
        "Automated report generation and distribution",
        "Bespoke internal tools and web apps",
        "Workflow automation across systems",
        "Built around your process, not a template",
      ],
    },
  },
  {
    key: "aistrategy",
    name: "AI & Data Strategy",
    sector: "Advisory",
    blurb:
      "Practical AI and data-strategy advice, scoped to what actually moves the needle for your business.",
    detail: {
      body: "Practical, vendor-neutral advice on where AI and data investment will actually pay off — and a realistic roadmap to get there.",
      points: [
        "Data and AI opportunity assessment",
        "Prioritised, costed roadmap",
        "Vendor and tooling recommendations",
        "No hype — focused on measurable return",
      ],
    },
  },
  {
    key: "governance",
    name: "Data Strategy & Governance",
    sector: "Governance",
    blurb:
      "Data roadmaps, a defined single source of truth, and governance and UK GDPR compliance you can stand behind.",
    detail: {
      body: "We put the structure in place for data you can rely on and defend: clear ownership, a defined single source of truth, and governance that meets UK GDPR.",
      points: [
        "Data ownership and stewardship model",
        "A defined single source of truth",
        "UK GDPR and compliance alignment",
        "Policies that are practical, not paperwork",
      ],
    },
  },
  {
    key: "training",
    name: "Training & Enablement",
    sector: "Enablement",
    blurb:
      "Power BI and self-service reporting training that gives your team the skills to own their own data.",
    detail: {
      body: "We give your team the skills and confidence to own their own reporting — from Power BI fundamentals to building self-service models.",
      points: [
        "Hands-on Power BI and reporting training",
        "Self-service BI enablement",
        "Tailored to your data and your team",
        "Documentation and ongoing support",
      ],
    },
  },
  {
    key: "managed",
    name: "Managed BI & Support",
    sector: "Support",
    blurb:
      "Ongoing refreshes, monitoring and enhancements on a retainer, so your reporting keeps working as you grow.",
    detail: {
      body: "Reporting is never finished. On a simple retainer we keep everything running — refreshes, monitoring, fixes and enhancements.",
      points: [
        "Proactive monitoring and refresh management",
        "Priority fixes and enhancements",
        "A single point of contact",
        "Flexible, no long lock-in",
      ],
    },
  },
  {
    key: "healthcheck",
    name: "Data Health Check",
    sector: "Assessment",
    blurb:
      "A fixed-scope audit of your current reporting and data, with quick wins and a clear plan for what's next.",
    detail: {
      body: "A fixed-scope, low-commitment way to start. We review your current reporting and data, surface quick wins, and give you a prioritised plan.",
      points: [
        "Review of current reporting and data sources",
        "Quick wins you can act on immediately",
        "A prioritised improvement roadmap",
        "Fixed price, clear deliverable",
      ],
    },
  },
  {
    key: "cloud",
    name: "Cloud Data Platforms",
    sector: "Platform",
    blurb:
      "Modernising and migrating your reporting onto Azure, Microsoft Fabric or the Power Platform — scalable and secure.",
    detail: {
      body: "We modernise and migrate your reporting onto scalable, secure cloud platforms — Azure, Microsoft Fabric or the Power Platform.",
      points: [
        "Migration to Azure / Microsoft Fabric",
        "Power Platform setup and governance",
        "Scalable, secure and cost-managed",
        "A future-proof foundation for analytics",
      ],
    },
  },
  {
    key: "integration",
    name: "System & API Integration",
    sector: "Integration",
    blurb:
      "Connecting your CRM, ERP, finance and line-of-business systems so your data flows without manual re-keying.",
    detail: {
      body: "We connect your CRM, ERP, finance and line-of-business systems through their APIs so data flows automatically between them.",
      points: [
        "API integration between your systems",
        "Automated, two-way data sync",
        "Fewer manual handoffs and errors",
        "Works with the tools you already use",
      ],
    },
  },
];

export type AiItem = { title: string; blurb: string; sector: string };
export const aiItems: AiItem[] = [
  {
    title: "Find the opportunities",
    sector: "Discovery",
    blurb:
      "We audit your data, processes and reporting to identify where AI delivers real, measurable return — not novelty.",
  },
  {
    title: "Build the solution",
    sector: "Delivery",
    blurb:
      "Practical tools — from automated reporting and forecasting to bespoke AI assistants — built on data you can trust.",
  },
  {
    title: "Embed & upskill",
    sector: "Adoption",
    blurb:
      "We integrate AI into your day-to-day workflows and bring your team with it, so the change actually sticks.",
  },
];

export type Engagement = { name: string; tag: string; blurb: string; points: string[] };
export const engagements: Engagement[] = [
  {
    name: "Fractional",
    tag: "Ongoing · a day a week or month",
    blurb:
      "Senior finance leadership on tap — continuously streamlining, automating and keeping the numbers board-ready, without a full-time hire.",
    points: [
      "As little as a day a month, scaled to need",
      "Continuous improvement that compounds",
      "FD-level oversight and board reporting",
      "No recruitment, no full-time overhead",
    ],
  },
  {
    name: "Interim / contract",
    tag: "Defined term · hands-on",
    blurb:
      "Cover for a defined period — stabilise a close, fill a gap, or rebuild reporting and reconciliation under pressure.",
    points: [
      "Immediate, hands-on cover",
      "Inside or outside IR35",
      "Stabilise, rebuild, hand over",
      "A safe pair of hands from day one",
    ],
  },
  {
    name: "Project",
    tag: "Fixed scope · clear deliverable",
    blurb:
      "A specific piece of work — a dashboard, a close redesign, a data model, an automation — with a defined scope and a fixed price.",
    points: [
      "Clear scope and outcome",
      "Fixed price where possible",
      "Delivered, deployed and documented",
      "Adoption baked in",
    ],
  },
];

export const fractionalAdvantages: { title: string; blurb: string }[] = [
  {
    title: "FD-level expertise, a fraction of the cost",
    blurb:
      "25 years and banking-grade rigour for a day a week or month — not a six-figure salary, on-costs and recruitment fees.",
  },
  {
    title: "Flexible commitment",
    blurb:
      "From a day a month to a day a week. Scale up when it's busy, down when it isn't — no notice periods, no overhead.",
  },
  {
    title: "Senior from day one",
    blurb:
      "No hiring lag, no ramp-up. You get an experienced finance leader who's productive from the first day.",
  },
  {
    title: "Improvement that compounds",
    blurb:
      "Every month the finance function gets cleaner, faster and more automated — a day a month that keeps paying back.",
  },
  {
    title: "Lower risk, better control",
    blurb:
      "Board-ready numbers, tighter controls and fewer surprises — the rigour of a much bigger finance team.",
  },
  {
    title: "You focus on the business",
    blurb: "We own the numbers, the reporting and the systems, so leadership can get on with growing the company.",
  },
];

export const fractionalHow: { title: string; blurb: string }[] = [
  {
    title: "Pick a cadence",
    blurb: "Start at a day a month and dial up to a day a week as you need — whatever fits the business.",
  },
  {
    title: "Rolling, not locked-in",
    blurb: "A simple rolling arrangement. Scale it, pause it or stop it — no long contracts, no recruitment risk.",
  },
  {
    title: "Owner-led",
    blurb: "You work directly with Andrew — the specialist doing the work, not an account manager.",
  },
];

export const advantages: { title: string; blurb: string }[] = [
  {
    title: "Finance brain, engineer's hands",
    blurb:
      "CIMA-qualified (ACMA · CGMA) with an advanced IT skillset — I own the numbers and build the automation behind them. Rare in one person, and the reason the work actually sticks.",
  },
  {
    title: "Automation & process re-engineering",
    blurb:
      "SQL, Power BI and Python put to work re-engineering the process, not just documenting it — closes taken from weeks to days and manual reporting replaced with something that runs itself.",
  },
  {
    title: "25 years where numbers matter",
    blurb:
      "Fourteen years in investment-banking product control, then SME financial control, FP&A and interim work for RWE, P&O Ferries, Bellway and a $400m agritech group.",
  },
  {
    title: "Owner-led, senior from day one",
    blurb:
      "You work directly with the specialist doing the work — no account managers, no ramp-up, productive from the first day.",
  },
];

export const howToBook: { n: string; title: string; blurb: string }[] = [
  {
    n: "01",
    title: "Book a free discovery call",
    blurb:
      "A short call to understand your numbers, your systems and what's actually slowing you down. No cost, no obligation.",
  },
  {
    n: "02",
    title: "Choose how you work with me",
    blurb:
      "One-off project, interim cover, or a recurring slot — a day a month up to a day a week. Fixed price where it fits; rolling and cancel-anytime where it doesn't.",
  },
  {
    n: "03",
    title: "I deliver — and hand it over",
    blurb:
      "Real things shipped in short iterations, then documented and handed over so your finance function keeps running after I'm gone.",
  },
];

export type Step = { n: string; title: string; blurb: string };
export const process: Step[] = [
  {
    n: "01",
    title: "Discover",
    blurb:
      "Understand the business, the numbers and the data — fast. Find where value and risk are actually trapped, without a drawn-out audit.",
  },
  {
    n: "02",
    title: "Roadmap",
    blurb:
      "A prioritised, costed plan in plain language: quick wins first, with a credible path to the bigger prize and the governance to match.",
  },
  {
    n: "03",
    title: "Deliver",
    blurb:
      "Ship real things — finance automation, governed BI, AI features — in short iterations you can see, use and trust.",
  },
  {
    n: "04",
    title: "Enable",
    blurb:
      "Hand over with documentation, training and ways of working so it lasts long after the engagement ends.",
  },
];

export const about = {
  name: "Andrew Hoyle",
  title: "Founder · Interim FC · FP&A",
  creds: ["ACMA · CGMA", "CIMA Qualified", "PRINCE2", "SQL · Power BI · Python"],
  bio: [
    "Imperium Business Intelligence is led directly by Andrew Hoyle — audit-trained, CIMA-qualified, with 25 years owning the numbers: fourteen in investment-banking product control, then SME financial control, FP&A and interim consultancy for RWE, P&O Ferries, Bellway plc and a $400m-revenue agritech group.",
    "Repeatedly brought in to stabilise and rebuild finance reporting under pressure — which is where the automation specialism started. Every engagement is owner-led: you work with the specialist, not a layer of account managers, and you're left with a finance function that runs itself rather than a report pack and a manual.",
  ],
};

export type Client = { name: string; scale: string };
export const clients: Client[] = [
  { name: "RWE", scale: "~$20B · Energy" },
  { name: "P&O Ferries", scale: "~£918M · DP World" },
  { name: "Bellway plc", scale: "FTSE 250 housebuilder" },
  { name: "Fruitist", scale: "$400M · formerly Agrovision" },
];

export const banking = [
  "Bear Stearns",
  "Credit Suisse",
  "Barclays Capital",
  "Bank of America Merrill Lynch",
  "HSBC",
];

export const bookingTopics = [
  "Free discovery call",
  "Fractional finance leadership",
  "Interim / contract cover",
  "Data Health Check",
  "BI Dashboards & Reporting",
  "Month-End Close Automation",
  "Something else",
];
