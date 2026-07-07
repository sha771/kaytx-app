import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-sentiment-analyzer',
    name: 'AI Neural Sentiment Analyzer',
    title: 'Neural Sentiment Analyzer',
    description: 'Customer sentiment analysis and insights with neural AI capabilities',
    capabilities: ["Sentiment Analysis","Customer Insights","Emotion Detection","Trend Analysis"],
    icon: TrendingUp,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$1.8k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Sentiment Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7k',
      tasksAutomatedDaily: 378,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
