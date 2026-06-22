import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'regional-director-4',
    name: 'Regional Director 4',
    title: 'Regional Director - Southeast',
    description: 'Manages Southeast regional operations, distribution networks, and regional supply chain.',
    capabilities: ["Distribution Management","Supply Chain Coordination","Regional Operations","Network Optimization","Logistics Planning"],
    icon: MapPin,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Regional Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 195,
      responseTime: '0.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
