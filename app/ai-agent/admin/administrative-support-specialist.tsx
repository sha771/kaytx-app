import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AdministrativeSupportSpecialistPage() {
  const agent = {
    id: 'administrative-support-specialist',
    name: 'AI Administrative Support Specialist',
    title: 'AI Administrative Support Specialist',
    description: 'AI Administrative Support Specialist provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ["Administrative Support","Office Coordination","Task Management","Document Support","Communication Support","Schedule Management"],
    icon: Users,
    color: '#6B7280',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$2k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'administrative-support-specialist',
    infrastructure: {
      status: 'online',
      health: 95 + Math.floor(Math.random() * 5),
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,300',
      tasksAutomatedDaily: 480,
      responseTime: '2.5s',
      accuracyRate: '96.5%',
      errorReduction: '89%',
      timeSaved: '80%',
    },
    performance: {
      tasksCompleted: 16500 + Math.floor(Math.random() * 5000),
      avgResponseTime: '2.3s',
      accuracy: '95.8%',
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
      'Communication Platforms',
      'Task Management',
      'Document Systems',
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
