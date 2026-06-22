import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-bi-developer',
    name: 'ai-bi-developer',
    title: 'ai-bi-developer',
    description: 'The ai-bi-developer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'ai-bi-developer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 639,
      responseTime: '1.2s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Data',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
