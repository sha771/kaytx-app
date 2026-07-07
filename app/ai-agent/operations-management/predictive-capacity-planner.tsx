import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gauge } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-capacity-planner',
    name: 'AI Predictive Capacity Planner',
    title: 'Predictive Capacity Planner',
    description: 'Predictive capacity planning and optimization with AI',
    capabilities: ["Capacity Planning","Optimization","Resource Forecasting","Demand Management"],
    icon: Gauge,
    color: '#00695C',
    type: 'employee' as const,
    cost: '$112k/year',
    aiCost: '$3.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Capacity Planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.1k',
      tasksAutomatedDaily: 212,
      responseTime: '0.9s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
