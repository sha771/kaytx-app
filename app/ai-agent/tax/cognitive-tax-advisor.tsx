import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-tax-advisor',
    name: 'AI Cognitive Tax Advisor',
    title: 'Cognitive Tax Advisor',
    description: 'Intelligent tax advisory services with cognitive AI capabilities',
    capabilities: ["Tax Advisory","Strategic Consulting","Decision Support","Expert Guidance"],
    icon: MessageSquare,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$3.5k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Tax Advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.1k',
      tasksAutomatedDaily: 198,
      responseTime: '1.2s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
