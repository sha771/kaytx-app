import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-talent-acquisition-3',
    name: 'Director of Talent Acquisition - Executive',
    title: 'AI Director of Talent Acquisition - Executive',
    description: 'The AI Director of Talent Acquisition for Executive roles oversees recruitment strategies for C-level and senior leadership positions, ensuring top executive talent acquisition.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Executive Recruiting Strategy","C-level Talent Acquisition","Executive Sourcing","Confidential Searches","Executive Interview Design","Executive Compensation","Team Leadership"],
    icon: UserPlus,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$4k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'director-executive-search',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 860,
      responseTime: '1.8s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['executive-recruiters', 'research-associates'],
    },
    specializedCapabilities: [
      'Executive Search Strategy',
      'C-level Recruitment',
      'Board Recruitment',
      'Confidential Searches',
      'Executive Assessment',
      'Compensation Design',
      'Succession Planning',
      'Onboarding Strategy'
    ],
    integrationOptions: [
      'Executive Search Platforms',
      'Board Networks',
      'Compensation Analytics',
      'Assessment Centers',
      'Background Check Services',
      'Legal Compliance',
      'Reference Platforms',
      'Analytics Suite'
    ],
    automationFeatures: [
      'Executive Sourcing',
      'Market Mapping',
      'Candidate Research',
      'Confidential Communication',
      'Assessment Coordination',
      'Reference Automation',
      'Offer Management',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Time to Fill Executive',
      'Quality of Executive Hire',
      'Retention Rate',
      'Diversity at Executive Level',
      'Success Rate',
      'Cost per Hire',
      'Candidate Experience',
      'Board Placement Success'
    ],
    customOptions: {
      focus: 'executive',
      searchType: 'confidential',
      assessmentLevel: 'executive',
      confidentiality: 'high',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts executive needs' },
      { id: 'succession', enabled: true, name: 'Succession Core', description: 'Manages succession planning' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dta_1', name: 'Executive Search', category: 'Recruiting', description: 'Conduct executive searches', level: 'expert' },
      { id: 'dta_2', name: 'C-level Strategy', category: 'Strategy', description: 'Executive recruitment strategy', level: 'expert' },
      { id: 'dta_3', name: 'Confidentiality', category: 'Operations', description: 'Maintain confidentiality', level: 'expert' },
      { id: 'dta_4', name: 'Executive Assessment', category: 'Assessment', description: 'Assess executives', level: 'expert' },
      { id: 'dta_5', name: 'Succession Planning', category: 'Strategy', description: 'Plan succession', level: 'expert' }
    ],
    personality: [
      { trait: 'Discretion', value: 10, description: 'Maintains strict confidentiality' },
      { trait: 'Executive-presence', value: 9, description: 'Executive-level presence' },
      { trait: 'Strategic', value: 9, description: 'Strategic in approach' },
      { trait: 'Networked', value: 9, description: 'Strong executive network' },
      { trait: 'Results-driven', value: 8, description: 'Driven by results' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
