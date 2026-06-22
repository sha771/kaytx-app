import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-claims-adjuster',
    name: 'ai-claims-adjuster',
    title: 'ai-claims-adjuster',
    description: 'The ai-claims-adjuster AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1k/year',
    efficiency: '90x efficiency improvement',
    replacesRole: 'ai-claims-adjuster',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1459,
      responseTime: '0.7s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
