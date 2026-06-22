import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-information-security-officer',
    uid: 'ktx-11-chief-information-security-officer',
    name: 'AI Chief Information Security Officer',
    title: 'AI Chief Information Security Officer',
    description: 'AI Chief Information Security Officer leads strategic direction and executive decision-making for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection', 'Vulnerability Assessment'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Chief Information Security Officer',
    subAgents: [
      { id: 'ai-security-strategy-advisor', uid: 'ktx-11-security-strategy-advisor', name: 'AI Security Strategy Advisor', title: 'AI Security Strategy Advisor', route: '/ai-agent/security/security-strategy-advisor' },
      { id: 'ai-privacy-impact-assessor', uid: 'ktx-11-privacy-impact-assessor', name: 'AI Privacy Impact Assessor', title: 'AI Privacy Impact Assessor', route: '/ai-agent/security/privacy-impact-assessor' },
      { id: 'ai-containment-coordinator', uid: 'ktx-11-containment-coordinator', name: 'AI Containment Coordinator', title: 'AI Containment Coordinator', route: '/ai-agent/security/containment-coordinator' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9069',
      tasksAutomatedDaily: 851,
      responseTime: '1.1s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'c_level',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
