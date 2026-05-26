import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-product-strategy',
    name: 'vp-product-strategy',
    title: 'vp-product-strategy',
    description: 'The vp-product-strategy AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$192k/year',
    aiCost: '$3k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'vp-product-strategy',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 790,
      responseTime: '1.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Product',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
