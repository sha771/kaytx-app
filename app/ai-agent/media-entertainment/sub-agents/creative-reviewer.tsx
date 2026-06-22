import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Eye } from 'lucide-react-native';

export default function CreativeReviewerPage() {
  const agent = {
    id: 'creative-reviewer',
    name: 'AI Creative Reviewer',
    title: 'Creative Review Agent',
    description: 'Automated Creative Reviewer agent specializing in creative evaluation, quality assessment, and feedback generation with advanced AI capabilities for creative analysis, quality control, and improvement suggestions.',
    capabilities: ["Creative Evaluation","Quality Assessment","Feedback Generation","Creative Analysis","Quality Control","Improvement Suggestions"],
    icon: Eye,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.5k/year',
    efficiency: '12x efficiency improvement',
    replacesRole: 'Creative Reviewer',
    infrastructure: {
      status: 'online' as const,
      health: 92,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,200',
      tasksAutomatedDaily: 60,
      responseTime: '<2s',
      accuracyRate: '92%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
