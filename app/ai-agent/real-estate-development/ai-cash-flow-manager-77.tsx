import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-cash-flow-manager',
    name: 'AI Cash Flow Manager',
    title: 'Cash Flow Manager',
    description: 'AI Cash Flow Manager - Cash Flow Manager level AI agent in the real estate-development department. Part of the Kaytx AI Workforce hierarchy providing specialized real estate-development capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: 'hsl(329, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Cash Flow Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'real estate-development',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
