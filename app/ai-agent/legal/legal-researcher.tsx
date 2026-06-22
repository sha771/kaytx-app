import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-legal-researcher',
    uid: 'ktx-08-legal-researcher',
    name: 'AI Legal Researcher',
    title: 'AI Legal Researcher',
    description: 'AI Legal Researcher coordinates team activities and ensures quality output for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Legal Researcher',
    subAgents: [
      { id: 'ai-regulatory-scanner', uid: 'ktx-08-regulatory-scanner', name: 'AI Regulatory Scanner', title: 'AI Regulatory Scanner', route: '/ai-agent/legal/regulatory-scanner' },
      { id: 'ai-governance-auditor', uid: 'ktx-08-governance-auditor', name: 'AI Governance Auditor', title: 'AI Governance Auditor', route: '/ai-agent/legal/governance-auditor' },
      { id: 'ai-regulation-interpreter', uid: 'ktx-08-regulation-interpreter', name: 'AI Regulation Interpreter', title: 'AI Regulation Interpreter', route: '/ai-agent/legal/regulation-interpreter' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'team_lead',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
