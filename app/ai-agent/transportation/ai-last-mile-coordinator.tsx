import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-last-mile-coordinator',
    name: 'ai-last-mile-coordinator',
    title: 'ai-last-mile-coordinator',
    description: 'The ai-last-mile-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'ai-last-mile-coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1476,
      responseTime: '0.3s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Transportation',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
