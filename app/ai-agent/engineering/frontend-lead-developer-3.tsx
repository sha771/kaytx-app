import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'frontend-lead-developer-3',
    name: 'Frontend Lead Developer',
    title: 'Frontend Lead Developer',
    description: 'The Frontend Lead Developer AI leads frontend development, oversees UI/UX implementation, and ensures optimal user interface experiences.',
    capabilities: ["Frontend Development","React/Vue/Angular","UI Implementation","Performance Optimization","Accessibility","State Management"],
    icon: Layout,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$150k/year',
    aiCost: '$4k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Frontend Development',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 780,
      responseTime: '1.4s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
