import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-insights-manager-2',
    name: 'Customer Insights Manager',
    title: 'Customer Insights Manager',
    description: 'The Customer Insights Manager AI analyzes customer data, generates actionable insights, and drives data-informed decisions to improve customer experience.',
    capabilities: ["Customer Analytics","Data Analysis","Insight Generation","Reporting","Segmentation Analysis","Predictive Modeling"],
    icon: BarChart3,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$4k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Customer Insights',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 720,
      responseTime: '1.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Customer Experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
