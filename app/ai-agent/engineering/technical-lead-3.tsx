import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Zap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'technical-lead-3',
    name: 'Technical Lead',
    title: 'Technical Lead',
    description: 'The Technical Lead AI provides technical guidance, mentors developers, and ensures technical excellence across development projects.',
    capabilities: ["Technical Leadership","Code Review","Architecture Guidance","Mentoring","Technical Decision Making","Best Practices"],
    icon: Zap,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$4k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'Technical Leadership',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 805,
      responseTime: '1.3s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
