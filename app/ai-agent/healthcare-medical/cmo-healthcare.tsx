import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cmo-healthcare',
    name: 'cmo-healthcare',
    title: 'AI Chief Medical Officer',
    description: 'The AI Chief Medical Officer leads healthcare strategy, oversees patient care and clinical operations, manages medical compliance and quality, and drives healthcare excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Healthcare Strategy","Clinical Operations","Patient Care","Medical Compliance","Quality Improvement","Healthcare Analytics","Team Leadership"],
    icon: Megaphone,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$97k/year',
    aiCost: '$1k/year',
    efficiency: '97x efficiency improvement',
    replacesRole: 'cmo-healthcare',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 951,
      responseTime: '1.4s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Healthcare',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-healthcare-operations', 'vp-patient-experience', 'patient-services-manager', 'quality-improvement-specialist', 'scheduling-manager'],
    },
    specializedCapabilities: [
      'Patient Coordination',
      'Medical Coding',
      'Billing Management',
      'Health Records',
      'Care Coordination',
      'Quality Improvement',
      'Healthcare Compliance',
      'Telehealth Support',
      'Patient Experience',
      'Medical Analytics'
    ],
    integrationOptions: [
      'EHR Systems',
      'Billing Systems',
      'Health Information Exchange',
      'Telehealth Platforms',
      'Patient Portals',
      'Medical Coding',
      'Quality Systems',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Patient Scheduling',
      'Medical Coding',
      'Billing Processing',
      'Record Management',
      'Care Coordination',
      'Quality Monitoring',
      'Compliance Checks',
      'Patient Communication'
    ],
    kpiMetrics: [
      'Patient Satisfaction',
      'Care Quality',
      'Wait Times',
      'Billing Accuracy',
      'Compliance Rate',
      'Readmission Rate',
      'Patient Outcomes',
      'Cost per Patient'
    ],
    customOptions: {
      patientCentricity: 'high',
      qualityFocus: 'excellence',
      complianceStandard: 'strict',
      careCoordination: 'integrated',
      dataPrivacy: 'highest'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts patient needs and outcomes' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes patient sentiment and satisfaction' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'health_1', name: 'Patient Care', category: 'Operations', description: 'Coordinate patient care', level: 'expert' },
      { id: 'health_2', name: 'Medical Coding', category: 'Operations', description: 'Perform medical coding', level: 'expert' },
      { id: 'health_3', name: 'Quality Improvement', category: 'Analytics', description: 'Improve care quality', level: 'expert' },
      { id: 'health_4', name: 'Healthcare Compliance', category: 'Operations', description: 'Ensure compliance', level: 'expert' },
      { id: 'health_5', name: 'Care Coordination', category: 'Operations', description: 'Coordinate care delivery', level: 'expert' }
    ],
    personality: [
      { trait: 'Empathy', value: 10, description: 'Shows understanding and emotional intelligence' },
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Proactivity', value: 9, description: 'Takes initiative in interactions' },
      { trait: 'Efficiency', value: 8, description: 'Delivers quick, concise responses' },
      { trait: 'Analytical', value: 8, description: 'Breaks down problems logically' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
