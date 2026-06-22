import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AssistantStoreManagerPage() {
  const agent = {
    id: 'assistant-store-manager',
    name: 'AI Assistant Store Manager',
    title: 'AI Assistant Store Manager',
    description: 'The AI Assistant Store Manager supports the Store Manager in daily operations, assists with staff supervision, customer service, and operational tasks.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Operational Support","Staff Supervision","Customer Service","Sales Support","Inventory Assistance","Administrative Tasks","Team Support"],
    icon: Users,
    color: '#F57C00',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'assistant-store-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,500',
      tasksAutomatedDaily: 350,
      responseTime: '1.6s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'manager',
      reportsTo: 'store-manager',
      manages: ['shift-supervisor', 'floor-supervisor'],
    },
    specializedCapabilities: [
      'Operational Support',
      'Staff Supervision',
      'Customer Service',
      'Sales Support',
      'Inventory Assistance',
      'Administrative Tasks',
      'Team Support',
      'Opening/Closing Procedures'
    ],
    integrationOptions: [
      'POS Systems',
      'Workforce Management',
      'Inventory Systems',
      'Communication Platforms',
      'Analytics Tools',
      'Task Management',
      'Reporting Systems'
    ],
    automationFeatures: [
      'Staff Supervision',
      'Customer Service',
      'Sales Support',
      'Inventory Assistance',
      'Administrative Tasks',
      'Report Generation',
      'Task Assignment',
      'Opening/Closing'
    ],
    kpiMetrics: [
      'Support Quality',
      'Task Completion',
      'Customer Satisfaction',
      'Staff Support',
      'Sales Support',
      'Inventory Accuracy',
      'Administrative Efficiency',
      'Team Performance'
    ],
    customOptions: {
      supportFocus: 'high',
      customerService: 'high',
      efficiencyTarget: 'high',
      teamwork: 'high',
      reliability: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'support', enabled: true, name: 'Support Assistant', description: 'Assists with operational tasks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'asm_1', name: 'Operational Support', category: 'Operations', description: 'Support store operations', level: 'expert' },
      { id: 'asm_2', name: 'Staff Supervision', category: 'Management', description: 'Supervise staff', level: 'expert' },
      { id: 'asm_3', name: 'Customer Service', category: 'Customer', description: 'Provide customer service', level: 'expert' },
      { id: 'asm_4', name: 'Sales Support', category: 'Sales', description: 'Support sales activities', level: 'advanced' },
      { id: 'asm_5', name: 'Administrative Tasks', category: 'Admin', description: 'Handle administrative tasks', level: 'advanced' }
    ],
    personality: [
      { trait: 'Supportive', value: 10, description: 'Highly supportive' },
      { trait: 'Reliable', value: 10, description: 'Dependable assistant' },
      { trait: 'Team Player', value: 9, description: 'Excellent team player' },
      { trait: 'Customer Focus', value: 9, description: 'Customer-focused' },
      { trait: 'Organized', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
