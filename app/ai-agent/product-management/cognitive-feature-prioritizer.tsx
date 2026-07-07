import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-feature-prioritizer',
    name: 'AI Cognitive Feature Prioritizer',
    title: 'Cognitive Feature Prioritizer',
    description: 'Intelligent feature prioritization and backlog management with AI',
    capabilities: ["Feature Prioritization","Backlog Management","Decision Support","Strategic Planning"],
    icon: Target,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3.0k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Product Owner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9k',
      tasksAutomatedDaily: 223,
      responseTime: '1.0s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
