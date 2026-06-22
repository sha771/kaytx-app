import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function CrisisManagementSpecialistPage() {
  const agent = {
    id: 'crisis-management-specialist',
    name: 'AI Crisis Management Specialist',
    title: 'AI Crisis Management Specialist',
    description: 'AI Crisis Management Specialist provides specialized expertise and executes critical tasks for the Consulting & Advisory department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Crisis Management","Emergency Response","Crisis Communication","Risk Mitigation","Business Continuity","Disaster Recovery"],
    icon: Bot,
    color: '#1E40AF',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$2k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'crisis-management-specialist',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,900',
      tasksAutomatedDaily: 680,
      responseTime: '1.8s',
      accuracyRate: '97.5%',
      errorReduction: '95%',
      timeSaved: '87%',
    },
    performance: {
      tasksCompleted: 23000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '1.6s',
      accuracy: '96.7%',
      uptime: '99.9%',
      userSatisfaction: '4.9/5',
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
