export const profile = {
  name: 'Shipra Sonal',
  title: 'GenAI × Decision Intelligence',
  tagline: 'Turning complex data into actionable business strategy.',
  about: [
    "I lead GenAI and large-scale data work at Amazon — a senior IC applying generative AI and modern data infrastructure to real business problems. I build AI-powered analytics platforms, design GenAI agents for financial modeling, and architect data systems processing billions of records daily across 50+ countries.",
    "Most recently, I redesigned a GenAI-powered financial modeling agent — migrating complex calculations from LLM orchestration to deterministic code, improving performance 150× while achieving 100% mathematical consistency. I also lead AI-driven automation across my team: documentation systems, operational analytics, and AI-assisted development workflows delivering 10–20% efficiency gains.",
    "Beyond GenAI, I've built customer experience measurement platforms from scratch, self-service analytics serving 100+ users, and experimentation frameworks that secured VP-level approvals — all grounded in large-scale data architecture on AWS.",
    "My career spans 9 years across GenAI, data platforms, ML, NLP, and predictive modeling — from healthcare claims prediction and injury classification at UnitedHealth to global customer analytics at Amazon.",
  ],
  socials: {
    github: 'https://github.com/ssonal10',
    linkedin: 'https://www.linkedin.com/in/shipra-sonal/',
    email: 'mailto:shipra.sonal12@gmail.com',
  },
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
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
    period: 'Jan 2023 — Present',
    role: 'Senior GenAI & Analytics IC',
    company: 'Amazon',
    location: 'Seattle, WA',
    summary:
      'Building GenAI-powered solutions and data platforms distributing Amazon subscription services across 130+ partners in 50+ countries.',
    highlights: [
      'Redesigned GenAI financial modeling agent — 150× faster sensitivity analysis, 100% math consistency.',
      'Built CX measurement platform revealing 96% pre-funnel drop-off; conversion rates doubled post-action.',
      'Processed 100+ TB clickstream across 40+ markets; self-service dashboards serving 45+ MAU.',
      'Architected 1B+ daily record pipelines — cut processing time from 3h → 20min, 60% cost reduction.',
      'Self-service segmentation platform: 676M × 607M record joins; marketing setup 2–3 wks → 2–3 hrs.',
    ],
    stack: ['PySpark', 'Delta Lake', 'AWS Bedrock', 'Lambda', 'Glue', 'Athena', 'Airflow', 'CDK', 'QuickSight'],
  },
  {
    period: 'Feb 2020 — Jan 2023',
    role: 'ML, NLP & People Analytics',
    company: 'Amazon · PXT / Workplace Health & Safety',
    location: 'Bengaluru → Seattle',
    summary:
      'Analytics, ML models, and automated reporting for Amazon People Experience Technology and Workplace Health & Safety orgs.',
    highlights: [
      'XGBoost + NLP injury classification: 87% recall, 93% accuracy; saved ~1,000 manual hours/year.',
      'Shipped 15+ leadership dashboards spanning 20+ sources; contributed to ~4% injury reduction.',
      'Real-time HR product metrics dashboard on live clickstream; unblocked leadership decisions.',
      'Automated severe-weather forecast pipeline enabling proactive re-routing to protect drivers.',
    ],
    stack: ['Python', 'XGBoost', 'NLP', 'SQL', 'QuickSight', 'ETL'],
  },
  {
    period: 'Jun 2017 — Jan 2020',
    role: 'Applied ML & NLP · Healthcare Claims',
    company: 'UnitedHealth Group (Optum)',
    location: 'Noida, India',
    summary:
      'Predictive models, NLP automation, and forecasting for healthcare claims — the foundation for my GenAI work today.',
    highlights: [
      'Appeals predictive engine (SparkR + H2O): 83% TPR, 20% lift over baseline on imbalanced claims.',
      'Wall-E NLP/OCR automation: 95%+ accuracy populating structured fields from varied PDF forms.',
      'Time-series forecasting across 50 series with avg 90%+ accuracy to optimize hiring plans.',
      'Generic model-monitoring framework (K-L divergence, Chi-Square) reused across deployed models.',
    ],
    stack: ['Python', 'R', 'SparkR', 'H2O', 'NLP', 'OCR', 'Time Series'],
  },
];

export type Project = {
  title: string;
  context: string;
  stack: string[];
  impact: string;
  link?: string;
  size: 'lg' | 'md' | 'sm';
  accent?: boolean;
};

export const projects: Project[] = [
  {
    title: 'GenAI Agent Redesign — 150× Faster',
    context:
      'A Bedrock-powered financial modeling agent was doing its own math — 60s responses, non-deterministic answers. I moved math out of the LLM and into Python.',
    stack: ['Bedrock', 'Lambda', 'NumPy', 'Python', 'CDK'],
    impact: 'Sensitivity analysis 5 min → 2s. 60% fewer tokens. 100% math consistency.',
    size: 'lg',
    accent: true,
  },
  {
    title: 'Trading Strategy Backtester',
    context:
      'Backtested 237,867 strategy combinations across 241 stocks (2018–2024) to find which technical indicators actually beat buy-and-hold.',
    stack: ['Python', 'Backtesting', 'HTML', 'GitHub Pages'],
    impact: '+865.6% alpha discovered on best strategy. Finding: single indicators beat complex combos.',
    link: 'https://ssonal10.github.io/trading-strategy-analysis/',
    size: 'sm',
  },
  {
    title: 'CX Measurement Platform',
    context:
      'A 130-partner, 50-country org had no standardized way to measure customer journeys. Every investigation was ad-hoc.',
    stack: ['PySpark', 'Delta Lake', 'Glue', 'Athena', 'QuickSight'],
    impact: 'Revealed 96% pre-funnel drop-off — conversion rates doubled after action.',
    size: 'sm',
  },
  {
    title: 'Personal Finance Dashboard',
    context:
      '122 statement files across 3 accounts, 3 years — zero manual data entry, published safely as % ratios only.',
    stack: ['Python', 'SQLite', 'Chart.js', 'GitHub Pages'],
    impact: '2,811 transactions categorized in 2 days. Privacy-safe public dashboard.',
    link: 'https://ssonal10.github.io/spend-dashboard/',
    size: 'md',
  },
  {
    title: 'Injury Classification (ML + NLP)',
    context:
      'Classify injury root-cause and responsible equipment from free-text incident descriptions across Amazon WHS.',
    stack: ['Python', 'XGBoost', 'NLP', 'SQL'],
    impact: '87% recall, 93% accuracy — saved ~1,000 manual hours per year.',
    size: 'sm',
  },
];

export const skillTiers = [
  {
    tier: 'Infrastructure / Data Engineering',
    items: ['AWS (S3, Glue, Athena, Lambda, Bedrock, CDK)', 'PySpark', 'Delta Lake', 'Apache Airflow', 'Redshift', 'ETL/ELT', 'Data Lake'],
  },
  {
    tier: 'Analytics / ML / GenAI',
    items: ['Python', 'Scikit-learn', 'XGBoost', 'NumPy', 'Statistics', 'NLP', 'Amazon Bedrock', 'AI Agents', 'Prompt Engineering'],
  },
  {
    tier: 'Decision Intelligence',
    items: ['QuickSight', 'Tableau', 'SQL', 'Experimentation (A/B)', 'Cohort Analysis', 'Self-Service BI'],
  },
];
