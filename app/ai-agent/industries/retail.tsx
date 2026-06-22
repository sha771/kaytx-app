import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Box } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'retail',
    name: 'Retail & eCommerce',
    title: 'Manage orders, returns, and product questions quickly',
    description: 'The Retail & eCommerce AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Box,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$64k/year',
    aiCost: '$1k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'Manage orders, returns, and product questions quickly',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1200,
      responseTime: '1.1s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
