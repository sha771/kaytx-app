import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-ip',
    name: 'vp-ip',
    title: 'vp-ip',
    description: 'The vp-ip AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$183k/year',
    aiCost: '$3k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'vp-ip',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 510,
      responseTime: '0.7s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
