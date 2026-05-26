import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'complaint-handling',
    name: 'complaint-handling',
    title: 'complaint-handling',
    description: 'The complaint-handling AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'complaint-handling',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 869,
      responseTime: '1.3s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Customer',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
