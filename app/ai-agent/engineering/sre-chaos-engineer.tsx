import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Zap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sre-chaos-engineer',
    name: 'SRE Chaos Engineer',
    title: 'Engineering',
    description: 'The SRE Chaos Engineer designs and executes chaos engineering experiments to test system resilience.',
    capabilities: ["Chaos Experiments","Fault Injection","Resilience Testing","Failure Analysis","Recovery Validation","Game Day Planning"],
    icon: Zap,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 623,
      responseTime: '1.1s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
