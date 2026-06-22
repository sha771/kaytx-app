import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-quality-assurance',
    name: 'ai-quality-assurance',
    title: 'ai-quality-assurance',
    description: 'The ai-quality-assurance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'ai-quality-assurance',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1196,
      responseTime: '0.8s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
