import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function BankingTechnologyDirectorPage() {
  const agent = {
    id: 'banking-technology-director',
    name: 'AI Banking Technology Director',
    title: 'AI Banking Technology Director',
    description: 'The AI Banking Technology Director leads banking technology infrastructure, manages core banking systems, oversees fintech integration, and ensures robust technology solutions for all banking operations.',
    capabilities: ["Banking Technology","Core Banking Systems","Fintech Integration","Technology Infrastructure","System Architecture","Banking Security","Technology Operations","Digital Banking Tech","System Performance","Innovation"],
    icon: Cpu,
    color: '#607D8B',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$5k/year',
    efficiency: '33x efficiency improvement',
    replacesRole: 'banking-technology-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,500',
      tasksAutomatedDaily: 490,
      responseTime: '1.1s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Banking & Finance',
      level: 'director',
      reportsTo: 'chief-banking-officer',
      manages: ['core-banking-manager', 'fintech-integrator', 'security-lead'],
    },
    specializedCapabilities: [
      'Banking Technology',
      'Core Banking Systems',
      'Fintech Integration',
      'Technology Infrastructure',
      'System Architecture',
      'Banking Security',
      'Technology Operations',
      'Digital Banking Tech'
    ],
    integrationOptions: [
      'Core Banking Systems',
      'Fintech Platforms',
      'Technology Infrastructure',
      'Security Systems',
      'Integration Platforms',
      'Digital Banking',
      'Monitoring Tools',
      'Innovation Labs'
    ],
    automationFeatures: [
      'Banking Technology',
      'Core Banking Systems',
      'Fintech Integration',
      'Technology Infrastructure',
      'System Architecture',
      'Banking Security',
      'Technology Operations',
      'System Performance'
    ],
    kpiMetrics: [
      'System Uptime',
      'Core Banking Performance',
      'Fintech Integration Success',
      'Technology Innovation',
      'Security Effectiveness',
      'Infrastructure Efficiency',
      'Digital Banking Performance',
      'Technology ROI'
    ],
    customOptions: {
      technologyStrategy: 'robust',
      coreBankingPriority: 'reliability',
      fintechIntegration: 'strategic',
      securityStandard: 'highest',
      innovationFocus: 'continuous'
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
      { id: 'tech', enabled: true, name: 'Technology Innovator', description: 'Innovates banking technology' },
      { id: 'core', enabled: true, name: 'Core Banking Manager', description: 'Manages core banking systems' },
      { id: 'security', enabled: true, name: 'Security Protector', description: 'Protects banking systems' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'banktech_1', name: 'Banking Technology', category: 'Technology', description: 'Lead banking technology', level: 'expert' },
      { id: 'banktech_2', name: 'Core Banking Systems', category: 'Core Banking', description: 'Manage core banking systems', level: 'expert' },
      { id: 'banktech_3', name: 'Fintech Integration', category: 'Fintech', description: 'Integrate fintech solutions', level: 'expert' },
      { id: 'banktech_4', name: 'Technology Infrastructure', category: 'Infrastructure', description: 'Manage technology infrastructure', level: 'expert' },
      { id: 'banktech_5', name: 'Banking Security', category: 'Security', description: 'Ensure banking security', level: 'expert' }
    ],
    personality: [
      { trait: 'Technical Excellence', value: 10, description: 'Technical expert' },
      { trait: 'Security Focus', value: 10, description: 'Security-conscious' },
      { trait: 'Innovation', value: 9, description: 'Technology innovator' },
      { trait: 'Reliability', value: 10, description: 'Highly reliable' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic technology planner' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}