import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-tax-manager',
    name: 'AI Intelligent Tax Manager',
    title: 'Intelligent Tax Manager',
    description: 'Comprehensive tax management with intelligent oversight',
    capabilities: ["Tax Management","Oversight","Coordination","Leadership"],
    icon: Users,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$135k/year',
    aiCost: '$4.0k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'Tax Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.9k',
      tasksAutomatedDaily: 167,
      responseTime: '1.4s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
