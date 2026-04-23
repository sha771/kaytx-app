/**
 * =============================================================================
 * DEPARTMENT BUILDER - Configuration & Templates
 * =============================================================================
 *
 * Default configurations, templates, and presets for creating custom departments
 * within the 7-tier enterprise hierarchy (Tier 5).
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-21
 */

import type {
  DepartmentFunction,
  DepartmentKPI,
  DepartmentHead,
  CustomDepartment,
  BuilderTemplate,
  DepartmentAgentAllocation,
} from '../types/builder';

// ============================================
// DEPARTMENT CATEGORIES
// ============================================

export const DEPARTMENT_CATEGORIES = [
  {
    id: 'core',
    name: 'Core Business',
    description: 'Directly drives revenue and customer value',
    examples: ['Sales', 'Marketing', 'Customer Experience'],
    icon: 'Target',
  },
  {
    id: 'support',
    name: 'Support Function',
    description: 'Enables core business operations',
    examples: ['HR', 'Finance', 'Legal', 'IT'],
    icon: 'Settings',
  },
  {
    id: 'specialized',
    name: 'Specialized Unit',
    description: 'Niche expertise for specific needs',
    examples: ['R&D', 'Data Science', 'Security'],
    icon: 'Sparkles',
  },
  {
    id: 'regional',
    name: 'Regional/Division',
    description: 'Geographic or product-based division',
    examples: ['APAC Division', 'Product Line A', 'Regional Office'],
    icon: 'MapPin',
  },
];

// ============================================
// DEPARTMENT FUNCTION TEMPLATES
// ============================================

export const DEPARTMENT_FUNCTION_TEMPLATES: Record<string, DepartmentFunction[]> = {
  core: [
    {
      id: 'revenue_gen',
      name: 'Revenue Generation',
      description: 'Drive sales and revenue growth',
      keyActivities: ['Lead conversion', 'Deal closing', 'Upselling', 'Account expansion'],
    },
    {
      id: 'customer_acq',
      name: 'Customer Acquisition',
      description: 'Attract and onboard new customers',
      keyActivities: ['Marketing campaigns', 'Prospecting', 'Demo delivery', 'Onboarding'],
    },
    {
      id: 'retention',
      name: 'Customer Retention',
      description: 'Maintain and strengthen customer relationships',
      keyActivities: ['Support excellence', 'Success programs', 'Feedback loops', 'Loyalty rewards'],
    },
  ],
  support: [
    {
      id: 'talent_mgmt',
      name: 'Talent Management',
      description: 'Attract, develop, and retain employees',
      keyActivities: ['Recruiting', 'Training', 'Performance reviews', 'Career development'],
    },
    {
      id: 'financial_ops',
      name: 'Financial Operations',
      description: 'Manage company finances and compliance',
      keyActivities: ['Budgeting', 'Reporting', 'Auditing', 'Forecasting'],
    },
    {
      id: 'legal_gov',
      name: 'Legal & Governance',
      description: 'Ensure compliance and manage risk',
      keyActivities: ['Contract review', 'Compliance monitoring', 'Risk assessment', 'Policy enforcement'],
    },
    {
      id: 'tech_infra',
      name: 'Technology Infrastructure',
      description: 'Maintain systems and enable digital operations',
      keyActivities: ['System maintenance', 'Security', 'Support desk', 'Innovation'],
    },
  ],
  specialized: [
    {
      id: 'innovation',
      name: 'Innovation & R&D',
      description: 'Develop new products and technologies',
      keyActivities: ['Research', 'Prototyping', 'Testing', 'Product development'],
    },
    {
      id: 'data_intelligence',
      name: 'Data & Intelligence',
      description: 'Transform data into actionable insights',
      keyActivities: ['Analytics', 'Reporting', 'Predictive modeling', 'AI/ML'],
    },
    {
      id: 'security_ops',
      name: 'Security Operations',
      description: 'Protect assets and ensure safety',
      keyActivities: ['Threat monitoring', 'Incident response', 'Compliance', 'Training'],
    },
  ],
  regional: [
    {
      id: 'local_ops',
      name: 'Local Operations',
      description: 'Manage regional business operations',
      keyActivities: ['Market management', 'Local compliance', 'Regional sales', 'Partner relations'],
    },
    {
      id: 'cultural_adapt',
      name: 'Cultural Adaptation',
      description: 'Adapt strategies to local markets',
      keyActivities: ['Localization', 'Cultural alignment', 'Market research', 'Community engagement'],
    },
  ],
};

