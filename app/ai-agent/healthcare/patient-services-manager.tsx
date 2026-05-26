import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'patient-services-manager',
    name: 'patient-services-manager',
    title: 'patient-services-manager',
    description: 'The patient-services-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
    replacesRole: 'patient-services-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1049,
      responseTime: '1.0s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
