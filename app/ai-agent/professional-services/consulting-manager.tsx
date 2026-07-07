import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-consulting-manager',
    uid: 'ktx-17-consulting-manager',
    name: 'AI Consulting Manager',
    title: 'AI Consulting Manager',
    description: 'AI Consulting Manager leads consulting operations, team coordination, and client delivery for the Professional Services department. This AI agent automates complex consulting workflows, provides intelligent operational insights, and collaborates with other agents to achieve optimal consulting outcomes with maximum efficiency.',
    capabilities: ['Team Coordination', 'Client Delivery', 'Project Oversight', 'Quality Assurance', 'Resource Planning'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,300/mo',
    efficiency: '85% efficiency',
    replacesRole: 'AI Consulting Manager',
    subAgents: [
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' },
      { id: 'ai-analyst', uid: 'ktx-17-analyst', name: 'AI Analyst', title: 'AI Analyst', route: '/ai-agent/professional-services/analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11025',
      tasksAutomatedDaily: 534,
      responseTime: '2.4s',
      accuracyRate: '93.8%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}