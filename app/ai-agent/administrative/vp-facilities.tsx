import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-facilities',
    name: 'vp-facilities',
    title: 'vp-facilities',
    description: 'The vp-facilities AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#5856D6',
    type: 'employee' as const,
    humanCost: '$186k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-facilities',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 753,
      responseTime: '0.3s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
