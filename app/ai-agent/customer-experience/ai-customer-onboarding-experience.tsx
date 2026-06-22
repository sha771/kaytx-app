import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Rocket } from 'lucide-react-native';

export default function AICustomerOnboardingExperiencePage() {
  const agent = {
    id: 'ai-customer-onboarding-experience',
    name: 'AI Customer Onboarding Experience',
    title: 'AI Customer Onboarding Experience',
    description: 'The AI Customer Onboarding Experience designs and optimizes onboarding journeys to ensure rapid time-to-value and customer success.',
    capabilities: ["Task Automation","Data Processing","Onboarding Design","Onboarding Optimization","Time-to-Value","Communication","Analytics","Customer Intelligence"],
    icon: Rocket,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$4k/year',
    efficiency: '19x efficiency improvement',
    replacesRole: 'onboarding-experience-manager',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 328,
      responseTime: '0.6s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'management',
      reportsTo: 'chief-customer-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Onboarding Design',
      'Onboarding Optimization',
      'Time-to-Value',
      'Communication',
      'Analytics',
      'Customer Intelligence'
    ],
    integrationOptions: [
      'Onboarding Platforms',
      'CRM Systems',
      'Analytics Tools',
      'Communication Platforms',
      'Customer Data',
      'Onboarding Data',
      'Journey Tools',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Onboarding Design',
      'Onboarding Optimization',
      'Time-to-Value',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Customer Intelligence'
    ],
    kpiMetrics: [
      'Onboarding Completion',
      'Time-to-Value',
      'Onboarding Satisfaction',
      'Communication Effectiveness',
      'Customer Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      onboardingFocus: 'high',
      designEfficiency: 'maximum',
      optimizationAccuracy: 'optimized',
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
      { id: 'onboarding', enabled: true, name: 'Onboarding Designer', description: 'Designs onboarding' },
      { id: 'optimization', enabled: true, name: 'Onboarding Optimizer', description: 'Optimizes onboarding' },
      { id: 'ttv', enabled: true, name: 'Time-to-Value Accelerator', description: 'Accelerates TTV' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cx_1', name: 'Onboarding Design', category: 'Onboarding', description: 'Design onboarding', level: 'expert' },
      { id: 'cx_2', name: 'Onboarding Optimization', category: 'Optimization', description: 'Optimize onboarding', level: 'expert' },
      { id: 'cx_3', name: 'Time-to-Value', category: 'TTV', description: 'Accelerate TTV', level: 'expert' },
      { id: 'cx_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'cx_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Onboarding Expertise', value: 10, description: 'Onboarding expert' },
      { trait: 'Design Focus', value: 10, description: 'Design focused' },
      { trait: 'Optimization Focus', value: 10, description: 'Optimization focused' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
