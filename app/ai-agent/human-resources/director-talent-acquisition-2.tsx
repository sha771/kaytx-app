import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-talent-acquisition-2',
    name: 'Director of Talent Acquisition - Sales & Marketing',
    title: 'AI Director of Talent Acquisition - Sales & Marketing',
    description: 'The AI Director of Talent Acquisition for Sales & Marketing oversees recruitment strategies for revenue-generating roles, ensuring top sales and marketing talent acquisition.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Sales Recruiting Strategy","Marketing Talent Acquisition","Talent Pipeline Management","Employer Branding","Interview Process Design","Offer Management","Team Leadership"],
    icon: UserPlus,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-talent-acquisition',
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
      responseTime: '1.6s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-talent',
      manages: ['sales-recruiters', 'marketing-recruiters'],
    },
    specializedCapabilities: [
      'Sales Talent Strategy',
      'Marketing Recruitment',
      'Revenue Talent Acquisition',
      'Executive Sourcing',
      'Sales Interview Design',
      'Competitive Analysis',
      'Revenue Brand Building',
      'Compensation Strategy'
    ],
    integrationOptions: [
      'Sales ATS',
      'LinkedIn Recruiter',
      'Salesforce',
      'Marketing Platforms',
      'Assessment Tools',
      'Compensation Systems',
      'Referral Platforms',
      'Analytics Suite'
    ],
    automationFeatures: [
      'Sales Sourcing',
      'Resume Screening',
      'Assessment Automation',
      'Interview Scheduling',
      'Offer Generation',
      'Candidate Communication',
      'Pipeline Management',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Time to Fill Sales',
      'Quality of Hire',
      'Revenue per Hire',
      'Offer Acceptance Rate',
      'Candidate Experience',
      'Cost per Hire',
      'Pipeline Health',
      ' Ramp Time'
    ],
    customOptions: {
      focus: 'sales-marketing',
      sourcingStrategy: 'performance-based',
      assessmentType: 'behavioral',
      brandFocus: 'revenue-driven',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts revenue talent needs' },
      { id: 'performance', enabled: true, name: 'Performance Core', description: 'Predicts sales performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dta_1', name: 'Sales Recruiting', category: 'Recruiting', description: 'Recruit sales talent', level: 'expert' },
      { id: 'dta_2', name: 'Marketing Strategy', category: 'Strategy', description: 'Marketing recruitment strategy', level: 'expert' },
      { id: 'dta_3', name: 'Revenue Focus', category: 'Strategy', description: 'Focus on revenue roles', level: 'expert' },
      { id: 'dta_4', name: 'Compensation Design', category: 'Compensation', description: 'Design comp packages', level: 'expert' },
      { id: 'dta_5', name: 'Executive Sourcing', category: 'Recruiting', description: 'Source executive talent', level: 'expert' }
    ],
    personality: [
      { trait: 'Revenue-focused', value: 10, description: 'Focuses on revenue impact' },
      { trait: 'Competitive', value: 9, description: 'Competitive in talent market' },
      { trait: 'Results-driven', value: 9, description: 'Driven by results' },
      { trait: 'Strategic', value: 9, description: 'Strategic in recruitment' },
      { trait: 'Collaborative', value: 8, description: 'Works with sales leaders' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
