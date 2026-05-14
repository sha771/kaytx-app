import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'command',
  layerNumber: 7,
  name: 'Command',
  description: 'Orchestrate, control, and coordinate all AI operations across the platform. This layer manages workflow execution and resource allocation.',
  color: '#EF4444',
  gradient: ['#EF4444', '#DC2626'] as [string, string],
  agentCount: 22,
  tokenUsage: 300,
  optimizedTokenUsage: 80,
  workType: 'Control',
  flow: 'Orchestrate',
  features: ['Workflow Orchestration', 'Resource Management', 'Task Scheduling', 'Load Balancing', 'Health Monitoring', 'Failover Control'],
  components: [
    { id: 'cdoo', name: 'CDOO', description: 'Chief Digital & Operations Officer', icon: 'Command', route: '/ai-agent/command/cdoo' },
    { id: 'ddo', name: 'DDO', description: 'Digital Deployment Officer', icon: 'Zap', route: '/ai-agent/command/ddo' },
    { id: 'wol', name: 'WOL', description: 'Workforce Optimization Lead', icon: 'Users', route: '/ai-agent/command/wol' },
    { id: 'aod', name: 'AOD', description: 'Automation Operations Director', icon: 'Settings', route: '/ai-agent/command/aod' },
    { id: 'pred', name: 'PRED', description: 'Prediction & Resource Director', icon: 'TrendingUp', route: '/ai-agent/command/pred' },
    { id: 'swarm', name: 'SWARM', description: 'Swarm Coordination System', icon: 'Network', route: '/ai-agent/command/swarm' },
    { id: 'orchestrator', name: 'Orchestrator', description: 'Main workflow orchestrator', icon: 'Workflow', route: '/ai-agent/command/orchestrator' },
    { id: 'task-scheduler', name: 'Task Scheduler', description: 'Schedule and allocate tasks', icon: 'Zap', route: '/ai-agent/command/scheduler' },
    { id: 'resource-allocator', name: 'Resource Allocator', description: 'Allocate AI resources', icon: 'Layers', route: '/ai-agent/command/resource' },
    { id: 'load-balancer', name: 'Load Balancer', description: 'Balance workload across agents', icon: 'Gauge', route: '/ai-agent/command/load-balancer' },
    { id: 'health-monitor', name: 'Health Monitor', description: 'Monitor agent health', icon: 'AlertTriangle', route: '/ai-agent/command/health' },
    { id: 'failover-controller', name: 'Failover Controller', description: 'Handle agent failures', icon: 'Shield', route: '/ai-agent/command/failover' },
  ],
};

const iconMap: Record<string, any> = { Command: Icons.Command, Zap: Icons.Zap, Users: Icons.Users, Settings: Icons.Settings, TrendingUp: Icons.TrendingUp, Network: Icons.Network, Workflow: Icons.Workflow, Layers: Icons.Layers, Gauge: Icons.Gauge, AlertTriangle: Icons.AlertTriangle, Shield: Icons.Shield };

