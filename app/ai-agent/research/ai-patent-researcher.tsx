import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Microscope } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-patent-researcher',
    name: 'ai-patent-researcher',
    title: 'ai-patent-researcher',
    description: 'The ai-patent-researcher AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Microscope,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'ai-patent-researcher',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 950,
      responseTime: '1.7s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Research',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
