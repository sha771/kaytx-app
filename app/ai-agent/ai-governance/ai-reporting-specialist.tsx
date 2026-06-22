import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-reporting-specialist',
    uid: 'ktx-22-ai-reporting-specialist',
    name: 'AI Reporting Specialist',
    title: 'AI Reporting Specialist',
    description: 'AI Reporting Specialist generates comprehensive governance reports for stakeholders. This AI agent creates detailed reports, visualizes governance metrics, and ensures timely delivery of governance information.',
    capabilities: ['Report Generation', 'Data Visualization', 'Metric Analysis', 'Stakeholder Communication', 'Report Distribution'],
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1,000/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Reporting Specialist',
    subAgents: [
      { id: 'ai-documentation-specialist', uid: 'ktx-22-documentation-specialist', name: 'AI Documentation Specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-governance/documentation-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3916',
      tasksAutomatedDaily: 267,
      responseTime: '1.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'team_lead',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
