import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-research',
    name: 'vp-research',
    title: 'vp-research',
    description: 'The vp-research AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$221k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'vp-research',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 927,
      responseTime: '0.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Research',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
