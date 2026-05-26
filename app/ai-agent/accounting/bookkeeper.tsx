import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Book } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bookkeeper',
    name: 'bookkeeper',
    title: 'bookkeeper',
    description: 'The bookkeeper AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Book,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'bookkeeper',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1156,
      responseTime: '1.4s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
