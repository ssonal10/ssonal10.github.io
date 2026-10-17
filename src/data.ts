// All site content. Facts and wording come from the BI Engineering Manager resume
// (resume/output/2026-10-15_v9-alt-BIEM, edited 2026-10-17); see REVIEW.md for
// the claims that rest on Shipra's word.

export const profile = {
  name: 'Shipra Sonal',
  headline: 'Data @ Amazon',
  sub: 'Business intelligence engineering manager, 9 years in data. I own the data and AI behind partner deal decisions: an LLM agent that turned weeks of Excel into minutes, and the measurement behind a feature now adding 7M new active members.',
  city: 'Seattle',
  email: 'shipra.sonal12@gmail.com',
  github: 'https://github.com/ssonal10',
  linkedin: 'https://www.linkedin.com/in/shiprasonal/',
};

export const numbers = [
  { value: 0, display: 'min', was: 'weeks', small: 'per deal model' },
  { value: 7, decimals: 1, suffix: 'M', small: 'new active members, measured' },
  { value: 10, suffix: ' min', was: '10 days', small: 'per Sentinel answer' },
  { value: 2, small: 'BI engineers on my team' },
] as { value: number; decimals?: number; suffix?: string; display?: string; was?: string; small: string }[];

export type Work = {
  id: string;
  name: string;
  year: string;
  kind: string;
  context: string;
  impact: string;
  stack: string[];
  visual: 'agent' | 'sentinel' | 'activation' | 'futures' | 'finance' | 'classifier';
  link?: string;
  // case layout: one hero number, then Problem / Built / Result
  big: string;
  bigSmall: string;
  hook: string; // eyebrow above the title
  area: string; // wide-tracked line under the title
  problem: string;
  built: string;
  result: string;
};

