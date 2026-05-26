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
    humanCost: '$79k/year',
    aiCost: '$1k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'controller',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 862,
      responseTime: '0.5s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
