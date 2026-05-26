import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-logistics-operations',
    name: 'vp-logistics-operations',
    title: 'vp-logistics-operations',
    description: 'The vp-logistics-operations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$163k/year',
    aiCost: '$3k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'vp-logistics-operations',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1190,
      responseTime: '1.7s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Transportation',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
