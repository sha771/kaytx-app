import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lean-specialist',
    name: 'lean-specialist',
    title: 'lean-specialist',
    description: 'The lean-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$66k/year',
    aiCost: '$1k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'lean-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 826,
      responseTime: '0.3s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
