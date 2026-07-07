import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { UserPlus } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-talent-acquisition-4',
    name: 'Director of Talent Acquisition - Campus & Early Career',
    title: 'AI Director of Talent Acquisition - Campus & Early Career',
    description: 'The AI Director of Talent Acquisition for Campus & Early Career oversees recruitment strategies for university graduates and early-career professionals, building future talent pipelines.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Campus Recruiting Strategy","Early Career Talent Acquisition","University Partnerships","Internship Programs","Campus Events Management","Graduate Hiring","Team Leadership"],
    icon: UserPlus,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$155k/year',
    aiCost: '$3.5k/year',
    efficiency: '44x efficiency improvement',
    replacesRole: 'director-campus-recruiting',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 850,
      responseTime: '1.7s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-talent',
      manages: ['campus-recruiters', 'university-relations-team'],
    },
    specializedCapabilities: [
      'Campus Strategy',
      'University Partnerships',
      'Internship Programs',
      'Graduate Recruitment',
      'Early Career Development',
      'Campus Brand Building',
      'Diversity Programs',
      'Pipeline Development'
    ],
    integrationOptions: [
      'Campus Recruiting Platforms',
      'University Systems',
      'Handshake',
      'LinkedIn Campus',
      'Assessment Platforms',
      'Internship Management',
      'Event Platforms',
      'Analytics Suite'
    ],
    automationFeatures: [
      'Campus Sourcing',
      'Event Scheduling',
      'Application Processing',
      'Interview Coordination',
      'Offer Management',
      'Communication Automation',
      'Pipeline Tracking',
      'Reporting Automation'
    ],
    kpiMetrics: [
      'Campus Hire Count',
      'University Diversity',
      'Intern Conversion Rate',
      'Time to Offer',
      'Candidate Experience',
      'Cost per Hire',
      'Pipeline Health',
      'Retention Rate'
    ],
    customOptions: {
      focus: 'campus',
      strategyType: 'pipeline-building',
      developmentFocus: 'early-career',
      partnershipLevel: 'strategic',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts campus talent needs' },
      { id: 'pipeline', enabled: true, name: 'Pipeline Core', description: 'Builds talent pipelines' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dta_1', name: 'Campus Recruiting', category: 'Recruiting', description: 'Recruit from campuses', level: 'expert' },
      { id: 'dta_2', name: 'University Relations', category: 'Relations', description: 'Manage university partnerships', level: 'expert' },
      { id: 'dta_3', name: 'Early Career', category: 'Development', description: 'Develop early career talent', level: 'expert' },
      { id: 'dta_4', name: 'Internship Programs', category: 'Programs', description: 'Run internship programs', level: 'expert' },
      { id: 'dta_5', name: 'Pipeline Building', category: 'Strategy', description: 'Build talent pipelines', level: 'expert' }
    ],
    personality: [
      { trait: 'Youth-focused', value: 10, description: 'Connects with early talent' },
      { trait: 'Energetic', value: 9, description: 'High energy for campus events' },
      { trait: 'Relationship-builder', value: 9, description: 'Builds university relationships' },
      { trait: 'Strategic', value: 9, description: 'Strategic in pipeline building' },
      { trait: 'Mentoring', value: 8, description: 'Mentors early career talent' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
