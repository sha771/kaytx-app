import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-tax-specialist',
    name: 'ai-tax-specialist',
    title: 'ai-tax-specialist',
    description: 'The ai-tax-specialist AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Star,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: 'ai-tax-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 647,
      responseTime: '1.2s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Finance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