const LayerCommand = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'balanced', autoScale: true, failover: true, monitoring: 'realtime' });
  const [options, setOptions] = useState({ enableOrchestration: true, enableScheduling: true, enableLoadBalancing: true, enableHealthMonitoring: true, enableFailover: true, enableResourceMgmt: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Active Workflows', value: '156', icon: Icons.Workflow, color: '#EF4444', trend: '+24' },
    { label: 'Tasks/min', value: '2.4K', icon: Icons.Zap, color: '#F59E0B', trend: '+420' },
    { label: 'Success Rate', value: '99.7%', icon: Icons.CheckCircle, color: '#10B981', trend: '+0.3%' },
    { label: 'Avg Latency', value: '23ms', icon: Icons.Gauge, color: '#6366F1', trend: '-5ms' },
  ], []);

  const workflowMetrics = useMemo(() => [
    { name: 'Data Processing', active: 45, throughput: '850/min', latency: '18ms' },
    { name: 'User Requests', active: 38, throughput: '620/min', latency: '22ms' },
    { name: 'Batch Jobs', active: 24, throughput: '180/min', latency: '45ms' },
    { name: 'Real-time', active: 49, throughput: '1.2K/min', latency: '12ms' },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') || stat.trend.startsWith('-') ? '#10B981' : '#EF4444' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Workflow Performance</Text>
        <View style={[styles.wfCard, { backgroundColor: colors.card }]}>
          {workflowMetrics.map((wf, idx) => (
            <View key={idx} style={styles.wfRow}>
              <View style={styles.wfInfo}>
                <Text style={[styles.wfName, { color: colors.text }]}>{wf.name}</Text>
                <View style={[styles.wfBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.wfProgress, { width: `${(wf.active / 50) * 100}%`, backgroundColor: '#EF4444' }]} />
                </View>
              </View>
              <View style={styles.wfStats}>
                <Text style={[styles.wfThroughput, { color: colors.text }]}>{wf.throughput}</Text>
                <Text style={[styles.wfLatency, { color: parseInt(wf.latency) < 25 ? '#10B981' : '#F59E0B' }]}>{wf.latency}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>System Health</Text>
        <View style={[styles.healthCard, { backgroundColor: colors.card }]}>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Orchestrator Status</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>Healthy</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Active Agents</Text><Text style={[styles.healthValue, { color: colors.text }]}>22/22</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Failover Ready</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>Enabled</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#EF4444" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search controllers..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Command Mode</Text>
        <View style={styles.modeButtons}>
          {(['conservative', 'balanced', 'aggressive'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Control Options</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Auto Scaling</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Scale resources automatically</Text></View>
            <Switch value={environment.autoScale} onValueChange={(value) => setEnvironment(prev => ({ ...prev, autoScale: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.autoScale ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Failover</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Enable automatic failover</Text></View>
            <Switch value={environment.failover} onValueChange={(value) => setEnvironment(prev => ({ ...prev, failover: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.failover ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Command environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Command Options</Text>
        {[{ key: 'enableOrchestration', label: 'Workflow Orchestration', desc: 'Coordinate workflows' }, { key: 'enableScheduling', label: 'Task Scheduling', desc: 'Schedule tasks' }, { key: 'enableLoadBalancing', label: 'Load Balancing', desc: 'Balance workloads' }, { key: 'enableHealthMonitoring', label: 'Health Monitoring', desc: 'Monitor health' }, { key: 'enableFailover', label: 'Failover Control', desc: 'Handle failures' }, { key: 'enableResourceMgmt', label: 'Resource Management', desc: 'Manage resources' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L7</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Controller</Text></TouchableOpacity>
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
  header: { padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }, 
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, 
  backButton: { padding: 8, marginRight: 8 }, 
  headerTitleContainer: { flex: 1 }, 
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, 
  layerNumber: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }, 
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, 
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, 
  settingsButton: { padding: 8 }, 
  headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18, marginBottom: 12 }, 
  headerStats: { flexDirection: 'row', gap: 16 }, 
  headerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 }, 
  headerStatText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' }, 
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 }, 
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }, 
  tabActive: { backgroundColor: 'rgba(255,255,255,0.15)' }, 
  tabIndicator: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }, 
  tabLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }, 
  tabLabelActive: { color: '#FFFFFF', fontWeight: '600' }, 
  content: { flex: 1, paddingHorizontal: 16 }, 
  overviewContainer: { paddingVertical: 16 }, 
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }, 
  statCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' }, 
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }, 
  statTrend: { fontSize: 11, fontWeight: '600' }, 
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 }, 
  statLabel: { fontSize: 11, marginTop: 2 }, 
  wfCard: { padding: 16, borderRadius: 12 }, 
  wfRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }, 
  wfInfo: { flex: 1, marginRight: 16 }, 
  wfName: { fontSize: 14, fontWeight: '600', marginBottom: 6 }, 
  wfBar: { height: 6, borderRadius: 3, overflow: 'hidden' }, 
  wfProgress: { height: '100%', borderRadius: 3 }, 
  wfStats: { alignItems: 'flex-end' }, 
  wfThroughput: { fontSize: 12, fontWeight: '500', marginBottom: 2 }, 
  wfLatency: { fontSize: 12, fontWeight: '700' }, 
  section: { marginBottom: 20 }, 
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 }, 
  healthCard: { padding: 16, borderRadius: 12 }, 
  healthRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }, 
  healthLabel: { fontSize: 14 }, 
  healthValue: { fontSize: 14, fontWeight: '600' }, 
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, 
  featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 }, 
  featureText: { fontSize: 13, fontWeight: '500' }, 
  componentsContainer: { paddingVertical: 16 }, 
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2937', borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 }, 
  searchInput: { flex: 1, fontSize: 14, marginLeft: 8 }, 
  componentsList: { gap: 10 }, 
  componentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 }, 
  componentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, 
  componentContent: { flex: 1 }, 
  componentName: { fontSize: 15, fontWeight: '600', marginBottom: 2 }, 
  componentDescription: { fontSize: 12 }, 
  environmentContainer: { paddingVertical: 16 }, 
  envSection: { marginBottom: 24 }, 
  envTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, 
  modeButtons: { flexDirection: 'row', gap: 8 }, 
  modeButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' }, 
  modeButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' }, 
  toggleCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, 
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, 
  toggleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, 
  toggleDescription: { fontSize: 12 }, 
  optionsContainer: { paddingVertical: 16 }, 
  optionsSection: { marginBottom: 24 }, 
  optionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, 
  optionCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, 
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, 
  optionInfo: { flex: 1, marginRight: 12 }, 
  optionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, 
  optionDesc: { fontSize: 12 }, 
  saveButton: { marginTop: 8, marginBottom: 32 }, 
  saveButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, 
  saveButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' }, 
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }, 
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }, 
  modalHeader: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 }, 
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, 
  modalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }, 
  modalCloseButton: { padding: 8 }, 
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, 
  modalBody: { padding: 20 }, 
  modalDescription: { fontSize: 15, lineHeight: 22, marginBottom: 20 }, 
  modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, 
  modalActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default LayerCommand;
