import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Copy } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'copy-trading',
    name: 'Copy Trading',
    title: 'Copy Trading',
    description: 'The Copy Trading AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: Copy,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Copy Trading',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1005,
      responseTime: '1.0s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'AI Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
