import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-document-controller',
    uid: 'ktx-13-document-controller',
    name: 'AI Document Controller',
    title: 'AI Document Controller',
    description: 'AI Document Controller coordinates team activities and ensures quality output for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling', 'Office Management'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Document Controller',
    subAgents: [
      { id: 'ai-safety-compliance-checker', uid: 'ktx-13-safety-compliance-checker', name: 'AI Safety Compliance Checker', title: 'AI Safety Compliance Checker', route: '/ai-agent/administrative/safety-compliance-checker' },
      { id: 'ai-correspondence-drafter', uid: 'ktx-13-correspondence-drafter', name: 'AI Correspondence Drafter', title: 'AI Correspondence Drafter', route: '/ai-agent/administrative/correspondence-drafter' },
      { id: 'ai-access-controller', uid: 'ktx-13-access-controller', name: 'AI Access Controller', title: 'AI Access Controller', route: '/ai-agent/administrative/access-controller' }
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
      department: 'Administrative',
      level: 'team_lead',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
