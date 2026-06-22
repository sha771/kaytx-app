import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GitBranch } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-pipeline-architect',
    name: 'Data Pipeline Architect',
    title: 'Engineering',
    description: 'The Data Pipeline Architect designs and builds scalable data pipelines for data ingestion, transformation, and loading.',
    capabilities: ["Pipeline Design","ETL Architecture","Data Flow","Orchestration","Pipeline Optimization","Data Lineage"],
    icon: GitBranch,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$1k/year',
    efficiency: '115x efficiency improvement',
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
      tasksAutomatedDaily: 778,
      responseTime: '0.9s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