// ============================================
// KPI TEMPLATES BY CATEGORY
// ============================================

export const DEPARTMENT_KPI_TEMPLATES: Record<string, DepartmentKPI[]> = {
  core: [
    { metric: 'Revenue', target: '$1M+ quarterly', measurement: 'Bookings', frequency: 'monthly' },
    { metric: 'Customer Acquisition Cost', target: '< $500', measurement: 'CAC', frequency: 'monthly' },
    { metric: 'Conversion Rate', target: '> 15%', measurement: 'Leads to customers', frequency: 'weekly' },
    { metric: 'Customer Satisfaction', target: '> 4.5/5', measurement: 'CSAT/NPS', frequency: 'monthly' },
  ],
  support: [
    { metric: 'Cost Efficiency', target: '< 15% of revenue', measurement: 'Department cost %', frequency: 'quarterly' },
    { metric: 'Service Level Agreement', target: '> 95%', measurement: 'SLA compliance', frequency: 'weekly' },
    { metric: 'Employee Satisfaction', target: '> 4.0/5', measurement: 'eNPS', frequency: 'quarterly' },
    { metric: 'Compliance Score', target: '100%', measurement: 'Audit results', frequency: 'yearly' },
  ],
  specialized: [
    { metric: 'Innovation Index', target: '3+ patents/year', measurement: 'New IP', frequency: 'yearly' },
    { metric: 'Data Accuracy', target: '> 98%', measurement: 'Quality score', frequency: 'monthly' },
    { metric: 'Threat Response Time', target: '< 1 hour', measurement: 'MTTR', frequency: 'weekly' },
    { metric: 'Research Output', target: '12+ papers/year', measurement: 'Publications', frequency: 'quarterly' },
  ],
  regional: [
    { metric: 'Local Market Share', target: 'Top 3', measurement: 'Market position', frequency: 'quarterly' },
    { metric: 'Regional Revenue', target: '20% YoY growth', measurement: 'Sales growth', frequency: 'monthly' },
    { metric: 'Localization Coverage', target: '> 90%', measurement: 'Localized assets', frequency: 'monthly' },
    { metric: 'Partner Satisfaction', target: '> 4.0/5', measurement: 'Partner NPS', frequency: 'quarterly' },
  ],
};

// ============================================
// C-SUITE LIAISON MAPPING
// ============================================

export const C_SUITE_LIAISONS = [
  { id: 'ceo', name: 'CEO', title: 'Chief Executive Officer', departments: ['executive', 'strategy'] },
  { id: 'cfo', name: 'CFO', title: 'Chief Financial Officer', departments: ['finance', 'accounting', 'treasury'] },
  { id: 'coo', name: 'COO', title: 'Chief Operations Officer', departments: ['operations', 'supply_chain', 'logistics'] },
  { id: 'cto', name: 'CTO', title: 'Chief Technology Officer', departments: ['technology', 'engineering', 'it'] },
  { id: 'cmo', name: 'CMO', title: 'Chief Marketing Officer', departments: ['marketing', 'brand', 'communications'] },
  { id: 'chro', name: 'CHRO', title: 'Chief Human Resources Officer', departments: ['human_resources', 'talent', 'culture'] },
  { id: 'ciso', name: 'CISO', title: 'Chief Information Security Officer', departments: ['security', 'compliance', 'risk'] },
  { id: 'cdao', name: 'CDAO', title: 'Chief Data & AI Officer', departments: ['data_intelligence', 'analytics', 'ai'] },
  { id: 'clo', name: 'CLO', title: 'Chief Legal Officer', departments: ['legal_compliance', 'regulatory'] },
  { id: 'cco', name: 'CCO', title: 'Chief Customer Officer', departments: ['customer_experience', 'success', 'support'] },
  { id: 'cao_auto', name: 'CAO-Auto', title: 'Chief Automation Officer', departments: ['automation', 'rpa', 'efficiency'] },
  { id: 'cs', name: 'CSO', title: 'Chief Sales Officer', departments: ['sales', 'business_development'] },
];

