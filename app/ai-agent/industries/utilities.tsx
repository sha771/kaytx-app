import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'utilities',
    name: 'Utilities',
    title: 'Automate high-volume outages and billing questions without wait times',
    description: 'The Utilities AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'Automate high-volume outages and billing questions without wait times',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1151,
      responseTime: '1.6s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
