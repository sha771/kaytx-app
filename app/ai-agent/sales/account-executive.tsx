import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'account-executive',
    name: 'account-executive',
    title: 'account-executive',
    description: 'The account-executive AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: MessageSquare,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'account-executive',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 810,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Sales',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
