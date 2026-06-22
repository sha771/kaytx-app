import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-hr-ops',
    name: 'ai-vp-hr-ops',
    title: 'ai-vp-hr-ops',
    description: 'The ai-vp-hr-ops AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$223k/year',
    aiCost: '$4k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'ai-vp-hr-ops',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 954,
      responseTime: '1.6s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
