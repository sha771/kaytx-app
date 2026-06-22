import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ifrs-specialist',
    name: 'IFRS Specialist',
    title: 'IFRS Specialist',
    description: 'Specialist in International Financial Reporting Standards, ensuring compliance with IFRS for international reporting.',
    capabilities: [
      "IFRS Compliance Review",
      "IFRS-GAAP Conversion",
      "International Accounting Guidance",
      "IFRS Implementation",
      "Global Reporting Support",
      "IFRS Training"
    ],
    icon: Globe2,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'IFRS Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
