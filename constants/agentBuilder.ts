/**
 * =============================================================================
 * AI AGENT BUILDER - Configuration & Templates
 * =============================================================================
 *
 * Default configurations, templates, and presets for creating custom AI agents
 * within the 7-tier enterprise hierarchy.
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-21
 */

import type {
  AgentTypeConfig,
  AgentSkill,
  IntelligenceFeature,
  AgentPersonality,
  BuilderTemplate,
} from '../types/builder';

// ============================================
// AGENT TYPE CONFIGURATIONS
// ============================================

export const AGENT_TYPES: AgentTypeConfig[] = [
  {
    id: 'reactive',
    name: 'Reactive Agent',
    description: 'Waits for requests and responds immediately. Best for support, FAQs, and routine queries.',
    icon: 'Zap',
    features: [
      '24/7 availability',
      'Instant response',
      'Standard query handling',
      'Escalation routing',
    ],
    tokenBudget: {
      min: 5000,
      max: 50000,
      default: 15000,
    },
    responseTime: '< 1 second',
    useCases: [
      'Customer support',
      'FAQ answering',
      'Password resets',
      'Order tracking',
      'Account inquiries',
    ],
  },
  {
    id: 'learning',
    name: 'Learning Agent',
    description: 'Improves from every interaction. Reduces maintenance and increases accuracy over time.',
    icon: 'Brain',
    features: [
      'Self-improvement',
      'Pattern recognition',
      'Accuracy optimization',
      'Historical analysis',
    ],
    tokenBudget: {
      min: 10000,
      max: 100000,
      default: 35000,
    },
    responseTime: '< 2 seconds',
    useCases: [
      'Complex problem solving',
      'Personalized recommendations',
      'Trend analysis',
      'Predictive suggestions',
      'Knowledge management',
    ],
  },
  {
    id: 'swarm',
    name: 'Swarm Agent',
    description: 'Self-organizes dynamically with other agents. Handles complex, unpredictable scenarios at scale.',
    icon: 'Network',
    features: [
      'Dynamic teaming',
      'Load balancing',
      'Resilience',
      'Infinite scalability',
    ],
    tokenBudget: {
      min: 20000,
      max: 500000,
      default: 100000,
    },
    responseTime: '< 3 seconds',
    useCases: [
      'Black Friday / sale events',
      'Crisis management',
      'Multi-step workflows',
      'Surge handling',
      'Distributed tasks',
    ],
  },
];

// ============================================
// INTELLIGENCE LAYER FEATURES
// ============================================

export const INTELLIGENCE_FEATURES: IntelligenceFeature[] = [
  {
    id: 'predictive',
    name: 'Predictive Engine',
    icon: 'TrendingUp',
    description: 'Forecasts demand, predicts churn, spots trends, anticipates needs.',
    businessImpact: '+30% retention rate',
    enabled: false,
  },
  {
    id: 'sentiment',
    name: 'Sentiment Core',
    icon: 'Heart',
    description: 'Real-time emotion detection, satisfaction tracking, mood-based routing.',
    businessImpact: '+25% CSAT score',
    enabled: false,
  },
  {
    id: 'anomaly',
    name: 'Anomaly Detector',
    icon: 'Shield',
    description: 'Fraud detection, security threats, pattern breaks, risk warnings.',
    businessImpact: '-90% fraud losses',
    enabled: false,
  },
];

// ============================================
// SKILL LIBRARY BY DEPARTMENT
// ============================================

