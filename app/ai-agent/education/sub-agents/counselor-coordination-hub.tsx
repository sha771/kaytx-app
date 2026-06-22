import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserCircle } from 'lucide-react-native';

export default function CounselorCoordinationHubPage() {
  const agent = {
    id: 'counselor-coordination-hub',
    name: 'AI Counselor Coordination Hub',
    title: 'Education Agent',
    description: 'Automated Counselor Coordination Hub agent specializing in counseling services with advanced AI capabilities for appointment scheduling, counselor matching, and support resource coordination.',
    capabilities: ["Appointment Scheduling","Counselor Matching","Support Resource Coordination","Case Management","Crisis Intervention","Progress Tracking"],
    icon: UserCircle,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$0.9k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Counseling Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,100',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}