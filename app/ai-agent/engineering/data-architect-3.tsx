import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-architect-3',
    name: 'Data Architect',
    title: 'Data Architect',
    description: 'The Data Architect AI designs data infrastructure, implements data governance strategies, and ensures data quality and accessibility.',
    capabilities: ["Data Architecture","Data Modeling","Data Governance","ETL Design","Data Warehousing","Data Pipeline Architecture"],
    icon: Database,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'Data Architecture',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 870,
      responseTime: '1.3s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
