import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Code2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'fullstack-lead-developer-1',
    name: 'Full-Stack Lead Developer',
    title: 'Full-Stack Lead Developer',
    description: 'The Full-Stack Lead Developer AI leads full-stack development, oversees end-to-end application architecture, and ensures seamless integration.',
    capabilities: ["Full-Stack Development","Frontend & Backend","API Integration","Database Management","System Integration","End-to-End Architecture"],
    icon: Code2,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$160k/year',
    aiCost: '$4k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Full-Stack Development',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 820,
      responseTime: '1.3s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
