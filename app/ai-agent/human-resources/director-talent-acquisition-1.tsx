import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-talent-acquisition-1',
    name: 'Director of Talent Acquisition - Technical',
    title: 'AI Director of Talent Acquisition - Technical',
    description: 'The AI Director of Talent Acquisition for Technical roles oversees recruitment strategies for engineering, IT, and technical positions, ensuring top technical talent acquisition.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Technical Recruiting Strategy","Talent Pipeline Management","Sourcing Strategy","Employer Branding","Interview Process Design","Offer Management","Team Leadership"],
    icon: UserPlus,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'director-talent-acquisition',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 910,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-talent',
      manages: ['technical-recruiters', 'sourcing-specialists'],
    },
    specializedCapabilities: [
      'Technical Talent Strategy',
      'Engineering Recruitment',
      'IT Talent Acquisition',
      'Developer Sourcing',
      'Technical Interview Design',
      'Competitive Analysis',
      'Tech Brand Building',
      'Offer Negotiation'
    ],
    integrationOptions: [
      'Technical ATS',
      'GitHub/GitLab',
      'LinkedIn Recruiter',
      'Stack Overflow Talent',
      'Code Assessment Platforms',
      'Technical Interview Tools',
      'Referral Systems',
      'Analytics Platforms'
    ],
    automationFeatures: [
      'Technical Sourcing',
      'Resume Screening',
      'Code Test Automation',
      'Interview Scheduling',
      'Offer Generation',
      'Candidate Communication',
      'Pipeline Management',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Time to Fill Technical',
      'Quality of Hire',
      'Source of Hire',
      'Offer Acceptance Rate',
      'Candidate Experience',
      'Cost per Hire',
      'Pipeline Health',
      'Diversity Metrics'
    ],
    customOptions: {
      focus: 'technical',
      sourcingStrategy: 'multi-channel',
      assessmentType: 'technical',
      brandFocus: 'tech-forward',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts technical talent needs' },
      { id: 'sourcing', enabled: true, name: 'Sourcing Core', description: 'Optimizes technical sourcing' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dta_1', name: 'Technical Recruiting', category: 'Recruiting', description: 'Recruit technical talent', level: 'expert' },
      { id: 'dta_2', name: 'Engineering Strategy', category: 'Strategy', description: 'Technical recruitment strategy', level: 'expert' },
      { id: 'dta_3', name: 'Sourcing', category: 'Recruiting', description: 'Source technical candidates', level: 'expert' },
      { id: 'dta_4', name: 'Technical Assessment', category: 'Operations', description: 'Assess technical skills', level: 'expert' },
      { id: 'dta_5', name: 'Tech Branding', category: 'Branding', description: 'Build tech employer brand', level: 'expert' }
    ],
    personality: [
      { trait: 'Tech-savvy', value: 10, description: 'Understands technical roles' },
      { trait: 'Talent-focused', value: 9, description: 'Focuses on talent quality' },
      { trait: 'Innovative', value: 9, description: 'Uses innovative sourcing' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Collaborative', value: 8, description: 'Works with hiring managers' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
