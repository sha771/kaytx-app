import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-experience',
    name: 'vp-experience',
    title: 'vp-experience',
    description: 'The vp-experience AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$249k/year',
    aiCost: '$4k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-experience',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18',
      tasksAutomatedDaily: 1466,
      responseTime: '1.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