export const SKILL_LIBRARY: Record<string, AgentSkill[]> = {
  finance: [
    { id: 'fin_1', name: 'Budget Analysis', category: 'Analytics', description: 'Analyze and optimize budgets', level: 'intermediate' },
    { id: 'fin_2', name: 'ROI Calculation', category: 'Analytics', description: 'Calculate return on investment', level: 'advanced' },
    { id: 'fin_3', name: 'Expense Tracking', category: 'Operations', description: 'Monitor and categorize expenses', level: 'basic' },
    { id: 'fin_4', name: 'Financial Forecasting', category: 'Analytics', description: 'Predict financial trends', level: 'expert' },
    { id: 'fin_5', name: 'Invoice Processing', category: 'Operations', description: 'Process and verify invoices', level: 'basic' },
    { id: 'fin_6', name: 'Risk Assessment', category: 'Analytics', description: 'Evaluate financial risks', level: 'advanced' },
  ],
  technology: [
    { id: 'tech_1', name: 'Code Review', category: 'Technical', description: 'Review code for quality', level: 'expert' },
    { id: 'tech_2', name: 'Bug Triage', category: 'Technical', description: 'Categorize and prioritize bugs', level: 'intermediate' },
    { id: 'tech_3', name: 'System Monitoring', category: 'Operations', description: 'Monitor system health', level: 'intermediate' },
    { id: 'tech_4', name: 'API Integration', category: 'Technical', description: 'Integrate third-party APIs', level: 'advanced' },
    { id: 'tech_5', name: 'Security Audit', category: 'Technical', description: 'Perform security assessments', level: 'expert' },
    { id: 'tech_6', name: 'DevOps Automation', category: 'Technical', description: 'Automate deployment pipelines', level: 'advanced' },
  ],
  marketing: [
    { id: 'mkt_1', name: 'Campaign Management', category: 'Strategy', description: 'Plan and execute campaigns', level: 'advanced' },
    { id: 'mkt_2', name: 'Social Media', category: 'Content', description: 'Manage social media presence', level: 'intermediate' },
    { id: 'mkt_3', name: 'SEO Optimization', category: 'Technical', description: 'Optimize for search engines', level: 'intermediate' },
    { id: 'mkt_4', name: 'Content Creation', category: 'Content', description: 'Create marketing content', level: 'advanced' },
    { id: 'mkt_5', name: 'Lead Scoring', category: 'Analytics', description: 'Score and qualify leads', level: 'advanced' },
    { id: 'mkt_6', name: 'A/B Testing', category: 'Analytics', description: 'Run and analyze experiments', level: 'intermediate' },
  ],
  sales: [
    { id: 'sales_1', name: 'Lead Qualification', category: 'Operations', description: 'Qualify potential customers', level: 'intermediate' },
    { id: 'sales_2', name: 'Demo Scheduling', category: 'Operations', description: 'Schedule product demos', level: 'basic' },
    { id: 'sales_3', name: 'CRM Management', category: 'Technical', description: 'Manage customer relationships', level: 'intermediate' },
    { id: 'sales_4', name: 'Proposal Generation', category: 'Content', description: 'Create sales proposals', level: 'advanced' },
    { id: 'sales_5', name: 'Pipeline Analysis', category: 'Analytics', description: 'Analyze sales pipeline', level: 'advanced' },
    { id: 'sales_6', name: 'Negotiation Support', category: 'Strategy', description: 'Assist in negotiations', level: 'expert' },
  ],
  customer_experience: [
    { id: 'cx_1', name: 'Ticket Resolution', category: 'Operations', description: 'Resolve support tickets', level: 'intermediate' },
    { id: 'cx_2', name: 'Complaint Handling', category: 'Operations', description: 'Manage customer complaints', level: 'advanced' },
    { id: 'cx_3', name: 'FAQ Management', category: 'Content', description: 'Maintain FAQ database', level: 'basic' },
    { id: 'cx_4', name: 'Escalation Routing', category: 'Operations', description: 'Route complex issues', level: 'intermediate' },
    { id: 'cx_5', name: 'Satisfaction Surveys', category: 'Analytics', description: 'Conduct CSAT surveys', level: 'basic' },
    { id: 'cx_6', name: 'Empathy Scoring', category: 'Analytics', description: 'Score customer empathy', level: 'advanced' },
  ],
  operations: [
    { id: 'ops_1', name: 'Process Optimization', category: 'Strategy', description: 'Optimize workflows', level: 'expert' },
    { id: 'ops_2', name: 'Resource Allocation', category: 'Operations', description: 'Allocate resources', level: 'advanced' },
    { id: 'ops_3', name: 'Quality Control', category: 'Operations', description: 'Monitor quality metrics', level: 'intermediate' },
    { id: 'ops_4', name: 'Supply Chain', category: 'Operations', description: 'Manage supply chain', level: 'advanced' },
    { id: 'ops_5', name: 'Incident Response', category: 'Operations', description: 'Handle operational incidents', level: 'expert' },
    { id: 'ops_6', name: 'Reporting Automation', category: 'Technical', description: 'Automate reports', level: 'intermediate' },
  ],
  human_resources: [
    { id: 'hr_1', name: 'Resume Screening', category: 'Operations', description: 'Screen job applications', level: 'intermediate' },
    { id: 'hr_2', name: 'Interview Scheduling', category: 'Operations', description: 'Schedule interviews', level: 'basic' },
    { id: 'hr_3', name: 'Onboarding', category: 'Operations', description: 'Guide new employees', level: 'intermediate' },
    { id: 'hr_4', name: 'Performance Reviews', category: 'Analytics', description: 'Analyze performance data', level: 'advanced' },
    { id: 'hr_5', name: 'Policy Compliance', category: 'Operations', description: 'Ensure HR compliance', level: 'advanced' },
    { id: 'hr_6', name: 'Employee Engagement', category: 'Analytics', description: 'Measure engagement', level: 'intermediate' },
  ],
  legal_compliance: [
    { id: 'legal_1', name: 'Contract Review', category: 'Operations', description: 'Review legal contracts', level: 'expert' },
    { id: 'legal_2', name: 'Compliance Check', category: 'Operations', description: 'Verify compliance', level: 'expert' },
    { id: 'legal_3', name: 'Risk Assessment', category: 'Analytics', description: 'Assess legal risks', level: 'expert' },
    { id: 'legal_4', name: 'Document Drafting', category: 'Content', description: 'Draft legal documents', level: 'advanced' },
    { id: 'legal_5', name: 'Regulatory Monitoring', category: 'Operations', description: 'Monitor regulations', level: 'advanced' },
    { id: 'legal_6', name: 'Dispute Resolution', category: 'Strategy', description: 'Support dispute resolution', level: 'expert' },
  ],
  data_intelligence: [
    { id: 'data_1', name: 'Data Analysis', category: 'Analytics', description: 'Analyze datasets', level: 'expert' },
    { id: 'data_2', name: 'Report Generation', category: 'Operations', description: 'Generate reports', level: 'intermediate' },
    { id: 'data_3', name: 'Visualization', category: 'Technical', description: 'Create data visualizations', level: 'advanced' },
    { id: 'data_4', name: 'Predictive Modeling', category: 'Analytics', description: 'Build predictive models', level: 'expert' },
    { id: 'data_5', name: 'ETL Pipeline', category: 'Technical', description: 'Manage data pipelines', level: 'advanced' },
    { id: 'data_6', name: 'Data Governance', category: 'Operations', description: 'Enforce data policies', level: 'expert' },
  ],
  product: [
    { id: 'product_1', name: 'User Research', category: 'Analytics', description: 'Conduct user research', level: 'advanced' },
    { id: 'product_2', name: 'Feature Prioritization', category: 'Strategy', description: 'Prioritize features', level: 'expert' },
    { id: 'product_3', name: 'Roadmap Planning', category: 'Strategy', description: 'Plan product roadmaps', level: 'expert' },
    { id: 'product_4', name: 'A/B Testing', category: 'Analytics', description: 'Run product experiments', level: 'intermediate' },
    { id: 'product_5', name: 'Competitor Analysis', category: 'Analytics', description: 'Analyze competitors', level: 'advanced' },
    { id: 'product_6', name: 'Feedback Analysis', category: 'Analytics', description: 'Analyze user feedback', level: 'intermediate' },
  ],
  security: [
    { id: 'sec_1', name: 'Threat Detection', category: 'Technical', description: 'Detect security threats', level: 'expert' },
    { id: 'sec_2', name: 'Vulnerability Scanning', category: 'Technical', description: 'Scan for vulnerabilities', level: 'advanced' },
    { id: 'sec_3', name: 'Access Control', category: 'Operations', description: 'Manage access rights', level: 'intermediate' },
    { id: 'sec_4', name: 'Incident Response', category: 'Operations', description: 'Respond to incidents', level: 'expert' },
    { id: 'sec_5', name: 'Security Audits', category: 'Analytics', description: 'Perform security audits', level: 'expert' },
    { id: 'sec_6', name: 'Compliance Monitoring', category: 'Operations', description: 'Monitor security compliance', level: 'advanced' },
  ],
};