export const work: Work[] = [
  {
    id: 'deal-agent',
    hook: "Deal models in minutes, not weeks",
    area: "Financial modeling",
    big: "weeks → min",
    bigSmall: "per deal model",
    problem: "Picking the right partner deal took several free cash flow models before the organization could make a confident call. Each model meant weeks of work in Excel.",
    built: "A deterministic LLM agent wired to 20+ live data sources. The LLM only routes and a Python engine computes every number; access is IAM-authenticated and personalized per executive, and every run generates a dashboard so leaders change inputs on the spot.",
    result: "Deal models in minutes instead of weeks.",
    name: "Partnership free cash flow agent",
    year: '2026',
    kind: 'LLM agent',
    impact:
      'Built a deterministic LLM agent that gives leaders a full deal model in minutes instead of weeks. It replaced about 6 months of manual modeling in its first week.',
    context:
      'Leaders wanted several models before locking a deal. The agent is wired to 20+ live data sources: the LLM only routes, a Python engine computes every number, access is IAM-authenticated and personalized per executive, and every run generates a dashboard so leaders can change inputs on the spot. It underwrote deals bringing 4M customers on access plans, 3M general customers and new advertising business.',
    stack: ['Strands Agents', 'Bedrock AgentCore', 'Python', 'S3', 'IAM'],
    visual: 'agent',
  },
  {
    id: 'sentinel',
    hook: "Answers in 10 minutes, not 10 days",
    area: "Always-on AI assistant for the team",
    big: "10 days → 10 min",
    bigSmall: "per team question",
    problem: "The team's ad-hoc questions waited about 10 days for an answer.",
    built: "Designed and built alone: a 24/7 multi-agent system on Claude Code with 19 scheduled jobs, a headless orchestrator with 5 read-only specialists and a validator, and a 1,995-concept knowledge base pointing to live sources. Safety is enforced in configuration rather than prompts.",
    result: "Cut the team's ad-hoc questions from about 10 days to about 10 minutes, and was recognized in a company-wide competition.",
    name: "Sentinel",
    year: '2026',
    kind: 'Multi-agent · built solo',
    impact:
      "Designed and built, alone, a 24/7 multi-agent assistant that cut the team's ad-hoc questions from about 10 days to about 10 minutes.",
    context:
      'It runs 19 scheduled jobs through a headless orchestrator with 5 read-only specialists and a validator, backed by a 1,995-concept knowledge base that points to live sources. Safety is enforced in configuration rather than prompts. 48 design decisions are logged, 16 incidents were root-caused, and it was recognized in a company-wide competition.',
    stack: ['Claude Code', 'Python', 'SQLite FTS5', 'Slack'],
    visual: 'sentinel',
  },
  {
    id: 'activation',
    hook: "7M new active members",
    area: "Experimentation",
    big: "7M",
    bigSmall: "new active members",
    problem: "A new treatment with no counterfactual, and VPs needed evidence before expanding it across partners.",
    built: "The causal measurement: control and treatment cohorts, lift metrics, one customer identity across experiment, streaming, web and subscription systems, and a segmentation of high- and low-value customers that Product and Marketing now use to decide where to deploy the feature. It caught reused experiment identifiers that had put about 30K customers in both control and test, and fixed the assignment.",
    result: "The feature today contributes 7M new active members, 5.5M of them engaged, and VPs approved its expansion across 13 partners. Aligned 12+ stakeholders across 5 offices; the framework became the standard for every partner and, in 2026, the base of a membership metric senior leadership tracks.",
    name: "Auto-activation measurement",
    year: '2025',
    kind: 'Measurement',
    impact:
      'Built the measurement framework behind a feature that today contributes 7M new active members, 5.5M of them engaged. It gave VPs the evidence to expand it across 13 partners.',
    context:
      'Built in about a week, with results due within a week of each launch. It joins experiment, streaming, website and subscription data through custom identity mapping, and it needed 12+ stakeholders across 5 offices to agree. Reused experiment IDs had put about 30K customers in both control and test, which would have invalidated the lift read; date-bounded assignment fixed it before the VP decision. The framework became the standard for every partner and, in 2026, the base of a membership metric senior leadership tracks.',
    stack: ['Glue', 'Spark', 'Athena', 'QuickSight'],
    visual: 'activation',
  },
  {
    id: 'deep-dive',
    hook: "A VP answer in 2 days",
    area: "For a VP's annual plan",
    big: "91%",
    bigSmall: "of the drop was customer mix",
    problem: "A deal with 6M active subscriptions looked like it was losing members' interest and was up for review in the annual plan.",
    built: "A matched-cohort causal analysis over three years of member history, splitting the engagement drop into customer mix and member behavior.",
    result: "Saved the deal: 91% of the drop came from a shift toward newer, lighter-viewing customers, not from existing members watching less, so the fix was onboarding those customers instead of ending the deal.",
    name: "Causal analysis of a partner deal's engagement decline",
    year: '2026',
    kind: "Causal analysis",
    impact:
      "Gave a VP's annual plan a trusted answer 2 days after the ask: 91% of the engagement decline after a top Latin American market's biggest telecom deal was customer mix.",
    context:
      'The question was whether the deal added members or took them from the core service. Built a 41-month, 300M+ row customer-month pipeline, validated it 3 ways and ran a matched-cohort causal study on top. Along the way the benchmark table turned out to double-count partner members 1.7x. Business and finance stories went into one document for the VP.',
    stack: ['Glue', 'Athena', 'Python', 'Matched cohorts', 'Shapley'],
    visual: 'classifier',
  },
  {
    id: 'cx-funnel',
    hook: "72 hours to under 1",
    area: "In-app activation measurement",
    big: "72h → 1h",
    bigSmall: "issue resolution",
    problem: "40% of activation attempts dropped somewhere between sign-in and payment, and the belief was that 90% of drop-offs were OTP or CAPTCHA.",
    built: "With 3 colleagues, integrated 3 data sources handling 1B+ daily records and sorted 290+ clickstream pages and 100+ failure reasons into 15 categories.",
    result: "Issue resolution went from 72 hours to under 1, and the belief that 90% of drop-offs were OTP or CAPTCHA turned out to be under 1%. 15+ new partner integrations got their measurement framework; a Latin American telecom's in-app launch got its measurement in 3 weeks.",
    name: "CX funnel deep dive",
    year: '2024',
    kind: 'Funnel analytics',
    impact:
      'Cut activation issue resolution from 72 hours to under 1 and gave 15+ new partner integrations their measurement framework.',
    context:
      '40% of activation attempts dropped somewhere between sign-in and payment. With 3 colleagues, joined 3 sources handling 1B+ daily records and sorted 290+ clickstream pages and 100+ failure reasons into 15 categories. The belief was that 90% of drop-offs were OTP or CAPTCHA; the data said under 1%.',
    stack: ['Glue', 'Spark', 'Athena', 'QuickSight'],
    visual: 'activation',
  },
  {
    id: 'futures',
    hook: "Pre-registered, published either way",
    area: "Trading research",
    big: "149",
    bigSmall: "merged PRs · side project",
    problem: "Can any intraday rule on Nasdaq-100 micro futures survive trading costs?",
    built: "With a research partner, about 56K lines of Python. Every test is pre-registered and scored against matched random entries on 1-minute data from 2014 to 2022.",
    result: "No entry rule has beaten costs yet, and the reports say so.",
    name: 'Futures lab',
    year: '2026',
    kind: 'Side project · research',
    context:
      'With a research partner: can any intraday rule on Nasdaq-100 micro futures survive trading costs? Every test is pre-registered before we look at outcomes and scored against matched random entries, on 1-minute data from 2014 to 2022.',
    impact: '149 merged PRs, about 56K lines of Python. No entry rule has beaten costs yet, and we report that as is.',
    stack: ['Python', 'uv', 'pytest', 'Databento', 'Claude Code'],
    visual: 'futures',
    link: 'https://ssonal10.github.io/trading-strategy-analysis/',
  },
  {
    id: 'finance',
    hook: "2,811 transactions, zero manual entry",
    area: "Personal finance",
    big: "2,811",
    bigSmall: "transactions · side project",
    problem: "Three years of statements across 3 accounts needed categorizing with zero manual entry.",
    built: "A Python and SQLite pipeline that categorizes every transaction and publishes ratios only.",
    result: "2,811 transactions categorized in 2 days.",
    name: 'Spend map',
    year: '2025',
    kind: 'Side project · privacy',
    context: 'Three years of statements across 3 accounts, categorized with zero manual entry and published as ratios only.',
    impact: '2,811 transactions categorized in 2 days.',
    stack: ['Python', 'SQLite', 'Chart.js'],
    visual: 'finance',
    link: 'https://ssonal10.github.io/spend-dashboard/',
  },
];

