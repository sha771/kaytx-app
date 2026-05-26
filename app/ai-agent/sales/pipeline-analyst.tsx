import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'pipeline-analyst',
    name: 'pipeline-analyst',
    title: 'pipeline-analyst',
    description: 'The pipeline-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$67k/year',
    aiCost: '$1k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'pipeline-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1267,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Sales',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
