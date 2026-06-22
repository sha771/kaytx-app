import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-1',
    name: 'Tax Specialist I',
    title: 'Tax Specialist I',
    description: 'Tax specialist focused on federal income tax compliance, provision calculations, and corporate tax return preparation.',
    capabilities: [
      "Federal Tax Compliance",
      "Tax Provision Calculations",
      "Corporate Tax Returns",
      "Tax Accounting",
      "Quarterly Estimates",
      "Extension Filings"
    ],
    icon: FileText,
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.3k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Tax Specialist I',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2250,
      responseTime: '0.9s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
