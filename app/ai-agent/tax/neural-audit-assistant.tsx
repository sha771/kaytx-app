import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-audit-assistant',
    name: 'AI Neural Audit Assistant',
    title: 'Neural Audit Assistant',
    description: 'Tax audit preparation and support with neural AI capabilities',
    capabilities: ["Audit Preparation","Documentation Support","Risk Assessment","Response Coordination"],
    icon: AlertTriangle,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Audit Assistant',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 245,
      responseTime: '0.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
