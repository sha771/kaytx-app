import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'network-monitor',
    name: 'AI Network Monitor',
    title: 'IT & Technology',
    description: 'Monitors network performance, identifies issues, and ensures network reliability.',
    capabilities: ["Network Monitoring","Issue Identification","Reliability Assurance"],
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
      tasksAutomatedDaily: 1173,
      responseTime: '1.4s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'It',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
