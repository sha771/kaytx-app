import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ceo',
    name: 'ceo',
    title: 'ceo',
    description: 'The ceo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Crown,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$3k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'ceo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 542,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
