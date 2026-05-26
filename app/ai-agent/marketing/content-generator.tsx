import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'content-generator',
    name: 'content-generator',
    title: 'content-generator',
    description: 'The content-generator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: FileText,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'content-generator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1199,
      responseTime: '0.7s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Marketing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
