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
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$172k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'cro',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 525,
      responseTime: '0.5s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