// ============================================
// COMMAND CENTER CONNECTIONS
// ============================================

export const COMMAND_CENTER_CONNECTIONS = {
  cdo: {
    id: 'cdoo',
    name: 'CDOO',
    title: 'Chief Digital & Operations Officer',
    description: 'Orchestrates all digital operations',
  },
  ddo: {
    id: 'ddo',
    name: 'DDO',
    title: 'Digital Deployment Officer',
    description: 'Deploys technology and infrastructure',
  },
  wol: {
    id: 'wol',
    name: 'WOL',
    title: 'Workforce Optimization Lead',
    description: 'Manages agent and employee allocation',
  },
  aod: {
    id: 'aod',
    name: 'AOD',
    title: 'Automation Operations Director',
    description: 'Automates workflows and processes',
  },
};

// ============================================
// AGENT ALLOCATION TEMPLATES
// ============================================

export const AGENT_ALLOCATION_TEMPLATES: Record<string, DepartmentAgentAllocation[]> = {
  minimal: [
    { agentType: 'reactive', count: 2, purpose: 'Basic support coverage' },
    { agentType: 'learning', count: 1, purpose: 'Knowledge enhancement' },
  ],
  standard: [
    { agentType: 'reactive', count: 5, purpose: '24/7 coverage' },
    { agentType: 'learning', count: 3, purpose: 'Intelligent assistance' },
    { agentType: 'swarm', count: 1, purpose: 'Surge capacity' },
  ],
  enterprise: [
    { agentType: 'reactive', count: 15, purpose: 'Full coverage' },
    { agentType: 'learning', count: 10, purpose: 'Advanced capabilities' },
    { agentType: 'swarm', count: 5, purpose: 'Scalable operations' },
  ],
  specialized: [
    { agentType: 'learning', count: 8, purpose: 'Expert analysis' },
    { agentType: 'swarm', count: 3, purpose: 'Complex problem solving' },
  ],
};

// ============================================
// DEFAULT DEPARTMENTS (21 Standard)
// ============================================

