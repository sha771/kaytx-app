import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'roi-analysis',
    name: 'ROI & Profitability Analysis AI',
    title: 'Performance & Analytics',
    description: 'Analyzes ROI, profitability margins, and financial performance across all initiatives.',
    capabilities: ["ROI Analysis","Profitability Tracking","Financial Performance"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 859,
      responseTime: '0.5s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
