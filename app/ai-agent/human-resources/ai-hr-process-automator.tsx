import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-hr-process-automator',
    name: 'ai-hr-process-automator',
    title: 'ai-hr-process-automator',
    description: 'The ai-hr-process-automator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$91k/year',
    aiCost: '$1k/year',
    efficiency: '91x efficiency improvement',
    replacesRole: 'ai-hr-process-automator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 613,
      responseTime: '1.7s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
