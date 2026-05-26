import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'aod-lead',
    name: 'aod-lead',
    title: 'aod-lead',
    description: 'The aod-lead AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$59k/year',
    aiCost: '$1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'aod-lead',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 849,
      responseTime: '1.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
