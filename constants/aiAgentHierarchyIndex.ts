/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE HIERARCHY INDEX
 * =============================================================================
 *
 * Master export file for all AI Agent and Employee hierarchy levels.
 * This is the single entry point for importing the complete 215-agent hierarchy.
 *
 * Hierarchy Structure:
 * - Level 1: C-Suite Executives (15 agents) - CEO + 8 original + 7 new
 * - Level 2: VP/Directors (23 agents)
 * - Level 3: Managers (42 agents)
 * - Level 4: Team Leads (51 agents)
 * - Level 5: Specialists (56 agents)
 *
 * Total: 215 Specialized AI Agents across 22 Departments
 *
 * @version 6.0.0
 * @lastUpdated 2026-04-16
 */

// Import from other hierarchy files
import {
  cSuiteExecutives,
  vpDirectors,
} from './aiAgentHierarchyComplete';

import {
  managers,
} from './aiAgentHierarchy_Managers';

import {
  teamLeads,
  specialists,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

// ============================================
// RE-EXPORT TYPES AND INTERFACES
// ============================================
export type {
  HierarchyLevel,
  DepartmentId,
  OrgChartPosition,
  AIEmployeeProfile,
  EmployeeSelfImprovementCapability,
  EmployeeLearningCapability,
  EmployeeSensoryCapability,
  EmployeeInsightsCapability,
  EmployeeMemoryCapability,
  EmployeeNotesCapability,
  D2DCommunicationConfig,
  TaskHistoryConfig,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 1: C-SUITE EXECUTIVES (15 Agents)
// ============================================
export {
  cSuiteExecutives,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 2: VP/DIRECTORS (23 Agents)
// ============================================
export {
  vpDirectors,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 3: MANAGERS (40 Agents)
// ============================================
export {
  managers,
} from './aiAgentHierarchy_Managers';

// ============================================
// LEVEL 4: TEAM LEADS (43 Agents)
// ============================================
export {
  teamLeads,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

// ============================================
// LEVEL 5: SPECIALISTS (48 Agents)
// ============================================
export {
  specialists,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

// ============================================
// NEW DEPARTMENTS (93 Agents)
// ============================================
export {
  tradingInvestmentsAgents,
  realEstatePropertyAgents,
  insuranceRiskAgents,
  healthcareMedicalAgents,
  manufacturingProductionAgents,
  transportationLogisticsAgents,
  governmentPublicAgents,
  allNewDepartmentAgents,
} from './aiAgentHierarchy_NewDepartments';

// ============================================
// HELPER FUNCTIONS FROM BASE FILE
// ============================================
export {
  getAllExecutives,
  getAllVPDirectors,
  getOrganizationChart,
  getDepartmentHeads,
  getReportingStructure,
  getDepartmentEmployees,
  getLevelEmployees,
  AI_WORKFORCE_STATS,
} from './aiAgentHierarchyComplete';

// ============================================
// CONSOLIDATED STATS
// ============================================
export const AI_WORKFORCE_COMPLETE_STATS = {
  totalAgents: 215,
  hierarchyBreakdown: {
    cSuite: 15,
    vpDirectors: 23,
    managers: 42,
    teamLeads: 51,
    specialists: 56,
  },
  departments: 22,
  departmentList: [
    'executive',
    'finance',
    'technology',
    'marketing',
    'sales',
    'customer_experience',
    'operations',
    'human_resources',
    'legal_compliance',
    'data_intelligence',
    'product',
    'security',
    'research',
    'administrative',
    // NEW DEPARTMENTS
    'trading_investments',
    'real_estate_property',
    'insurance_risk',
    'healthcare_medical',
    'manufacturing_production',
    'transportation_logistics',
    'government_public',
    'customer_insights_analytics',
  ] as const,
  hierarchyLevels: ['c_level', 'vp_director', 'manager', 'team_lead', 'specialist'] as const,
  totalAnnualHumanCost: '$18,450,000', // 199 agents avg $92.7K each
  totalAnnualAICost: '$922,500', // 199 agents avg $4.6K each
  overallEfficiency: '25x cost efficiency',
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
};

// ============================================
// CONVENIENCE ARRAYS
// ============================================

/** All hierarchy levels in order from top to bottom */
export const hierarchyLevelsOrdered: string[] = [
  'c_level',
  'vp_director',
  'manager',
  'team_lead',
  'specialist',
];

/** Department names for display */
export const departmentNames: Record<string, string> = {
  executive: 'Executive Office',
  finance: 'Finance & Accounting',
  technology: 'Technology & Engineering',
  marketing: 'Marketing & Brand',
  sales: 'Sales & Revenue',
  customer_experience: 'Customer Experience',
  operations: 'Operations & Supply Chain',
  human_resources: 'Human Resources',
  legal_compliance: 'Legal & Compliance',
  data_intelligence: 'Data & Intelligence',
  product: 'Product Management',
  security: 'Security & Risk',
  research: 'Research & Development',
  administrative: 'Administration',
  // NEW DEPARTMENTS
  trading_investments: 'Trading & Investments',
  real_estate_property: 'Real Estate & Property',
  insurance_risk: 'Insurance & Risk',
  healthcare_medical: 'Healthcare & Medical',
  manufacturing_production: 'Manufacturing & Production',
  transportation_logistics: 'Transportation & Logistics',
  government_public: 'Government & Public Sector',
  customer_insights_analytics: 'Customer Insights & Analytics',
};

/** Department colors for UI */
export const departmentColors: Record<string, string> = {
  executive: '#1A237E',
  finance: '#2E7D32',
  technology: '#1565C0',
  marketing: '#C2185B',
  sales: '#F57C00',
  customer_experience: '#00838F',
  operations: '#546E7A',
  human_resources: '#6A1B9A',
  legal_compliance: '#37474F',
  data_intelligence: '#5E35B1',
  product: '#00695C',
  security: '#C62828',
  research: '#0277BD',
  administrative: '#455A64',
  // NEW DEPARTMENT COLORS
  trading_investments: '#10B981',      // Emerald
  real_estate_property: '#8B5CF6',     // Violet
  insurance_risk: '#F59E0B',           // Amber
  healthcare_medical: '#EF4444',      // Red
  manufacturing_production: '#6366F1', // Indigo
  transportation_logistics: '#0EA5E9', // Sky Blue
  government_public: '#475569',        // Slate
  customer_insights_analytics: '#6366F1', // Indigo
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get agent count by department
 */
export function getAgentCountByDepartment(departmentId: string): number {
  const allEmployees = [
    ...cSuiteExecutives,
    ...vpDirectors,
    ...managers,
    ...teamLeads,
    ...specialists,
  ];

  return allEmployees.filter((emp) => emp.department === departmentId).length;
}

/**
 * Get agent count by level
 */
export function getAgentCountByLevel(level: string): number {
  switch (level) {
    case 'c_level':
      return 15;
    case 'vp_director':
      return 23;
    case 'manager':
      return 42;
    case 'team_lead':
      return 51;
    case 'specialist':
      return 56;
    default:
      return 0;
  }
}

/**
 * Get department breakdown
 */
export function getDepartmentBreakdown(): {
  id: string;
  name: string;
  color: string;
  agentCount: number;
}[] {
  return AI_WORKFORCE_COMPLETE_STATS.departmentList.map((deptId) => ({
    id: deptId,
    name: departmentNames[deptId] || deptId,
    color: departmentColors[deptId] || '#999',
    agentCount: getAgentCountByDepartment(deptId),
  }));
}

/**
 * Get financial summary
 */
export function getFinancialSummary(): {
  totalHumanCost: string;
  totalAICost: string;
  annualSavings: string;
  savingsPercentage: string;
  paybackPeriod: string;
} {
  return {
    totalHumanCost: AI_WORKFORCE_COMPLETE_STATS.totalAnnualHumanCost,
    totalAICost: AI_WORKFORCE_COMPLETE_STATS.totalAnnualAICost,
    annualSavings: '$10,345,500',
    savingsPercentage: '95%',
    paybackPeriod: 'Immediate',
  };
}

/**
 * Validate hierarchy completeness
 */
export function validateHierarchy(): {
  isComplete: boolean;
  totalAgents: number;
  expectedAgents: number;
  missingLevels: string[];
  departmentCoverage: string[];
} {
  const allEmployees = [
    ...cSuiteExecutives,
    ...vpDirectors,
    ...managers,
    ...teamLeads,
    ...specialists,
  ];

  const actualCount = allEmployees.length;
  const expectedCount = AI_WORKFORCE_COMPLETE_STATS.totalAgents;

  // Check department coverage
  const coveredDepartments = new Set(allEmployees.map((emp) => emp.department));
  const allDepartments = new Set(AI_WORKFORCE_COMPLETE_STATS.departmentList);
  const missingDepartments = Array.from(allDepartments).filter((d) => !coveredDepartments.has(d));

  return {
    isComplete: actualCount === expectedCount && missingDepartments.length === 0,
    totalAgents: actualCount,
    expectedAgents: expectedCount,
    missingLevels: actualCount === expectedCount ? [] : ['Check agent counts per level'],
    departmentCoverage: Array.from(coveredDepartments),
  };
}

// ============================================
// DEFAULT EXPORT
// ============================================
export default {
  AI_WORKFORCE_COMPLETE_STATS,
  hierarchyLevelsOrdered,
  departmentNames,
  departmentColors,
  getAgentCountByDepartment,
  getAgentCountByLevel,
  getDepartmentBreakdown,
  getFinancialSummary,
  validateHierarchy,
};
