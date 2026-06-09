/**
 * AI Agent Hierarchy - Main Entry Point
 * Consolidated exports for all AI Agent functionality
 * 
 * Enhanced with comprehensive features for all 1,108 agents (277 main + 831 sub)
 * across 22 departments with full capabilities, options, and integrations.
 */

import type { AIEmployee } from './aiEmployeesEnhanced';
import { enhanceAllAIAgents } from './utils/agent-capability-enhancer';
import {
  Settings, Zap, MessagesSquare, Target, Megaphone, Crown, Shield, ChartBarBig,
} from 'lucide-react-native';
import {
  allPrivacyAgents,
  privacyDataClassifier,
  privacyPurposeValidator,
  privacyAccessController,
  privacyDataMasker,
  privacyContextFilter,
  privacyPermissionEnforcer,
  privacyOutputSanitizer,
  privacyComplianceChecker,
  privacyAuditLogger,
} from './privacy-agents';
import {
  generateAllAgents,
  generateDepartmentMainAgents,
  generateDepartmentSubAgents,
} from './comprehensive-agent-generator';
export { getPrivacyAgentById } from './privacy-agents';

// Define AIAgent as alias to AIEmployee
export type AIAgent = AIEmployee;
export type AIAgentDefinition = AIEmployee;

// ============================================
// COMPREHENSIVE AGENT HIERARCHY - ALL 22 DEPARTMENTS
// ============================================

// Generate all agents with comprehensive features
const generatedAgents = generateAllAgents();

// Department 1: Customer Experience (14 Main + 42 Sub)
export const customerExperienceMainAgents: AIAgent[] = generatedAgents.mainAgents['customer-experience'];
export const customerExperienceSubAgents: AIAgent[] = generatedAgents.subAgents['customer-experience'];

// Department 2: Sales & Revenue (14 Main + 42 Sub)
export const salesRevenueMainAgents: AIAgent[] = generatedAgents.mainAgents['sales-revenue'];
export const salesRevenueSubAgents: AIAgent[] = generatedAgents.subAgents['sales-revenue'];

// Department 3: Marketing & Growth (15 Main + 45 Sub)
export const marketingGrowthMainAgents: AIAgent[] = generatedAgents.mainAgents['marketing-growth'];
export const marketingGrowthSubAgents: AIAgent[] = generatedAgents.subAgents['marketing-growth'];

// Department 4: Operations & Management (13 Main + 39 Sub)
export const operationsManagementMainAgents: AIAgent[] = generatedAgents.mainAgents['operations-management'];
export const operationsManagementSubAgents: AIAgent[] = generatedAgents.subAgents['operations-management'];

// Department 5: Finance & Accounting (13 Main + 39 Sub)
export const financeAccountingMainAgents: AIAgent[] = generatedAgents.mainAgents['finance-accounting'];
export const financeAccountingSubAgents: AIAgent[] = generatedAgents.subAgents['finance-accounting'];

// Department 6: Technology & Engineering (16 Main + 48 Sub)
export const technologyEngineeringMainAgents: AIAgent[] = generatedAgents.mainAgents['technology-engineering'];
export const technologyEngineeringSubAgents: AIAgent[] = generatedAgents.subAgents['technology-engineering'];

// Department 7: Human Resources (11 Main + 33 Sub)
export const humanResourcesMainAgents: AIAgent[] = generatedAgents.mainAgents['human-resources'];
export const humanResourcesSubAgents: AIAgent[] = generatedAgents.subAgents['human-resources'];

// Department 8: Legal & Compliance (10 Main + 30 Sub)
export const legalComplianceMainAgents: AIAgent[] = generatedAgents.mainAgents['legal-compliance'];
export const legalComplianceSubAgents: AIAgent[] = generatedAgents.subAgents['legal-compliance'];

// Department 9: Data & Intelligence (13 Main + 39 Sub)
export const dataIntelligenceMainAgents: AIAgent[] = generatedAgents.mainAgents['data-intelligence'];
export const dataIntelligenceSubAgents: AIAgent[] = generatedAgents.subAgents['data-intelligence'];

// Department 10: Product Management (10 Main + 30 Sub)
export const productManagementMainAgents: AIAgent[] = generatedAgents.mainAgents['product-management'];
export const productManagementSubAgents: AIAgent[] = generatedAgents.subAgents['product-management'];

