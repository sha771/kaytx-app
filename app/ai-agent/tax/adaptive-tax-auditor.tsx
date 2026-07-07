import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-tax-auditor',
    name: 'AI Adaptive Tax Auditor',
    title: 'Adaptive Tax Auditor',
    description: 'Adaptive tax auditing with intelligent detection capabilities',
    capabilities: ["Tax Auditing","Detection Systems","Analysis","Review"],
    icon: Search,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.8k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Tax Auditor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.3k',
      tasksAutomatedDaily: 245,
      responseTime: '0.9s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
