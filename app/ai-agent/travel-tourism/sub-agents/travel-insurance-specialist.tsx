import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Plane } from 'lucide-react-native';

export default function TravelInsuranceSpecialistPage() {
  const agent = {
    id: 'travel-insurance-specialist',
    name: 'AI Travel Insurance Specialist',
    title: 'AI Travel Insurance Specialist',
    description: 'The AI Travel Insurance Specialist manages travel insurance policies, handles claims, and provides insurance guidance.',
    capabilities: ["Task Automation","Data Processing","Insurance Management","Claims Handling","Policy Management","Risk Assessment","Communication","Compliance","Service Delivery","Guest Satisfaction"],
    icon: Plane,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$47k/year',
    aiCost: '$2k/year',
    efficiency: '23x efficiency improvement',
    replacesRole: 'travel-insurance-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 270,
      responseTime: '0.8s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'operational',
      reportsTo: 'booking-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Insurance Management',
      'Claims Handling',
      'Policy Management',
      'Risk Assessment',
      'Communication',
      'Compliance',
      'Service Delivery',
      'Guest Satisfaction'
    ],
    integrationOptions: [
      'Insurance Platforms',
      'Claims Systems',
      'Policy Management',
      'Communication Tools',
      'Guest Apps',
      'Compliance Systems',
      'Analytics Platforms',
      'Feedback Systems'
    ],
    automationFeatures: [
      'Policy Issuance',
      'Claims Processing',
      'Risk Assessment',
      'Guest Communication',
      'Policy Management',
      'Compliance Monitoring',
      'Claims Tracking',
      'Feedback Collection'
    ],
    kpiMetrics: [
      'Claims Processing Speed',
      'Policy Accuracy',
      'Guest Satisfaction',
      'Risk Assessment',
      'Service Quality',
      'Communication Effectiveness',
      'Compliance Rate',
      'Guest Experience'
    ],
    customOptions: {
      insuranceFocus: 'high',
      claimsSpeed: 'fast',
      riskAssessment: 'comprehensive',
      complianceLevel: 'strict',
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
      { id: 'insurance', enabled: true, name: 'Insurance Engine', description: 'Manages insurance operations' },
      { id: 'claims', enabled: true, name: 'Claims Processor', description: 'Processes insurance claims' },
      { id: 'risk', enabled: true, name: 'Risk Assessor', description: 'Assesses travel risks' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'travel_1', name: 'Insurance Management', category: 'Operations', description: 'Manage insurance operations', level: 'expert' },
      { id: 'travel_2', name: 'Claims Handling', category: 'Service', description: 'Handle claims effectively', level: 'expert' },
      { id: 'travel_3', name: 'Risk Assessment', category: 'Risk', description: 'Assess risks effectively', level: 'expert' },
      { id: 'travel_4', name: 'Policy Management', category: 'Operations', description: 'Manage policies', level: 'expert' },
      { id: 'travel_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' }
    ],
    personality: [
      { trait: 'Accuracy', value: 10, description: 'High accuracy' },
      { trait: 'Compliance', value: 10, description: 'Strong compliance focus' },
      { trait: 'Service Excellence', value: 10, description: 'Excellent service delivery' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
