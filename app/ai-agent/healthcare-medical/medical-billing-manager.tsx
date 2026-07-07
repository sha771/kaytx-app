import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-medical-billing-manager',
    uid: 'ktx-17-medical-billing-manager',
    name: 'AI Medical Billing Manager',
    title: 'AI Medical Billing Manager',
    description: 'AI Medical Billing Manager manages team operations and ensures delivery excellence for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Clinical Decision Support', 'Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Medical Billing Manager',
    subAgents: [
      { id: 'ai-staff-scheduler', uid: 'ktx-17-staff-scheduler', name: 'AI Staff Scheduler', title: 'AI Staff Scheduler', route: '/ai-agent/healthcare/staff-scheduler' },
      { id: 'ai-referral-processor', uid: 'ktx-17-referral-processor', name: 'AI Referral Processor', title: 'AI Referral Processor', route: '/ai-agent/healthcare/referral-processor' },
      { id: 'ai-data-integrity-checker', uid: 'ktx-17-data-integrity-checker', name: 'AI Data Integrity Checker', title: 'AI Data Integrity Checker', route: '/ai-agent/healthcare/data-integrity-checker' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
