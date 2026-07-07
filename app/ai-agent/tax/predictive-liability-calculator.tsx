import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-liability-calculator',
    name: 'AI Predictive Liability Calculator',
    title: 'Predictive Liability Calculator',
    description: 'Tax liability forecasting and calculation with predictive modeling',
    capabilities: ["Liability Calculation","Forecasting","Predictive Modeling","Tax Estimation"],
    icon: Calculator,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$78k/year',
    aiCost: '$2.0k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Liability Calculator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.3k',
      tasksAutomatedDaily: 389,
      responseTime: '0.4s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
