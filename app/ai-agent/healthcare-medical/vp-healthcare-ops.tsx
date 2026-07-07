import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-healthcare-ops',
    name: 'vp-healthcare-ops',
    title: 'vp-healthcare-ops',
    description: 'The vp-healthcare-ops AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$3k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'vp-healthcare-ops',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 605,
      responseTime: '0.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
