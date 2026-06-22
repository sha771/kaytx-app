import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BadgeDollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'payroll-tax-specialist',
    name: 'Payroll Tax Specialist',
    title: 'Payroll Tax Specialist',
    description: 'Specialist managing payroll tax compliance, filings, and reporting across federal, state, and local jurisdictions.',
    capabilities: [
      "Payroll Tax Compliance",
      "Tax Filing Management",
      "Withholding Calculation",
      "Quarterly Reporting",
      "Year-End Tax Forms",
      "Payroll Tax Audits"
    ],
    icon: BadgeDollarSign,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Payroll Tax Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7',
      tasksAutomatedDaily: 2034,
      responseTime: '0.9s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
