import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'policy-manager',
    name: 'policy-manager',
    title: 'policy-manager',
    description: 'The policy-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'policy-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 524,
      responseTime: '1.0s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
