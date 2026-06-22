import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'innovation-director-3',
    name: 'Innovation Director 3',
    title: 'Director of Technology Innovation',
    description: 'Manages technology innovation, digital transformation initiatives, and tech trend analysis.',
    capabilities: ["Technology Innovation","Digital Transformation","Tech Trends","Innovation Labs","Emerging Tech"],
    icon: Cpu,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Innovation Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 195,
      responseTime: '0.5s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
