import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'functional-director-3',
    name: 'Functional Director 3',
    title: 'Director of Human Resources',
    description: 'Directs HR functions, talent management, workforce planning, and employee relations.',
    capabilities: ["HR Direction","Talent Management","Workforce Planning","Employee Relations","Culture Development"],
    icon: Users,
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
      tasksAutomatedDaily: 178,
      responseTime: '0.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
