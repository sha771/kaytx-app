import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'warehouse-manager',
    name: 'warehouse-manager',
    title: 'warehouse-manager',
    description: 'The warehouse-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'warehouse-manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1446,
      responseTime: '0.5s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Transportation',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
