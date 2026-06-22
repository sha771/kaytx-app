import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-warehouse-operator',
    name: 'ai-warehouse-operator',
    title: 'ai-warehouse-operator',
    description: 'The ai-warehouse-operator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$83k/year',
    aiCost: '$1k/year',
    efficiency: '83x efficiency improvement',
    replacesRole: 'ai-warehouse-operator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1258,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Transportation',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
