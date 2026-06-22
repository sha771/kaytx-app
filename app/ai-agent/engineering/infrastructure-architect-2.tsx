import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'infrastructure-architect-2',
    name: 'Infrastructure Architect',
    title: 'Infrastructure Architect',
    description: 'The Infrastructure Architect AI designs infrastructure solutions, oversees system architecture, and ensures scalable and reliable infrastructure.',
    capabilities: ["Infrastructure Design","System Architecture","Scalability Planning","Infrastructure Strategy","Resource Optimization","Disaster Recovery"],
    icon: Server,
    color: '#37474F',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Infrastructure Architecture',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 875,
      responseTime: '1.2s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
