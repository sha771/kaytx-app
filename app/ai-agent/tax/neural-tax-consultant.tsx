import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-tax-consultant',
    name: 'AI Neural Tax Consultant',
    title: 'Neural Tax Consultant',
    description: 'Professional tax consulting services with neural AI capabilities',
    capabilities: ["Tax Consulting","Professional Advisory","Strategic Planning","Client Support"],
    icon: Briefcase,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3.0k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Tax Consultant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9k',
      tasksAutomatedDaily: 223,
      responseTime: '1.0s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
