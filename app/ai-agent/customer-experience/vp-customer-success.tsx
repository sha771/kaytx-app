import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-customer-success',
    uid: 'ktx-01-vp-customer-success',
    name: 'AI VP Customer Success',
    title: 'AI VP Customer Success',
    description: 'AI VP Customer Success drives department strategy and oversees operations for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Knowledge Base Management', 'Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI VP Customer Success',
    subAgents: [
      { id: 'ai-customer-journey-mapper', uid: 'ktx-01-customer-journey-mapper', name: 'AI Customer Journey Mapper', title: 'AI Customer Journey Mapper', route: '/ai-agent/customer-experience/customer-journey-mapper' },
      { id: 'ai-rewards-program-designer', uid: 'ktx-01-rewards-program-designer', name: 'AI Rewards Program Designer', title: 'AI Rewards Program Designer', route: '/ai-agent/customer-experience/rewards-program-designer' },
      { id: 'ai-sentiment-analyzer', uid: 'ktx-01-sentiment-analyzer', name: 'AI Sentiment Analyzer', title: 'AI Sentiment Analyzer', route: '/ai-agent/customer-experience/sentiment-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11014',
      tasksAutomatedDaily: 506,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'vp_director',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
