import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-project-delivery-agent',
    uid: 'ktx-17-project-delivery-agent',
    name: 'AI Project Delivery Agent',
    title: 'AI Project Delivery Agent',
    description: 'AI Project Delivery Agent leads project planning, task coordination, milestone tracking, and delivery forecasting for the Professional Services department. This AI agent automates complex project workflows, provides intelligent delivery insights, and collaborates with other agents to achieve optimal project outcomes with maximum efficiency.',
    capabilities: ['Project Planning', 'Task Coordination', 'Milestone Tracking', 'Delivery Forecasting', 'Schedule Optimization'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$135k/year',
    aiCost: '$2,700/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Project Delivery Agent',
    subAgents: [
      { id: 'ai-project-manager', uid: 'ktx-17-project-manager', name: 'AI Project Manager', title: 'AI Project Manager', route: '/ai-agent/professional-services/project-manager' },
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' },
      { id: 'ai-analyst', uid: 'ktx-17-analyst', name: 'AI Analyst', title: 'AI Analyst', route: '/ai-agent/professional-services/analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$13025',
      tasksAutomatedDaily: 724,
      responseTime: '1.8s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}