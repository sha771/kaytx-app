import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'etl-developer',
    name: 'ETL Developer',
    title: 'Engineering',
    description: 'The ETL Developer builds extract, transform, and load processes for data movement and transformation across systems.',
    capabilities: ["ETL Development","Data Transformation","Data Extraction","Data Loading","SQL Development","Data Mapping"],
    icon: Database,
    color: '#424242',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 634,
      responseTime: '1.1s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
