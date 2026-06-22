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
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'policy-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1104,
      responseTime: '0.8s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
