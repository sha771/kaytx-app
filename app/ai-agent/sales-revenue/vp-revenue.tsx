import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-revenue',
    name: 'vp-revenue',
    title: 'vp-revenue',
    description: 'The vp-revenue AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$216k/year',
    aiCost: '$4k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'vp-revenue',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16',
      tasksAutomatedDaily: 905,
      responseTime: '1.2s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Sales-revenue',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
