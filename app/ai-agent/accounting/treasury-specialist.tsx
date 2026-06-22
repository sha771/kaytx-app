import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Landmark } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'treasury-specialist',
    name: 'Treasury Specialist',
    title: 'Treasury Specialist',
    description: 'Specialist managing treasury operations, banking relationships, and optimizing working capital.',
    capabilities: [
      "Treasury Operations",
      "Bank Relationship Management",
      "Working Capital Optimization",
      "Debt Management",
      "Treasury Reporting",
      "Cash Pooling"
    ],
    icon: Landmark,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1.2k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Treasury Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.5',
      tasksAutomatedDaily: 2234,
      responseTime: '0.9s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
