import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-operations',
    name: 'AI VP of Operations',
    title: 'VP Business Operations',
    description: 'Oversees business operations, process improvement, and operational efficiency. Supports COO strategy execution and manages day-to-day operational excellence.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$183k/year',
    aiCost: '$3k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'VP Business Operations',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 1254,
      responseTime: '0.5s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Ops',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
