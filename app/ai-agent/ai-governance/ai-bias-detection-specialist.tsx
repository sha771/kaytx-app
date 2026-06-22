import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-bias-detection-specialist',
    uid: 'ktx-22-ai-bias-detection-specialist',
    name: 'AI Bias Detection Specialist',
    title: 'AI Bias Detection Specialist',
    description: 'AI Bias Detection Specialist identifies and analyzes biases in AI systems and training data. This AI agent conducts bias analysis, implements detection tools, and recommends bias mitigation strategies.',
    capabilities: ['Bias Detection', 'Data Analysis', 'Algorithmic Audit', 'Fairness Testing', 'Mitigation Strategies'],
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Bias Detection Specialist',
    subAgents: [
      { id: 'ai-fairness-specialist', uid: 'ktx-22-fairness-specialist', name: 'AI Fairness Specialist', title: 'AI Fairness Specialist', route: '/ai-agent/ai-governance/fairness-specialist' },
      { id: 'ai-ethics-specialist', uid: 'ktx-22-ai-ethics-specialist', name: 'AI Ethics Specialist', title: 'AI Ethics Specialist', route: '/ai-agent/ai-governance/ai-ethics-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5416',
      tasksAutomatedDaily: 298,
      responseTime: '1.8s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
