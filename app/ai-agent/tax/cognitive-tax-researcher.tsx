import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Search } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-tax-researcher',
    name: 'AI Cognitive Tax Researcher',
    title: 'Cognitive Tax Researcher',
    description: 'Tax law research and interpretation with cognitive AI capabilities',
    capabilities: ["Tax Research","Law Interpretation","Regulatory Analysis","Knowledge Management"],
    icon: Search,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.4k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Tax Researcher',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3k',
      tasksAutomatedDaily: 267,
      responseTime: '0.8s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