// ============================================
// PERSONALITY TRAITS
// ============================================

export const PERSONALITY_TRAITS: AgentPersonality[] = [
  { trait: 'Professionalism', value: 8, description: 'Maintains formal, business-appropriate tone' },
  { trait: 'Empathy', value: 7, description: 'Shows understanding and emotional intelligence' },
  { trait: 'Proactivity', value: 6, description: 'Takes initiative in interactions' },
  { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
  { trait: 'Creativity', value: 5, description: 'Offers innovative solutions' },
  { trait: 'Analytical', value: 7, description: 'Breaks down problems logically' },
  { trait: 'Friendly', value: 6, description: 'Warm and approachable demeanor' },
  { trait: 'Assertiveness', value: 5, description: 'Confidently guides conversations' },
];

// ============================================
// VALIDATION FUNCTIONS
// ============================================

import type { ValidationResult } from '../types/builder';

export function validateAgentName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return {
      field: 'name',
      isValid: false,
      message: 'Agent name is required',
      severity: 'error',
    };
  }
  if (name.length < 3) {
    return {
      field: 'name',
      isValid: false,
      message: 'Name must be at least 3 characters',
      severity: 'error',
    };
  }
  if (name.length > 50) {
    return {
      field: 'name',
      isValid: false,
      message: 'Name must be less than 50 characters',
      severity: 'error',
    };
  }
  if (!/^[a-zA-Z0-9\s-_]+$/.test(name)) {
    return {
      field: 'name',
      isValid: false,
      message: 'Name can only contain letters, numbers, spaces, hyphens, and underscores',
      severity: 'error',
    };
  }
  return { field: 'name', isValid: true, severity: 'info' };
}

