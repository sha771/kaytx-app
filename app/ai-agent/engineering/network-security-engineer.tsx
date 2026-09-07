import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'network-security-engineer',
    name: 'Network Security Engineer',
    title: 'Engineering',
    description: 'The Network Security Engineer protects network infrastructure through firewalls, IDS/IPS, and network monitoring.',
    capabilities: ["Firewall Management","IDS/IPS Configuration","Network Monitoring","VPN Management","Network Segmentation","Access Control"],
    icon: Network,
    color: '#455A64',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1k/year',
    efficiency: '105x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8',
      tasksAutomatedDaily: 712,
      responseTime: '1.0s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
