import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'engineering-manager-3',
    name: 'Engineering Manager',
    title: 'Engineering Manager',
    description: 'The Engineering Manager AI leads engineering teams, oversees technical projects, and ensures delivery of high-quality software solutions.',
    capabilities: ["Team Leadership","Project Management","Technical Strategy","Resource Allocation","Performance Management","Stakeholder Communication"],
    icon: Users,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Engineering Management',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 895,
      responseTime: '1.1s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
