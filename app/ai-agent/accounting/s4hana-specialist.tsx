import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layers } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 's4hana-specialist',
    name: 'S/4HANA Specialist',
    title: 'S/4HANA Specialist',
    description: 'Specialist in SAP S/4HANA, managing next-generation ERP finance modules and real-time analytics.',
    capabilities: [
      "S/4HANA Finance Management",
      "Real-Time Analytics",
      "Universal Journal",
      "Migration Support",
      "S/4HANA Configuration",
      "Advanced Reporting"
    ],
    icon: Layers,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.8k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'S/4HANA Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.6',
      tasksAutomatedDaily: 2765,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
