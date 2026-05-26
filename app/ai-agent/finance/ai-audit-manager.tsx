import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-audit-manager',
    name: 'ai-audit-manager',
    title: 'ai-audit-manager',
    description: 'The ai-audit-manager AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: User,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'ai-audit-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1267,
      responseTime: '1.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
