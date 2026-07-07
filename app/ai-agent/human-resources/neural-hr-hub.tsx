import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-hr-hub',
    name: 'AI Neural HR Hub',
    title: 'Neural HR Hub',
    description: 'Central HR coordination and management system with AI',
    capabilities: ["HR Coordination","Management Hub","Human Resources","Process Optimization"],
    icon: Briefcase,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3.1k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'HR Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 201,
      responseTime: '0.9s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
