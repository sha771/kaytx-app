import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-insight-synthesizer',
    uid: 'ktx-10-insight-synthesizer',
    name: 'AI Insight Synthesizer',
    title: 'AI Insight Synthesizer',
    description: 'AI Insight Synthesizer provides specialized expertise and executes critical tasks for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Stakeholder Management', 'Product Roadmapping', 'Feature Prioritization', 'User Research'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Insight Synthesizer',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'specialist',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
