import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-frontend-developer',
    name: 'ai-frontend-developer',
    title: 'ai-frontend-developer',
    description: 'The ai-frontend-developer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'ai-frontend-developer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1442,
      responseTime: '0.8s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Tech',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
