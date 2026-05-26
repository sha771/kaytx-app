import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ops-manager',
    name: 'ops-manager',
    title: 'ops-manager',
    description: 'The ops-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$67k/year',
    aiCost: '$1k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'ops-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 690,
      responseTime: '1.5s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
