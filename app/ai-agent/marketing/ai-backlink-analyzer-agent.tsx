import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-backlink-analyzer-agent',
    name: 'ai-backlink-analyzer-agent',
    title: 'ai-backlink-analyzer-agent',
    description: 'The ai-backlink-analyzer-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$83k/year',
    aiCost: '$1k/year',
    efficiency: '83x efficiency improvement',
    replacesRole: 'ai-backlink-analyzer-agent',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1368,
      responseTime: '0.5s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
