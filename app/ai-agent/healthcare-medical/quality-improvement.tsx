import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'quality-improvement',
    name: 'quality-improvement',
    title: 'quality-improvement',
    description: 'The quality-improvement AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'quality-improvement',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 979,
      responseTime: '1.0s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
