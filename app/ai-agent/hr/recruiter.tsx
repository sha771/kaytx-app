import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'recruiter',
    name: 'recruiter',
    title: 'recruiter',
    description: 'The recruiter AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: UserPlus,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'recruiter',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1388,
      responseTime: '0.4s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Hr',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
