import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-content',
    name: 'vp-content',
    title: 'vp-content',
    description: 'The vp-content AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$187k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-content',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 502,
      responseTime: '0.6s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
