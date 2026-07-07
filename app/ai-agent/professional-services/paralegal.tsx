import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-paralegal',
    uid: 'ktx-17-paralegal',
    name: 'AI Paralegal',
    title: 'AI Paralegal',
    description: 'AI Paralegal provides legal support, document preparation, and case management for the Professional Services department. This AI agent automates complex paralegal workflows, provides intelligent legal support insights, and collaborates with other agents to achieve optimal legal support outcomes with maximum efficiency.',
    capabilities: ['Document Preparation', 'Case Management', 'Legal Research Support', 'Filing Management', 'Client Communication'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,300/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Paralegal',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'medium',
    },
    roiMetrics: {
      savingsPerMonth: '$6225',
      tasksAutomatedDaily: 389,
      responseTime: '2.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}