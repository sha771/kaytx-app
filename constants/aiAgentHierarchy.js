"use strict";
/**
 * AI Agent Hierarchy - Main Entry Point
 * Consolidated exports for all AI Agent functionality
 *
 * Enhanced with comprehensive features for all 1,108 agents (277 main + 831 sub)
 * across 22 departments with full capabilities, options, and integrations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingFinanceSubAgents = exports.mediaEntertainmentSubAgents = exports.mediaEntertainmentMainAgents = exports.professionalServicesSubAgents = exports.professionalServicesMainAgents = exports.aiManagementGovernanceSubAgents = exports.aiManagementGovernanceMainAgents = exports.supplyChainLogisticsSubAgents = exports.supplyChainLogisticsMainAgents = exports.governmentPublicSectorSubAgents = exports.governmentPublicSectorMainAgents = exports.transportationLogisticsSubAgents = exports.transportationLogisticsMainAgents = exports.manufacturingProductionSubAgents = exports.manufacturingProductionMainAgents = exports.healthcareMedicalSubAgents = exports.healthcareMedicalMainAgents = exports.insuranceRiskSubAgents = exports.insuranceRiskMainAgents = exports.realEstatePropertySubAgents = exports.realEstatePropertyMainAgents = exports.tradingInvestmentsSubAgents = exports.tradingInvestmentsMainAgents = exports.administrativeSubAgents = exports.administrativeMainAgents = exports.researchDevelopmentSubAgents = exports.researchDevelopmentMainAgents = exports.securityRiskSubAgents = exports.securityRiskMainAgents = exports.productManagementSubAgents = exports.productManagementMainAgents = exports.dataIntelligenceSubAgents = exports.dataIntelligenceMainAgents = exports.legalComplianceSubAgents = exports.legalComplianceMainAgents = exports.humanResourcesSubAgents = exports.humanResourcesMainAgents = exports.technologyEngineeringSubAgents = exports.technologyEngineeringMainAgents = exports.financeAccountingSubAgents = exports.financeAccountingMainAgents = exports.operationsManagementSubAgents = exports.operationsManagementMainAgents = exports.marketingGrowthSubAgents = exports.marketingGrowthMainAgents = exports.salesRevenueSubAgents = exports.salesRevenueMainAgents = exports.customerExperienceSubAgents = exports.customerExperienceMainAgents = exports.getPrivacyAgentById = void 0;
exports.getAllAgents = exports.AI_WORKFORCE_STATS = exports.getAllPrivacyAgents = exports.getPrivacyAgentsByGate = exports.getAgentsWithConsultingCapability = exports.getA2AReadyAgents = exports.getAgentHierarchy = exports.getAgentsByConsultingCapability = exports.getAllNavigationHierarchies = exports.getNavigationHierarchy = exports.getMainAgentByCategory = exports.getSubAgentsByCategory = exports.getAgentById = exports.navigationHierarchy = exports.agentCategories = exports.allAgents = exports.privacyAgents = exports.allMainAgents = exports.allSubAgents = exports.mainAgents = exports.customerInsightsAnalyticsPlaceholder = exports.analysisInsightsPerformanceSubAgents = void 0;
const agent_capability_enhancer_1 = require("./utils/agent-capability-enhancer");
const stub = () => null;
let Settings = stub, Zap = stub, MessagesSquare = stub, Target = stub, Megaphone = stub, Crown = stub, Shield = stub, BarChart3 = stub, Briefcase = stub, Video = stub;
const privacy_agents_1 = require("./privacy-agents");
const comprehensive_agent_generator_1 = require("./comprehensive-agent-generator");
var privacy_agents_2 = require("./privacy-agents");
Object.defineProperty(exports, "getPrivacyAgentById", { enumerable: true, get: function () { return privacy_agents_2.getPrivacyAgentById; } });
// ============================================
// COMPREHENSIVE AGENT HIERARCHY - ALL 22 DEPARTMENTS
// ============================================
// Generate all agents with comprehensive features
const generatedAgents = (0, comprehensive_agent_generator_1.generateAllAgents)();
// Department 1: Customer Experience (14 Main + 42 Sub)
exports.customerExperienceMainAgents = generatedAgents.mainAgents['customer-experience'];
exports.customerExperienceSubAgents = generatedAgents.subAgents['customer-experience'];
// Department 2: Sales & Revenue (14 Main + 42 Sub)
exports.salesRevenueMainAgents = generatedAgents.mainAgents['sales-revenue'];
exports.salesRevenueSubAgents = generatedAgents.subAgents['sales-revenue'];
// Department 3: Marketing & Growth (15 Main + 45 Sub)
exports.marketingGrowthMainAgents = generatedAgents.mainAgents['marketing-growth'];
exports.marketingGrowthSubAgents = generatedAgents.subAgents['marketing-growth'];
// Department 4: Operations & Management (13 Main + 39 Sub)
exports.operationsManagementMainAgents = generatedAgents.mainAgents['operations-management'];
exports.operationsManagementSubAgents = generatedAgents.subAgents['operations-management'];
// Department 5: Finance & Accounting (13 Main + 39 Sub)
exports.financeAccountingMainAgents = generatedAgents.mainAgents['finance-accounting'];
exports.financeAccountingSubAgents = generatedAgents.subAgents['finance-accounting'];
// Department 6: Technology & Engineering (16 Main + 48 Sub)
exports.technologyEngineeringMainAgents = generatedAgents.mainAgents['technology-engineering'];
exports.technologyEngineeringSubAgents = generatedAgents.subAgents['technology-engineering'];
// Department 7: Human Resources (11 Main + 33 Sub)
exports.humanResourcesMainAgents = generatedAgents.mainAgents['human-resources'];
exports.humanResourcesSubAgents = generatedAgents.subAgents['human-resources'];
// Department 8: Legal & Compliance (10 Main + 30 Sub)
exports.legalComplianceMainAgents = generatedAgents.mainAgents['legal-compliance'];
exports.legalComplianceSubAgents = generatedAgents.subAgents['legal-compliance'];
// Department 9: Data & Intelligence (13 Main + 39 Sub)
exports.dataIntelligenceMainAgents = generatedAgents.mainAgents['data-intelligence'];
exports.dataIntelligenceSubAgents = generatedAgents.subAgents['data-intelligence'];
// Department 10: Product Management (10 Main + 30 Sub)
exports.productManagementMainAgents = generatedAgents.mainAgents['product-management'];
exports.productManagementSubAgents = generatedAgents.subAgents['product-management'];
// Department 11: Security & Risk (12 Main + 36 Sub)
exports.securityRiskMainAgents = generatedAgents.mainAgents['security-risk'];
exports.securityRiskSubAgents = generatedAgents.subAgents['security-risk'];
// Department 12: Research & Development (9 Main + 27 Sub)
exports.researchDevelopmentMainAgents = generatedAgents.mainAgents['research-development'];
exports.researchDevelopmentSubAgents = generatedAgents.subAgents['research-development'];
// Department 13: Administrative (9 Main + 27 Sub)
exports.administrativeMainAgents = generatedAgents.mainAgents['administrative'];
exports.administrativeSubAgents = generatedAgents.subAgents['administrative'];
// Department 14: Trading & Investments (18 Main + 54 Sub)
exports.tradingInvestmentsMainAgents = generatedAgents.mainAgents['trading-investments'];
exports.tradingInvestmentsSubAgents = generatedAgents.subAgents['trading-investments'];
// Department 15: Real Estate & Property (14 Main + 42 Sub)
exports.realEstatePropertyMainAgents = generatedAgents.mainAgents['real-estate-property'];
exports.realEstatePropertySubAgents = generatedAgents.subAgents['real-estate-property'];
// Department 16: Insurance & Risk (16 Main + 48 Sub)
exports.insuranceRiskMainAgents = generatedAgents.mainAgents['insurance-risk'];
exports.insuranceRiskSubAgents = generatedAgents.subAgents['insurance-risk'];
// Department 17: Healthcare & Medical (14 Main + 42 Sub)
exports.healthcareMedicalMainAgents = generatedAgents.mainAgents['healthcare-medical'];
exports.healthcareMedicalSubAgents = generatedAgents.subAgents['healthcare-medical'];
// Department 18: Manufacturing & Production (14 Main + 42 Sub)
exports.manufacturingProductionMainAgents = generatedAgents.mainAgents['manufacturing-production'];
exports.manufacturingProductionSubAgents = generatedAgents.subAgents['manufacturing-production'];
// Department 19: Transportation & Logistics (14 Main + 42 Sub)
exports.transportationLogisticsMainAgents = generatedAgents.mainAgents['transportation-logistics'];
exports.transportationLogisticsSubAgents = generatedAgents.subAgents['transportation-logistics'];
// Department 20: Government & Public Sector (12 Main + 36 Sub)
exports.governmentPublicSectorMainAgents = generatedAgents.mainAgents['government-public-sector'];
exports.governmentPublicSectorSubAgents = generatedAgents.subAgents['government-public-sector'];
// Department 21: Supply Chain & Logistics (10 Main + 30 Sub)
exports.supplyChainLogisticsMainAgents = generatedAgents.mainAgents['supply-chain-logistics'];
exports.supplyChainLogisticsSubAgents = generatedAgents.subAgents['supply-chain-logistics'];
// Department 22: AI Management & Governance (6 Main + 18 Sub)
exports.aiManagementGovernanceMainAgents = generatedAgents.mainAgents['ai-management-governance'];
exports.aiManagementGovernanceSubAgents = generatedAgents.subAgents['ai-management-governance'];
// Department 23: Professional Services (10 Main + 30 Sub)
exports.professionalServicesMainAgents = generatedAgents.mainAgents['professional-services'];
exports.professionalServicesSubAgents = generatedAgents.subAgents['professional-services'];
// Department 24: Media & Entertainment (12 Main + 36 Sub)
exports.mediaEntertainmentMainAgents = generatedAgents.mainAgents['media-entertainment'];
exports.mediaEntertainmentSubAgents = generatedAgents.subAgents['media-entertainment'];
// Legacy placeholder arrays (for backward compatibility)
exports.accountingFinanceSubAgents = exports.financeAccountingSubAgents;
exports.analysisInsightsPerformanceSubAgents = [];
exports.customerInsightsAnalyticsPlaceholder = [];
exports.mainAgents = [];
// ============================================
// ALL AGENTS CONSOLIDATED
// ============================================
exports.allSubAgents = [
    ...exports.customerExperienceSubAgents,
    ...exports.salesRevenueSubAgents,
    ...exports.marketingGrowthSubAgents,
    ...exports.customerInsightsAnalyticsPlaceholder,
    ...exports.operationsManagementSubAgents,
    ...exports.financeAccountingSubAgents,
    ...exports.technologyEngineeringSubAgents,
    ...exports.humanResourcesSubAgents,
    ...exports.legalComplianceSubAgents,
    ...exports.dataIntelligenceSubAgents,
    ...exports.productManagementSubAgents,
    ...exports.securityRiskSubAgents,
    ...exports.researchDevelopmentSubAgents,
    ...exports.administrativeSubAgents,
    ...exports.tradingInvestmentsSubAgents,
    ...exports.realEstatePropertySubAgents,
    ...exports.insuranceRiskSubAgents,
    ...exports.healthcareMedicalSubAgents,
    ...exports.manufacturingProductionSubAgents,
    ...exports.transportationLogisticsSubAgents,
    ...exports.governmentPublicSectorSubAgents,
    ...exports.supplyChainLogisticsSubAgents,
    ...exports.aiManagementGovernanceSubAgents,
    ...exports.professionalServicesSubAgents,
    ...exports.mediaEntertainmentSubAgents,
];
exports.allMainAgents = [
    ...exports.customerExperienceMainAgents,
    ...exports.salesRevenueMainAgents,
    ...exports.marketingGrowthMainAgents,
    ...exports.operationsManagementMainAgents,
    ...exports.financeAccountingMainAgents,
    ...exports.technologyEngineeringMainAgents,
    ...exports.humanResourcesMainAgents,
    ...exports.legalComplianceMainAgents,
    ...exports.dataIntelligenceMainAgents,
    ...exports.productManagementMainAgents,
    ...exports.securityRiskMainAgents,
    ...exports.researchDevelopmentMainAgents,
    ...exports.administrativeMainAgents,
    ...exports.tradingInvestmentsMainAgents,
    ...exports.realEstatePropertyMainAgents,
    ...exports.insuranceRiskMainAgents,
    ...exports.healthcareMedicalMainAgents,
    ...exports.manufacturingProductionMainAgents,
    ...exports.transportationLogisticsMainAgents,
    ...exports.governmentPublicSectorMainAgents,
    ...exports.supplyChainLogisticsMainAgents,
    ...exports.aiManagementGovernanceMainAgents,
    ...exports.professionalServicesMainAgents,
    ...exports.mediaEntertainmentMainAgents,
];
// Privacy Layer Agents (9 total)
exports.privacyAgents = privacy_agents_1.allPrivacyAgents;
// Auto-enhanced with all capabilities
exports.allAgents = (0, agent_capability_enhancer_1.enhanceAllAIAgents)([...exports.allMainAgents, ...exports.allSubAgents, ...exports.privacyAgents]);
// ============================================
// AGENT CATEGORIES - ALL 24 DEPARTMENTS
// ============================================
exports.agentCategories = [
    { id: 'customer-experience', label: 'Customer Experience AI', icon: MessagesSquare, color: '#007AFF' },
    { id: 'sales-revenue', label: 'Sales & Revenue AI', icon: Target, color: '#34C759' },
    { id: 'marketing-growth', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55' },
    { id: 'operations-management', label: 'Operations & Management AI', icon: Settings, color: '#5856D6' },
    { id: 'finance-accounting', label: 'Finance & Accounting AI', icon: Crown, color: '#FFD700' },
    { id: 'technology-engineering', label: 'Technology & Engineering AI', icon: Zap, color: '#AF52DE' },
    { id: 'human-resources', label: 'Human Resources AI', icon: Shield, color: '#FF5252' },
    { id: 'legal-compliance', label: 'Legal & Compliance AI', icon: BarChart3, color: '#6366F1' },
    { id: 'data-intelligence', label: 'Data & Intelligence AI', icon: Zap, color: '#AF52DE' },
    { id: 'product-management', label: 'Product Management AI', icon: Crown, color: '#FFD700' },
    { id: 'security-risk', label: 'Security & Risk AI', icon: Shield, color: '#FF5252' },
    { id: 'research-development', label: 'Research & Development AI', icon: BarChart3, color: '#6366F1' },
    { id: 'administrative', label: 'Administrative AI', icon: Settings, color: '#5856D6' },
    { id: 'trading-investments', label: 'Trading & Investments AI', icon: Target, color: '#34C759' },
    { id: 'real-estate-property', label: 'Real Estate & Property AI', icon: Crown, color: '#FFD700' },
    { id: 'insurance-risk', label: 'Insurance & Risk AI', icon: Shield, color: '#FF5252' },
    { id: 'healthcare-medical', label: 'Healthcare & Medical AI', icon: BarChart3, color: '#6366F1' },
    { id: 'manufacturing-production', label: 'Manufacturing & Production AI', icon: Zap, color: '#AF52DE' },
    { id: 'transportation-logistics', label: 'Transportation & Logistics AI', icon: Settings, color: '#5856D6' },
    { id: 'government-public-sector', label: 'Government & Public Sector AI', icon: Crown, color: '#FFD700' },
    { id: 'supply-chain-logistics', label: 'Supply Chain & Logistics AI', icon: Target, color: '#34C759' },
    { id: 'ai-management-governance', label: 'AI Management & Governance AI', icon: Shield, color: '#FF5252' },
    { id: 'privacy-security', label: 'Privacy & Security AI', icon: Shield, color: '#FF5252' },
    { id: 'professional-services', label: 'Professional Services AI', icon: Briefcase, color: '#0D9488' },
    { id: 'media-entertainment', label: 'Media & Entertainment AI', icon: Video, color: '#EC4899' },
];
// ============================================
// NAVIGATION HIERARCHY - ALL 24 DEPARTMENTS
// ============================================
exports.navigationHierarchy = {
    'customer-experience': {
        id: 'customer-experience',
        label: 'Customer Experience AI',
        icon: MessagesSquare,
        color: '#007AFF',
        path: '/ai-agent/customer-agents',
        mainAgents: exports.customerExperienceMainAgents,
        subAgents: exports.customerExperienceSubAgents,
        description: 'AI agents for customer support, experience, retention, and loyalty',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'sales-revenue': {
        id: 'sales-revenue',
        label: 'Sales & Revenue AI',
        icon: Target,
        color: '#34C759',
        path: '/ai-agent/sales-agents',
        mainAgents: exports.salesRevenueMainAgents,
        subAgents: exports.salesRevenueSubAgents,
        description: 'AI agents for sales operations, revenue generation, and business development',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'marketing-growth': {
        id: 'marketing-growth',
        label: 'Marketing & Growth AI',
        icon: Megaphone,
        color: '#FF2D55',
        path: '/ai-agent/marketing-agents',
        mainAgents: exports.marketingGrowthMainAgents,
        subAgents: exports.marketingGrowthSubAgents,
        description: 'AI agents for marketing campaigns, content creation, and growth strategies',
        stats: { main: 15, sub: 45, total: 60 }
    },
    'operations-management': {
        id: 'operations-management',
        label: 'Operations & Management AI',
        icon: Settings,
        color: '#5856D6',
        path: '/ai-agent/operations-agents',
        mainAgents: exports.operationsManagementMainAgents,
        subAgents: exports.operationsManagementSubAgents,
        description: 'AI agents for operational efficiency, workflow automation, and process optimization',
        stats: { main: 13, sub: 39, total: 52 }
    },
    'finance-accounting': {
        id: 'finance-accounting',
        label: 'Finance & Accounting AI',
        icon: Crown,
        color: '#FFD700',
        path: '/ai-agent/accounting-agents',
        mainAgents: exports.financeAccountingMainAgents,
        subAgents: exports.financeAccountingSubAgents,
        description: 'AI agents for financial analysis, accounting operations, and treasury management',
        stats: { main: 13, sub: 39, total: 52 }
    },
    'technology-engineering': {
        id: 'technology-engineering',
        label: 'Technology & Engineering AI',
        icon: Zap,
        color: '#AF52DE',
        path: '/ai-agent/technology',
        mainAgents: exports.technologyEngineeringMainAgents,
        subAgents: exports.technologyEngineeringSubAgents,
        description: 'AI agents for software development, infrastructure, and technology operations',
        stats: { main: 16, sub: 48, total: 64 }
    },
    'human-resources': {
        id: 'human-resources',
        label: 'Human Resources AI',
        icon: Shield,
        color: '#FF5252',
        path: '/ai-agent/hr',
        mainAgents: exports.humanResourcesMainAgents,
        subAgents: exports.humanResourcesSubAgents,
        description: 'AI agents for HR operations, talent management, and employee engagement',
        stats: { main: 11, sub: 33, total: 44 }
    },
    'legal-compliance': {
        id: 'legal-compliance',
        label: 'Legal & Compliance AI',
        icon: BarChart3,
        color: '#6366F1',
        path: '/ai-agent/legal',
        mainAgents: exports.legalComplianceMainAgents,
        subAgents: exports.legalComplianceSubAgents,
        description: 'AI agents for legal research, compliance management, and contract analysis',
        stats: { main: 10, sub: 30, total: 40 }
    },
    'data-intelligence': {
        id: 'data-intelligence',
        label: 'Data & Intelligence AI',
        icon: Zap,
        color: '#AF52DE',
        path: '/ai-agent/data-agents',
        mainAgents: exports.dataIntelligenceMainAgents,
        subAgents: exports.dataIntelligenceSubAgents,
        description: 'AI agents for data science, analytics, and business intelligence',
        stats: { main: 13, sub: 39, total: 52 }
    },
    'product-management': {
        id: 'product-management',
        label: 'Product Management AI',
        icon: Crown,
        color: '#FFD700',
        path: '/ai-agent/product',
        mainAgents: exports.productManagementMainAgents,
        subAgents: exports.productManagementSubAgents,
        description: 'AI agents for product strategy, UX research, and product development',
        stats: { main: 10, sub: 30, total: 40 }
    },
    'security-risk': {
        id: 'security-risk',
        label: 'Security & Risk AI',
        icon: Shield,
        color: '#FF5252',
        path: '/ai-agent/security',
        mainAgents: exports.securityRiskMainAgents,
        subAgents: exports.securityRiskSubAgents,
        description: 'AI agents for cybersecurity, risk management, and incident response',
        stats: { main: 12, sub: 36, total: 48 }
    },
    'research-development': {
        id: 'research-development',
        label: 'Research & Development AI',
        icon: BarChart3,
        color: '#6366F1',
        path: '/ai-agent/research',
        mainAgents: exports.researchDevelopmentMainAgents,
        subAgents: exports.researchDevelopmentSubAgents,
        description: 'AI agents for research innovation, prototyping, and patent analysis',
        stats: { main: 9, sub: 27, total: 36 }
    },
    'administrative': {
        id: 'administrative',
        label: 'Administrative AI',
        icon: Settings,
        color: '#5856D6',
        path: '/ai-agent/admin',
        mainAgents: exports.administrativeMainAgents,
        subAgents: exports.administrativeSubAgents,
        description: 'AI agents for administrative operations, facilities management, and office coordination',
        stats: { main: 9, sub: 27, total: 36 }
    },
    'trading-investments': {
        id: 'trading-investments',
        label: 'Trading & Investments AI',
        icon: Target,
        color: '#34C759',
        path: '/ai-agent/trading',
        mainAgents: exports.tradingInvestmentsMainAgents,
        subAgents: exports.tradingInvestmentsSubAgents,
        description: 'AI agents for trading operations, portfolio management, and investment analysis',
        stats: { main: 18, sub: 54, total: 72 }
    },
    'real-estate-property': {
        id: 'real-estate-property',
        label: 'Real Estate & Property AI',
        icon: Crown,
        color: '#FFD700',
        path: '/ai-agent/real-estate',
        mainAgents: exports.realEstatePropertyMainAgents,
        subAgents: exports.realEstatePropertySubAgents,
        description: 'AI agents for property management, real estate development, and leasing operations',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'insurance-risk': {
        id: 'insurance-risk',
        label: 'Insurance & Risk AI',
        icon: Shield,
        color: '#FF5252',
        path: '/ai-agent/insurance',
        mainAgents: exports.insuranceRiskMainAgents,
        subAgents: exports.insuranceRiskSubAgents,
        description: 'AI agents for underwriting, claims processing, and risk assessment',
        stats: { main: 16, sub: 48, total: 64 }
    },
    'healthcare-medical': {
        id: 'healthcare-medical',
        label: 'Healthcare & Medical AI',
        icon: BarChart3,
        color: '#6366F1',
        path: '/ai-agent/healthcare',
        mainAgents: exports.healthcareMedicalMainAgents,
        subAgents: exports.healthcareMedicalSubAgents,
        description: 'AI agents for patient care, medical billing, and healthcare operations',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'manufacturing-production': {
        id: 'manufacturing-production',
        label: 'Manufacturing & Production AI',
        icon: Zap,
        color: '#AF52DE',
        path: '/ai-agent/manufacturing',
        mainAgents: exports.manufacturingProductionMainAgents,
        subAgents: exports.manufacturingProductionSubAgents,
        description: 'AI agents for production planning, quality control, and manufacturing operations',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'transportation-logistics': {
        id: 'transportation-logistics',
        label: 'Transportation & Logistics AI',
        icon: Settings,
        color: '#5856D6',
        path: '/ai-agent/transportation',
        mainAgents: exports.transportationLogisticsMainAgents,
        subAgents: exports.transportationLogisticsSubAgents,
        description: 'AI agents for fleet management, route optimization, and logistics coordination',
        stats: { main: 14, sub: 42, total: 56 }
    },
    'government-public-sector': {
        id: 'government-public-sector',
        label: 'Government & Public Sector AI',
        icon: Crown,
        color: '#FFD700',
        path: '/ai-agent/government',
        mainAgents: exports.governmentPublicSectorMainAgents,
        subAgents: exports.governmentPublicSectorSubAgents,
        description: 'AI agents for policy management, regulatory compliance, and public administration',
        stats: { main: 12, sub: 36, total: 48 }
    },
    'supply-chain-logistics': {
        id: 'supply-chain-logistics',
        label: 'Supply Chain & Logistics AI',
        icon: Target,
        color: '#34C759',
        path: '/ai-agent/supply-chain',
        mainAgents: exports.supplyChainLogisticsMainAgents,
        subAgents: exports.supplyChainLogisticsSubAgents,
        description: 'AI agents for supply chain operations, procurement, and inventory management',
        stats: { main: 10, sub: 30, total: 40 }
    },
    'ai-management-governance': {
        id: 'ai-management-governance',
        label: 'AI Management & Governance AI',
        icon: Shield,
        color: '#FF5252',
        path: '/ai-agent/executive',
        mainAgents: exports.aiManagementGovernanceMainAgents,
        subAgents: exports.aiManagementGovernanceSubAgents,
        description: 'AI agents for automation governance, process excellence, and AI operations',
        stats: { main: 6, sub: 18, total: 24 }
    },
    'professional-services': {
        id: 'professional-services',
        label: 'Professional Services AI',
        icon: Briefcase,
        color: '#0D9488',
        path: '/ai-agent/professional-services',
        mainAgents: exports.professionalServicesMainAgents,
        subAgents: exports.professionalServicesSubAgents,
        description: 'AI agents for consulting, project management, and business services',
        stats: { main: 10, sub: 30, total: 40 }
    },
    'media-entertainment': {
        id: 'media-entertainment',
        label: 'Media & Entertainment AI',
        icon: Video,
        color: '#EC4899',
        path: '/ai-agent/media-entertainment',
        mainAgents: exports.mediaEntertainmentMainAgents,
        subAgents: exports.mediaEntertainmentSubAgents,
        description: 'AI agents for content creation, media production, and entertainment management',
        stats: { main: 12, sub: 36, total: 48 }
    },
};
// ============================================
// HELPER FUNCTIONS
// ============================================
const getAgentById = (agentId) => {
    return exports.allAgents.find(agent => agent.id === agentId);
};
exports.getAgentById = getAgentById;
const getSubAgentsByCategory = (category) => {
    return exports.allSubAgents.filter(agent => agent.category === category);
};
exports.getSubAgentsByCategory = getSubAgentsByCategory;
const getMainAgentByCategory = (category) => {
    return exports.mainAgents.find(agent => agent.category === category);
};
exports.getMainAgentByCategory = getMainAgentByCategory;
const getNavigationHierarchy = (categoryId) => {
    return exports.navigationHierarchy[categoryId];
};
exports.getNavigationHierarchy = getNavigationHierarchy;
const getAllNavigationHierarchies = () => {
    return Object.values(exports.navigationHierarchy);
};
exports.getAllNavigationHierarchies = getAllNavigationHierarchies;
const getAgentsByConsultingCapability = (expertise) => {
    return exports.allAgents.filter(agent => agent.consulting?.canBeConsulted &&
        agent.consulting?.expertiseAreas?.some(area => area.toLowerCase().includes(expertise.toLowerCase())));
};
exports.getAgentsByConsultingCapability = getAgentsByConsultingCapability;
const getAgentHierarchy = (agentId) => {
    const agent = (0, exports.getAgentById)(agentId);
    if (!agent)
        return { mainAgent: undefined, subAgents: [], peers: [] };
    // For sub-agents, find their main agent and siblings
    const parentId = agent.hierarchy?.parentId;
    if (parentId) {
        const mainAgent = exports.mainAgents.find(main => main.id === parentId);
        const siblingSubs = mainAgent
            ? exports.allSubAgents.filter(sub => sub.hierarchy?.parentId === parentId && sub.id !== agentId)
            : [];
        return {
            mainAgent,
            subAgents: mainAgent
                ? exports.allSubAgents.filter(sub => sub.hierarchy?.parentId === parentId)
                : [],
            peers: siblingSubs,
        };
    }
    // For main agents, return peers and their own sub-agents
    return {
        mainAgent: agent,
        subAgents: exports.allSubAgents.filter(sub => sub.hierarchy?.parentId === agentId),
        peers: exports.mainAgents.filter(m => m.id !== agentId),
    };
};
exports.getAgentHierarchy = getAgentHierarchy;
const getA2AReadyAgents = () => {
    return exports.allAgents.filter(agent => agent.a2aCapabilities?.canInitiateConsultation ||
        agent.a2aCapabilities?.canRespondToConsultation);
};
exports.getA2AReadyAgents = getA2AReadyAgents;
const getAgentsWithConsultingCapability = () => {
    return exports.allAgents.filter(agent => agent.consulting?.canConsult || agent.consulting?.canBeConsulted);
};
exports.getAgentsWithConsultingCapability = getAgentsWithConsultingCapability;
// ============================================
// PRIVACY LAYER HELPERS
// ============================================
const getPrivacyAgentsByGate = (gate) => {
    const gateMap = {
        input: ['privacy-data-classifier', 'privacy-purpose-validator', 'privacy-access-controller'],
        agent: ['privacy-data-masker', 'privacy-context-filter', 'privacy-permission-enforcer'],
        output: ['privacy-output-sanitizer', 'privacy-compliance-checker', 'privacy-audit-logger'],
    };
    return exports.privacyAgents.filter(agent => gateMap[gate]?.includes(agent.id));
};
exports.getPrivacyAgentsByGate = getPrivacyAgentsByGate;
const getAllPrivacyAgents = () => exports.privacyAgents;
exports.getAllPrivacyAgents = getAllPrivacyAgents;
// ============================================
// STATS
// ============================================
exports.AI_WORKFORCE_STATS = {
    totalAgents: exports.allAgents.length,
    mainAgents: exports.mainAgents.length,
    subAgents: exports.allSubAgents.length,
    privacyAgents: exports.privacyAgents.length,
    categories: exports.agentCategories.length,
};
// getAllAgents as function returning all agents (for compatibility)
const getAllAgents = () => exports.allAgents;
exports.getAllAgents = getAllAgents;
// Default export
exports.default = {
    allAgents: exports.allAgents,
    allSubAgents: exports.allSubAgents,
    allMainAgents: exports.allMainAgents,
    mainAgents: exports.mainAgents,
    privacyAgents: exports.privacyAgents,
    agentCategories: exports.agentCategories,
    navigationHierarchy: exports.navigationHierarchy,
    getAgentById: exports.getAgentById,
    getSubAgentsByCategory: exports.getSubAgentsByCategory,
    getMainAgentByCategory: exports.getMainAgentByCategory,
    getAgentsByConsultingCapability: exports.getAgentsByConsultingCapability,
    getAgentHierarchy: exports.getAgentHierarchy,
    getA2AReadyAgents: exports.getA2AReadyAgents,
    getAgentsWithConsultingCapability: exports.getAgentsWithConsultingCapability,
    getPrivacyAgentsByGate: exports.getPrivacyAgentsByGate,
    getAllPrivacyAgents: exports.getAllPrivacyAgents,
    getNavigationHierarchy: exports.getNavigationHierarchy,
    getAllNavigationHierarchies: exports.getAllNavigationHierarchies,
    AI_WORKFORCE_STATS: exports.AI_WORKFORCE_STATS,
};
//# sourceMappingURL=aiAgentHierarchy.js.map