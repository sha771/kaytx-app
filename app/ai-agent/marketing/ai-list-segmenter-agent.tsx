import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-list-segmenter-agent',
    name: 'ai-list-segmenter-agent',
    title: 'ai-list-segmenter-agent',
    description: 'The ai-list-segmenter-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'ai-list-segmenter-agent',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 786,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
