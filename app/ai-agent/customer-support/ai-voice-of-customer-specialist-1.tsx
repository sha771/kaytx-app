import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-voice-of-customer-specialist-1',
    name: 'Voice of Customer Specialist',
    title: 'Voice of Customer Specialist',
    description: 'The Voice of Customer Specialist AI captures, analyzes, and amplifies customer feedback to drive customer-centric improvements across the organization.',
    capabilities: ["Feedback Collection","Sentiment Analysis","Voice of Customer Programs","Survey Management","Feedback Loop Closure","Customer Advocacy"],
    icon: MessageSquare,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$4k/year',
    efficiency: '29x efficiency improvement',
    replacesRole: 'Voice of Customer',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 580,
      responseTime: '1.7s',
      accuracyRate: '91.5%',
    },
    hierarchy: {
      department: 'Customer Experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
