import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-sales',
    name: 'vp-sales',
    title: 'vp-sales',
    description: 'The vp-sales AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$226k/year',
    aiCost: '$4k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'vp-sales',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 871,
      responseTime: '0.9s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
