import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'backend-dev-1',
    name: 'Backend Developer',
    title: 'Engineering',
    description: 'The Backend Developer AI executes specialized tasks, automates workflows, and delivers consistent high-quality performance within the Engineering department.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 571,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
