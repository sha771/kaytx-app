import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-resource-planner',
    uid: 'ktx-04-resource-planner',
    name: 'AI Resource Planner',
    title: 'AI Resource Planner',
    description: 'AI Resource Planner coordinates team activities and ensures quality output for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quality Assurance', 'Project Management', 'Capacity Planning', 'Vendor Management', 'Operational Analytics'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Resource Planner',
    subAgents: [
      { id: 'ai-compliance-tracker', uid: 'ktx-04-compliance-tracker', name: 'AI Compliance Tracker', title: 'AI Compliance Tracker', route: '/ai-agent/operations/compliance-tracker' },
      { id: 'ai-process-mapper', uid: 'ktx-04-process-mapper', name: 'AI Process Mapper', title: 'AI Process Mapper', route: '/ai-agent/operations/process-mapper' },
      { id: 'ai-defect-logger', uid: 'ktx-04-defect-logger', name: 'AI Defect Logger', title: 'AI Defect Logger', route: '/ai-agent/operations/defect-logger' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Operations & Management',
      level: 'team_lead',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
