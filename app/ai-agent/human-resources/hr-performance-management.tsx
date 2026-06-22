import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function HRPerformanceManagementPage() {
  const agent = {
    id: 'hr-performance-management',
    name: 'AI HR Performance Management',
    title: 'AI HR Performance Management',
    description: 'The AI HR Performance Management manages performance reviews and employee development.',
    capabilities: ["Task Automation","Data Processing","Performance Management","Review Planning","Employee Development","Communication","Analytics","HR Intelligence"],
    icon: TrendingUp,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-performance-management-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 355,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Performance Management','Review Planning','Employee Development','Communication','Analytics','HR Intelligence'],
    integrationOptions: ['Performance Platforms','Review Tools','Development Systems','Communication Platforms'],
    automationFeatures: ['Performance Management','Review Planning','Employee Development','Communication Automation','Analytics Generation'],
    kpiMetrics: ['Performance Quality','Review Success','Development Impact','Communication Effectiveness','Cost Efficiency'],
    customOptions: { performanceFocus: 'high', reviewEfficiency: 'maximum', integrationLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'performance', enabled: true, name: 'Performance Manager', description: 'Manages performance' },
      { id: 'review', enabled: true, name: 'Review Planner', description: 'Plans reviews' },
      { id: 'development', enabled: true, name: 'Employee Developer', description: 'Develops employees' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Performance Management', category: 'Performance', description: 'Manage performance', level: 'expert' },
      { id: 'hr_2', name: 'Review Planning', category: 'Review', description: 'Plan reviews', level: 'expert' },
      { id: 'hr_3', name: 'Employee Development', category: 'Development', description: 'Develop employees', level: 'expert' }
    ],
    personality: [
      { trait: 'Performance Expertise', value: 10, description: 'Performance expertise' },
      { trait: 'Review Focus', value: 10, description: 'Review oriented' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
