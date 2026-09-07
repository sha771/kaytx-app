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
export declare const DEFAULT_A2A_CONFIG: {
    supportsA2A: boolean;
    a2aEndpoints: string[];
    consultationStyle: "collaborative";
    canEscalateTo: string[];
    canReceiveEscalationFrom: string[];
};
export declare const DEFAULT_D2D_CONFIG: {
    enabled: boolean;
    supportedDepartments: string[];
    communicationModes: ("broadcast" | "direct" | "collaborative" | "hierarchical")[];
    canBroadcastToAll: boolean;
    canReceiveDepartmentUpdates: boolean;
    departmentChannels: any[];
    crossDepartmentProjects: boolean;
    sharedResources: boolean;
    d2dEndpoints: string[];
};
export declare const DEFAULT_SELF_IMPROVEMENT_CONFIG: {
    enabled: boolean;
    improvementAreas: string[];
    autoOptimization: boolean;
    performanceTargets: {
        metric: string;
        target: number;
        current: number;
    }[];
    feedbackLoop: boolean;
    iterationCycle: "daily";
    versionHistory: any[];
};
export declare const DEFAULT_LEARNING_CONFIG: {
    enabled: boolean;
    learningMode: "self_supervised";
    knowledgeSources: string[];
    learningGoals: string[];
    skillAcquisitionRate: number;
    knowledgeRetentionRate: number;
    continuousLearning: boolean;
    adaptiveLearning: boolean;
    learningHistory: any[];
    certifications: string[];
};
export declare const DEFAULT_SENSORY_CONFIG: {
    vision: {
        enabled: boolean;
        capabilities: string[];
        supportedFormats: string[];
        resolution: string;
    };
    hand: {
        enabled: boolean;
        capabilities: string[];
        precision: number;
    };
    ear: {
        enabled: boolean;
        capabilities: string[];
        supportedLanguages: string[];
        noiseCancellation: boolean;
    };
    sense: {
        enabled: boolean;
        capabilities: string[];
        sensitivity: number;
        intuition: number;
    };
};
export declare const DEFAULT_INSIGHTS_CONFIG: {
    enabled: boolean;
    insightTypes: string[];
    realTimeInsights: boolean;
    predictiveInsights: {
        enabled: boolean;
        forecastHorizon: number;
        confidenceThreshold: number;
        models: string[];
    };
    insightHistory: any[];
    recommendationEngine: boolean;
    proactiveSuggestions: boolean;
};
export declare const DEFAULT_MEMORY_CONFIG: {
    enabled: boolean;
    memoryType: "unlimited";
    storageCapacity: "unlimited";
    retentionPolicy: {
        type: "unlimited";
    };
    memoryCompression: boolean;
    contextWindow: number;
    episodicMemory: boolean;
    semanticMemory: boolean;
    proceduralMemory: boolean;
    crossConversationMemory: boolean;
};
export declare const DEFAULT_NOTES_CONFIG: {
    enabled: boolean;
    noteTypes: string[];
    autoSummarization: boolean;
    summaryLength: string;
    sharedNotes: boolean;
    notes: any[];
};
export declare const DEFAULT_TASK_HISTORY_CONFIG: {
    enabled: boolean;
    retentionPeriod: number;
    taskTypes: string[];
    history: any[];
    performanceAnalytics: boolean;
    patternRecognition: boolean;
};
/**
 * Enhance a single AI employee with all capabilities
 */
export declare function enhanceAIEmployee(employee: AIEmployee): AIEmployee;
/**
 * Enhance all AI employees in an array
 */
export declare function enhanceAllAIEmployees(employees: AIEmployee[]): AIEmployee[];
/**
 * Enhance an AI Agent from the hierarchy
 */
export declare function enhanceAIAgent(agent: AIAgent): AIAgent;
/**
 * Enhance all AI Agents in an array
 */
export declare function enhanceAllAIAgents(agents: AIAgent[]): AIAgent[];
/**
 * Create enhanced employee configuration template
 */
export declare function createEnhancedEmployeeConfig(overrides?: Partial<AIEmployee>): AIEmployee;
/**
 * Apply enhancements to existing employee in place
 */
export declare function applyEnhancementsToEmployee(employee: AIEmployee): void;
/**
 * Verify that an employee has all required capabilities
 */
export declare function verifyEmployeeCapabilities(employee: AIEmployee): {
    hasAllCapabilities: boolean;
    missingCapabilities: string[];
    presentCapabilities: string[];
};
/**
 * Auto-enhance any employee missing capabilities
 */
export declare function autoEnhanceEmployee(employee: AIEmployee): AIEmployee;
/**
 * Bulk auto-enhance all employees missing capabilities
 */
export declare function autoEnhanceAllEmployees(employees: AIEmployee[]): AIEmployee[];
//# sourceMappingURL=agent-capability-enhancer.d.ts.map