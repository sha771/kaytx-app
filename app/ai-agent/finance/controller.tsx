import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'controller',
    name: 'controller',
    title: 'controller',
    description: 'The controller AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$59k/year',
    aiCost: '$1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'controller',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1294,
      responseTime: '0.5s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
