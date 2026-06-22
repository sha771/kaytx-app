import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-task-coordinator',
    name: 'ai-task-coordinator',
    title: 'ai-task-coordinator',
    description: 'The ai-task-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'ai-task-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 963,
      responseTime: '1.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
