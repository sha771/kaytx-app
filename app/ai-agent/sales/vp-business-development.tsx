import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-business-development',
    name: 'vp-business-development',
    title: 'vp-business-development',
    description: 'The vp-business-development AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'vp-business-development',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1000,
      responseTime: '1.1s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Sales',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
