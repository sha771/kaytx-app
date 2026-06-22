import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'workload',
    name: 'workload',
    title: 'workload',
    description: 'The workload AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$54k/year',
    aiCost: '$1k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'workload',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 631,
      responseTime: '1.6s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Team-management',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
