import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sdr',
    name: 'sdr',
    title: 'sdr',
    description: 'The sdr AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'sdr',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1355,
      responseTime: '1.1s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
