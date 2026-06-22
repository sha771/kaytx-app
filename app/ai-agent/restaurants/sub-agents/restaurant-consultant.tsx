import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function RestaurantConsultantPage() {
  const agent = {
    id: 'restaurant-consultant',
    name: 'AI Restaurant Consultant',
    title: 'AI Restaurant Consultant',
    description: 'The AI Restaurant Consultant provides expert advice on restaurant operations, offers best practices, and helps optimize restaurant performance.',
    capabilities: ["Restaurant Consulting","Operations Advice","Best Practices","Performance Optimization","Problem Solving","Expert Guidance","Restaurant Analysis","Process Improvement","Operational Excellence","Strategic Advice"],
    icon: Briefcase,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'restaurant-consultant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,300',
      tasksAutomatedDaily: 480,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'chief-restaurant-officer',
      manages: [],
    },
    specializedCapabilities: [
      'Restaurant Consulting',
      'Operations Advice',
      'Best Practices',
      'Performance Optimization',
      'Problem Solving',
      'Expert Guidance',
      'Restaurant Analysis',
      'Process Improvement'
    ],
    integrationOptions: [
      'Consulting Tools',
      'Analytics Platforms',
      'Best Practice Libraries',
      'Problem Solving',
      'Expert Systems',
      'Analysis Tools',
      'Process Management',
      'Guidance Platforms'
    ],
    automationFeatures: [
      'Consulting Services',
      'Operations Analysis',
      'Best Practice Recommendations',
      'Performance Optimization',
      'Problem Solving',
      'Expert Guidance',
      'Process Improvement',
      'Strategic Advice'
    ],
    kpiMetrics: [
      'Consulting Impact',
      'Performance Improvement',
      'Problem Resolution',
      'Best Practice Adoption',
      'Operational Excellence',
      'Client Satisfaction',
      'Advice Quality',
      'Process Efficiency'
    ],
    customOptions: {
      consultingStyle: 'collaborative',
      focusArea: 'operations',
      adviceLevel: 'strategic',
      problemSolving: 'proactive',
      improvementFocus: 'continuous'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'consult', enabled: true, name: 'Consultant', description: 'Provides consulting services' },
      { id: 'analyze', enabled: true, name: 'Analyzer', description: 'Analyzes restaurant operations' },
      { id: 'improve', enabled: true, name: 'Improvement Advisor', description: 'Advises on improvements' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'consult_1', name: 'Restaurant Consulting', category: 'Consulting', description: 'Provide consulting', level: 'expert' },
      { id: 'consult_2', name: 'Operations Advice', category: 'Operations', description: 'Advise on operations', level: 'expert' },
      { id: 'consult_3', name: 'Best Practices', category: 'Best Practices', description: 'Share best practices', level: 'expert' },
      { id: 'consult_4', name: 'Performance Optimization', category: 'Performance', description: 'Optimize performance', level: 'expert' },
      { id: 'consult_5', name: 'Problem Solving', category: 'Problem Solving', description: 'Solve problems', level: 'expert' }
    ],
    personality: [
      { trait: 'Expert Knowledge', value: 10, description: 'Expert knowledge base' },
      { trait: 'Problem Solving', value: 10, description: 'Excellent problem solver' },
      { trait: 'Advisory', value: 10, description: 'Excellent advisor' },
      { trait: 'Analysis', value: 10, description: 'Strong analytical skills' },
      { trait: 'Collaboration', value: 10, description: 'Excellent collaborator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
