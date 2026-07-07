import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-diversity-inclusion',
    name: 'AI Intelligent Diversity & Inclusion',
    title: 'Intelligent Diversity & Inclusion',
    description: 'Diversity and inclusion analytics and programs with intelligent AI',
    capabilities: ["Diversity & Inclusion","Analytics","Programs","DEI Intelligence"],
    icon: Globe,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3.0k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'DEI Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9k',
      tasksAutomatedDaily: 223,
      responseTime: '0.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
