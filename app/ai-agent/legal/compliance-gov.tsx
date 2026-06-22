import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-gov',
    name: 'compliance-gov',
    title: 'compliance-gov',
    description: 'The compliance-gov AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'compliance-gov',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 788,
      responseTime: '0.9s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Legal',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
