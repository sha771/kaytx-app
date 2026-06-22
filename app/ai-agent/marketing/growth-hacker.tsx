import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-growth-hacker',
    uid: 'ktx-03-growth-hacker',
    name: 'AI Growth Hacker',
    title: 'AI Growth Hacker',
    description: 'AI Growth Hacker coordinates team activities and ensures quality output for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics', 'Brand Management'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Growth Hacker',
    subAgents: [
      { id: 'ai-repurposing-strategist', uid: 'ktx-03-repurposing-strategist', name: 'AI Repurposing Strategist', title: 'AI Repurposing Strategist', route: '/ai-agent/marketing/repurposing-strategist' },
      { id: 'ai-trend-monitor', uid: 'ktx-03-trend-monitor', name: 'AI Trend Monitor', title: 'AI Trend Monitor', route: '/ai-agent/marketing/trend-monitor' },
      { id: 'ai-acquisition-channel-tester', uid: 'ktx-03-acquisition-channel-tester', name: 'AI Acquisition Channel Tester', title: 'AI Acquisition Channel Tester', route: '/ai-agent/marketing/acquisition-channel-tester' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'team_lead',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
