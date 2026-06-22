import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-government-relations-specialist',
    uid: 'ktx-20-government-relations-specialist',
    name: 'AI Government Relations Specialist',
    title: 'AI Government Relations Specialist',
    description: 'AI Government Relations Specialist manages relationships between organizations and government entities. This AI agent facilitates communication, tracks legislative developments, and ensures alignment with government priorities and regulations.',
    capabilities: ['Legislative Monitoring', 'Policy Advocacy', 'Stakeholder Coordination', 'Government Affairs Strategy', 'Compliance Tracking'],
    color: '#546E7A',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$900/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Government Relations Specialist',
    subAgents: [
      { id: 'ai-lobbying-coordinator', uid: 'ktx-20-lobbying-coordinator', name: 'AI Lobbying Coordinator', title: 'AI Lobbying Coordinator', route: '/ai-agent/government/lobbying-coordinator' },
      { id: 'ai-policy-tracker', uid: 'ktx-20-policy-tracker', name: 'AI Policy Tracker', title: 'AI Policy Tracker', route: '/ai-agent/government/policy-tracker' },
      { id: 'ai-government-liaison', uid: 'ktx-20-government-liaison', name: 'AI Government Liaison', title: 'AI Government Liaison', route: '/ai-agent/government/government-liaison' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4825',
      tasksAutomatedDaily: 245,
      responseTime: '1.8s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
