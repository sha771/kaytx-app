
// ============================================
// ALL 2,160 AGENTS - IMPORTED FROM MASTER INDEX
// ============================================
import {
  allHierarchyAgents, cLevelAgents, vpDirectorAgents, managerAgents,
  teamLeadAgents, specialistAgents, getAgentById, getAgentByUid,
  getAgentsByDepartment, getAgentsByLevel, getDirectReports,
  getHierarchyTree, hierarchySummary, navigationHierarchy, getAllNavigationHierarchies
} from './aiAgentHierarchyIndex';

// Re-export types
export type { AIEmployeeProfile, HierarchyLevel, DepartmentId, OrgChartPosition } from './aiAgentHierarchyIndex';

// Re-export level groups
export const cSuiteExecutives = cLevelAgents;
export const vpDirectors = vpDirectorAgents;
export const managers = managerAgents;
export const teamLeads = teamLeadAgents;
export const specialists = specialistAgents;
export const completeHierarchy = allHierarchyAgents;
export const totalAgentCount = allHierarchyAgents.length;

// Department exports
export const dept_cross_department = allHierarchyAgents.filter(a => a.department === 'cross-department');
export const dept_customer_experience = allHierarchyAgents.filter(a => a.department === 'customer-experience');
export const dept_sales = allHierarchyAgents.filter(a => a.department === 'sales');
export const dept_marketing = allHierarchyAgents.filter(a => a.department === 'marketing');
export const dept_operations = allHierarchyAgents.filter(a => a.department === 'operations');
export const dept_finance = allHierarchyAgents.filter(a => a.department === 'finance');
export const dept_technology = allHierarchyAgents.filter(a => a.department === 'technology');
export const dept_human_resources = allHierarchyAgents.filter(a => a.department === 'human-resources');
export const dept_legal = allHierarchyAgents.filter(a => a.department === 'legal');
export const dept_data_intelligence = allHierarchyAgents.filter(a => a.department === 'data-intelligence');
export const dept_product = allHierarchyAgents.filter(a => a.department === 'product');
export const dept_security = allHierarchyAgents.filter(a => a.department === 'security');
export const dept_research = allHierarchyAgents.filter(a => a.department === 'research');
export const dept_administrative = allHierarchyAgents.filter(a => a.department === 'administrative');
export const dept_trading = allHierarchyAgents.filter(a => a.department === 'trading');
export const dept_real_estate = allHierarchyAgents.filter(a => a.department === 'real-estate');
export const dept_insurance = allHierarchyAgents.filter(a => a.department === 'insurance');
export const dept_healthcare = allHierarchyAgents.filter(a => a.department === 'healthcare');
export const dept_manufacturing = allHierarchyAgents.filter(a => a.department === 'manufacturing');
export const dept_transportation = allHierarchyAgents.filter(a => a.department === 'transportation');
export const dept_government = allHierarchyAgents.filter(a => a.department === 'government');
export const dept_supply_chain = allHierarchyAgents.filter(a => a.department === 'supply-chain');
export const dept_ai_governance = allHierarchyAgents.filter(a => a.department === 'ai-governance');
export const dept_banking_finance = allHierarchyAgents.filter(a => a.department === 'banking-finance');
export const dept_ecommerce = allHierarchyAgents.filter(a => a.department === 'ecommerce');
export const dept_professional_services = allHierarchyAgents.filter(a => a.department === 'professional-services');
export const dept_media_entertainment = allHierarchyAgents.filter(a => a.department === 'media-entertainment');
export const dept_gaming_esports = allHierarchyAgents.filter(a => a.department === 'gaming-esports');
export const dept_education = allHierarchyAgents.filter(a => a.department === 'education');
export const dept_retail_stores = allHierarchyAgents.filter(a => a.department === 'retail-stores');
export const dept_travel_tourism = allHierarchyAgents.filter(a => a.department === 'travel-tourism');
export const dept_energy_utilities = allHierarchyAgents.filter(a => a.department === 'energy-utilities');
export const dept_executive_leadership_strategy = allHierarchyAgents.filter(a => a.department === 'executive-leadership-strategy');
export const dept_event_management = allHierarchyAgents.filter(a => a.department === 'event-management');
export const dept_agriculture = allHierarchyAgents.filter(a => a.department === 'agriculture');
export const dept_fashion_luxury = allHierarchyAgents.filter(a => a.department === 'fashion-luxury');
export const dept_restaurants_hospitality = allHierarchyAgents.filter(a => a.department === 'restaurants-hospitality');

// Re-export functions
export { getAgentById, getAgentByUid, getAgentsByDepartment, getAgentsByLevel, getDirectReports, getHierarchyTree, getAllNavigationHierarchies };
export { hierarchySummary, navigationHierarchy };
