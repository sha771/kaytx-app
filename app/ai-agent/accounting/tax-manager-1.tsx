import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-manager-1',
    name: 'Tax Manager I',
    title: 'Tax Manager I',
    description: 'Tax management professional overseeing corporate tax compliance, tax planning strategies, and regulatory filing requirements across jurisdictions.',
    capabilities: [
      "Corporate Tax Compliance",
      "Tax Planning Strategy",
      "Regulatory Filings",
      "Tax Research",
      "Audit Support",
      "Tax Documentation"
    ],
    icon: FileText,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$1.8k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Tax Manager I',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.4',
      tasksAutomatedDaily: 2920,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
