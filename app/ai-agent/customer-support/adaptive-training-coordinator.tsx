import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-training-coordinator',
    name: 'AI Adaptive Training Coordinator',
    title: 'Adaptive Training Coordinator',
    description: 'Support team training and development with adaptive AI programs',
    capabilities: ["Training Coordination","Team Development","Skill Assessment","Learning Management"],
    icon: Users,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$72k/year',
    aiCost: '$1.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Training Coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.8k',
      tasksAutomatedDaily: 334,
      responseTime: '0.6s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
