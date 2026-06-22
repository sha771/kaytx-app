import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-of-staff-2',
    name: 'Chief of Staff 2',
    title: 'Chief of Staff to Board',
    description: 'Supports Board of Directors with governance coordination, meeting preparation, and board relations.',
    capabilities: ["Board Support","Governance Coordination","Meeting Preparation","Board Relations","Documentation Management"],
    icon: UserCheck,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$200k/year',
    aiCost: '$4k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Chief of Staff',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$16k',
      tasksAutomatedDaily: 225,
      responseTime: '0.4s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
