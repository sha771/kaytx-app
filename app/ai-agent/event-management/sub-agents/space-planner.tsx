import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Grid } from 'lucide-react-native';

export default function SpacePlannerPage() {
  const agent = {
    id: 'space-planner',
    name: 'AI Space Planner',
    title: 'AI Space Planner',
    description: 'The AI Space Planner designs event layouts, optimizes space utilization, and creates efficient venue floor plans.',
    capabilities: ["Task Automation","Data Processing","Space Planning","Layout Design","Floor Plan Creation","Space Optimization","Capacity Planning","Accessibility Design","Visual Planning","CAD Integration"],
    icon: Grid,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$2k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'space-planner',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,250',
      tasksAutomatedDaily: 450,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'specialist',
      reportsTo: 'venue-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Space Planning',
      'Layout Design',
      'Floor Plan Creation',
      'Space Optimization',
      'Capacity Planning',
      'Accessibility Design',
      'Visual Planning',
      'CAD Integration',
      'Traffic Flow Analysis',
      'Safety Planning'
    ],
    integrationOptions: [
      'CAD Software',
      'Floor Plan Tools',
      'Space Planning Applications',
      'Visualization Software',
      'Accessibility Tools',
      'Capacity Calculators',
      'Design Platforms',
      '3D Modeling Tools'
    ],
    automationFeatures: [
      'Layout Generation',
      'Floor Plan Creation',
      'Space Optimization',
      'Capacity Calculation',
      'Accessibility Checks',
      'Traffic Flow Analysis',
      'Safety Planning',
      'Visualization'
    ],
    kpiMetrics: [
      'Space Utilization',
      'Layout Efficiency',
      'Capacity Accuracy',
      'Accessibility Compliance',
      'Safety Score',
      'Design Quality',
      'Planning Speed',
      'Client Satisfaction'
    ],
    customOptions: {
      utilizationTarget: 'maximum',
      accessibilityLevel: 'full',
      safetyPriority: 'high',
      designQuality: 'premium',
      planningSpeed: 'efficient'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'space', enabled: true, name: 'Space Optimizer', description: 'Optimizes space utilization' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sp_1', name: 'Space Planning', category: 'Space', description: 'Plan event spaces', level: 'expert' },
      { id: 'sp_2', name: 'Layout Design', category: 'Design', description: 'Design layouts', level: 'expert' },
      { id: 'sp_3', name: 'Space Optimization', category: 'Optimization', description: 'Optimize space usage', level: 'expert' }
    ],
    personality: [
      { trait: 'Design', value: 10, description: 'Design-oriented' },
      { trait: 'Spatial', value: 10, description: 'Strong spatial awareness' },
      { trait: 'Detail Oriented', value: 9, description: 'Attention to detail' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
