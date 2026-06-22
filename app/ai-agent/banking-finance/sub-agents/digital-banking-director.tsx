import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Smartphone } from 'lucide-react-native';

export default function DigitalBankingDirectorPage() {
  const agent = {
    id: 'digital-banking-director',
    name: 'AI Digital Banking Director',
    title: 'AI Digital Banking Director',
    description: 'The AI Digital Banking Director leads digital banking strategy, manages mobile and online banking platforms, oversees digital customer experience, and drives digital transformation across all banking channels.',
    capabilities: ["Digital Banking Strategy","Mobile Banking","Online Banking","Digital Experience","Digital Transformation","Banking Apps","Digital Channels","Customer Digital Journey","Fintech Integration","Digital Innovation"],
    icon: Smartphone,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$150k/year',
    aiCost: '$5k/year',
    efficiency: '30x efficiency improvement',
    replacesRole: 'digital-banking-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,500',
      tasksAutomatedDaily: 470,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'director',
      reportsTo: 'vp-digital-banking',
      manages: ['mobile-banking-manager', 'online-banking-lead', 'digital-experience'],
    },
    specializedCapabilities: [
      'Digital Banking Strategy',
      'Mobile Banking',
      'Online Banking',
      'Digital Experience',
      'Digital Transformation',
      'Banking Apps',
      'Digital Channels',
      'Customer Digital Journey'
    ],
    integrationOptions: [
      'Digital Banking Platforms',
      'Mobile Apps',
      'Online Banking',
      'Digital Experience',
      'Fintech Integration',
      'Customer Journey',
      'Digital Channels',
      'Innovation Labs'
    ],
    automationFeatures: [
      'Digital Banking Strategy',
      'Mobile Banking',
      'Online Banking',
      'Digital Experience',
      'Digital Transformation',
      'Banking Apps',
      'Digital Channels',
      'Customer Digital Journey'
    ],
    kpiMetrics: [
      'Digital Adoption',
      'Mobile Usage',
      'Online Banking Success',
      'Digital Experience Rating',
      'Digital Channel Performance',
      'Customer Digital Satisfaction',
      'App Usage',
      'Digital Transformation Success'
    ],
    customOptions: {
      digitalStrategy: 'customer-centric',
      mobilePriority: 'primary',
      onlineBankingFocus: 'seamless',
      digitalExperience: 'exceptional',
      fintechIntegration: 'strategic'
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
      { id: 'digital', enabled: true, name: 'Digital Transformer', description: 'Transforms banking digitally' },
      { id: 'mobile', enabled: true, name: 'Mobile Banking Manager', description: 'Manages mobile banking' },
      { id: 'experience', enabled: true, name: 'Digital Experience Designer', description: 'Designs digital experiences' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'digital_1', name: 'Digital Banking Strategy', category: 'Digital', description: 'Lead digital banking strategy', level: 'expert' },
      { id: 'digital_2', name: 'Mobile Banking', category: 'Mobile', description: 'Manage mobile banking', level: 'expert' },
      { id: 'digital_3', name: 'Online Banking', category: 'Online', description: 'Manage online banking', level: 'expert' },
      { id: 'digital_4', name: 'Digital Experience', category: 'Experience', description: 'Design digital experiences', level: 'expert' },
      { id: 'digital_5', name: 'Digital Transformation', category: 'Transformation', description: 'Lead digital transformation', level: 'expert' }
    ],
    personality: [
      { trait: 'Digital Excellence', value: 10, description: 'Digital banking expert' },
      { trait: 'Innovation', value: 10, description: 'Digital innovation leader' },
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric approach' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic digital planner' },
      { trait: 'Technology Aptitude', value: 10, description: 'Strong technology skills' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}