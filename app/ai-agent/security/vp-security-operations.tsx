import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-security-operations',
    uid: 'ktx-11-vp-security-operations',
    name: 'AI VP Security Operations',
    title: 'AI VP Security Operations',
    description: 'AI VP Security Operations drives department strategy and oversees operations for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Access Control', 'Encryption Management'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI VP Security Operations',
    subAgents: [
      { id: 'ai-risk-appetite-definer', uid: 'ktx-11-risk-appetite-definer', name: 'AI Risk Appetite Definer', title: 'AI Risk Appetite Definer', route: '/ai-agent/security/risk-appetite-definer' },
      { id: 'ai-data-classification-enforcer', uid: 'ktx-11-data-classification-enforcer', name: 'AI Data Classification Enforcer', title: 'AI Data Classification Enforcer', route: '/ai-agent/security/data-classification-enforcer' },
      { id: 'ai-evidence-collector', uid: 'ktx-11-evidence-collector', name: 'AI Evidence Collector', title: 'AI Evidence Collector', route: '/ai-agent/security/evidence-collector' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11425',
      tasksAutomatedDaily: 575,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'vp_director',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
