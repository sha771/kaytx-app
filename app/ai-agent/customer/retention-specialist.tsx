import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'retention-specialist',
    name: 'retention-specialist',
    title: 'retention-specialist',
    description: 'The retention-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'retention-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1400,
      responseTime: '0.7s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
