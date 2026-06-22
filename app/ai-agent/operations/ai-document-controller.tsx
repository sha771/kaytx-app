import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-document-controller',
    name: 'ai-document-controller',
    title: 'ai-document-controller',
    description: 'The ai-document-controller AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'ai-document-controller',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 791,
      responseTime: '0.6s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
