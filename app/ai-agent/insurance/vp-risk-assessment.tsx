import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-risk-assessment',
    uid: 'ktx-16-vp-risk-assessment',
    name: 'AI VP Risk Assessment',
    title: 'AI VP Risk Assessment',
    description: 'AI VP Risk Assessment drives department strategy and oversees operations for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI VP Risk Assessment',
    subAgents: [
      { id: 'ai-underwriting-guidelines-enforcer', uid: 'ktx-16-underwriting-guidelines-enforcer', name: 'AI Underwriting Guidelines Enforcer', title: 'AI Underwriting Guidelines Enforcer', route: '/ai-agent/insurance/underwriting-guidelines-enforcer' },
      { id: 'ai-renewal-tracker', uid: 'ktx-16-renewal-tracker', name: 'AI Renewal Tracker', title: 'AI Renewal Tracker', route: '/ai-agent/insurance/renewal-tracker' },
      { id: 'ai-capital-requirement-calculator', uid: 'ktx-16-capital-requirement-calculator', name: 'AI Capital Requirement Calculator', title: 'AI Capital Requirement Calculator', route: '/ai-agent/insurance/capital-requirement-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10877',
      tasksAutomatedDaily: 983,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'vp_director',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
