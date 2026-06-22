import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-analyst',
    uid: 'ktx-11-security-analyst',
    name: 'AI Security Analyst',
    title: 'AI Security Analyst',
    description: 'AI Security Analyst coordinates team activities and ensures quality output for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Security Auditing', 'Access Control', 'Encryption Management', 'Compliance Monitoring', 'Risk Mitigation'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Security Analyst',
    subAgents: [
      { id: 'ai-cyber-risk-quantifier', uid: 'ktx-11-cyber-risk-quantifier', name: 'AI Cyber Risk Quantifier', title: 'AI Cyber Risk Quantifier', route: '/ai-agent/security/cyber-risk-quantifier' },
      { id: 'ai-playbook-author', uid: 'ktx-11-playbook-author', name: 'AI Playbook Author', title: 'AI Playbook Author', route: '/ai-agent/security/playbook-author' },
      { id: 'ai-vulnerability-reporter', uid: 'ktx-11-vulnerability-reporter', name: 'AI Vulnerability Reporter', title: 'AI Vulnerability Reporter', route: '/ai-agent/security/vulnerability-reporter' }
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
      department: 'Security & Risk',
      level: 'team_lead',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
