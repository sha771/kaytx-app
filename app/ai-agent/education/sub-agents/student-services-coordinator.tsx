import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UsersRound } from 'lucide-react-native';

export default function StudentServicesCoordinatorPage() {
  const agent = {
    id: 'student-services-coordinator',
    name: 'AI Student Services Coordinator',
    title: 'Education Agent',
    description: 'Automated Student Services Coordinator agent specializing in student services management with advanced AI capabilities for service coordination, resource connection, and student advocacy.',
    capabilities: ["Service Coordination","Resource Connection","Student Advocacy","Case Management","Referral Services","Support Planning"],
    icon: UsersRound,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$46k/year',
    aiCost: '$0.9k/year',
    efficiency: '12x efficiency improvement',
    replacesRole: 'Student Services Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,900',
      tasksAutomatedDaily: 80,
      responseTime: '<1s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}