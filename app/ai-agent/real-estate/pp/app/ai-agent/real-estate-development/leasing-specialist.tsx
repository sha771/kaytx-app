import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function LeasingSpecialistPage() {
  const agent = {
    id: 'leasing-specialist',
    name: 'AI Leasing Specialist',
    title: 'AI Leasing Specialist',
    description: 'AI Leasing Specialist provides specialized expertise and executes critical tasks for the Real Estate Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Leasing Management","Tenant Relations","Lease Negotiation","Lease Administration","Space Planning","Rent Collection"],
    icon: Bot,
    color: '#1E40AF',
    type: 'employee' as const,
    humanCost: '$82k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'leasing-specialist',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,650',
      tasksAutomatedDaily: 455,
      responseTime: '2.5s',
      accuracyRate: '95.4%',
      errorReduction: '84%',
      timeSaved: '74%',
    },
    performance: {
      tasksCompleted: 15200 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '94.7%',
      uptime: '99.6%',
      userSatisfaction: '4.5/5',
    },
    features: {
      taskAutomation: true,
      dataProcessing: true,
      workflowManagement: true,
      reporting: true,
      integration: true,
      collaboration: true,
      learning: true,
      security: true,
    },
    integrations: [
      'Department Systems',
      'Enterprise CRM',
      'Analytics Platform',
      'Communication Tools',
    ],
    kpis: [
      'Tasks Completed',
      'Response Time',
      'Accuracy Rate',
      'User Satisfaction',
      'Cost Savings',
      'Efficiency Gain',
    ],
  };

  return <AgentPageWrapper agent={agent} />;
}
