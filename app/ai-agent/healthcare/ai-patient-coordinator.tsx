import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Settings } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-patient-coordinator',
    name: 'ai-patient-coordinator',
    title: 'ai-patient-coordinator',
    description: 'The ai-patient-coordinator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Settings,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$99k/year',
    aiCost: '$1k/year',
    efficiency: '99x efficiency improvement',
    replacesRole: 'ai-patient-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 905,
      responseTime: '1.6s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Healthcare',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
