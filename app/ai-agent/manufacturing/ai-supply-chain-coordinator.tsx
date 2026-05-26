import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-supply-chain-coordinator',
    name: 'ai-supply-chain-coordinator',
    title: 'ai-supply-chain-coordinator',
    description: 'The ai-supply-chain-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'ai-supply-chain-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1124,
      responseTime: '1.4s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
