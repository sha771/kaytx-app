const fs = require('fs');
const path = require('path');

// Read the generated agents file
const generatedAgentsPath = path.join(__dirname, 'generated-agents.ts');
const generatedAgentsContent = fs.readFileSync(generatedAgentsPath, 'utf8');

// Read the completeAIWorkforce file
const workforcePath = path.join(__dirname, '..', 'constants', 'completeAIWorkforce_1108.ts');
let workforceContent = fs.readFileSync(workforcePath, 'utf8');

// Find the position to insert new agents (before the allDepartmentAgents array)
const allDepartmentAgentsIndex = workforceContent.indexOf('const allDepartmentAgents = [');

if (allDepartmentAgentsIndex === -1) {
  console.error('Could not find allDepartmentAgents array');
  process.exit(1);
}

// Insert the generated agents before allDepartmentAgents
const beforeAllDepartmentAgents = workforceContent.substring(0, allDepartmentAgentsIndex);
const afterAllDepartmentAgents = workforceContent.substring(allDepartmentAgentsIndex);

// Update the allDepartmentAgents array to include new agents
const updatedAllDepartmentAgents = afterAllDepartmentAgents.replace(
  'const allDepartmentAgents = [',
  `const allDepartmentAgents = [
  ...department1NewAgents,
  ...department2NewAgents,
  ...department3NewAgents,
  ...department4NewAgents,
  ...department5NewAgents,
  ...department6NewAgents,
  ...department7NewAgents,
  ...department8NewAgents,
  ...department9NewAgents,
  ...department10NewAgents,
  ...department11NewAgents,
  ...department12NewAgents,
  ...department13NewAgents,
  ...department14NewAgents,
  ...department15NewAgents,
  ...department16NewAgents,
  ...department17NewAgents,
  ...department18NewAgents,
  ...department19NewAgents,
  ...department20NewAgents,
  ...department21NewAgents,
  ...department22NewAgents,
`
);

// Combine the content
const newContent = beforeAllDepartmentAgents + generatedAgentsContent + '\n' + updatedAllDepartmentAgents;

// Update the exports to include new agent arrays
const updatedExports = newContent.replace(
  'export const allCustomerExperienceAgents = department1Agents;',
  'export const allCustomerExperienceAgents = [...department1Agents, ...department1NewAgents];'
).replace(
  'export const allSalesRevenueAgents = department2Agents;',
  'export const allSalesRevenueAgents = [...department2Agents, ...department2NewAgents];'
).replace(
  'export const allMarketingGrowthAgents = department3Agents;',
  'export const allMarketingGrowthAgents = [...department3Agents, ...department3NewAgents];'
).replace(
  'export const allOperationsManagementAgents = department4Agents;',
  'export const allOperationsManagementAgents = [...department4Agents, ...department4NewAgents];'
).replace(
  'export const allFinanceAccountingAgents = department5Agents;',
  'export const allFinanceAccountingAgents = [...department5Agents, ...department5NewAgents];'
).replace(
  'export const allTechnologyEngineeringAgents = department6Agents;',
  'export const allTechnologyEngineeringAgents = [...department6Agents, ...department6NewAgents];'
).replace(
  'export const allHumanResourcesAgents = department7Agents;',
  'export const allHumanResourcesAgents = [...department7Agents, ...department7NewAgents];'
).replace(
  'export const allLegalComplianceAgents = department8Agents;',
  'export const allLegalComplianceAgents = [...department8Agents, ...department8NewAgents];'
).replace(
  'export const allDataIntelligenceAgents = department9Agents;',
  'export const allDataIntelligenceAgents = [...department9Agents, ...department9NewAgents];'
).replace(
  'export const allProductManagementAgents = department10Agents;',
  'export const allProductManagementAgents = [...department10Agents, ...department10NewAgents];'
).replace(
  'export const allSecurityRiskAgents = department11Agents;',
  'export const allSecurityRiskAgents = [...department11Agents, ...department11NewAgents];'
).replace(
  'export const allResearchDevelopmentAgents = department12Agents;',
  'export const allResearchDevelopmentAgents = [...department12Agents, ...department12NewAgents];'
).replace(
  'export const allAdministrativeAgents = department13Agents;',
  'export const allAdministrativeAgents = [...department13Agents, ...department13NewAgents];'
).replace(
  'export const allTradingInvestmentsAgents = department14Agents;',
  'export const allTradingInvestmentsAgents = [...department14Agents, ...department14NewAgents];'
).replace(
  'export const allRealEstatePropertyAgents = department15Agents;',
  'export const allRealEstatePropertyAgents = [...department15Agents, ...department15NewAgents];'
).replace(
  'export const allInsuranceRiskAgents = department16Agents;',
  'export const allInsuranceRiskAgents = [...department16Agents, ...department16NewAgents];'
).replace(
  'export const allHealthcareMedicalAgents = department17Agents;',
  'export const allHealthcareMedicalAgents = [...department17Agents, ...department17NewAgents];'
).replace(
  'export const allManufacturingProductionAgents = department18Agents;',
  'export const allManufacturingProductionAgents = [...department18Agents, ...department18NewAgents];'
).replace(
  'export const allTransportationLogisticsAgents = department19Agents;',
  'export const allTransportationLogisticsAgents = [...department19Agents, ...department19NewAgents];'
).replace(
  'export const allGovernmentPublicSectorAgents = department20Agents;',
  'export const allGovernmentPublicSectorAgents = [...department20Agents, ...department20NewAgents];'
).replace(
  'export const allSupplyChainLogisticsAgents = department21Agents;',
  'export const allSupplyChainLogisticsAgents = [...department21Agents, ...department21NewAgents];'
).replace(
  'export const allAIManagementGovernanceAgents = department22Agents;',
  'export const allAIManagementGovernanceAgents = [...department22Agents, ...department22NewAgents];'
);

// Write the updated content back
fs.writeFileSync(workforcePath, updatedExports);
console.log('Successfully integrated 1094 new agents into completeAIWorkforce_1108.ts');
console.log('Updated department exports to include new agents');
