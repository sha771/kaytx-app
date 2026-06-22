import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-engineer-2',
    name: 'Data Engineer',
    title: 'Data Engineer',
    description: 'The Data Engineer AI builds data pipelines, manages data infrastructure, and ensures efficient data processing and storage.',
    capabilities: ["Data Pipeline","ETL/ELT","Data Warehousing","Stream Processing","Data Integration","Data Quality"],
    icon: Database,
    color: '#0097A7',
    type: 'employee' as const,
    humanCost: '$140k/year',
    aiCost: '$4k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Data Engineering',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 710,
      responseTime: '1.5s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
