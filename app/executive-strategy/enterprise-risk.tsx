import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Shield, 
  AlertTriangle, 
  ArrowLeft,
  Activity,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  Lock,
  Globe,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Risk {
  id: string;
  category: string;
  description: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  likelihood: number;
  impact: number;
  status: 'active' | 'mitigated' | 'monitoring';
}

const risks: Risk[] = [
  { id: '1', category: 'Strategic', description: 'Market disruption from emerging competitors', level: 'high', likelihood: 72, impact: 85, status: 'active' },
  { id: '2', category: 'Financial', description: 'Currency fluctuation in international markets', level: 'medium', likelihood: 65, impact: 72, status: 'monitoring' },
  { id: '3', category: 'Operational', description: 'Supply chain vulnerability in key components', level: 'high', likelihood: 58, impact: 92, status: 'active' },
  { id: '4', category: 'Cybersecurity', description: 'Advanced persistent threat detection', level: 'critical', likelihood: 45, impact: 98, status: 'active' },
  { id: '5', category: 'Regulatory', description: 'GDPR compliance in new markets', level: 'medium', likelihood: 82, impact: 65, status: 'mitigated' }
];

const complianceScores = [
  { area: 'GDPR', score: 98, status: 'compliant' },
  { area: 'SOC 2', score: 96, status: 'compliant' },
  { area: 'HIPAA', score: 94, status: 'compliant' },
  { area: 'ISO 27001', score: 92, status: 'compliant' },
  { area: 'PCI DSS', score: 89, status: 'review' }
];

const riskMetrics = [
  { label: 'Enterprise Risk Score', value: 'Low', change: '-5.2%', trend: 'down' },
  { label: 'Cyber Risk', value: 'Medium', change: '0%', trend: 'stable' },
  { label: 'Compliance Score', value: '98.5%', change: '+1.2%', trend: 'up' },
  { label: 'Supply Chain Risk', value: 'Low', change: '-3.4%', trend: 'down' },
  { label: 'Financial Exposure', value: '$1.2B', change: '-8.7%', trend: 'down' }
];

const crisisScenarios = [
  { scenario: 'Data Breach', probability: 12, impact: 'Critical', readiness: 87 },
  { scenario: 'Natural Disaster', probability: 8, impact: 'High', readiness: 92 },
  { scenario: 'Supply Chain Disruption', probability: 18, impact: 'High', readiness: 78 },
  { scenario: 'Regulatory Violation', probability: 15, impact: 'High', readiness: 94 }
];

