import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'safety-manager',
    name: 'safety-manager',
    title: 'safety-manager',
    description: 'The safety-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$1k/year',
    efficiency: '74x efficiency improvement',
    replacesRole: 'safety-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 964,
      responseTime: '1.8s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
