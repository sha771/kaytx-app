import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-investigation-coordinator',
    uid: 'ktx-16-investigation-coordinator',
    name: 'AI Investigation Coordinator',
    title: 'AI Investigation Coordinator',
    description: 'AI Investigation Coordinator leads strategic direction and executive decision-making for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Investigation Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11836',
      tasksAutomatedDaily: 644,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'c_level',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
