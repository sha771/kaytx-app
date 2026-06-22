import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-accounting-manager',
    uid: 'ktx-05-accounting-manager',
    name: 'AI Accounting Manager',
    title: 'AI Accounting Manager',
    description: 'AI Accounting Manager manages team operations and ensures delivery excellence for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Accounting Manager',
    subAgents: [
      { id: 'ai-accounting-standards-enforcer', uid: 'ktx-05-accounting-standards-enforcer', name: 'AI Accounting Standards Enforcer', title: 'AI Accounting Standards Enforcer', route: '/ai-agent/finance/accounting-standards-enforcer' },
      { id: 'ai-financial-report-compiler', uid: 'ktx-05-financial-report-compiler', name: 'AI Financial Report Compiler', title: 'AI Financial Report Compiler', route: '/ai-agent/finance/financial-report-compiler' },
      { id: 'ai-audit-planner', uid: 'ktx-05-audit-planner', name: 'AI Audit Planner', title: 'AI Audit Planner', route: '/ai-agent/finance/audit-planner' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'manager',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
