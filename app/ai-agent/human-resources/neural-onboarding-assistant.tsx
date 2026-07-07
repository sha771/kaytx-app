import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-onboarding-assistant',
    name: 'AI Neural Onboarding Assistant',
    title: 'Neural Onboarding Assistant',
    description: 'Neural onboarding assistance and coordination with AI',
    capabilities: ["Onboarding Assistance","Coordination","Neural AI","Employee Integration"],
    icon: UserCheck,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Onboarding Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9k',
      tasksAutomatedDaily: 356,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
