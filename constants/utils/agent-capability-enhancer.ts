/**
 * Universal Agent Enhancement Utility
 * 
 * This utility adds all enhanced capabilities (from video-prompts.md) to ALL AI agents,
 * AI employees, and departments across the system.
 * 
 * Features added:
 * - A2A (Agent-to-Agent) Communication
 * - D2D (Department-to-Department) Communication
 * - Self-Improvement
 * - Self-Learning
 * - Vision, Hand, Ear, and Sense capabilities
 * - Insights and Predictive Insights
 * - Task History
 * - Unlimited Memory
 * - Summary and Notes
 */

import type { AIEmployee } from '../aiEmployees';
import type { AIAgent } from '../aiAgentHierarchy';

// ============================================
// DEFAULT CAPABILITY CONFIGURATIONS
// ============================================

export const DEFAULT_A2A_CONFIG = {
  supportsA2A: true,
  a2aEndpoints: [] as string[],
  consultationStyle: 'collaborative' as const,
  canEscalateTo: [] as string[],
  canReceiveEscalationFrom: [] as string[],
};

export const DEFAULT_D2D_CONFIG = {
  enabled: true,
  supportedDepartments: [
    'customer_experience',
    'sales_revenue',
    'marketing_growth',
    'operations_management',
    'data_intelligence',
    'analysis_performance',
    'accounting_finance',
    'executive_leadership',
    'product_rnd',
    'social_media_management',
    'human_resources',
    'it_technology',
    'legal_compliance',
    'engineering_development',
    'ai_personal_assistant',
  ],
  communicationModes: ['broadcast', 'direct', 'collaborative', 'hierarchical'] as ('broadcast' | 'direct' | 'collaborative' | 'hierarchical')[],
  canBroadcastToAll: true,
  canReceiveDepartmentUpdates: true,
  departmentChannels: [] as any[],
  crossDepartmentProjects: true,
  sharedResources: true,
  d2dEndpoints: [] as string[],
};

export const DEFAULT_SELF_IMPROVEMENT_CONFIG = {
  enabled: true,
  improvementAreas: [
    'response_accuracy',
    'response_time',
    'customer_satisfaction',
    'task_efficiency',
    'communication_clarity',
    'decision_quality',
    'problem_solving',
    'knowledge_depth',
  ],
  autoOptimization: true,
  performanceTargets: [
    { metric: 'success_rate', target: 95, current: 0 },
    { metric: 'response_time_seconds', target: 3, current: 0 },
    { metric: 'customer_satisfaction', target: 90, current: 0 },
    { metric: 'task_completion_rate', target: 98, current: 0 },
  ],
  feedbackLoop: true,
  iterationCycle: 'daily' as const,
  versionHistory: [] as any[],
};

export const DEFAULT_LEARNING_CONFIG = {
  enabled: true,
  learningMode: 'self_supervised' as const,
  knowledgeSources: [
    'interactions',
    'feedback',
    'peer_agents',
    'task_outcomes',
    'data_analysis',
    'best_practices',
    'industry_knowledge',
  ],
  learningGoals: [
    'improve_domain_expertise',
    'enhance_communication',
    'optimize_decision_making',
    'expand_knowledge_base',
    'master_new_skills',
  ],
  skillAcquisitionRate: 0.85,
  knowledgeRetentionRate: 0.95,
  continuousLearning: true,
  adaptiveLearning: true,
  learningHistory: [] as any[],
  certifications: [] as string[],
};

export const DEFAULT_SENSORY_CONFIG = {
  vision: {
    enabled: true,
    capabilities: [
      'image_recognition',
      'ocr',
      'object_detection',
      'scene_understanding',
      'document_analysis',
    ],
    supportedFormats: ['jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'],
    resolution: 'high',
  },
  hand: {
    enabled: true,
    capabilities: [
      'gesture_recognition',
      'action_detection',
      'tool_usage',
      'manipulation',
    ],
    precision: 0.9,
  },
  ear: {
    enabled: true,
    capabilities: [
      'speech_recognition',
      'voice_identification',
      'tone_analysis',
      'ambient_sound_detection',
    ],
    supportedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ar', 'hi'],
    noiseCancellation: true,
  },
  sense: {
    enabled: true,
    capabilities: [
      'sentiment_detection',
      'emotion_recognition',
      'context_awareness',
      'anomaly_detection',
      'pattern_recognition',
    ],
    sensitivity: 0.85,
    intuition: 0.8,
  },
};

