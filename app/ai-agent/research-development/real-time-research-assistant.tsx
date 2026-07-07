import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-research-assistant',
    name: 'AI Real-Time Research Assistant',
    title: 'Real-Time Research Assistant',
    description: 'Real-time research assistance and data analysis with AI',
    capabilities: ["Research Assistance","Data Analysis","Real-Time Support","Knowledge Discovery"],
    icon: Search,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Research Assistant',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9k',
      tasksAutomatedDaily: 345,
      responseTime: '0.5s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
