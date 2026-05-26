import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cao',
    name: 'cao',
    title: 'cao',
    description: 'The cao AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: FileText,
    color: '#5856D6',
    type: 'employee' as const,
    humanCost: '$193k/year',
    aiCost: '$3k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'cao',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1064,
      responseTime: '0.4s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Administrative',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
