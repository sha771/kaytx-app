import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'valuation-director-2',
    uid: 'ktx-15-valuation-director-2',
    name: 'Valuation Director 2',
    title: 'Director of Commercial Valuation',
    description: 'Director of Commercial Valuation manages commercial property valuations, commercial appraisal, and commercial value assessment.',
    capabilities: ['Commercial Valuation', 'Commercial Appraisal', 'Value Assessment', 'Market Comparison', 'Income Analysis'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3,000/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Valuation Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,867',
      tasksAutomatedDaily: 502,
      responseTime: '2.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
