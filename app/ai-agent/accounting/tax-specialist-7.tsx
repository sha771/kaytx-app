import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-7',
    name: 'Tax Specialist VII',
    title: 'Tax Specialist VII',
    description: 'Tax specialist for exempt organization taxation, non-profit compliance, and tax-exempt status maintenance.',
    capabilities: [
      "Exempt Organization Tax",
      "Non-Profit Compliance",
      "UBIT Analysis",
      "Form 990 Preparation",
      "Exemption Status",
      "Donor Reporting"
    ],
    icon: FileText,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$89k/year',
    aiCost: '$1.4k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Tax Specialist VII',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3',
      tasksAutomatedDaily: 2350,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
