import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-customer-success',
    name: 'vp-customer-success',
    title: 'vp-customer-success',
    description: 'The vp-customer-success AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$211k/year',
    aiCost: '$4k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'vp-customer-success',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 678,
      responseTime: '1.0s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
