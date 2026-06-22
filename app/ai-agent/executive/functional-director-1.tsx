import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'functional-director-1',
    name: 'Functional Director 1',
    title: 'Director of Operations',
    description: 'Directs operational functions, process optimization, and operational efficiency initiatives.',
    capabilities: ["Operations Direction","Process Optimization","Efficiency Management","Quality Control","Performance Analytics"],
    icon: Settings,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Functional Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$12k',
      tasksAutomatedDaily: 180,
      responseTime: '0.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
