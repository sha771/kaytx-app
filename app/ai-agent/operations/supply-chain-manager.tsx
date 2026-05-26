import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'supply-chain-manager',
    name: 'supply-chain-manager',
    title: 'supply-chain-manager',
    description: 'The supply-chain-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1k/year',
    efficiency: '93x efficiency improvement',
    replacesRole: 'supply-chain-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 831,
      responseTime: '1.8s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
