import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box, Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-owner',
    name: 'ai-product-owner',
    title: 'ai-product-owner',
    description: 'The ai-product-owner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: 'ai-product-owner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1489,
      responseTime: '1.1s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
