import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-rd-analytics',
    name: 'AI Real-Time R&D Analytics',
    title: 'Real-Time R&D Analytics',
    description: 'Real-time R&D analytics and performance tracking with AI',
    capabilities: ["R&D Analytics","Performance Tracking","Real-Time Insights","Data Visualization"],
    icon: BarChart3,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$92k/year',
    aiCost: '$2.4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'R&D Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.5k',
      tasksAutomatedDaily: 323,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
