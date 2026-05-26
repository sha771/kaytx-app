import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'production-planner',
    name: 'production-planner',
    title: 'production-planner',
    description: 'The production-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1k/year',
    efficiency: '72x efficiency improvement',
    replacesRole: 'production-planner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1176,
      responseTime: '1.3s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
