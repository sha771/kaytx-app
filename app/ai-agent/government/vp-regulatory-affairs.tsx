import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-regulatory-affairs',
    name: 'vp-regulatory-affairs',
    title: 'vp-regulatory-affairs',
    description: 'The vp-regulatory-affairs AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$162k/year',
    aiCost: '$3k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'vp-regulatory-affairs',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1100,
      responseTime: '0.9s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Government',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
