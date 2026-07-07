import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-risk-assessor',
    name: 'AI Adaptive Risk Assessor',
    title: 'Adaptive Risk Assessor',
    description: 'Tax risk assessment and mitigation with adaptive AI capabilities',
    capabilities: ["Risk Assessment","Mitigation Strategies","Risk Analysis","Compliance Risk"],
    icon: AlertTriangle,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Risk Assessor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.8k',
      tasksAutomatedDaily: 234,
      responseTime: '0.9s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
