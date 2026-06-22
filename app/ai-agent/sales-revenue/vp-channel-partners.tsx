import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-channel-partners',
    name: 'vp-channel-partners',
    title: 'vp-channel-partners',
    description: 'The vp-channel-partners AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$214k/year',
    aiCost: '$4k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'vp-channel-partners',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 1026,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
