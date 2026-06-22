import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { IDCard } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'payroll-specialist',
    name: 'Payroll Specialist',
    title: 'Payroll Specialist',
    description: 'Specialist processing payroll, calculating wages, managing deductions, and ensuring accurate and timely employee payments.',
    capabilities: [
      "Payroll Processing",
      "Wage Calculation",
      "Deduction Management",
      "Tax Withholding",
      "Payroll Reporting",
      "Employee Payment Coordination"
    ],
    icon: IDCard,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Payroll Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.5',
      tasksAutomatedDaily: 1876,
      responseTime: '1.2s',
      accuracyRate: '99.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
