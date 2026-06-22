import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'execution',
  layerNumber: 9,
  name: 'Execution',
  description: 'Execute business functions across 22 departments for day-to-day operations. This layer handles all operational tasks and service delivery.',
  color: '#EC4899',
  gradient: ['#EC4899', '#DB2777'] as [string, string],
  agentCount: 220,
  tokenUsage: 800,
  optimizedTokenUsage: 200,
  workType: 'Operations',
  flow: 'Execute',
  features: ['Department-Specific Tasks', 'Day-to-Day Operations', 'Cross-Functional Coordination', 'Process Execution', 'Service Delivery', 'Performance Tracking'],
  components: [
    { id: 'customer-experience', name: 'Customer Experience', description: 'Support, success, CX', icon: 'Users', route: '/ai-agent/customer-experience' },
    { id: 'sales', name: 'Sales', description: 'Sales and revenue generation', icon: 'TrendingUp', route: '/ai-agent/sales' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing and growth', icon: 'Target', route: '/ai-agent/marketing' },
    { id: 'finance', name: 'Finance', description: 'Financial operations', icon: 'TrendingUp', route: '/ai-agent/accounting' },
    { id: 'technology', name: 'Technology', description: 'Tech and engineering', icon: 'Brain', route: '/ai-agent/it' },
    { id: 'operations', name: 'Operations', description: 'Operations management', icon: 'Settings', route: '/ai-agent/operations' },
    { id: 'hr', name: 'Human Resources', description: 'HR and talent', icon: 'Users', route: '/ai-agent/hr' },
    { id: 'legal', name: 'Legal & Compliance', description: 'Legal and compliance', icon: 'Scale', route: '/ai-agent/legal' },
    { id: 'data-intelligence', name: 'Data & Intelligence', description: 'Data and analytics', icon: 'BarChart3', route: '/ai-agent/data-intelligence' },
    { id: 'product', name: 'Product', description: 'Product development', icon: 'Zap', route: '/ai-agent/product' },
    { id: 'security', name: 'Security', description: 'Security and risk', icon: 'Shield', route: '/ai-agent/security' },
    { id: 'research', name: 'Research & Innovation', description: 'R&D and innovation', icon: 'Lightbulb', route: '/ai-agent/research' },
  ],

};
const iconMap: Record<string, any> = { Users: Icons.Users, TrendingUp: Icons.TrendingUp, Target: Icons.Target, Brain: Icons.Brain, Settings: Icons.Settings, Scale: Icons.Scale, BarChart3: Icons.BarChart3, Zap: Icons.Zap, Shield: Icons.Shield, Lightbulb: Icons.Lightbulb };

const LayerExecution = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'full', parallel: true, priority: 'balanced' });
  const [options, setOptions] = useState({ enableCustomerOps: true, enableSalesOps: true, enableMarketingOps: true, enableFinanceOps: true, enableHROps: true, enableITOps: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Tasks Completed', value: '45.2K', icon: Icons.CheckCircle, color: '#10B981', trend: '+8.4K' },
    { label: 'Active Agents', value: '220', icon: Icons.Bot, color: '#EC4899', trend: '+32' },
    { label: 'Success Rate', value: '98.4%', icon: Icons.TrendingUp, color: '#6366F1', trend: '+1.2%' },
    { label: 'Avg Time', value: '2.3s', icon: Icons.Zap, color: '#F59E0B', trend: '-0.4s' },
  ], []);

  const executionMetrics = useMemo(() => [
    { type: 'Data Processing', completed: 12450, failed: 45, avgTime: '1.8s' },
    { type: 'User Tasks', completed: 8920, failed: 124, avgTime: '2.1s' },
    { type: 'Automated', completed: 15680, failed: 89, avgTime: '2.8s' },
    { type: 'Scheduled', completed: 8150, failed: 32, avgTime: '3.2s' },
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Task Performance</Text>
        <View style={[styles.execCard, { backgroundColor: colors.card }]}>
          {executionMetrics.map((item, idx) => (
            <View key={idx} style={styles.execRow}>
              <View style={styles.execInfo}>
                <Text style={[styles.execType, { color: colors.text }]}>{item.type}</Text>
                <View style={[styles.execBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.execProgress, { width: `${(item.completed / (item.completed + item.failed)) * 100}%`, backgroundColor: '#10B981' }]} />
                </View>
              </View>
              <View style={styles.execStats}>
                <Text style={[styles.execCompleted, { color: colors.text }]}>{item.completed.toLocaleString()}</Text>
                <Text style={[styles.execFailed, { color: item.failed < 50 ? '#10B981' : '#EF4444' }]}>{item.failed} fail</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Execution Status</Text>
        <View style={[styles.healthCard, { backgroundColor: colors.card }]}>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Active Tasks</Text><Text style={[styles.healthValue, { color: colors.text }]}>1,247</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Queue Depth</Text><Text style={[styles.healthValue, { color: '#F59E0B' }]}>Low</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Success Rate</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>98.4%</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#EC4899" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search departments..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Execution Mode</Text>
        <View style={styles.modeButtons}>
          {(['minimal', 'standard', 'full'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Execution Options</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Parallel Execution</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Run tasks in parallel</Text></View>
            <Switch value={environment.parallel} onValueChange={(value) => setEnvironment(prev => ({ ...prev, parallel: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.parallel ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Execution environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Department Options</Text>
        {[{ key: 'enableCustomerOps', label: 'Customer Operations', desc: 'CX tasks' }, { key: 'enableSalesOps', label: 'Sales Operations', desc: 'Sales tasks' }, { key: 'enableMarketingOps', label: 'Marketing Operations', desc: 'Marketing tasks' }, { key: 'enableFinanceOps', label: 'Finance Operations', desc: 'Finance tasks' }, { key: 'enableHROps', label: 'HR Operations', desc: 'HR tasks' }, { key: 'enableITOps', label: 'IT Operations', desc: 'IT tasks' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L9</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Department</Text></TouchableOpacity>
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
  execCard: { padding: 16, borderRadius: 12 }, 
  execRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }, 
  execInfo: { flex: 1, marginRight: 16 }, 
  execType: { fontSize: 14, fontWeight: '600', marginBottom: 6 }, 
  execBar: { height: 6, borderRadius: 3, overflow: 'hidden' }, 
  execProgress: { height: '100%', borderRadius: 3 }, 
  execStats: { alignItems: 'flex-end' }, 
  execCompleted: { fontSize: 12, fontWeight: '500', marginBottom: 2 }, 
  execFailed: { fontSize: 12, fontWeight: '700' }, 
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

export default LayerExecution;
