import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'product-owner-1',
    name: 'product-owner-1',
    title: 'product-owner-1',
    description: 'The product-owner-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'product-owner-1',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1391,
      responseTime: '0.8s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
