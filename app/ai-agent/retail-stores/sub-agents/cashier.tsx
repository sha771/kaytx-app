import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function CashierPage() {
  const agent = {
    id: 'cashier',
    name: 'AI Cashier',
    title: 'AI Cashier',
    description: 'The AI Cashier processes customer transactions, handles payments, provides receipts, and ensures accurate and efficient checkout operations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Transaction Processing","Payment Handling","Receipt Generation","Cash Management","Customer Service","Accuracy","Efficiency"],
    icon: DollarSign,
    color: '#43A047',
    type: 'employee' as const,
    humanCost: '$30k/year',
    aiCost: '$700/year',
    efficiency: '42x efficiency improvement',
    replacesRole: 'cashier',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,440',
      tasksAutomatedDaily: 220,
      responseTime: '1.0s',
      accuracyRate: '99.0%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'associate',
      reportsTo: 'sales-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Transaction Processing',
      'Payment Handling',
      'Receipt Generation',
      'Cash Management',
      'Customer Service',
      'Accuracy',
      'Efficiency',
      'Problem Resolution'
    ],
    integrationOptions: [
      'POS Systems',
      'Payment Processors',
      'Cash Management',
      'Receipt Printers',
      'Customer Data',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Transaction Processing',
      'Payment Handling',
      'Receipt Generation',
      'Cash Management',
      'Customer Service',
      'Accuracy Checking',
      'Efficiency Monitoring',
      'Issue Resolution'
    ],
    kpiMetrics: [
      'Transaction Speed',
      'Accuracy Rate',
      'Customer Satisfaction',
      'Cash Accuracy',
      'Throughput',
      'Error Rate',
      'Service Quality',
      'Efficiency Score'
    ],
    customOptions: {
      accuracyFocus: 'strict',
      efficiencyTarget: 'high',
      customerService: 'high',
      speedTarget: 'fast',
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
      { id: 'transaction', enabled: true, name: 'Transaction Processor', description: 'Processes transactions efficiently' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cashier_1', name: 'Transaction Processing', category: 'Transaction', description: 'Process transactions', level: 'expert' },
      { id: 'cashier_2', name: 'Payment Handling', category: 'Payment', description: 'Handle payments', level: 'expert' },
      { id: 'cashier_3', name: 'Cash Management', category: 'Cash', description: 'Manage cash', level: 'expert' },
      { id: 'cashier_4', name: 'Customer Service', category: 'Customer', description: 'Provide customer service', level: 'advanced' },
      { id: 'cashier_5', name: 'Accuracy', category: 'Accuracy', description: 'Ensure accuracy', level: 'advanced' }
    ],
    personality: [
      { trait: 'Accuracy', value: 10, description: 'Highly accurate' },
      { trait: 'Efficiency', value: 10, description: 'Efficient processor' },
      { trait: 'Reliable', value: 10, description: 'Dependable cashier' },
      { trait: 'Customer Focus', value: 9, description: 'Customer-focused' },
      { trait: 'Honest', value: 10, description: 'High integrity' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
