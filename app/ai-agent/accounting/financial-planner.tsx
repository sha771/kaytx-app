import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-planner',
    name: 'financial-planner',
    title: 'financial-planner',
    description: 'The financial-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$89k/year',
    aiCost: '$1k/year',
    efficiency: '89x efficiency improvement',
    replacesRole: 'financial-planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1109,
      responseTime: '1.4s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
