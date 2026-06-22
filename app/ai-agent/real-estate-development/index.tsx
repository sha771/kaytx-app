import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  // STRATEGIC REAL ESTATE INTELLIGENCE (18 agents)
  { id: 'real-estate-intelligence-hub-001', uid: 'ktx-red-001', title: 'AI Real Estate Intelligence Hub - Enterprise', route: '/ai-agent/real-estate-development/sub-agents/real-estate-intelligence-hub', color: '#1E40AF', level: 'c_level', efficiency: '96%' },
  { id: 'real-estate-development-strategy-002', uid: 'ktx-red-002', title: 'AI Development Strategy Orchestrator', route: '/ai-agent/real-estate-development/sub-agents/development-strategy-orchestrator', color: '#1E40AF', level: 'c_level', efficiency: '95%' },
  { id: 'real-estate-market-intelligence-003', uid: 'ktx-red-003', title: 'AI Market Intelligence Platform', route: '/ai-agent/real-estate-development/sub-agents/market-intelligence-platform', color: '#1E40AF', level: 'vp_director', efficiency: '94%' },
  { id: 'real-estate-investment-analytics-004', uid: 'ktx-red-004', title: 'AI Investment Analytics Engine', route: '/ai-agent/real-estate-development/sub-agents/investment-analytics-engine', color: '#1E40AF', level: 'vp_director', efficiency: '94%' },
  { id: 'real-estate-portfolio-optimizer-005', uid: 'ktx-red-005', title: 'AI Portfolio Optimization System', route: '/ai-agent/real-estate-development/sub-agents/portfolio-optimizer', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'real-estate-risk-management-006', uid: 'ktx-red-006', title: 'AI Risk Management Platform', route: '/ai-agent/real-estate-development/sub-agents/risk-management-platform', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'real-estate-capital-allocation-007', uid: 'ktx-red-007', title: 'AI Capital Allocation Optimizer', route: '/ai-agent/real-estate-development/sub-agents/capital-allocation-optimizer', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'real-estate-feasibility-intelligence-008', uid: 'ktx-red-008', title: 'AI Feasibility Intelligence Engine', route: '/ai-agent/real-estate-development/sub-agents/feasibility-intelligence', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'real-estate-asset-performance-009', uid: 'ktx-red-009', title: 'AI Asset Performance Monitor', route: '/ai-agent/real-estate-development/sub-agents/asset-performance-monitor', color: '#1E40AF', level: 'vp_director', efficiency: '91%' },
  { id: 'real-estate-development-operations-010', uid: 'ktx-red-010', title: 'AI Development Operations Center', route: '/ai-agent/real-estate-development/sub-agents/development-operations-center', color: '#1E40AF', level: 'vp_director', efficiency: '91%' },
  { id: 'real-estate-financial-modeling-011', uid: 'ktx-red-011', title: 'AI Financial Modeling Platform', route: '/ai-agent/real-estate-development/sub-agents/financial-modeling-platform', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'real-estate-construction-oversight-012', uid: 'ktx-red-012', title: 'AI Construction Oversight System', route: '/ai-agent/real-estate-development/sub-agents/construction-oversight', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'real-estate-land-acquisition-013', uid: 'ktx-red-013', title: 'AI Land Acquisition Intelligence', route: '/ai-agent/real-estate-development/sub-agents/land-acquisition-intelligence', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'real-estate-zoning-compliance-014', uid: 'ktx-red-014', title: 'AI Zoning Compliance Platform', route: '/ai-agent/real-estate-development/sub-agents/zoning-compliance-platform', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'real-estate-permitting-orchestrator-015', uid: 'ktx-red-015', title: 'AI Permitting Orchestrator', route: '/ai-agent/real-estate-development/sub-agents/permitting-orchestrator', color: '#1E40AF', level: 'vp_director', efficiency: '91%' },
  { id: 'real-estate-sustainability-016', uid: 'ktx-red-016', title: 'AI Sustainability Intelligence', route: '/ai-agent/real-estate-development/sub-agents/sustainability-intelligence', color: '#1E40AF', level: 'vp_director', efficiency: '90%' },
  { id: 'real-estate-value-engineering-017', uid: 'ktx-red-017', title: 'AI Value Engineering Platform', route: '/ai-agent/real-estate-development/sub-agents/value-engineering', color: '#1E40AF', level: 'vp_director', efficiency: '91%' },
  { id: 'real-estate-exit-strategy-018', uid: 'ktx-red-018', title: 'AI Exit Strategy Optimizer', route: '/ai-agent/real-estate-development/sub-agents/exit-strategy-optimizer', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },

  // PROPERTY DEVELOPMENT OPERATIONS (15 agents)
  { id: 'real-estate-property-development-019', uid: 'ktx-red-019', title: 'AI Property Development Manager', route: '/ai-agent/real-estate-development/sub-agents/property-development-manager', color: '#047857', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-development-coordinator-020', uid: 'ktx-red-020', title: 'AI Development Coordinator', route: '/ai-agent/real-estate-development/sub-agents/development-coordinator', color: '#047857', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-design-coordinator-021', uid: 'ktx-red-021', title: 'AI Design Coordinator', route: '/ai-agent/real-estate-development/sub-agents/design-coordinator', color: '#047857', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-construction-coordinator-022', uid: 'ktx-red-022', title: 'AI Construction Coordinator', route: '/ai-agent/real-estate-development/sub-agents/construction-coordinator', color: '#047857', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-permitting-coordinator-023', uid: 'ktx-red-023', title: 'AI Permitting Coordinator', route: '/ai-agent/real-estate-development/sub-agents/permitting-coordinator', color: '#047857', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-site-analyst-024', uid: 'ktx-red-024', title: 'AI Site Analyst', route: '/ai-agent/real-estate-development/sub-agents/site-analyst', color: '#047857', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-feasibility-analyst-025', uid: 'ktx-red-025', title: 'AI Feasibility Analyst', route: '/ai-agent/real-estate-development/sub-agents/feasibility-analyst', color: '#047857', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-market-analyst-026', uid: 'ktx-red-026', title: 'AI Market Analyst', route: '/ai-agent/real-estate-development/sub-agents/market-analyst', color: '#047857', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-closeout-manager-027', uid: 'ktx-red-027', title: 'AI Closeout Manager', route: '/ai-agent/real-estate-development/sub-agents/closeout-manager', color: '#047857', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-commissioning-manager-028', uid: 'ktx-red-028', title: 'AI Commissioning Manager', route: '/ai-agent/real-estate-development/sub-agents/commissioning-manager', color: '#047857', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-testing-manager-029', uid: 'ktx-red-029', title: 'AI Testing Manager', route: '/ai-agent/real-estate-development/sub-agents/testing-manager', color: '#047857', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-handover-specialist-030', uid: 'ktx-red-030', title: 'AI Handover Specialist', route: '/ai-agent/real-estate-development/sub-agents/handover-specialist', color: '#047857', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-warranty-manager-031', uid: 'ktx-red-031', title: 'AI Warranty Manager', route: '/ai-agent/real-estate-development/sub-agents/warranty-manager', color: '#047857', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-development-reporter-032', uid: 'ktx-red-032', title: 'AI Development Reporter', route: '/ai-agent/real-estate-development/sub-agents/development-reporter', color: '#047857', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-milestone-tracker-033', uid: 'ktx-red-033', title: 'AI Milestone Tracker', route: '/ai-agent/real-estate-development/sub-agents/milestone-tracker', color: '#047857', level: 'manager', efficiency: '88%' },

  // CONSTRUCTION MANAGEMENT (20 agents)
  { id: 'real-estate-construction-manager-034', uid: 'ktx-red-034', title: 'AI Construction Manager', route: '/ai-agent/real-estate-development/sub-agents/construction-manager', color: '#B45309', level: 'manager', efficiency: '91%' },
  { id: 'real-estate-general-contractor-035', uid: 'ktx-red-035', title: 'AI General Contractor', route: '/ai-agent/real-estate-development/sub-agents/general-contractor', color: '#B45309', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-project-superintendent-036', uid: 'ktx-red-036', title: 'AI Project Superintendent', route: '/ai-agent/real-estate-development/sub-agents/project-superintendent', color: '#B45309', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-site-superintendent-037', uid: 'ktx-red-037', title: 'AI Site Superintendent', route: '/ai-agent/real-estate-development/sub-agents/site-superintendent', color: '#B45309', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-quality-control-038', uid: 'ktx-red-038', title: 'AI Quality Control Manager', route: '/ai-agent/real-estate-development/sub-agents/quality-control-manager', color: '#B45309', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-safety-manager-039', uid: 'ktx-red-039', title: 'AI Safety Manager', route: '/ai-agent/real-estate-development/sub-agents/safety-manager', color: '#B45309', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-schedule-manager-040', uid: 'ktx-red-040', title: 'AI Schedule Manager', route: '/ai-agent/real-estate-development/sub-agents/schedule-manager', color: '#B45309', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-cost-manager-041', uid: 'ktx-red-041', title: 'AI Cost Manager', route: '/ai-agent/real-estate-development/sub-agents/cost-manager', color: '#B45309', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-materials-manager-042', uid: 'ktx-red-042', title: 'AI Materials Manager', route: '/ai-agent/real-estate-development/sub-agents/materials-manager', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-equipment-manager-043', uid: 'ktx-red-043', title: 'AI Equipment Manager', route: '/ai-agent/real-estate-development/sub-agents/equipment-manager', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-subcontractor-manager-044', uid: 'ktx-red-044', title: 'AI Subcontractor Manager', route: '/ai-agent/real-estate-development/sub-agents/subcontractor-manager', color: '#B45309', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-inspection-manager-045', uid: 'ktx-red-045', title: 'AI Inspection Manager', route: '/ai-agent/real-estate-development/sub-agents/inspection-manager', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-construction-reporter-046', uid: 'ktx-red-046', title: 'AI Construction Reporter', route: '/ai-agent/real-estate-development/sub-agents/construction-reporter', color: '#B45309', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-daily-log-047', uid: 'ktx-red-047', title: 'AI Daily Log Manager', route: '/ai-agent/real-estate-development/sub-agents/daily-log-manager', color: '#B45309', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-punch-list-048', uid: 'ktx-red-048', title: 'AI Punch List Manager', route: '/ai-agent/real-estate-development/sub-agents/punch-list-manager', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-change-order-049', uid: 'ktx-red-049', title: 'AI Change Order Manager', route: '/ai-agent/real-estate-development/sub-agents/change-order-manager', color: '#B45309', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-constructibility-050', uid: 'ktx-red-050', title: 'AI Constructibility Reviewer', route: '/ai-agent/real-estate-development/sub-agents/constructibility-reviewer', color: '#B45309', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-bim-coordinator-051', uid: 'ktx-red-051', title: 'AI BIM Coordinator', route: '/ai-agent/real-estate-development/sub-agents/bim-coordinator', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-vdc-manager-052', uid: 'ktx-red-052', title: 'AI VDC Manager', route: '/ai-agent/real-estate-development/sub-agents/vdc-manager', color: '#B45309', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-field-operations-053', uid: 'ktx-red-053', title: 'AI Field Operations Manager', route: '/ai-agent/real-estate-development/sub-agents/field-operations-manager', color: '#B45309', level: 'manager', efficiency: '86%' },

  // LAND ACQUISITION (15 agents)
  { id: 'real-estate-land-acquisition-manager-054', uid: 'ktx-red-054', title: 'AI Land Acquisition Manager', route: '/ai-agent/real-estate-development/sub-agents/land-acquisition-manager', color: '#065F46', level: 'manager', efficiency: '91%' },
  { id: 'real-estate-property-scout-055', uid: 'ktx-red-055', title: 'AI Property Scout', route: '/ai-agent/real-estate-development/sub-agents/property-scout', color: '#065F46', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-land-broker-056', uid: 'ktx-red-056', title: 'AI Land Broker', route: '/ai-agent/real-estate-development/sub-agents/land-broker', color: '#065F46', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-real-estate-broker-057', uid: 'ktx-red-057', title: 'AI Real Estate Broker', route: '/ai-agent/real-estate-development/sub-agents/real-estate-broker', color: '#065F46', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-acquisition-analyst-058', uid: 'ktx-red-058', title: 'AI Acquisition Analyst', route: '/ai-agent/real-estate-development/sub-agents/acquisition-analyst', color: '#065F46', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-appraiser-059', uid: 'ktx-red-059', title: 'AI Appraiser', route: '/ai-agent/real-estate-development/sub-agents/appraiser', color: '#065F46', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-negotiator-060', uid: 'ktx-red-060', title: 'AI Negotiator', route: '/ai-agent/real-estate-development/sub-agents/negotiator', color: '#065F46', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-closing-coordinator-061', uid: 'ktx-red-061', title: 'AI Closing Coordinator', route: '/ai-agent/real-estate-development/sub-agents/closing-coordinator', color: '#065F46', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-due-diligence-manager-062', uid: 'ktx-red-062', title: 'AI Due Diligence Manager', route: '/ai-agent/real-estate-development/sub-agents/due-diligence-manager', color: '#065F46', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-title-researcher-063', uid: 'ktx-red-063', title: 'AI Title Researcher', route: '/ai-agent/real-estate-development/sub-agents/title-researcher', color: '#065F46', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-survey-coordinator-064', uid: 'ktx-red-064', title: 'AI Survey Coordinator', route: '/ai-agent/real-estate-development/sub-agents/survey-coordinator', color: '#065F46', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-environmental-assessor-065', uid: 'ktx-red-065', title: 'AI Environmental Assessor', route: '/ai-agent/real-estate-development/sub-agents/environmental-assessor', color: '#065F46', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-geotechnical-coordinator-066', uid: 'ktx-red-066', title: 'AI Geotechnical Coordinator', route: '/ai-agent/real-estate-development/sub-agents/geotechnical-coordinator', color: '#065F46', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-site-selection-manager-067', uid: 'ktx-red-067', title: 'AI Site Selection Manager', route: '/ai-agent/real-estate-development/sub-agents/site-selection-manager', color: '#065F46', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-land-use-planner-068', uid: 'ktx-red-068', title: 'AI Land Use Planner', route: '/ai-agent/real-estate-development/sub-agents/land-use-planner', color: '#065F46', level: 'manager', efficiency: '88%' },

  // ZONING COMPLIANCE (15 agents)
  { id: 'real-estate-zoning-manager-069', uid: 'ktx-red-069', title: 'AI Zoning Manager', route: '/ai-agent/real-estate-development/sub-agents/zoning-manager', color: '#7C2D12', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-permitting-manager-070', uid: 'ktx-red-070', title: 'AI Permitting Manager', route: '/ai-agent/real-estate-development/sub-agents/permitting-manager', color: '#7C2D12', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-permitting-specialist-071', uid: 'ktx-red-071', title: 'AI Permitting Specialist', route: '/ai-agent/real-estate-development/sub-agents/permitting-specialist', color: '#7C2D12', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-permit-expediter-072', uid: 'ktx-red-072', title: 'AI Permit Expediter', route: '/ai-agent/real-estate-development/sub-agents/permit-expediter', color: '#7C2D12', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-code-compliance-073', uid: 'ktx-red-073', title: 'AI Code Compliance Specialist', route: '/ai-agent/real-estate-development/sub-agents/code-compliance-specialist', color: '#7C2D12', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-building-code-analyst-074', uid: 'ktx-red-074', title: 'AI Building Code Analyst', route: '/ai-agent/real-estate-development/sub-agents/building-code-analyst', color: '#7C2D12', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-fire-code-analyst-075', uid: 'ktx-red-075', title: 'AI Fire Code Analyst', route: '/ai-agent/real-estate-development/sub-agents/fire-code-analyst', color: '#7C2D12', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-compliance-manager-076', uid: 'ktx-red-076', title: 'AI Compliance Manager', route: '/ai-agent/real-estate-development/sub-agents/compliance-manager', color: '#7C2D12', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-environmental-reviewer-077', uid: 'ktx-red-077', title: 'AI Environmental Reviewer', route: '/ai-agent/real-estate-development/sub-agents/environmental-reviewer', color: '#7C2D12', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-traffic-impact-analyst-078', uid: 'ktx-red-078', title: 'AI Traffic Impact Analyst', route: '/ai-agent/real-estate-development/sub-agents/traffic-impact-analyst', color: '#7C2D12', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-utility-coordinator-079', uid: 'ktx-red-079', title: 'AI Utility Coordinator', route: '/ai-agent/real-estate-development/sub-agents/utility-coordinator', color: '#7C2D12', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-variance-specialist-080', uid: 'ktx-red-080', title: 'AI Variance Specialist', route: '/ai-agent/real-estate-development/sub-agents/variance-specialist', color: '#7C2D12', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-special-use-permit-081', uid: 'ktx-red-081', title: 'AI Special Use Permit Specialist', route: '/ai-agent/real-estate-development/sub-agents/special-use-permit-specialist', color: '#7C2D12', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-appeal-coordinator-082', uid: 'ktx-red-082', title: 'AI Appeal Coordinator', route: '/ai-agent/real-estate-development/sub-agents/appeal-coordinator', color: '#7C2D12', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-public-relations-083', uid: 'ktx-red-083', title: 'AI Public Relations Coordinator', route: '/ai-agent/real-estate-development/sub-agents/public-relations-coordinator', color: '#7C2D12', level: 'manager', efficiency: '85%' },

  // PROJECT FINANCING (15 agents)
  { id: 'real-estate-finance-manager-084', uid: 'ktx-red-084', title: 'AI Finance Manager', route: '/ai-agent/real-estate-development/sub-agents/finance-manager', color: '#9D174D', level: 'manager', efficiency: '91%' },
  { id: 'real-estate-financial-modeler-085', uid: 'ktx-red-085', title: 'AI Financial Modeler', route: '/ai-agent/real-estate-development/sub-agents/financial-modeler', color: '#9D174D', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-budget-manager-086', uid: 'ktx-red-086', title: 'AI Budget Manager', route: '/ai-agent/real-estate-development/sub-agents/budget-manager', color: '#9D174D', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-cash-flow-manager-087', uid: 'ktx-red-087', title: 'AI Cash Flow Manager', route: '/ai-agent/real-estate-development/sub-agents/cash-flow-manager', color: '#9D174D', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-investment-analyst-088', uid: 'ktx-red-088', title: 'AI Investment Analyst', route: '/ai-agent/real-estate-development/sub-agents/investment-analyst', color: '#9D174D', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-capital-markets-analyst-089', uid: 'ktx-red-089', title: 'AI Capital Markets Analyst', route: '/ai-agent/real-estate-development/sub-agents/capital-markets-analyst', color: '#9D174D', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-loan-officer-090', uid: 'ktx-red-090', title: 'AI Loan Officer', route: '/ai-agent/real-estate-development/sub-agents/loan-officer', color: '#9D174D', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-construction-loan-manager-091', uid: 'ktx-red-091', title: 'AI Construction Loan Manager', route: '/ai-agent/real-estate-development/sub-agents/construction-loan-manager', color: '#9D174D', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-mezzanine-financing-092', uid: 'ktx-red-092', title: 'AI Mezzanine Financing Specialist', route: '/ai-agent/real-estate-development/sub-agents/mezzanine-financing-specialist', color: '#9D174D', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-public-financing-093', uid: 'ktx-red-093', title: 'AI Public Financing Specialist', route: '/ai-agent/real-estate-development/sub-agents/public-financing-specialist', color: '#9D174D', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-grant-coordinator-094', uid: 'ktx-red-094', title: 'AI Grant Coordinator', route: '/ai-agent/real-estate-development/sub-agents/grant-coordinator', color: '#9D174D', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-tax-credit-specialist-095', uid: 'ktx-red-095', title: 'AI Tax Credit Specialist', route: '/ai-agent/real-estate-development/sub-agents/tax-credit-specialist', color: '#9D174D', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-risk-manager-096', uid: 'ktx-red-096', title: 'AI Risk Manager', route: '/ai-agent/real-estate-development/sub-agents/risk-manager', color: '#9D174D', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-equity-investor-relations-097', uid: 'ktx-red-097', title: 'AI Equity Investor Relations', route: '/ai-agent/real-estate-development/sub-agents/equity-investor-relations', color: '#9D174D', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-debt-investor-relations-098', uid: 'ktx-red-098', title: 'AI Debt Investor Relations', route: '/ai-agent/real-estate-development/sub-agents/debt-investor-relations', color: '#9D174D', level: 'manager', efficiency: '87%' },

  // DEVELOPER OPERATIONS (12 agents)
  { id: 'real-estate-operations-manager-099', uid: 'ktx-red-099', title: 'AI Operations Manager', route: '/ai-agent/real-estate-development/sub-agents/operations-manager', color: '#581C87', level: 'manager', efficiency: '90%' },
  { id: 'real-estate-asset-manager-100', uid: 'ktx-red-100', title: 'AI Asset Manager', route: '/ai-agent/real-estate-development/sub-agents/asset-manager', color: '#581C87', level: 'manager', efficiency: '89%' },
  { id: 'real-estate-portfolio-manager-101', uid: 'ktx-red-101', title: 'AI Portfolio Manager', route: '/ai-agent/real-estate-development/sub-agents/portfolio-manager', color: '#581C87', level: 'manager', efficiency: '88%' },
  { id: 'real-estate-property-manager-102', uid: 'ktx-red-102', title: 'AI Property Manager', route: '/ai-agent/real-estate-development/sub-agents/property-manager', color: '#581C87', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-leasing-manager-103', uid: 'ktx-red-103', title: 'AI Leasing Manager', route: '/ai-agent/real-estate-development/sub-agents/leasing-manager', color: '#581C87', level: 'manager', efficiency: '87%' },
  { id: 'real-estate-marketing-manager-104', uid: 'ktx-red-104', title: 'AI Marketing Manager', route: '/ai-agent/real-estate-development/sub-agents/marketing-manager', color: '#581C87', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-sales-manager-105', uid: 'ktx-red-105', title: 'AI Sales Manager', route: '/ai-agent/real-estate-development/sub-agents/sales-manager', color: '#581C87', level: 'manager', efficiency: '86%' },
  { id: 'real-estate-customer-relations-106', uid: 'ktx-red-106', title: 'AI Customer Relations Manager', route: '/ai-agent/real-estate-development/sub-agents/customer-relations-manager', color: '#581C87', level: 'manager', efficiency: '85%' },
  { id: 'real-estate-facilities-manager-107', uid: 'ktx-red-107', title: 'AI Facilities Manager', route: '/ai-agent/real-estate-development/sub-agents/facilities-manager', color: '#581C87', level: 'manager', efficiency: '85%' },
  { id: 'real-estate-maintenance-manager-108', uid: 'ktx-red-108', title: 'AI Maintenance Manager', route: '/ai-agent/real-estate-development/sub-agents/maintenance-manager', color: '#581C87', level: 'manager', efficiency: '84%' },
  { id: 'real-estate-insurance-manager-109', uid: 'ktx-red-109', title: 'AI Insurance Manager', route: '/ai-agent/real-estate-development/sub-agents/insurance-manager', color: '#581C87', level: 'manager', efficiency: '84%' },
  { id: 'real-estate-vendor-manager-110', uid: 'ktx-red-110', title: 'AI Vendor Manager', route: '/ai-agent/real-estate-development/sub-agents/vendor-manager', color: '#581C87', level: 'manager', efficiency: '83%' },
];

// Group agents by category
const categorizedAgents = {
  'Strategic Real Estate Intelligence': agents.filter(a => a.id.includes('001') || a.id.includes('002') || a.id.includes('003') || a.id.includes('004') || a.id.includes('005') || a.id.includes('006') || a.id.includes('007') || a.id.includes('008') || a.id.includes('009') || a.id.includes('010') || a.id.includes('011') || a.id.includes('012') || a.id.includes('013') || a.id.includes('014') || a.id.includes('015') || a.id.includes('016') || a.id.includes('017') || a.id.includes('018')),
  'Property Development Operations': agents.filter(a => a.id.includes('019') || a.id.includes('020') || a.id.includes('021') || a.id.includes('022') || a.id.includes('023') || a.id.includes('024') || a.id.includes('025') || a.id.includes('026') || a.id.includes('027') || a.id.includes('028') || a.id.includes('029') || a.id.includes('030') || a.id.includes('031') || a.id.includes('032') || a.id.includes('033')),
  'Construction Management': agents.filter(a => a.id.includes('034') || a.id.includes('035') || a.id.includes('036') || a.id.includes('037') || a.id.includes('038') || a.id.includes('039') || a.id.includes('040') || a.id.includes('041') || a.id.includes('042') || a.id.includes('043') || a.id.includes('044') || a.id.includes('045') || a.id.includes('046') || a.id.includes('047') || a.id.includes('048') || a.id.includes('049') || a.id.includes('050') || a.id.includes('051') || a.id.includes('052') || a.id.includes('053')),
  'Land Acquisition': agents.filter(a => a.id.includes('054') || a.id.includes('055') || a.id.includes('056') || a.id.includes('057') || a.id.includes('058') || a.id.includes('059') || a.id.includes('060') || a.id.includes('061') || a.id.includes('062') || a.id.includes('063') || a.id.includes('064') || a.id.includes('065') || a.id.includes('066') || a.id.includes('067') || a.id.includes('068')),
  'Zoning Compliance': agents.filter(a => a.id.includes('069') || a.id.includes('070') || a.id.includes('071') || a.id.includes('072') || a.id.includes('073') || a.id.includes('074') || a.id.includes('075') || a.id.includes('076') || a.id.includes('077') || a.id.includes('078') || a.id.includes('079') || a.id.includes('080') || a.id.includes('081') || a.id.includes('082') || a.id.includes('083')),
  'Project Financing': agents.filter(a => a.id.includes('084') || a.id.includes('085') || a.id.includes('086') || a.id.includes('087') || a.id.includes('088') || a.id.includes('089') || a.id.includes('090') || a.id.includes('091') || a.id.includes('092') || a.id.includes('093') || a.id.includes('094') || a.id.includes('095') || a.id.includes('096') || a.id.includes('097') || a.id.includes('098')),
  'Developer Operations': agents.filter(a => a.id.includes('099') || a.id.includes('100') || a.id.includes('101') || a.id.includes('102') || a.id.includes('103') || a.id.includes('104') || a.id.includes('105') || a.id.includes('106') || a.id.includes('107') || a.id.includes('108') || a.id.includes('109') || a.id.includes('110')),
};

export default function RealEstateDevelopmentAgentsPage() {
  const router = useRouter();

  const handleAgentPress = (agent: any) => {
    router.push(agent.route);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'c_level':
        return '#DC2626';
      case 'vp_director':
        return '#EA580C';
      case 'manager':
        return '#16A34A';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Real Estate Development AI Agents</Text>
          <Text style={styles.subtitle}>110 Enterprise-Grade Real Estate Agents</Text>
        </View>

        {Object.entries(categorizedAgents).map(([category, categoryAgents]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category} ({categoryAgents.length})</Text>
            <View style={styles.agentGrid}>
              {categoryAgents.map((agent) => (
                <Pressable
                  key={agent.id}
                  style={[styles.agentCard, { borderColor: agent.color }]}
                  onPress={() => handleAgentPress(agent)}
                >
                  <View style={styles.agentHeader}>
                    <View style={[styles.levelIndicator, { backgroundColor: getLevelColor(agent.level) }]} />
                    <Text style={styles.agentTitle}>{agent.title}</Text>
                  </View>
                  <View style={styles.agentMeta}>
                    <Text style={[styles.agentMetaText, { color: agent.color }]}>{agent.efficiency}</Text>
                    <Text style={styles.agentUid}>{agent.uid}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#1E40AF',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DBEAFE',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  agentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  agentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentMetaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentUid: {
    fontSize: 11,
    color: '#6B7280',
  },
});
