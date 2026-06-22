import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-grants-manager',
    uid: 'ktx-20-grants-manager',
    name: 'AI Grants Manager',
    title: 'AI Grants Manager',
    description: 'AI Grants Manager manages team operations and ensures delivery excellence for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Grants Manager',
    subAgents: [
      { id: 'ai-impact-assessor', uid: 'ktx-20-impact-assessor', name: 'AI Impact Assessor', title: 'AI Impact Assessor', route: '/ai-agent/government/impact-assessor' },
      { id: 'ai-compliance-reporter', uid: 'ktx-20-compliance-reporter', name: 'AI Compliance Reporter', title: 'AI Compliance Reporter', route: '/ai-agent/government/compliance-reporter' },
      { id: 'ai-audit-liaison', uid: 'ktx-20-audit-liaison', name: 'AI Audit Liaison', title: 'AI Audit Liaison', route: '/ai-agent/government/audit-liaison' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'manager',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
