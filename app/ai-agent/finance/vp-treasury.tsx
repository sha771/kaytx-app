import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-treasury',
    name: 'vp-treasury',
    title: 'vp-treasury',
    description: 'The vp-treasury AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$244k/year',
    aiCost: '$4k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'vp-treasury',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 1393,
      responseTime: '1.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
