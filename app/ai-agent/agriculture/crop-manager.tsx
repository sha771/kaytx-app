import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sprout } from 'lucide-react-native';

export default function CropManagerPage() {
  const agent = {
    id: 'crop-manager',
    name: 'AI Crop Manager',
    title: 'AI Crop Manager',
    description: 'The AI Crop Manager manages day-to-day crop operations, oversees planting schedules, and ensures optimal crop growth and development.',
    capabilities: ["Task Automation","Data Processing","Crop Management","Planting Scheduling","Growth Monitoring","Crop Health","Yield Tracking","Field Management","Pest Control","Disease Prevention"],
    icon: Sprout,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$120k/year',
    aiCost: '$3k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'crop-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$9,750',
      tasksAutomatedDaily: 800,
      responseTime: '1.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'manager',
      reportsTo: 'vp-crop-production',
      manages: [],
    },
    specializedCapabilities: [
      'Crop Management',
      'Planting Scheduling',
      'Growth Monitoring',
      'Crop Health',
      'Yield Tracking',
      'Field Management',
      'Pest Control',
      'Disease Prevention',
      'Nutrition Management',
      'Harvest Planning'
    ],
    integrationOptions: [
      'Crop Management Systems',
      'Field Sensors',
      'Weather Platforms',
      'Pest Detection',
      'Disease Monitoring',
      'Yield Tracking',
      'Soil Analysis',
      'Communication Tools'
    ],
    automationFeatures: [
      'Planting Scheduling',
      'Growth Monitoring',
      'Health Checks',
      'Pest Detection',
      'Disease Prevention',
      'Yield Tracking',
      'Field Coordination',
      'Report Generation'
    ],
    kpiMetrics: [
      'Crop Health',
      'Yield Achievement',
      'Planting Accuracy',
      'Growth Rate',
      'Pest Control',
      'Disease Prevention',
      'Field Efficiency',
      'Harvest Success'
    ],
    customOptions: {
      yieldTarget: 'optimal',
      healthStandard: 'high',
      pestControlLevel: 'proactive',
      diseasePrevention: 'strict',
      fieldEfficiency: 'maximum'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'crop', enabled: true, name: 'Crop Monitor', description: 'Monitors crop health' },
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts crop performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cm_1', name: 'Crop Management', category: 'Crop', description: 'Manage crop operations', level: 'expert' },
      { id: 'cm_2', name: 'Planting Scheduling', category: 'Planting', description: 'Schedule planting', level: 'expert' },
      { id: 'cm_3', name: 'Growth Monitoring', category: 'Growth', description: 'Monitor crop growth', level: 'expert' }
    ],
    personality: [
      { trait: 'Crop Focus', value: 10, description: 'Crop-oriented' },
      { trait: 'Growth', value: 10, description: 'Growth-focused' },
      { trait: 'Health', value: 9, description: 'Health-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
