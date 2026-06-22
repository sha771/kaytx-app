import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'infrastructure-manager',
    name: 'AI Infrastructure Manager',
    title: 'IT & Technology',
    description: 'Manages IT infrastructure, monitors systems, and ensures optimal performance.',
    capabilities: ["Infrastructure Management","System Monitoring","Performance Optimization"],
    icon: User,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'IT & Technology',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 939,
      responseTime: '0.8s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'It',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
