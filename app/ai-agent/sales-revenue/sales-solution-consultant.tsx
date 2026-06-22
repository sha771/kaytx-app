import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function SalesSolutionConsultantPage() {
  const agent = {
    id: 'sales-solution-consultant',
    name: 'AI Sales Solution Consultant',
    title: 'AI Sales Solution Consultant',
    description: 'The AI Sales Solution Consultant develops tailored solutions and proposals to address specific customer needs and pain points.',
    capabilities: ["Task Automation","Data Processing","Solution Development","Proposal Creation","Needs Analysis","Communication","Analytics","Sales Intelligence"],
    icon: Lightbulb,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'solution-consultant',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 355,
      responseTime: '0.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'consultant',
      reportsTo: 'vp-sales',
      manages: [],
    },
    specializedCapabilities: [
      'Solution Development',
      'Proposal Creation',
      'Needs Analysis',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Solution Platforms',
      'Proposal Tools',
      'CRM Systems',
      'Communication Platforms',
      'Solution Data',
      'Proposal Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Solution Development',
      'Proposal Creation',
      'Needs Analysis',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Solution Quality',
      'Proposal Win Rate',
      'Needs Accuracy',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      solutionFocus: 'high',
      developmentEfficiency: 'maximum',
      proposalAccuracy: 'optimized',
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
      { id: 'solution', enabled: true, name: 'Solution Developer', description: 'Develops solutions' },
      { id: 'proposal', enabled: true, name: 'Proposal Creator', description: 'Creates proposals' },
      { id: 'needs', enabled: true, name: 'Needs Analyzer', description: 'Analyzes needs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Solution Development', category: 'Solution', description: 'Develop solutions', level: 'expert' },
      { id: 'sales_2', name: 'Proposal Creation', category: 'Proposal', description: 'Create proposals', level: 'expert' },
      { id: 'sales_3', name: 'Needs Analysis', category: 'Needs', description: 'Analyze needs', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Solution Expertise', value: 10, description: 'Solution expertise' },
      { trait: 'Development Focus', value: 10, description: 'Development oriented' },
      { trait: 'Proposal Skills', value: 10, description: 'Proposal skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
