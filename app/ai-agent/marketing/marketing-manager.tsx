import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-marketing-manager',
    uid: 'ktx-03-marketing-manager',
    name: 'AI Marketing Manager',
    title: 'AI Marketing Manager',
    description: 'AI Marketing Manager manages team operations and ensures delivery excellence for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Brand Management', 'Growth Hacking', 'A/B Testing', 'Marketing Automation', 'Campaign Management'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Marketing Manager',
    subAgents: [
      { id: 'ai-brand-perception-monitor', uid: 'ktx-03-brand-perception-monitor', name: 'AI Brand Perception Monitor', title: 'AI Brand Perception Monitor', route: '/ai-agent/marketing/brand-perception-monitor' },
      { id: 'ai-blog-writer', uid: 'ktx-03-blog-writer', name: 'AI Blog Writer', title: 'AI Blog Writer', route: '/ai-agent/marketing/blog-writer' },
      { id: 'ai-attribution-modeler', uid: 'ktx-03-attribution-modeler', name: 'AI Attribution Modeler', title: 'AI Attribution Modeler', route: '/ai-agent/marketing/attribution-modeler' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'manager',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
