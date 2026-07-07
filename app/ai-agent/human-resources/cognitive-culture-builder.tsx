import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Activity } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-culture-builder',
    name: 'AI Cognitive Culture Builder',
    title: 'Cognitive Culture Builder',
    description: 'Culture building and employee experience with cognitive AI',
    capabilities: ["Culture Building","Employee Experience","Cognitive AI","Organizational Culture"],
    icon: Activity,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Culture Builder',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
