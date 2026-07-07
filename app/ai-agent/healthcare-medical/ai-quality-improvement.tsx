import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-quality-improvement',
    name: 'ai-quality-improvement',
    title: 'ai-quality-improvement',
    description: 'The ai-quality-improvement AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
    replacesRole: 'ai-quality-improvement',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 858,
      responseTime: '1.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
