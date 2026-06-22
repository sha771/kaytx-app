import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-marketer',
    name: 'ai-product-marketer',
    title: 'ai-product-marketer',
    description: 'The ai-product-marketer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$74k/year',
    aiCost: '$1k/year',
    efficiency: '74x efficiency improvement',
    replacesRole: 'ai-product-marketer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1040,
      responseTime: '0.9s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