export const DEFAULT_INSIGHTS_CONFIG = {
  enabled: true,
  insightTypes: [
    'trend_analysis',
    'anomaly_detection',
    'correlation_analysis',
    'predictive_modeling',
    'prescriptive_analytics',
  ],
  realTimeInsights: true,
  predictiveInsights: {
    enabled: true,
    forecastHorizon: 30, // days
    confidenceThreshold: 0.8,
    models: ['time_series', 'regression', 'classification', 'ensemble'],
  },
  insightHistory: [] as any[],
  recommendationEngine: true,
  proactiveSuggestions: true,
};

export const DEFAULT_MEMORY_CONFIG = {
  enabled: true,
  memoryType: 'unlimited' as const,
  storageCapacity: 'unlimited' as const,
  retentionPolicy: {
    type: 'unlimited' as const,
  },
  memoryCompression: true,
  contextWindow: 100000, // tokens
  episodicMemory: true,
  semanticMemory: true,
  proceduralMemory: true,
  crossConversationMemory: true,
};

export const DEFAULT_NOTES_CONFIG = {
  enabled: true,
  noteTypes: [
    'summary',
    'action_items',
    'decisions',
    'observations',
    'learnings',
  ],
  autoSummarization: true,
  summaryLength: 'comprehensive',
  sharedNotes: true,
  notes: [] as any[],
};

export const DEFAULT_TASK_HISTORY_CONFIG = {
  enabled: true,
  retentionPeriod: 365, // days
  taskTypes: [
    'consultation',
    'delegation',
    'escalation',
    'analysis',
    'recommendation',
    'execution',
    'communication',
    'learning',
    'improvement',
  ],
  history: [] as any[],
  performanceAnalytics: true,
  patternRecognition: true,
};

// ============================================
// ENHANCEMENT FUNCTIONS
// ============================================

/**
 * Enhance a single AI employee with all capabilities
 */
export function enhanceAIEmployee(employee: AIEmployee): AIEmployee {
  return {
    ...employee,
    // A2A Communication
    a2aConfig: {
      ...DEFAULT_A2A_CONFIG,
      ...(employee.a2aConfig || {}),
    },
    // D2D Communication
    d2dConfig: {
      ...DEFAULT_D2D_CONFIG,
      supportedDepartments: getDepartmentsForCategory(employee.category),
      ...(employee.d2dConfig || {}),
    },
    // Self-Improvement
    selfImprovement: {
      ...DEFAULT_SELF_IMPROVEMENT_CONFIG,
      ...(employee.selfImprovement || {}),
    },
    // Self-Learning
    learning: {
      ...DEFAULT_LEARNING_CONFIG,
      ...(employee.learning || {}),
    },
    // Sensory Capabilities
    sensory: {
      ...DEFAULT_SENSORY_CONFIG,
      ...(employee.sensory || {}),
    } as AIEmployee['sensory'],
    // Insights & Predictive Insights
    insights: {
      ...DEFAULT_INSIGHTS_CONFIG,
      ...(employee.insights || {}),
    } as AIEmployee['insights'],
    // Unlimited Memory
    memory: {
      ...DEFAULT_MEMORY_CONFIG,
      ...(employee.memory || {}),
    },
    // Summary & Notes
    notes: {
      ...DEFAULT_NOTES_CONFIG,
      ...(employee.notes || {}),
    } as AIEmployee['notes'],
    // Task History
    taskHistory: {
      ...DEFAULT_TASK_HISTORY_CONFIG,
      ...(employee.taskHistory || {}),
    },
  };
}

/**
 * Enhance all AI employees in an array
 */
export function enhanceAllAIEmployees(employees: AIEmployee[]): AIEmployee[] {
  return employees.map(employee => enhanceAIEmployee(employee));
}

/**
 * Enhance an AI Agent from the hierarchy
 */
