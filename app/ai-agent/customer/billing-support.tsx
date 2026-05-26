import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'billing-support',
    name: 'billing-support',
    title: 'billing-support',
    description: 'The billing-support AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Headphones,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'billing-support',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1215,
      responseTime: '1.5s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Customer',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
