import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-billing-support',
    name: 'ai-billing-support',
    title: 'ai-billing-support',
    description: 'The ai-billing-support AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Headphones,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'ai-billing-support',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 533,
      responseTime: '1.3s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
