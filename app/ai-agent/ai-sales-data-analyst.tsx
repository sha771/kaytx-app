import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-data-analyst',
    name: 'Ai Sales Data Analyst',
    title: 'Ai Sales Data Analyst',
    description: 'The Ai Sales Data Analyst AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: BarChart3,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Sales Data Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1098,
      responseTime: '0.8s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'AI Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
