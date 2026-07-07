import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-learning',
    name: 'vp-learning',
    title: 'vp-learning',
    description: 'The vp-learning AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'vp-learning',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 637,
      responseTime: '0.9s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
