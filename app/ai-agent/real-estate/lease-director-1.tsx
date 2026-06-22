import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lease-director-1',
    uid: 'ktx-15-lease-director-1',
    name: 'Lease Director 1',
    title: 'Director of Leasing',
    description: 'Director of Leasing oversees leasing strategy, lease negotiations, and lease portfolio management.',
    capabilities: ['Leasing Strategy', 'Lease Negotiations', 'Portfolio Management', 'Tenant Relations', 'Revenue Optimization'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$145k/year',
    aiCost: '$2,900/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Lease Director',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,533',
      tasksAutomatedDaily: 490,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
