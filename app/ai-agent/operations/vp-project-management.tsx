import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-project-management',
    name: 'vp-project-management',
    title: 'vp-project-management',
    description: 'The vp-project-management AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$191k/year',
    aiCost: '$3k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'vp-project-management',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 566,
      responseTime: '0.8s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
