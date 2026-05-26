import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-facilities-admin',
    name: 'vp-facilities-admin',
    title: 'vp-facilities-admin',
    description: 'The vp-facilities-admin AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$206k/year',
    aiCost: '$4k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'vp-facilities-admin',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 533,
      responseTime: '1.2s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
