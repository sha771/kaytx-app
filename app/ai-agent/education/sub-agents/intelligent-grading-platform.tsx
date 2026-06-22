import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CheckSquare } from 'lucide-react-native';

export default function IntelligentGradingPlatformPage() {
  const agent = {
    id: 'intelligent-grading-platform',
    name: 'AI Intelligent Grading Platform',
    title: 'Education Agent',
    description: 'Automated Intelligent Grading Platform agent specializing in automated assessment with advanced AI capabilities for assignment grading, feedback generation, and consistency monitoring.',
    capabilities: ["Assignment Grading","Feedback Generation","Consistency Monitoring","Rubric Application","Plagiarism Detection","Grade Analytics"],
    icon: CheckSquare,
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$0.9k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Grading Assistant',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,100',
      tasksAutomatedDaily: 90,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}