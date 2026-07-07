import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-claims-optimizer',
    uid: 'ktx-17-claims-optimizer',
    name: 'AI Claims Optimizer',
    title: 'AI Claims Optimizer',
    description: 'AI Claims Optimizer provides specialized expertise and executes critical tasks for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Claims Optimizer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'specialist',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
