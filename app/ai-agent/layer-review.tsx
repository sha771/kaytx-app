import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'review',
  layerNumber: 11,
  name: 'Review',
  description: 'Review AI work, analyze performance, and display results to leadership and users. This layer provides analytics, dashboards, and reporting.',
  color: '#84CC16',
  gradient: ['#84CC16', '#65A30D'] as [string, string],
  agentCount: 28,
  tokenUsage: 200,
  optimizedTokenUsage: 50,
  workType: 'Feedback',
  flow: 'Review & show',
  features: ['Performance Analytics', 'KPI Tracking', 'Real-Time Alerts', 'Executive Dashboards', 'Interactive Reports', 'User Portal Access'],
  components: [
    { id: 'performance-review', name: 'Performance Review Engine', description: 'Analyze AI work', icon: 'Gauge', route: '/ai-agent/review/performance' },
    { id: 'kpi-analysis', name: 'KPI Analysis Dashboard', description: 'Track KPIs', icon: 'BarChart3', route: '/ai-agent/review/kpi' },
    { id: 'success-analyzer', name: 'Success/Failure Analyzer', description: 'Analyze outcomes', icon: 'CheckCircle', route: '/ai-agent/review/success' },
    { id: 'failure-analyzer', name: 'Failure Analysis', description: 'Analyze failures', icon: 'AlertTriangle', route: '/ai-agent/review/failure' },
    { id: 'executive-reporting', name: 'Executive Reporting', description: 'Board-level reports', icon: 'FileText', route: '/ai-agent/review/executive' },
    { id: 'dashboard-viz', name: 'Dashboard Visualization', description: 'Charts and graphs', icon: 'BarChart3', route: '/ai-agent/review/dashboard' },
    { id: 'real-time-alerts', name: 'Real-Time Alerts', description: 'Live notifications', icon: 'AlertTriangle', route: '/ai-agent/review/alerts' },
    { id: 'interactive-reports', name: 'Interactive Reports', description: 'Drill-down analysis', icon: 'Search', route: '/ai-agent/review/interactive' },
    { id: 'user-portal', name: 'Customer/User Portal', description: 'User access', icon: 'Users', route: '/ai-agent/review/portal' },
    { id: 'trend-analysis', name: 'Trend Analysis', description: 'Track trends over time', icon: 'TrendingUp', route: '/ai-agent/review/trends' },
    { id: 'comparison-reports', name: 'Comparison Reports', description: 'Compare performance', icon: 'Layers', route: '/ai-agent/review/comparison' },
    { id: 'export-tools', name: 'Export Tools', description: 'Export reports', icon: 'FileText', route: '/ai-agent/review/export' },
  ],
};

const iconMap: Record<string, any> = { Gauge: Icons.Gauge, BarChart3: Icons.BarChart3, CheckCircle: Icons.CheckCircle, AlertTriangle: Icons.AlertTriangle, FileText: Icons.FileText, Search: Icons.Search, Users: Icons.Users, TrendingUp: Icons.TrendingUp, Layers: Icons.Layers };

