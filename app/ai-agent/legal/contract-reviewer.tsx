import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'contract-reviewer',
    name: 'contract-reviewer',
    title: 'contract-reviewer',
    description: 'The contract-reviewer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'contract-reviewer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 596,
      responseTime: '0.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
