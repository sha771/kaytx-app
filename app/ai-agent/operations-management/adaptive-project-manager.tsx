import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calendar } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-project-manager',
    name: 'AI Adaptive Project Manager',
    title: 'Adaptive Project Manager',
    description: 'Adaptive project management and coordination with AI',
    capabilities: ["Project Management","Coordination","Adaptive Planning","Resource Management"],
    icon: Calendar,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$122k/year',
    aiCost: '$3.3k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Project Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.9k',
      tasksAutomatedDaily: 183,
      responseTime: '1.0s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
