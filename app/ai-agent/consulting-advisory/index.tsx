import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  // MANAGEMENT CONSULTING - STRATEGIC AGENTS (18 agents)
  { id: 'consulting-mgmt-intelligence-hub-001', uid: 'ktx-consult-001', title: 'AI Management Consulting Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-mgmt-intelligence-hub-001', color: '#1E40AF', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-mgmt-strategy-002', uid: 'ktx-consult-002', title: 'AI Management Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-mgmt-strategy-002', color: '#1E40AF', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-mgmt-operations-003', uid: 'ktx-consult-003', title: 'AI Management Operations Optimizer', route: '/ai-agent/consulting-advisory/consulting-mgmt-operations-003', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-mgmt-performance-004', uid: 'ktx-consult-004', title: 'AI Management Performance Analytics', route: '/ai-agent/consulting-advisory/consulting-mgmt-performance-004', color: '#1E40AF', level: 'manager', efficiency: '92%' },
  { id: 'consulting-mgmt-change-005', uid: 'ktx-consult-005', title: 'AI Change Management Consultant', route: '/ai-agent/consulting-advisory/consulting-mgmt-change-005', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-mgmt-process-006', uid: 'ktx-consult-006', title: 'AI Process Improvement Specialist', route: '/ai-agent/consulting-advisory/consulting-mgmt-process-006', color: '#1E40AF', level: 'manager', efficiency: '91%' },
  { id: 'consulting-mgmt-organization-007', uid: 'ktx-consult-007', title: 'AI Organizational Design Consultant', route: '/ai-agent/consulting-advisory/consulting-mgmt-organization-007', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-mgmt-talent-008', uid: 'ktx-consult-008', title: 'AI Talent Management Advisor', route: '/ai-agent/consulting-advisory/consulting-mgmt-talent-008', color: '#1E40AF', level: 'manager', efficiency: '90%' },
  { id: 'consulting-mgmt-risk-009', uid: 'ktx-consult-009', title: 'AI Management Risk Assessor', route: '/ai-agent/consulting-advisory/consulting-mgmt-risk-009', color: '#1E40AF', level: 'manager', efficiency: '91%' },
  { id: 'consulting-mgmt-efficiency-010', uid: 'ktx-consult-010', title: 'AI Efficiency Optimization Engine', route: '/ai-agent/consulting-advisory/consulting-mgmt-efficiency-010', color: '#1E40AF', level: 'manager', efficiency: '93%' },
  { id: 'consulting-mgmt-governance-011', uid: 'ktx-consult-011', title: 'AI Corporate Governance Advisor', route: '/ai-agent/consulting-advisory/consulting-mgmt-governance-011', color: '#1E40AF', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-mgmt-reporting-012', uid: 'ktx-consult-012', title: 'AI Management Reporting System', route: '/ai-agent/consulting-advisory/consulting-mgmt-reporting-012', color: '#1E40AF', level: 'manager', efficiency: '90%' },
  { id: 'consulting-mgmt-forecasting-013', uid: 'ktx-consult-013', title: 'AI Business Forecasting Advisor', route: '/ai-agent/consulting-advisory/consulting-mgmt-forecasting-013', color: '#1E40AF', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-mgmt-kpi-014', uid: 'ktx-consult-014', title: 'AI KPI Management Dashboard', route: '/ai-agent/consulting-advisory/consulting-mgmt-kpi-014', color: '#1E40AF', level: 'manager', efficiency: '91%' },
  { id: 'consulting-mgmt-cost-015', uid: 'ktx-consult-015', title: 'AI Cost Optimization Consultant', route: '/ai-agent/consulting-advisory/consulting-mgmt-cost-015', color: '#1E40AF', level: 'manager', efficiency: '92%' },
  { id: 'consulting-mgmt-resource-016', uid: 'ktx-consult-016', title: 'AI Resource Allocation System', route: '/ai-agent/consulting-advisory/consulting-mgmt-resource-016', color: '#1E40AF', level: 'manager', efficiency: '90%' },
  { id: 'consulting-mgmt-project-017', uid: 'ktx-consult-017', title: 'AI Project Management Consultant', route: '/ai-agent/consulting-advisory/consulting-mgmt-project-017', color: '#1E40AF', level: 'manager', efficiency: '91%' },
  { id: 'consulting-mgmt-compliance-018', uid: 'ktx-consult-018', title: 'AI Management Compliance Monitor', route: '/ai-agent/consulting-advisory/consulting-mgmt-compliance-018', color: '#1E40AF', level: 'manager', efficiency: '89%' },

  // STRATEGY CONSULTING - STRATEGIC AGENTS (18 agents)
  { id: 'consulting-strategy-hub-019', uid: 'ktx-consult-019', title: 'AI Strategy Consulting Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-strategy-hub-019', color: '#3B82F6', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-strategy-market-020', uid: 'ktx-consult-020', title: 'AI Market Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-market-020', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-strategy-competitive-021', uid: 'ktx-consult-021', title: 'AI Competitive Intelligence Engine', route: '/ai-agent/consulting-advisory/consulting-strategy-competitive-021', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-strategy-growth-022', uid: 'ktx-consult-022', title: 'AI Growth Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-strategy-growth-022', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-strategy-innovation-023', uid: 'ktx-consult-023', title: 'AI Innovation Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-innovation-023', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-strategy-ma-024', uid: 'ktx-consult-024', title: 'AI M&A Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-strategy-ma-024', color: '#3B82F6', level: 'c_level', efficiency: '95%' },
  { id: 'consulting-strategy-digital-025', uid: 'ktx-consult-025', title: 'AI Digital Transformation Strategist', route: '/ai-agent/consulting-advisory/consulting-strategy-digital-025', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-strategy-brand-026', uid: 'ktx-consult-026', title: 'AI Brand Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-brand-026', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'consulting-strategy-pricing-027', uid: 'ktx-consult-027', title: 'AI Pricing Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-strategy-pricing-027', color: '#3B82F6', level: 'manager', efficiency: '92%' },
  { id: 'consulting-strategy-partnership-028', uid: 'ktx-consult-028', title: 'AI Partnership Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-partnership-028', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'consulting-strategy-expansion-029', uid: 'ktx-consult-029', title: 'AI Market Expansion Consultant', route: '/ai-agent/consulting-advisory/consulting-strategy-expansion-029', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-strategy-diversification-030', uid: 'ktx-consult-030', title: 'AI Diversification Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-diversification-030', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-strategy-portfolio-031', uid: 'ktx-consult-031', title: 'AI Portfolio Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-strategy-portfolio-031', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-strategy-investment-032', uid: 'ktx-consult-032', title: 'AI Investment Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-investment-032', color: '#3B82F6', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-strategy-scenario-033', uid: 'ktx-consult-033', title: 'AI Scenario Planning Engine', route: '/ai-agent/consulting-advisory/consulting-strategy-scenario-033', color: '#3B82F6', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-strategy-value-034', uid: 'ktx-consult-034', title: 'AI Value Proposition Designer', route: '/ai-agent/consulting-advisory/consulting-strategy-value-034', color: '#3B82F6', level: 'manager', efficiency: '90%' },
  { id: 'consulting-strategy-positioning-035', uid: 'ktx-consult-035', title: 'AI Market Positioning Advisor', route: '/ai-agent/consulting-advisory/consulting-strategy-positioning-035', color: '#3B82F6', level: 'manager', efficiency: '91%' },
  { id: 'consulting-strategy-ecosystem-036', uid: 'ktx-consult-036', title: 'AI Business Ecosystem Strategist', route: '/ai-agent/consulting-advisory/consulting-strategy-ecosystem-036', color: '#3B82F6', level: 'vp_director', efficiency: '93%' },

  // IT CONSULTING - STRATEGIC AGENTS (16 agents)
  { id: 'consulting-it-hub-037', uid: 'ktx-consult-037', title: 'AI IT Consulting Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-it-hub-037', color: '#2563EB', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-it-architecture-038', uid: 'ktx-consult-038', title: 'AI Enterprise Architecture Consultant', route: '/ai-agent/consulting-advisory/consulting-it-architecture-038', color: '#2563EB', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-it-cloud-039', uid: 'ktx-consult-039', title: 'AI Cloud Migration Advisor', route: '/ai-agent/consulting-advisory/consulting-it-cloud-039', color: '#2563EB', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-it-security-040', uid: 'ktx-consult-040', title: 'AI Cybersecurity Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-it-security-040', color: '#2563EB', level: 'vp_director', efficiency: '95%' },
  { id: 'consulting-it-devops-041', uid: 'ktx-consult-041', title: 'AI DevOps Transformation Advisor', route: '/ai-agent/consulting-advisory/consulting-it-devops-041', color: '#2563EB', level: 'manager', efficiency: '92%' },
  { id: 'consulting-it-data-042', uid: 'ktx-consult-042', title: 'AI Data Strategy Consultant', route: '/ai-agent/consulting-advisory/consulting-it-data-042', color: '#2563EB', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-it-ai-043', uid: 'ktx-consult-043', title: 'AI Implementation Advisor', route: '/ai-agent/consulting-advisory/consulting-it-ai-043', color: '#2563EB', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-it-integration-044', uid: 'ktx-consult-044', title: 'AI System Integration Consultant', route: '/ai-agent/consulting-advisory/consulting-it-integration-044', color: '#2563EB', level: 'manager', efficiency: '91%' },
  { id: 'consulting-it-legacy-045', uid: 'ktx-consult-045', title: 'AI Legacy System Modernization', route: '/ai-agent/consulting-advisory/consulting-it-legacy-045', color: '#2563EB', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-it-infrastructure-046', uid: 'ktx-consult-046', title: 'AI Infrastructure Optimization', route: '/ai-agent/consulting-advisory/consulting-it-infrastructure-046', color: '#2563EB', level: 'manager', efficiency: '90%' },
  { id: 'consulting-it-compliance-047', uid: 'ktx-consult-047', title: 'AI IT Compliance Advisor', route: '/ai-agent/consulting-advisory/consulting-it-compliance-047', color: '#2563EB', level: 'manager', efficiency: '89%' },
  { id: 'consulting-it-outsourcing-048', uid: 'ktx-consult-048', title: 'AI IT Outsourcing Strategy', route: '/ai-agent/consulting-advisory/consulting-it-outsourcing-048', color: '#2563EB', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-it-governance-049', uid: 'ktx-consult-049', title: 'AI IT Governance Consultant', route: '/ai-agent/consulting-advisory/consulting-it-governance-049', color: '#2563EB', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-it-service-050', uid: 'ktx-consult-050', title: 'AI IT Service Management', route: '/ai-agent/consulting-advisory/consulting-it-service-050', color: '#2563EB', level: 'manager', efficiency: '91%' },
  { id: 'consulting-it-innovation-051', uid: 'ktx-consult-051', title: 'AI Technology Innovation Advisor', route: '/ai-agent/consulting-advisory/consulting-it-innovation-051', color: '#2563EB', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-it-cost-052', uid: 'ktx-consult-052', title: 'AI IT Cost Optimization', route: '/ai-agent/consulting-advisory/consulting-it-cost-052', color: '#2563EB', level: 'manager', efficiency: '90%' },

  // HR CONSULTING - STRATEGIC AGENTS (16 agents)
  { id: 'consulting-hr-hub-053', uid: 'ktx-consult-053', title: 'AI HR Consulting Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-hr-hub-053', color: '#7C3AED', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-hr-talent-054', uid: 'ktx-consult-054', title: 'AI Talent Acquisition Strategy', route: '/ai-agent/consulting-advisory/consulting-hr-talent-054', color: '#7C3AED', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-hr-workforce-055', uid: 'ktx-consult-055', title: 'AI Workforce Planning Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-workforce-055', color: '#7C3AED', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-hr-performance-056', uid: 'ktx-consult-056', title: 'AI Performance Management Consultant', route: '/ai-agent/consulting-advisory/consulting-hr-performance-056', color: '#7C3AED', level: 'manager', efficiency: '92%' },
  { id: 'consulting-hr-compensation-057', uid: 'ktx-consult-057', title: 'AI Compensation Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-compensation-057', color: '#7C3AED', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-hr-learning-058', uid: 'ktx-consult-058', title: 'AI Learning & Development Consultant', route: '/ai-agent/consulting-advisory/consulting-hr-learning-058', color: '#7C3AED', level: 'manager', efficiency: '91%' },
  { id: 'consulting-hr-engagement-059', uid: 'ktx-consult-059', title: 'AI Employee Engagement Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-engagement-059', color: '#7C3AED', level: 'manager', efficiency: '90%' },
  { id: 'consulting-hr-culture-060', uid: 'ktx-consult-060', title: 'AI Organizational Culture Consultant', route: '/ai-agent/consulting-advisory/consulting-hr-culture-060', color: '#7C3AED', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-hr-diversity-061', uid: 'ktx-consult-061', title: 'AI DEI Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-diversity-061', color: '#7C3AED', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-hr-retention-062', uid: 'ktx-consult-062', title: 'AI Employee Retention Consultant', route: '/ai-agent/consulting-advisory/consulting-hr-retention-062', color: '#7C3AED', level: 'manager', efficiency: '91%' },
  { id: 'consulting-hr-succession-063', uid: 'ktx-consult-063', title: 'AI Succession Planning Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-succession-063', color: '#7C3AED', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-hr-analytics-064', uid: 'ktx-consult-064', title: 'AI HR Analytics Platform', route: '/ai-agent/consulting-advisory/consulting-hr-analytics-064', color: '#7C3AED', level: 'manager', efficiency: '91%' },
  { id: 'consulting-hr-compliance-065', uid: 'ktx-consult-065', title: 'AI HR Compliance Consultant', route: '/ai-agent/consulting-advisory/consulting-hr-compliance-065', color: '#7C3AED', level: 'manager', efficiency: '89%' },
  { id: 'consulting-hr-wellness-066', uid: 'ktx-consult-066', title: 'AI Employee Wellness Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-wellness-066', color: '#7C3AED', level: 'manager', efficiency: '90%' },
  { id: 'consulting-hr-onboarding-067', uid: 'ktx-consult-067', title: 'AI Onboarding Optimization', route: '/ai-agent/consulting-advisory/consulting-hr-onboarding-067', color: '#7C3AED', level: 'manager', efficiency: '91%' },
  { id: 'consulting-hr-offboarding-068', uid: 'ktx-consult-068', title: 'AI Offboarding Process Advisor', route: '/ai-agent/consulting-advisory/consulting-hr-offboarding-068', color: '#7C3AED', level: 'manager', efficiency: '88%' },

  // FINANCIAL ADVISORY - STRATEGIC AGENTS (16 agents)
  { id: 'consulting-fin-hub-069', uid: 'ktx-consult-069', title: 'AI Financial Advisory Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-fin-hub-069', color: '#059669', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-fin-planning-070', uid: 'ktx-consult-070', title: 'AI Financial Planning Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-planning-070', color: '#059669', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-fin-valuation-071', uid: 'ktx-consult-071', title: 'AI Business Valuation Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-valuation-071', color: '#059669', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-fin-due-diligence-072', uid: 'ktx-consult-072', title: 'AI Due Diligence Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-due-diligence-072', color: '#059669', level: 'vp_director', efficiency: '95%' },
  { id: 'consulting-fin-capital-073', uid: 'ktx-consult-073', title: 'AI Capital Structure Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-capital-073', color: '#059669', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-fin-treasury-074', uid: 'ktx-consult-074', title: 'AI Treasury Management Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-treasury-074', color: '#059669', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-fin-risk-075', uid: 'ktx-consult-075', title: 'AI Financial Risk Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-risk-075', color: '#059669', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-fin-audit-076', uid: 'ktx-consult-076', title: 'AI Internal Audit Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-audit-076', color: '#059669', level: 'manager', efficiency: '91%' },
  { id: 'consulting-fin-fpna-077', uid: 'ktx-consult-077', title: 'AI FP&A Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-fpna-077', color: '#059669', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-fin-cashflow-078', uid: 'ktx-consult-078', title: 'AI Cash Flow Optimization', route: '/ai-agent/consulting-advisory/consulting-fin-cashflow-078', color: '#059669', level: 'manager', efficiency: '92%' },
  { id: 'consulting-fin-investment-079', uid: 'ktx-consult-079', title: 'AI Investment Advisory Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-investment-079', color: '#059669', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-fin-tax-080', uid: 'ktx-consult-080', title: 'AI Tax Strategy Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-tax-080', color: '#059669', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-fin-compliance-081', uid: 'ktx-consult-081', title: 'AI Financial Compliance Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-compliance-081', color: '#059669', level: 'manager', efficiency: '91%' },
  { id: 'consulting-fin-ma-advisory-082', uid: 'ktx-consult-082', title: 'AI M&A Financial Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-ma-advisory-082', color: '#059669', level: 'c_level', efficiency: '95%' },
  { id: 'consulting-fin-restructuring-083', uid: 'ktx-consult-083', title: 'AI Restructuring Consultant', route: '/ai-agent/consulting-advisory/consulting-fin-restructuring-083', color: '#059669', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-fin-sustainability-084', uid: 'ktx-consult-084', title: 'AI ESG Finance Advisor', route: '/ai-agent/consulting-advisory/consulting-fin-sustainability-084', color: '#059669', level: 'vp_director', efficiency: '93%' },

  // TRANSFORMATION CONSULTING - STRATEGIC AGENTS (16 agents)
  { id: 'consulting-trans-hub-085', uid: 'ktx-consult-085', title: 'AI Transformation Consulting Intelligence Hub - Enterprise', route: '/ai-agent/consulting-advisory/consulting-trans-hub-085', color: '#DC2626', level: 'c_level', efficiency: '96%' },
  { id: 'consulting-trans-digital-086', uid: 'ktx-consult-086', title: 'AI Digital Transformation Lead', route: '/ai-agent/consulting-advisory/consulting-trans-digital-086', color: '#DC2626', level: 'c_level', efficiency: '95%' },
  { id: 'consulting-trans-agile-087', uid: 'ktx-consult-087', title: 'AI Agile Transformation Consultant', route: '/ai-agent/consulting-advisory/consulting-trans-agile-087', color: '#DC2626', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-trans-cultural-088', uid: 'ktx-consult-088', title: 'AI Cultural Transformation Advisor', route: '/ai-agent/consulting-advisory/consulting-trans-cultural-088', color: '#DC2626', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-trans-process-089', uid: 'ktx-consult-089', title: 'AI Business Process Reengineering', route: '/ai-agent/consulting-advisory/consulting-trans-process-089', color: '#DC2626', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-trans-automation-090', uid: 'ktx-consult-090', title: 'AI RPA Implementation Consultant', route: '/ai-agent/consulting-advisory/consulting-trans-automation-090', color: '#DC2626', level: 'manager', efficiency: '92%' },
  { id: 'consulting-trans-lean-091', uid: 'ktx-consult-091', title: 'AI Lean Transformation Advisor', route: '/ai-agent/consulting-advisory/consulting-trans-lean-091', color: '#DC2626', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-trans-customer-092', uid: 'ktx-consult-092', title: 'AI Customer Experience Transformation', route: '/ai-agent/consulting-advisory/consulting-trans-customer-092', color: '#DC2626', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-trans-supply-chain-093', uid: 'ktx-consult-093', title: 'AI Supply Chain Transformation', route: '/ai-agent/consulting-advisory/consulting-trans-supply-chain-093', color: '#DC2626', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-trans-sustainability-094', uid: 'ktx-consult-094', title: 'AI Sustainability Transformation', route: '/ai-agent/consulting-advisory/consulting-trans-sustainability-094', color: '#DC2626', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-trans-operational-095', uid: 'ktx-consult-095', title: 'AI Operational Excellence Consultant', route: '/ai-agent/consulting-advisory/consulting-trans-operational-095', color: '#DC2626', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-trans-innovation-096', uid: 'ktx-consult-096', title: 'AI Innovation Transformation Lead', route: '/ai-agent/consulting-advisory/consulting-trans-innovation-096', color: '#DC2626', level: 'vp_director', efficiency: '94%' },
  { id: 'consulting-trans-change-mgmt-097', uid: 'ktx-consult-097', title: 'AI Change Management Advisor', route: '/ai-agent/consulting-advisory/consulting-trans-change-mgmt-097', color: '#DC2626', level: 'vp_director', efficiency: '92%' },
  { id: 'consulting-trans-program-098', uid: 'ktx-consult-098', title: 'AI Transformation Program Manager', route: '/ai-agent/consulting-advisory/consulting-trans-program-098', color: '#DC2626', level: 'vp_director', efficiency: '93%' },
  { id: 'consulting-trans-benefits-099', uid: 'ktx-consult-099', title: 'AI Benefits Realization Consultant', route: '/ai-agent/consulting-advisory/consulting-trans-benefits-099', color: '#DC2626', level: 'manager', efficiency: '91%' },
  { id: 'consulting-trans-post-merger-100', uid: 'ktx-consult-100', title: 'AI Post-Merger Integration', route: '/ai-agent/consulting-advisory/consulting-trans-post-merger-100', color: '#DC2626', level: 'vp_director', efficiency: '94%' },
];

export default function ConsultingAdvisoryPage() {
  const router = useRouter();

  const categorizedAgents = {
    'Management Consulting': agents.filter(a => a.id.includes('mgmt')),
    'Strategy Consulting': agents.filter(a => a.id.includes('strategy')),
    'IT Consulting': agents.filter(a => a.id.includes('it')),
    'HR Consulting': agents.filter(a => a.id.includes('hr')),
    'Financial Advisory': agents.filter(a => a.id.includes('fin')),
    'Transformation Consulting': agents.filter(a => a.id.includes('trans')),
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'c_level': return '#EF4444';
      case 'vp_director': return '#F59E0B';
      case 'manager': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulting & Advisory AI Agents</Text>
        <Text style={styles.subtitle}>Enterprise-grade AI consulting intelligence across all specializations</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{agents.length}</Text>
            <Text style={styles.statLabel}>Total Agents</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Specializations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>96%</Text>
            <Text style={styles.statLabel}>Avg Efficiency</Text>
          </View>
        </View>
      </View>

      {Object.entries(categorizedAgents).map(([category, categoryAgents]) => (
        <View key={category} style={styles.category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.categoryCount}>{categoryAgents.length} agents</Text>
          <View style={styles.agentGrid}>
            {categoryAgents.map((agent) => (
              <Pressable
                key={agent.id}
                style={[styles.agentCard, { borderColor: agent.color }]}
                onPress={() => router.push(agent.route)}
              >
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(agent.level) }]}>
                  <Text style={styles.levelText}>{agent.level.replace('_', ' ').toUpperCase()}</Text>
                </View>
                <Text style={[styles.agentTitle, { color: agent.color }]}>{agent.title}</Text>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentId}>{agent.uid}</Text>
                  <Text style={[styles.efficiency, { color: agent.color }]}>{agent.efficiency} efficiency</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    gap: 30,
  },
  statItem: {
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  category: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 6,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  agentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 18,
  },
  agentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentId: {
    fontSize: 11,
    color: '#64748B',
  },
  efficiency: {
    fontSize: 11,
    fontWeight: '600',
  },
});
