import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-margin-analyzer',
    name: 'AI Predictive Margin Analyzer',
    title: 'Predictive Margin Analyzer',
    description: 'Predictive margin analysis and optimization with AI',
    capabilities: ["Margin Analysis","Predictive Optimization","Financial Intelligence","Profit Management"],
    icon: Scale,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3.1k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Margin Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 201,
      responseTime: '0.9s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