export type DesignNote = {
  id: string;
  title: string;
  problem: string;
  tenets: string[];
  tradeoff: string;
  diagram: 'agent' | 'sentinel' | 'measure';
};

export const designNotes: DesignNote[] = [
  {
    id: 'agent',
    title: 'Deal agent',
    problem: 'Leaders wanted several deal models before signing, and each one took weeks of spreadsheet work.',
    tenets: ['The model routes. Code computes every number.', 'Every run ends in a dashboard a leader can change.'],
    tradeoff: 'Less freedom for the LLM, in exchange for the same answer every run.',
    diagram: 'agent',
  },
  {
    id: 'sentinel',
    title: 'Sentinel',
    problem: "My team's ad-hoc questions waited about 10 days for an answer.",
    tenets: ['Specialists only read. A validator checks before anything is drafted.', 'Safety lives in configuration, not in prompts.'],
    tradeoff: 'A slower first draft, so nothing reaches a stakeholder unchecked.',
    diagram: 'sentinel',
  },
  {
    id: 'measure',
    title: 'Auto-activation measurement',
    problem: 'Each partner launch needed a lift read within a week, from systems that did not share customer IDs.',
    tenets: ['Assignment is bounded by date, so no customer sits in both arms.', 'One framework for every partner.'],
    tradeoff: 'Built in about a week, so it favors a fixed design over custom reads per partner.',
    diagram: 'measure',
  },
];

