import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'payroll-administrator',
    name: 'Payroll Administrator',
    title: 'Payroll Administrator',
    description: 'Administrator managing payroll systems, employee data, benefits administration, and payroll tax compliance.',
    capabilities: [
      "Payroll System Management",
      "Employee Data Maintenance",
      "Benefits Administration",
      "Payroll Tax Compliance",
      "Payroll System Configuration",
      "Employee Inquiries Support"
    ],
    icon: UserCheck,
    color: '#7B1FA2',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1.2k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Payroll Administrator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.9',
      tasksAutomatedDaily: 1923,
      responseTime: '1.0s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
