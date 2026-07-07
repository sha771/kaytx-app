import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-hr-compliance-tracker',
    name: 'ai-hr-compliance-tracker',
    title: 'ai-hr-compliance-tracker',
    description: 'The ai-hr-compliance-tracker AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: CheckCircle,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'ai-hr-compliance-tracker',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1168,
      responseTime: '1.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
