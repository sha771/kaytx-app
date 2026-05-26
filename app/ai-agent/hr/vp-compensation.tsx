import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-compensation',
    name: 'vp-compensation',
    title: 'vp-compensation',
    description: 'The vp-compensation AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$161k/year',
    aiCost: '$3k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'vp-compensation',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1159,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Hr',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
