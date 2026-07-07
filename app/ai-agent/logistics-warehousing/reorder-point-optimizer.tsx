import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { RefreshCw } from 'lucide-react-native';

export default function ReorderPointOptimizerPage() {
  const agent = {
    id: 'reorder-point-optimizer',
    name: 'AI Reorder Point Optimizer',
    title: 'Reorder Point Optimizer',
    description: 'The AI Reorder Point Optimizer calculates optimal reorder points, analyzes lead times, considers demand patterns, and ensures timely replenishment to prevent stockouts.',
    capabilities: ["Reorder Point Calculation","Lead Time Analysis","Demand Analysis","Timing Optimization","Cost Consideration","Service Level Management","Monitoring","Reporting","Integration","Continuous Improvement"],
    icon: RefreshCw,
    color: '#F59E0B',
    type: 'employee' as const,
    humanCost: '$52k/year',
    aiCost: '$1.3k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'reorder-point-optimizer',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,208',
      tasksAutomatedDaily: 420,
      responseTime: '1.7s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'specialist',
      reportsTo: 'inventory-optimization-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Reorder Point Calculation',
      'Lead Time Analysis',
      'Demand Analysis',
      'Timing Optimization',
      'Cost Consideration',
      'Service Level Management',
      'Monitoring',
      'Integration'
    ],
    integrationOptions: [
      'Inventory Systems',
      'Demand Planning',
      'Lead Time Tracking',
      'Analytics Platforms',
      'ERP Integration',
      'Service Level Tools',
      'Cost Management'
    ],
    automationFeatures: [
      'Reorder Point Calculation',
      'Lead Time Analysis',
      'Demand Monitoring',
      'Timing Optimization',
      'Service Level Tracking',
      'Cost Analysis',
      'Report Generation'
    ],
    kpiMetrics: [
      'Reorder Accuracy',
      'Stockout Prevention',
      'Service Level Achievement',
      'Lead Time Precision',
      'Cost Optimization',
      'Timing Success',
      'Overall Performance'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      serviceLevel: 'maximum',
      accuracyLevel: 'high'
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
      { id: 'rpo1', name: 'Reorder Point', category: 'Reorder', description: 'Calculate reorder points', level: 'expert' },
      { id: 'rpo2', name: 'Lead Time', category: 'Lead Time', description: 'Analyze lead times', level: 'expert' },
      { id: 'rpo3', name: 'Timing Optimization', category: 'Timing', description: 'Optimize timing', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Highly analytical' },
      { trait: 'Precision', value: 10, description: 'Precision-focused' },
      { trait: 'Strategic', value: 10, description: 'Strategic thinker' },
      { trait: 'Risk Averse', value: 9, description: 'Risk-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