export function validateAgentRole(role: string): ValidationResult {
  if (!role || role.trim().length === 0) {
    return {
      field: 'role',
      isValid: false,
      message: 'Role is required',
      severity: 'error',
    };
  }
  if (role.length < 5) {
    return {
      field: 'role',
      isValid: false,
      message: 'Role must be at least 5 characters',
      severity: 'error',
    };
  }
  return { field: 'role', isValid: true, severity: 'info' };
}

export function validateAgentSkills(skills: any[]): ValidationResult {
  if (!skills || skills.length === 0) {
    return {
      field: 'skills',
      isValid: false,
      message: 'At least one skill is required',
      severity: 'error',
    };
  }
  if (skills.length > 10) {
    return {
      field: 'skills',
      isValid: false,
      message: 'Maximum 10 skills allowed',
      severity: 'warning',
    };
  }
  return { field: 'skills', isValid: true, severity: 'info' };
}

export function validateTokenBudget(budget: number): ValidationResult {
  if (!budget || budget < 5000) {
    return {
      field: 'tokenBudget',
      isValid: false,
      message: 'Minimum token budget is 5,000',
      severity: 'error',
    };
  }
  if (budget > 500000) {
    return {
      field: 'tokenBudget',
      isValid: false,
      message: 'Maximum token budget is 500,000',
      severity: 'error',
    };
  }
  return { field: 'tokenBudget', isValid: true, severity: 'info' };
}

// ============================================
// COST CALCULATION
// ============================================

export function calculateDetailedAgentCost(
  agentType: string,
  tokenBudget: number,
  intelligenceFeatures: string[],
  estimatedRequests: number = 10000
): {
  baseCost: number;
  intelligenceCost: number;
  totalMonthly: number;
  costPerRequest: string;
  monthlyCostFormatted: string;
} {
  const TOKEN_RATE = 0.00001; // $0.01 per 1000 tokens
  const baseCost = tokenBudget * TOKEN_RATE;
  
  // Intelligence layer cost
  const INTELLIGENCE_COSTS: Record<string, number> = {
    predictive: 50,
    sentiment: 30,
    anomaly: 40,
  };
  
  let intelligenceCost = 0;
  intelligenceFeatures.forEach(feature => {
    if (INTELLIGENCE_COSTS[feature]) {
      intelligenceCost += INTELLIGENCE_COSTS[feature];
    }
  });
  
  const totalMonthly = baseCost + intelligenceCost;
  const costPerReq = totalMonthly / estimatedRequests;
  
  return {
    baseCost,
    intelligenceCost,
    totalMonthly,
    costPerRequest: `$${costPerReq.toFixed(5)}`,
    monthlyCostFormatted: `$${totalMonthly.toFixed(2)}`,
  };
}

