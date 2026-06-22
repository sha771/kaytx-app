import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'roadmap-planner',
    name: 'roadmap-planner',
    title: 'roadmap-planner',
    description: 'The roadmap-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'roadmap-planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 517,
      responseTime: '0.4s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
