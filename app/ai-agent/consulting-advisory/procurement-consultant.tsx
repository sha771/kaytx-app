import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ProcurementConsultantPage() {
  const agent = {
    id: 'procurement-consultant',
    name: 'AI Procurement Consultant',
    title: 'AI Procurement Consultant',
    description: 'AI Procurement Consultant provides specialized expertise and executes critical tasks for the Professional Services department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Procurement Strategy","Vendor Management","Supply Chain Optimization","Cost Analysis","Contract Negotiation","Sourcing"],
    icon: Bot,
    color: '#0891B2',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'procurement-consultant',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 460,
      responseTime: '2.4s',
      accuracyRate: '95.6%',
      errorReduction: '85%',
      timeSaved: '75%',
    },
    performance: {
      tasksCompleted: 15500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.2s',
      accuracy: '94.9%',
      uptime: '99.7%',
      userSatisfaction: '4.6/5',
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
