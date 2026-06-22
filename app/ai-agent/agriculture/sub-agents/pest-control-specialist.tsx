import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sprout } from 'lucide-react-native';

export default function PestControlSpecialistPage() {
  const agent = {
    id: 'pest-control-specialist',
    name: 'AI Pest Control Specialist',
    title: 'AI Pest Control Specialist',
    description: 'The AI Pest Control Specialist monitors pest activity, manages pest control measures, and ensures crop protection.',
    capabilities: ["Task Automation","Data Processing","Pest Monitoring","Control Management","Crop Protection","IPM Implementation","Communication","Safety Management","Sustainability","Yield Protection"],
    icon: Sprout,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$2k/year',
    efficiency: '24x efficiency improvement',
    replacesRole: 'pest-control-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 280,
      responseTime: '0.6s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Agriculture',
      level: 'operational',
      reportsTo: 'crop-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Pest Monitoring',
      'Control Management',
      'Crop Protection',
      'IPM Implementation',
      'Communication',
      'Safety Management',
      'Sustainability',
      'Yield Protection'
    ],
    integrationOptions: [
      'Pest Sensors',
      'Monitoring Systems',
      'Control Equipment',
      'Communication Tools',
      'Safety Systems',
      'Analytics Platforms',
      'IPM Tools',
      'Sustainability Platforms'
    ],
    automationFeatures: [
      'Pest Detection',
      'Control Activation',
      'Monitoring Tracking',
      'Safety Enforcement',
      'IPM Implementation',
      'Crop Protection',
      'Alert Generation',
      'Performance Monitoring'
    ],
    kpiMetrics: [
      'Pest Control Success',
      'Crop Protection',
      'IPM Effectiveness',
      'Safety Compliance',
      'Sustainability Metrics',
      'Yield Protection',
      'Response Time',
      'Cost Efficiency'
    ],
    customOptions: {
      pestFocus: 'high',
      controlEffectiveness: 'maximum',
      cropProtection: 'priority',
      safetyLevel: 'strict',
      integrationLevel: 'comprehensive'
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
      { id: 'pest', enabled: true, name: 'Pest Detector', description: 'Detects pest activity' },
      { id: 'control', enabled: true, name: 'Control Manager', description: 'Manages pest control' },
      { id: 'protection', enabled: true, name: 'Crop Protector', description: 'Protects crops' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'agri_1', name: 'Pest Monitoring', category: 'Monitoring', description: 'Monitor pests', level: 'expert' },
      { id: 'agri_2', name: 'Control Management', category: 'Management', description: 'Manage control measures', level: 'expert' },
      { id: 'agri_3', name: 'Crop Protection', category: 'Protection', description: 'Protect crops', level: 'expert' },
      { id: 'agri_4', name: 'IPM Implementation', category: 'Implementation', description: 'Implement IPM', level: 'expert' },
      { id: 'agri_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Protection Focus', value: 10, description: 'Focus on protection' },
      { trait: 'Safety', value: 10, description: 'Safety conscious' },
      { trait: 'Effectiveness', value: 10, description: 'Highly effective' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
