import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-tenant-relations',
    name: 'ai-tenant-relations',
    title: 'ai-tenant-relations',
    description: 'The ai-tenant-relations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#8BC34A',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'ai-tenant-relations',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1275,
      responseTime: '1.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Realestate',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
