import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'calendar-manager',
    name: 'AI Calendar Manager',
    title: 'Calendar Management AI',
    description: 'The AI Calendar Manager handles all scheduling needs, optimizes time allocation, resolves conflicts, and ensures you never miss an important event.',
    capabilities: ["Calendar Management","Meeting Scheduling","Time Optimization","Conflict Resolution","Reminder System","Time Zone Handling","Availability Sync","Smart Scheduling"],
    icon: User,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Calendar Management AI',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1045,
      responseTime: '1.4s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Assistant',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
