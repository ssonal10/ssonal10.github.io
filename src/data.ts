// All site content. Facts and wording come from the v10-public resume (2026-10-15); see REVIEW.md for
// the claims that rest on Shipra's word.

export const profile = {
  name: 'Shipra Sonal',
  headline: 'Data @ Amazon',
  sub: 'Data engineering manager, 9 years in data. I own the data and AI behind partner deal decisions: an LLM agent that turned weeks of Excel into minutes, and the measurement leaders use to approve an expansion.',
  city: 'Seattle',
  email: 'shipra.sonal12@gmail.com',
  github: 'https://github.com/ssonal10',
  linkedin: 'https://www.linkedin.com/in/shiprasonal/',
};

export const numbers = [
  { value: 0, display: 'min', was: 'weeks', small: 'per deal model' },
  { value: 13, small: 'partners approved for expansion on my measurement' },
  { value: 10, suffix: ' min', was: '10 days', small: 'per Sentinel answer' },
  { value: 4, small: 'data engineers on my team' },
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
};

export const work: Work[] = [
  {
    id: 'deal-agent',
    name: 'Deal agent',
    year: '2026',
    kind: 'LLM agent · launched',
    impact:
      'Built a deterministic LLM agent that gives leaders a full deal model in minutes instead of weeks. It replaced about 6 months of manual modeling in its first week.',
    context:
      'Leaders wanted several models before locking a deal. The agent is wired to 20+ live data sources: the LLM only routes, a Python engine computes every number, access is IAM-authenticated and personalized per executive, and every run generates a dashboard so leaders can change inputs on the spot. It underwrote major partner deals that brought in new customers and new advertising business.',
    stack: ['Strands Agents', 'Bedrock AgentCore', 'Python', 'S3', 'IAM'],
    visual: 'agent',
  },
  {
    id: 'activation',
    name: 'Auto-activation',
    year: '2025',
    kind: 'Measurement',
    impact: 'Built the measurement framework that gave VPs the evidence to expand auto-activation across 13 partners.',
    context:
      'Built in about a week, with results due within a week of each launch. It joins experiment, streaming, website and subscription data through custom identity mapping, and it needed 12+ stakeholders across 5 offices to agree. Reused experiment IDs had put the same customers in both control and test, which would have invalidated the lift read; date-bounded assignment fixed it before the VP decision. The framework became the standard for every partner and, in 2026, the base of a membership metric senior leadership tracks.',
    stack: ['Glue', 'Spark', 'Athena', 'QuickSight'],
    visual: 'activation',
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
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
    id: 'deep-dive',
    name: 'Deal deep dive',
    year: '2026',
    kind: 'Causal analysis',
    impact:
      "Gave a VP's annual plan a trusted answer 2 days after the ask: 91% of the engagement decline after a large partner deal was customer mix.",
    context:
      'The question was whether the deal added members or took them from the core service. Built a 41-month, 300M+ row customer-month pipeline, validated it 3 ways and ran a matched-cohort causal study on top. Along the way the benchmark table turned out to double-count partner members 1.7x. Business and finance stories went into one document for the VP.',
    stack: ['Glue', 'Athena', 'Python', 'Matched cohorts', 'Shapley'],
    visual: 'classifier',
  },
  {
    id: 'deal-model',
    name: 'Launch-day model',
    year: '2026',
    kind: 'Financial model',
    impact:
      'Built the free-cash-flow model, the cannibalization analysis and the daily executive metrics for one of the largest partner subscription deals, which scaled quickly after launch.',
    context:
      'The day before the marketing launch, leadership asked how many members were stuck on app-store billing. Found the 2 tables out of 1,027 that link billing to entitlements, built a 5-stage Glue pipeline the same day and showed the exposure was a small fraction of what was feared. Leadership cleared the launch within the hour.',
    stack: ['Glue', 'Athena', 'Redshift', 'QuickSight'],
    visual: 'finance',
  },
  {
    id: 'cx-funnel',
    name: 'Activation funnel',
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
    role: 'Data Engineering Manager',
    org: 'Amazon · Seattle',
    lines: [
      'Manager of 4 data engineers since Jul 2026, 6 months after promotion to the senior level.',
      "BI owner of 7 of the org's 53 annual goals; wrote promotion assessments for 2 engineers.",
      'Launched the deal agent; built the auto-activation measurement and Sentinel.',
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
  { src: 'gym-mirror', caption: 'Leg day' },
  { src: 'brooklyn-night', caption: 'Brooklyn Bridge' },
  { src: 'maui', caption: 'Kapalua, Maui', tall: true },
  { src: 'seattle-wheel', caption: 'Seattle waterfront' },
  { src: 'squamish', caption: 'Sea to Sky' },
  { src: 'andaman-stars', caption: 'Andaman, night sky' },
  { src: 'gym-bw', caption: 'Every day', tall: true },
  { src: 'kullu', caption: 'Kullu, India' },
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
