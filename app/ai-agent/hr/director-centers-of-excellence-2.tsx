import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-centers-of-excellence-2',
    name: 'Director of Centers of Excellence - Learning & Analytics',
    title: 'AI Director of Centers of Excellence - Learning & Analytics',
    description: 'The AI Director of Centers of Excellence for Learning & Analytics oversees specialized learning programs and advanced analytics capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Learning COE','Analytics COE','Advanced Analytics','Learning Innovation','Data Science','Program Excellence','Team Leadership"],
    icon: Star,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$170k/year',
    aiCost: '$4k/year',
    efficiency: '43x efficiency improvement',
    replacesRole: 'director-coe',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 890,
      responseTime: '1.4s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['learning-coe-team', 'analytics-coe-team'],
    },
    specializedCapabilities: [
      'Learning COE',
      'Analytics COE',
      'Advanced Analytics',
      'Learning Innovation',
      'Data Science',
      'Program Excellence',
      'Predictive Modeling',
      'Insight Generation'
    ],
    integrationOptions: [
      'Learning Platforms',
      'Analytics Systems',
      'Data Science Tools',
      'ML Platforms',
      'BI Tools',
      'Knowledge Systems',
      'Innovation Labs',
      'Analytics Suite'
    ],
    automationFeatures: [
      'Learning Innovation',
      'Analytics Automation',
      'Model Training',
      'Insight Generation',
      'Program Standardization',
      'Data Pipeline',
      'Report Generation',
      'Innovation Tracking'
    ],
    kpiMetrics: [
      'Learning Innovation',
      'Analytics Maturity',
      'Model Accuracy',
      'Insight Adoption',
      'Program Excellence',
      'Data Quality',
      'Innovation Rate',
      'User Success'
    ],
    customOptions: {
      coeFocus: 'learning-analytics',
      analyticsLevel: 'advanced',
      learningModel: 'innovative',
      innovationPace: 'continuous',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Advanced predictive analytics' },
      { id: 'learning', enabled: true, name: 'Learning Core', description: 'Drives learning innovation' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dcoe_1', name: 'Learning COE', category: 'Learning', description: 'Lead learning COE', level: 'expert' },
      { id: 'dcoe_2', name: 'Analytics COE', category: 'Analytics', description: 'Lead analytics COE', level: 'expert' },
      { id: 'dcoe_3', name: 'Advanced Analytics', category: 'Analytics', description: 'Advanced analytics', level: 'expert' },
      { id: 'dcoe_4', name: 'Data Science', category: 'Data', description: 'Apply data science', level: 'expert' },
      { id: 'dcoe_5', name: 'Learning Innovation', category: 'Innovation', description: 'Innovate learning', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Analytical thinker' },
      { trait: 'Innovative', value: 9, description: 'Innovative mindset' },
      { trait: 'Data-driven', value: 9, description: 'Data-driven approach' },
      { trait: 'Learning-focused', value: 9, description: 'Focuses on learning' },
      { trait: 'Technical', value: 8, description: 'Technical aptitude' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
