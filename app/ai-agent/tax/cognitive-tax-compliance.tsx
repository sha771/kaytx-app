import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-tax-compliance',
    name: 'AI Cognitive Tax Compliance',
    title: 'Cognitive Tax Compliance',
    description: 'Comprehensive tax compliance management with cognitive AI',
    capabilities: ["Compliance Management","Regulatory Adherence","Risk Mitigation","Audit Support"],
    icon: Shield,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Compliance Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.1k',
      tasksAutomatedDaily: 256,
      responseTime: '0.8s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
