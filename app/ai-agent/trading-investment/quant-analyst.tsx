import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'quant-analyst',
    name: 'quant-analyst',
    title: 'quant-analyst',
    description: 'The quant-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'quant-analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 982,
      responseTime: '1.6s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Trading',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
