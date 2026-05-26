import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cro',
    name: 'cro',
    title: 'cro',
    description: 'The cro AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: TrendingUp,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$199k/year',
    aiCost: '$3k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'cro',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 701,
      responseTime: '1.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
