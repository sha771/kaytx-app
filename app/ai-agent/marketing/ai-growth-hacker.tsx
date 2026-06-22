import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Rocket } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-growth-hacker',
    name: 'ai-growth-hacker',
    title: 'ai-growth-hacker',
    description: 'The ai-growth-hacker AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Rocket,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'ai-growth-hacker',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
