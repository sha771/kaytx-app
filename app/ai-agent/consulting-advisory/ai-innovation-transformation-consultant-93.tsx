import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartBarBig } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-innovation-transformation-consultant',
    name: 'AI Innovation Transformation Consultant',
    title: 'Innovation Transformation Consultant',
    description: 'AI Innovation Transformation Consultant - Innovation Transformation Consultant level AI agent in the consulting advisory department. Part of the Kaytx AI Workforce hierarchy providing specialized consulting advisory capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: ChartBarBig,
    color: 'hsl(201, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Innovation Transformation Consultant',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'consulting advisory',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
