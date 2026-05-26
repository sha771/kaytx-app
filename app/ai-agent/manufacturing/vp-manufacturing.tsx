import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-manufacturing',
    name: 'vp-manufacturing',
    title: 'vp-manufacturing',
    description: 'The vp-manufacturing AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$231k/year',
    aiCost: '$4k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'vp-manufacturing',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1483,
      responseTime: '0.4s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
