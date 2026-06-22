import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cio-advisor',
    name: 'cio-advisor',
    title: 'cio-advisor',
    description: 'The cio-advisor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Server,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'cio-advisor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 523,
      responseTime: '1.6s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
