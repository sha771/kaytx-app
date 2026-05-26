import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-investor-relations',
    name: 'vp-investor-relations',
    title: 'vp-investor-relations',
    description: 'The vp-investor-relations AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#0D47A1',
    type: 'employee' as const,
    humanCost: '$204k/year',
    aiCost: '$4k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'vp-investor-relations',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 785,
      responseTime: '0.8s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
