import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'operations-manager',
    name: 'operations-manager',
    title: 'operations-manager',
    description: 'The operations-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$93k/year',
    aiCost: '$1k/year',
    efficiency: '93x efficiency improvement',
    replacesRole: 'operations-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 586,
      responseTime: '1.4s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
