import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-claims',
    name: 'vp-claims',
    title: 'vp-claims',
    description: 'The vp-claims AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$189k/year',
    aiCost: '$3k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'vp-claims',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1097,
      responseTime: '0.6s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
