import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'sprint-manager',
    name: 'AI Sprint Manager',
    title: 'Engineering',
    description: 'Manages agile sprints, tracks progress, and optimizes team velocity.',
    capabilities: ["Sprint Management","Progress Tracking","Velocity Optimization"],
    icon: User,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1330,
      responseTime: '0.3s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
