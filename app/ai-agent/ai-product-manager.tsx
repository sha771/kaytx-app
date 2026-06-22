import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-manager',
    name: 'Ai Product Manager',
    title: 'Ai Product Manager',
    description: 'The Ai Product Manager AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: Package,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Product Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 557,
      responseTime: '1.1s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'AI Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
