import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-analytics-specialist',
    name: 'ai-analytics-specialist',
    title: 'ai-analytics-specialist',
    description: 'The ai-analytics-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$79k/year',
    aiCost: '$1k/year',
    efficiency: '79x efficiency improvement',
    replacesRole: 'ai-analytics-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 733,
      responseTime: '1.8s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Data',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
