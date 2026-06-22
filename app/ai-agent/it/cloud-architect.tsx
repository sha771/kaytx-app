import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Truck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cloud-architect',
    name: 'AI Cloud Architect',
    title: 'IT & Technology',
    description: 'Designs cloud architectures, optimizes cloud costs, and manages cloud resources.',
    capabilities: ["Cloud Architecture","Cost Optimization","Resource Management"],
    icon: Truck,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$64k/year',
    aiCost: '$1k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'IT & Technology',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 998,
      responseTime: '1.4s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'It',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
