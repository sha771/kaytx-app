import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-chief-professional-services-officer', uid: 'ktx-17-chief-professional-services-officer', title: 'AI Chief Professional Services Officer', route: '/ai-agent/professional-services/chief-professional-services-officer', color: '#10B981', level: 'c_level', efficiency: '94%' },
  { id: 'ai-project-delivery-agent', uid: 'ktx-17-project-delivery-agent', title: 'AI Project Delivery Agent', route: '/ai-agent/professional-services/project-delivery-agent', color: '#10B981', level: 'vp_director', efficiency: '91%' },
  { id: 'ai-proposal-sow-agent', uid: 'ktx-17-proposal-sow-agent', title: 'AI Proposal & SOW Agent', route: '/ai-agent/professional-services/proposal-sow-agent', color: '#10B981', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-client-success-agent', uid: 'ktx-17-client-success-agent', title: 'AI Client Success Agent', route: '/ai-agent/professional-services/client-success-agent', color: '#10B981', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-resource-allocation-agent', uid: 'ktx-17-resource-allocation-agent', title: 'AI Resource Allocation Agent', route: '/ai-agent/professional-services/resource-allocation-agent', color: '#10B981', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-risk-management-agent', uid: 'ktx-17-risk-management-agent', title: 'AI Risk Management Agent', route: '/ai-agent/professional-services/risk-management-agent', color: '#10B981', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-consulting-manager', uid: 'ktx-17-consulting-manager', title: 'AI Consulting Manager', route: '/ai-agent/professional-services/consulting-manager', color: '#10B981', level: 'manager', efficiency: '85%' },
  { id: 'ai-project-manager', uid: 'ktx-17-project-manager', title: 'AI Project Manager', route: '/ai-agent/professional-services/project-manager', color: '#10B981', level: 'manager', efficiency: '87%' },
  { id: 'ai-consultant', uid: 'ktx-17-consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant', color: '#10B981', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-analyst', uid: 'ktx-17-analyst', title: 'AI Analyst', route: '/ai-agent/professional-services/analyst', color: '#10B981', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-attorney', uid: 'ktx-17-attorney', title: 'AI Attorney', route: '/ai-agent/professional-services/attorney', color: '#10B981', level: 'manager', efficiency: '90%' },
  { id: 'ai-paralegal', uid: 'ktx-17-paralegal', title: 'AI Paralegal', route: '/ai-agent/professional-services/paralegal', color: '#10B981', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-legal-researcher', uid: 'ktx-17-legal-researcher', title: 'AI Legal Researcher', route: '/ai-agent/professional-services/legal-researcher', color: '#10B981', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-accountant', uid: 'ktx-17-accountant', title: 'AI Accountant', route: '/ai-agent/professional-services/accountant', color: '#10B981', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-auditor', uid: 'ktx-17-auditor', title: 'AI Auditor', route: '/ai-agent/professional-services/auditor', color: '#10B981', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-tax-specialist', uid: 'ktx-17-tax-specialist', title: 'AI Tax Specialist', route: '/ai-agent/professional-services/tax-specialist', color: '#10B981', level: 'team_lead', efficiency: '92%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="professional-services"
      agents={agents}
    />
  );
}