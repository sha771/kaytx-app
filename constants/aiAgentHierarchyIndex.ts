/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE HIERARCHY INDEX
 * =============================================================================
 * 
 * Master export file for all AI Agent and Employee hierarchy levels.
 * This is the single entry point for importing the complete 106-agent hierarchy.
 * 
 * Hierarchy Structure:
 * - Level 1: C-Suite Executives (8 agents)
 * - Level 2: VP/Directors (14 agents)
 * - Level 3: Managers (28 agents)
 * - Level 4: Team Leads (28 agents)
 * - Level 5: Specialists (28 agents)
 * 
 * Total: 106 Specialized AI Agents across 14 Departments
 * 
 * @version 4.0.0
 * @lastUpdated 2026-03-25
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
  A2ACommunicationConfig,
  EscalationPath,
  ConsultingStyle,
  OrgChartConnection,
  FinancialComparison,
  ReportingStructure,
  WorkloadMetrics,
  OrganizationNode,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 1: C-SUITE EXECUTIVES (8 Agents)
// ============================================
export {
  cSuiteExecutives,
  ceo,
  cfo,
  cto,
  cmo,
  cco,
  coo,
  chro,
  clo,
  ciso,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 2: VP/DIRECTORS (14 Agents)
// ============================================
export {
  vpDirectors,
  vpFinance,
  vpAccounting,
  vpTreasury,
  controller,
  vpEngineering,
  vpInfrastructure,
  vpMarketing,
  vpBrand,
  vpGrowth,
  vpSales,
  vpSupport,
  vpCustomerSuccess,
  vpOperations,
  vpTalent,
} from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 3: MANAGERS (28 Agents)
// ============================================
export {
  managers,
  financeManager,
  accountingManager,
  treasuryManager,
  auditManager,
  engineeringManager,
  devopsManager,
  qaManager,
  dataEngineeringManager,
  marketingCampaignManager,
  brandManager,
  productMarketingManager,
  growthManager,
  salesManager,
  salesOpsManager,
  salesEnablementManager,
  supportManager,
  csManager,
  onboardingManager,
  opsManager,
  procurementManager,
  logisticsManager,
  recruitingManager,
  hrOpsManager,
  analyticsManager,
  biManager,
  socManager,
} from './aiAgentHierarchy_Managers';

// ============================================
// LEVEL 4: TEAM LEADS (28 Agents)
// ============================================
export {
  teamLeads,
  fpAndALead,
  apLead,
  arLead,
  glLead,
  auditLead,
  frontendLead,
  backendLead,
  sreLead,
  automationLead,
  pipelineLead,
  digitalLead,
  socialLead,
  creativeLead,
  contentLead,
  acquisitionLead,
  aeLead,
  sdrLead,
  crmLead,
  trainingLead,
  tier2Lead,
  csLead,
  implementationLead,
  retentionLead,
  processLead,
  sourcingLead,
  warehouseLead,
  screeningLead,
  payrollLead,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

// ============================================
// LEVEL 5: SPECIALISTS (28 Agents)
// ============================================
export {
  specialists,
  budgetAnalyst,
  forecastingSpecialist,
  taxSpecialist,
  complianceSpecialist,
  treasurySpecialist,
  frontendDev,
  backendDev,
  sreEngineer,
  dataEngineer,
  qaAutomationEngineer,
  seoSpecialist,
  contentCreator,
  designer,
  writer,
  channelSpecialist,
  accountExecutive,
  sdr,
  salesforceAdmin,
  enablementContentDev,
  techSupportSpecialist,
  csSpecialist,
  implementationSpecialist,
  retentionSpecialist,
  processAnalyst,
  buyer,
  inventorySpecialist,
  recruiter,
  payrollSpecialist,
} from './aiAgentHierarchy_TeamLeadsSpecialists';

// ============================================
// HELPER FUNCTIONS FROM BASE FILE
// ============================================
export {
  getAllExecutives,
  getAllVPDirectors,
  getAllManagers,
  getAllTeamLeads,
  getAllSpecialists,
  getOrganizationChart,
  getReportingStructure,
  getAllEmployees,
  getEmployeesByDepartment,
  getEmployeesByLevel,
  findEmployeeById,
  getChainOfCommand,
  canConsultWith,
  getA2AConsultationPath,
  AI_WORKFORCE_STATS,
} from './aiAgentHierarchyComplete';

// ============================================
// CONSOLIDATED STATS
// ============================================
export const AI_WORKFORCE_COMPLETE_STATS = {
  totalAgents: 106,
  hierarchyBreakdown: {
    cSuite: 8,
    vpDirectors: 14,
    managers: 28,
    teamLeads: 28,
    specialists: 28,
  },
  departments: 14,
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
  ] as const,
  hierarchyLevels: ['c_level', 'vp_director', 'manager', 'team_lead', 'specialist'] as const,
  totalAnnualHumanCost: '$10,890,000',
  totalAnnualAICost: '$544,500',
  overallEfficiency: '20x cost efficiency',
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
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get agent count by department
 */
export function getAgentCountByDepartment(departmentId: string): number {
  const allEmployees = [
    ...(cSuiteExecutives || []),
    ...(vpDirectors || []),
    ...(managers || []),
    ...(teamLeads || []),
    ...(specialists || []),
  ];
  
  return allEmployees.filter((emp: AIEmployeeProfile) => emp.department === departmentId).length;
}

/**
 * Get agent count by level
 */
export function getAgentCountByLevel(level: string): number {
  switch (level) {
    case 'c_level':
      return 8;
    case 'vp_director':
      return 14;
    case 'manager':
      return 28;
    case 'team_lead':
      return 28;
    case 'specialist':
      return 28;
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
    ...(cSuiteExecutives || []),
    ...(vpDirectors || []),
    ...(managers || []),
    ...(teamLeads || []),
    ...(specialists || []),
  ];

  const actualCount = allEmployees.length;
  const expectedCount = AI_WORKFORCE_COMPLETE_STATS.totalAgents;

  // Check department coverage
  const coveredDepartments = new Set(allEmployees.map((emp: AIEmployeeProfile) => emp.department));
  const allDepartments = new Set(AI_WORKFORCE_COMPLETE_STATS.departmentList);
  const missingDepartments = [...allDepartments].filter((d) => !coveredDepartments.has(d));

  return {
    isComplete: actualCount === expectedCount && missingDepartments.length === 0,
    totalAgents: actualCount,
    expectedAgents: expectedCount,
    missingLevels: actualCount === expectedCount ? [] : ['Check agent counts per level'],
    departmentCoverage: [...coveredDepartments],
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
