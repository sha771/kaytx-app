import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'help-desk',
    name: 'AI Help Desk',
    title: 'IT & Technology',
    description: 'Provides IT support, resolves technical issues, and manages help desk tickets.',
    capabilities: ["IT Support","Issue Resolution","Ticket Management"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$1k/year',
    efficiency: '86x efficiency improvement',
    replacesRole: 'IT & Technology',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 954,
      responseTime: '1.3s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'It',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
