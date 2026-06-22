import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cohort',
    name: 'cohort',
    title: 'cohort',
    description: 'The cohort AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'cohort',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1484,
      responseTime: '1.2s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Analytics',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
