import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-tax-coordinator',
    name: 'AI Adaptive Tax Coordinator',
    title: 'Adaptive Tax Coordinator',
    description: 'Tax coordination and workflow management with adaptive AI',
    capabilities: ["Tax Coordination","Workflow Management","Team Coordination","Process Optimization"],
    icon: Layout,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$92k/year',
    aiCost: '$2.4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4k',
      tasksAutomatedDaily: 298,
      responseTime: '0.6s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
