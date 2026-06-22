import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-locker-manager',
    name: 'AI Locker Manager',
    title: 'Locker Manager',
    description: 'AI Locker Manager - Locker Manager level AI agent in the logistics warehousing department. Part of the Kaytx AI Workforce hierarchy providing specialized logistics warehousing capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: 'hsl(201, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Locker Manager',
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
      department: 'logistics warehousing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
