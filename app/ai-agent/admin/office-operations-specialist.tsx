import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function OfficeOperationsSpecialistPage() {
  const agent = {
    id: 'office-operations-specialist',
    name: 'AI Office Operations Specialist',
    title: 'AI Office Operations Specialist',
    description: 'AI Office Operations Specialist provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Office Management","Operations Coordination","Facilities Oversight","Vendor Management","Supply Management","Process Optimization"],
    icon: Building,
    color: '#6B7280',
    type: 'employee' as const,
    humanCost: '$72k/year',
    aiCost: '$2k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'office-operations-specialist',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,800',
      tasksAutomatedDaily: 520,
      responseTime: '2.6s',
      accuracyRate: '96.0%',
      errorReduction: '87%',
      timeSaved: '79%',
    },
    performance: {
      tasksCompleted: 17000 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.4s',
      accuracy: '95.5%',
      uptime: '99.8%',
      userSatisfaction: '4.7/5',
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
      'Office Systems',
      'Facilities Platforms',
      'Vendor Systems',
      'Supply Platforms',
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
