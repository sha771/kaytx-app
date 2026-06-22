import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lease-director-2',
    uid: 'ktx-15-lease-director-2',
    name: 'Lease Director 2',
    title: 'Director of Commercial Leasing',
    description: 'Director of Commercial Leasing manages commercial leasing, office leasing, and retail leasing operations.',
    capabilities: ['Commercial Leasing', 'Office Leasing', 'Retail Leasing', 'Space Planning', 'Commercial Tenants'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3,000/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Lease Director',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,933',
      tasksAutomatedDaily: 498,
      responseTime: '2.2s',
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
