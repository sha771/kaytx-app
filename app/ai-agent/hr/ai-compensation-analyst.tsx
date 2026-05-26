import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-compensation-analyst',
    name: 'ai-compensation-analyst',
    title: 'ai-compensation-analyst',
    description: 'The ai-compensation-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$99k/year',
    aiCost: '$1k/year',
    efficiency: '99x efficiency improvement',
    replacesRole: 'ai-compensation-analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1047,
      responseTime: '1.4s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Hr',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
