import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'risk-management-analyst',
    name: 'Risk Management Analyst',
    title: 'Risk Management Analyst',
    description: 'Analyst identifying, assessing, and mitigating financial risks including market risk, credit risk, and operational risk.',
    capabilities: [
      "Risk Identification & Assessment",
      "Market Risk Analysis",
      "Credit Risk Evaluation",
      "Operational Risk Management",
      "Risk Reporting",
      "Mitigation Strategy Development"
    ],
    icon: AlertTriangle,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Risk Management Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
