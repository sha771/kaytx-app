import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AIAgentOverview from './AIAgentOverview';
import ChiefInnovationOfficerCenter from './ChiefInnovationOfficerCenter';
import ResearchPortfolioManagement from './ResearchPortfolioManagement';
import ExperimentationCommandCenter from './ExperimentationCommandCenter';
import KnowledgeIntelligenceGraph from './KnowledgeIntelligenceGraph';
import PatentIPIntelligence from './PatentIPIntelligence';
import TechnologyScoutingHub from './TechnologyScoutingHub';
import CompetitiveResearchCenter from './CompetitiveResearchCenter';
import DiscoveryPipeline from './DiscoveryPipeline';
import AIResearchInsightsEngine from './AIResearchInsightsEngine';
import RealTimeResearchActivity from './RealTimeResearchActivity';
import CollaborationExpertNetworks from './CollaborationExpertNetworks';
import RDSystemHealth from './RDSystemHealth';
import TopCommandBar from './TopCommandBar';
import LeftSidebar from './LeftSidebar';

// Mock data for the command center
const mockCommandBarMetrics = [
  { label: 'Active Research Projects', value: '248', change: '+12', trend: 'up' as const, color: '#22C55E' },
  { label: 'Experiments Running', value: '4,281', change: '+156', trend: 'up' as const, color: '#3B82F6' },
  { label: 'Innovation Score', value: '94%', change: '+2.1%', trend: 'up' as const, color: '#10B981' },
  { label: 'Patent Opportunities', value: '128', change: '+18', trend: 'up' as const, color: '#8B5CF6' },
  { label: 'Discovery Pipeline Value', value: '$184M', change: '+$12M', trend: 'up' as const, color: '#06B6D4' },
  { label: 'Research Velocity', value: '2.4x', change: '+0.3x', trend: 'up' as const, color: '#F59E0B' },
  { label: 'Technology Readiness', value: 'TRL 7', change: '+1', trend: 'up' as const, color: '#EC4899' },
  { label: 'Research ROI', value: '312%', change: '+24%', trend: 'up' as const, color: '#14B8A6' },
  { label: 'Publications Generated', value: '842', change: '+67', trend: 'up' as const, color: '#6366F1' },
  { label: 'AI Discovery Index', value: '87.4', change: '+3.2', trend: 'up' as const, color: '#84CC16' }
];

const mockResearchAgents = [
  {
    id: 'agent-nova',
    name: 'Agent Nova',
    type: 'Scientific Discovery Agent',
    status: 'active' as const,
    confidence: 97,
    researchPapersAnalyzed: 1200000,
    insightsGenerated: 28420,
    discoveryAccuracy: 97,
    activeInvestigations: 12,
    researchImpactScore: 94
  },
  {
    id: 'agent-quantum',
    name: 'Agent Quantum',
    type: 'Experimentation Agent',
    status: 'active' as const,
    confidence: 91,
    experimentsManaged: 8420,
    successRate: 72,
    optimizationGains: 31,
    activeInvestigations: 8,
    researchImpactScore: 88
  },
  {
    id: 'agent-horizon',
    name: 'Agent Horizon',
    type: 'Innovation Intelligence Agent',
    status: 'active' as const,
    confidence: 95,
    technologiesEvaluated: 14200,
    opportunitiesIdentified: 842,
    forecastConfidence: 95,
    activeInvestigations: 15,
    researchImpactScore: 91
  }
];

export default function ResearchDevelopmentCommandCenter() {
  const { theme } = useTheme();
  const [selectedSection, setSelectedSection] = useState('dashboard');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Left Sidebar */}
      <LeftSidebar 
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Top Command Bar */}
        <TopCommandBar metrics={mockCommandBarMetrics} />

        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* AI Research Agents */}
          <AIAgentOverview agents={mockResearchAgents} />

          {/* Chief Innovation Officer Command Center */}
          <ChiefInnovationOfficerCenter />

          {/* Research Portfolio Management */}
          <ResearchPortfolioManagement />

          {/* Experimentation Command Center */}
          <ExperimentationCommandCenter />

          {/* Knowledge Intelligence Graph */}
          <KnowledgeIntelligenceGraph />

          {/* Patent & IP Intelligence */}
          <PatentIPIntelligence />

          {/* Technology Scouting Hub */}
          <TechnologyScoutingHub />

          {/* Competitive Research Center */}
          <CompetitiveResearchCenter />

          {/* Discovery Pipeline */}
          <DiscoveryPipeline />

          {/* AI Research Insights Engine */}
          <AIResearchInsightsEngine />

          {/* Real-time Research Activity */}
          <RealTimeResearchActivity />

          {/* Collaboration & Expert Networks */}
          <CollaborationExpertNetworks />

          {/* R&D System Health */}
          <RDSystemHealth />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
});