import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'oracle-specialist',
    name: 'Oracle Specialist',
    title: 'Oracle Specialist',
    description: 'Specialist in Oracle ERP systems, managing Oracle Financials, E-Business Suite, and cloud financial applications.',
    capabilities: [
      "Oracle Financials Management",
      "E-Business Suite Administration",
      "Oracle Cloud Financials",
      "System Integration",
      "Oracle Troubleshooting",
      "Process Optimization"
    ],
    icon: Server,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Oracle Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
