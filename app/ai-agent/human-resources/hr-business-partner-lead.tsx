import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function HRBusinessPartnerLeadPage() {
  const agent = {
    id: 'hr-business-partner-lead',
    name: 'AI HR Business Partner',
    title: 'AI HR Business Partner',
    description: 'The AI HR Business Partner serves as a strategic partner to business units, aligning HR strategies with business objectives and providing consultative HR support.',
    capabilities: ["Business Partnership","Strategic HR Alignment","Workforce Consulting","Organizational Effectiveness","Change Management","Employee Relations","Talent Advisory","Business Analytics"],
    icon: Briefcase,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$6.5k/year',
    efficiency: '17x efficiency improvement',
    replacesRole: 'hr-business-partner',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$9,417',
      tasksAutomatedDaily: 425,
      responseTime: '0.5s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'management',
      reportsTo: 'chro',
      manages: [],
    },
    specializedCapabilities: ['Business Partnership','Strategic HR Alignment','Workforce Consulting','Organizational Effectiveness','Change Advisory'],
    integrationOptions: ['Business Systems','HRIS Platforms','Analytics Tools','Communication Systems'],
    automationFeatures: ['Business Alignment Consulting','Workforce Analysis','Organizational Assessment','Change Advisory'],
    kpiMetrics: ['Business Satisfaction','HR Alignment Score','Workforce Effectiveness','Change Success Rate','Partner Impact'],
    customOptions: { partnershipDepth: 'strategic', businessFocus: 'high', advisoryLevel: 'comprehensive' },
    advancedFeatures: {
      a2aCommunication: true, d2dCommunication: true, selfImprovement: true, selfLearning: true,
      predictiveInsights: true, anomalyDetection: true, sentimentAnalysis: true, unlimitedMemory: true,
      taskHistory: true, crossAgentCollaboration: true, departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'partner', enabled: true, name: 'Business Partner', description: 'Partners with business' },
      { id: 'align', enabled: true, name: 'HR Aligner', description: 'Aligns HR with business' },
      { id: 'consult', enabled: true, name: 'Workforce Consultant', description: 'Consults on workforce' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hrbp_1', name: 'Business Partnership', category: 'Partnership', description: 'Partner with business', level: 'expert' },
      { id: 'hrbp_2', name: 'Strategic HR Alignment', category: 'Strategy', description: 'Align HR strategies', level: 'expert' },
      { id: 'hrbp_3', name: 'Workforce Consulting', category: 'Consulting', description: 'Consult on workforce', level: 'expert' }
    ],
    personality: [
      { trait: 'Business Partnership', value: 10, description: 'Partner oriented' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic mindset' },
      { trait: 'Consultative', value: 9, description: 'Consultative approach' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
