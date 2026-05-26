import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-digital',
    name: 'vp-digital',
    title: 'vp-digital',
    description: 'The vp-digital AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$178k/year',
    aiCost: '$3k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'vp-digital',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 611,
      responseTime: '0.4s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
