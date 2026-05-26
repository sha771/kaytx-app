import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-validator',
    name: 'AI Data Validator',
    title: 'Engineering',
    description: 'The AI Data Validator ensures data quality and integrity across all systems through automated schema validation, anomaly detection, and cross-source reconciliation.',
    capabilities: ["Schema Validation","Data Integrity Checks","ETL Validation","Anomaly Detection","Compliance Validation","Cross-Source Reconciliation"],
    icon: Database,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 808,
      responseTime: '0.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