// ============================================
// AGENT TEMPLATES (EXPANDED)
// ============================================

export const AGENT_TEMPLATES: BuilderTemplate[] = [
  {
    id: 'support_bot',
    name: 'Customer Support Bot',
    description: 'Handles common support queries and ticket routing',
    mode: 'agent',
    category: 'customer_experience',
    icon: 'Headphones',
    presetData: {
      agentType: 'reactive',
      skills: ['cx_1', 'cx_2', 'cx_3', 'cx_4'],
      intelligenceFeatures: [{ id: 'sentiment', enabled: true }],
      tokenBudget: 15000,
    },
  },
  {
    id: 'sales_assistant',
    name: 'Sales Assistant',
    description: 'Qualifies leads and supports the sales process',
    mode: 'agent',
    category: 'sales',
    icon: 'DollarSign',
    presetData: {
      agentType: 'learning',
      skills: ['sales_1', 'sales_2', 'sales_3', 'sales_5'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }],
      tokenBudget: 30000,
    },
  },
  {
    id: 'marketing_analyst',
    name: 'Marketing Analyst',
    description: 'Analyzes campaign performance and trends',
    mode: 'agent',
    category: 'marketing',
    icon: 'TrendingUp',
    presetData: {
      agentType: 'learning',
      skills: ['mkt_1', 'mkt_5', 'mkt_6'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }, { id: 'anomaly', enabled: true }],
      tokenBudget: 35000,
    },
  },
  {
    id: 'security_guardian',
    name: 'Security Guardian',
    description: 'Monitors and responds to security threats',
    mode: 'agent',
    category: 'security',
    icon: 'Shield',
    presetData: {
      agentType: 'swarm',
      skills: ['sec_1', 'sec_2', 'sec_4', 'sec_5'],
      intelligenceFeatures: [{ id: 'anomaly', enabled: true }],
      tokenBudget: 80000,
    },
  },
  {
    id: 'hr_coordinator',
    name: 'HR Coordinator',
    description: 'Handles HR operations and employee inquiries',
    mode: 'agent',
    category: 'human_resources',
    icon: 'Users',
    presetData: {
      agentType: 'reactive',
      skills: ['hr_1', 'hr_2', 'hr_3', 'hr_5'],
      intelligenceFeatures: [{ id: 'sentiment', enabled: true }],
      tokenBudget: 20000,
    },
  },
  {
    id: 'finance_analyst',
    name: 'Financial Analyst',
    description: 'Analyzes financial data and generates reports',
    mode: 'agent',
    category: 'finance',
    icon: 'TrendingUp',
    presetData: {
      agentType: 'learning',
      skills: ['fin_1', 'fin_2', 'fin_4', 'fin_6'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }, { id: 'anomaly', enabled: true }],
      tokenBudget: 40000,
    },
  },
  {
    id: 'devops_automator',
    name: 'DevOps Automator',
    description: 'Automates deployment and infrastructure tasks',
    mode: 'agent',
    category: 'technology',
    icon: 'Cpu',
    presetData: {
      agentType: 'swarm',
      skills: ['tech_3', 'tech_5', 'tech_6'],
      intelligenceFeatures: [{ id: 'anomaly', enabled: true }],
      tokenBudget: 60000,
    },
  },
  {
    id: 'legal_assistant',
    name: 'Legal Assistant',
    description: 'Supports legal document review and compliance',
    mode: 'agent',
    category: 'legal_compliance',
    icon: 'Scale',
    presetData: {
      agentType: 'learning',
      skills: ['legal_1', 'legal_2', 'legal_3', 'legal_4'],
      intelligenceFeatures: [{ id: 'anomaly', enabled: true }],
      tokenBudget: 45000,
    },
  },
  // NEW: Additional Templates
  {
    id: 'data_analyst',
    name: 'Data Analyst Bot',
    description: 'Analyzes data and generates insights',
    mode: 'agent',
    category: 'data_intelligence',
    icon: 'BarChart3',
    presetData: {
      agentType: 'learning',
      skills: ['data_1', 'data_2', 'data_4', 'data_5'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }, { id: 'anomaly', enabled: true }],
      tokenBudget: 50000,
    },
  },
  {
    id: 'product_manager_bot',
    name: 'Product Manager AI',
    description: 'Assists with product strategy and roadmaps',
    mode: 'agent',
    category: 'product',
    icon: 'Box',
    presetData: {
      agentType: 'learning',
      skills: ['product_1', 'product_2', 'product_3', 'product_6'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }],
      tokenBudget: 40000,
    },
  },
  {
    id: 'recruiting_bot',
    name: 'Recruiting Assistant',
    description: 'Screens resumes and schedules interviews',
    mode: 'agent',
    category: 'human_resources',
    icon: 'Users',
    presetData: {
      agentType: 'reactive',
      skills: ['hr_1', 'hr_2', 'hr_3', 'hr_6'],
      intelligenceFeatures: [{ id: 'sentiment', enabled: true }],
      tokenBudget: 25000,
    },
  },
  {
    id: 'social_media_bot',
    name: 'Social Media Manager',
    description: 'Manages social presence and engagement',
    mode: 'agent',
    category: 'marketing',
    icon: 'Megaphone',
    presetData: {
      agentType: 'swarm',
      skills: ['mkt_2', 'mkt_4', 'mkt_6'],
      intelligenceFeatures: [{ id: 'sentiment', enabled: true }, { id: 'predictive', enabled: true }],
      tokenBudget: 35000,
    },
  },
  {
    id: 'inventory_bot',
    name: 'Inventory Manager',
    description: 'Tracks and optimizes inventory levels',
    mode: 'agent',
    category: 'operations',
    icon: 'Package',
    presetData: {
      agentType: 'learning',
      skills: ['ops_3', 'ops_4', 'ops_6'],
      intelligenceFeatures: [{ id: 'predictive', enabled: true }, { id: 'anomaly', enabled: true }],
      tokenBudget: 30000,
    },
  },
];

