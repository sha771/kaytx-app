import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'network-architect-2',
    name: 'Network Architect',
    title: 'Network Architect',
    description: 'The Network Architect AI designs network infrastructure, implements network security, and ensures optimal network performance and reliability.',
    capabilities: ["Network Architecture","Network Security","Network Design","Performance Optimization","Network Monitoring","Connectivity Solutions"],
    icon: Network,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$4k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'Network Architecture',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 830,
      responseTime: '1.4s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
