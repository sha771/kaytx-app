import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Rocket } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-launch-coordinator',
    name: 'AI Predictive Launch Coordinator',
    title: 'Predictive Launch Coordinator',
    description: 'Predictive product launch coordination and management with AI',
    capabilities: ["Launch Coordination","Product Launch","Go-to-Market","Launch Strategy"],
    icon: Rocket,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$3.5k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Launch Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.1k',
      tasksAutomatedDaily: 178,
      responseTime: '1.1s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
