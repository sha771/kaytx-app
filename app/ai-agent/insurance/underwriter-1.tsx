import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'underwriter-1',
    name: 'underwriter-1',
    title: 'underwriter-1',
    description: 'The underwriter-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'underwriter-1',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 903,
      responseTime: '0.6s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
