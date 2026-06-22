import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-risk-analyst',
    name: 'ai-customer-risk-analyst',
    title: 'ai-customer-risk-analyst',
    description: 'The ai-customer-risk-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'ai-customer-risk-analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 991,
      responseTime: '1.0s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
