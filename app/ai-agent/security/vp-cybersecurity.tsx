import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-cybersecurity',
    uid: 'ktx-11-vp-cybersecurity',
    name: 'AI VP Cybersecurity',
    title: 'AI VP Cybersecurity',
    description: 'AI VP Cybersecurity drives department strategy and oversees operations for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Security Auditing', 'Access Control', 'Encryption Management', 'Compliance Monitoring', 'Risk Mitigation'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI VP Cybersecurity',
    subAgents: [
      { id: 'ai-board-reporter', uid: 'ktx-11-board-reporter', name: 'AI Board Reporter', title: 'AI Board Reporter', route: '/ai-agent/security/board-reporter' },
      { id: 'ai-consent-manager', uid: 'ktx-11-consent-manager', name: 'AI Consent Manager', title: 'AI Consent Manager', route: '/ai-agent/security/consent-manager' },
      { id: 'ai-timeline-reconstructor', uid: 'ktx-11-timeline-reconstructor', name: 'AI Timeline Reconstructor', title: 'AI Timeline Reconstructor', route: '/ai-agent/security/timeline-reconstructor' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'vp_director',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
