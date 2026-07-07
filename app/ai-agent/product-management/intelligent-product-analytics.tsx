import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-product-analytics',
    name: 'AI Intelligent Product Analytics',
    title: 'Intelligent Product Analytics',
    description: 'Product analytics and performance metrics with intelligent AI',
    capabilities: ["Product Analytics","Performance Metrics","Data Analysis","Insights Generation"],
    icon: BarChart3,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Product Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
