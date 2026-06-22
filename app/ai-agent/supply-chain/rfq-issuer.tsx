import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rfq-issuer',
    uid: 'ktx-21-rfq-issuer',
    name: 'AI RFQ Issuer',
    title: 'AI RFQ Issuer',
    description: 'AI RFQ Issuer provides specialized expertise and executes critical tasks for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Logistics Coordination', 'Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization', 'Procurement'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI RFQ Issuer',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3157',
      tasksAutomatedDaily: 321,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'specialist',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