export const experience = [
  {
    period: 'Dec 2025 to now',
    role: 'Business Intelligence Engineering Manager',
    org: 'Amazon · Seattle',
    lines: [
      'Manager of 2 BI engineers since Jul 2026, 6 months after promotion to the senior level.',
      'Built the partnership free cash flow agent, Sentinel and the auto-activation measurement.',
    ],
  },
  {
    period: 'Jan 2023 to Nov 2025',
    role: 'Business Intelligence Engineer II',
    org: 'Amazon · Seattle',
    lines: [
      'CX platform showed 96% of eligible customers were lost before starting activation, which moved the 2024 plan to same-store growth.',
      'Campaign setup from 2 to 3 weeks to hours; marketing ran 5+ campaigns without BI.',
      'First deal agent: sensitivity analysis from 5 minutes to 2 seconds, same answer every run.',
      'Learning program: 15+ sessions, onboarding from 4 weeks to 2.',
    ],
  },
  {
    period: 'Feb 2020 to Jan 2023',
    role: 'Business Intelligence Engineer I & II',
    org: 'Amazon · Bengaluru',
    lines: [
      'Injury classifier (XGBoost and NLP): 87% recall, 93% accuracy, about 1,000 hours of manual review saved.',
      '15+ leadership safety dashboards linked to about 4% fewer injuries.',
    ],
  },
  {
    period: 'Jun 2017 to Jan 2020',
    role: 'Associate Data Scientist',
    org: 'UnitedHealth Group (Optum) · Noida',
    lines: ['Appeal-prediction model beat the baseline by 20%.', '50 automated claim forecasts at 90%+ accuracy fed hiring plans.'],
  },
];

export const recognition = [
  { big: '1st', text: 'prize, company AI hackathon, with an agent that monitors business metrics and coordinates investigations', when: 'Dec 2025' },
  { big: 'Top 20', text: 'of 1,100, Sentinel poster at a company-wide analytics conference', when: '2026' },
  { big: 'IEEE', text: 'Program Committee, HBDA-LLM workshop at IEEE BigData', when: '2026' },
];

export const stack = [
  'Bedrock AgentCore', 'Strands Agents', 'Claude Code', 'Python', 'SQL', 'Spark', 'Glue', 'Athena',
  'Redshift', 'QuickSight', 'Lambda', 'S3', 'Causal inference', 'Experiment design', 'XGBoost', 'NLP',
];

export type LifePhoto = { src: string; caption: string; tall?: boolean };

export const life: LifePhoto[] = [
  { src: 'rainier', caption: 'Naches, WA', tall: true },
  { src: 'gym', caption: 'Every day' },
  { src: 'brooklyn-night', caption: 'Brooklyn Bridge' },
  { src: 'maui', caption: 'Kapalua, Maui', tall: true },
  { src: 'seattle-wheel', caption: 'Seattle waterfront' },
  { src: 'squamish', caption: 'Sea to Sky' },
  { src: 'andaman-stars', caption: 'Andaman, night sky' },
  { src: 'balcony', caption: 'Seattle sun', tall: true },
  { src: 'nyc-wtc', caption: 'One World Trade' },
  { src: 'andaman-blue', caption: 'Andaman Sea', tall: true },
  { src: 'baker-road', caption: 'Mt. Baker road' },
];

export const clips = [
  { src: '/video/squamish-loop.mp4', title: 'Sea to Sky', meta: 'Squamish · 2024' },
  { src: '/video/seattle-denim-loop.mp4', title: 'City fit', meta: 'Seattle · 2026' },
  { src: '/video/glacier-loop.mp4', title: 'Highline Trail', meta: 'Glacier NP · 2023' },
  { src: '/video/ny-loop.mp4', title: 'Travel dump', meta: 'NYC · 2024' },
  { src: '/video/gym-loop.mp4', title: '1% better', meta: 'Gym · 2025' },
  { src: '/video/birthday-loop.mp4', title: 'Birthday cut', meta: 'Self · 2026' },
];
