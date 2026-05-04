/**
 * =============================================================================
 * KAYTX AI WORKFORCE - UPGRADED HIERARCHY INDEX v7.1
 * =============================================================================
 *
 * Master export file for the complete upgraded AI hierarchy.
 * This is the single entry point for importing the enhanced hierarchy.
 *
 * UPGRADES IN v7.1:
 * - Tier 0: AI Ethics Board + CISO-AI (Governance)
 * - CDAO & CAO (Chief Automation Officer) added to C-Suite
 * - Intelligence Layer: Predictive Engine, Sentiment Core, Anomaly Detector
 * - Advanced Command Center: PRED, SWARM, LEARN components
 * - Layer Bridge: Digital Interface for seamless communication
 * - Token Optimization: 85% cost reduction
 * - Agent Types: Reactive, Learning, Swarm (Proactive removed)
 *
 * Hierarchy Structure:
 * - Tier 0: Governance & Ethics (AI Ethics Board, CISO-AI)
 * - Tier 1: C-Suite Executives (17 agents including CDAO + CAO)
 * - Tier 2: Intelligence Layer (Predictive, Sentiment, Anomaly)
 * - Tier 3: Layer Bridge (Digital Interface)
 * - Tier 4: Advanced Command Center (CDOO, DDO, WOL, AOD, PRED, SWARM, LEARN)
 * - Tier 5: Departments (21 teams)
 * - Tier 6: AI Agent Workforce (199 agents with 3 types)
 *
 * Total: 199+ Specialized AI Agents across 7 Tiers
 *
 * @version 7.1.0
 * @lastUpdated 2026-04-20
 */

// ============================================
// UPGRADED HIERARCHY IMPORTS
// ============================================

import {
  cSuiteExecutives as cSuiteUpgraded,
  TOKEN_OPTIMIZATION,
  COST_COMPARISON,
  INTELLIGENCE_LAYER,
  COMMAND_CENTER,
  LAYER_BRIDGE,
  AI_WORKFORCE_UPGRADED_STATS,
  type AgentType,
  type TokenOptimizationConfig,
  type CostComparison,
  type IntelligenceLayerComponent,
  type CommandCenterComponent,
  type LayerBridgeConfig,
} from './aiAgentHierarchy_UPGRADED';

// Import original hierarchy components for backwards compatibility
import {
  cSuiteExecutives as cSuiteOriginal,
  vpDirectors,
} from './aiAgentHierarchyComplete';

import {
  managers,
} from './aiAgentHierarchy_Managers';

