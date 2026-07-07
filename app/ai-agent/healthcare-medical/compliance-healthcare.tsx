import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'compliance-healthcare',
    name: 'compliance-healthcare',
    title: 'compliance-healthcare',
    description: 'The compliance-healthcare AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'compliance-healthcare',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 732,
      responseTime: '0.9s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Healthcare',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
