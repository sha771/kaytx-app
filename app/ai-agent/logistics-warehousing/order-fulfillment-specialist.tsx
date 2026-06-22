import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PackageCheck } from 'lucide-react-native';

export default function OrderFulfillmentSpecialistPage() {
  const agent = {
    id: 'order-fulfillment-specialist',
    name: 'AI Order Fulfillment Specialist',
    title: 'Order Fulfillment Specialist',
    description: 'The AI Order Fulfillment Specialist manages order processing, coordinates fulfillment activities, tracks order status, and ensures accurate and timely order completion.',
    capabilities: ["Order Processing","Fulfillment Coordination","Status Tracking","Quality Check","Exception Handling","Customer Communication","Performance Monitoring","Documentation","Analytics","Reporting"],
    icon: PackageCheck,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.7k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'order-fulfillment-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,292',
      tasksAutomatedDaily: 520,
      responseTime: '1.8s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'logistics-operations-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Order Processing',
      'Fulfillment Coordination',
      'Status Tracking',
      'Quality Checking',
      'Exception Handling',
      'Customer Communication',
      'Performance Monitoring',
      'Documentation'
    ],
    integrationOptions: [
      'Order Management Systems',
      'WMS Integration',
      'ERP Systems',
      'Communication Tools',
      'Analytics Platforms',
      'Customer Systems',
      'Tracking Tools'
    ],
    automationFeatures: [
      'Order Processing',
      'Fulfillment Coordination',
      'Status Tracking',
      'Quality Checking',
      'Exception Handling',
      'Notification Management',
      'Report Generation'
    ],
    kpiMetrics: [
      'Order Accuracy',
      'Fulfillment Speed',
      'On-Time Delivery',
      'Exception Rate',
      'Customer Satisfaction',
      'Process Efficiency',
      'Quality Metrics'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'premium',
      customerLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: false,
    },
    agentType: 'learning',
    skills: [
      { id: 'ofs1', name: 'Order Processing', category: 'Order', description: 'Process orders', level: 'expert' },
      { id: 'ofs2', name: 'Fulfillment', category: 'Fulfillment', description: 'Manage fulfillment', level: 'expert' },
      { id: 'ofs3', name: 'Quality Check', category: 'Quality', description: 'Check quality', level: 'expert' }
    ],
    personality: [
      { trait: 'Detail Oriented', value: 10, description: 'Attention to detail' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Customer Focus', value: 9, description: 'Customer-focused' },
      { trait: 'Accuracy', value: 10, description: 'Accuracy-focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
