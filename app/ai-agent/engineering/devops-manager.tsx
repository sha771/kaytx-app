import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'devops-manager',
    name: 'DevOps Manager',
    title: 'Engineering',
    description: 'The DevOps Manager AI coordinates team operations, streamlines workflows, and ensures quality delivery within the Engineering department.',
    capabilities: ["Software Development","System Architecture","DevOps & CI/CD","Quality Assurance","Security Engineering","Infrastructure Management"],
    icon: User,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 773,
      responseTime: '1.6s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
