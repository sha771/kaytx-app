import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-rep',
    name: 'Ai Sales Rep',
    title: 'Ai Sales Rep',
    description: 'The Ai Sales Rep AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: DollarSign,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Sales Rep',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 612,
      responseTime: '1.2s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'AI Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