export function enhanceAIAgent(agent: AIAgent): AIAgent {
  return {
    ...agent,
    // A2A Capabilities
    a2aCapabilities: {
      ...(agent.a2aCapabilities || {}),
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 5,
      averageResponseTime: 2,
      counselingModes: ['hierarchical', 'peer', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true,
      },
      coordinationLevel: 'organization',
    } as AIAgent['a2aCapabilities'],
    // D2D Communication
    d2dConfig: {
      ...DEFAULT_D2D_CONFIG,
      supportedDepartments: getDepartmentsForCategory(agent.category),
      ...(agent.d2dConfig || {}),
    } as AIAgent['d2dConfig'],
    // Self-Improvement
    selfImprovement: {
      ...DEFAULT_SELF_IMPROVEMENT_CONFIG,
      ...(agent.selfImprovement || {}),
    },
    // Self-Learning
    learning: {
      ...DEFAULT_LEARNING_CONFIG,
      ...(agent.learning || {}),
    },
    // Sensory Capabilities
    sensory: {
      ...DEFAULT_SENSORY_CONFIG,
      ...(agent.sensory || {}),
    } as AIAgent['sensory'],
    // Insights & Predictive Insights
    insights: {
      ...DEFAULT_INSIGHTS_CONFIG,
      ...(agent.insights || {}),
    } as AIAgent['insights'],
    // Unlimited Memory
    memory: {
      ...DEFAULT_MEMORY_CONFIG,
      ...(agent.memory || {}),
    },
    // Summary & Notes
    notes: {
      ...DEFAULT_NOTES_CONFIG,
      ...(agent.notes || {}),
    } as AIAgent['notes'],
    // Task History
    taskHistory: {
      ...DEFAULT_TASK_HISTORY_CONFIG,
      ...(agent.taskHistory || {}),
    },
  };
}

/**
 * Enhance all AI Agents in an array
 */
