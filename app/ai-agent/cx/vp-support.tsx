import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-support',
    name: 'AI VP of Support',
    title: 'VP Customer Support Operations',
    description: 'Manages customer support operations, service delivery, and support team performance. Ensures service excellence and SLA compliance.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$191k/year',
    aiCost: '$3k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'VP Customer Support Operations',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 806,
      responseTime: '0.4s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Cx',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
