import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-policy-2',
    name: 'Director of HR Policy - Communication & Education',
    title: 'AI Director of HR Policy - Communication & Education',
    description: 'The AI Director of HR Policy for Communication & Education manages policy communication, employee education, and policy adoption programs.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Policy Communication','Employee Education','Policy Adoption','Training Delivery','Feedback Management','Change Communication','Team Leadership"],
    icon: FileText,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-policy',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 855,
      responseTime: '1.7s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['communication-team', 'policy-trainers'],
    },
    specializedCapabilities: [
      'Policy Communication',
      'Employee Education',
      'Policy Adoption',
      'Training Delivery',
      'Feedback Management',
      'Change Communication',
      'Policy Analytics',
      'Engagement Tracking'
    ],
    integrationOptions: [
      'Communication Platforms',
      'Learning Systems',
      'Training Tools',
      'Survey Platforms',
      'HRIS Integration',
      'Feedback Systems',
      'Analytics Suite',
      'Mobile Apps'
    ],
    automationFeatures: [
      'Communication Delivery',
      'Training Assignment',
      'Adoption Tracking',
      'Feedback Collection',
      'Engagement Monitoring',
      'Change Management',
      'Report Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Communication Reach',
      'Training Completion',
      'Policy Adoption',
      'Employee Understanding',
      'Feedback Response',
      'Engagement Score',
      'Change Success',
      'Satisfaction Rate'
    ],
    customOptions: {
      communicationStyle: 'multi-channel',
      educationModel: 'blended',
      adoptionFocus: 'behavioral',
      feedbackLevel: 'continuous',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts adoption needs' },
      { id: 'communication', enabled: true, name: 'Communication Core', description: 'Optimizes policy communication' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dhp_1', name: 'Policy Communication', category: 'Communication', description: 'Communicate policies', level: 'expert' },
      { id: 'dhp_2', name: 'Employee Education', category: 'Education', description: 'Educate employees', level: 'expert' },
      { id: 'dhp_3', name: 'Policy Adoption', category: 'Adoption', description: 'Drive adoption', level: 'expert' },
      { id: 'dhp_4', name: 'Training Delivery', category: 'Training', description: 'Deliver training', level: 'expert' },
      { id: 'dhp_5', name: 'Feedback Management', category: 'Feedback', description: 'Manage feedback', level: 'expert' }
    ],
    personality: [
      { trait: 'Communicative', value: 10, description: 'Excellent communicator' },
      { trait: 'Educational', value: 9, description: 'Educational approach' },
      { trait: 'Engaging', value: 9, description: 'Engaging style' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic to employees' },
      { trait: 'Collaborative', value: 8, description: 'Collaborates widely' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
