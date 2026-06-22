import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Inbox } from 'lucide-react-native';

export default function FeedbackCollectorPage() {
  const agent = {
    id: 'feedback-collector',
    name: 'AI Feedback Collector',
    title: 'Education Agent',
    description: 'Automated Feedback Collector agent specializing in feedback gathering with advanced AI capabilities for multi-channel collection, feedback categorization, and data consolidation.',
    capabilities: ["Multi-channel Collection","Feedback Categorization","Data Consolidation","Automated Reminders","Collection Scheduling","Data Validation"],
    icon: Inbox,
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$42k/year',
    aiCost: '$0.8k/year',
    efficiency: '11x efficiency improvement',
    replacesRole: 'Feedback Collector',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,500',
      tasksAutomatedDaily: 95,
      responseTime: '<1s',
      accuracyRate: '96%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}