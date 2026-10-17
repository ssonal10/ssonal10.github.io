export const profile = {
  name: 'Shipra Sonal',
  title: 'Data Engineering Manager',
  tagline:
    'Data engineering manager in Seattle. I build LLM agents that leave the math to code, and the measurement that shows leaders what worked.',
  about: [
    "I'm a data engineering manager in Seattle. I manage four data engineers, and we own the data and AI behind partner deal decisions for a subscriptions business sold through 130+ partners in 50+ countries.",
    'Lately I build LLM agents whose numbers have to be right. In my financial-modeling agent, the model only routes each request and a Python engine computes every number. Leaders get a full deal model in minutes instead of weeks. In its first week it replaced about six months of manual modeling.',
    "I built the measurement framework behind an auto-activation feature that now contributes 7M new active members. I also built Sentinel, an always-on multi-agent assistant that cut my team's ad-hoc questions from about 10 days to about 10 minutes.",
    'Before that I spent three years as a data scientist at UnitedHealth Group (Optum), working on claims prediction and forecasting. Nine years in, the job is still the same one: take messy records and get them to a decision someone can act on.',
  ],
  socials: {
    github: 'https://github.com/ssonal10',
    linkedin: 'https://www.linkedin.com/in/shiprasonal/',
    email: 'mailto:shipra.sonal12@gmail.com',
  },
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'life', label: 'Life' },
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: 'Dec 2025 to Present',
    role: 'Data Engineering Manager',
    company: 'Amazon',
    location: 'Seattle, WA',
    summary:
      'Partner subscriptions analytics for 130+ partner deals in 50+ countries. Manager of 4 data engineers since Jul 2026.',
    highlights: [
      'Launched a deterministic deal-modeling agent: leaders get a full deal model in minutes instead of weeks; it replaced about 6 months of manual modeling in its first week.',
      'Built the measurement framework behind an auto-activation feature that now contributes 7M new active members, 5.5M of them engaged; VPs used it to approve expansion across 13 partners.',
      'Built Sentinel, a 24/7 multi-agent assistant on Claude Code: ad-hoc questions answered in about 10 minutes instead of about 10 days.',
      'First prize in an internal AI hackathon (Dec 2025); Sentinel poster selected in the top 20 of 1,100 at a company-wide analytics conference.',
      "Gave a VP's annual plan a trusted answer 2 days after the ask, from a 41-month, 300M+ row pipeline and a matched-cohort study.",
    ],
    stack: ['Strands Agents', 'Bedrock AgentCore', 'Claude Code', 'Python', 'Glue', 'Spark', 'Athena', 'QuickSight'],
  },
  {
    period: 'Jan 2023 to Nov 2025',
    role: 'Business Intelligence Engineer II',
    company: 'Amazon',
    location: 'Seattle, WA',
    summary: 'Partner subscriptions analytics, 130+ partner deals in 50+ countries.',
    highlights: [
      'CX measurement platform: showed 96% of eligible customers were lost before starting activation, which moved the 2024 plan toward same-store growth.',
      'In-app activation measurement: issue resolution from 72 hours to under 1; 15+ new partner integrations got their measurement framework.',
      'Opportunity analyzer: campaign setup from 2 to 3 weeks down to hours, over a 1.28B-row join; engaged customers 3x better than manual lists.',
      "First deal agent: moved a Bedrock agent's financial math into Python, sensitivity analysis from 5 minutes to 2 seconds with about 60% fewer tokens.",
      'Ran a learning program of 15+ sessions that cut onboarding from 4 weeks to 2.',
    ],
    stack: ['Bedrock', 'Lambda', 'Glue', 'PySpark', 'Athena', 'Redshift', 'QuickSight'],
  },
  {
    period: 'Feb 2020 to Jan 2023',
    role: 'Business Intelligence Engineer I & II',
    company: 'Amazon',
    location: 'Bengaluru, India',
    summary: 'Workplace health and safety analytics, then HR product metrics.',
    highlights: [
      'XGBoost and NLP injury classifier (87% recall, 93% accuracy) labeled about 12,000 cases and saved about 1,000 hours of manual review.',
      '15+ leadership safety dashboards from 20+ sources contributed to about 4% fewer injuries.',
    ],
    stack: ['Python', 'XGBoost', 'NLP', 'SQL', 'QuickSight'],
  },
  {
    period: 'Jun 2017 to Jan 2020',
    role: 'Associate Data Scientist',
    company: 'UnitedHealth Group (Optum)',
    location: 'Noida, India',
    summary: 'Predictive models, NLP automation and forecasting for healthcare claims.',
    highlights: [
      'Appeal-prediction model (SparkR and H2O, 83% true-positive rate) beat the baseline by 20%.',
      '50 automated claim-inventory forecasts at 90%+ accuracy fed hiring plans; NLP and OCR data entry at 95%+.',
    ],
    stack: ['Python', 'R', 'SparkR', 'H2O', 'NLP', 'OCR'],
  },
];

