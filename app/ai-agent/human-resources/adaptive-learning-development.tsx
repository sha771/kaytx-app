import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-learning-development',
    name: 'AI Adaptive Learning & Development',
    title: 'Adaptive Learning & Development',
    description: 'Adaptive learning and development programs with AI',
    capabilities: ["Learning & Development","Adaptive Programs","Training Management","Skill Development"],
    icon: GraduationCap,
    color: '#AD1457',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$2.6k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'L&D Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.9k',
      tasksAutomatedDaily: 289,
      responseTime: '0.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Human Resources',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