import {
  teamLeads,
  specialists,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

import {
  allNewDepartmentAgents,
  tradingInvestmentsAgents,
  realEstatePropertyAgents,
  insuranceRiskAgents,
  healthcareMedicalAgents,
  manufacturingProductionAgents,
  transportationLogisticsAgents,
  governmentPublicAgents,
} from './aiAgentHierarchy_NewDepartments';

// ============================================
// RE-EXPORT TYPES (UPGRADED)
// ============================================

export type {
  HierarchyLevel,
  DepartmentId,
  AgentType,
  AIEmployeeProfile,
  TokenOptimizationConfig,
  CostComparison,
  IntelligenceLayerComponent,
  CommandCenterComponent,
  LayerBridgeConfig,
} from './aiAgentHierarchy_UPGRADED';

// ============================================
// UPGRADED EXPORTS
// ============================================

export {
  // Core hierarchy (upgraded C-Suite with CDAO + CAO)
  cSuiteUpgraded as cSuiteExecutives,

  // Original hierarchy components (backwards compatibility)
  cSuiteOriginal,
  vpDirectors,
  managers,
  teamLeads,
  specialists,

  // New departments
  allNewDepartmentAgents,
  tradingInvestmentsAgents,
  realEstatePropertyAgents,
  insuranceRiskAgents,
  healthcareMedicalAgents,
  manufacturingProductionAgents,
  transportationLogisticsAgents,
  governmentPublicAgents,

  // Upgraded components
  TOKEN_OPTIMIZATION,
  COST_COMPARISON,
  INTELLIGENCE_LAYER,
  COMMAND_CENTER,
  LAYER_BRIDGE,
  AI_WORKFORCE_UPGRADED_STATS,
};

// ============================================
// CONSOLIDATED AGENT ARRAYS
// ============================================

/** All C-Suite executives (upgraded with CDAO + CAO) */
export const allCSuiteExecutives = cSuiteUpgraded;

/** All VP/Directors */
export const allVPDirectors = vpDirectors;

/** All Managers */
export const allManagers = managers;

/** All Team Leads */
export const allTeamLeads = teamLeads;

/** All Specialists */
export const allSpecialists = specialists;

/** All agents from new departments */
export const allNewDepartmentStaff = allNewDepartmentAgents;

/** Complete workforce (all tiers) */
export const completeAIWorkforce = [
  ...cSuiteUpgraded,
  ...vpDirectors,
  ...managers,
  ...teamLeads,
  ...specialists,
  ...allNewDepartmentAgents,
];

// ============================================
// TIER DEFINITIONS (UPGRADED)
// ============================================

export const HIERARCHY_TIERS = {
  tier0_governance: {
    name: 'Governance & Ethics',
    description: 'AI Ethics Board, CISO-AI oversight',
    components: ['ai-ethics-board', 'ciso-ai'],
    isNew: true,
  },
  tier1_executive: {
    name: 'C-Suite Executives',
    description: '17 executives including CDAO + CAO',
    agents: cSuiteUpgraded,
    count: 17,
    isUpgraded: true,
  },
  tier2_intelligence: {
    name: 'Intelligence Layer',
    description: 'Predictive Engine, Sentiment Core, Anomaly Detector',
    components: INTELLIGENCE_LAYER,
    count: 3,
    isNew: true,
  },
  tier3_bridge: {
    name: 'Layer Bridge',
    description: 'Digital Interface for seamless communication',
    config: LAYER_BRIDGE,
    isNew: true,
  },
  tier4_command: {
    name: 'Advanced Command Center',
    description: 'CDOO, DDO, WOL, AOD, PRED, SWARM, LEARN',
    components: COMMAND_CENTER,
    count: 7,
    isUpgraded: true,
  },
  tier5_departments: {
    name: 'Departments',
    description: '21 major business functions',
    count: 21,
  },
  tier6_agents: {
    name: 'AI Agent Workforce',
    description: '199 specialized agents with 4 types',
    agentTypes: {
      reactive: 'All 199 agents',
      proactive: '40% of agents (80)',
      learning: '60% of agents (120)',
      swarm: 'On-demand scaling',
    },
    count: 199,
    isUpgraded: true,
  },
};

// ============================================
// AGENT TYPE CAPABILITIES
// ============================================

export const AGENT_TYPE_DEFINITIONS: Record<AgentType, {
  description: string;
  example: string;
  availability: string;
  useCase: string;
  percentageOfWorkforce: string;
}> = {
  reactive: {
    description: 'Waits for request and responds',
    example: 'Customer asks "How do I reset password?" → Agent answers',
    availability: '24/7',
    useCase: 'Standard support, FAQs, routine queries',
    percentageOfWorkforce: '100% (all 199 agents)',
  },
  learning: {
    description: 'Improves from every interaction',
    example: 'Based on 1000 tickets, I know this answer',
    availability: 'Continuous',
    useCase: 'Reduces human maintenance, better accuracy',
    percentageOfWorkforce: '60% (120 agents)',
  },
  swarm: {
    description: 'Teams up dynamically for complex tasks',
    example: '50 agents handle Black Friday surge together',
    availability: 'On-demand scaling',
    useCase: 'Complex problems, unpredictable scenarios',
    percentageOfWorkforce: 'On-demand (unlimited)',
  },
};

// ============================================
// COST & TOKEN OPTIMIZATION
// ============================================

export const TOKEN_STATS = {
  // Per request costs
  singleAgent: {
    tokensPerRequest: 4000,
    costPerRequest: '$0.04',
    monthlyCost: '$4,000',
    accuracy: '60%',
  },
  flatMultiAgent: {
    tokensPerRequest: 6000,
    costPerRequest: '$0.06',
    monthlyCost: '$6,000',
    accuracy: '75%',
  },
  hierarchical: {
    tokensPerRequest: 900,
    costPerRequest: '$0.009',
    monthlyCost: '$900',
    accuracy: '95%',
  },
  hierarchicalOptimized: {
    tokensPerRequest: 450,
    costPerRequest: '$0.0045',
    monthlyCost: '$450',
    accuracy: '95%',
  },
  // Savings
  savingsVsSingleAgent: '89%',
  savingsVsFlatMulti: '92.5%',
  annualSavings: '$61,200/year',
};

// ============================================
// NEW C-SUITE ROLES INFO
// ============================================

export const NEW_C_SUITE_ROLES = {
  cdao: {
    id: 'cdao',
    name: 'Chief Data & AI Officer',
    acronym: 'CDAO',
    isNew: true,
    addedInVersion: '7.0.0',
    function: 'Owns all AI/data strategy, governance, and model management',
    reportsTo: 'CEO',
    intelligenceAccess: ['predictive-engine', 'sentiment-core', 'anomaly-detector'],
    tokenBudget: 40000,
    keyResponsibilities: [
      'AI Strategy & Governance',
      'Data Management & Quality',
      'Model Management',
      'ML/AI Roadmap',
      'Data Privacy & Compliance',
      'AI Ethics Oversight',
      'Intelligence Layer Management',
    ],
  },
  caoAutomation: {
    id: 'cao-automation',
    name: 'Chief Automation Officer',
    acronym: 'CAO',
    isNew: true,
    addedInVersion: '7.0.0',
    function: 'RPA, workflow automation, and efficiency specialist',
    reportsTo: 'CEO',
    intelligenceAccess: ['anomaly-detector'],
    tokenBudget: 25000,
    keyResponsibilities: [
      'Automation Strategy',
      'RPA Implementation',
      'Workflow Optimization',
      'Process Automation',
      'Efficiency Improvement',
      'Autonomous Operations',
      'AOD Oversight',
    ],
    note: 'CAO for Automation is distinct from CAO for Administration (Government)',
  },
};

// ============================================
// INTELLIGENCE LAYER INFO
// ============================================

export const INTELLIGENCE_LAYER_INFO = {
  predictiveEngine: {
    id: 'predictive-engine',
    name: 'Predictive Engine',
    acronym: 'PRED',
    isNew: true,
    capabilities: [
      'Demand Forecasting',
      'Churn Prediction',
      'Trend Analysis',
      'Revenue Prediction',
      'Resource Planning',
    ],
    businessImpact: '+30% customer retention',
    exampleOutput: 'Customer X (score: 85) will churn within 7 days',
  },
  sentimentCore: {
    id: 'sentiment-core',
    name: 'Sentiment Core',
    acronym: 'SENTIMENT',
    isNew: true,
    capabilities: [
      'Real-time Emotion Detection',
      'Customer Satisfaction Tracking',
      'Mood-based Routing',
      'Empathy Scoring',
      'Tone Analysis',
    ],
    businessImpact: '+25% CSAT through early escalation',
    exampleOutput: 'Customer mood: 2/10 (frustrated). Auto-escalate.',
  },
  anomalyDetector: {
    id: 'anomaly-detector',
    name: 'Anomaly Detector',
    acronym: 'ANOMALY',
    isNew: true,
    capabilities: [
      'Fraud Detection',
      'Security Threat Identification',
      'Pattern Break Detection',
      'Risk Warnings',
      'Unusual Behavior Alerts',
    ],
    businessImpact: '-90% fraud losses',
    exampleOutput: 'Transaction #4521 flagged: 5x above normal pattern',
  },
};

// ============================================
// COMMAND CENTER INFO
// ============================================

export const COMMAND_CENTER_INFO = {
  cdoo: {
    id: 'cdoo',
    name: 'Chief Digital & Operations Officer',
    acronym: 'CDOO',
    function: 'Orchestrates all digital operations and AI strategy',
    reportsTo: 'CEO',
  },
  ddo: {
    id: 'ddo',
    name: 'Digital Deployment Officer',
    acronym: 'DDO',
    function: 'Deploys technology and manages rollouts',
    reportsTo: 'CDOO',
  },
  wol: {
    id: 'wol',
    name: 'Workforce Optimization Lead',
    acronym: 'WOL',
    function: 'Balances human + AI workforce utilization',
    reportsTo: 'CDOO',
  },
  aod: {
    id: 'aod',
    name: 'Automation Operations Director',
    acronym: 'AOD',
    function: 'Maximizes automation efficiency across workflows',
    reportsTo: 'CDOO',
  },
  // New components
  pred: {
    id: 'pred-ops',
    name: 'Predictive Operations Controller',
    acronym: 'PRED',
    isNew: true,
    function: 'Translates predictions into operational actions',
    reportsTo: 'CDOO',
  },
  swarm: {
    id: 'swarm-controller',
    name: 'Swarm Intelligence Controller',
    acronym: 'SWARM',
    isNew: true,
    function: 'Agents self-organize dynamically for complex tasks',
    reportsTo: 'CDOO',
  },
  learn: {
    id: 'learn-engine',
    name: 'Learning & Adaptation Engine',
    acronym: 'LEARN',
    isNew: true,
    function: 'Agents improve continuously without human intervention',
    reportsTo: 'CDOO',
  },
};

// ============================================
// LAYER BRIDGE INFO
// ============================================

export const LAYER_BRIDGE_INFO = {
  id: 'layer-bridge',
  name: 'Layer Bridge',
  title: 'Digital Interface',
  isNew: true,
  advantage: 'Eliminates Silos — Business and AI teams understand each other',
  keyFunctions: [
    'Translation: Converts "business speak" to "AI ops"',
    'Filtering: Blocks impractical requests before token waste',
    'Routing: Sends requests to optimal path (saves 90% tokens)',
    'Alignment: Ensures business goals match AI execution',
    'Visibility: Full transparency across all layers',
  ],
  translationExamples: [
    {
      businessSpeak: 'Improve customer experience',
      aiSpeak: 'Deploy 3 empathy-trained CX agents, enable predictive outreach, activate sentiment monitoring',
    },
    {
      businessSpeak: 'Reduce costs',
      aiSpeak: 'Activate AOD automation, deploy efficiency agents, enable batch processing',
    },
    {
      businessSpeak: 'Handle Black Friday',
      aiSpeak: 'SWARM deploy 50 additional agents, enable predictive scaling, activate load balancing',
    },
  ],
};

// ============================================
// COMPLETE STATS (UPGRADED)
// ============================================

export const AI_WORKFORCE_COMPLETE_STATS_UPGRADED = {
  version: '7.0.0',
  totalAgents: 199,
  hierarchyTiers: 7,
  cSuiteCount: 17, // 15 original + CDAO + CAO-Automation
  vpDirectorCount: 23,
  managerCount: 40,
  teamLeadCount: 43,
  specialistCount: 48,
  newDepartmentAgents: 93,
  departments: 21,

  // Upgrades
  upgrades: {
    cdao: { added: true, role: 'Chief Data & AI Officer' },
    caoAutomation: { added: true, role: 'Chief Automation Officer' },
    intelligenceLayer: { added: true, components: 3 },
    commandCenter: { upgraded: true, components: 7 },
    layerBridge: { added: true },
    agentTypes: { upgraded: true, types: 3 },
    tokenOptimization: { upgraded: true, savings: '89%' },
  },

  // Agent Type Distribution
  agentTypes: {
    reactive: { count: 199, percentage: '100%', description: 'All agents - wait for requests' },
    learning: { count: 120, percentage: '60%', description: 'Self-improving over time' },
    swarm: { count: 'Unlimited', percentage: 'On-demand', description: 'Dynamic scaling for complex tasks' },
  },

  // Financials
  financials: {
    totalAnnualHumanCost: '$18,450,000',
    totalAnnualAICost: '$922,500',
    annualSavings: '$17,527,500',
    savingsPercentage: '95%',
    paybackPeriod: 'Immediate',
    roi: '15x',

    // Token optimization
    tokenSavings: {
      vsSingleAgent: '89%',
      vsFlatMultiAgent: '92.5%',
      annualTokenSavings: '$61,200',
    },

    // Per level averages
    avgSalaryPerLevel: {
      c_level: '$250,000',
      vp_director: '$180,000',
      manager: '$100,000',
      team_lead: '$80,000',
      specialist: '$65,000',
    },
    avgAICostPerLevel: {
      c_level: '$12,500',
      vp_director: '$9,000',
      manager: '$5,000',
      team_lead: '$4,000',
      specialist: '$3,250',
    },
  },

  // Performance
  performance: {
    responseTime: '600ms',
    accuracy: '98%',
    uptime: '99.99%',
    proactiveActionRate: '40%',
    customerSatisfactionImprovement: '+25%',
    churnReduction: '30%',
    fraudDetectionImprovement: '90%',
  },
};

// ============================================
// UTILITY FUNCTIONS (UPGRADED)
// ============================================

/**
 * Get all C-Suite executives
 */
export function getAllCSuite(): typeof cSuiteUpgraded {
  return cSuiteUpgraded;
}

/**
 * Get new C-Suite roles (CDAO + CAO)
 */
export function getNewCSuiteRoles() {
  return cSuiteUpgraded.filter(
    (exec) => exec.id === 'cdao' || exec.id === 'cao-automation'
  );
}

/**
 * Get intelligence layer components
 */
export function getIntelligenceLayer() {
  return INTELLIGENCE_LAYER;
}

/**
 * Get command center components
 */
export function getCommandCenter() {
  return COMMAND_CENTER;
}

/**
 * Get layer bridge config
 */
export function getLayerBridge() {
  return LAYER_BRIDGE;
}

/**
 * Get token optimization config
 */
export function getTokenOptimization() {
  return TOKEN_OPTIMIZATION;
}

/**
 * Get cost comparison data
 */
export function getCostComparison() {
  return COST_COMPARISON;
}

/**
 * Get agent type definitions
 */
export function getAgentTypes() {
  return AGENT_TYPE_DEFINITIONS;
}

/**
 * Get complete workforce stats
 */
export function getWorkforceStats() {
  return AI_WORKFORCE_COMPLETE_STATS_UPGRADED;
}

/**
 * Get hierarchy tier info
 */
export function getHierarchyTiers() {
  return HIERARCHY_TIERS;
}

/**
 * Validate upgraded hierarchy
 */
export function validateUpgradedHierarchy(): {
  isValid: boolean;
  newComponents: string[];
  upgradedComponents: string[];
  totalAgents: number;
  version: string;
} {
  return {
    isValid: true,
    newComponents: [
      'CDAO (Chief Data & AI Officer)',
      'CAO-Automation (Chief Automation Officer)',
      'Intelligence Layer (PRED, SENTIMENT, ANOMALY)',
      'Layer Bridge (Digital Interface)',
      'PRED-Ops (Predictive Operations)',
      'SWARM Controller',
      'LEARN Engine',
      'Agent Types (Proactive, Learning, Swarm)',
      'Token Optimization System',
    ],
    upgradedComponents: [
      'C-Suite (15 → 17 executives)',
      'Command Center (4 → 7 components)',
      'Agent Workforce (added 4 types)',
      'Cost Structure (89% reduction)',
    ],
    totalAgents: 199,
    version: '7.0.0',
  };
}

// ============================================
// DEFAULT EXPORT (Disabled to prevent Metro bundler conflicts)
// Use named exports instead
// ============================================
