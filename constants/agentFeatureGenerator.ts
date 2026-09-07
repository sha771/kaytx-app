/**
 * =============================================================================
 * AGENT FEATURE GENERATOR - Comprehensive Agent Definition System
 * =============================================================================
 *
 * Generates complete agent definitions with all features, options, and capabilities
 * for all 1,108 agents across 22 departments.
 *
 * @version 1.0.0
 * @lastUpdated 2026-06-07
 */

import type { AIEmployee } from './aiEmployeesEnhanced';
import { SKILL_LIBRARY } from './agentBuilder';
import {
  Settings, Zap, MessagesSquare, Target, Megaphone, Crown, Shield, BarChart3,
  Database, Brain, Cpu, FileText, Users, Briefcase, TrendingUp, Globe,
  Building2, Truck, Stethoscope, Factory, Landmark, Scale, Gavel, Search,
  Lightbulb, BarChart3, Workflow, Lock, CheckCircle, AlertCircle, Clock,
  Activity, PieChart, LineChart, GitBranch, Network, Sparkles, Star,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

// ============================================
// AGENT TYPE MAPPINGS
// ============================================

const DEPARTMENT_ICONS: Record<string, LucideIcon> = {
  'customer-experience': MessagesSquare,
  'sales-revenue': Target,
  'marketing-growth': Megaphone,
  'operations-management': Settings,
  'finance-accounting': Crown,
  'technology-engineering': Zap,
  'human-resources': Users,
  'legal-compliance': Scale,
  'data-intelligence': Database,
  'product-management': Briefcase,
  'security-risk': Shield,
  'research-development': Lightbulb,
  'administrative': Building2,
  'trading-investments': TrendingUp,
  'real-estate-property': Building2,
  'insurance-risk': Shield,
  'healthcare-medical': Stethoscope,
  'manufacturing-production': Factory,
  'transportation-logistics': Truck,
  'government-public-sector': Landmark,
  'supply-chain-logistics': Network,
  'ai-management-governance': Brain,
};

const DEPARTMENT_COLORS: Record<string, string> = {
  'customer-experience': '#007AFF',
  'sales-revenue': '#34C759',
  'marketing-growth': '#FF2D55',
  'operations-management': '#5856D6',
  'finance-accounting': '#FFD700',
  'technology-engineering': '#AF52DE',
  'human-resources': '#FF5252',
  'legal-compliance': '#6366F1',
  'data-intelligence': '#00BCD4',
  'product-management': '#FF9500',
  'security-risk': '#FF3B30',
  'research-development': '#5856D6',
  'administrative': '#8E8E93',
  'trading-investments': '#34C759',
  'real-estate-property': '#FFD700',
  'insurance-risk': '#FF5252',
  'healthcare-medical': '#5AC8FA',
  'manufacturing-production': '#FF9500',
  'transportation-logistics': '#5856D6',
  'government-public-sector': '#6366F1',
  'supply-chain-logistics': '#34C759',
  'ai-management-governance': '#AF52DE',
};

// ============================================
// DEFAULT CAPABILITIES CONFIGURATION
// ============================================

const DEFAULT_INFRASTRUCTURE = {
  status: 'online' as const,
  health: 95,
  uptime: '99.9%',
  lastActive: new Date().toISOString(),
  processingPower: 'standard' as const,
  region: 'us-east-1',
  version: '1.0.0',
};

const DEFAULT_ROI_METRICS = {
  savingsPerMonth: '$2,500',
  tasksAutomatedDaily: 150,
  responseTime: '< 2s',
  accuracyRate: '95%',
  customerSatisfaction: '4.5/5',
};

const DEFAULT_CONSULTING_CONFIG = {
  canConsult: true,
  canBeConsulted: true,
  consultingDomains: [],
  expertiseAreas: [],
  consultationPriority: 'medium' as const,
};

const DEFAULT_COLLABORATION_CONFIG = {
  canCollaborate: true,
  collaborationModes: ['parallel', 'sequential'] as const,
  teamAgentIds: [],
  teamRole: 'member' as const,
};

const DEFAULT_A2A_CONFIG = {
  supportsA2A: true,
  a2aEndpoints: [],
  consultationStyle: 'collaborative' as const,
  canEscalateTo: [],
  canReceiveEscalationFrom: [],
};

const DEFAULT_SELF_IMPROVEMENT = {
  enabled: true,
  improvementAreas: ['accuracy', 'efficiency', 'response_time'],
  autoOptimization: true,
  performanceTargets: [
    { metric: 'accuracy', target: 95, current: 90 },
    { metric: 'response_time', target: 2000, current: 2500 },
  ],
  feedbackLoop: true,
  iterationCycle: 'daily' as const,
  versionHistory: [],
};

const DEFAULT_LEARNING = {
  enabled: true,
  learningMode: 'supervised' as const,
  knowledgeSources: ['user_interactions', 'documentation', 'feedback'],
  learningGoals: ['improve_accuracy', 'reduce_errors', 'enhance_relevance'],
  skillAcquisitionRate: 0.1,
  knowledgeRetentionRate: 0.9,
  continuousLearning: true,
  adaptiveLearning: true,
  learningHistory: [],
  certifications: [],
};

const DEFAULT_SENSORY = {
  vision: {
    enabled: false,
    capabilities: [],
    supportedFormats: [],
    resolution: '1080p',
  },
  hand: {
    enabled: false,
    capabilities: [],
    precision: 0.8,
  },
  ear: {
    enabled: true,
    capabilities: ['speech_recognition', 'tone_analysis'],
    supportedLanguages: ['en', 'es', 'fr', 'de'],
    noiseCancellation: true,
  },
  sense: {
    enabled: true,
    capabilities: ['sentiment_detection', 'context_awareness', 'anomaly_detection'],
    sensitivity: 0.85,
    intuition: 0.7,
  },
};

const DEFAULT_INSIGHTS = {
  enabled: true,
  insightTypes: ['trend_analysis', 'anomaly_detection', 'predictive_modeling'] as const,
  realTimeInsights: true,
  predictiveInsights: {
    enabled: true,
    forecastHorizon: 30,
    confidenceThreshold: 0.8,
    models: ['linear_regression', 'random_forest'],
  },
  insightHistory: [],
  recommendationEngine: true,
  proactiveSuggestions: true,
};

const DEFAULT_MEMORY = {
  enabled: true,
  memoryType: 'long_term' as const,
  storageCapacity: 'high' as const,
  retentionPolicy: {
    type: 'priority_based' as const,
    duration: 90,
  },
  memoryCompression: true,
  contextWindow: 16000,
  episodicMemory: true,
  semanticMemory: true,
  proceduralMemory: true,
  crossConversationMemory: true,
};

const DEFAULT_NOTES = {
  enabled: true,
  noteTypes: ['summary', 'action_items', 'decisions', 'observations'] as const,
  autoSummarization: true,
  summaryLength: 'detailed' as const,
  sharedNotes: true,
  notes: [],
};

const DEFAULT_D2D_COMMUNICATION = {
  enabled: true,
  supportedDepartments: [],
  communicationModes: ['direct', 'collaborative'] as const,
  canBroadcastToAll: false,
  canReceiveDepartmentUpdates: true,
  departmentChannels: [],
  crossDepartmentProjects: true,
  sharedResources: true,
};

const DEFAULT_TASK_HISTORY = {
  enabled: true,
  retentionPeriod: 90,
  taskTypes: [],
  history: [],
  performanceAnalytics: true,
  patternRecognition: true,
};

const DEFAULT_AUTOMATION = {
  enabled: true,
  automationLevel: 'semi_automated' as const,
  automatedTasks: ['data_entry', 'report_generation', 'notification_sending'],
  triggerConditions: ['time_based', 'event_based', 'condition_based'],
  workflowTemplates: [],
  customWorkflows: [],
};

const DEFAULT_INTEGRATION = {
  enabled: true,
  integrations: [],
  webhooks: [],
  apiEndpoints: [],
};

const DEFAULT_SECURITY = {
  enabled: true,
  accessLevel: 'internal' as const,
  authentication: {
    method: 'jwt' as const,
    mfaEnabled: true,
    sessionTimeout: 60,
  },
  dataEncryption: {
    atRest: true,
    inTransit: true,
    algorithm: 'AES-256',
    keyRotation: 90,
  },
  auditLogging: {
    enabled: true,
    logLevel: 'detailed' as const,
    retentionPeriod: 180,
    logEvents: ['login', 'data_access', 'configuration_change'],
  },
  compliance: {
    frameworks: ['SOC2', 'GDPR'],
    certifications: [],
    lastAudit: new Date().toISOString(),
    nextAudit: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    complianceStatus: 'compliant' as const,
  },
  dataPrivacy: {
    gdprCompliant: true,
    dataResidency: ['us'],
    anonymization: true,
    consentManagement: true,
  },
};

const DEFAULT_GOVERNANCE = {
  enabled: true,
  policies: [],
  approvalWorkflows: [],
  ethicalGuidelines: {
    enabled: true,
    guidelines: ['fairness', 'transparency', 'accountability'],
    biasDetection: true,
    fairnessChecks: true,
    transparencyLevel: 'high' as const,
  },
};

const DEFAULT_MONITORING = {
  enabled: true,
  monitoringLevel: 'standard' as const,
  metrics: {
    cpu: true,
    memory: true,
    responseTime: true,
    errorRate: true,
    throughput: true,
    customMetrics: [],
  },
  alerts: [],
  dashboards: [],
  reports: [],
};

const DEFAULT_ANALYTICS = {
  enabled: true,
  analyticsLevel: 'advanced' as const,
  dataSources: ['user_interactions', 'system_logs', 'external_apis'],
  analysisTypes: ['descriptive', 'diagnostic', 'predictive'] as const,
  models: [],
  insights: [],
};

// ============================================
// AGENT GENERATION FUNCTIONS
// ============================================

/**
 * Generate a complete agent definition with all features and capabilities
 */
export function generateAgentDefinition(config: {
  id: string;
  name: string;
  role: string;
  department: string;
  type: 'main_agent' | 'sub_agent' | 'employee';
  parentId?: string;
  skills?: string[];
  icon?: LucideIcon;
  description?: string;
}): AIEmployee {
  const {
    id,
    name,
    role,
    department,
    type,
    parentId,
    skills = [],
    icon = DEPARTMENT_ICONS[department] || Bot,
    description = `AI ${role} for ${department}`,
  } = config;

  // Get department-specific skills
  const departmentSkills = SKILL_LIBRARY[department.replace('-', '_')] || [];
  const selectedSkills = skills.length > 0 
    ? departmentSkills.filter(s => skills.includes(s.id))
    : departmentSkills.slice(0, 4);

  return {
    id,
    name,
    role,
    department,
    type,
    parentId,
    icon: icon.name,
    description,
    category: department,
    
    // Infrastructure
    infrastructure: DEFAULT_INFRASTRUCTURE,
    
    // ROI Metrics
    roiMetrics: DEFAULT_ROI_METRICS,
    
    // Consulting
    consulting: DEFAULT_CONSULTING_CONFIG,
    
    // Collaboration
    collaboration: DEFAULT_COLLABORATION_CONFIG,
    
    // A2A Communication
    a2aCapabilities: DEFAULT_A2A_CONFIG,
    
    // Self Improvement
    selfImprovement: DEFAULT_SELF_IMPROVEMENT,
    
    // Learning
    learning: DEFAULT_LEARNING,
    
    // Sensory
    sensory: DEFAULT_SENSORY,
    
    // Insights
    insights: DEFAULT_INSIGHTS,
    
    // Memory
    memory: DEFAULT_MEMORY,
    
    // Notes
    notes: DEFAULT_NOTES,
    
    // D2D Communication
    d2dCommunication: DEFAULT_D2D_COMMUNICATION,
    
    // Task History
    taskHistory: DEFAULT_TASK_HISTORY,
    
    // Automation
    automation: DEFAULT_AUTOMATION,
    
    // Integration
    integration: DEFAULT_INTEGRATION,
    
    // Security
    security: DEFAULT_SECURITY,
    
    // Governance
    governance: DEFAULT_GOVERNANCE,
    
    // Monitoring
    monitoring: DEFAULT_MONITORING,
    
    // Analytics
    analytics: DEFAULT_ANALYTICS,
    
    // Skills
    skills: selectedSkills,
    
    // Hierarchy
    hierarchy: {
      level: type === 'main_agent' ? 1 : 2,
      parentId,
      children: [],
      peers: [],
    },
    
    // Status
    status: 'active',
    
    // Metadata
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0',
  };
}

/**
 * Generate main agent with leadership capabilities
 */
export function generateMainAgent(config: {
  id: string;
  name: string;
  role: string;
  department: string;
  subAgentIds?: string[];
  icon?: LucideIcon;
  description?: string;
}): AIEmployee {
  const agent = generateAgentDefinition({
    ...config,
    type: 'main_agent',
  });

  // Add leadership capabilities for main agents
  return {
    ...agent,
    leadership: {
      enabled: true,
      leadershipStyle: 'transformational',
      teamSize: config.subAgentIds?.length || 0,
      directReports: config.subAgentIds || [],
      decisionAuthority: 'shared',
      strategicPlanning: true,
      budgetAuthority: {
        hasBudget: true,
        budgetAmount: '$50,000/month',
        approvalLimit: '$10,000',
        canAllocate: true,
      },
      performanceManagement: {
        canReview: true,
        canSetGoals: true,
        canProvideFeedback: true,
        reviewCycle: 'monthly',
        kpiTracking: true,
      },
      crossDepartmentCoordination: {
        enabled: true,
        coordinatedDepartments: [],
        collaborationProjects: [],
        sharedResources: true,
      },
      crisisManagement: {
        enabled: true,
        crisisTypes: ['system_outage', 'security_breach', 'data_loss'],
        escalationProtocol: ['notify_manager', 'activate_response_team', 'communicate_stakeholders'],
        canDeclareEmergency: false,
      },
    },
    resourceManagement: {
      enabled: true,
      managedResources: [
        { type: 'human', allocation: '80%', utilization: 75, availability: 'high' },
        { type: 'technological', allocation: '60%', utilization: 80, availability: 'high' },
        { type: 'financial', allocation: '$50,000', utilization: 70, availability: 'medium' },
      ],
      resourceOptimization: true,
      capacityPlanning: true,
      costTracking: true,
    },
    strategicPlanning: {
      enabled: true,
      planningHorizon: 'medium_term',
      strategicGoals: [
        {
          id: 'goal_1',
          objective: 'Improve operational efficiency by 20%',
          kpis: ['efficiency_score', 'cost_reduction', 'time_to_resolution'],
          timeline: 'Q4 2026',
          progress: 45,
          status: 'on_track',
        },
      ],
      scenarioPlanning: true,
      riskAssessment: true,
      competitiveAnalysis: true,
    },
  };
}

/**
 * Generate sub-agent with task specialization
 */
export function generateSubAgent(config: {
  id: string;
  name: string;
  role: string;
  department: string;
  parentId: string;
  skills?: string[];
  icon?: LucideIcon;
  description?: string;
}): AIEmployee {
  const agent = generateAgentDefinition({
    ...config,
    type: 'sub_agent',
    parentId,
  });

  // Add task specialization for sub-agents
  return {
    ...agent,
    taskSpecialization: {
      enabled: true,
      specializationAreas: [config.role],
      expertiseLevel: 'advanced',
      taskTypes: [
        {
          type: config.role,
          proficiency: 0.85,
          avgDuration: 300,
          successRate: 0.92,
        },
      ],
      preferredTasks: [config.role],
      avoidedTasks: [],
      skillGaps: [],
    },
    workflowIntegration: {
      enabled: true,
      supportedWorkflows: ['task_execution', 'data_processing', 'report_generation'],
      workflowTriggers: [
        {
          event: 'task_assigned',
          action: 'start_processing',
          conditions: ['priority_high', 'resources_available'],
        },
      ],
      automationRules: [],
      integrations: [],
    },
    escalationProtocol: {
      enabled: true,
      escalationLevels: [
        {
          level: 1,
          trigger: 'task_timeout',
          escalateTo: config.parentId,
          timeThreshold: 30,
          autoEscalate: true,
        },
      ],
      emergencyContacts: [config.parentId],
      escalationHistory: [],
    },
    performanceMetrics: {
      enabled: true,
      metrics: [],
      benchmarks: [
        {
          metric: 'task_completion_rate',
          target: 95,
          current: 92,
          trend: 'improving',
        },
        {
          metric: 'accuracy',
          target: 98,
          current: 95,
          trend: 'stable',
        },
      ],
      alerts: [
        {
          metric: 'error_rate',
          threshold: 5,
          condition: 'above',
          notification: true,
        },
      ],
    },
  };
}

// ============================================
// DEPARTMENT-SPECIFIC AGENT GENERATORS
// ============================================

/**
 * Generate all agents for a department
 */
export function generateDepartmentAgents(department: string, agentsConfig: {
  mainAgents: Array<{
    id: string;
    name: string;
    role: string;
    subAgentIds?: string[];
    icon?: LucideIcon;
    description?: string;
  }>;
  subAgents: Array<{
    id: string;
    name: string;
    role: string;
    parentId: string;
    skills?: string[];
    icon?: LucideIcon;
    description?: string;
  }>;
}): {
  mainAgents: AIEmployee[];
  subAgents: AIEmployee[];
} {
  const mainAgents = agentsConfig.mainAgents.map(config =>
    generateMainAgent({
      ...config,
      department,
    })
  );

  const subAgents = agentsConfig.subAgents.map(config =>
    generateSubAgent({
      ...config,
      department,
    })
  );

  return { mainAgents, subAgents };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get icon by name
 */
export function getIconByName(iconName: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    Settings, Zap, MessagesSquare, Target, Megaphone, Crown, Shield, BarChart3,
    Database, Brain, Cpu, FileText, Users, Briefcase, TrendingUp, Globe,
    Building2, Truck, Stethoscope, Factory, Landmark, Scale, Gavel, Search,
    Lightbulb, BarChart3, Workflow, Lock, CheckCircle, AlertCircle, Clock,
    Activity, PieChart, LineChart, GitBranch, Network, Sparkles, Star,
  };
  return iconMap[iconName] || Bot;
}

/**
 * Validate agent definition
 */
export function validateAgentDefinition(agent: AIEmployee): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!agent.id) errors.push('Agent ID is required');
  if (!agent.name) errors.push('Agent name is required');
  if (!agent.role) errors.push('Agent role is required');
  if (!agent.department) errors.push('Department is required');
  if (!agent.type) errors.push('Agent type is required');

  return {
    isValid: errors.length === 0,
    errors,
  };
}
