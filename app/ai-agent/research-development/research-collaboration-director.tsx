import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function ResearchCollaborationDirectorPage() {
  const agent = {
    id: 'research-collaboration-director',
    name: 'AI Research Collaboration Director',
    title: 'AI Research Collaboration Director',
    description: 'The AI Research Collaboration Director manages research collaboration, oversees research partnerships, coordinates cross-team research, and drives knowledge sharing across all research initiatives.',
    capabilities: ["Research Collaboration","Research Partnerships","Cross-Team Research","Knowledge Sharing","Academic Collaboration","Industry Partnership","Research Networks","Collaboration Strategy","Research Community","Knowledge Management"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$140k/year',
    aiCost: '$4k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'research-collaboration-director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,500',
      tasksAutomatedDaily: 460,
      responseTime: '1.1s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'director',
      reportsTo: 'vp-research',
      manages: ['partnership-manager', 'collaboration-specialist', 'knowledge-manager'],
    },
    specializedCapabilities: [
      'Research Collaboration',
      'Research Partnerships',
      'Cross-Team Research',
      'Knowledge Sharing',
      'Academic Collaboration',
      'Industry Partnership',
      'Research Networks',
      'Collaboration Strategy'
    ],
    integrationOptions: [
      'Collaboration Platforms',
      'Partnership Management',
      'Knowledge Systems',
      'Academic Networks',
      'Industry Platforms',
      'Communication Tools',
      'Research Networks',
      'Community Platforms'
    ],
    automationFeatures: [
      'Research Collaboration',
      'Research Partnerships',
      'Cross-Team Research',
      'Knowledge Sharing',
      'Academic Collaboration',
      'Industry Partnership',
      'Research Networks',
      'Knowledge Management'
    ],
    kpiMetrics: [
      'Collaboration Success',
      'Partnership Quality',
      'Knowledge Sharing',
      'Cross-Team Impact',
      'Academic Engagement',
      'Industry Partnerships',
      'Network Growth',
      'Collaboration ROI'
    ],
    customOptions: {
      collaborationStrategy: 'inclusive',
      partnershipFocus: 'strategic',
      knowledgeSharing: 'comprehensive',
      academicApproach: 'research-oriented',
      industryEngagement: 'collaborative'
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
      { id: 'collaboration', enabled: true, name: 'Collaboration Facilitator', description: 'Facilitates research collaboration' },
      { id: 'partnership', enabled: true, name: 'Partnership Builder', description: 'Builds research partnerships' },
      { id: 'knowledge', enabled: true, name: 'Knowledge Sharer', description: 'Shares research knowledge' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'rcollab_1', name: 'Research Collaboration', category: 'Collaboration', description: 'Lead research collaboration', level: 'expert' },
      { id: 'rcollab_2', name: 'Research Partnerships', category: 'Partnerships', description: 'Manage research partnerships', level: 'expert' },
      { id: 'rcollab_3', name: 'Cross-Team Research', category: 'Cross-Team', description: 'Coordinate cross-team research', level: 'expert' },
      { id: 'rcollab_4', name: 'Knowledge Sharing', category: 'Knowledge', description: 'Facilitate knowledge sharing', level: 'expert' },
      { id: 'rcollab_5', name: 'Collaboration Strategy', category: 'Strategy', description: 'Develop collaboration strategy', level: 'expert' }
    ],
    personality: [
      { trait: 'Collaboration Excellence', value: 10, description: 'Collaboration expert' },
      { trait: 'Relationship Building', value: 10, description: 'Strong relationship builder' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic collaboration planner' },
      { trait: 'Knowledge Sharing', value: 10, description: 'Knowledge sharing focused' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}