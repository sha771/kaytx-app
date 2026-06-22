import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GitBranch } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'api-architect',
    name: 'API Architect',
    title: 'API Architect',
    description: 'The API Architect AI designs API architectures, establishes API standards, and ensures consistent and scalable API implementations.',
    capabilities: ["API Architecture","REST/GraphQL Design","API Documentation","API Security","API Gateway","API Governance"],
    icon: GitBranch,
    color: '#26A69A',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'API Architecture',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 865,
      responseTime: '1.2s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
