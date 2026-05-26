import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-governance-risk-enterprise',
    name: 'vp-governance-risk-enterprise',
    title: 'vp-governance-risk-enterprise',
    description: 'The vp-governance-risk-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$239k/year',
    aiCost: '$4k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'vp-governance-risk-enterprise',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 623,
      responseTime: '0.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Security',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
