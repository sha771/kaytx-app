import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'notification-manager',
    name: 'AI Notification Manager',
    title: 'Notification Management AI',
    description: 'The AI Notification Manager intelligently filters, prioritizes, and organizes notifications to reduce fatigue and ensure you never miss what matters most.',
    capabilities: ["Notification Management","Priority Filtering","Fatigue Reduction","Smart Grouping","Do Not Disturb","Channel Management","Alert Customization","Digest Scheduling"],
    icon: User,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'Notification Management AI',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1280,
      responseTime: '1.7s',
      accuracyRate: '95.7%',
    },
    hierarchy: {
      department: 'Assistant',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
