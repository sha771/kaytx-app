import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-planning-specialist',
    name: 'Tax Planning Specialist',
    title: 'Tax Planning Specialist',
    description: 'Strategic tax planning expert developing tax-efficient structures and strategies to minimize tax liabilities while maintaining compliance.',
    capabilities: [
      "Strategic Tax Planning",
      "Tax Liability Minimization",
      "Tax-Saving Opportunity Analysis",
      "Entity Structure Optimization",
      "Year-Round Tax Planning",
      "Tax Impact Modeling"
    ],
    icon: Lightbulb,
    color: '#F9A825',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Tax Planning Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
