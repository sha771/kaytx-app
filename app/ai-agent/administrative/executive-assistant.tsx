import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-executive-assistant',
    uid: 'ktx-13-executive-assistant',
    name: 'AI Executive Assistant',
    title: 'AI Executive Assistant',
    description: 'AI Executive Assistant coordinates team activities and ensures quality output for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling', 'Office Management'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Executive Assistant',
    subAgents: [
      { id: 'ai-office-budget-controller', uid: 'ktx-13-office-budget-controller', name: 'AI Office Budget Controller', title: 'AI Office Budget Controller', route: '/ai-agent/administrative/office-budget-controller' },
      { id: 'ai-visitor-host', uid: 'ktx-13-visitor-host', name: 'AI Visitor Host', title: 'AI Visitor Host', route: '/ai-agent/administrative/visitor-host' },
      { id: 'ai-visa-documenter', uid: 'ktx-13-visa-documenter', name: 'AI Visa Documenter', title: 'AI Visa Documenter', route: '/ai-agent/administrative/visa-documenter' }
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
