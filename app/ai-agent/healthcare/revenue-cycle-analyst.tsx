import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-revenue-cycle-analyst',
    uid: 'ktx-17-revenue-cycle-analyst',
    name: 'AI Revenue Cycle Analyst',
    title: 'AI Revenue Cycle Analyst',
    description: 'AI Revenue Cycle Analyst provides specialized expertise and executes critical tasks for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Revenue Cycle Analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'specialist',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
