/**
 * AI Agent Hierarchy - Main Entry Point
 * Consolidated exports for all AI Agent functionality
 *
 * Enhanced with comprehensive features for all 1,108 agents (277 main + 831 sub)
 * across 22 departments with full capabilities, options, and integrations.
 */
import type { AIEmployee } from './aiEmployeesEnhanced';
export { getPrivacyAgentById } from './privacy-agents';
export type AIAgent = AIEmployee;
export type AIAgentDefinition = AIEmployee;
export declare const customerExperienceMainAgents: AIAgent[];
export declare const customerExperienceSubAgents: AIAgent[];
export declare const salesRevenueMainAgents: AIAgent[];
export declare const salesRevenueSubAgents: AIAgent[];
export declare const marketingGrowthMainAgents: AIAgent[];
export declare const marketingGrowthSubAgents: AIAgent[];
export declare const operationsManagementMainAgents: AIAgent[];
export declare const operationsManagementSubAgents: AIAgent[];
export declare const financeAccountingMainAgents: AIAgent[];
export declare const financeAccountingSubAgents: AIAgent[];
export declare const technologyEngineeringMainAgents: AIAgent[];
export declare const technologyEngineeringSubAgents: AIAgent[];
export declare const humanResourcesMainAgents: AIAgent[];
export declare const humanResourcesSubAgents: AIAgent[];
export declare const legalComplianceMainAgents: AIAgent[];
export declare const legalComplianceSubAgents: AIAgent[];
export declare const dataIntelligenceMainAgents: AIAgent[];
export declare const dataIntelligenceSubAgents: AIAgent[];
export declare const productManagementMainAgents: AIAgent[];
export declare const productManagementSubAgents: AIAgent[];
export declare const securityRiskMainAgents: AIAgent[];
export declare const securityRiskSubAgents: AIAgent[];
export declare const researchDevelopmentMainAgents: AIAgent[];
export declare const researchDevelopmentSubAgents: AIAgent[];
export declare const administrativeMainAgents: AIAgent[];
export declare const administrativeSubAgents: AIAgent[];
export declare const tradingInvestmentsMainAgents: AIAgent[];
export declare const tradingInvestmentsSubAgents: AIAgent[];
export declare const realEstatePropertyMainAgents: AIAgent[];
export declare const realEstatePropertySubAgents: AIAgent[];
export declare const insuranceRiskMainAgents: AIAgent[];
export declare const insuranceRiskSubAgents: AIAgent[];
export declare const healthcareMedicalMainAgents: AIAgent[];
export declare const healthcareMedicalSubAgents: AIAgent[];
export declare const manufacturingProductionMainAgents: AIAgent[];
export declare const manufacturingProductionSubAgents: AIAgent[];
export declare const transportationLogisticsMainAgents: AIAgent[];
export declare const transportationLogisticsSubAgents: AIAgent[];
export declare const governmentPublicSectorMainAgents: AIAgent[];
export declare const governmentPublicSectorSubAgents: AIAgent[];
export declare const supplyChainLogisticsMainAgents: AIAgent[];
export declare const supplyChainLogisticsSubAgents: AIAgent[];
export declare const aiManagementGovernanceMainAgents: AIAgent[];
export declare const aiManagementGovernanceSubAgents: AIAgent[];
export declare const professionalServicesMainAgents: AIAgent[];
export declare const professionalServicesSubAgents: AIAgent[];
export declare const mediaEntertainmentMainAgents: AIAgent[];
export declare const mediaEntertainmentSubAgents: AIAgent[];
export declare const accountingFinanceSubAgents: AIAgent[];
export declare const analysisInsightsPerformanceSubAgents: AIAgent[];
export declare const customerInsightsAnalyticsPlaceholder: AIAgent[];
export declare const mainAgents: AIAgent[];
export declare const allSubAgents: AIAgent[];
export declare const allMainAgents: AIAgent[];
export declare const privacyAgents: AIAgent[];
export declare const allAgents: AIAgent[];
export declare const agentCategories: {
    id: string;
    label: string;
    icon: any;
    color: string;
}[];
export declare const navigationHierarchy: {
    'customer-experience': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'sales-revenue': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'marketing-growth': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'operations-management': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'finance-accounting': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'technology-engineering': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'human-resources': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'legal-compliance': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'data-intelligence': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'product-management': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'security-risk': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'research-development': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    administrative: {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'trading-investments': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'real-estate-property': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'insurance-risk': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'healthcare-medical': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'manufacturing-production': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'transportation-logistics': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'government-public-sector': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'supply-chain-logistics': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'ai-management-governance': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'professional-services': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    'media-entertainment': {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
};
export declare const getAgentById: (agentId: string) => AIAgent | undefined;
export declare const getSubAgentsByCategory: (category: string) => AIAgent[];
export declare const getMainAgentByCategory: (category: string) => AIAgent | undefined;
export declare const getNavigationHierarchy: (categoryId: string) => {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
};
export declare const getAllNavigationHierarchies: () => ({
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
} | {
    id: string;
    label: string;
    icon: any;
    color: string;
    path: string;
    mainAgents: AIEmployee[];
    subAgents: AIEmployee[];
    description: string;
    stats: {
        main: number;
        sub: number;
        total: number;
    };
})[];
export declare const getAgentsByConsultingCapability: (expertise: string) => AIAgent[];
export declare const getAgentHierarchy: (agentId: string) => {
    mainAgent: AIAgent | undefined;
    subAgents: AIAgent[];
    peers: AIAgent[];
};
export declare const getA2AReadyAgents: () => AIAgent[];
export declare const getAgentsWithConsultingCapability: () => AIAgent[];
export declare const getPrivacyAgentsByGate: (gate: "input" | "agent" | "output") => AIAgent[];
export declare const getAllPrivacyAgents: () => AIAgent[];
export declare const AI_WORKFORCE_STATS: {
    totalAgents: number;
    mainAgents: number;
    subAgents: number;
    privacyAgents: number;
    categories: number;
};
export declare const getAllAgents: () => AIAgent[];
declare const _default: {
    allAgents: AIEmployee[];
    allSubAgents: AIEmployee[];
    allMainAgents: AIEmployee[];
    mainAgents: AIEmployee[];
    privacyAgents: AIEmployee[];
    agentCategories: {
        id: string;
        label: string;
        icon: any;
        color: string;
    }[];
    navigationHierarchy: {
        'customer-experience': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'sales-revenue': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'marketing-growth': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'operations-management': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'finance-accounting': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'technology-engineering': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'human-resources': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'legal-compliance': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'data-intelligence': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'product-management': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'security-risk': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'research-development': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        administrative: {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'trading-investments': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'real-estate-property': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'insurance-risk': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'healthcare-medical': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'manufacturing-production': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'transportation-logistics': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'government-public-sector': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'supply-chain-logistics': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'ai-management-governance': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'professional-services': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
        'media-entertainment': {
            id: string;
            label: string;
            icon: any;
            color: string;
            path: string;
            mainAgents: AIEmployee[];
            subAgents: AIEmployee[];
            description: string;
            stats: {
                main: number;
                sub: number;
                total: number;
            };
        };
    };
    getAgentById: (agentId: string) => AIAgent | undefined;
    getSubAgentsByCategory: (category: string) => AIAgent[];
    getMainAgentByCategory: (category: string) => AIAgent | undefined;
    getAgentsByConsultingCapability: (expertise: string) => AIAgent[];
    getAgentHierarchy: (agentId: string) => {
        mainAgent: AIAgent | undefined;
        subAgents: AIAgent[];
        peers: AIAgent[];
    };
    getA2AReadyAgents: () => AIAgent[];
    getAgentsWithConsultingCapability: () => AIAgent[];
    getPrivacyAgentsByGate: (gate: "input" | "agent" | "output") => AIAgent[];
    getAllPrivacyAgents: () => AIAgent[];
    getNavigationHierarchy: (categoryId: string) => {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    };
    getAllNavigationHierarchies: () => ({
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    } | {
        id: string;
        label: string;
        icon: any;
        color: string;
        path: string;
        mainAgents: AIEmployee[];
        subAgents: AIEmployee[];
        description: string;
        stats: {
            main: number;
            sub: number;
            total: number;
        };
    })[];
    AI_WORKFORCE_STATS: {
        totalAgents: number;
        mainAgents: number;
        subAgents: number;
        privacyAgents: number;
        categories: number;
    };
};
export default _default;
//# sourceMappingURL=aiAgentHierarchy.d.ts.map