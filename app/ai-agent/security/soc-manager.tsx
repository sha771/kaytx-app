import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-soc-manager',
    uid: 'ktx-11-soc-manager',
    name: 'AI SOC Manager',
    title: 'AI SOC Manager',
    description: 'AI SOC Manager manages team operations and ensures delivery excellence for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compliance Monitoring', 'Risk Mitigation', 'Threat Detection', 'Vulnerability Assessment', 'Incident Response'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI SOC Manager',
    subAgents: [
      { id: 'ai-threat-landscape-monitor', uid: 'ktx-11-threat-landscape-monitor', name: 'AI Threat Landscape Monitor', title: 'AI Threat Landscape Monitor', route: '/ai-agent/security/threat-landscape-monitor' },
      { id: 'ai-shift-coordinator', uid: 'ktx-11-shift-coordinator', name: 'AI Shift Coordinator', title: 'AI Shift Coordinator', route: '/ai-agent/security/shift-coordinator' },
      { id: 'ai-exploit-researcher', uid: 'ktx-11-exploit-researcher', name: 'AI Exploit Researcher', title: 'AI Exploit Researcher', route: '/ai-agent/security/exploit-researcher' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'manager',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
