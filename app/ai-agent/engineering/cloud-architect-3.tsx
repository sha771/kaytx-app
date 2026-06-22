import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cloud-architect-3',
    name: 'Cloud Architect',
    title: 'Cloud Architect',
    description: 'The Cloud Architect AI designs and implements cloud infrastructure strategies, ensuring scalability, security, and cost-efficiency.',
    capabilities: ["Cloud Architecture","Multi-Cloud Strategy","Cost Optimization","Cloud Migration","Infrastructure Design","Cloud Security"],
    icon: Cloud,
    color: '#03A9F4',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$4k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Cloud Architecture',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 920,
      responseTime: '1.3s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
