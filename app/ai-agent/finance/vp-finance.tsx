import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-finance',
    name: 'vp-finance',
    title: 'vp-finance',
    description: 'The vp-finance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$152k/year',
    aiCost: '$3k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'vp-finance',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 642,
      responseTime: '1.1s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
