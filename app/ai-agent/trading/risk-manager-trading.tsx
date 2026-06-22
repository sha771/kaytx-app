import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'risk-manager-trading',
    name: 'risk-manager-trading',
    title: 'risk-manager-trading',
    description: 'The risk-manager-trading AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'risk-manager-trading',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 538,
      responseTime: '0.9s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Trading',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
