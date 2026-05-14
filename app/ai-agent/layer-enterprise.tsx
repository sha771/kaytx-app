import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'enterprise',
  layerNumber: 8,
  name: 'Enterprise',
  description: 'Enterprise operations, automation, and cross-department workflows. This layer handles large-scale business operations and process automation.',
  color: '#3B82F6',
  gradient: ['#3B82F6', '#2563EB'] as [string, string],
  agentCount: 45,
  tokenUsage: 400,
  optimizedTokenUsage: 100,
  workType: 'Operations',
  flow: 'Automate',
  features: ['Cross-Department Workflows', 'Enterprise Automation', 'SLA Management', 'Business Intelligence', 'Process Optimization', 'Strategic Planning'],
  components: [
    { id: 'executive-decision', name: 'Executive Decision System', description: 'Board-level recommendations', icon: 'Crown', route: '/ai-agent/enterprise/executive-decision' },
    { id: 'risk-matrix', name: 'Risk Assessment Matrix', description: 'Enterprise-wide risk analysis', icon: 'AlertTriangle', route: '/ai-agent/enterprise/risk-matrix' },
    { id: 'opportunity-scanner', name: 'Opportunity Scanner', description: 'Market opportunity identification', icon: 'Search', route: '/ai-agent/enterprise/opportunity' },
    { id: 'investment-prioritizer', name: 'Investment Prioritizer', description: 'Capital allocation AI', icon: 'TrendingUp', route: '/ai-agent/enterprise/investment' },
    { id: 'work-orchestration', name: 'Work Orchestration Engine', description: '22 departments synchronized', icon: 'Workflow', route: '/ai-agent/enterprise/work-orchestration' },
    { id: 'resource-optimizer', name: 'Resource Allocation Optimizer', description: 'AI-powered staffing', icon: 'Users', route: '/ai-agent/enterprise/resource' },
    { id: 'portfolio-manager', name: 'Project Portfolio Manager', description: 'Enterprise project tracking', icon: 'Layers', route: '/ai-agent/enterprise/portfolio' },
    { id: 'sla-monitor', name: 'SLA Compliance Monitor', description: 'Guarantee fulfillment AI', icon: 'CheckCircle', route: '/ai-agent/enterprise/sla' },
    { id: 'bi-hub', name: 'Business Intelligence Hub', description: 'Real-time enterprise metrics', icon: 'BarChart3', route: '/ai-agent/enterprise/bi' },
    { id: 'kpi-dashboard', name: 'KPI Dashboard Engine', description: 'Real-time metrics', icon: 'Gauge', route: '/ai-agent/enterprise/kpi' },
    { id: 'process-automation', name: 'Process Automation Core', description: 'Full business cycle automation', icon: 'Zap', route: '/ai-agent/enterprise/process' },
    { id: 'e2e-manager', name: 'End-to-End Process Manager', description: 'Full business cycle', icon: 'Workflow', route: '/ai-agent/enterprise/e2e' },
  ],
};

const iconMap: Record<string, any> = { Crown: Icons.Crown, AlertTriangle: Icons.AlertTriangle, Search: Icons.Search, TrendingUp: Icons.TrendingUp, Workflow: Icons.Workflow, Users: Icons.Users, Layers: Icons.Layers, CheckCircle: Icons.CheckCircle, BarChart3: Icons.BarChart3, Gauge: Icons.Gauge, Zap: Icons.Zap };

