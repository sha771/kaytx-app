import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-property-mgmt',
    name: 'vp-property-mgmt',
    title: 'vp-property-mgmt',
    description: 'The vp-property-mgmt AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#8BC34A',
    type: 'employee' as const,
    humanCost: '$157k/year',
    aiCost: '$3k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'vp-property-mgmt',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 812,
      responseTime: '1.7s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Realestate',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
