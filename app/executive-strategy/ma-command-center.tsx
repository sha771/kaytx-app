import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Building2, 
  TrendingUp, 
  ArrowLeft,
  Activity,
  DollarSign,
  Target,
  BarChart3,
  LineChart,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Deal {
  id: string;
  company: string;
  value: string;
  stage: 'pipeline' | 'evaluation' | 'due-diligence' | 'negotiation' | 'closed';
  synergy: string;
  roi: string;
  status: 'active' | 'on-hold' | 'completed';
}

interface Synergy {
  id: string;
  type: string;
  value: string;
  confidence: number;
}

const deals: Deal[] = [
  { id: '1', company: 'TechCorp Inc', value: '$2.4B', stage: 'negotiation', synergy: '$680M', roi: '28.4%', status: 'active' },
  { id: '2', company: 'DataFlow Systems', value: '$1.8B', stage: 'due-diligence', synergy: '$420M', roi: '23.3%', status: 'active' },
  { id: '3', company: 'CloudFirst Solutions', value: '$1.2B', stage: 'evaluation', synergy: '$280M', roi: '23.3%', status: 'active' },
  { id: '4', company: 'SecureNet Technologies', value: '$0.8B', stage: 'pipeline', synergy: '$180M', roi: '22.5%', status: 'active' },
  { id: '5', company: 'AI Innovations Ltd', value: '$0.6B', stage: 'pipeline', synergy: '$150M', roi: '25.0%', status: 'on-hold' }
];

const synergies: Synergy[] = [
  { id: '1', type: 'Cost Synergies', value: '$1.2B', confidence: 87 },
  { id: '2', type: 'Revenue Synergies', value: '$0.8B', confidence: 78 },
  { id: '3', type: 'Technology Synergies', value: '$0.4B', confidence: 92 },
  { id: '4', type: 'Market Synergies', value: '$0.3B', confidence: 73 }
];

const integrationProgress = [
  { deal: 'TechCorp Inc', progress: 65, phase: 'Integration Planning' },
  { deal: 'DataFlow Systems', progress: 42, phase: 'Due Diligence' },
  { deal: 'CloudFirst Solutions', progress: 28, phase: 'Evaluation' }
];

const valuationModels = [
  { model: 'DCF Analysis', value: '$2.8B', range: '$2.4B - $3.2B' },
  { model: 'Comparable Companies', value: '$2.6B', range: '$2.3B - $2.9B' },
  { model: 'Precedent Transactions', value: '$2.5B', range: '$2.2B - $2.8B' }
];

export default function MACommandCenter() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'pipeline' | 'synergies' | 'integration' | 'valuation'>('pipeline');

  const tabs = [
    { id: 'pipeline', label: 'Pipeline', icon: Activity },
    { id: 'synergies', label: 'Synergies', icon: Target },
    { id: 'integration', label: 'Integration', icon: Users },
    { id: 'valuation', label: 'Valuation', icon: DollarSign }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pipeline': return '#6B7280';
      case 'evaluation': return '#3B82F6';
      case 'due-diligence': return '#F59E0B';
      case 'negotiation': return '#EC4899';
      case 'closed': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'on-hold': return '#F59E0B';
      case 'completed': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const DealCard = ({ deal }: { deal: Deal }) => (
    <View style={[styles.dealCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.dealHeader}>
        <Text style={styles.dealCompany}>{deal.company}</Text>
        <View style={[styles.dealStage, { backgroundColor: `${getStageColor(deal.stage)}20` }]}>
          <Text style={[styles.dealStageText, { color: getStageColor(deal.stage) }]}>
            {deal.stage.toUpperCase().replace('-', ' ')}
          </Text>
        </View>
      </View>
      <View style={styles.dealMetrics}>
        <View style={styles.dealMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.dealMetricLabel}>Value</Text>
          <Text style={[styles.dealMetricValue, { color: '#10B981' }]}>{deal.value}</Text>
        </View>
        <View style={styles.dealMetric}>
          <Target size={16} color="#9CA3AF" />
          <Text style={styles.dealMetricLabel}>Synergy</Text>
          <Text style={[styles.dealMetricValue, { color: '#3B82F6' }]}>{deal.synergy}</Text>
        </View>
        <View style={styles.dealMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.dealMetricLabel}>ROI</Text>
          <Text style={[styles.dealMetricValue, { color: '#8B5CF6' }]}>{deal.roi}</Text>
        </View>
      </View>
      <View style={styles.dealFooter}>
        <View style={[styles.dealStatus, { backgroundColor: `${getStatusColor(deal.status)}20` }]}>
          <Text style={[styles.dealStatusText, { color: getStatusColor(deal.status) }]}>
            {deal.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  const SynergyCard = ({ synergy }: { synergy: Synergy }) => (
    <View style={[styles.synergyCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.synergyType}>{synergy.type}</Text>
      <Text style={[styles.synergyValue, { color: '#10B981' }]}>{synergy.value}</Text>
      <View style={styles.synergyProgress}>
        <View style={styles.synergyProgressBar}>
          <View style={[styles.synergyProgressFill, { width: `${synergy.confidence}%`, backgroundColor: '#3B82F6' }]} />
        </View>
        <Text style={styles.synergyConfidence}>{synergy.confidence}% confidence</Text>
      </View>
    </View>
  );

  const IntegrationCard = ({ integration }: { integration: any }) => (
    <View style={[styles.integrationCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.integrationDeal}>{integration.deal}</Text>
      <Text style={styles.integrationPhase}>{integration.phase}</Text>
      <View style={styles.integrationProgress}>
        <View style={styles.integrationProgressBar}>
          <View style={[styles.integrationProgressFill, { width: `${integration.progress}%`, backgroundColor: '#10B981' }]} />
        </View>
        <Text style={styles.integrationProgressText}>{integration.progress}%</Text>
      </View>
    </View>
  );

  const ValuationCard = ({ model }: { model: any }) => (
    <View style={[styles.valuationCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.valuationModel}>{model.model}</Text>
      <Text style={[styles.valuationValue, { color: '#10B981' }]}>{model.value}</Text>
      <Text style={styles.valuationRange}>{model.range}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>M&A Command Center</Text>
          <Text style={styles.headerSubtitle}>Acquisition Pipeline & Integration</Text>
        </View>
        <Building2 size={20} color="#EC4899" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <tab.icon size={18} color={selectedTab === tab.id ? '#FFFFFF' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedTab === 'pipeline' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deal Pipeline</Text>
            {deals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </View>
        )}

        {selectedTab === 'synergies' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synergy Analysis</Text>
            {synergies.map(synergy => (
              <SynergyCard key={synergy.id} synergy={synergy} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Synergy Dashboard</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'integration' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Integration Progress</Text>
            {integrationProgress.map((integration, index) => (
              <IntegrationCard key={index} integration={integration} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Integration Timeline</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#10B981" />
                <Text style={styles.chartPlaceholderText}>Interactive Timeline</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'valuation' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Valuation Models</Text>
            {valuationModels.map((model, index) => (
              <ValuationCard key={index} model={model} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Valuation Analysis</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#8B5CF6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: { backgroundColor: '#3B82F6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#FFFFFF' },
  content: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  dealCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dealCompany: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dealStage: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dealStageText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dealMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dealMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  dealMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dealMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dealStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dealStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  synergyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  synergyType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  synergyValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  synergyProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  synergyProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  synergyProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  synergyConfidence: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  integrationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  integrationDeal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  integrationPhase: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  integrationProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  integrationProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  integrationProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  integrationProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  valuationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  valuationModel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  valuationValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  valuationRange: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
});
