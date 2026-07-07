import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-government-compliance',
    name: 'ai-government-compliance',
    title: 'ai-government-compliance',
    description: 'The ai-government-compliance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'ai-government-compliance',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1276,
      responseTime: '1.2s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Government',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
