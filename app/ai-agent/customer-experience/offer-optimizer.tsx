import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-offer-optimizer',
    uid: 'ktx-01-offer-optimizer',
    name: 'AI Offer Optimizer',
    title: 'AI Offer Optimizer',
    description: 'AI Offer Optimizer provides specialized expertise and executes critical tasks for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Offer Optimizer',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'specialist',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
