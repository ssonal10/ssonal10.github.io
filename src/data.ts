// All site content. Facts come from the v9 resume (2026-10-13); see REVIEW.md for
// the claims that rest on Shipra's word.

export const profile = {
  name: 'Shipra Sonal',
  headline: 'Data @ Amazon',
  sub: 'I build LLM agents that let Python do the math, and the measurement that tells leaders what worked.',
  city: 'Seattle',
  email: 'shipra.sonal12@gmail.com',
  github: 'https://github.com/ssonal10',
  linkedin: 'https://www.linkedin.com/in/shiprasonal/',
};

export const numbers = [
  { value: 0, display: 'min', was: 'weeks', small: 'per deal model' },
  { value: 7, decimals: 1, suffix: 'M', small: 'new active members, measured' },
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
    context:
      'Leaders wanted several deal models before locking a partnership. The agent is wired to 20+ live data sources; the LLM only routes, a Python engine computes every number, and each run ends in a dashboard leaders can change on the spot.',
    impact: 'Deal models in minutes instead of weeks. About 6 months of manual modeling replaced in week one.',
    stack: ['Strands Agents', 'Bedrock AgentCore', 'Python', 'S3', 'IAM'],
    visual: 'agent',
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    year: '2026',
    kind: 'Multi-agent · built solo',
    context:
      'An always-on assistant for my team: 19 scheduled jobs, an orchestrator with 5 read-only specialists and a validator, and a 1,995-concept knowledge base pointing to live sources.',
    impact: 'Ad-hoc questions answered in about 10 minutes instead of about 10 days.',
    stack: ['Claude Code', 'Python', 'SQLite FTS5', 'Slack'],
    visual: 'sentinel',
  },
  {
    id: 'activation',
    name: 'Auto-activation',
    year: '2025',
    kind: 'Experimentation',
    context:
      'Built in about a week across 13 partners. Reused experiment IDs had put about 30K customers in both control and test; date-bounded assignment fixed it before the VP decision.',
    impact: '7M new active members today, 5.5M of them engaged.',
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
  {
    id: 'classifier',
    name: 'Injury classifier',
    year: '2021',
    kind: 'ML + NLP',
    context: 'Root cause and responsible equipment from free-text incident reports.',
    impact: '87% recall, 93% accuracy. About 1,000 hours of manual review saved.',
    stack: ['Python', 'XGBoost', 'NLP', 'SQL'],
    visual: 'classifier',
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
      'Manager of 4 data engineers since Jul 2026.',
      'Launched the deal agent; built auto-activation measurement and Sentinel.',
      'Answered a VP planning question in 2 days, from a 300M+ row pipeline.',
    ],
  },
  {
    period: '2023 to 2025',
    role: 'Business Intelligence Engineer II',
    org: 'Amazon · Seattle',
    lines: [
      'CX platform showed 96% of eligible customers were lost before activation.',
      'Issue resolution from 72 hours to under 1; campaign setup from weeks to hours.',
      'First deal agent: sensitivity analysis from 5 minutes to 2 seconds.',
    ],
  },
  {
    period: '2020 to 2023',
    role: 'Business Intelligence Engineer I & II',
    org: 'Amazon · Bengaluru',
    lines: ['Injury classifier, 87% recall and 93% accuracy.', '15+ safety dashboards linked to about 4% fewer injuries.'],
  },
  {
    period: '2017 to 2020',
    role: 'Associate Data Scientist',
    org: 'UnitedHealth Group (Optum) · Noida',
    lines: ['Appeal prediction 20% over baseline.', '50 claim forecasts at 90%+ accuracy fed hiring plans.'],
  },
];

export const recognition = [
  { big: '1st', text: 'prize, internal AI hackathon', when: 'Dec 2025' },
  { big: 'Top 20', text: 'of 1,100, company-wide analytics conference poster', when: '2026' },
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
