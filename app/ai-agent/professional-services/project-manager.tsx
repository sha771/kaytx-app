import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-project-manager',
    uid: 'ktx-17-project-manager',
    name: 'AI Project Manager',
    title: 'AI Project Manager',
    description: 'AI Project Manager leads project execution, timeline management, and team coordination for the Professional Services department. This AI agent automates complex project workflows, provides intelligent project insights, and collaborates with other agents to achieve optimal project outcomes with maximum efficiency.',
    capabilities: ['Project Execution', 'Timeline Management', 'Team Coordination', 'Budget Tracking', 'Risk Mitigation'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2,200/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Project Manager',
    subAgents: [
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' },
      { id: 'ai-analyst', uid: 'ktx-17-analyst', name: 'AI Analyst', title: 'AI Analyst', route: '/ai-agent/professional-services/analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 87,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10542',
      tasksAutomatedDaily: 567,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}