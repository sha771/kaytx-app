import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-cost-analyzer',
    name: 'AI Predictive Cost Analyzer',
    title: 'Predictive Cost Analyzer',
    description: 'Predictive cost analysis and forecasting with AI',
    capabilities: ["Cost Analysis","Predictive Forecasting","Financial Modeling","Cost Optimization"],
    icon: Calculator,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Cost Analyst',
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
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
