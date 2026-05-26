import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Microscope } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'research-lead',
    name: 'research-lead',
    title: 'research-lead',
    description: 'The research-lead AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Microscope,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'research-lead',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 704,
      responseTime: '0.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Research',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
