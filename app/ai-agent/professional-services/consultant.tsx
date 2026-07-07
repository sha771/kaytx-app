import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-consultant',
    uid: 'ktx-17-consultant',
    name: 'AI Consultant',
    title: 'AI Consultant',
    description: 'AI Consultant provides expert consulting services, client analysis, and solution delivery for the Professional Services department. This AI agent automates complex consulting workflows, provides intelligent client insights, and collaborates with other agents to achieve optimal consulting outcomes with maximum efficiency.',
    capabilities: ['Client Analysis', 'Solution Delivery', 'Business Process Review', 'Strategic Planning', 'Change Management'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1,900/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Consultant',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 82,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'medium',
    },
    roiMetrics: {
      savingsPerMonth: '$9075',
      tasksAutomatedDaily: 423,
      responseTime: '2.8s',
      accuracyRate: '92.4%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}