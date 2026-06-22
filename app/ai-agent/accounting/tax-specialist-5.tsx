import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-5',
    name: 'Tax Specialist V',
    title: 'Tax Specialist V',
    description: 'Tax specialist focusing on employee benefits taxation, equity compensation, and executive tax planning for HR programs.',
    capabilities: [
      "Benefits Taxation",
      "Equity Compensation Tax",
      "Executive Tax Planning",
      "401(k) Compliance",
      "Stock Option Analysis",
      "Payroll Tax Support"
    ],
    icon: FileText,
    color: '#E3F2FD',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1.4k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'Tax Specialist V',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.5',
      tasksAutomatedDaily: 2420,
      responseTime: '0.8s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
