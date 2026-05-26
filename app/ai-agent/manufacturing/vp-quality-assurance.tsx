import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-quality-assurance',
    name: 'vp-quality-assurance',
    title: 'vp-quality-assurance',
    description: 'The vp-quality-assurance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$210k/year',
    aiCost: '$4k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'vp-quality-assurance',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 731,
      responseTime: '0.9s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
