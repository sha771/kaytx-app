import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smile } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'culture-agent',
    name: 'culture-agent',
    title: 'culture-agent',
    description: 'The culture-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Smile,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$59k/year',
    aiCost: '$1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'culture-agent',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 650,
      responseTime: '0.4s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
