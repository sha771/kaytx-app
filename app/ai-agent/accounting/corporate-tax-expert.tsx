import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'corporate-tax-expert',
    name: 'Corporate Tax Expert',
    title: 'Corporate Tax Expert',
    description: 'Specialist in corporate tax planning, compliance, and optimization strategies for complex corporate structures and multinational operations.',
    capabilities: [
      "Corporate Tax Planning",
      "Tax Compliance Management",
      "Transfer Pricing Analysis",
      "Tax Credit Optimization",
      "Corporate Structure Optimization",
      "Tax Audit Support"
    ],
    icon: Building2,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Corporate Tax Expert',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10.2',
      tasksAutomatedDaily: 2890,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
