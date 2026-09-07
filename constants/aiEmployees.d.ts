type LucideIcon = React.FC<{
    size?: number;
    color?: string;
    className?: string;
}>;
export interface AIInfrastructure {
    status: 'online' | 'processing' | 'standby' | 'maintenance';
    health: number;
    uptime: string;
    lastActive: string;
    processingPower: 'standard' | 'high' | 'enterprise';
}
export interface AIROIMetrics {
    savingsPerMonth: string;
    tasksAutomatedDaily: number;
    responseTime: string;
    accuracyRate: string;
}
export interface EmployeeSelfImprovementCapability {
    enabled: boolean;
    improvementAreas: string[];
    autoOptimization: boolean;
    performanceTargets: {
        metric: string;
        target: number;
        current: number;
    }[];
    feedbackLoop: boolean;
    iterationCycle: 'hourly' | 'daily' | 'weekly' | 'monthly';
    versionHistory: {
        version: string;
        improvements: string[];
        date: string;
    }[];
}
export interface EmployeeLearningCapability {
    enabled: boolean;
    learningMode: 'supervised' | 'unsupervised' | 'reinforcement' | 'self_supervised';
    knowledgeSources: string[];
    learningGoals: string[];
    skillAcquisitionRate: number;
    knowledgeRetentionRate: number;
    continuousLearning: boolean;
    adaptiveLearning: boolean;
    learningHistory: {
        skill: string;
        learnedAt: string;
        proficiency: number;
    }[];
    certifications: string[];
}
export interface EmployeeSensoryCapability {
    vision: {
        enabled: boolean;
        capabilities: ('image_recognition' | 'ocr' | 'object_detection' | 'scene_understanding' | 'facial_recognition' | 'document_analysis')[];
        supportedFormats: string[];
        resolution: string;
    };
    hand: {
        enabled: boolean;
        capabilities: ('gesture_recognition' | 'action_detection' | 'tool_usage' | 'manipulation')[];
        precision: number;
    };
    ear: {
        enabled: boolean;
        capabilities: ('speech_recognition' | 'voice_identification' | 'tone_analysis' | 'ambient_sound_detection')[];
        supportedLanguages: string[];
        noiseCancellation: boolean;
    };
    sense: {
        enabled: boolean;
        capabilities: ('sentiment_detection' | 'emotion_recognition' | 'context_awareness' | 'anomaly_detection' | 'pattern_recognition')[];
        sensitivity: number;
        intuition: number;
    };
}
export interface EmployeeInsightsCapability {
    enabled: boolean;
    insightTypes: ('trend_analysis' | 'anomaly_detection' | 'correlation_analysis' | 'predictive_modeling' | 'prescriptive_analytics')[];
    realTimeInsights: boolean;
    predictiveInsights: {
        enabled: boolean;
        forecastHorizon: number;
        confidenceThreshold: number;
        models: string[];
    };
    insightHistory: {
        id: string;
        type: string;
        insight: string;
        confidence: number;
        createdAt: string;
        actedUpon: boolean;
    }[];
    recommendationEngine: boolean;
    proactiveSuggestions: boolean;
}
export interface EmployeeMemoryCapability {
    enabled: boolean;
    memoryType: 'short_term' | 'long_term' | 'unlimited';
    storageCapacity: 'limited' | 'standard' | 'high' | 'unlimited';
    retentionPolicy: {
        type: 'time_based' | 'capacity_based' | 'priority_based' | 'unlimited';
        duration?: number;
    };
    memoryCompression: boolean;
    contextWindow: number;
    episodicMemory: boolean;
    semanticMemory: boolean;
    proceduralMemory: boolean;
    crossConversationMemory: boolean;
}
export interface EmployeeNotesCapability {
    enabled: boolean;
    noteTypes: ('summary' | 'action_items' | 'decisions' | 'observations' | 'learnings')[];
    autoSummarization: boolean;
    summaryLength: 'brief' | 'detailed' | 'comprehensive';
    sharedNotes: boolean;
    notes: {
        id: string;
        title: string;
        content: string;
        category: string;
        createdAt: string;
        updatedAt: string;
        tags: string[];
        sharedWith: string[];
    }[];
}
export interface D2DCommunicationConfig {
    enabled: boolean;
    supportedDepartments: string[];
    communicationModes: ('broadcast' | 'direct' | 'collaborative' | 'hierarchical')[];
    canBroadcastToAll: boolean;
    canReceiveDepartmentUpdates: boolean;
    departmentChannels: {
        departmentId: string;
        channelId: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
    }[];
    crossDepartmentProjects: boolean;
    sharedResources: boolean;
}
export interface TaskHistoryConfig {
    enabled: boolean;
    retentionPeriod: number;
    taskTypes: string[];
    history: {
        taskId: string;
        taskType: string;
        description: string;
        status: 'completed' | 'failed' | 'in_progress' | 'cancelled';
        startedAt: string;
        completedAt?: string;
        duration: number;
        outcome: string;
        learnings: string[];
    }[];
    performanceAnalytics: boolean;
    patternRecognition: boolean;
}
export interface A2ACommunicationConfig {
    supportsA2A: boolean;
    a2aEndpoints: string[];
    consultationStyle: 'advisory' | 'collaborative' | 'directive' | 'analytical';
    canEscalateTo?: string[];
    canReceiveEscalationFrom?: string[];
}
export interface AIEmployee {
    id: string;
    name: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    humanCost: string;
    aiCost: string;
    efficiency: string;
    capabilities: string[];
    route: string;
    category: 'sales' | 'marketing' | 'operations' | 'support' | 'analytics' | 'executive' | 'accounting' | 'customer-experience' | 'product-rnd' | 'social-media' | 'data-intelligence' | 'analysis-insights' | 'hr' | 'it-tech' | 'legal-compliance' | 'engineering-dev' | 'personal-assistant' | 'trading-investment' | 'finance';
    type: 'employee' | 'agent' | 'enterprise-agent';
    replacesRole: string;
    infrastructure: AIInfrastructure;
    roiMetrics: AIROIMetrics;
    isNew?: boolean;
    isPremium?: boolean;
    dangerLevel?: 'low' | 'medium' | 'high' | 'critical';
    simulationConfig?: {
        activityLogs: string[];
        historyItems: {
            task: string;
            result: string;
            status: 'Success' | 'Warn' | 'Error';
        }[];
    };
    selfImprovement?: EmployeeSelfImprovementCapability;
    learning?: EmployeeLearningCapability;
    sensory?: EmployeeSensoryCapability;
    insights?: EmployeeInsightsCapability;
    memory?: EmployeeMemoryCapability;
    notes?: EmployeeNotesCapability;
    d2dConfig?: D2DCommunicationConfig;
    taskHistory?: TaskHistoryConfig;
    a2aConfig?: A2ACommunicationConfig;
    hierarchy?: {
        parentId?: string;
        level?: string;
        department?: string;
    };
    consulting?: {
        canConsult?: boolean;
        canBeConsulted?: boolean;
        expertiseAreas?: string[];
    };
    a2aCapabilities?: A2ACommunicationConfig & {
        canInitiateConsultation?: boolean;
        canRespondToConsultation?: boolean;
    };
}
export declare const aiEmployees: AIEmployee[];
export declare const aiEmployeeCategories: {
    id: string;
    label: string;
    icon: any;
}[];
export declare const aiInfrastructureStats: {
    totalEmployees: number;
    totalAgents: number;
    onlineCount: number;
    averageHealth: number;
    totalMonthlySavings: string;
    totalTasksAutomatedDaily: number;
};
export {};
//# sourceMappingURL=aiEmployees.d.ts.map