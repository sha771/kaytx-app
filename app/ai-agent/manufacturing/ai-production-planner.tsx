import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-production-planner',
    name: 'ai-production-planner',
    title: 'ai-production-planner',
    description: 'The ai-production-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'ai-production-planner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1189,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
