import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-rd-operations',
    name: 'vp-rd-operations',
    title: 'vp-rd-operations',
    description: 'The vp-rd-operations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#673AB7',
    type: 'employee' as const,
    humanCost: '$172k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'vp-rd-operations',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1364,
      responseTime: '1.3s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Research',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
