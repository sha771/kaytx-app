import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Infinity } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'dynamics-365-specialist',
    name: 'Dynamics 365 Specialist',
    title: 'Dynamics 365 Specialist',
    description: 'Specialist in Microsoft Dynamics 365 Finance & Operations, managing ERP financial processes.',
    capabilities: [
      "D365 Finance Management",
      "General Ledger Configuration",
      "Budgeting & Planning",
      "Power BI Integration",
      "Process Automation",
      "User Training"
    ],
    icon: Infinity,
    color: '#0078D4',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Dynamics 365 Specialist',
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
