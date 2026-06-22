import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileQuestion } from 'lucide-react-native';

export default function SurveyDesignerPage() {
  const agent = {
    id: 'survey-designer',
    name: 'AI Survey Designer',
    title: 'Education Agent',
    description: 'Automated Survey Designer agent specializing in survey creation with advanced AI capabilities for question generation, survey optimization, and response format design.',
    capabilities: ["Question Generation","Survey Optimization","Response Format Design","Validation Logic","Survey Distribution","Response Collection"],
    icon: FileQuestion,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$43k/year',
    aiCost: '$0.8k/year',
    efficiency: '11x efficiency improvement',
    replacesRole: 'Survey Designer',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,600',
      tasksAutomatedDaily: 80,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}