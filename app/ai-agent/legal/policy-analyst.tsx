import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'policy-analyst',
    name: 'policy-analyst',
    title: 'policy-analyst',
    description: 'The policy-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'policy-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 977,
      responseTime: '0.8s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
