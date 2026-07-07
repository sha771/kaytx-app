import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-costing-hub',
    name: 'AI Neural Costing Hub',
    title: 'Neural Costing Hub',
    description: 'Central costing coordination and management system with AI',
    capabilities: ["Costing Coordination","Management Hub","Financial Control","Process Optimization"],
    icon: Briefcase,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$118k/year',
    aiCost: '$3.2k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Costing Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.5k',
      tasksAutomatedDaily: 194,
      responseTime: '1.0s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
