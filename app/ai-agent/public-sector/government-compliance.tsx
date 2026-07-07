import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-government-compliance',
    uid: 'ktx-20-government-compliance',
    name: 'AI Government Compliance',
    title: 'AI Government Compliance',
    description: 'AI Government Compliance coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Government Compliance',
    subAgents: [
      { id: 'ai-feedback-analyzer', uid: 'ktx-20-feedback-analyzer', name: 'AI Feedback Analyzer', title: 'AI Feedback Analyzer', route: '/ai-agent/government/feedback-analyzer' },
      { id: 'ai-compliance-gap-analyst', uid: 'ktx-20-compliance-gap-analyst', name: 'AI Compliance Gap Analyst', title: 'AI Compliance Gap Analyst', route: '/ai-agent/government/compliance-gap-analyst' },
      { id: 'ai-foia-responder', uid: 'ktx-20-foia-responder', name: 'AI FOIA Responder', title: 'AI FOIA Responder', route: '/ai-agent/government/foia-responder' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
