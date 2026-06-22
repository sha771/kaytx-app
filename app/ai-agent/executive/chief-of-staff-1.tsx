import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-of-staff-1',
    name: 'Chief of Staff 1',
    title: 'Chief of Staff to CEO',
    description: 'Supports CEO with strategic coordination, executive communication, and office management.',
    capabilities: ["Executive Support","Strategic Coordination","Office Management","Communication Liaison","Priority Management"],
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
      tasksAutomatedDaily: 220,
      responseTime: '0.4s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