// Department 11: Security & Risk (12 Main + 36 Sub)
export const securityRiskMainAgents: AIAgent[] = generatedAgents.mainAgents['security-risk'];
export const securityRiskSubAgents: AIAgent[] = generatedAgents.subAgents['security-risk'];

// Department 12: Research & Development (9 Main + 27 Sub)
export const researchDevelopmentMainAgents: AIAgent[] = generatedAgents.mainAgents['research-development'];
export const researchDevelopmentSubAgents: AIAgent[] = generatedAgents.subAgents['research-development'];

// Department 13: Administrative (9 Main + 27 Sub)
export const administrativeMainAgents: AIAgent[] = generatedAgents.mainAgents['administrative'];
export const administrativeSubAgents: AIAgent[] = generatedAgents.subAgents['administrative'];

// Department 14: Trading & Investments (18 Main + 54 Sub)
export const tradingInvestmentsMainAgents: AIAgent[] = generatedAgents.mainAgents['trading-investments'];
export const tradingInvestmentsSubAgents: AIAgent[] = generatedAgents.subAgents['trading-investments'];

// Department 15: Real Estate & Property (14 Main + 42 Sub)
export const realEstatePropertyMainAgents: AIAgent[] = generatedAgents.mainAgents['real-estate-property'];
export const realEstatePropertySubAgents: AIAgent[] = generatedAgents.subAgents['real-estate-property'];

// Department 16: Insurance & Risk (16 Main + 48 Sub)
export const insuranceRiskMainAgents: AIAgent[] = generatedAgents.mainAgents['insurance-risk'];
export const insuranceRiskSubAgents: AIAgent[] = generatedAgents.subAgents['insurance-risk'];

// Department 17: Healthcare & Medical (14 Main + 42 Sub)
export const healthcareMedicalMainAgents: AIAgent[] = generatedAgents.mainAgents['healthcare-medical'];
export const healthcareMedicalSubAgents: AIAgent[] = generatedAgents.subAgents['healthcare-medical'];

// Department 18: Manufacturing & Production (14 Main + 42 Sub)
export const manufacturingProductionMainAgents: AIAgent[] = generatedAgents.mainAgents['manufacturing-production'];
export const manufacturingProductionSubAgents: AIAgent[] = generatedAgents.subAgents['manufacturing-production'];

// Department 19: Transportation & Logistics (14 Main + 42 Sub)
export const transportationLogisticsMainAgents: AIAgent[] = generatedAgents.mainAgents['transportation-logistics'];
export const transportationLogisticsSubAgents: AIAgent[] = generatedAgents.subAgents['transportation-logistics'];

// Department 20: Government & Public Sector (12 Main + 36 Sub)
export const governmentPublicSectorMainAgents: AIAgent[] = generatedAgents.mainAgents['government-public-sector'];
export const governmentPublicSectorSubAgents: AIAgent[] = generatedAgents.subAgents['government-public-sector'];

// Department 21: Supply Chain & Logistics (10 Main + 30 Sub)
export const supplyChainLogisticsMainAgents: AIAgent[] = generatedAgents.mainAgents['supply-chain-logistics'];
export const supplyChainLogisticsSubAgents: AIAgent[] = generatedAgents.subAgents['supply-chain-logistics'];

// Department 22: AI Management & Governance (6 Main + 18 Sub)
export const aiManagementGovernanceMainAgents: AIAgent[] = generatedAgents.mainAgents['ai-management-governance'];
export const aiManagementGovernanceSubAgents: AIAgent[] = generatedAgents.subAgents['ai-management-governance'];

// Legacy placeholder arrays (for backward compatibility)
export const accountingFinanceSubAgents: AIAgent[] = financeAccountingSubAgents;
export const analysisInsightsPerformanceSubAgents: AIAgent[] = [];
export const customerInsightsAnalyticsPlaceholder: AIAgent[] = [];
export const mainAgents: AIAgent[] = [];

// ============================================
// ALL AGENTS CONSOLIDATED
// ============================================
export const allSubAgents: AIAgent[] = [
  ...cxAgents,
  ...salesAgents,
  ...marketingAgents,
  ...ciaAgents,
  ...operationsManagementSubAgents,
  ...financeAccountingSubAgents,
  ...technologyEngineeringSubAgents,
  ...humanResourcesSubAgents,
  ...legalComplianceSubAgents,
  ...dataIntelligenceSubAgents,
  ...productManagementSubAgents,
  ...securityRiskSubAgents,
  ...researchDevelopmentSubAgents,
  ...administrativeSubAgents,
  ...tradingInvestmentsSubAgents,
  ...realEstatePropertySubAgents,
  ...insuranceRiskSubAgents,
  ...healthcareMedicalSubAgents,
  ...manufacturingProductionSubAgents,
  ...transportationLogisticsSubAgents,
  ...governmentPublicSectorSubAgents,
  ...supplyChainLogisticsSubAgents,
  ...aiManagementGovernanceSubAgents,
];

