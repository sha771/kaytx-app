import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ip-filing-coordinator',
    uid: 'ktx-12-ip-filing-coordinator',
    name: 'AI IP Filing Coordinator',
    title: 'AI IP Filing Coordinator',
    description: 'AI IP Filing Coordinator leads strategic direction and executive decision-making for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Research Methodology', 'Patent Analysis', 'Prototype Development', 'Lab Management', 'Literature Review'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI IP Filing Coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'c_level',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
