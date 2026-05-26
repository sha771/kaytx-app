import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-winback-campaign-specialist',
    name: 'ai-winback-campaign-specialist',
    title: 'ai-winback-campaign-specialist',
    description: 'The ai-winback-campaign-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'ai-winback-campaign-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1450,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
