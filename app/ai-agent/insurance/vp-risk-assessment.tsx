import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-risk-assessment',
    name: 'vp-risk-assessment',
    title: 'vp-risk-assessment',
    description: 'The vp-risk-assessment AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$186k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'vp-risk-assessment',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 1203,
      responseTime: '0.3s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
