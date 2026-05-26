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
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'digital-marketer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 654,
      responseTime: '1.2s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
