import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layers } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-shared-services-2',
    name: 'Director of Shared Services - Centers of Expertise',
    title: 'AI Director of Shared Services - Centers of Expertise',
    description: 'The AI Director of Shared Services for Centers of Expertise manages specialized HR service centers, expert support functions, and knowledge management.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","COE Management','Expert Services','Knowledge Management','Specialized Support','Subject Matter Expertise','Service Specialization','Team Leadership"],
    icon: Layers,
    color: '#009688',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-shared-services',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 880,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-hr-ops',
      manages: ['coe-team', 'subject-matter-experts'],
    },
    specializedCapabilities: [
      'COE Management',
      'Expert Services',
      'Knowledge Management',
      'Specialized Support',
      'Subject Matter Expertise',
      'Service Specialization',
      'Expert Network',
      'Knowledge Transfer'
    ],
    integrationOptions: [
      'COE Platforms',
      'Knowledge Systems',
      'Expert Networks',
      'Specialized Tools',
      'Analytics Suite',
      'Communication Platforms',
      'Learning Systems',
      'Collaboration Tools'
    ],
    automationFeatures: [
      'Expert Routing',
      'Knowledge Capture',
      'Service Specialization',
      'Expert Availability',
      'Knowledge Sharing',
      'Expert Network Management',
      'Report Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Expert Utilization',
      'Knowledge Coverage',
      'Specialization Depth',
      'Service Quality',
      'Response Time',
      'Knowledge Transfer',
      'Expert Satisfaction',
      'User Success'
    ],
    customOptions: {
      coeModel: 'specialized',
      knowledgeStrategy: 'captured',
      expertiseLevel: 'deep',
      serviceType: 'expert',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts expertise needs' },
      { id: 'knowledge', enabled: true, name: 'Knowledge Core', description: 'Manages knowledge' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dss_1', name: 'COE Management', category: 'Management', description: 'Manage COEs', level: 'expert' },
      { id: 'dss_2', name: 'Expert Services', category: 'Service', description: 'Provide expert services', level: 'expert' },
      { id: 'dss_3', name: 'Knowledge Management', category: 'Knowledge', description: 'Manage knowledge', level: 'expert' },
      { id: 'dss_4', name: 'Specialized Support', category: 'Support', description: 'Provide specialized support', level: 'expert' },
      { id: 'dss_5', name: 'Subject Matter Expertise', category: 'Expertise', description: 'Leverage SME expertise', level: 'expert' }
    ],
    personality: [
      { trait: 'Expertise-focused', value: 10, description: 'Focuses on expertise' },
      { trait: 'Knowledge-driven', value: 9, description: 'Knowledge-focused' },
      { trait: 'Specialized', value: 9, description: 'Specialized approach' },
      { trait: 'Collaborative', value: 9, description: 'Collaborates with experts' },
      { trait: 'Service-oriented', value: 8, description: 'Service-focused' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
