import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-public-sector-strategy-advisor',
    uid: 'ktx-20-public-sector-strategy-advisor',
    name: 'AI Public Sector Strategy Advisor',
    title: 'AI Public Sector Strategy Advisor',
    description: 'AI Public Sector Strategy Advisor leads strategic direction and executive decision-making for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Public Sector Strategy Advisor',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8521',
      tasksAutomatedDaily: 759,
      responseTime: '0.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'c_level',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
