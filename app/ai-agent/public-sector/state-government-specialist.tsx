import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-state-government-specialist',
    uid: 'ktx-20-state-government-specialist',
    name: 'AI State Government Specialist',
    title: 'AI State Government Specialist',
    description: 'AI State Government Specialist specializes in state-level government operations and policies. This AI agent manages state programs, coordinates with state agencies, and ensures alignment with state regulations and priorities.',
    capabilities: ['State Policy Analysis', 'State Agency Coordination', 'State Program Management', 'Federal-State Relations', 'State Compliance'],
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$880/mo',
    efficiency: '90% efficiency',
    replacesRole: 'State Government Specialist',
    subAgents: [
      { id: 'ai-state-agency-liaison', uid: 'ktx-20-state-agency-liaison', name: 'AI State Agency Liaison', title: 'AI State Agency Liaison', route: '/ai-agent/government/state-agency-liaison' },
      { id: 'ai-state-program-coordinator', uid: 'ktx-20-state-program-coordinator', name: 'AI State Program Coordinator', title: 'AI State Program Coordinator', route: '/ai-agent/government/state-program-coordinator' },
      { id: 'ai-state-regulation-analyst', uid: 'ktx-20-state-regulation-analyst', name: 'AI State Regulation Analyst', title: 'AI State Regulation Analyst', route: '/ai-agent/government/state-regulation-analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4560',
      tasksAutomatedDaily: 234,
      responseTime: '1.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
