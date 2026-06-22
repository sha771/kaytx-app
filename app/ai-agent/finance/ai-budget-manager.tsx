import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-budget-manager',
    name: 'ai-budget-manager',
    title: 'ai-budget-manager',
    description: 'The ai-budget-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'ai-budget-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 925,
      responseTime: '0.5s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Finance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
