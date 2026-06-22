import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sun } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'workday-financials-specialist',
    name: 'Workday Financials Specialist',
    title: 'Workday Financials Specialist',
    description: 'Specialist in Workday Financial Management, managing cloud financial modules and integrations.',
    capabilities: [
      "Workday Financial Management",
      "General Ledger Configuration",
      "Reporting & Analytics",
      "Integration Management",
      "Process Automation",
      "User Administration"
    ],
    icon: Sun,
    color: '#F9A825',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Workday Financials Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4',
      tasksAutomatedDaily: 2543,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
