import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-recruiter',
    name: 'ai-recruiter',
    title: 'ai-recruiter',
    description: 'The ai-recruiter AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: UserPlus,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$79k/year',
    aiCost: '$1k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'ai-recruiter',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1328,
      responseTime: '0.6s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
