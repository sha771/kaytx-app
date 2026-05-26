import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-admin-operations',
    name: 'vp-admin-operations',
    title: 'vp-admin-operations',
    description: 'The vp-admin-operations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#5856D6',
    type: 'employee' as const,
    humanCost: '$249k/year',
    aiCost: '$4k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-admin-operations',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 835,
      responseTime: '0.5s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
