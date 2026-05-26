import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'business-intelligence',
    name: 'Business Intelligence AI',
    title: 'Performance & Analytics',
    description: 'Provides comprehensive business intelligence, dashboards, and strategic insights.',
    capabilities: ["Business Intelligence","Dashboard Creation","Strategic Insights"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1034,
      responseTime: '0.3s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Performance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
