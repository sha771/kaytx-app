/**
 * AI Agent Hierarchy - Main Entry Point
 * Consolidated exports for all AI Agent functionality
 */

import type { AIEmployee } from './aiEmployeesEnhanced';
import { enhanceAllAIAgents } from './utils/agent-capability-enhancer';
import {
  Settings, Zap, MessagesSquare, Target, Megaphone, Crown, Shield,
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
export { getPrivacyAgentById } from './privacy-agents';

// Define AIAgent as alias to AIEmployee
export type AIAgent = AIEmployee;
export type AIAgentDefinition = AIEmployee;

// ============================================
// AGENT ARRAYS (imported from aiEmployeesEnhanced)
// ============================================
export {
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
} from './aiEmployeesEnhanced';

// ============================================
// PLACEHOLDER AGENT ARRAYS (to satisfy imports from aiAgentHierarchy_ext)
// ============================================
export const accountingFinanceSubAgents: AIAgent[] = [];
export const operationsManagementSubAgents: AIAgent[] = [];
export const dataIntelligenceSubAgents: AIAgent[] = [];
export const analysisInsightsPerformanceSubAgents: AIAgent[] = [];
export const mainAgents: AIAgent[] = [];

// ============================================
// ALL AGENTS CONSOLIDATED
// ============================================
import {
  customerExperienceSubAgents as cxAgents,
  salesRevenueSubAgents as salesAgents,
  marketingGrowthSubAgents as marketingAgents,
} from './aiEmployeesEnhanced';

export const allSubAgents: AIAgent[] = [
  ...cxAgents,
  ...salesAgents,
  ...marketingAgents,
  ...operationsManagementSubAgents,
  ...dataIntelligenceSubAgents,
  ...analysisInsightsPerformanceSubAgents,
];

export const allMainAgents: AIAgent[] = mainAgents;

// Privacy Layer Agents (9 total)
export const privacyAgents: AIAgent[] = allPrivacyAgents;

// Auto-enhanced with all capabilities
export const allAgents: AIAgent[] = enhanceAllAIAgents([...allMainAgents, ...allSubAgents, ...privacyAgents]);

// ============================================
// AGENT CATEGORIES
// ============================================
export const agentCategories = [
  { id: 'customer-experience', label: 'Customer Experience AI', icon: MessagesSquare, color: '#007AFF' },
  { id: 'sales-revenue', label: 'Sales & Revenue AI', icon: Target, color: '#34C759' },
  { id: 'marketing-growth', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55' },
  { id: 'operations-management', label: 'Operations & Management AI', icon: Settings, color: '#5856D6' },
  { id: 'data-intelligence', label: 'Data & Intelligence AI', icon: Zap, color: '#AF52DE' },
  { id: 'analysis-insights-performance', label: 'Analysis, Insights & Performance AI', icon: Crown, color: '#FFD700' },
  { id: 'privacy-security', label: 'Privacy & Security AI', icon: Shield, color: '#FF5252' },
];

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
  getAgentById,
  getSubAgentsByCategory,
  getMainAgentByCategory,
  getAgentsByConsultingCapability,
  getAgentHierarchy,
  getA2AReadyAgents,
  getAgentsWithConsultingCapability,
  getPrivacyAgentsByGate,
  getAllPrivacyAgents,
  AI_WORKFORCE_STATS,
};
