import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-talent',
    name: 'ai-vp-talent',
    title: 'ai-vp-talent',
    description: 'The ai-vp-talent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$238k/year',
    aiCost: '$4k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'ai-vp-talent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 532,
      responseTime: '0.4s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
