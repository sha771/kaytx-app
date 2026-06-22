import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-journey-mapper',
    name: 'ai-customer-journey-mapper',
    title: 'ai-customer-journey-mapper',
    description: '{agent.longDescription}',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$89k/year',
    aiCost: '$1k/year',
    efficiency: '89x efficiency improvement',
    replacesRole: 'ai-customer-journey-mapper',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1463,
      responseTime: '0.4s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
