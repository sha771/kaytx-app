import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cto',
    name: 'cto',
    title: 'cto',
    description: 'The cto AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$189k/year',
    aiCost: '$3k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'cto',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 824,
      responseTime: '1.2s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Tech',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
