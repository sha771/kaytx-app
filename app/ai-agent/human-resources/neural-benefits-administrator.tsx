import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-benefits-administrator',
    name: 'AI Neural Benefits Administrator',
    title: 'Neural Benefits Administrator',
    description: 'Benefits administration and management with neural AI',
    capabilities: ["Benefits Administration","Management","Neural AI","Employee Benefits"],
    icon: Shield,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$92k/year',
    aiCost: '$2.4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Benefits Administrator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.5k',
      tasksAutomatedDaily: 323,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
