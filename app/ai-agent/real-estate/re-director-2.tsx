import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 're-director-2',
    uid: 'ktx-15-re-director-2',
    name: 'Real Estate Director 2',
    title: 'Director of Commercial Real Estate',
    description: 'Director of Commercial Real Estate oversees commercial properties, leasing, and tenant relationships.',
    capabilities: ['Commercial Properties', 'Leasing Management', 'Tenant Relations', 'Property Development', 'Revenue Optimization'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$160k/year',
    aiCost: '$3,200/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Real Estate Director',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12,800',
      tasksAutomatedDaily: 515,
      responseTime: '2.1s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