export const allMainAgents: AIAgent[] = [
  ...customerExperienceMainAgents,
  ...salesRevenueMainAgents,
  ...marketingGrowthMainAgents,
  ...operationsManagementMainAgents,
  ...financeAccountingMainAgents,
  ...technologyEngineeringMainAgents,
  ...humanResourcesMainAgents,
  ...legalComplianceMainAgents,
  ...dataIntelligenceMainAgents,
  ...productManagementMainAgents,
  ...securityRiskMainAgents,
  ...researchDevelopmentMainAgents,
  ...administrativeMainAgents,
  ...tradingInvestmentsMainAgents,
  ...realEstatePropertyMainAgents,
  ...insuranceRiskMainAgents,
  ...healthcareMedicalMainAgents,
  ...manufacturingProductionMainAgents,
  ...transportationLogisticsMainAgents,
  ...governmentPublicSectorMainAgents,
  ...supplyChainLogisticsMainAgents,
  ...aiManagementGovernanceMainAgents,
];

// Privacy Layer Agents (9 total)
export const privacyAgents: AIAgent[] = allPrivacyAgents;

// Auto-enhanced with all capabilities
export const allAgents: AIAgent[] = enhanceAllAIAgents([...allMainAgents, ...allSubAgents, ...privacyAgents]);

