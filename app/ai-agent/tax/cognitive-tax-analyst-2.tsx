import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-tax-analyst-2',
    name: 'AI Cognitive Tax Analyst II',
    title: 'Cognitive Tax Analyst II',
    description: 'Advanced tax analysis with cognitive AI and deep insights',
    capabilities: ["Advanced Analysis","Deep Insights","Trend Detection","Strategic Analytics"],
    icon: BarChart3,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Senior Tax Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 234,
      responseTime: '0.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
