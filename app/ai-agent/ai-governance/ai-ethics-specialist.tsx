import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ethics-specialist',
    uid: 'ktx-22-ai-ethics-specialist',
    name: 'AI Ethics Specialist',
    title: 'AI Ethics Specialist',
    description: 'AI Ethics Specialist ensures ethical principles are embedded in all AI systems and decision-making processes. This AI agent evaluates AI deployments for ethical considerations, provides guidance on moral frameworks, and ensures alignment with organizational values and societal expectations.',
    capabilities: ['Ethical Frameworks', 'Bias Detection', 'Moral Reasoning', 'Stakeholder Impact Analysis', 'Ethical Risk Assessment'],
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1,500/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Ethics Specialist',
    subAgents: [
      { id: 'ai-bias-detection-specialist', uid: 'ktx-22-bias-detection-specialist', name: 'AI Bias Detection Specialist', title: 'AI Bias Detection Specialist', route: '/ai-agent/ai-governance/bias-detection-specialist' },
      { id: 'ai-fairness-specialist', uid: 'ktx-22-fairness-specialist', name: 'AI Fairness Specialist', title: 'AI Fairness Specialist', route: '/ai-agent/ai-governance/fairness-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5916',
      tasksAutomatedDaily: 287,
      responseTime: '1.8s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'vp_director',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
