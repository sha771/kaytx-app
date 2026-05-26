import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-transportation',
    name: 'vp-transportation',
    title: 'vp-transportation',
    description: 'The vp-transportation AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$3k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'vp-transportation',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1237,
      responseTime: '1.2s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Transportation',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