const LayerEnterprise = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'production', departments: 22, automation: true });
  const [options, setOptions] = useState({ enableWorkflows: true, enableAutomation: true, enableSLA: true, enableBI: true, enableOptimization: true, enablePlanning: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Active Workflows', value: '847', icon: Icons.Workflow, color: '#3B82F6', trend: '+124' },
    { label: 'Departments', value: '22', icon: Icons.Layers, color: '#6366F1', trend: '0' },
    { label: 'SLA Compliance', value: '99.2%', icon: Icons.CheckCircle, color: '#10B981', trend: '+1.5%' },
    { label: 'Automation', value: '78%', icon: Icons.Zap, color: '#F59E0B', trend: '+8%' },
  ], []);

  const departmentMetrics = useMemo(() => [
    { name: 'Sales', workflows: 124, compliance: 99.5, automation: 82 },
    { name: 'Marketing', workflows: 98, compliance: 98.2, automation: 75 },
    { name: 'Operations', workflows: 156, compliance: 99.8, automation: 88 },
    { name: 'Finance', workflows: 87, compliance: 100, automation: 71 },
    { name: 'IT', workflows: 134, compliance: 99.1, automation: 79 },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') ? '#10B981' : stat.trend === '0' ? '#6B7280' : '#EF4444' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Department Performance</Text>
        <View style={[styles.deptCard, { backgroundColor: colors.card }]}>
          {departmentMetrics.map((dept, idx) => (
            <View key={idx} style={styles.deptRow}>
              <View style={styles.deptInfo}>
                <Text style={[styles.deptName, { color: colors.text }]}>{dept.name}</Text>
                <View style={[styles.deptBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.deptProgress, { width: `${dept.automation}%`, backgroundColor: '#3B82F6' }]} />
                </View>
              </View>
              <View style={styles.deptStats}>
                <Text style={[styles.deptWorkflows, { color: colors.text }]}>{dept.workflows} wf</Text>
                <Text style={[styles.deptCompliance, { color: dept.compliance >= 99 ? '#10B981' : '#F59E0B' }]}>{dept.compliance}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Enterprise Health</Text>
        <View style={[styles.healthCard, { backgroundColor: colors.card }]}>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Workflows Running</Text><Text style={[styles.healthValue, { color: colors.text }]}>847</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Automation Rate</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>78%</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>SLA Met</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>99.2%</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Active Departments</Text><Text style={[styles.healthValue, { color: colors.text }]}>22</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Cross-Functional Flows</Text><Text style={[styles.healthValue, { color: '#3B82F6' }]}>156</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Avg Response Time</Text><Text style={[styles.healthValue, { color: colors.text }]}>1.2s</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#3B82F6" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search enterprise..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Environment Mode</Text>
        <View style={styles.modeButtons}>
          {(['development', 'staging', 'production'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Enterprise Options</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Automation Enabled</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Enable process automation</Text></View>
            <Switch value={environment.automation} onValueChange={(value) => setEnvironment(prev => ({ ...prev, automation: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.automation ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Enterprise environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Enterprise Options</Text>
        {[{ key: 'enableWorkflows', label: 'Cross-Department Workflows', desc: 'Enable workflows' }, { key: 'enableAutomation', label: 'Enterprise Automation', desc: 'Automate processes' }, { key: 'enableSLA', label: 'SLA Management', desc: 'Monitor SLAs' }, { key: 'enableBI', label: 'Business Intelligence', desc: 'Enable BI hub' }, { key: 'enableOptimization', label: 'Process Optimization', desc: 'Optimize processes' }, { key: 'enablePlanning', label: 'Strategic Planning', desc: 'Enable planning' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L8</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Module</Text></TouchableOpacity>
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
  container: { flex: 1 }, header: { padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }, headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, backButton: { padding: 8, marginRight: 8 }, headerTitleContainer: { flex: 1 }, headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, layerNumber: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }, headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, settingsButton: { padding: 8 }, headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18, marginBottom: 12 }, headerStats: { flexDirection: 'row', gap: 16 }, headerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 }, headerStatText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' }, tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 }, tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }, tabActive: { backgroundColor: 'rgba(255,255,255,0.15)' }, tabIndicator: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }, tabLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }, tabLabelActive: { color: '#FFFFFF', fontWeight: '600' }, content: { flex: 1, paddingHorizontal: 16 }, overviewContainer: { paddingVertical: 16 }, statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, statCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' }, statHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }, statTrend: { fontSize: 11, fontWeight: '600' }, statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 }, statLabel: { fontSize: 11, marginTop: 2 }, deptCard: { padding: 16, borderRadius: 12 }, deptRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }, deptInfo: { flex: 1, marginRight: 16 }, deptName: { fontSize: 14, fontWeight: '600', marginBottom: 6 }, deptBar: { height: 6, borderRadius: 3, overflow: 'hidden' }, deptProgress: { height: '100%', borderRadius: 3 }, deptStats: { alignItems: 'flex-end' }, deptWorkflows: { fontSize: 12, fontWeight: '500', marginBottom: 2 }, deptCompliance: { fontSize: 12, fontWeight: '700' }, section: { marginBottom: 20 }, sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 }, healthCard: { padding: 16, borderRadius: 12 }, healthRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }, healthLabel: { fontSize: 14 }, healthValue: { fontSize: 14, fontWeight: '600' }, featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 }, featureText: { fontSize: 13, fontWeight: '500' }, componentsContainer: { paddingVertical: 16 }, searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2937', borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 }, searchInput: { flex: 1, fontSize: 14, marginLeft: 8 }, componentsList: { gap: 10 }, componentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 }, componentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, componentContent: { flex: 1 }, componentName: { fontSize: 15, fontWeight: '600', marginBottom: 2 }, componentDescription: { fontSize: 12 }, environmentContainer: { paddingVertical: 16 }, envSection: { marginBottom: 24 }, envTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, modeButtons: { flexDirection: 'row', gap: 8 }, modeButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' }, modeButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' }, toggleCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, toggleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, toggleDescription: { fontSize: 12 }, optionsContainer: { paddingVertical: 16 }, optionsSection: { marginBottom: 24 }, optionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, optionCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, optionInfo: { flex: 1, marginRight: 12 }, optionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, optionDesc: { fontSize: 12 }, saveButton: { marginTop: 8, marginBottom: 32 }, saveButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, saveButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' }, modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }, modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }, modalHeader: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 }, modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, modalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }, modalCloseButton: { padding: 8 }, modalTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, modalBody: { padding: 20 }, modalDescription: { fontSize: 15, lineHeight: 22, marginBottom: 20 }, modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, modalActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default LayerEnterprise;
