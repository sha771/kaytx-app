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
    humanCost: '$79k/year',
    aiCost: '$1k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'content-generator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1307,
      responseTime: '0.5s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Marketing-growth',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
