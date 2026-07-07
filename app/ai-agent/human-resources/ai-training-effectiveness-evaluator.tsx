import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-training-effectiveness-evaluator',
    name: 'ai-training-effectiveness-evaluator',
    title: 'ai-training-effectiveness-evaluator',
    description: 'The ai-training-effectiveness-evaluator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: GraduationCap,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$83k/year',
    aiCost: '$1k/year',
    efficiency: '83x efficiency improvement',
    replacesRole: 'ai-training-effectiveness-evaluator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 917,
      responseTime: '1.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
