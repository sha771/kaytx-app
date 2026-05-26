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
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$156k/year',
    aiCost: '$3k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'vp-public-engagement',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 913,
      responseTime: '0.5s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