const LayerReview = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'detailed', refreshRate: 'realtime', alerts: true });
  const [options, setOptions] = useState({ enableAnalytics: true, enableKPIs: true, enableAlerts: true, enableDashboards: true, enableReports: true, enablePortal: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Reports Generated', value: '2.4K', icon: Icons.FileText, color: '#84CC16', trend: '+420' },
    { label: 'KPIs Tracked', value: '156', icon: Icons.Gauge, color: '#6366F1', trend: '+24' },
    { label: 'Alerts Sent', value: '847', icon: Icons.AlertTriangle, color: '#F59E0B', trend: '-32' },
    { label: 'Avg Score', value: '94.2%', icon: Icons.CheckCircle, color: '#10B981', trend: '+2.1%' },
  ], []);

  const reviewMetrics = useMemo(() => [
    { area: 'Sales Performance', score: 96, status: 'excellent' },
    { area: 'Customer Satisfaction', score: 92, status: 'good' },
    { area: 'Operational Efficiency', score: 89, status: 'good' },
    { area: 'Financial Health', score: 98, status: 'excellent' },
    { area: 'Employee Engagement', score: 85, status: 'fair' },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') ? '#10B981' : stat.trend.startsWith('-') ? '#EF4444' : '#6B7280' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Areas</Text>
        <View style={[styles.reviewCard, { backgroundColor: colors.card }]}>
          {reviewMetrics.map((item, idx) => (
            <View key={idx} style={styles.reviewRow}>
              <View style={styles.reviewInfo}>
                <Text style={[styles.reviewArea, { color: colors.text }]}>{item.area}</Text>
                <View style={[styles.reviewBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.reviewProgress, { width: `${item.score}%`, backgroundColor: item.score >= 90 ? '#10B981' : item.score >= 80 ? '#F59E0B' : '#EF4444' }]} />
                </View>
              </View>
              <View style={styles.reviewStats}>
                <Text style={[styles.reviewScore, { color: item.score >= 90 ? '#10B981' : item.score >= 80 ? '#F59E0B' : '#EF4444' }]}>{item.score}%</Text>
                <Text style={[styles.reviewStatus, { color: item.status === 'excellent' ? '#10B981' : item.status === 'good' ? '#6366F1' : '#F59E0B' }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Summary</Text>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.text }]}>Overall Score</Text><Text style={[styles.summaryValue, { color: '#10B981' }]}>94.2%</Text></View>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.text }]}>Tasks Reviewed</Text><Text style={[styles.summaryValue, { color: colors.text }]}>45,234</Text></View>
          <View style={styles.summaryRow}><Text style={[styles.summaryLabel, { color: colors.text }]}>Success Rate</Text><Text style={[styles.summaryValue, { color: '#10B981' }]}>97.8%</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#84CC16" />
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderComponents = () => (
    <View style={styles.componentsContainer}>
      <View style={styles.searchContainer}>
        <Icons.Search size={18} color={colors.textSecondary} />
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search reports..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <FlatList data={filteredComponents} keyExtractor={(item) => item.id} renderItem={({ item }) => {
        const IconComponent = iconMap[item.icon] || Icons.Circle;
        return (
          <TouchableOpacity style={[styles.componentCard, { backgroundColor: colors.card }]} onPress={() => { setSelectedComponent(item); setShowComponentModal(true); }}>
            <View style={[styles.componentIcon, { backgroundColor: layerData.color + '20' }]}><IconComponent size={22} color={layerData.color} /></View>
            <View style={styles.componentContent}><Text style={[styles.componentName, { color: colors.text }]}>{item.name}</Text><Text style={[styles.componentDescription, { color: colors.textSecondary }]} numberOfLines={2}>{item.description}</Text></View>
            <Icons.ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        );
      }} contentContainerStyle={styles.componentsList} />
    </View>
  );

  const renderEnvironment = () => (
    <ScrollView style={styles.environmentContainer}>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Report Mode</Text>
        <View style={styles.modeButtons}>
          {(['summary', 'detailed', 'comprehensive'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Review Options</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Real-Time Alerts</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Enable live notifications</Text></View>
            <Switch value={environment.alerts} onValueChange={(value) => setEnvironment(prev => ({ ...prev, alerts: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.alerts ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Review environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Review Options</Text>
        {[{ key: 'enableAnalytics', label: 'Performance Analytics', desc: 'Analyze performance' }, { key: 'enableKPIs', label: 'KPI Tracking', desc: 'Track KPIs' }, { key: 'enableAlerts', label: 'Real-Time Alerts', desc: 'Send alerts' }, { key: 'enableDashboards', label: 'Dashboards', desc: 'View dashboards' }, { key: 'enableReports', label: 'Reports', desc: 'Generate reports' }, { key: 'enablePortal', label: 'User Portal', desc: 'User access' }].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}><Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text><Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text></View>
              <Switch value={options[opt.key as keyof typeof options] as boolean} onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'} />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Options updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Options</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={layerData.gradient} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><Icons.ArrowLeft size={24} color="#FFFFFF" /></TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L11</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
            <Text style={styles.headerSubtitle}>{layerData.workType} Layer</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}><Icons.Settings size={22} color="#FFFFFF" /></TouchableOpacity>
        </View>
        <Text style={styles.headerDescription}>{layerData.description}</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}><Icons.Users size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.agentCount} Agents</Text></View>
          <View style={styles.headerStat}><Icons.Zap size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.optimizedTokenUsage} Tokens</Text></View>
          <View style={styles.headerStat}><Icons.Activity size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.flow}</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[{ key: 'overview', label: 'Overview', icon: Icons.LayoutDashboard }, { key: 'components', label: 'Components', icon: Icons.Layers }, { key: 'environment', icon: Icons.Server, label: 'Environment' }, { key: 'options', label: 'Options', icon: Icons.Settings }].map(tab => (
          <TouchableOpacity key={tab.key} style={[styles.tab, activeTab === tab.key && styles.tabActive]} onPress={() => setActiveTab(tab.key as any)}>
            {activeTab === tab.key && <View style={styles.tabIndicator} />}
            <tab.icon size={18} color={activeTab === tab.key ? layerData.color : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'components' && renderComponents()}
        {activeTab === 'environment' && renderEnvironment()}
        {activeTab === 'options' && renderOptions()}
      </ScrollView>

      <Modal visible={showComponentModal} animationType="slide" transparent onRequestClose={() => setShowComponentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            {selectedComponent && (
              <>
                <LinearGradient colors={layerData.gradient} style={styles.modalHeader}>
                  <View style={styles.modalHeaderRow}>
                    <View style={styles.modalIconContainer}>{React.createElement(iconMap[selectedComponent.icon] || Icons.Circle, { size: 28, color: '#FFFFFF' })}</View>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowComponentModal(false)}><Icons.X size={24} color="#FFFFFF" /></TouchableOpacity>
                  </View>
                  <Text style={styles.modalTitle}>{selectedComponent.name}</Text>
                </LinearGradient>
                <ScrollView style={styles.modalBody}>
                  <Text style={[styles.modalDescription, { color: colors.text }]}>{selectedComponent.description}</Text>
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Report</Text></TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }, 
  header: { 
    padding: 16, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    backgroundColor: '#1F2937' 
  }, 
  headerTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  }, 
  backButton: { 
    padding: 8, 
    marginRight: 8 
  }, 
  headerTitleContainer: { 
    flex: 1 
  }, 
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  }, 
  layerNumber: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: 'rgba(255,255,255,0.7)', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 8 
  }, 
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  }, 
  headerSubtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.7)', 
    marginTop: 2 
  }, 
  settingsButton: { 
    padding: 8 
  }, 
  headerDescription: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)', 
    lineHeight: 18, 
    marginBottom: 12 
  }, 
  headerStats: { 
    flexDirection: 'row', 
    gap: 16 
  }, 
  headerStat: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  }, 
  headerStatText: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.8)' 
  }, 
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 8, 
    backgroundColor: '#1F2937' 
  }, 
  tab: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 8, 
    borderRadius: 10, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    position: 'relative' 
  }, 
  tabActive: { 
    backgroundColor: 'rgba(255,255,255,0.15)' 
  }, 
  tabIndicator: { 
    position: 'absolute', 
    top: 0, 
    left: '20%', 
    right: '20%', 
    height: 3, 
    backgroundColor: '#10B981', 
    borderBottomLeftRadius: 3, 
    borderBottomRightRadius: 3 
  }, 
  tabLabel: { 
    fontSize: 11, 
    color: 'rgba(255,255,255,0.6)', 
    marginTop: 4 
  }, 
  tabLabelActive: { 
    color: '#10B981', 
    fontWeight: '600' 
  }, 
  content: { 
    flex: 1, 
    paddingHorizontal: 16 
  }, 
  overviewContainer: { 
    paddingVertical: 16 
  }, 
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10, 
    marginBottom: 20 
  }, 
  statCard: { 
    width: (width - 42) / 2, 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    backgroundColor: '#1F2937' 
  }, 
  statHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    alignItems: 'center' 
  }, 
  statTrend: { 
    fontSize: 11, 
    fontWeight: '600' 
  }, 
  statValue: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 8, 
    color: '#FFFFFF' 
  }, 
  statLabel: { 
    fontSize: 11, 
    marginTop: 2, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  reviewCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#1F2937' 
  }, 
  reviewRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10 
  }, 
  reviewInfo: { 
    flex: 1, 
    marginRight: 16 
  }, 
  reviewArea: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#FFFFFF' 
  }, 
  reviewBar: { 
    height: 6, 
    borderRadius: 3, 
    overflow: 'hidden' 
  }, 
  reviewProgress: { 
    height: '100%', 
    borderRadius: 3 
  }, 
  reviewStats: { 
    alignItems: 'flex-end' 
  }, 
  reviewScore: { 
    fontSize: 12, 
    fontWeight: '700', 
    marginBottom: 2, 
    color: '#10B981' 
  }, 
  reviewStatus: { 
    fontSize: 11, 
    fontWeight: '500', 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  section: { 
    marginBottom: 20 
  }, 
  sectionTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  }, 
  summaryCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#1F2937' 
  }, 
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 8 
  }, 
  summaryLabel: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  summaryValue: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#10B981' 
  }, 
  featuresGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  }, 
  featureCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 10, 
    gap: 8, 
    backgroundColor: '#1F2937' 
  }, 
  featureText: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  componentsContainer: { 
    paddingVertical: 16 
  }, 
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1F2937', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    height: 44, 
    marginBottom: 16 
  }, 
  searchInput: { 
    flex: 1, 
    fontSize: 14, 
    marginLeft: 8, 
    color: '#FFFFFF' 
  }, 
  componentsList: { 
    gap: 10 
  }, 
  componentCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    borderRadius: 12, 
    backgroundColor: '#1F2937' 
  }, 
  componentIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  }, 
  componentContent: { 
    flex: 1 
  }, 
  componentName: { 
    fontSize: 15, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  }, 
  componentDescription: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  environmentContainer: { 
    paddingVertical: 16 
  }, 
  envSection: { 
    marginBottom: 24 
  }, 
  envTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  }, 
  modeButtons: { 
    flexDirection: 'row', 
    gap: 8 
  }, 
  modeButton: { 
    flex: 1, 
    paddingVertical: 10, 
    borderRadius: 10, 
    backgroundColor: '#374151', 
    alignItems: 'center' 
  }, 
  modeButtonText: { 
    fontSize: 12, 
    color: '#FFFFFF', 
    fontWeight: '500' 
  }, 
  toggleCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10, 
    backgroundColor: '#1F2937' 
  }, 
  toggleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  }, 
  toggleTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  }, 
  toggleDescription: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  optionsContainer: { 
    paddingVertical: 16 
  }, 
  optionsSection: { 
    marginBottom: 24 
  }, 
  optionsTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  }, 
  optionCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10, 
    backgroundColor: '#1F2937' 
  }, 
  optionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  }, 
  optionInfo: { 
    flex: 1, 
    marginRight: 12 
  }, 
  optionLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  }, 
  optionDesc: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  saveButton: { 
    marginTop: 8, 
    marginBottom: 32 
  }, 
  saveButtonGradient: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 14, 
    borderRadius: 12, 
    gap: 8 
  }, 
  saveButtonText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  }, 
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'flex-end' 
  }, 
  modalContent: { 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    maxHeight: '80%', 
    backgroundColor: '#1F2937' 
  }, 
  modalHeader: { 
    padding: 20, 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24 
  }, 
  modalHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  }, 
  modalIconContainer: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }, 
  modalCloseButton: { 
    padding: 8 
  }, 
  modalTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  }, 
  modalBody: { 
    padding: 20 
  }, 
  modalDescription: { 
    fontSize: 15, 
    lineHeight: 22, 
    marginBottom: 20, 
    color: 'rgba(255,255,255,0.7)' 
  }, 
  modalActionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 14, 
    borderRadius: 12, 
    gap: 8 
  }, 
  modalActionText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
});
