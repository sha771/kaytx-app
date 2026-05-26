import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'product-manager-1',
    name: 'product-manager-1',
    title: 'product-manager-1',
    description: 'The product-manager-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$56k/year',
    aiCost: '$1k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'product-manager-1',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 610,
      responseTime: '0.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Product',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
