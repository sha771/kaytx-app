import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Grid } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-modeling-specialist',
    name: 'Financial Modeling Specialist',
    title: 'Financial Modeling Specialist',
    description: 'Specialist building complex financial models for decision support, valuation, and strategic planning.',
    capabilities: [
      "Financial Model Development",
      "Scenario Modeling",
      "Sensitivity Analysis",
      "Valuation Modeling",
      "Model Maintenance",
      "Model Documentation"
    ],
    icon: Grid,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Financial Modeling Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
