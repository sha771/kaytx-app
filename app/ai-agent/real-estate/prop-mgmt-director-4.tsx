import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-mgmt-director-4',
    uid: 'ktx-15-prop-mgmt-director-4',
    name: 'Property Management Director 4',
    title: 'Director of Property Finance',
    description: 'Director of Property Finance manages property financial operations, budgeting, and financial performance tracking.',
    capabilities: ['Property Finance', 'Budgeting', 'Financial Performance', 'Cost Management', 'Financial Reporting'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3,000/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Property Management Director',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,867',
      tasksAutomatedDaily: 502,
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
