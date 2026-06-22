import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'manager',
    name: 'manager',
    title: 'manager',
    description: 'The manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 679,
      responseTime: '0.8s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
