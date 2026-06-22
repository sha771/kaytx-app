import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-technology',
    name: 'Executive VP Technology',
    title: 'Executive Vice President of Technology',
    description: 'Oversees technology strategy, IT infrastructure, and digital transformation initiatives.',
    capabilities: ["Technology Strategy","IT Operations","Digital Transformation","Innovation Management","Infrastructure Planning"],
    icon: Cpu,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$300k/year',
    aiCost: '$6k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Vice President',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$24k',
      tasksAutomatedDaily: 288,
      responseTime: '0.4s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
