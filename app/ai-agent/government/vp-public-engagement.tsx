import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-public-engagement',
    name: 'vp-public-engagement',
    title: 'vp-public-engagement',
    description: 'The vp-public-engagement AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$245k/year',
    aiCost: '$4k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'vp-public-engagement',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 1388,
      responseTime: '1.4s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Government',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
