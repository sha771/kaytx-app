import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'frontend-lead',
    name: 'Frontend Lead',
    title: 'Engineering',
    description: 'The Frontend Lead AI coordinates team operations, streamlines workflows, and ensures quality delivery within the Engineering department.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 679,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
