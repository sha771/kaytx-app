import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { SearchCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'internal-auditor',
    name: 'Internal Auditor',
    title: 'Internal Auditor',
    description: 'Internal auditor evaluating and improving organizational risk management, control processes, and governance systems.',
    capabilities: [
      "Internal Control Assessment",
      "Risk Evaluation",
      "Process Improvement Recommendations",
      "Compliance Testing",
      "Operational Audits",
      "Audit Report Generation"
    ],
    icon: SearchCheck,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1.2k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Internal Auditor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
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
