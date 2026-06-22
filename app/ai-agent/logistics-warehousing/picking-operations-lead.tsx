import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Hand } from 'lucide-react-native';

export default function PickingOperationsLeadPage() {
  const agent = {
    id: 'picking-operations-lead',
    name: 'AI Picking Operations Lead',
    title: 'Picking Operations Lead',
    description: 'The AI Picking Operations Lead oversees picking operations, coordinates picking teams, optimizes picking strategies, and ensures efficient and accurate order picking activities.',
    capabilities: ["Picking Supervision","Team Coordination","Strategy Optimization","Quality Control","Performance Monitoring","Route Planning","Equipment Management","Training","Reporting","Continuous Improvement"],
    icon: Hand,
    color: '#EF4444',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$1.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'picking-operations-lead',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$4,875',
      tasksAutomatedDaily: 500,
      responseTime: '1.7s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Logistics & Warehousing',
      level: 'team_lead',
      reportsTo: 'warehouse-operations-manager',
      manages: ['picking-manager', 'picker'],
    },
    specializedCapabilities: [
      'Picking Supervision',
      'Team Coordination',
      'Strategy Optimization',
      'Quality Control',
      'Performance Monitoring',
      'Route Planning',
      'Equipment Management',
      'Training'
    ],
    integrationOptions: [
      'WMS Systems',
      'Picking Tools',
      'Scanning Equipment',
      'Route Software',
      'Analytics Platforms',
      'Communication Tools',
      'Performance Systems'
    ],
    automationFeatures: [
      'Picking Planning',
      'Route Optimization',
      'Team Coordination',
      'Quality Monitoring',
      'Performance Tracking',
      'Equipment Scheduling',
      'Report Generation'
    ],
    kpiMetrics: [
      'Picking Accuracy',
      'Picking Speed',
      'Route Efficiency',
      'Team Productivity',
      'Quality Metrics',
      'Equipment Utilization',
      'Training Effectiveness'
    ],
    customOptions: {
      efficiencyLevel: 'high',
      automationLevel: 'intermediate',
      qualityLevel: 'premium',
      productivityLevel: 'high'
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
      { id: 'pol1', name: 'Picking Supervision', category: 'Picking', description: 'Supervise picking', level: 'expert' },
      { id: 'pol2', name: 'Route Optimization', category: 'Routing', description: 'Optimize routes', level: 'expert' },
      { id: 'pol3', name: 'Team Leadership', category: 'Leadership', description: 'Lead teams', level: 'expert' }
    ],
    personality: [
      { trait: 'Leadership', value: 10, description: 'Strong leader' },
      { trait: 'Efficiency', value: 10, description: 'Prioritizes efficiency' },
      { trait: 'Quality Focus', value: 10, description: 'Quality-focused' },
      { trait: 'Organization', value: 9, description: 'Well-organized' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
