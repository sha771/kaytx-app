import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-data',
    name: 'vp-data',
    title: 'vp-data',
    description: 'The vp-data AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$227k/year',
    aiCost: '$4k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'vp-data',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1386,
      responseTime: '1.7s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Data',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
