import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-workflow-automation',
    name: 'ai-workflow-automation',
    title: 'ai-workflow-automation',
    description: 'The ai-workflow-automation AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1k/year',
    efficiency: '72x efficiency improvement',
    replacesRole: 'ai-workflow-automation',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1037,
      responseTime: '1.8s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
