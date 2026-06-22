import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-office-manager',
    name: 'ai-office-manager',
    title: 'ai-office-manager',
    description: 'The ai-office-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'ai-office-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1130,
      responseTime: '1.8s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Administrative',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
