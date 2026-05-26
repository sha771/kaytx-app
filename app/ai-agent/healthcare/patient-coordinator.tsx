import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'patient-coordinator',
    name: 'patient-coordinator',
    title: 'patient-coordinator',
    description: 'The patient-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'patient-coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1341,
      responseTime: '0.6s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