export function enhanceAllAIAgents(agents: AIAgent[]): AIAgent[] {
  return agents.map(agent => enhanceAIAgent(agent));
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get relevant departments based on agent category
 */
function getDepartmentsForCategory(category: string): string[] {
  const allDepartments = [
    'customer_experience',
    'sales_revenue',
    'marketing_growth',
    'operations_management',
    'data_intelligence',
    'analysis_performance',
    'accounting_finance',
    'executive_leadership',
    'product_rnd',
    'social_media_management',
    'human_resources',
    'it_technology',
    'legal_compliance',
    'engineering_development',
    'ai_personal_assistant',
  ];

  // Map categories to primary and related departments
  const departmentMap: Record<string, string[]> = {
    'sales': ['sales_revenue', 'marketing_growth', 'customer_experience'],
    'marketing': ['marketing_growth', 'sales_revenue', 'social_media_management'],
    'operations': ['operations_management', 'data_intelligence', 'analysis_performance'],
    'support': ['customer_experience', 'operations_management', 'data_intelligence'],
    'analytics': ['data_intelligence', 'analysis_performance', 'accounting_finance'],
    'executive': ['executive_leadership', 'operations_management', 'accounting_finance'],
    'accounting': ['accounting_finance', 'operations_management', 'executive_leadership'],
    'customer-experience': ['customer_experience', 'sales_revenue', 'marketing_growth'],
    'product-rnd': ['product_rnd', 'engineering_development', 'data_intelligence'],
    'social-media': ['social_media_management', 'marketing_growth', 'customer_experience'],
    'data-intelligence': ['data_intelligence', 'analysis_performance', 'engineering_development'],
    'analysis-insights': ['analysis_performance', 'data_intelligence', 'executive_leadership'],
    'hr': ['human_resources', 'operations_management', 'executive_leadership'],
    'it-tech': ['it_technology', 'engineering_development', 'operations_management'],
    'legal-compliance': ['legal_compliance', 'operations_management', 'executive_leadership'],
    'engineering-dev': ['engineering_development', 'it_technology', 'product_rnd'],
    'personal-assistant': ['ai_personal_assistant', 'operations_management', 'executive_leadership'],
  };

  return departmentMap[category] || allDepartments;
}

// ============================================
// EXPORTS FOR USE IN AGENT DEFINITIONS
// ============================================

/**
 * Create enhanced employee configuration template
 */
export function createEnhancedEmployeeConfig(overrides: Partial<AIEmployee> = {}): AIEmployee {
  const baseEmployee: AIEmployee = {
    id: overrides.id || 'new-employee',
    name: overrides.name || 'New Employee',
    title: overrides.title || 'AI Employee',
    description: overrides.description || 'Enhanced AI Employee with full capabilities',
    icon: overrides.icon || (() => null),
    color: overrides.color || '#007AFF',
    humanCost: overrides.humanCost || '$50,000/year',
    aiCost: overrides.aiCost || '$5,000/year',
    efficiency: overrides.efficiency || '10x',
    capabilities: overrides.capabilities || ['consulting', 'execution', 'analysis', 'communication', 'automation'],
    route: overrides.route || '/ai-employee/new',
    category: overrides.category || 'support',
    type: overrides.type || 'employee',
    replacesRole: overrides.replacesRole || 'General Employee',
    infrastructure: overrides.infrastructure || {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: new Date().toISOString(),
      processingPower: 'enterprise',
    },
    roiMetrics: overrides.roiMetrics || {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 50,
      responseTime: '< 2s',
      accuracyRate: '95%',
    },
  };

  return enhanceAIEmployee({ ...baseEmployee, ...overrides });
}

/**
 * Apply enhancements to existing employee in place
 */
export function applyEnhancementsToEmployee(employee: AIEmployee): void {
  Object.assign(employee, {
    a2aConfig: { ...DEFAULT_A2A_CONFIG, ...(employee.a2aConfig || {}) },
    d2dConfig: { 
      ...DEFAULT_D2D_CONFIG,
      supportedDepartments: getDepartmentsForCategory(employee.category),
      ...(employee.d2dConfig || {}),
    },
    selfImprovement: { ...DEFAULT_SELF_IMPROVEMENT_CONFIG, ...(employee.selfImprovement || {}) },
    learning: { ...DEFAULT_LEARNING_CONFIG, ...(employee.learning || {}) },
    sensory: { ...DEFAULT_SENSORY_CONFIG, ...(employee.sensory || {}) },
    insights: { ...DEFAULT_INSIGHTS_CONFIG, ...(employee.insights || {}) },
    memory: { ...DEFAULT_MEMORY_CONFIG, ...(employee.memory || {}) },
    notes: { ...DEFAULT_NOTES_CONFIG, ...(employee.notes || {}) },
    taskHistory: { ...DEFAULT_TASK_HISTORY_CONFIG, ...(employee.taskHistory || {}) },
  });
}

/**
 * Verify that an employee has all required capabilities
 */
export function verifyEmployeeCapabilities(employee: AIEmployee): {
  hasAllCapabilities: boolean;
  missingCapabilities: string[];
  presentCapabilities: string[];
} {
  const requiredCapabilities = [
    'a2aConfig',
    'd2dConfig',
    'selfImprovement',
    'learning',
    'sensory',
    'insights',
    'memory',
    'notes',
    'taskHistory',
  ];

  const present: string[] = [];
  const missing: string[] = [];

  requiredCapabilities.forEach(cap => {
    if (employee[cap as keyof AIEmployee]) {
      present.push(cap);
    } else {
      missing.push(cap);
    }
  });

  return {
    hasAllCapabilities: missing.length === 0,
    missingCapabilities: missing,
    presentCapabilities: present,
  };
}

/**
 * Auto-enhance any employee missing capabilities
 */
export function autoEnhanceEmployee(employee: AIEmployee): AIEmployee {
  const verification = verifyEmployeeCapabilities(employee);
  
  if (verification.hasAllCapabilities) {
    return employee;
  }

  console.log(`[Agent Enhancement] Auto-enhancing employee: ${employee.name} (${employee.id})`);
  console.log(`  Missing: ${verification.missingCapabilities.join(', ')}`);
  
  return enhanceAIEmployee(employee);
}

/**
 * Bulk auto-enhance all employees missing capabilities
 */
export function autoEnhanceAllEmployees(employees: AIEmployee[]): AIEmployee[] {
  let enhancedCount = 0;

  const enhanced = employees.map(employee => {
    const verification = verifyEmployeeCapabilities(employee);
    
    if (!verification.hasAllCapabilities) {
      enhancedCount++;
      console.log(`[Agent Enhancement] Auto-enhancing: ${employee.name}`);
      return enhanceAIEmployee(employee);
    }

    return employee;
  });

  if (enhancedCount > 0) {
    console.log(`[Agent Enhancement] Enhanced ${enhancedCount}/${employees.length} employees`);
  }

  return enhanced;
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Example 1: Enhance a single employee
import { enhanceAIEmployee } from './utils/agent-capability-enhancer';

const employee = aiEmployees[0];
const enhancedEmployee = enhanceAIEmployee(employee);

// Example 2: Enhance all employees
import { enhanceAllAIEmployees } from './utils/agent-capability-enhancer';

const allEmployees = require('./constants/aiEmployees').aiEmployees;
const enhancedEmployees = enhanceAllAIEmployees(allEmployees);

// Example 3: Auto-enhance on import
import { autoEnhanceAllEmployees } from './utils/agent-capability-enhancer';

export const aiEmployees = autoEnhanceAllEmployees([
  // ... employee definitions
]);

// Example 4: Verify capabilities
import { verifyEmployeeCapabilities } from './utils/agent-capability-enhancer';

const verification = verifyEmployeeCapabilities(employee);
if (!verification.hasAllCapabilities) {
  console.log('Missing:', verification.missingCapabilities);
}
*/
