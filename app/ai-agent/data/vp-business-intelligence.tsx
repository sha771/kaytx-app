import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-business-intelligence',
    name: 'vp-business-intelligence',
    title: 'vp-business-intelligence',
    description: 'The vp-business-intelligence AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$180k/year',
    aiCost: '$3k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'vp-business-intelligence',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 809,
      responseTime: '1.5s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Data',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