export const DEFAULT_DEPARTMENTS: Partial<CustomDepartment>[] = [
  {
    id: 'executive',
    name: 'Executive',
    category: 'core',
    functions: [
      { id: 'strategy', name: 'Strategic Planning', description: 'Define company vision and strategy', keyActivities: ['Vision setting', 'Goal alignment', 'Market analysis'] },
      { id: 'governance', name: 'Corporate Governance', description: 'Ensure compliance and ethics', keyActivities: ['Board relations', 'Policy oversight', 'Risk management'] },
    ],
    head: { title: 'CEO', requiredSkills: ['leadership', 'strategy', 'vision'], reportingLine: 'c_suite', cSuiteLiaison: 'ceo' },
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'support',
    functions: [
      { id: 'accounting', name: 'Accounting', description: 'Financial record keeping', keyActivities: ['Bookkeeping', 'Reporting', 'Auditing'] },
      { id: 'treasury', name: 'Treasury', description: 'Cash and investment management', keyActivities: ['Cash flow', 'Investments', 'Risk management'] },
    ],
    head: { title: 'CFO', requiredSkills: ['finance', 'analytics', 'strategy'], reportingLine: 'c_suite', cSuiteLiaison: 'cfo' },
  },
  {
    id: 'technology',
    name: 'Technology',
    category: 'specialized',
    functions: [
      { id: 'engineering', name: 'Engineering', description: 'Product development', keyActivities: ['Coding', 'Architecture', 'Testing'] },
      { id: 'infrastructure', name: 'Infrastructure', description: 'Systems and operations', keyActivities: ['DevOps', 'Cloud', 'Security'] },
    ],
    head: { title: 'CTO', requiredSkills: ['technology', 'innovation', 'leadership'], reportingLine: 'c_suite', cSuiteLiaison: 'cto' },
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'core',
    functions: [
      { id: 'brand', name: 'Brand Management', description: 'Brand strategy and awareness', keyActivities: ['Brand strategy', 'Campaigns', 'Content'] },
      { id: 'growth', name: 'Growth Marketing', description: 'Acquisition and retention', keyActivities: ['SEO/SEM', 'Social', 'Analytics'] },
    ],
    head: { title: 'CMO', requiredSkills: ['marketing', 'creativity', 'analytics'], reportingLine: 'c_suite', cSuiteLiaison: 'cmo' },
  },
  {
    id: 'sales',
    name: 'Sales',
    category: 'core',
    functions: [
      { id: 'enterprise', name: 'Enterprise Sales', description: 'Large account sales', keyActivities: ['Account management', 'Negotiation', 'Closing'] },
      { id: 'smb', name: 'SMB Sales', description: 'Small and medium business', keyActivities: ['Lead qualification', 'Product demos', 'Onboarding'] },
    ],
    head: { title: 'CSO', requiredSkills: ['sales', 'negotiation', 'leadership'], reportingLine: 'c_suite', cSuiteLiaison: 'cs' },
  },
  {
    id: 'customer_experience',
    name: 'Customer Experience',
    category: 'core',
    functions: [
      { id: 'support', name: 'Customer Support', description: 'Help and issue resolution', keyActivities: ['Ticket handling', 'Knowledge base', 'Escalation'] },
      { id: 'success', name: 'Customer Success', description: 'Proactive customer care', keyActivities: ['Onboarding', 'Health checks', 'Expansion'] },
    ],
    head: { title: 'CCO', requiredSkills: ['customer_focus', 'empathy', 'strategy'], reportingLine: 'c_suite', cSuiteLiaison: 'cco' },
  },
  {
    id: 'operations',
    name: 'Operations',
    category: 'support',
    functions: [
      { id: 'process', name: 'Process Management', description: 'Workflow optimization', keyActivities: ['Process design', 'Automation', 'Quality'] },
      { id: 'logistics', name: 'Logistics', description: 'Supply chain and delivery', keyActivities: ['Inventory', 'Fulfillment', 'Distribution'] },
    ],
    head: { title: 'COO', requiredSkills: ['operations', 'efficiency', 'scale'], reportingLine: 'c_suite', cSuiteLiaison: 'coo' },
  },
  {
    id: 'human_resources',
    name: 'Human Resources',
    category: 'support',
    functions: [
      { id: 'talent', name: 'Talent Acquisition', description: 'Recruiting and hiring', keyActivities: ['Sourcing', 'Interviewing', 'Offers'] },
      { id: 'people', name: 'People Operations', description: 'Employee experience', keyActivities: ['Benefits', 'Engagement', 'Development'] },
    ],
    head: { title: 'CHRO', requiredSkills: ['hr', 'culture', 'strategy'], reportingLine: 'c_suite', cSuiteLiaison: 'chro' },
  },
  {
    id: 'legal_compliance',
    name: 'Legal & Compliance',
    category: 'support',
    functions: [
      { id: 'legal', name: 'Legal Affairs', description: 'Contracts and disputes', keyActivities: ['Contracts', 'IP', 'Litigation'] },
      { id: 'compliance', name: 'Compliance', description: 'Regulatory adherence', keyActivities: ['Audits', 'Training', 'Policy'] },
    ],
    head: { title: 'CLO', requiredSkills: ['legal', 'risk', 'ethics'], reportingLine: 'c_suite', cSuiteLiaison: 'clo' },
  },
  {
    id: 'data_intelligence',
    name: 'Data & Intelligence',
    category: 'specialized',
    functions: [
      { id: 'analytics', name: 'Analytics', description: 'Business intelligence', keyActivities: ['Reporting', 'Dashboards', 'Insights'] },
      { id: 'ml', name: 'Machine Learning', description: 'AI and predictive models', keyActivities: ['Modeling', 'Training', 'Deployment'] },
    ],
    head: { title: 'CDAO', requiredSkills: ['data', 'ai', 'strategy'], reportingLine: 'c_suite', cSuiteLiaison: 'cdao' },
  },
  {
    id: 'security',
    name: 'Security',
    category: 'specialized',
    functions: [
      { id: 'cyber', name: 'Cybersecurity', description: 'Threat protection', keyActivities: ['Monitoring', 'Response', 'Hardening'] },
      { id: 'physical', name: 'Physical Security', description: 'Facility protection', keyActivities: ['Access control', 'Surveillance', 'Response'] },
    ],
    head: { title: 'CISO', requiredSkills: ['security', 'risk', 'technology'], reportingLine: 'c_suite', cSuiteLiaison: 'ciso' },
  },
  {
    id: 'product',
    name: 'Product',
    category: 'core',
    functions: [
      { id: 'product_mgmt', name: 'Product Management', description: 'Product strategy', keyActivities: ['Roadmap', 'Features', 'Launch'] },
      { id: 'ux', name: 'UX/Design', description: 'User experience', keyActivities: ['Research', 'Design', 'Testing'] },
    ],
    head: { title: 'CPO', requiredSkills: ['product', 'ux', 'strategy'], reportingLine: 'c_suite', cSuiteLiaison: 'cto' },
  },
];

