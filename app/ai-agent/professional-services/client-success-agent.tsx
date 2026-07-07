import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-client-success-agent',
    uid: 'ktx-17-client-success-agent',
    name: 'AI Client Success Agent',
    title: 'AI Client Success Agent',
    description: 'AI Client Success Agent leads client communications, relationship management, renewal prediction, and escalation prevention for the Professional Services department. This AI agent automates complex client workflows, provides intelligent relationship insights, and collaborates with other agents to achieve optimal client outcomes with maximum efficiency.',
    capabilities: ['Client Communications', 'Relationship Management', 'Renewal Prediction', 'Escalation Prevention', 'Client Health Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$130k/year',
    aiCost: '$2,600/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Client Success Agent',
    subAgents: [
      { id: 'ai-consulting-manager', uid: 'ktx-17-consulting-manager', name: 'AI Consulting Manager', title: 'AI Consulting Manager', route: '/ai-agent/professional-services/consulting-manager' },
      { id: 'ai-project-manager', uid: 'ktx-17-project-manager', name: 'AI Project Manager', title: 'AI Project Manager', route: '/ai-agent/professional-services/project-manager' },
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' }
    ],
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12575',
      tasksAutomatedDaily: 689,
      responseTime: '1.9s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}