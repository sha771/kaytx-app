import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-quality-assurance-agent',
    uid: 'ktx-04-quality-assurance-agent',
    name: 'AI Quality Assurance Agent',
    title: 'AI Quality Assurance Agent',
    description: 'AI Quality Assurance Agent coordinates team activities and ensures quality output for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Workflow Automation', 'Quality Assurance', 'Project Management', 'Capacity Planning', 'Vendor Management'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Quality Assurance Agent',
    subAgents: [
      { id: 'ai-space-utilization-analyst', uid: 'ktx-04-space-utilization-analyst', name: 'AI Space Utilization Analyst', title: 'AI Space Utilization Analyst', route: '/ai-agent/operations/space-utilization-analyst' },
      { id: 'ai-automation-rule-builder', uid: 'ktx-04-automation-rule-builder', name: 'AI Automation Rule Builder', title: 'AI Automation Rule Builder', route: '/ai-agent/operations/automation-rule-builder' },
      { id: 'ai-regression-tracker', uid: 'ktx-04-regression-tracker', name: 'AI Regression Tracker', title: 'AI Regression Tracker', route: '/ai-agent/operations/regression-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Operations & Management',
      level: 'team_lead',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
