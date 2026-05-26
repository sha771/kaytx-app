import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-supply-chain-ops',
    name: 'vp-supply-chain-ops',
    title: 'vp-supply-chain-ops',
    description: 'The vp-supply-chain-ops AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$177k/year',
    aiCost: '$3k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'vp-supply-chain-ops',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 544,
      responseTime: '1.3s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Supply-chain',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
