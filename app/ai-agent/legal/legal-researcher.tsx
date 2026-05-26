import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'legal-researcher',
    name: 'legal-researcher',
    title: 'legal-researcher',
    description: 'The legal-researcher AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Scale,
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: 'legal-researcher',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1288,
      responseTime: '0.7s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Legal',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
