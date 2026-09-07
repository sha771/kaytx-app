type LucideIcon = React.FC<{
    size?: number;
    color?: string;
    className?: string;
}>;
export interface AIInfrastructure {
    status: 'online' | 'processing' | 'standby' | 'maintenance' | 'offline';
    health: number;
    uptime: string;
    lastActive: string;
    processingPower: 'standard' | 'high' | 'enterprise' | 'quantum';
    region?: string;
    version?: string;
}
export interface AIROIMetrics {
    savingsPerMonth: string;
    tasksAutomatedDaily: number;
    responseTime: string;
    accuracyRate: string;
    customerSatisfaction?: string;
    revenueGenerated?: string;
}
export interface AgentConsultingConfig {
    canConsult: boolean;
    canBeConsulted: boolean;
    consultingDomains: string[];
    parentAgentId?: string;
    subAgentIds?: string[];
    expertiseAreas: string[];
    consultationPriority: 'low' | 'medium' | 'high' | 'critical';
}
export interface AgentCollaborationConfig {
    canCollaborate: boolean;
    collaborationModes: ('parallel' | 'sequential' | 'hierarchical' | 'adaptive')[];
    teamAgentIds?: string[];
    teamRole?: 'leader' | 'member' | 'coordinator' | 'specialist';
}
export interface A2ACommunicationConfig {
    supportsA2A?: boolean;
    a2aEndpoints?: string[];
    consultationStyle?: 'advisory' | 'collaborative' | 'directive' | 'analytical';
    canEscalateTo?: string[];
    canReceiveEscalationFrom?: string[];
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
export interface LeadershipCapabilities {
    enabled: boolean;
    leadershipStyle: 'transformational' | 'transactional' | 'servant' | 'situational' | 'democratic' | 'autocratic';
    teamSize: number;
    directReports: string[];
    decisionAuthority: 'full' | 'shared' | 'consultative' | 'delegated';
    strategicPlanning: boolean;
    budgetAuthority: {
        hasBudget: boolean;
        budgetAmount?: string;
        approvalLimit?: string;
        canAllocate: boolean;
    };
    performanceManagement: {
        canReview: boolean;
        canSetGoals: boolean;
        canProvideFeedback: boolean;
        reviewCycle: 'weekly' | 'monthly' | 'quarterly' | 'annual';
        kpiTracking: boolean;
    };
    crossDepartmentCoordination: {
        enabled: boolean;
        coordinatedDepartments: string[];
        collaborationProjects: string[];
        sharedResources: boolean;
    };
    crisisManagement: {
        enabled: boolean;
        crisisTypes: string[];
        escalationProtocol: string[];
        canDeclareEmergency: boolean;
    };
}
export interface ResourceManagement {
    enabled: boolean;
    managedResources: {
        type: 'human' | 'financial' | 'technological' | 'data' | 'infrastructure';
        allocation: string;
        utilization: number;
        availability: string;
    }[];
    resourceOptimization: boolean;
    capacityPlanning: boolean;
    costTracking: boolean;
}
export interface StrategicPlanning {
    enabled: boolean;
    planningHorizon: 'short_term' | 'medium_term' | 'long_term';
    strategicGoals: {
        id: string;
        objective: string;
        kpis: string[];
        timeline: string;
        progress: number;
        status: 'on_track' | 'at_risk' | 'behind' | 'completed';
    }[];
    scenarioPlanning: boolean;
    riskAssessment: boolean;
    competitiveAnalysis: boolean;
}
export interface TaskSpecialization {
    enabled: boolean;
    specializationAreas: string[];
    expertiseLevel: 'novice' | 'intermediate' | 'advanced' | 'expert' | 'master';
    taskTypes: {
        type: string;
        proficiency: number;
        avgDuration: number;
        successRate: number;
    }[];
    preferredTasks: string[];
    avoidedTasks: string[];
    skillGaps: string[];
}
export interface WorkflowIntegration {
    enabled: boolean;
    supportedWorkflows: string[];
    workflowTriggers: {
        event: string;
        action: string;
        conditions: string[];
    }[];
    automationRules: {
        ruleId: string;
        condition: string;
        action: string;
        priority: number;
    }[];
    integrations: {
        platform: string;
        type: 'api' | 'webhook' | 'sdk' | 'custom';
        status: 'connected' | 'disconnected' | 'error';
        lastSync: string;
    }[];
}
export interface EscalationProtocol {
    enabled: boolean;
    escalationLevels: {
        level: number;
        trigger: string;
        escalateTo: string;
        timeThreshold: number;
        autoEscalate: boolean;
    }[];
    emergencyContacts: string[];
    escalationHistory: {
        id: string;
        from: string;
        to: string;
        reason: string;
        timestamp: string;
        resolved: boolean;
    }[];
}
export interface PerformanceMetrics {
    enabled: boolean;
    metrics: {
        taskId: string;
        taskType: string;
        duration: number;
        quality: number;
        efficiency: number;
        timestamp: string;
    }[];
    benchmarks: {
        metric: string;
        target: number;
        current: number;
        trend: 'improving' | 'stable' | 'declining';
    }[];
    alerts: {
        metric: string;
        threshold: number;
        condition: 'above' | 'below';
        notification: boolean;
    }[];
}
export interface AutomationCapabilities {
    enabled: boolean;
    automationLevel: 'manual' | 'semi_automated' | 'fully_automated' | 'intelligent';
    automatedTasks: string[];
    triggerConditions: string[];
    workflowTemplates: {
        templateId: string;
        name: string;
        steps: string[];
        estimatedDuration: number;
        successRate: number;
    }[];
    customWorkflows: {
        workflowId: string;
        name: string;
        description: string;
        triggers: string[];
        actions: string[];
        conditions: string[];
    }[];
}
export interface IntegrationOptions {
    enabled: boolean;
    integrations: {
        id: string;
        name: string;
        type: 'crm' | 'erp' | 'communication' | 'analytics' | 'storage' | 'security' | 'custom';
        status: 'active' | 'inactive' | 'error';
        configuration: {
            apiKey?: string;
            endpoint?: string;
            version?: string;
            settings?: Record<string, any>;
        };
        lastSync: string;
        syncFrequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
    }[];
    webhooks: {
        webhookId: string;
        url: string;
        events: string[];
        headers: Record<string, string>;
        active: boolean;
    }[];
    apiEndpoints: {
        endpointId: string;
        path: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        authentication: string;
        rateLimit: number;
    }[];
}
export interface SecurityConfiguration {
    enabled: boolean;
    accessLevel: 'public' | 'internal' | 'restricted' | 'confidential' | 'top_secret';
    authentication: {
        method: 'none' | 'api_key' | 'oauth' | 'jwt' | 'custom';
        mfaEnabled: boolean;
        sessionTimeout: number;
    };
    dataEncryption: {
        atRest: boolean;
        inTransit: boolean;
        algorithm: string;
        keyRotation: number;
    };
    auditLogging: {
        enabled: boolean;
        logLevel: 'basic' | 'detailed' | 'comprehensive';
        retentionPeriod: number;
        logEvents: string[];
    };
    compliance: {
        frameworks: string[];
        certifications: string[];
        lastAudit: string;
        nextAudit: string;
        complianceStatus: 'compliant' | 'non_compliant' | 'pending_review';
    };
    dataPrivacy: {
        gdprCompliant: boolean;
        dataResidency: string[];
        anonymization: boolean;
        consentManagement: boolean;
    };
}
export interface GovernancePolicies {
    enabled: boolean;
    policies: {
        policyId: string;
        name: string;
        type: 'operational' | 'security' | 'compliance' | 'ethical' | 'data';
        description: string;
        enforced: boolean;
        lastUpdated: string;
    }[];
    approvalWorkflows: {
        workflowId: string;
        name: string;
        approvers: string[];
        conditions: string[];
        required: boolean;
    }[];
    ethicalGuidelines: {
        enabled: boolean;
        guidelines: string[];
        biasDetection: boolean;
        fairnessChecks: boolean;
        transparencyLevel: 'low' | 'medium' | 'high';
    };
}
export interface MonitoringConfiguration {
    enabled: boolean;
    monitoringLevel: 'basic' | 'standard' | 'comprehensive' | 'enterprise';
    metrics: {
        cpu: boolean;
        memory: boolean;
        responseTime: boolean;
        errorRate: boolean;
        throughput: boolean;
        customMetrics: string[];
    };
    alerts: {
        metric: string;
        threshold: number;
        operator: 'greater_than' | 'less_than' | 'equals';
        severity: 'info' | 'warning' | 'error' | 'critical';
        notificationChannels: string[];
    }[];
    dashboards: {
        dashboardId: string;
        name: string;
        widgets: string[];
        refreshInterval: number;
        sharedWith: string[];
    }[];
    reports: {
        reportId: string;
        name: string;
        type: 'performance' | 'usage' | 'error' | 'custom';
        schedule: string;
        recipients: string[];
        format: 'pdf' | 'csv' | 'json' | 'html';
    }[];
}
export interface AnalyticsConfiguration {
    enabled: boolean;
    analyticsLevel: 'basic' | 'advanced' | 'predictive' | 'ai_driven';
    dataSources: string[];
    analysisTypes: ('descriptive' | 'diagnostic' | 'predictive' | 'prescriptive')[];
    models: {
        modelId: string;
        name: string;
        type: 'classification' | 'regression' | 'clustering' | 'anomaly_detection' | 'time_series';
        accuracy: number;
        lastTrained: string;
        trainingDataSize: number;
    }[];
    insights: {
        insightId: string;
        type: string;
        description: string;
        confidence: number;
        actionable: boolean;
        impact: 'low' | 'medium' | 'high' | 'critical';
        createdAt: string;
    }[];
}
export type AutonomyLevel = 'manual' | 'supervised' | 'autonomous' | 'fully_autonomous';
export interface AutonomyConfig {
    level: AutonomyLevel;
    requiresApprovalFor: string[];
    autoApproveThreshold: number;
    oversightMode: 'monitoring' | 'audit' | 'intervention';
    interventionTriggers: {
        confidenceBelow: number;
        riskLevel: 'low' | 'medium' | 'high' | 'critical';
        anomalyDetected: boolean;
    };
    monitoringInterval: number;
    auditLogRetention: number;
}
export interface InterventionCapability {
    canPause: boolean;
    canOverride: boolean;
    canModify: boolean;
    canRollback: boolean;
    emergencyStop: boolean;
}
export interface AgentConfiguration {
    model: {
        primary: string;
        fallback?: string;
        temperature: number;
        maxTokens: number;
        reasoning: 'none' | 'low' | 'medium' | 'high';
    };
    voice: {
        enabled: boolean;
        gender: 'male' | 'female' | 'neutral';
        style: 'professional' | 'friendly' | 'casual' | 'formal' | 'energetic' | 'calm' | 'authoritative';
        speed: 'slow' | 'normal' | 'fast';
        tone: 'warm' | 'neutral' | 'bright' | 'deep' | 'soft';
        pitch?: number;
    };
    language: {
        primary: string;
        secondary?: string;
        translationEnabled: boolean;
    };
    personality: {
        expertise: string;
        communicationStyle: string;
        responseLength: 'concise' | 'balanced' | 'detailed' | 'comprehensive';
        age: 'young' | 'adult' | 'mature' | 'senior';
    };
    training: {
        enabled: boolean;
        schedule: 'manual' | 'daily' | 'weekly' | 'monthly';
        dataRetention: number;
        feedbackLearning: boolean;
    };
    dataUpload: {
        enabled: boolean;
        processingSchedule: 'immediate' | 'hourly' | 'daily' | 'weekly';
        maxFileSize: number;
        allowedFormats: string[];
    };
    advanced: {
        responseCache: boolean;
        priorityQueue: boolean;
        rateLimiting: boolean;
    };
    security: {
        privacyLevel: 'standard' | 'high' | 'maximum';
        piiHandling: 'block' | 'mask' | 'anonymize' | 'allow';
        encryptionEnabled: boolean;
    };
    autonomy: AutonomyConfig;
    interventionCapabilities: InterventionCapability;
}
export declare const defaultAgentConfiguration: AgentConfiguration;
export declare const createAgentConfiguration: (category: string) => AgentConfiguration;
/**
 * Apply default leadership configuration for main agents
 */
export declare const applyMainAgentDefaults: (agent: AIEmployee) => AIEmployee;
/**
 * Apply default task execution configuration for sub agents
 */
export declare const applySubAgentDefaults: (agent: AIEmployee) => AIEmployee;
/**
 * Enable specific feature for an agent
 */
export declare const enableFeature: (agent: AIEmployee, feature: string) => AIEmployee;
/**
 * Get available features for an agent type
 */
export declare const getAvailableFeatures: (agentType: string) => string[];
/**
 * Apply all default configurations to an agent based on type
 */
export declare const applyAgentDefaults: (agent: AIEmployee) => AIEmployee;
export interface AIEmployee {
    id: string;
    name: string;
    title: string;
    description: string;
    email?: string;
    phone?: string;
    icon: LucideIcon;
    color: string;
    humanCost?: string;
    aiCost?: string;
    efficiency?: string;
    capabilities: string[];
    route?: string;
    category: AIEmployeeCategory;
    type: 'employee' | 'agent' | 'subagent' | 'main_agent';
    replacesRole?: string;
    infrastructure?: AIInfrastructure;
    roiMetrics?: AIROIMetrics;
    isNew?: boolean;
    isPremium?: boolean;
    dangerLevel?: 'low' | 'medium' | 'high' | 'critical';
    consultingConfig?: AgentConsultingConfig;
    collaborationConfig?: AgentCollaborationConfig;
    a2aConfig?: A2ACommunicationConfig;
    parentCategory?: AIBusinessFunction;
    hierarchyLevel?: 'manager' | 'executive' | 'leader' | 'decision_maker' | 'specialist' | 'director';
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
    leadership?: LeadershipCapabilities;
    resourceManagement?: ResourceManagement;
    strategicPlanning?: StrategicPlanning;
    taskSpecialization?: TaskSpecialization;
    workflowIntegration?: WorkflowIntegration;
    escalationProtocol?: EscalationProtocol;
    performanceMetrics?: PerformanceMetrics;
    automation?: AutomationCapabilities;
    integrations?: IntegrationOptions;
    security?: SecurityConfiguration;
    governance?: GovernancePolicies;
    monitoring?: MonitoringConfiguration;
    analytics?: AnalyticsConfiguration;
    hierarchy?: {
        parentId?: string;
        level?: string | number;
        department?: string;
        subAgentIds?: string[];
        peerIds?: string[];
    };
    consulting?: {
        canConsult?: boolean;
        canBeConsulted?: boolean;
        expertiseAreas?: string[];
        consultingStyle?: string;
        preferredConsultationTypes?: string[];
        counselingRole?: string;
    };
    a2aCapabilities?: A2ACommunicationConfig & {
        canInitiateConsultation?: boolean;
        canRespondToConsultation?: boolean;
        canEscalate?: boolean;
        canDelegate?: boolean;
        maxConcurrentConsultations?: number;
        averageResponseTime?: number;
        counselingModes?: string[];
        mentoringCapabilities?: {
            canMentorSubagents?: boolean;
            canMentorPeers?: boolean;
            canBeMentoredByMain?: boolean;
            canBeMentoredByPeers?: boolean;
        };
        coordinationLevel?: string;
    };
    status?: string;
    apiEndpoint?: string;
    version?: string;
    lastUpdated?: string;
    createdAt?: string;
    humanCostEquivalent?: string;
    performance?: {
        tasksCompleted?: number;
        successRate?: number;
        averageResponseTime?: number;
        customerSatisfaction?: number;
        uptime?: string;
    };
    communicationChannels?: Array<{
        type: string;
        priority: string;
        encryption?: boolean;
        persistence?: boolean;
    }>;
}
export type AIEmployeeCategory = 'customer_experience' | 'sales_revenue' | 'marketing_growth' | 'operations_management' | 'data_intelligence' | 'analysis_performance' | 'accounting_finance' | 'product_development' | 'administrative' | 'supply_chain_logistics' | 'security_risk' | 'research_innovation' | 'procurement_vendor' | 'executive_decision' | 'ai_management' | 'support' | 'sales' | 'marketing' | 'operations' | 'analytics' | 'customer_insights_analytics' | 'executive';
export type AIBusinessFunction = 'customer_experience_ai' | 'sales_revenue_ai' | 'marketing_growth_ai' | 'operations_management_ai' | 'data_intelligence_ai' | 'analysis_performance_ai' | 'accounting_finance_ai' | 'product_development_ai' | 'administrative_ai' | 'supply_chain_logistics_ai' | 'security_risk_ai' | 'research_innovation_ai' | 'procurement_vendor_ai' | 'executive_decision_ai' | 'customer_insights_analytics_ai' | 'ai_management_ai';
export declare const customerExperienceSubAgents: AIEmployee[];
export declare const salesRevenueSubAgents: AIEmployee[];
export declare const marketingGrowthSubAgents: AIEmployee[];
export declare const operationsManagementSubAgents: AIEmployee[];
export declare const dataIntelligenceSubAgents: AIEmployee[];
export declare const analysisPerformanceSubAgents: AIEmployee[];
export declare const accountingFinanceSubAgents: AIEmployee[];
export declare const aiManagementSubAgents: AIEmployee[];
export declare const productDevelopmentSubAgents: AIEmployee[];
export declare const administrativeSubAgents: AIEmployee[];
export declare const customerInsightsAnalyticsSubAgents: AIEmployee[];
export declare const mainAgents: AIEmployee[];
export declare const supplyChainLogisticsSubAgents: AIEmployee[];
export declare const securityRiskSubAgents: AIEmployee[];
export declare const researchInnovationSubAgents: AIEmployee[];
export declare const procurementVendorSubAgents: AIEmployee[];
export declare const executiveDecisionSubAgents: AIEmployee[];
export declare const allSubAgents: AIEmployee[];
export declare const allAgents: AIEmployee[];
export declare const agentHierarchy: {
    categories: {
        id: string;
        name: string;
        description: string;
        subAgents: AIEmployee[];
        mainAgent: AIEmployee;
    }[];
    totalSubAgents: number;
    totalMainAgents: number;
    totalAgents: number;
};
/**
 * Enhanced agent arrays with new features and options applied
 */
export declare const enhancedMainAgents: AIEmployee[];
export declare const enhancedSubAgents: AIEmployee[];
export declare const enhancedAllAgents: AIEmployee[];
/**
 * Query functions for filtering agents by features
 */
export declare const getAgentsWithFeature: (feature: string, agents?: AIEmployee[]) => AIEmployee[];
export declare const getAgentsByLeadershipStyle: (style: string) => AIEmployee[];
export declare const getAgentsByAutomationLevel: (level: string) => AIEmployee[];
export declare const getAgentsByExpertiseLevel: (level: string) => AIEmployee[];
export declare const getAgentsBySecurityLevel: (level: string) => AIEmployee[];
export declare const getMainAgentsWithReports: () => AIEmployee[];
export declare const getSubAgentsWithEscalation: () => AIEmployee[];
export declare const getAgentsByMonitoringLevel: (level: string) => AIEmployee[];
export declare const getAgentsByAnalyticsLevel: (level: string) => AIEmployee[];
export {};
//# sourceMappingURL=aiEmployeesEnhanced.d.ts.map