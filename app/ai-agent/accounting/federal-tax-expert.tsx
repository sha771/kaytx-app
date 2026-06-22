import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'federal-tax-expert',
    name: 'Federal Tax Expert',
    title: 'Federal Tax Expert',
    description: 'The Federal Tax Expert AI specializes in federal tax compliance, filing, and optimization strategies for businesses.',
    capabilities: ["Federal Tax Compliance","Tax Return Preparation","Tax Planning","IRS Liaison","Tax Credit Optimization"],
    icon: FileText,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Federal Tax Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3',
      tasksAutomatedDaily: 1124,
      responseTime: '1.8s',
      accuracyRate: '99.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
    complianceFeatures: ['IRC Compliance', 'Tax Filing', 'Audit Support'],
  };
  return <AgentPageWrapper agent={agent} />;
}
