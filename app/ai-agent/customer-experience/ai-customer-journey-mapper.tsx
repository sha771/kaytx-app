import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { Route, ChevronLeft, Settings, Zap, BarChart3, Brain, Workflow, Link, Users, Play, TrendingUp, Award, Clock, CheckCircle2, Activity, Database, MoreVertical, Gauge, PieChart, Shield, Lightbulb, Map } from 'lucide-react-native';
import { aiCustomerJourneyMapper, getCustomerExperienceAgentById } from '@/constants/customerExperienceAgents';

export default function AICustomerJourneyMapperPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const agent = aiCustomerJourneyMapper;
  const parentAgent = getCustomerExperienceAgentById(agent.parentAgentId || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [isActive, setIsActive] = useState(agent.status === 'active');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Route },
    { id: 'capabilities', label: 'Capabilities', icon: Zap },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const MetricCard = ({ title, value, trend, trendUp, icon: Icon, color }: any) => (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIconContainer, { backgroundColor: color + '20' }]}>
          <Icon size={20} color={color} />
        </View>
        {trend && <View style={[styles.trendBadge, { backgroundColor: trendUp ? '#4CAF5020' : '#F4433620' }]}><Text style={[styles.trendText, { color: trendUp ? '#4CAF50' : '#F44336' }]}>{trendUp ? '↑' : '↓'} {trend}</Text></View>}
      </View>
      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{title}</Text>
    </View>
  );

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={[styles.statusBanner, { backgroundColor: isActive ? '#4CAF5020' : '#F4433620' }]}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: isActive ? '#4CAF50' : '#F44336' }]} />
          <Text style={[styles.statusText, { color: isActive ? '#4CAF50' : '#F44336' }]}>{isActive ? 'Active & Running' : 'Inactive'}</Text>
        </View>
        <Text style={[styles.versionText, { color: theme.colors.secondaryText }]}>Reports to: {parentAgent?.name || 'Unknown'}</Text>
      </View>
      <View style={styles.metricsGrid}>
        <MetricCard title="Journeys Mapped" value="89" trend="18%" trendUp={true} icon={Map} color="#2196F3" />
        <MetricCard title="Avg Response" value="1.8m" trend="10%" trendUp={true} icon={Clock} color="#4CAF50" />
        <MetricCard title="Success Rate" value={`${agent.metrics.successRate}%`} trend="6%" trendUp={true} icon={TrendingUp} color="#9C27B0" />
        <MetricCard title="CSAT Score" value={agent.metrics.customerSatisfaction.toString()} trend="0.5" trendUp={true} icon={Award} color="#FF9800" />
      </View>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}><Route size={24} color={agent.color} /><Text style={[styles.cardTitle, { color: theme.colors.text }]}>About This Agent</Text></View>
        <Text style={[styles.descriptionText, { color: theme.colors.secondaryText }]}>{agent.longDescription}</Text>
        <View style={styles.divider} />
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Responsibilities</Text>
        {agent.responsibilities.slice(0, 4).map((resp, idx) => (
          <View key={idx} style={styles.responsibilityItem}><CheckCircle2 size={16} color={agent.color} /><Text style={[styles.responsibilityText, { color: theme.colors.secondaryText }]}>{resp}</Text></View>
        ))}
      </View>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}><TrendingUp size={24} color="#4CAF50" /><Text style={[styles.cardTitle, { color: theme.colors.text }]}>Business Impact</Text></View>
        <View style={styles.roiGrid}>
          <View style={styles.roiItem}><Text style={[styles.roiValue, { color: '#4CAF50' }]}>{agent.metrics.costSavings}</Text><Text style={[styles.roiLabel, { color: theme.colors.secondaryText }]}>Annual Savings</Text></View>
          <View style={styles.roiDivider} />
          <View style={styles.roiItem}><Text style={[styles.roiValue, { color: '#2196F3' }]}>{agent.metrics.roi}</Text><Text style={[styles.roiLabel, { color: theme.colors.secondaryText }]}>ROI</Text></View>
        </View>
      </View>
    </View>
  );

  const renderCapabilities = () => (
    <View style={styles.tabContent}>
      {agent.capabilities.map((cap) => (
        <View key={cap.id} style={[styles.capabilityCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.capabilityHeader}>
            <View style={[styles.capabilityIconContainer, { backgroundColor: agent.color + '20' }]}><Zap size={20} color={agent.color} /></View>
            <View style={styles.capabilityInfo}><Text style={[styles.capabilityName, { color: theme.colors.text }]}>{cap.name}</Text><Text style={[styles.capabilityMeta, { color: theme.colors.secondaryText }]}>{cap.automationLevel.toUpperCase()} • {cap.estimatedTimeSaved} saved</Text></View>
          </View>
          <Text style={[styles.capabilityDescription, { color: theme.colors.secondaryText }]}>{cap.description}</Text>
        </View>
      ))}
    </View>
  );

  const renderWorkflows = () => (
    <View style={styles.tabContent}>
      {agent.workflows.map((workflow) => (
        <View key={workflow.id} style={[styles.workflowCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.workflowHeader}>
            <View style={styles.workflowTitleSection}><Workflow size={20} color={agent.color} /><Text style={[styles.workflowName, { color: theme.colors.text }]}>{workflow.name}</Text></View>
            <Pressable style={[styles.executeButton, { backgroundColor: agent.color }]}><Play size={16} color="#FFFFFF" /><Text style={styles.executeButtonText}>Run</Text></Pressable>
          </View>
          <Text style={[styles.workflowDescription, { color: theme.colors.secondaryText }]}>{workflow.description}</Text>
          <View style={styles.workflowSection}>
            <Text style={[styles.workflowSectionTitle, { color: theme.colors.text }]}>Steps ({workflow.steps.length})</Text>
            {workflow.steps.slice(0, 3).map((step, idx) => (
              <View key={idx} style={styles.workflowStep}>
                <View style={[styles.stepNumber, { backgroundColor: agent.color + '30' }]}><Text style={[styles.stepNumberText, { color: agent.color }]}>{idx + 1}</Text></View>
                <Text style={[styles.stepText, { color: theme.colors.secondaryText }]} numberOfLines={1}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderIntegrations = () => (
    <View style={styles.tabContent}>
      <View style={styles.integrationsSummary}>
        <View style={[styles.summaryCard, { backgroundColor: '#4CAF5020' }]}><Text style={[styles.summaryValue, { color: '#4CAF50' }]}>{agent.integrations.filter(i => i.status === 'active').length}</Text><Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Active</Text></View>
        <View style={[styles.summaryCard, { backgroundColor: '#FF980020' }]}><Text style={[styles.summaryValue, { color: '#FF9800' }]}>{agent.integrations.filter(i => i.status === 'pending').length}</Text><Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Pending</Text></View>
        <View style={[styles.summaryCard, { backgroundColor: '#2196F320' }]}><Text style={[styles.summaryValue, { color: '#2196F3' }]}>{agent.integrations.length}</Text><Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Total</Text></View>
      </View>
      {agent.integrations.map((integration, idx) => (
        <View key={idx} style={[styles.integrationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.integrationHeader}>
            <View style={styles.integrationMain}><Database size={20} color={agent.color} /><View><Text style={[styles.integrationName, { color: theme.colors.text }]}>{integration.system}</Text><Text style={[styles.integrationType, { color: theme.colors.secondaryText }]}>{integration.type}</Text></View></View>
            <View style={[styles.statusBadge, { backgroundColor: integration.status === 'active' ? '#4CAF5020' : '#FF980020' }]}><Text style={[styles.statusBadgeText, { color: integration.status === 'active' ? '#4CAF50' : '#FF9800' }]}>{integration.status}</Text></View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={styles.analyticsGrid}>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}><PieChart size={20} color="#9C27B0" /><Text style={[styles.analyticsValue, { color: theme.colors.text }]}>{agent.metrics.successRate}%</Text><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text></View>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}><Gauge size={20} color="#2196F3" /><Text style={[styles.analyticsValue, { color: theme.colors.text }]}>{agent.slaTargets.availability}</Text><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Uptime</Text></View>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}><Route size={20} color="#4CAF50" /><Text style={[styles.analyticsValue, { color: theme.colors.text }]}>89</Text><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Journeys</Text></View>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}><Activity size={20} color="#FF9800" /><Text style={[styles.analyticsValue, { color: theme.colors.text }]}>{agent.metrics.customerSatisfaction}/5</Text><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>CSAT</Text></View>
      </View>
      <View style={[styles.metricsListCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Key Performance Indicators</Text>
        {agent.kpis.map((kpi, idx) => (
          <View key={idx} style={styles.kpiRow}>
            <View style={styles.kpiLeft}><Route size={16} color={agent.color} /><Text style={[styles.kpiText, { color: theme.colors.text }]}>{kpi}</Text></View>
            <View style={[styles.kpiBadge, { backgroundColor: agent.color + '20' }]}><Text style={[styles.kpiBadgeText, { color: agent.color }]}>On Track</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>Agent Status</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}><View style={[styles.powerIcon, { backgroundColor: isActive ? '#4CAF50' : '#F44336' }]} /><View><Text style={[styles.settingName, { color: theme.colors.text }]}>Active Status</Text><Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>Enable or disable this agent</Text></View></View>
          <Switch value={isActive} onValueChange={setIsActive} trackColor={{ false: '#767577', true: agent.color + '80' }} thumbColor={isActive ? agent.color : '#f4f3f4'} />
        </View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>Auto-Scaling</Text>
        <View style={styles.scaleConfig}>
          <View style={styles.scaleItem}><Text style={[styles.scaleLabel, { color: theme.colors.secondaryText }]}>Min Instances</Text><Text style={[styles.scaleValue, { color: theme.colors.text }]}>{agent.autoScale.minInstances}</Text></View>
          <View style={styles.scaleItem}><Text style={[styles.scaleLabel, { color: theme.colors.secondaryText }]}>Max Instances</Text><Text style={[styles.scaleValue, { color: theme.colors.text }]}>{agent.autoScale.maxInstances}</Text></View>
        </View>
        <View style={styles.scaleTriggerBox}><Text style={[styles.scaleLabel, { color: theme.colors.secondaryText }]}>Scale Trigger</Text><Text style={[styles.scaleTriggerText, { color: theme.colors.text }]}>{agent.autoScale.scaleTrigger}</Text></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>SLA Targets</Text>
        <View style={styles.slaItem}><Clock size={18} color={theme.colors.secondaryText} /><View style={styles.slaInfo}><Text style={[styles.slaLabel, { color: theme.colors.secondaryText }]}>Response Time</Text><Text style={[styles.slaValue, { color: theme.colors.text }]}>{agent.slaTargets.responseTime}</Text></View></View>
        <View style={styles.slaItem}><CheckCircle2 size={18} color={theme.colors.secondaryText} /><View style={styles.slaInfo}><Text style={[styles.slaLabel, { color: theme.colors.secondaryText }]}>Resolution Time</Text><Text style={[styles.slaValue, { color: theme.colors.text }]}>{agent.slaTargets.resolutionTime}</Text></View></View>
        <View style={styles.slaItem}><Shield size={18} color={theme.colors.secondaryText} /><View style={styles.slaInfo}><Text style={[styles.slaLabel, { color: theme.colors.secondaryText }]}>Availability</Text><Text style={[styles.slaValue, { color: theme.colors.text }]}>{agent.slaTargets.availability}</Text></View></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>Available Tools ({agent.tools.length})</Text>
        {agent.tools.slice(0, 5).map((tool, idx) => (<View key={idx} style={styles.toolItem}><Lightbulb size={16} color={agent.color} /><Text style={[styles.toolText, { color: theme.colors.text }]}>{tool}</Text></View>))}
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'capabilities': return renderCapabilities();
      case 'workflows': return renderWorkflows();
      case 'integrations': return renderIntegrations();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.cardBackground }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}><ChevronLeft size={24} color={theme.colors.text} /></Pressable>
        <View style={styles.headerContent}>
          <View style={[styles.agentIconContainer, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
          <View style={styles.headerText}><Text style={[styles.headerTitle, { color: theme.colors.text }]}>{agent.name}</Text><Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>{agent.role} • {agent.department}</Text></View>
        </View>
        <Pressable style={styles.moreButton}><MoreVertical size={24} color={theme.colors.text} /></Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabBarContent}>
        {tabs.map((tab) => { const TabIcon = tab.icon; const isTabActive = activeTab === tab.id; return (
          <Pressable key={tab.id} style={[styles.tabButton, isTabActive && { backgroundColor: agent.color + '20', borderColor: agent.color }]} onPress={() => setActiveTab(tab.id)}>
            <TabIcon size={16} color={isTabActive ? agent.color : theme.colors.secondaryText} /><Text style={[styles.tabText, { color: isTabActive ? agent.color : theme.colors.secondaryText }]}>{tab.label}</Text>
          </Pressable>
        ); })}
      </ScrollView>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>{renderTabContent()}<View style={styles.bottomPadding} /></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
  backButton: { padding: 8, marginRight: 8 },
  headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  agentIconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  moreButton: { padding: 8 },
  tabBar: { maxHeight: 60, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  tabBarContent: { paddingHorizontal: 12, paddingVertical: 12, gap: 8 },
  tabButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'transparent', gap: 6 },
  tabText: { fontSize: 13, fontWeight: '600' },
  content: { flex: 1 },
  tabContent: { padding: 16, gap: 16 },
  bottomPadding: { height: 32 },
  statusBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12 },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '600' },
  versionText: { fontSize: 12 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  metricIconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  trendBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  trendText: { fontSize: 11, fontWeight: '600' },
  metricValue: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  metricTitle: { fontSize: 12 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  descriptionText: { fontSize: 14, lineHeight: 22 },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 20 },
  roiGrid: { flexDirection: 'row', alignItems: 'center' },
  roiItem: { flex: 1, alignItems: 'center' },
  roiDivider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.1)' },
  roiValue: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  roiLabel: { fontSize: 12 },
  capabilityCard: { padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  capabilityHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  capabilityIconContainer: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  capabilityInfo: { flex: 1 },
  capabilityName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  capabilityMeta: { fontSize: 12 },
  capabilityDescription: { fontSize: 13, lineHeight: 20, marginTop: 10 },
  workflowCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  workflowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  workflowTitleSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  workflowName: { fontSize: 15, fontWeight: '600' },
  executeButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, gap: 6 },
  executeButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  workflowDescription: { fontSize: 13, lineHeight: 20, marginBottom: 14 },
  workflowSection: { marginBottom: 12 },
  workflowSectionTitle: { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  workflowStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  stepNumber: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  stepNumberText: { fontSize: 11, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 12, lineHeight: 18, marginTop: 2 },
  integrationsSummary: { flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center' },
  summaryValue: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  summaryLabel: { fontSize: 12 },
  integrationCard: { padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  integrationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  integrationMain: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  integrationName: { fontSize: 15, fontWeight: '600' },
  integrationType: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusBadgeText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  analyticsCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', alignItems: 'center' },
  analyticsValue: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  analyticsLabel: { fontSize: 12 },
  metricsListCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  kpiLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  kpiText: { fontSize: 14 },
  kpiBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  kpiBadgeText: { fontSize: 11, fontWeight: '600' },
  settingsCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  settingsSectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  powerIcon: { width: 20, height: 20, borderRadius: 10 },
  settingName: { fontSize: 15, fontWeight: '600' },
  settingDescription: { fontSize: 12, marginTop: 2 },
  scaleConfig: { flexDirection: 'row', gap: 16, marginTop: 12 },
  scaleItem: { flex: 1 },
  scaleTriggerBox: { marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.03)' },
  scaleLabel: { fontSize: 12, marginBottom: 4 },
  scaleValue: { fontSize: 16, fontWeight: '600' },
  scaleTriggerText: { fontSize: 13 },
  slaItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  slaInfo: { marginLeft: 12, flex: 1 },
  slaLabel: { fontSize: 12 },
  slaValue: { fontSize: 15, fontWeight: '600', marginTop: 2 },
  toolItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  toolText: { fontSize: 14 },
});
