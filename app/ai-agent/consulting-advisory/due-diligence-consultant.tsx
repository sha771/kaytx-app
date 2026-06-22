import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function DueDiligenceConsultantPage() {
  const agent = {
    id: 'due-diligence-consultant',
    name: 'AI Due Diligence Consultant',
    title: 'AI Due Diligence Consultant',
    description: 'AI Due Diligence Consultant provides specialized expertise and executes critical tasks for the Consulting & Advisory department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Due Diligence","M&A Due Diligence","Financial Analysis","Legal Review","Operational Assessment","Risk Evaluation"],
    icon: Bot,
    color: '#1E40AF',
    type: 'employee' as const,
    humanCost: '$118k/year',
    aiCost: '$2k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'due-diligence-consultant',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,650',
      tasksAutomatedDaily: 570,
      responseTime: '2.1s',
      accuracyRate: '96.8%',
      errorReduction: '90%',
      timeSaved: '82%',
    },
    performance: {
      tasksCompleted: 19800 + Math.floor(Math.random() * 5000),
      avgResponseTime: '1.9s',
      accuracy: '96.0%',
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
