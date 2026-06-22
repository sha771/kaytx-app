import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Home } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lease-director-3',
    uid: 'ktx-15-lease-director-3',
    name: 'Lease Director 3',
    title: 'Director of Residential Leasing',
    description: 'Director of Residential Leasing oversees residential leasing, apartment leasing, and residential tenant management.',
    capabilities: ['Residential Leasing', 'Apartment Leasing', 'Tenant Management', 'Lease Administration', 'Renewal Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$140k/year',
    aiCost: '$2,800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'Lease Director',
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,067',
      tasksAutomatedDaily: 482,
      responseTime: '2.4s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
