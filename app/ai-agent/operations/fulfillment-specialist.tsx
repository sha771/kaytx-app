import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'fulfillment-specialist',
    name: 'fulfillment-specialist',
    title: 'fulfillment-specialist',
    description: 'The fulfillment-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'fulfillment-specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 532,
      responseTime: '0.7s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
