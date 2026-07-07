import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'consulting-manager',
    name: 'consulting-manager',
    title: 'AI Consulting Manager',
    description: 'The AI Consulting Manager leads consulting teams, manages consulting engagements, develops consulting solutions, and ensures high-quality delivery for client projects.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Team Leadership","Engagement Management","Solution Design","Client Advisory","Quality Assurance","Resource Coordination","Methodology"],
    icon: Lightbulb,
    color: '#059669',
    type: 'employee' as const,
    humanCost: '$135k/year',
    aiCost: '$2.8k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'consulting-manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11',
      tasksAutomatedDaily: 720,
      responseTime: '1.4s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'management',
      reportsTo: 'vp-consulting',
      manages: ['business-consultant'],
    },
    specializedCapabilities: [
      'Team Leadership',
      'Engagement Management',
      'Solution Design',
      'Client Advisory',
      'Quality Assurance',
      'Resource Coordination',
      'Methodology Application',
      'Knowledge Sharing',
      'Client Training',
      'Delivery Excellence'
    ],
    integrationOptions: [
      'Consulting Platforms',
      'Project Management Tools',
      'CRM Systems',
      'Knowledge Bases',
      'Analytics Platforms',
      'Communication Tools',
      'Document Management',
      'Time Tracking'
    ],
    automationFeatures: [
      'Team Coordination',
      'Engagement Planning',
      'Solution Templates',
      'Quality Reviews',
      'Resource Scheduling',
      'Client Communications',
      'Progress Tracking',
      'Knowledge Capture'
    ],
    kpiMetrics: [
      'Engagement Success',
      'Team Utilization',
      'Client Satisfaction',
      'Solution Quality',
      'Delivery Timeline',
      'Knowledge Sharing',
      'Team Productivity',
      'Methodology Adherence'
    ],
    customOptions: {
      teamSize: 'medium',
      engagementType: 'strategic',
      methodology: 'framework-based',
      qualityFocus: 'high',
      clientIndustry: 'diverse'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts engagement outcomes' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes team and client feedback' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cm_1', name: 'Team Leadership', category: 'Leadership', description: 'Lead consulting teams', level: 'expert' },
      { id: 'cm_2', name: 'Engagement Management', category: 'Management', description: 'Manage consulting engagements', level: 'expert' },
      { id: 'cm_3', name: 'Solution Design', category: 'Strategy', description: 'Design client solutions', level: 'expert' },
      { id: 'cm_4', name: 'Client Advisory', category: 'Advisory', description: 'Advise clients strategically', level: 'expert' },
      { id: 'cm_5', name: 'Quality Assurance', category: 'Quality', description: 'Ensure delivery quality', level: 'advanced' }
    ],
    personality: [
      { trait: 'Leadership', value: 10, description: 'Leads teams effectively' },
      { trait: 'Strategic Thinking', value: 9, description: 'Thinks strategically' },
      { trait: 'Client Focus', value: 9, description: 'Prioritizes client needs' },
      { trait: 'Mentorship', value: 8, description: 'Mentors team members' },
      { trait: 'Quality Focus', value: 9, description: 'Ensures high quality' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
