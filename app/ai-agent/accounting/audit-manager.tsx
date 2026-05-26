import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'audit-manager',
    name: 'audit-manager',
    title: 'audit-manager',
    description: 'The audit-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'audit-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 741,
      responseTime: '0.8s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
