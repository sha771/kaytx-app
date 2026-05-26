import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-inventory-specialist',
    name: 'ai-inventory-specialist',
    title: 'ai-inventory-specialist',
    description: 'The ai-inventory-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'ai-inventory-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1280,
      responseTime: '1.4s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Supply-chain',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
