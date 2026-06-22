import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-warehouse-engineer',
    name: 'Data Warehouse Engineer',
    title: 'Engineering',
    description: 'The Data Warehouse Engineer designs and maintains data warehouses using Snowflake, Redshift, and BigQuery.',
    capabilities: ["Data Warehouse Design","Snowflake Development","Redshift Architecture","BigQuery Optimization","Schema Modeling","Data Modeling"],
    icon: Database,
    color: '#37474F',
    type: 'agent' as const,
    humanCost: '$112k/year',
    aiCost: '$1k/year',
    efficiency: '112x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 754,
      responseTime: '0.9s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
