import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-catastrophe-modeler',
    uid: 'ktx-16-catastrophe-modeler',
    name: 'AI Catastrophe Modeler',
    title: 'AI Catastrophe Modeler',
    description: 'AI Catastrophe Modeler coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Catastrophe Modeler',
    subAgents: [
      { id: 'ai-exception-approver', uid: 'ktx-16-exception-approver', name: 'AI Exception Approver', title: 'AI Exception Approver', route: '/ai-agent/insurance/exception-approver' },
      { id: 'ai-loss-development-tracker', uid: 'ktx-16-loss-development-tracker', name: 'AI Loss Development Tracker', title: 'AI Loss Development Tracker', route: '/ai-agent/insurance/loss-development-tracker' },
      { id: 'ai-ceding-calculator', uid: 'ktx-16-ceding-calculator', name: 'AI Ceding Calculator', title: 'AI Ceding Calculator', route: '/ai-agent/insurance/ceding-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
