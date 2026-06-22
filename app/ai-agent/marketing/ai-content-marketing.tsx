import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-content-marketing',
    name: 'ai-content-marketing',
    title: 'ai-content-marketing',
    description: 'The ai-content-marketing AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'ai-content-marketing',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 848,
      responseTime: '0.4s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
