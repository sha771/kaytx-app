import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-property-management',
    name: 'vp-property-management',
    title: 'vp-property-management',
    description: 'The vp-property-management AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#8BC34A',
    type: 'employee' as const,
    humanCost: '$173k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'vp-property-management',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 993,
      responseTime: '1.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Realestate',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
