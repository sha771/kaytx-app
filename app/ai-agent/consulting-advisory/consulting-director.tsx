import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ConsultingDirectorPage() {
  const agent = {
    id: 'consulting-director',
    name: 'AI Consulting Director',
    title: 'AI Consulting Director',
    description: 'AI Consulting Director provides specialized expertise and executes critical tasks for the Professional Services department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Consulting","Advisory Services","Implementation Services","Customer Success","Practice Development","Sales"],
    icon: Bot,
    color: '#0891B2',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'consulting-director',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 450,
      responseTime: '2.5s',
      accuracyRate: '95.5%',
      errorReduction: '85%',
      timeSaved: '75%',
    },
    performance: {
      tasksCompleted: 15000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '94.8%',
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