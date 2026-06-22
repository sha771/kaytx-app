import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-marketing-officer',
    uid: 'ktx-03-chief-marketing-officer',
    name: 'AI Chief Marketing Officer',
    title: 'AI Chief Marketing Officer',
    description: 'AI Chief Marketing Officer leads strategic direction and executive decision-making for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Content Strategy', 'Social Media Analytics', 'Brand Management', 'Growth Hacking', 'A/B Testing'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Chief Marketing Officer',
    subAgents: [
      { id: 'ai-marketing-strategy-analyst', uid: 'ktx-03-marketing-strategy-analyst', name: 'AI Marketing Strategy Analyst', title: 'AI Marketing Strategy Analyst', route: '/ai-agent/marketing/marketing-strategy-analyst' },
      { id: 'ai-digital-channel-optimizer', uid: 'ktx-03-digital-channel-optimizer', name: 'AI Digital Channel Optimizer', title: 'AI Digital Channel Optimizer', route: '/ai-agent/marketing/digital-channel-optimizer' },
      { id: 'ai-list-segmenter', uid: 'ktx-03-list-segmenter', name: 'AI List Segmenter', title: 'AI List Segmenter', route: '/ai-agent/marketing/list-segmenter' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'c_level',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
