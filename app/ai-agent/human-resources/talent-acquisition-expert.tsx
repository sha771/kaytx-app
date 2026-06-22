import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function TalentAcquisitionExpertPage() {
  const agent = {
    id: 'talent-acquisition-expert',
    name: 'AI Talent Acquisition Expert',
    title: 'AI Talent Acquisition Expert',
    description: 'The AI Talent Acquisition Expert specializes in advanced talent acquisition strategies, sourcing methodologies, and recruitment best practices to attract top talent.',
    capabilities: ["Advanced Sourcing","Recruitment Strategy","Talent Pipeline Management","Employer Branding","Candidate Experience","Recruitment Analytics","Market Intelligence","Competitive Analysis"],
    icon: Users,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$5.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'talent-acquisition-expert',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$8,250',
      tasksAutomatedDaily: 395,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'vp-talent-acquisition',
      manages: [],
    },
    specializedCapabilities: ['Advanced Sourcing','Recruitment Strategy','Talent Pipeline Management','Employer Branding','Market Intelligence'],
    integrationOptions: ['ATS Platforms','Sourcing Tools','Social Media','Job Boards'],
    automationFeatures: ['Automated Sourcing','Candidate Screening','Pipeline Management','Market Analysis'],
    kpiMetrics: ['Time to Fill','Quality of Hire','Sourcing Effectiveness','Candidate Satisfaction','Cost per Hire'],
    customOptions: { sourcingDepth: 'comprehensive', pipelineQuality: 'high', marketCoverage: 'global' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'sourcing', enabled: true, name: 'Advanced Sourcer', description: 'Sources top talent' },
      { id: 'strategy', enabled: true, name: 'Recruitment Strategist', description: 'Develops recruitment strategies' },
      { id: 'pipeline', enabled: true, name: 'Pipeline Manager', description: 'Manages talent pipelines' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'tae_1', name: 'Advanced Sourcing', category: 'Sourcing', description: 'Source top talent', level: 'expert' },
      { id: 'tae_2', name: 'Recruitment Strategy', category: 'Strategy', description: 'Develop recruitment strategies', level: 'expert' },
      { id: 'tae_3', name: 'Talent Pipeline Management', category: 'Pipeline', description: 'Manage talent pipelines', level: 'expert' }
    ],
    personality: [
      { trait: 'Talent Focus', value: 10, description: 'Talent oriented' },
      { trait: 'Strategic Sourcing', value: 9, description: 'Strategic sourcer' },
      { trait: 'Market Savvy', value: 9, description: 'Market aware' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
