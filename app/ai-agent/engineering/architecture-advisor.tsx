import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'architecture-advisor',
    name: 'AI Architecture Advisor',
    title: 'Engineering',
    description: 'Provides software architecture guidance, design patterns, and best practices.',
    capabilities: ["Architecture Guidance","Design Patterns","Best Practices"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1432,
      responseTime: '1.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
