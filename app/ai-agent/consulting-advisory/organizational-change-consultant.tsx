import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function OrganizationalChangeConsultantPage() {
  const agent = {
    id: 'organizational-change-consultant',
    name: 'AI Organizational Change Consultant',
    title: 'AI Organizational Change Consultant',
    description: 'AI Organizational Change Consultant provides specialized expertise and executes critical tasks for the Consulting & Advisory department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Change Management","Organizational Development","Culture Transformation","Leadership Development","Communication Planning","Stakeholder Management"],
    icon: Bot,
    color: '#1E40AF',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$2k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'organizational-change-consultant',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,350',
      tasksAutomatedDaily: 560,
      responseTime: '2.1s',
      accuracyRate: '96.7%',
      errorReduction: '89%',
      timeSaved: '81%',
    },
    performance: {
      tasksCompleted: 19500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '1.9s',
      accuracy: '95.9%',
      uptime: '99.9%',
      userSatisfaction: '4.8/5',
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
