import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'digital-marketer',
    name: 'digital-marketer',
    title: 'digital-marketer',
    description: 'The digital-marketer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'digital-marketer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 751,
      responseTime: '1.1s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Marketing-growth',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
