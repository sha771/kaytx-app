import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-cost-optimizer',
    name: 'AI Intelligent Cost Optimizer',
    title: 'Intelligent Cost Optimizer',
    description: 'Intelligent cost optimization and reduction with AI',
    capabilities: ["Cost Optimization","Reduction Strategies","Financial Analysis","Efficiency Improvement"],
    icon: LineChart,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Cost Optimization Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.7k',
      tasksAutomatedDaily: 234,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
