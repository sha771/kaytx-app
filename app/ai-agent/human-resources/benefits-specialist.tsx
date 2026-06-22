import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function BenefitsSpecialistPage() {
  const agent = {
    id: 'benefits-specialist',
    name: 'AI Benefits Specialist',
    title: 'AI Benefits Specialist',
    description: 'The AI Benefits Specialist manages comprehensive benefits programs, handles benefits administration, and ensures employees receive optimal benefits support and guidance.',
    capabilities: ["Benefits Administration","Enrollment Management","Claims Support","Benefits Communication","Compliance Management","Vendor Relations","Cost Analysis","Employee Education"],
    icon: Heart,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$4k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'benefits-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,917',
      tasksAutomatedDaily: 285,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      reportsTo: 'vp-compensation',
      manages: [],
    },
    specializedCapabilities: ['Benefits Administration','Enrollment Management','Claims Support','Benefits Communication','Compliance Management'],
    integrationOptions: ['Benefits Platforms','Insurance Systems','HRIS Integration','Communication Tools'],
    automationFeatures: ['Benefits Enrollment','Claims Processing','Benefits Communication','Compliance Monitoring'],
    kpiMetrics: ['Enrollment Rate','Claims Processing Time','Employee Satisfaction','Cost Efficiency','Compliance Score'],
    customOptions: { benefitsCoverage: 'comprehensive', supportLevel: 'high', communicationStyle: 'personalized' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'admin', enabled: true, name: 'Benefits Administrator', description: 'Administers benefits' },
      { id: 'enroll', enabled: true, name: 'Enrollment Manager', description: 'Manages enrollments' },
      { id: 'support', enabled: true, name: 'Claims Support', description: 'Supports claims' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'bs_1', name: 'Benefits Administration', category: 'Administration', description: 'Administer benefits', level: 'expert' },
      { id: 'bs_2', name: 'Enrollment Management', category: 'Enrollment', description: 'Manage enrollments', level: 'expert' },
      { id: 'bs_3', name: 'Benefits Communication', category: 'Communication', description: 'Communicate benefits', level: 'expert' }
    ],
    personality: [
      { trait: 'Employee Care', value: 10, description: 'Employee focused' },
      { trait: 'Benefits Knowledge', value: 9, description: 'Benefits expert' },
      { trait: 'Supportive', value: 9, description: 'Supportive nature' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
