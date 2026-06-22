import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-ai-ml',
    name: 'vp-ai-ml',
    title: 'vp-ai-ml',
    description: 'The vp-ai-ml AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$235k/year',
    aiCost: '$4k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'vp-ai-ml',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1340,
      responseTime: '1.4s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Tech',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
