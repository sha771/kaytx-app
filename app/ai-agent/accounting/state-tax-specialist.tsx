import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Map } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'state-tax-specialist',
    name: 'State Tax Specialist',
    title: 'State Tax Specialist',
    description: 'The State Tax Specialist AI manages multi-state tax compliance, filings, and nexus determination for businesses operating across states.',
    capabilities: ["Multi-State Tax Compliance","State Tax Filing","Nexus Analysis","State Tax Planning","Apportionment"],
    icon: Map,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.8k/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'State Tax Accountant',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 978,
      responseTime: '2.1s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
    complianceFeatures: ['State Tax Laws', 'Nexus Compliance', 'Multi-State Filing'],
  };
  return <AgentPageWrapper agent={agent} />;
}
