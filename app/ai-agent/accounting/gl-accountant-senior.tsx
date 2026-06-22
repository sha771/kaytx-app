import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Book } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'gl-accountant-senior',
    name: 'Senior GL Accountant',
    title: 'Senior GL Accountant',
    description: 'Senior accountant overseeing general ledger operations, complex reconciliations, and mentoring junior GL staff.',
    capabilities: [
      "Advanced GL Management",
      "Complex Reconciliations",
      "Team Leadership",
      "Process Improvement",
      "Technical Accounting Research",
      "Close Process Oversight"
    ],
    icon: Book,
    color: '#004D40',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Senior GL Accountant',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
