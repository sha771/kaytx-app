import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-proposal-sow-agent',
    uid: 'ktx-17-proposal-sow-agent',
    name: 'AI Proposal & SOW Agent',
    title: 'AI Proposal & SOW Agent',
    description: 'AI Proposal & SOW Agent leads proposal generation, SOW creation, pricing recommendations, and scope validation for the Professional Services department. This AI agent automates complex proposal workflows, provides intelligent pricing insights, and collaborates with other agents to achieve optimal win rates with maximum efficiency.',
    capabilities: ['Proposal Generation', 'SOW Creation', 'Pricing Recommendations', 'Scope Validation', 'Win Rate Optimization'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2,500/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Proposal & SOW Agent',
    subAgents: [
      { id: 'ai-consulting-manager', uid: 'ktx-17-consulting-manager', name: 'AI Consulting Manager', title: 'AI Consulting Manager', route: '/ai-agent/professional-services/consulting-manager' },
      { id: 'ai-attorney', uid: 'ktx-17-attorney', name: 'AI Attorney', title: 'AI Attorney', route: '/ai-agent/professional-services/attorney' },
      { id: 'ai-analyst', uid: 'ktx-17-analyst', name: 'AI Analyst', title: 'AI Analyst', route: '/ai-agent/professional-services/analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12042',
      tasksAutomatedDaily: 612,
      responseTime: '2.1s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}