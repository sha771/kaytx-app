import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function FeedbackAnalyzerPage() {
  const agent = {
    id: 'feedback-analyzer',
    name: 'AI Feedback Analyzer',
    title: 'Education Agent',
    description: 'Automated Feedback Analyzer agent specializing in real-time feedback analysis with advanced AI capabilities for comment processing, issue identification, and improvement recommendations.',
    capabilities: ["Comment Processing","Issue Identification","Improvement Recommendations","Sentiment Tracking","Category Classification","Actionable Insights"],
    icon: MessageSquare,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$44k/year',
    aiCost: '$0.8k/year',
    efficiency: '12x efficiency improvement',
    replacesRole: 'Feedback Analyst',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,700',
      tasksAutomatedDaily: 90,
      responseTime: '<1s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}