import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ClipboardList } from 'lucide-react-native';

export default function SurveyFeedbackAnalyzerPage() {
  const agent = {
    id: 'survey-feedback-analyzer',
    name: 'AI Survey Feedback Analyzer',
    title: 'Education Agent',
    description: 'Automated Survey Feedback Analyzer agent specializing in survey analysis with advanced AI capabilities for feedback processing, sentiment analysis, and insight generation.',
    capabilities: ["Feedback Processing","Sentiment Analysis","Insight Generation","Survey Design","Response Analytics","Trend Identification"],
    icon: ClipboardList,
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$45k/year',
    aiCost: '$0.9k/year',
    efficiency: '12x efficiency improvement',
    replacesRole: 'Survey Analyst',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,800',
      tasksAutomatedDaily: 85,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}