// ============================================
// AGENT CATEGORIES - ALL 22 DEPARTMENTS
// ============================================
export const agentCategories = [
  { id: 'customer-experience', label: 'Customer Experience AI', icon: MessagesSquare, color: '#007AFF' },
  { id: 'sales-revenue', label: 'Sales & Revenue AI', icon: Target, color: '#34C759' },
  { id: 'marketing-growth', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55' },
  { id: 'operations-management', label: 'Operations & Management AI', icon: Settings, color: '#5856D6' },
  { id: 'finance-accounting', label: 'Finance & Accounting AI', icon: Crown, color: '#FFD700' },
  { id: 'technology-engineering', label: 'Technology & Engineering AI', icon: Zap, color: '#AF52DE' },
  { id: 'human-resources', label: 'Human Resources AI', icon: Shield, color: '#FF5252' },
  { id: 'legal-compliance', label: 'Legal & Compliance AI', icon: ChartBarBig, color: '#6366F1' },
  { id: 'data-intelligence', label: 'Data & Intelligence AI', icon: Zap, color: '#AF52DE' },
  { id: 'product-management', label: 'Product Management AI', icon: Crown, color: '#FFD700' },
  { id: 'security-risk', label: 'Security & Risk AI', icon: Shield, color: '#FF5252' },
  { id: 'research-development', label: 'Research & Development AI', icon: ChartBarBig, color: '#6366F1' },
  { id: 'administrative', label: 'Administrative AI', icon: Settings, color: '#5856D6' },
  { id: 'trading-investments', label: 'Trading & Investments AI', icon: Target, color: '#34C759' },
  { id: 'real-estate-property', label: 'Real Estate & Property AI', icon: Crown, color: '#FFD700' },
  { id: 'insurance-risk', label: 'Insurance & Risk AI', icon: Shield, color: '#FF5252' },
  { id: 'healthcare-medical', label: 'Healthcare & Medical AI', icon: ChartBarBig, color: '#6366F1' },
  { id: 'manufacturing-production', label: 'Manufacturing & Production AI', icon: Zap, color: '#AF52DE' },
  { id: 'transportation-logistics', label: 'Transportation & Logistics AI', icon: Settings, color: '#5856D6' },
  { id: 'government-public-sector', label: 'Government & Public Sector AI', icon: Crown, color: '#FFD700' },
  { id: 'supply-chain-logistics', label: 'Supply Chain & Logistics AI', icon: Target, color: '#34C759' },
  { id: 'ai-management-governance', label: 'AI Management & Governance AI', icon: Shield, color: '#FF5252' },
  { id: 'privacy-security', label: 'Privacy & Security AI', icon: Shield, color: '#FF5252' },
];

// ============================================
// NAVIGATION HIERARCHY - ALL 22 DEPARTMENTS
// ============================================
export const navigationHierarchy = {
  'customer-experience': {
    id: 'customer-experience',
    label: 'Customer Experience AI',
    icon: MessagesSquare,
    color: '#007AFF',
    path: '/ai-agent/customer-experience-agents',
    mainAgents: customerExperienceMainAgents,
    subAgents: cxAgents,
    description: 'AI agents for customer support, experience, retention, and loyalty',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'sales-revenue': {
    id: 'sales-revenue',
    label: 'Sales & Revenue AI',
    icon: Target,
    color: '#34C759',
    path: '/ai-agent/sales-agents',
    mainAgents: salesRevenueMainAgents,
    subAgents: salesAgents,
    description: 'AI agents for sales operations, revenue generation, and business development',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'marketing-growth': {
    id: 'marketing-growth',
    label: 'Marketing & Growth AI',
    icon: Megaphone,
    color: '#FF2D55',
    path: '/ai-agent/marketing-agents',
    mainAgents: marketingGrowthMainAgents,
    subAgents: marketingGrowthSubAgents,
    description: 'AI agents for marketing campaigns, content creation, and growth strategies',
    stats: { main: 15, sub: 45, total: 60 }
  },
  'operations-management': {
    id: 'operations-management',
    label: 'Operations & Management AI',
    icon: Settings,
    color: '#5856D6',
    path: '/ai-agent/operations-agents',
    mainAgents: operationsManagementMainAgents,
    subAgents: operationsManagementSubAgents,
    description: 'AI agents for operational efficiency, workflow automation, and process optimization',
    stats: { main: 13, sub: 39, total: 52 }
  },
  'finance-accounting': {
    id: 'finance-accounting',
    label: 'Finance & Accounting AI',
    icon: Crown,
    color: '#FFD700',
    path: '/ai-agent/accounting-agents',
    mainAgents: financeAccountingMainAgents,
    subAgents: financeAccountingSubAgents,
    description: 'AI agents for financial analysis, accounting operations, and treasury management',
    stats: { main: 13, sub: 39, total: 52 }
  },
  'technology-engineering': {
    id: 'technology-engineering',
    label: 'Technology & Engineering AI',
    icon: Zap,
    color: '#AF52DE',
    path: '/ai-agent/tech',
    mainAgents: technologyEngineeringMainAgents,
    subAgents: technologyEngineeringSubAgents,
    description: 'AI agents for software development, infrastructure, and technology operations',
    stats: { main: 16, sub: 48, total: 64 }
  },
  'human-resources': {
    id: 'human-resources',
    label: 'Human Resources AI',
    icon: Shield,
    color: '#FF5252',
    path: '/ai-agent/hr',
    mainAgents: humanResourcesMainAgents,
    subAgents: humanResourcesSubAgents,
    description: 'AI agents for HR operations, talent management, and employee engagement',
    stats: { main: 11, sub: 33, total: 44 }
  },
  'legal-compliance': {
    id: 'legal-compliance',
    label: 'Legal & Compliance AI',
    icon: ChartBarBig,
    color: '#6366F1',
    path: '/ai-agent/legal',
    mainAgents: legalComplianceMainAgents,
    subAgents: legalComplianceSubAgents,
    description: 'AI agents for legal research, compliance management, and contract analysis',
    stats: { main: 10, sub: 30, total: 40 }
  },
  'data-intelligence': {
    id: 'data-intelligence',
    label: 'Data & Intelligence AI',
    icon: Zap,
    color: '#AF52DE',
    path: '/ai-agent/data-intelligence-agents',
    mainAgents: dataIntelligenceMainAgents,
    subAgents: dataIntelligenceSubAgents,
    description: 'AI agents for data science, analytics, and business intelligence',
    stats: { main: 13, sub: 39, total: 52 }
  },
  'product-management': {
    id: 'product-management',
    label: 'Product Management AI',
    icon: Crown,
    color: '#FFD700',
    path: '/ai-agent/product',
    mainAgents: productManagementMainAgents,
    subAgents: productManagementSubAgents,
    description: 'AI agents for product strategy, UX research, and product development',
    stats: { main: 10, sub: 30, total: 40 }
  },
  'security-risk': {
    id: 'security-risk',
    label: 'Security & Risk AI',
    icon: Shield,
    color: '#FF5252',
    path: '/ai-agent/security',
    mainAgents: securityRiskMainAgents,
    subAgents: securityRiskSubAgents,
    description: 'AI agents for cybersecurity, risk management, and incident response',
    stats: { main: 12, sub: 36, total: 48 }
  },
  'research-development': {
    id: 'research-development',
    label: 'Research & Development AI',
    icon: ChartBarBig,
    color: '#6366F1',
    path: '/ai-agent/research',
    mainAgents: researchDevelopmentMainAgents,
    subAgents: researchDevelopmentSubAgents,
    description: 'AI agents for research innovation, prototyping, and patent analysis',
    stats: { main: 9, sub: 27, total: 36 }
  },
  'administrative': {
    id: 'administrative',
    label: 'Administrative AI',
    icon: Settings,
    color: '#5856D6',
    path: '/ai-agent/administrative',
    mainAgents: administrativeMainAgents,
    subAgents: administrativeSubAgents,
    description: 'AI agents for administrative operations, facilities management, and office coordination',
    stats: { main: 9, sub: 27, total: 36 }
  },
  'trading-investments': {
    id: 'trading-investments',
    label: 'Trading & Investments AI',
    icon: Target,
    color: '#34C759',
    path: '/ai-agent/trading',
    mainAgents: tradingInvestmentsMainAgents,
    subAgents: tradingInvestmentsSubAgents,
    description: 'AI agents for trading operations, portfolio management, and investment analysis',
    stats: { main: 18, sub: 54, total: 72 }
  },
  'real-estate-property': {
    id: 'real-estate-property',
    label: 'Real Estate & Property AI',
    icon: Crown,
    color: '#FFD700',
    path: '/ai-agent/realestate',
    mainAgents: realEstatePropertyMainAgents,
    subAgents: realEstatePropertySubAgents,
    description: 'AI agents for property management, real estate development, and leasing operations',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'insurance-risk': {
    id: 'insurance-risk',
    label: 'Insurance & Risk AI',
    icon: Shield,
    color: '#FF5252',
    path: '/ai-agent/insurance',
    mainAgents: insuranceRiskMainAgents,
    subAgents: insuranceRiskSubAgents,
    description: 'AI agents for underwriting, claims processing, and risk assessment',
    stats: { main: 16, sub: 48, total: 64 }
  },
  'healthcare-medical': {
    id: 'healthcare-medical',
    label: 'Healthcare & Medical AI',
    icon: ChartBarBig,
    color: '#6366F1',
    path: '/ai-agent/healthcare',
    mainAgents: healthcareMedicalMainAgents,
    subAgents: healthcareMedicalSubAgents,
    description: 'AI agents for patient care, medical billing, and healthcare operations',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'manufacturing-production': {
    id: 'manufacturing-production',
    label: 'Manufacturing & Production AI',
    icon: Zap,
    color: '#AF52DE',
    path: '/ai-agent/manufacturing',
    mainAgents: manufacturingProductionMainAgents,
    subAgents: manufacturingProductionSubAgents,
    description: 'AI agents for production planning, quality control, and manufacturing operations',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'transportation-logistics': {
    id: 'transportation-logistics',
    label: 'Transportation & Logistics AI',
    icon: Settings,
    color: '#5856D6',
    path: '/ai-agent/transportation',
    mainAgents: transportationLogisticsMainAgents,
    subAgents: transportationLogisticsSubAgents,
    description: 'AI agents for fleet management, route optimization, and logistics coordination',
    stats: { main: 14, sub: 42, total: 56 }
  },
  'government-public-sector': {
    id: 'government-public-sector',
    label: 'Government & Public Sector AI',
    icon: Crown,
    color: '#FFD700',
    path: '/ai-agent/government',
    mainAgents: governmentPublicSectorMainAgents,
    subAgents: governmentPublicSectorSubAgents,
    description: 'AI agents for policy management, regulatory compliance, and public administration',
    stats: { main: 12, sub: 36, total: 48 }
  },
  'supply-chain-logistics': {
    id: 'supply-chain-logistics',
    label: 'Supply Chain & Logistics AI',
    icon: Target,
    color: '#34C759',
    path: '/ai-agent/supply-chain',
    mainAgents: supplyChainLogisticsMainAgents,
    subAgents: supplyChainLogisticsSubAgents,
    description: 'AI agents for supply chain operations, procurement, and inventory management',
    stats: { main: 10, sub: 30, total: 40 }
  },
  'ai-management-governance': {
    id: 'ai-management-governance',
    label: 'AI Management & Governance AI',
    icon: Shield,
    color: '#FF5252',
    path: '/ai-agent/executive',
    mainAgents: aiManagementGovernanceMainAgents,
    subAgents: aiManagementGovernanceSubAgents,
    description: 'AI agents for automation governance, process excellence, and AI operations',
    stats: { main: 6, sub: 18, total: 24 }
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getAgentById = (agentId: string): AIAgent | undefined => {
  return allAgents.find(agent => agent.id === agentId);
};

export const getSubAgentsByCategory = (category: string): AIAgent[] => {
  return allSubAgents.filter(agent => agent.category === category);
};

export const getMainAgentByCategory = (category: string): AIAgent | undefined => {
  return mainAgents.find(agent => agent.category === category);
};

export const getNavigationHierarchy = (categoryId: string) => {
  return navigationHierarchy[categoryId as keyof typeof navigationHierarchy];
};

export const getAllNavigationHierarchies = () => {
  return Object.values(navigationHierarchy);
};

export const getAgentsByConsultingCapability = (expertise: string): AIAgent[] => {
  return allAgents.filter(agent =>
    agent.consulting?.canBeConsulted &&
    agent.consulting?.expertiseAreas?.some(area =>
      area.toLowerCase().includes(expertise.toLowerCase())
    )
  );
};

export const getAgentHierarchy = (agentId: string): { mainAgent: AIAgent | undefined; subAgents: AIAgent[]; peers: AIAgent[] } => {
  const agent = getAgentById(agentId);
  if (!agent) return { mainAgent: undefined, subAgents: [], peers: [] };

  // For sub-agents, find their main agent and siblings
  const parentId = agent.hierarchy?.parentId;
  if (parentId) {
    const mainAgent = mainAgents.find(main => main.id === parentId);
    const siblingSubs = mainAgent
      ? allSubAgents.filter(sub => sub.hierarchy?.parentId === parentId && sub.id !== agentId)
      : [];
    return {
      mainAgent,
      subAgents: mainAgent
        ? allSubAgents.filter(sub => sub.hierarchy?.parentId === parentId)
        : [],
      peers: siblingSubs,
    };
  }

  // For main agents, return peers and their own sub-agents
  return {
    mainAgent: agent,
    subAgents: allSubAgents.filter(sub => sub.hierarchy?.parentId === agentId),
    peers: mainAgents.filter(m => m.id !== agentId),
  };
};

export const getA2AReadyAgents = (): AIAgent[] => {
  return allAgents.filter(agent =>
    agent.a2aCapabilities?.canInitiateConsultation ||
    agent.a2aCapabilities?.canRespondToConsultation
  );
};

export const getAgentsWithConsultingCapability = (): AIAgent[] => {
  return allAgents.filter(agent => agent.consulting?.canConsult || agent.consulting?.canBeConsulted);
};

// ============================================
// PRIVACY LAYER HELPERS
// ============================================
export const getPrivacyAgentsByGate = (gate: 'input' | 'agent' | 'output'): AIAgent[] => {
  const gateMap: Record<string, string[]> = {
    input: ['privacy-data-classifier','privacy-purpose-validator','privacy-access-controller'],
    agent: ['privacy-data-masker','privacy-context-filter','privacy-permission-enforcer'],
    output: ['privacy-output-sanitizer','privacy-compliance-checker','privacy-audit-logger'],
  };
  return privacyAgents.filter(agent => gateMap[gate]?.includes(agent.id));
};

export const getAllPrivacyAgents = (): AIAgent[] => privacyAgents;

// ============================================
// STATS
// ============================================
export const AI_WORKFORCE_STATS = {
  totalAgents: allAgents.length,
  mainAgents: mainAgents.length,
  subAgents: allSubAgents.length,
  privacyAgents: privacyAgents.length,
  categories: agentCategories.length,
};

// getAllAgents as function returning all agents (for compatibility)
export const getAllAgents = (): AIAgent[] => allAgents;

// Default export
export default {
  allAgents,
  allSubAgents,
  allMainAgents,
  mainAgents,
  privacyAgents,
  agentCategories,
  navigationHierarchy,
  getAgentById,
  getSubAgentsByCategory,
  getMainAgentByCategory,
  getAgentsByConsultingCapability,
  getAgentHierarchy,
  getA2AReadyAgents,
  getAgentsWithConsultingCapability,
  getPrivacyAgentsByGate,
  getAllPrivacyAgents,
  getNavigationHierarchy,
  getAllNavigationHierarchies,
  AI_WORKFORCE_STATS,
};
