import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-privacy',
    uid: 'ktx-11-vp-privacy',
    name: 'AI VP Privacy',
    title: 'AI VP Privacy',
    description: 'AI VP Privacy drives department strategy and oversees operations for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection', 'Vulnerability Assessment'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Privacy',
    subAgents: [
      { id: 'ai-alert-prioritizer', uid: 'ktx-11-alert-prioritizer', name: 'AI Alert Prioritizer', title: 'AI Alert Prioritizer', route: '/ai-agent/security/alert-prioritizer' },
      { id: 'ai-threat-modeler', uid: 'ktx-11-threat-modeler', name: 'AI Threat Modeler', title: 'AI Threat Modeler', route: '/ai-agent/security/threat-modeler' },
      { id: 'ai-evidence-gatherer', uid: 'ktx-11-evidence-gatherer', name: 'AI Evidence Gatherer', title: 'AI Evidence Gatherer', route: '/ai-agent/security/evidence-gatherer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'vp_director',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
