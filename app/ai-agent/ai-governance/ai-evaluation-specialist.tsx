import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-evaluation-specialist',
    uid: 'ktx-22-ai-evaluation-specialist',
    name: 'AI Evaluation Specialist',
    title: 'AI Evaluation Specialist',
    description: 'AI Evaluation Specialist conducts comprehensive evaluations of AI systems to assess performance, accuracy, and alignment with requirements. This AI agent performs systematic evaluations, produces evaluation reports, and recommends improvements.',
    capabilities: ['System Evaluation', 'Performance Assessment', 'Accuracy Analysis', 'Evaluation Reporting', 'Improvement Recommendations'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1,500/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Evaluation Specialist',
    subAgents: [
      { id: 'ai-capability-assessment-specialist', uid: 'ktx-22-capability-assessment-specialist', name: 'AI Capability Assessment Specialist', title: 'AI Capability Assessment Specialist', route: '/ai-agent/ai-governance/capability-assessment-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5833',
      tasksAutomatedDaily: 272,
      responseTime: '1.8s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'team_lead',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
