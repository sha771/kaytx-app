import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-logistics-ops',
    name: 'vp-logistics-ops',
    title: 'vp-logistics-ops',
    description: 'The vp-logistics-ops AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$161k/year',
    aiCost: '$3k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'vp-logistics-ops',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 803,
      responseTime: '1.6s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
