import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pre-authorization-agent',
    uid: 'ktx-17-pre-authorization-agent',
    name: 'AI Pre-authorization Agent',
    title: 'AI Pre-authorization Agent',
    description: 'AI Pre-authorization Agent provides specialized expertise and executes critical tasks for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Clinical Decision Support', 'Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Pre-authorization Agent',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'specialist',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
