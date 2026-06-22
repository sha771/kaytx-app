import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sdr',
    name: 'ai-sdr',
    title: 'ai-sdr',
    description: 'The ai-sdr AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$71k/year',
    aiCost: '$1k/year',
    efficiency: '71x efficiency improvement',
    replacesRole: 'ai-sdr',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1398,
      responseTime: '1.7s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Sales',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
