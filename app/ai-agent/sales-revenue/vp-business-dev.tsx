import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-business-dev',
    name: 'vp-business-dev',
    title: 'vp-business-dev',
    description: 'The vp-business-dev AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$188k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-business-dev',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 682,
      responseTime: '1.5s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