// ============================================
// QUICK PRESETS BY USE CASE
// ============================================

export const AGENT_PRESETS_BY_USECASE = {
  customer_support: {
    name: 'Customer Support Suite',
    description: 'Complete support team with reactive and learning agents',
    agents: [
      { template: 'support_bot', count: 3 },
      { template: 'hr_coordinator', count: 1 },
    ],
    totalBudget: 65000,
  },
  sales_team: {
    name: 'Sales Acceleration Pack',
    description: 'Lead qualification and sales support agents',
    agents: [
      { template: 'sales_assistant', count: 2 },
      { template: 'marketing_analyst', count: 1 },
    ],
    totalBudget: 95000,
  },
  security_ops: {
    name: 'Security Operations Center',
    description: 'Threat detection and response agents',
    agents: [
      { template: 'security_guardian', count: 2 },
      { template: 'devops_automator', count: 1 },
    ],
    totalBudget: 220000,
  },
  data_team: {
    name: 'Data Intelligence Unit',
    description: 'Analytics and insights generation agents',
    agents: [
      { template: 'data_analyst', count: 2 },
      { template: 'marketing_analyst', count: 1 },
      { template: 'finance_analyst', count: 1 },
    ],
    totalBudget: 175000,
  },
};

// ============================================
// TOKEN COST CALCULATOR
// ============================================

export function calculateAgentCost(
  agentType: string,
  tokenBudget: number,
  intelligenceFeatures: string[]
): { monthlyCost: string; costPerRequest: string } {
  const baseCost = tokenBudget * 0.00001; // $0.01 per 1000 tokens
  
  // Intelligence layer cost
  let intelligenceCost = 0;
  if (intelligenceFeatures.includes('predictive')) intelligenceCost += 50;
  if (intelligenceFeatures.includes('sentiment')) intelligenceCost += 30;
  if (intelligenceFeatures.includes('anomaly')) intelligenceCost += 40;
  
  const totalMonthly = baseCost + intelligenceCost;
  const costPerReq = totalMonthly / 10000; // Assume 10K requests/month
  
  return {
    monthlyCost: `$${totalMonthly.toFixed(2)}`,
    costPerRequest: `$${costPerReq.toFixed(4)}`,
  };
}

// ============================================
// VALIDATION RULES
// ============================================

export const AGENT_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s-_]+$/,
    required: true,
  },
  role: {
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  departmentId: {
    required: true,
  },
  skills: {
    minCount: 1,
    maxCount: 10,
    required: true,
  },
  tokenBudget: {
    min: 5000,
    max: 500000,
    required: true,
  },
};
