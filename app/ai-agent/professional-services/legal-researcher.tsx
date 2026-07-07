import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-legal-researcher',
    uid: 'ktx-17-legal-researcher',
    name: 'AI Legal Researcher',
    title: 'AI Legal Researcher',
    description: 'AI Legal Researcher provides comprehensive legal research, case law analysis, and regulatory tracking for the Professional Services department. This AI agent automates complex research workflows, provides intelligent legal insights, and collaborates with other agents to achieve optimal research outcomes with maximum efficiency.',
    capabilities: ['Legal Research', 'Case Law Analysis', 'Regulatory Tracking', 'Precedent Analysis', 'Legal Briefing'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1,500/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Legal Researcher',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7175',
      tasksAutomatedDaily: 478,
      responseTime: '2.2s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}