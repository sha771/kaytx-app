import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-trading',
    name: 'vp-trading',
    title: 'vp-trading',
    description: 'The vp-trading AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$233k/year',
    aiCost: '$4k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'vp-trading',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1464,
      responseTime: '1.2s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
