import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-email-marketing',
    name: 'ai-email-marketing',
    title: 'ai-email-marketing',
    description: 'The ai-email-marketing AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Megaphone,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'ai-email-marketing',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1261,
      responseTime: '0.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
