import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smile } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'market-sentiment',
    name: 'Market Sentiment',
    title: 'Market Sentiment',
    description: 'The Market Sentiment AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: Smile,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Market Sentiment',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1088,
      responseTime: '0.4s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'AI Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
