import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-compliance',
    uid: 'ktx-08-vp-compliance',
    name: 'AI VP Compliance',
    title: 'AI VP Compliance',
    description: 'AI VP Compliance drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI VP Compliance',
    subAgents: [
      { id: 'ai-litigation-risk-assessor', uid: 'ktx-08-litigation-risk-assessor', name: 'AI Litigation Risk Assessor', title: 'AI Litigation Risk Assessor', route: '/ai-agent/legal/litigation-risk-assessor' },
      { id: 'ai-ip-portfolio-manager', uid: 'ktx-08-ip-portfolio-manager', name: 'AI IP Portfolio Manager', title: 'AI IP Portfolio Manager', route: '/ai-agent/legal/ip-portfolio-manager' },
      { id: 'ai-statute-analyzer', uid: 'ktx-08-statute-analyzer', name: 'AI Statute Analyzer', title: 'AI Statute Analyzer', route: '/ai-agent/legal/statute-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
