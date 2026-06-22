import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-analyst',
    name: 'ai-product-analyst',
    title: 'ai-product-analyst',
    description: 'The ai-product-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'ai-product-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1338,
      responseTime: '1.8s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
