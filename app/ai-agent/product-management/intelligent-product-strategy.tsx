import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Compass } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-product-strategy',
    name: 'AI Intelligent Product Strategy',
    title: 'Intelligent Product Strategy',
    description: 'Product strategy development and execution with intelligent AI',
    capabilities: ["Product Strategy","Strategic Planning","Market Positioning","Competitive Analysis"],
    icon: Compass,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$140k/year',
    aiCost: '$4.0k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Product Strategist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11.3k',
      tasksAutomatedDaily: 156,
      responseTime: '1.4s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
