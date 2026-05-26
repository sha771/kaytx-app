import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-security-ops-enterprise',
    name: 'vp-security-ops-enterprise',
    title: 'vp-security-ops-enterprise',
    description: 'The vp-security-ops-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$189k/year',
    aiCost: '$3k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'vp-security-ops-enterprise',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1368,
      responseTime: '1.0s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Security',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
