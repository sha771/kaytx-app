import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-product-owner',
    name: 'AI Cognitive Product Owner',
    title: 'Cognitive Product Owner',
    description: 'Intelligent product owner assistance and decision support with AI',
    capabilities: ["Product Ownership","Decision Support","Strategic Planning","Product Vision"],
    icon: Shield,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$130k/year',
    aiCost: '$3.6k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Product Owner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.5k',
      tasksAutomatedDaily: 172,
      responseTime: '1.3s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
