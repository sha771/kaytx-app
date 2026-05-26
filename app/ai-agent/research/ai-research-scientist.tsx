import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Microscope } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-research-scientist',
    name: 'ai-research-scientist',
    title: 'ai-research-scientist',
    description: 'The ai-research-scientist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Microscope,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'ai-research-scientist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 697,
      responseTime: '1.4s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Research',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
