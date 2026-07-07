import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Compass } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-trend-analysis',
    name: 'AI Predictive Trend Analysis',
    title: 'Predictive Trend Analysis',
    description: 'Predictive trend analysis and market insights with AI',
    capabilities: ["Trend Analysis","Market Insights","Predictive Modeling","Strategic Intelligence"],
    icon: Compass,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Trend Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.3k',
      tasksAutomatedDaily: 256,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
