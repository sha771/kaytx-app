import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-grants-specialist',
    uid: 'ktx-20-grants-specialist',
    name: 'AI Grants Specialist',
    title: 'AI Grants Specialist',
    description: 'AI Grants Specialist coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance', 'Policy Analysis'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Grants Specialist',
    subAgents: [
      { id: 'ai-community-outreach-planner', uid: 'ktx-20-community-outreach-planner', name: 'AI Community Outreach Planner', title: 'AI Community Outreach Planner', route: '/ai-agent/government/community-outreach-planner' },
      { id: 'ai-regulation-interpreter', uid: 'ktx-20-regulation-interpreter', name: 'AI Regulation Interpreter', title: 'AI Regulation Interpreter', route: '/ai-agent/government/regulation-interpreter' },
      { id: 'ai-data-publisher', uid: 'ktx-20-data-publisher', name: 'AI Data Publisher', title: 'AI Data Publisher', route: '/ai-agent/government/data-publisher' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