// ============================================
// DEPARTMENT TEMPLATES (EXPANDED)
// ============================================

export const DEPARTMENT_TEMPLATES: BuilderTemplate[] = [
  {
    id: 'innovation_lab',
    name: 'Innovation Lab',
    description: 'Experimental R&D unit for emerging technologies',
    mode: 'department',
    category: 'specialized',
    icon: 'Lightbulb',
    presetData: {
      category: 'specialized',
      functions: DEPARTMENT_FUNCTION_TEMPLATES.specialized.filter(f => f.id === 'innovation'),
      kpis: DEPARTMENT_KPI_TEMPLATES.specialized,
      agentAllocation: AGENT_ALLOCATION_TEMPLATES.specialized,
      intelligenceFeatures: { predictive: true, sentiment: false, anomaly: false },
      head: {
        title: 'VP of Innovation',
        requiredSkills: ['innovation', 'research', 'technology'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'cto',
      },
    },
  },
  {
    id: 'customer_insights',
    name: 'Customer Insights Center',
    description: 'Deep analytics unit focused on customer behavior',
    mode: 'department',
    category: 'specialized',
    icon: 'Users',
    presetData: {
      category: 'specialized',
      functions: [
        {
          id: 'voice_of_customer',
          name: 'Voice of Customer',
          description: 'Aggregate and analyze customer feedback',
          keyActivities: ['Feedback collection', 'Sentiment analysis', 'Insight generation'],
        },
        {
          id: 'behavior_analytics',
          name: 'Behavior Analytics',
          description: 'Track and predict customer behavior',
          keyActivities: ['Journey mapping', 'Cohort analysis', 'Prediction modeling'],
        },
      ],
      kpis: [
        { metric: 'Insight Generation', target: '50+/month', measurement: 'Reports delivered', frequency: 'monthly' },
        { metric: 'Prediction Accuracy', target: '> 85%', measurement: 'Model performance', frequency: 'monthly' },
      ],
      agentAllocation: [
        { agentType: 'learning', count: 10, purpose: 'Advanced analytics' },
        { agentType: 'swarm', count: 3, purpose: 'Data processing' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: true, anomaly: true },
      head: {
        title: 'Director of Customer Insights',
        requiredSkills: ['analytics', 'customer_focus', 'data_science'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'cdao',
      },
    },
  },
  {
    id: 'sustainability',
    name: 'Sustainability Office',
    description: 'ESG and environmental impact management',
    mode: 'department',
    category: 'support',
    icon: 'Leaf',
    presetData: {
      category: 'support',
      functions: [
        {
          id: 'esg_compliance',
          name: 'ESG Compliance',
          description: 'Environmental, social, governance compliance',
          keyActivities: ['Reporting', 'Certification', 'Audit management'],
        },
        {
          id: 'green_ops',
          name: 'Green Operations',
          description: 'Reduce environmental footprint',
          keyActivities: ['Carbon tracking', 'Waste reduction', 'Energy efficiency'],
        },
      ],
      kpis: [
        { metric: 'Carbon Footprint', target: '-20% YoY', measurement: 'CO2 tons', frequency: 'yearly' },
        { metric: 'ESG Score', target: 'A rating', measurement: 'Third-party rating', frequency: 'yearly' },
      ],
      agentAllocation: [
        { agentType: 'reactive', count: 3, purpose: 'Data collection' },
        { agentType: 'learning', count: 5, purpose: 'Impact analysis' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: false, anomaly: true },
      head: {
        title: 'Chief Sustainability Officer',
        requiredSkills: ['sustainability', 'compliance', 'strategy'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'coo',
      },
    },
  },
  {
    id: 'digital_transformation',
    name: 'Digital Transformation Office',
    description: 'Drive company-wide digital modernization',
    mode: 'department',
    category: 'specialized',
    icon: 'RefreshCw',
    presetData: {
      category: 'specialized',
      functions: [
        {
          id: 'transformation_strategy',
          name: 'Transformation Strategy',
          description: 'Plan and execute digital initiatives',
          keyActivities: ['Roadmap planning', 'Change management', 'Technology selection'],
        },
        {
          id: 'process_automation',
          name: 'Process Automation',
          description: 'Automate manual workflows',
          keyActivities: ['RPA implementation', 'AI integration', 'Efficiency tracking'],
        },
      ],
      kpis: [
        { metric: 'Digital Adoption', target: '> 90%', measurement: 'Employee usage', frequency: 'quarterly' },
        { metric: 'Process Efficiency', target: '+30%', measurement: 'Time savings', frequency: 'quarterly' },
      ],
      agentAllocation: [
        { agentType: 'learning', count: 8, purpose: 'Process analysis' },
        { agentType: 'swarm', count: 4, purpose: 'Change support' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: true, anomaly: true },
      head: {
        title: 'Chief Digital Officer',
        requiredSkills: ['digital', 'change_management', 'technology'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'cdoo',
      },
    },
  },
  // NEW: Additional Templates
  {
    id: 'ai_research_lab',
    name: 'AI Research Laboratory',
    description: 'Advanced AI/ML research and development',
    mode: 'department',
    category: 'specialized',
    icon: 'Brain',
    presetData: {
      category: 'specialized',
      functions: [
        {
          id: 'ml_research',
          name: 'Machine Learning Research',
          description: 'Develop new ML models and algorithms',
          keyActivities: ['Model research', 'Algorithm development', 'Publication'],
        },
        {
          id: 'ai_prototyping',
          name: 'AI Prototyping',
          description: 'Build AI proof-of-concepts',
          keyActivities: ['Rapid prototyping', 'Experimentation', 'Validation'],
        },
      ],
      kpis: [
        { metric: 'Research Papers', target: '6/year', measurement: 'Publications', frequency: 'yearly' },
        { metric: 'Patents Filed', target: '3/year', measurement: 'New patents', frequency: 'yearly' },
      ],
      agentAllocation: [
        { agentType: 'learning', count: 10, purpose: 'Model training' },
        { agentType: 'swarm', count: 5, purpose: 'Distributed computing' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: false, anomaly: true },
      head: {
        title: 'VP of AI Research',
        requiredSkills: ['ai', 'research', 'leadership'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'cdao',
      },
    },
  },
  {
    id: 'partner_ecosystem',
    name: 'Partner Ecosystem',
    description: 'Manage strategic partnerships and alliances',
    mode: 'department',
    category: 'core',
    icon: 'Handshake',
    presetData: {
      category: 'core',
      functions: [
        {
          id: 'partner_management',
          name: 'Partner Management',
          description: 'Build and maintain partner relationships',
          keyActivities: ['Partner onboarding', 'Relationship management', 'Performance tracking'],
        },
        {
          id: 'alliance_strategy',
          name: 'Alliance Strategy',
          description: 'Develop strategic alliances',
          keyActivities: ['Market analysis', 'Partnership negotiations', 'Value creation'],
        },
      ],
      kpis: [
        { metric: 'Active Partners', target: '20+', measurement: 'Partner count', frequency: 'quarterly' },
        { metric: 'Partner Revenue', target: '15% of total', measurement: 'Revenue share', frequency: 'quarterly' },
      ],
      agentAllocation: [
        { agentType: 'reactive', count: 4, purpose: 'Partner support' },
        { agentType: 'learning', count: 3, purpose: 'Analytics' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: true, anomaly: false },
      head: {
        title: 'VP of Partnerships',
        requiredSkills: ['partnerships', 'strategy', 'negotiation'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'cmo',
      },
    },
  },
  {
    id: 'global_expansion',
    name: 'Global Expansion Office',
    description: 'International growth and localization',
    mode: 'department',
    category: 'regional',
    icon: 'Globe',
    presetData: {
      category: 'regional',
      functions: [
        {
          id: 'market_entry',
          name: 'Market Entry Strategy',
          description: 'Plan and execute new market entries',
          keyActivities: ['Market research', 'Regulatory compliance', 'Launch planning'],
        },
        {
          id: 'localization',
          name: 'Localization & Adaptation',
          description: 'Adapt products for local markets',
          keyActivities: ['Cultural adaptation', 'Language localization', 'Regional customization'],
        },
      ],
      kpis: [
        { metric: 'Markets Entered', target: '2/year', measurement: 'New markets', frequency: 'yearly' },
        { metric: 'Local Revenue', target: '25% of total', measurement: 'Regional revenue', frequency: 'quarterly' },
      ],
      agentAllocation: [
        { agentType: 'learning', count: 5, purpose: 'Market analysis' },
        { agentType: 'reactive', count: 3, purpose: 'Local support' },
      ],
      intelligenceFeatures: { predictive: true, sentiment: true, anomaly: false },
      head: {
        title: 'VP of Global Expansion',
        requiredSkills: ['international', 'strategy', 'cultural_intelligence'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'ceo',
      },
    },
  },
  {
    id: 'crisis_management',
    name: 'Crisis Management Center',
    description: 'Emergency response and business continuity',
    mode: 'department',
    category: 'specialized',
    icon: 'AlertTriangle',
    presetData: {
      category: 'specialized',
      functions: [
        {
          id: 'incident_response',
          name: 'Incident Response',
          description: 'Manage crisis situations',
          keyActivities: ['Crisis detection', 'Response coordination', 'Communication'],
        },
        {
          id: 'business_continuity',
          name: 'Business Continuity',
          description: 'Ensure operations during disruptions',
          keyActivities: ['Risk assessment', 'Recovery planning', 'Testing'],
        },
      ],
      kpis: [
        { metric: 'Response Time', target: '< 30 min', measurement: 'Time to respond', frequency: 'monthly' },
        { metric: 'Recovery RTO', target: '< 4 hours', measurement: 'Recovery time', frequency: 'quarterly' },
      ],
      agentAllocation: [
        { agentType: 'swarm', count: 6, purpose: 'Emergency response' },
        { agentType: 'reactive', count: 4, purpose: 'Monitoring' },
      ],
      intelligenceFeatures: { predictive: false, sentiment: true, anomaly: true },
      head: {
        title: 'Chief Risk Officer',
        requiredSkills: ['crisis_management', 'risk', 'operations'],
        reportingLine: 'c_suite',
        cSuiteLiaison: 'coo',
      },
    },
  },
];

// ============================================
// VALIDATION FUNCTIONS
// ============================================

import type { ValidationResult } from '../types/builder';

export function validateDepartmentName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { field: 'name', isValid: false, message: 'Department name is required', severity: 'error' };
  }
  if (name.length < 3) {
    return { field: 'name', isValid: false, message: 'Name must be at least 3 characters', severity: 'error' };
  }
  if (name.length > 50) {
    return { field: 'name', isValid: false, message: 'Name must be less than 50 characters', severity: 'error' };
  }
  return { field: 'name', isValid: true, severity: 'info' };
}

export function validateDepartmentFunctions(functions: any[]): ValidationResult {
  if (!functions || functions.length === 0) {
    return { field: 'functions', isValid: false, message: 'At least one function is required', severity: 'error' };
  }
  if (functions.length > 5) {
    return { field: 'functions', isValid: false, message: 'Maximum 5 functions allowed', severity: 'warning' };
  }
  return { field: 'functions', isValid: true, severity: 'info' };
}

export function validateAgentAllocation(allocation: any[]): ValidationResult {
  const totalAgents = allocation?.reduce((sum, a) => sum + (a.count || 0), 0) || 0;
  if (totalAgents === 0) {
    return { field: 'agentAllocation', isValid: false, message: 'At least one agent is required', severity: 'error' };
  }
  if (totalAgents > 50) {
    return { field: 'agentAllocation', isValid: false, message: 'Maximum 50 agents per department', severity: 'warning' };
  }
  return { field: 'agentAllocation', isValid: true, severity: 'info' };
}

// ============================================
// DEPARTMENT PRESETS BY USE CASE
// ============================================

export const DEPARTMENT_PRESETS_BY_USECASE = {
  startup: {
    name: 'Startup Essentials',
    description: 'Core departments for a new company',
    departments: ['executive', 'technology', 'marketing', 'sales', 'customer_experience'],
    totalBudget: '$350K/month',
  },
  enterprise: {
    name: 'Enterprise Full Suite',
    description: 'Complete enterprise department structure',
    departments: ['executive', 'finance', 'technology', 'marketing', 'sales', 'customer_experience', 'operations', 'human_resources', 'legal_compliance', 'security', 'data_intelligence'],
    totalBudget: '$1.2M/month',
  },
  fintech: {
    name: 'FinTech Stack',
    description: 'Financial technology company structure',
    departments: ['executive', 'finance', 'technology', 'security', 'legal_compliance', 'data_intelligence', 'trading_investments'],
    totalBudget: '$800K/month',
  },
  healthcare: {
    name: 'Healthcare Organization',
    description: 'Medical and healthcare services',
    departments: ['executive', 'healthcare_medical', 'operations', 'legal_compliance', 'insurance_risk', 'human_resources', 'finance'],
    totalBudget: '$600K/month',
  },
  manufacturing: {
    name: 'Manufacturing Company',
    description: 'Production and logistics company',
    departments: ['executive', 'manufacturing_production', 'transportation_logistics', 'operations', 'technology', 'finance'],
    totalBudget: '$550K/month',
  },
};

// ============================================
// VALIDATION RULES
// ============================================

export const DEPARTMENT_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s&-]+$/,
    required: true,
  },
  category: {
    required: true,
    allowedValues: ['core', 'support', 'specialized', 'regional'],
  },
  functions: {
    minCount: 1,
    maxCount: 5,
    required: true,
  },
  head: {
    title: {
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    requiredSkills: {
      minCount: 2,
      maxCount: 10,
      required: true,
    },
  },
  agentAllocation: {
    minCount: 1,
    maxCount: 10,
    required: true,
  },
  kpis: {
    minCount: 2,
    maxCount: 8,
    required: true,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateDepartmentId(name: string): string {
  const prefix = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 4);
  const timestamp = Date.now().toString(36).toUpperCase().substring(0, 4);
  return `DEPT-${prefix}-${timestamp}`;
}

export function calculateDepartmentBudget(
  agentAllocation: { agentType: string; count: number }[],
  employeeCount: number,
  intelligenceFeatures: { predictive: boolean; sentiment: boolean; anomaly: boolean }
): { monthlyTokenBudget: number; operationalBudget: string } {
  // Base token allocation per agent type
  const tokenPerAgent: Record<string, number> = {
    reactive: 15000,
    learning: 35000,
    swarm: 100000,
  };
  
  let totalTokens = 0;
  for (const allocation of agentAllocation) {
    totalTokens += tokenPerAgent[allocation.agentType] * allocation.count;
  }
  
  // Intelligence layer costs
  if (intelligenceFeatures.predictive) totalTokens += 50000;
  if (intelligenceFeatures.sentiment) totalTokens += 30000;
  if (intelligenceFeatures.anomaly) totalTokens += 40000;
  
  // Employee overhead (approximate)
  const employeeOverhead = employeeCount * 5000;
  
  const monthlyTokenBudget = totalTokens + employeeOverhead;
  
  // Estimate operational budget (salaries, tools, etc.)
  const avgSalary = 80000;
  const monthlyOps = (employeeCount * avgSalary) / 12;
  const operationalBudget = `$${(monthlyOps / 1000).toFixed(1)}K/month`;
  
  return { monthlyTokenBudget, operationalBudget };
}

export function getRecommendedCSuite(category: string, functions: string[]): string {
  // Logic to recommend appropriate C-Suite liaison
  const mappings: Record<string, string> = {
    'revenue': 'cs',
    'marketing': 'cmo',
    'finance': 'cfo',
    'technology': 'cto',
    'operations': 'coo',
    'hr': 'chro',
    'legal': 'clo',
    'security': 'ciso',
    'data': 'cdao',
    'automation': 'cao_auto',
    'customer': 'cco',
  };
  
  for (const [keyword, cSuite] of Object.entries(mappings)) {
    if (functions.some(f => f.toLowerCase().includes(keyword))) {
      return cSuite;
    }
  }
  
  return 'ceo'; // Default to CEO
}
