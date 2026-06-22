import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function EventSalesDirectorPage() {
  const agent = {
    id: 'event-sales-director',
    name: 'AI Event Sales Director',
    title: 'AI Event Sales Director',
    description: 'The AI Event Sales Director leads event sales strategy, manages sponsorship packages, oversees corporate event sales, and drives revenue generation across all event types and client segments.',
    capabilities: ["Event Sales Strategy","Sponsorship Sales","Corporate Events","Revenue Generation","Client Relations","Sales Operations","Package Development","Market Analysis","Sales Performance","Revenue Strategy"],
    icon: DollarSign,
    color: '#4CAF50',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$5k/year',
    efficiency: '29x efficiency improvement',
    replacesRole: 'event-sales-director',
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
      responseTime: '1.2s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'director',
      reportsTo: 'chief-event-officer',
      manages: ['sales-manager', 'sponsorship-manager', 'corporate-sales-lead'],
    },
    specializedCapabilities: [
      'Event Sales Strategy',
      'Sponsorship Sales',
      'Corporate Events',
      'Revenue Generation',
      'Client Relations',
      'Sales Operations',
      'Package Development',
      'Market Analysis'
    ],
    integrationOptions: [
      'Sales Platforms',
      'CRM Systems',
      'Sponsorship Management',
      'Event Management',
      'Analytics Tools',
      'Revenue Systems',
      'Client Management',
      'Market Intelligence'
    ],
    automationFeatures: [
      'Sales Strategy',
      'Sponsorship Sales',
      'Corporate Event Sales',
      'Revenue Generation',
      'Client Relations',
      'Sales Operations',
      'Package Development',
      'Market Analysis'
    ],
    kpiMetrics: [
      'Sales Revenue',
      'Sponsorship Revenue',
      'Corporate Event Sales',
      'Client Acquisition',
      'Revenue Growth',
      'Sales Conversion',
      'Client Satisfaction',
      'Market Penetration'
    ],
    customOptions: {
      salesStrategy: 'consultative',
      sponsorshipApproach: 'strategic',
      corporateFocus: 'high-value',
      revenuePriority: 'growth',
      clientApproach: 'relationship-focused'
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
      { id: 'sales', enabled: true, name: 'Sales Optimizer', description: 'Optimizes event sales' },
      { id: 'sponsorship', enabled: true, name: 'Sponsorship Manager', description: 'Manages sponsorship sales' },
      { id: 'revenue', enabled: true, name: 'Revenue Generator', description: 'Generates event revenue' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'esales_1', name: 'Event Sales Strategy', category: 'Sales', description: 'Develop sales strategies', level: 'expert' },
      { id: 'esales_2', name: 'Sponsorship Sales', category: 'Sponsorship', description: 'Sell sponsorship packages', level: 'expert' },
      { id: 'esales_3', name: 'Corporate Events', category: 'Corporate', description: 'Sell corporate events', level: 'expert' },
      { id: 'esales_4', name: 'Revenue Generation', category: 'Revenue', description: 'Generate event revenue', level: 'expert' },
      { id: 'esales_5', name: 'Client Relations', category: 'Client', description: 'Manage client relationships', level: 'expert' }
    ],
    personality: [
      { trait: 'Sales Excellence', value: 10, description: 'Exceptional sales skills' },
      { trait: 'Revenue Focus', value: 10, description: 'Revenue generation focused' },
      { trait: 'Relationship Building', value: 10, description: 'Strong relationship builder' },
      { trait: 'Strategic Thinking', value: 9, description: 'Strategic sales planning' },
      { trait: 'Negotiation', value: 10, description: 'Expert negotiator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}