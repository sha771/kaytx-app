import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-remote-monitor',
    uid: 'ktx-17-remote-monitor',
    name: 'AI Remote Monitor',
    title: 'AI Remote Monitor',
    description: 'AI Remote Monitor provides specialized expertise and executes critical tasks for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning', 'Telemedicine'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Remote Monitor',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'specialist',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
