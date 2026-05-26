import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-experience',
    name: 'vp-experience',
    title: 'vp-experience',
    description: 'The vp-experience AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$3k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'vp-experience',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 1407,
      responseTime: '0.5s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Customer',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
