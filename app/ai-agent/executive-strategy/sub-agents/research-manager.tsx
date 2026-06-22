import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Library } from 'lucide-react-native';

export default function ResearchManagerPage() {
  const agent = {
    id: 'research-manager',
    name: 'AI Research Manager',
    title: 'AI Research Manager',
    description: 'The AI Research Manager manages market research projects, coordinates research activities, and ensures research quality.',
    capabilities: ["Task Automation","Data Processing","Research Management","Project Coordination","Quality Assurance","Research Design","Team Leadership","Knowledge Management"],
    icon: Library,
    color: '#7C4DFF',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$2.8k/year',
    efficiency: '39x efficiency improvement',
    replacesRole: 'research-manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,900',
      tasksAutomatedDaily: 680,
      responseTime: '1.3s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Executive & Strategy',
      level: 'manager',
      reportsTo: 'vp-market-intelligence',
      manages: ['research-analyst', 'data-specialist', 'quality-assurance'],
    },
    specializedCapabilities: [
      'Research Management',
      'Project Coordination',
      'Quality Assurance',
      'Research Design',
      'Team Leadership',
      'Knowledge Management',
      'Research Analytics',
      'Methodology Development'
    ],
    integrationOptions: [
      'Research Platforms',
      'Project Management',
      'Quality Systems',
      'Analytics Tools',
      'Knowledge Management',
      'Communication Systems',
      'Data Management'
    ],
    automationFeatures: [
      'Research Management',
      'Project Coordination',
      'Quality Assurance',
      'Research Design',
      'Team Coordination',
      'Knowledge Management',
      'Research Analytics',
      'Methodology Development'
    ],
    kpiMetrics: [
      'Research Quality',
      'Project Completion',
      'Team Performance',
      'Knowledge Creation',
      'Methodology Excellence',
      'Research Impact',
      'Quality Metrics',
      'Knowledge Sharing'
    ],
    customOptions: {
      researchQuality: 'high',
      methodologyStandard: 'rigorous',
      teamCollaboration: 'high',
      knowledgeSharing: 'active',
      qualityStandard: 'strict'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'quality', enabled: true, name: 'Quality Analyzer', description: 'Analyzes research quality' },
      { id: 'predictive', enabled: true, name: 'Impact Predictor', description: 'Predicts research impact' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rm_1', name: 'Research Management', category: 'Research', description: 'Manage research', level: 'expert' },
      { id: 'rm_2', name: 'Project Coordination', category: 'Project', description: 'Coordinate projects', level: 'expert' },
      { id: 'rm_3', name: 'Quality Assurance', category: 'Quality', description: 'Ensure quality', level: 'expert' },
      { id: 'rm_4', name: 'Research Design', category: 'Design', description: 'Design research', level: 'expert' },
      { id: 'rm_5', name: 'Knowledge Management', category: 'Knowledge', description: 'Manage knowledge', level: 'advanced' }
    ],
    personality: [
      { trait: 'Research Excellence', value: 10, description: 'Committed to research quality' },
      { trait: 'Leadership', value: 9, description: 'Strong leader' },
      { trait: 'Analytical Thinking', value: 10, description: 'Strong analytical skills' },
      { trait: 'Organization', value: 9, description: 'Highly organized' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
