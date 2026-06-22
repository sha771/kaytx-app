import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-campaign-coordinator',
    uid: 'ktx-03-campaign-coordinator',
    name: 'AI Campaign Coordinator',
    title: 'AI Campaign Coordinator',
    description: 'AI Campaign Coordinator leads strategic direction and executive decision-making for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Marketing Automation', 'Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Campaign Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'c_level',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
