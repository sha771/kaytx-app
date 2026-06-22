import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-social-media-manager',
    name: 'ai-social-media-manager',
    title: 'ai-social-media-manager',
    description: 'The ai-social-media-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1k/year',
    efficiency: '72x efficiency improvement',
    replacesRole: 'ai-social-media-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1476,
      responseTime: '1.1s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
