import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cio',
    name: 'cio',
    title: 'cio',
    description: 'The cio AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Server,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$153k/year',
    aiCost: '$3k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'cio',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 770,
      responseTime: '1.2s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
