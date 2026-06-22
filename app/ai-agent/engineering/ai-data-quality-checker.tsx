import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-quality-checker',
    name: 'AI Data Quality Checker',
    title: 'Engineering',
    description: 'The AI Data Quality Checker continuously monitors data pipelines for quality issues, schema drift, and anomalies to ensure trustworthy analytics.',
    capabilities: ["Data Profiling","Schema Drift Detection","Completeness Checks","Uniqueness Validation","Referential Integrity","Anomaly Detection"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1118,
      responseTime: '0.9s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
