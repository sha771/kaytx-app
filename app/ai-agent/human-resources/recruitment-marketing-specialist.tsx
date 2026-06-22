import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function RecruitmentMarketingSpecialistPage() {
  const agent = {
    id: 'recruitment-marketing-specialist',
    name: 'AI Recruitment Marketing Specialist',
    title: 'AI Recruitment Marketing Specialist',
    description: 'The AI Recruitment Marketing Specialist develops recruitment marketing strategies, creates compelling employer content, and drives candidate engagement through marketing initiatives.',
    capabilities: ["Recruitment Marketing","Content Strategy","Campaign Management","Social Media","Candidate Engagement","Employer Branding","Marketing Analytics","Digital Recruitment"],
    icon: Megaphone,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$4.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'recruitment-marketing-specialist',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 325,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      reportsTo: 'vp-talent-acquisition',
      manages: [],
    },
    specializedCapabilities: ['Recruitment Marketing','Content Strategy','Campaign Management','Social Media','Candidate Engagement'],
    integrationOptions: ['Marketing Platforms','Social Media','Content Tools','ATS Integration'],
    automationFeatures: ['Campaign Automation','Content Generation','Social Media Posting','Candidate Engagement'],
    kpiMetrics: ['Campaign Reach','Engagement Rate','Application Conversion','Brand Awareness','Cost per Applicant'],
    customOptions: { marketingFocus: 'comprehensive', contentQuality: 'high', engagementLevel: 'maximum' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'marketing', enabled: true, name: 'Marketing Strategist', description: 'Develops marketing strategies' },
      { id: 'content', enabled: true, name: 'Content Creator', description: 'Creates recruitment content' },
      { id: 'campaign', enabled: true, name: 'Campaign Manager', description: 'Manages campaigns' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rms_1', name: 'Recruitment Marketing', category: 'Marketing', description: 'Market recruitment', level: 'expert' },
      { id: 'rms_2', name: 'Content Strategy', category: 'Content', description: 'Develop content strategies', level: 'expert' },
      { id: 'rms_3', name: 'Campaign Management', category: 'Campaign', description: 'Manage campaigns', level: 'expert' }
    ],
    personality: [
      { trait: 'Marketing Savvy', value: 10, description: 'Marketing oriented' },
      { trait: 'Creative', value: 9, description: 'Creative mindset' },
      { trait: 'Engagement Focus', value: 9, description: 'Engagement oriented' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
