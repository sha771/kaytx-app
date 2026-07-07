import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-ai-governance-specialist', uid: 'ktx-aimg-ai-governance-specialist', title: 'AI Governance Specialist', route: '/ai-agent/ai-management-governance/ai-governance-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '92%' },
  { id: 'ai-ai-compliance-officer', uid: 'ktx-aimg-ai-compliance-officer', title: 'AI Compliance Officer', route: '/ai-agent/ai-management-governance/ai-compliance-officer', color: '#1E88E5', level: 'manager', efficiency: '91%' },
  { id: 'ai-ai-ethicist', uid: 'ktx-aimg-ai-ethicist', title: 'AI Ethicist', route: '/ai-agent/ai-management-governance/ai-ethicist', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-risk-manager', uid: 'ktx-aimg-ai-risk-manager', title: 'AI Risk Manager', route: '/ai-agent/ai-management-governance/ai-risk-manager', color: '#1E88E5', level: 'manager', efficiency: '88%' },
  { id: 'ai-ai-quality-specialist', uid: 'ktx-aimg-ai-quality-specialist', title: 'AI Quality Specialist', route: '/ai-agent/ai-management-governance/ai-quality-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-security-specialist', uid: 'ktx-aimg-ai-security-specialist', title: 'AI Security Specialist', route: '/ai-agent/ai-management-governance/ai-security-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-ai-policy-specialist', uid: 'ktx-aimg-ai-policy-specialist', title: 'AI Policy Specialist', route: '/ai-agent/ai-management-governance/ai-policy-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-auditor', uid: 'ktx-aimg-ai-auditor', title: 'AI Auditor', route: '/ai-agent/ai-management-governance/ai-auditor', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-monitoring-specialist', uid: 'ktx-aimg-ai-monitoring-specialist', title: 'AI Monitoring Specialist', route: '/ai-agent/ai-management-governance/ai-monitoring-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-performance-analyst', uid: 'ktx-aimg-ai-performance-analyst', title: 'AI Performance Analyst', route: '/ai-agent/ai-management-governance/ai-performance-analyst', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-strategy-specialist', uid: 'ktx-aimg-ai-strategy-specialist', title: 'AI Strategy Specialist', route: '/ai-agent/ai-management-governance/ai-strategy-specialist', color: '#1E88E5', level: 'manager', efficiency: '91%' },
  { id: 'ai-ai-architecture-specialist', uid: 'ktx-aimg-ai-architecture-specialist', title: 'AI Architecture Specialist', route: '/ai-agent/ai-management-governance/ai-architecture-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-integration-specialist', uid: 'ktx-aimg-ai-integration-specialist', title: 'AI Integration Specialist', route: '/ai-agent/ai-management-governance/ai-integration-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-operations-specialist', uid: 'ktx-aimg-ai-operations-specialist', title: 'AI Operations Specialist', route: '/ai-agent/ai-management-governance/ai-operations-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ai-testing-specialist', uid: 'ktx-aimg-ai-testing-specialist', title: 'AI Testing Specialist', route: '/ai-agent/ai-management-governance/ai-testing-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-validation-specialist', uid: 'ktx-aimg-ai-validation-specialist', title: 'AI Validation Specialist', route: '/ai-agent/ai-management-governance/ai-validation-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-documentation-specialist', uid: 'ktx-aimg-ai-documentation-specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-management-governance/ai-documentation-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-training-specialist', uid: 'ktx-aimg-ai-training-specialist', title: 'AI Training Specialist', route: '/ai-agent/ai-management-governance/ai-training-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-deployment-specialist', uid: 'ktx-aimg-ai-deployment-specialist', title: 'AI Deployment Specialist', route: '/ai-agent/ai-management-governance/ai-deployment-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-maintenance-specialist', uid: 'ktx-aimg-ai-maintenance-specialist', title: 'AI Maintenance Specialist', route: '/ai-agent/ai-management-governance/ai-maintenance-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ai-support-specialist', uid: 'ktx-aimg-ai-support-specialist', title: 'AI Support Specialist', route: '/ai-agent/ai-management-governance/ai-support-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-ai-platform-specialist', uid: 'ktx-aimg-ai-platform-specialist', title: 'AI Platform Specialist', route: '/ai-agent/ai-management-governance/ai-platform-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-data-specialist', uid: 'ktx-aimg-ai-data-specialist', title: 'AI Data Specialist', route: '/ai-agent/ai-management-governance/ai-data-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-model-specialist', uid: 'ktx-aimg-ai-model-specialist', title: 'AI Model Specialist', route: '/ai-agent/ai-management-governance/ai-model-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-infrastructure-specialist', uid: 'ktx-aimg-ai-infrastructure-specialist', title: 'AI Infrastructure Specialist', route: '/ai-agent/ai-management-governance/ai-infrastructure-specialist', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-security-architect', uid: 'ktx-aimg-ai-security-architect', title: 'AI Security Architect', route: '/ai-agent/ai-management-governance/ai-security-architect', color: '#1E88E5', level: 'manager', efficiency: '91%' },
  { id: 'ai-ai-compliance-manager', uid: 'ktx-aimg-ai-compliance-manager', title: 'AI Compliance Manager', route: '/ai-agent/ai-management-governance/ai-compliance-manager', color: '#1E88E5', level: 'manager', efficiency: '90%' },
  { id: 'ai-ai-governance-analyst', uid: 'ktx-aimg-ai-governance-analyst', title: 'AI Governance Analyst', route: '/ai-agent/ai-management-governance/ai-governance-analyst', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-policy-advisor', uid: 'ktx-aimg-ai-policy-advisor', title: 'AI Policy Advisor', route: '/ai-agent/ai-management-governance/ai-policy-advisor', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-risk-assessor', uid: 'ktx-aimg-ai-risk-assessor', title: 'AI Risk Assessor', route: '/ai-agent/ai-management-governance/ai-risk-assessor', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-quality-assurance', uid: 'ktx-aimg-ai-quality-assurance', title: 'AI Quality Assurance', route: '/ai-agent/ai-management-governance/ai-quality-assurance', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-performance-monitor', uid: 'ktx-aimg-ai-performance-monitor', title: 'AI Performance Monitor', route: '/ai-agent/ai-management-governance/ai-performance-monitor', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-security-engineer', uid: 'ktx-aimg-ai-security-engineer', title: 'AI Security Engineer', route: '/ai-agent/ai-management-governance/ai-security-engineer', color: '#1E88E5', level: 'team_lead', efficiency: '92%' },
  { id: 'ai-ai-ethics-consultant', uid: 'ktx-aimg-ai-ethics-consultant', title: 'AI Ethics Consultant', route: '/ai-agent/ai-management-governance/ai-ethics-consultant', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-compliance-auditor', uid: 'ktx-aimg-ai-compliance-auditor', title: 'AI Compliance Auditor', route: '/ai-agent/ai-management-governance/ai-compliance-auditor', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-governance-coordinator', uid: 'ktx-aimg-ai-governance-coordinator', title: 'AI Governance Coordinator', route: '/ai-agent/ai-management-governance/ai-governance-coordinator', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-policy-developer', uid: 'ktx-aimg-ai-policy-developer', title: 'AI Policy Developer', route: '/ai-agent/ai-management-governance/ai-policy-developer', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-risk-coordinator', uid: 'ktx-aimg-ai-risk-coordinator', title: 'AI Risk Coordinator', route: '/ai-agent/ai-management-governance/ai-risk-coordinator', color: '#1E88E5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ai-quality-controller', uid: 'ktx-aimg-ai-quality-controller', title: 'AI Quality Controller', route: '/ai-agent/ai-management-governance/ai-quality-controller', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-performance-optimizer', uid: 'ktx-aimg-ai-performance-optimizer', title: 'AI Performance Optimizer', route: '/ai-agent/ai-management-governance/ai-performance-optimizer', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-security-administrator', uid: 'ktx-aimg-ai-security-administrator', title: 'AI Security Administrator', route: '/ai-agent/ai-management-governance/ai-security-administrator', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-ethics-reviewer', uid: 'ktx-aimg-ai-ethics-reviewer', title: 'AI Ethics Reviewer', route: '/ai-agent/ai-management-governance/ai-ethics-reviewer', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-compliance-reviewer', uid: 'ktx-aimg-ai-compliance-reviewer', title: 'AI Compliance Reviewer', route: '/ai-agent/ai-management-governance/ai-compliance-reviewer', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-governance-reviewer', uid: 'ktx-aimg-ai-governance-reviewer', title: 'AI Governance Reviewer', route: '/ai-agent/ai-management-governance/ai-governance-reviewer', color: '#1E88E5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ai-policy-implementer', uid: 'ktx-aimg-ai-policy-implementer', title: 'AI Policy Implementer', route: '/ai-agent/ai-management-governance/ai-policy-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-risk-implementer', uid: 'ktx-aimg-ai-risk-implementer', title: 'AI Risk Implementer', route: '/ai-agent/ai-management-governance/ai-risk-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-quality-implementer', uid: 'ktx-aimg-ai-quality-implementer', title: 'AI Quality Implementer', route: '/ai-agent/ai-management-governance/ai-quality-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-performance-implementer', uid: 'ktx-aimg-ai-performance-implementer', title: 'AI Performance Implementer', route: '/ai-agent/ai-management-governance/ai-performance-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-security-implementer', uid: 'ktx-aimg-ai-security-implementer', title: 'AI Security Implementer', route: '/ai-agent/ai-management-governance/ai-security-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-ethics-implementer', uid: 'ktx-aimg-ai-ethics-implementer', title: 'AI Ethics Implementer', route: '/ai-agent/ai-management-governance/ai-ethics-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-compliance-implementer', uid: 'ktx-aimg-ai-compliance-implementer', title: 'AI Compliance Implementer', route: '/ai-agent/ai-management-governance/ai-compliance-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-governance-implementer', uid: 'ktx-aimg-ai-governance-implementer', title: 'AI Governance Implementer', route: '/ai-agent/ai-management-governance/ai-governance-implementer', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-policy-trainer', uid: 'ktx-aimg-ai-policy-trainer', title: 'AI Policy Trainer', route: '/ai-agent/ai-management-governance/ai-policy-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-risk-trainer', uid: 'ktx-aimg-ai-risk-trainer', title: 'AI Risk Trainer', route: '/ai-agent/ai-management-governance/ai-risk-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-ai-quality-trainer', uid: 'ktx-aimg-ai-quality-trainer', title: 'AI Quality Trainer', route: '/ai-agent/ai-management-governance/ai-quality-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ai-performance-trainer', uid: 'ktx-aimg-ai-performance-trainer', title: 'AI Performance Trainer', route: '/ai-agent/ai-management-governance/ai-performance-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-ai-security-trainer', uid: 'ktx-aimg-ai-security-trainer', title: 'AI Security Trainer', route: '/ai-agent/ai-management-governance/ai-security-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ai-ethics-trainer', uid: 'ktx-aimg-ai-ethics-trainer', title: 'AI Ethics Trainer', route: '/ai-agent/ai-management-governance/ai-ethics-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-ai-governance-trainer', uid: 'ktx-aimg-ai-governance-trainer', title: 'AI Governance Trainer', route: '/ai-agent/ai-management-governance/ai-governance-trainer', color: '#1E88E5', level: 'team_lead', efficiency: '87%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="ai-management-governance"
      agents={agents}
    />
  );
}
