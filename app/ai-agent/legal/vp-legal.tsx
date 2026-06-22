import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-legal',
    uid: 'ktx-08-vp-legal',
    name: 'AI VP Legal',
    title: 'AI VP Legal',
    description: 'AI VP Legal drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI VP Legal',
    subAgents: [
      { id: 'ai-regulatory-change-monitor', uid: 'ktx-08-regulatory-change-monitor', name: 'AI Regulatory Change Monitor', title: 'AI Regulatory Change Monitor', route: '/ai-agent/legal/regulatory-change-monitor' },
      { id: 'ai-obligation-tracker', uid: 'ktx-08-obligation-tracker', name: 'AI Obligation Tracker', title: 'AI Obligation Tracker', route: '/ai-agent/legal/obligation-tracker' },
      { id: 'ai-precedent-finder', uid: 'ktx-08-precedent-finder', name: 'AI Precedent Finder', title: 'AI Precedent Finder', route: '/ai-agent/legal/precedent-finder' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9507',
      tasksAutomatedDaily: 753,
      responseTime: '1.3s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
