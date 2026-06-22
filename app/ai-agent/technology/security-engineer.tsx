import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-engineer',
    uid: 'ktx-06-security-engineer',
    name: 'AI Security Engineer',
    title: 'AI Security Engineer',
    description: 'AI Security Engineer coordinates team activities and ensures quality output for the Technology & Engineering department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Security Scanning', 'API Management', 'Cloud Infrastructure', 'Technical Documentation', 'Code Generation'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Security Engineer',
    subAgents: [
      { id: 'ai-design-pattern-advisor', uid: 'ktx-06-design-pattern-advisor', name: 'AI Design Pattern Advisor', title: 'AI Design Pattern Advisor', route: '/ai-agent/technology/design-pattern-advisor' },
      { id: 'ai-style-enforcer', uid: 'ktx-06-style-enforcer', name: 'AI Style Enforcer', title: 'AI Style Enforcer', route: '/ai-agent/technology/style-enforcer' },
      { id: 'ai-access-policy-implementer', uid: 'ktx-06-access-policy-implementer', name: 'AI Access Policy Implementer', title: 'AI Access Policy Implementer', route: '/ai-agent/technology/access-policy-implementer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'team_lead',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
