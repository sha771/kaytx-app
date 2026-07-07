import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-technology-2',
    name: 'Director of HR Technology - Digital Transformation',
    title: 'AI Director of HR Technology - Digital Transformation',
    description: 'The AI Director of HR Technology for Digital Transformation leads HR digital initiatives, automation projects, and employee experience technology.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Digital Strategy","Automation Projects","Employee Experience Technology","Digital Adoption","Innovation Management","Change Enablement","Team Leadership"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-hr-tech',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 895,
      responseTime: '1.4s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['digital-team', 'automation-specialists'],
    },
    specializedCapabilities: [
      'Digital Strategy',
      'Automation Projects',
      'Employee Experience Technology',
      'Digital Adoption',
      'Innovation Management',
      'Change Enablement',
      'User Experience',
      'Transformation Leadership'
    ],
    integrationOptions: [
      'Digital Platforms',
      'Automation Tools',
      'Experience Platforms',
      'Adoption Systems',
      'Innovation Labs',
      'UX Tools',
      'Analytics Suite',
      'Communication Platforms'
    ],
    automationFeatures: [
      'Digital Initiative Management',
      'Automation Project Tracking',
      'Adoption Monitoring',
      'Experience Optimization',
      'Innovation Pipeline',
      'Change Management',
      'Progress Reporting',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Digital Adoption',
      'Automation Rate',
      'Experience Score',
      'Innovation Velocity',
      'Transformation Progress',
      'User Engagement',
      'Cost Reduction',
      'Time to Value'
    ],
    customOptions: {
      digitalFocus: 'employee-experience',
      automationLevel: 'intelligent',
      innovationPace: 'rapid',
      adoptionStrategy: 'user-centered',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts digital trends' },
      { id: 'digital', enabled: true, name: 'Digital Core', description: 'Drives digital transformation' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dht_1', name: 'Digital Strategy', category: 'Strategy', description: 'Develop digital strategy', level: 'expert' },
      { id: 'dht_2', name: 'Automation Projects', category: 'Automation', description: 'Run automation projects', level: 'expert' },
      { id: 'dht_3', name: 'Employee Experience', category: 'Experience', description: 'Enhance employee experience', level: 'expert' },
      { id: 'dht_4', name: 'Digital Adoption', category: 'Adoption', description: 'Drive digital adoption', level: 'expert' },
      { id: 'dht_5', name: 'Innovation', category: 'Innovation', description: 'Manage innovation', level: 'expert' }
    ],
    personality: [
      { trait: 'Visionary', value: 10, description: 'Digital visionary' },
      { trait: 'Innovative', value: 9, description: 'Innovation-focused' },
      { trait: 'User-centric', value: 9, description: 'User-centered approach' },
      { trait: 'Agile', value: 9, description: 'Agile mindset' },
      { trait: 'Influential', value: 8, description: 'Influential leader' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