export type Project = {
  title: string;
  tag: string;
  context: string;
  stack: string[];
  impact: string;
  link?: string;
  size: 'lg' | 'md' | 'sm' | 'full';
  accent?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Deal-modeling agent, launched',
    tag: 'Work · LLM agent',
    context:
      'Leaders wanted several deal models before locking a partnership. The agent is wired to 20+ live data sources; the LLM only routes, a Python engine computes every number, and each run generates a dashboard so leaders change inputs on the spot.',
    stack: ['Strands Agents', 'Bedrock AgentCore', 'Python', 'S3', 'IAM'],
    impact: 'Deal models in minutes instead of weeks. About 6 months of manual modeling replaced in week one.',
    size: 'lg',
    accent: true,
  },
  {
    title: 'Sentinel',
    tag: 'Work · multi-agent',
    context:
      'An always-on assistant for my team, built alone: 19 scheduled jobs, an orchestrator with 5 read-only specialists and a validator, and a 1,995-concept knowledge base pointing to live sources.',
    stack: ['Claude Code', 'Python', 'SQLite FTS5', 'Slack'],
    impact: 'Ad-hoc questions: about 10 days down to about 10 minutes.',
    size: 'sm',
  },
  {
    title: 'Auto-activation measurement',
    tag: 'Work · experimentation',
    context:
      'Built in about a week across 13 partners. Reused experiment IDs had put about 30K customers in both control and test; date-bounded assignment fixed it before the VP decision.',
    stack: ['Glue', 'Spark', 'Athena', 'QuickSight'],
    impact: '7M new active members today, 5.5M engaged.',
    size: 'sm',
  },
  {
    title: 'Futures research lab',
    tag: 'Side project · quant research',
    context:
      'A side research project with a partner: can any intraday rule on Nasdaq-100 micro futures survive trading costs? We pre-register every test before looking at outcomes and score it against matched random entries, with a correction for multiple comparisons. The data is 1-minute bars from 2014 to 2022, with 1-second bars for ambiguous minutes.',
    stack: ['Python', 'uv', 'pytest', 'Databento', 'Claude Code'],
    impact: '149 merged PRs and about 56K lines of Python. No entry rule has beaten costs yet, and we report that as is.',
    link: 'https://ssonal10.github.io/trading-strategy-analysis/',
    size: 'md',
  },
  {
    title: 'Personal finance dashboard',
    tag: 'Side project · privacy',
    context: 'Three years of statements across 3 accounts, categorized with zero manual entry and published as ratios only.',
    stack: ['Python', 'SQLite', 'Chart.js', 'GitHub Pages'],
    impact: '2,811 transactions categorized in 2 days.',
    link: 'https://ssonal10.github.io/spend-dashboard/',
    size: 'sm',
  },
  {
    title: 'Injury classification',
    tag: 'Work · ML + NLP',
    context: 'Root cause and responsible equipment from free-text incident reports.',
    stack: ['Python', 'XGBoost', 'NLP', 'SQL'],
    impact: '87% recall, 93% accuracy. About 1,000 hours of manual review saved.',
    size: 'full',
  },
];

export const recognition = [
  { k: '1st', v: 'Prize, internal AI hackathon', d: 'Dec 2025' },
  { k: 'Top 20', v: 'of 1,100, company-wide analytics conference poster', d: '2026' },
  { k: 'PC', v: 'Program Committee, HBDA-LLM workshop, IEEE BigData', d: '2026' },
];

export const skillTiers = [
  {
    tier: 'Leadership',
    items: ['People management', 'Performance reviews', 'Promotion assessments', 'Coaching', 'Technical direction'],
  },
  {
    tier: 'Data platforms',
    items: ['Data modeling', 'AWS Glue', 'Spark', 'Athena', 'Redshift', 'S3', 'Lambda', 'QuickSight'],
  },
  {
    tier: 'GenAI',
    items: ['Amazon Bedrock', 'Bedrock AgentCore', 'Strands Agents', 'Claude Code', 'LLM evaluation', 'Agent guardrails'],
  },
  {
    tier: 'Analytics',
    items: ['Python', 'SQL', 'Financial modeling', 'Causal inference', 'Experiment design', 'Forecasting', 'XGBoost', 'NLP'],
  },
];
