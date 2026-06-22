import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-4',
    name: 'Tax Specialist IV',
    title: 'Tax Specialist IV',
    description: 'Tax specialist dedicated to tax controversy, audit defense, and resolution of tax disputes with regulatory authorities.',
    capabilities: [
      "Tax Audit Defense",
      "Controversy Resolution",
      "Penalty Abatement",
      "Tax Appeals",
      "Settlement Negotiations",
      "Regulatory Correspondence"
    ],
    icon: FileText,
    color: '#BBDEFB',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Tax Specialist IV',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2480,
      responseTime: '0.7s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