export default function EnterpriseRisk() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'risks' | 'compliance' | 'crisis'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'risks', label: 'Risks', icon: Shield },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'crisis', label: 'Crisis', icon: AlertTriangle }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#EF4444';
      case 'mitigated': return '#10B981';
      case 'monitoring': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const RiskCard = ({ risk }: { risk: Risk }) => (
    <View style={[styles.riskCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.riskHeader}>
        <Text style={styles.riskCategory}>{risk.category}</Text>
        <View style={[styles.riskLevel, { backgroundColor: `${getLevelColor(risk.level)}20` }]}>
          <Text style={[styles.riskLevelText, { color: getLevelColor(risk.level) }]}>
            {risk.level.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.riskDescription}>{risk.description}</Text>
      <View style={styles.riskMetrics}>
        <View style={styles.riskMetric}>
          <Text style={styles.riskMetricLabel}>Likelihood</Text>
          <View style={styles.riskMetricBar}>
            <View style={[styles.riskMetricFill, { width: `${risk.likelihood}%`, backgroundColor: '#F59E0B' }]} />
          </View>
          <Text style={styles.riskMetricValue}>{risk.likelihood}%</Text>
        </View>
        <View style={styles.riskMetric}>
          <Text style={styles.riskMetricLabel}>Impact</Text>
          <View style={styles.riskMetricBar}>
            <View style={[styles.riskMetricFill, { width: `${risk.impact}%`, backgroundColor: '#EF4444' }]} />
          </View>
          <Text style={styles.riskMetricValue}>{risk.impact}%</Text>
        </View>
      </View>
      <View style={[styles.riskStatus, { backgroundColor: `${getStatusColor(risk.status)}20` }]}>
        <Text style={[styles.riskStatusText, { color: getStatusColor(risk.status) }]}>
          {risk.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  const ComplianceCard = ({ compliance }: { compliance: any }) => (
    <View style={[styles.complianceCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.complianceArea}>{compliance.area}</Text>
      <View style={styles.complianceScore}>
        <Text style={[styles.complianceScoreValue, { color: compliance.score >= 90 ? '#10B981' : compliance.score >= 80 ? '#F59E0B' : '#EF4444' }]}>
          {compliance.score}%
        </Text>
      </View>
      <View style={[styles.complianceStatus, { backgroundColor: compliance.status === 'compliant' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
        <Text style={[styles.complianceStatusText, { color: compliance.status === 'compliant' ? '#10B981' : '#F59E0B' }]}>
          {compliance.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  const CrisisCard = ({ scenario }: { scenario: any }) => (
    <View style={[styles.crisisCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.crisisScenario}>{scenario.scenario}</Text>
      <View style={styles.crisisMetrics}>
        <View style={styles.crisisMetric}>
          <Text style={styles.crisisMetricLabel}>Probability</Text>
          <Text style={[styles.crisisMetricValue, { color: scenario.probability > 15 ? '#EF4444' : scenario.probability > 10 ? '#F59E0B' : '#10B981' }]}>
            {scenario.probability}%
          </Text>
        </View>
        <View style={styles.crisisMetric}>
          <Text style={styles.crisisMetricLabel}>Impact</Text>
          <Text style={[styles.crisisMetricValue, { color: scenario.impact === 'Critical' ? '#EF4444' : '#F59E0B' }]}>
            {scenario.impact}
          </Text>
        </View>
        <View style={styles.crisisMetric}>
          <Text style={styles.crisisMetricLabel}>Readiness</Text>
          <Text style={[styles.crisisMetricValue, { color: scenario.readiness >= 90 ? '#10B981' : '#F59E0B' }]}>
            {scenario.readiness}%
          </Text>
        </View>
      </View>
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
          <Text style={styles.headerTitle}>Enterprise Risk</Text>
          <Text style={styles.headerSubtitle}>Risk Management & Compliance</Text>
        </View>
        <Shield size={20} color="#F59E0B" />
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
        {selectedTab === 'overview' && (
          <>
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Risk Metrics</Text>
              {riskMetrics.map((metric, index) => (
                <View key={index} style={[styles.metricCard, { backgroundColor: '#0A0F1A' }]}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={[styles.metricValue, { color: metric.trend === 'down' ? '#10B981' : metric.trend === 'up' ? '#EF4444' : '#6B7280' }]}>
                    {metric.value}
                  </Text>
                  <Text style={[styles.metricChange, { color: metric.trend === 'down' ? '#10B981' : metric.trend === 'up' ? '#EF4444' : '#6B7280' }]}>
                    {metric.change}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Risk Heatmap</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#F59E0B" />
                <Text style={styles.chartPlaceholderText}>Interactive Heatmap</Text>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'risks' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Risks</Text>
            {risks.map(risk => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </View>
        )}

        {selectedTab === 'compliance' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compliance Scores</Text>
            {complianceScores.map((compliance, index) => (
              <ComplianceCard key={index} compliance={compliance} />
            ))}
          </View>
        )}

        {selectedTab === 'crisis' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Crisis Scenarios</Text>
            {crisisScenarios.map((scenario, index) => (
              <CrisisCard key={index} scenario={scenario} />
            ))}
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
  metricsSection: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  riskLevel: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskLevelText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  riskDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  riskMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  riskMetric: {
    flex: 1,
  },
  riskMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  riskMetricBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  riskMetricFill: {
    height: '100%',
    borderRadius: 2,
  },
  riskMetricValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  riskStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  complianceCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  complianceArea: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  complianceScore: {
    paddingHorizontal: 16,
  },
  complianceScoreValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  complianceStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  complianceStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  crisisCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  crisisScenario: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  crisisMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crisisMetric: {
    flex: 1,
    alignItems: 'center',
  },
  crisisMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  crisisMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  chartCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
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
