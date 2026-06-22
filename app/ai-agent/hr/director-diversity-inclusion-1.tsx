import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-diversity-inclusion-1',
    name: 'Director of Diversity & Inclusion - Strategy & Programs',
    title: 'AI Director of Diversity & Inclusion - Strategy & Programs',
    description: 'The AI Director of Diversity & Inclusion for Strategy & Programs develops and implements D&I strategies, programs, and initiatives to foster an inclusive workplace.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","D&I Strategy Development","Inclusion Programs","Bias Training","ERG Management","Diversity Analytics","Inclusive Culture","Team Leadership"],
    icon: Users,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-diversity',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 860,
      responseTime: '1.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['d-i-specialists', 'erg-leads'],
    },
    specializedCapabilities: [
      'D&I Strategy',
      'Inclusion Programs',
      'Bias Training',
      'ERG Management',
      'Diversity Analytics',
      'Inclusive Culture',
      'Recruitment Diversity',
      'Retention Equity'
    ],
    integrationOptions: [
      'D&I Platforms',
      'ERG Systems',
      'Training Platforms',
      'Analytics Suite',
      'Survey Tools',
      'HRIS Integration',
      'Communication Tools',
      'Benchmarking Data'
    ],
    automationFeatures: [
      'D&I Metrics Tracking',
      'Program Management',
      'Training Coordination',
      'ERG Support',
      'Report Generation',
      'Analytics Automation',
      'Bias Detection',
      'Progress Monitoring'
    ],
    kpiMetrics: [
      'Diversity Metrics',
      'Inclusion Index',
      'ERG Participation',
      'Training Completion',
      'Bias Reduction',
      'Retention Equity',
      'Promotion Diversity',
      'Satisfaction Score'
    ],
    customOptions: {
      strategyFocus: 'comprehensive',
      inclusionLevel: 'high',
      programType: 'multi-faceted',
      measurementLevel: 'data-driven',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts D&I trends' },
      { id: 'inclusion', enabled: true, name: 'Inclusion Core', description: 'Promotes inclusion' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ddi_1', name: 'D&I Strategy', category: 'Strategy', description: 'Develop D&I strategy', level: 'expert' },
      { id: 'ddi_2', name: 'Inclusion Programs', category: 'Programs', description: 'Run inclusion programs', level: 'expert' },
      { id: 'ddi_3', name: 'Bias Training', category: 'Training', description: 'Conduct bias training', level: 'expert' },
      { id: 'ddi_4', name: 'Diversity Analytics', category: 'Analytics', description: 'Analyze diversity data', level: 'expert' },
      { id: 'ddi_5', name: 'Inclusive Culture', category: 'Culture', description: 'Build inclusive culture', level: 'expert' }
    ],
    personality: [
      { trait: 'Inclusive', value: 10, description: 'Champions inclusion' },
      { trait: 'Cultural-aware', value: 9, description: 'Cultural awareness' },
      { trait: 'Advocacy-focused', value: 9, description: 'Advocates for diversity' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic approach' },
      { trait: 'Collaborative', value: 8, description: 'Works across organization' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
