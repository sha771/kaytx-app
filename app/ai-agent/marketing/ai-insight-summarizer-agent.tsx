import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-insight-summarizer-agent',
    name: 'ai-insight-summarizer-agent',
    title: 'ai-insight-summarizer-agent',
    description: 'The ai-insight-summarizer-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'ai-insight-summarizer-agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 934,
      responseTime: '1.4s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
