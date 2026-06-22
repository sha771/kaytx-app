import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-engineer',
    name: 'AI Data Engineer',
    title: 'Engineering',
    description: 'The AI Data Engineer designs and maintains data pipelines, ETL processes, and data warehouse infrastructure for reliable analytics and reporting.',
    capabilities: ["Data Pipeline Design","ETL/ELT Orchestration","Data Modeling","Data Warehouse Architecture","Streaming Data Processing","Data Governance"],
    icon: Database,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1213,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
