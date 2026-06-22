import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-governance-reporting',
    uid: 'ktx-22-ai-governance-reporting',
    name: 'AI Governance Reporting',
    title: 'AI Governance Reporting',
    description: 'AI Governance Reporting generates comprehensive governance reports for executive leadership and stakeholders. This AI agent consolidates governance data, creates executive summaries, and ensures timely delivery of governance insights.',
    capabilities: ['Executive Reporting', 'Data Consolidation', 'Summary Creation', 'Insight Generation', 'Delivery Management'],
    color: '#4338CA',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1,300/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Governance Reporting',
    subAgents: [
      { id: 'ai-reporting-specialist', uid: 'ktx-22-reporting-specialist', name: 'AI Reporting Specialist', title: 'AI Reporting Specialist', route: '/ai-agent/ai-governance/reporting-specialist' },
      { id: 'ai-documentation-specialist', uid: 'ktx-22-documentation-specialist', name: 'AI Documentation Specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-governance/documentation-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4916',
      tasksAutomatedDaily: 298,
      responseTime: '1.8s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
