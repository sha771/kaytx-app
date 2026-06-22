import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Church } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exempt-organizations-specialist',
    name: 'Exempt Organizations Specialist',
    title: 'Exempt Organizations Specialist',
    description: 'Specialist in tax-exempt organization compliance, Form 990 preparation, and nonprofit accounting.',
    capabilities: [
      "Tax-Exempt Compliance",
      "Form 990 Preparation",
      "Nonprofit Accounting",
      "Unrelated Business Income",
      "Public Support Test",
      "Exemption Application Support"
    ],
    icon: Church,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1.2k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Exempt Organizations Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.5',
      tasksAutomatedDaily: 2234,
      responseTime: '0.9s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
