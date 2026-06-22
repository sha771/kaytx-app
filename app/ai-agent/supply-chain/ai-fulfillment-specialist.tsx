import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-fulfillment-specialist',
    name: 'ai-fulfillment-specialist',
    title: 'ai-fulfillment-specialist',
    description: 'The ai-fulfillment-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'ai-fulfillment-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1473,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Supply-chain',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
