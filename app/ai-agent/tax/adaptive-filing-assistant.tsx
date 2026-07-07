import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileCheck } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-filing-assistant',
    name: 'AI Adaptive Filing Assistant',
    title: 'Adaptive Filing Assistant',
    description: 'Automated tax filing preparation and submission with adaptive workflows',
    capabilities: ["Tax Filing","Preparation Automation","Submission Management","Deadline Tracking"],
    icon: FileCheck,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$1.8k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Filer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7k',
      tasksAutomatedDaily: 423,
      responseTime: '0.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
