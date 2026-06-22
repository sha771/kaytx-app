import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'memory',
  layerNumber: 5,
  name: 'Memory',
  description: 'Remember everything, learn from past interactions, and improve over time. This layer stores and retrieves enterprise knowledge for continuous learning.',
  color: '#10B981',
  gradient: ['#10B981', '#059669'] as [string, string],
  agentCount: 18,
  tokenUsage: 100,
  optimizedTokenUsage: 30,
  workType: 'Learning',
  flow: 'Remember',
  features: ['Long-term Memory', 'Learning from History', 'Pattern Recognition', 'Customer Insights', 'Process Optimization', 'Context Retention'],
  components: [
    { id: 'enterprise-memory', name: 'Enterprise Memory Bank', description: 'All past decisions and outcomes', icon: 'Database', route: '/ai-agent/memory/enterprise' },
    { id: 'decision-memory', name: 'Decision Memory', description: 'Store and recall decisions', icon: 'FileText', route: '/ai-agent/memory/decisions' },
    { id: 'outcome-memory', name: 'Outcome Memory', description: 'Track decision outcomes', icon: 'TrendingUp', route: '/ai-agent/memory/outcomes' },
    { id: 'agent-learning', name: 'Agent Learning Memory', description: 'What worked/didnt work', icon: 'Brain', route: '/ai-agent/memory/agent-learning' },
    { id: 'success-patterns', name: 'Success Patterns', description: 'Learn from successes', icon: 'CheckCircle', route: '/ai-agent/memory/success' },
    { id: 'failure-patterns', name: 'Failure Patterns', description: 'Learn from failures', icon: 'AlertTriangle', route: '/ai-agent/memory/failure' },
    { id: 'customer-history', name: 'Customer Interaction History', description: 'Every customer touchpoint', icon: 'Users', route: '/ai-agent/memory/customer' },
    { id: 'interaction-log', name: 'Interaction Log', description: 'Complete interaction records', icon: 'MessageSquare', route: '/ai-agent/memory/interactions' },
    { id: 'preference-store', name: 'Preference Store', description: 'Customer preferences', icon: 'Settings', route: '/ai-agent/memory/preferences' },
    { id: 'process-memory', name: 'Business Process Memory', description: 'Workflow patterns', icon: 'Workflow', route: '/ai-agent/memory/process' },
    { id: 'workflow-patterns', name: 'Workflow Patterns', description: 'Optimized workflow templates', icon: 'Layers', route: '/ai-agent/memory/workflows' },
    { id: 'context-store', name: 'Context Store', description: 'Session and context data', icon: 'Database', route: '/ai-agent/memory/context' },
  ],

};
const iconMap: Record<string, any> = { Database: Icons.Database, FileText: Icons.FileText, TrendingUp: Icons.TrendingUp, Brain: Icons.Brain, CheckCircle: Icons.CheckCircle, AlertTriangle: Icons.AlertTriangle, Users: Icons.Users, MessageSquare: Icons.MessageSquare, Settings: Icons.Settings, Workflow: Icons.Workflow, Layers: Icons.Layers };

const LayerMemory = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ retention: 'unlimited', compression: true, encryption: true, backup: 'auto' });
  const [options, setOptions] = useState({ enableLongTerm: true, enablePatternLearning: true, enableContextRetention: true, enableCustomerInsights: true, enableProcessOptimization: true, enableAutoCleanup: false });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Memories Stored', value: '2.8M', icon: Icons.Database, color: '#10B981', trend: '+320K' },
    { label: 'Patterns Learned', value: '45.2K', icon: Icons.Brain, color: '#6366F1', trend: '+2.4K' },
    { label: 'Recall Accuracy', value: '98.7%', icon: Icons.Search, color: '#F59E0B', trend: '+0.5%' },
    { label: 'Storage Used', value: '847 GB', icon: Icons.HardDrive, color: '#EC4899', trend: '+42GB' },
  ], []);

  const memoryMetrics = useMemo(() => [
    { type: 'Decision Memory', size: '245 GB', entries: '1.2M', hitRate: 99 },
    { type: 'Outcome Memory', size: '189 GB', entries: '890K', hitRate: 97 },
    { type: 'Customer History', size: '267 GB', entries: '2.4M', hitRate: 98 },
    { type: 'Agent Learning', size: '146 GB', entries: '567K', hitRate: 96 },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Memory Stores</Text>
        <View style={[styles.memCard, { backgroundColor: colors.card }]}>
          {memoryMetrics.map((mem, idx) => (
            <View key={idx} style={styles.memRow}>
              <View style={styles.memInfo}>
                <Text style={[styles.memType, { color: colors.text }]}>{mem.type}</Text>
                <View style={[styles.memBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.memProgress, { width: `${mem.hitRate}%`, backgroundColor: '#10B981' }]} />
                </View>
              </View>
              <View style={styles.memStats}>
                <Text style={[styles.memSize, { color: colors.text }]}>{mem.size}</Text>
                <Text style={[styles.memHit, { color: mem.hitRate >= 95 ? '#10B981' : '#F59E0B' }]}>{mem.hitRate}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Memory Health</Text>
        <View style={[styles.healthCard, { backgroundColor: colors.card }]}>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Memory Integrity</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>100%</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Index Efficiency</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>97.2%</Text></View>
          <View style={styles.healthRow}><Text style={[styles.healthLabel, { color: colors.text }]}>Recall Speed</Text><Text style={[styles.healthValue, { color: '#10B981' }]}>12ms</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#10B981" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search memory..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Retention Policy</Text>
        <View style={styles.modeButtons}>
          {(['30days', '1year', 'unlimited'] as const).map(retention => (
            <TouchableOpacity key={retention} style={[styles.modeButton, environment.retention === retention && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, retention }))}>
              <Text style={[styles.modeButtonText, environment.retention === retention && { color: '#FFFFFF' }]}>{retention === 'unlimited' ? 'Unlimited' : retention}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Storage Options</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Compression</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Compress old memories</Text></View>
            <Switch value={environment.compression} onValueChange={(value) => setEnvironment(prev => ({ ...prev, compression: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.compression ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Encryption</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Encrypt stored data</Text></View>
            <Switch value={environment.encryption} onValueChange={(value) => setEnvironment(prev => ({ ...prev, encryption: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.encryption ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Memory environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Memory Options</Text>
        {[{ key: 'enableLongTerm', label: 'Long-term Memory', desc: 'Persistent storage' }, { key: 'enablePatternLearning', label: 'Pattern Learning', desc: 'Learn from patterns' }, { key: 'enableContextRetention', label: 'Context Retention', desc: 'Keep session context' }, { key: 'enableCustomerInsights', label: 'Customer Insights', desc: 'Store customer data' }, { key: 'enableProcessOptimization', label: 'Process Optimization', desc: 'Learn workflows' }, { key: 'enableAutoCleanup', label: 'Auto Cleanup', desc: 'Remove old data' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L5</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Memory</Text></TouchableOpacity>
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
    backgroundColor: '#2F4F7F' 
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
    color: '#FFFFFF', 
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
    backgroundColor: '#2F4F7F' 
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
    backgroundColor: '#FFFFFF', 
    borderBottomLeftRadius: 3, 
    borderBottomRightRadius: 3 
  }, 
  tabLabel: { 
    fontSize: 11, 
    color: 'rgba(255,255,255,0.6)', 
    marginTop: 4 
  }, 
  tabLabelActive: { 
    color: '#FFFFFF', 
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
    backgroundColor: '#2F4F7F' 
  }, 
  statHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    alignItems: 'center' 
  }, 
  statTrend: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: '#10B981' 
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
    color: '#FFFFFF' 
  }, 
  memCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#2F4F7F' 
  }, 
  memRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10 
  }, 
  memInfo: { 
    flex: 1, 
    marginRight: 16 
  }, 
  memType: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#FFFFFF' 
  }, 
  memBar: { 
    height: 6, 
    borderRadius: 3, 
    overflow: 'hidden', 
    backgroundColor: '#1F2937' 
  }, 
  memProgress: { 
    height: '100%', 
    borderRadius: 3, 
    backgroundColor: '#10B981' 
  }, 
  memStats: { 
    alignItems: 'flex-end' 
  }, 
  memSize: { 
    fontSize: 12, 
    fontWeight: '500', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  }, 
  memHit: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#10B981' 
  }, 
  section: { 
    marginBottom: 20 
  }, 
  sectionTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#2F4F7F' 
  }, 
  healthCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#2F4F7F' 
  }, 
  healthRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 8 
  }, 
  healthLabel: { 
    fontSize: 14, 
    color: '#FFFFFF' 
  }, 
  healthValue: { 
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
    backgroundColor: '#2F4F7F' 
  }, 
  featureText: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: '#FFFFFF' 
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
    backgroundColor: '#2F4F7F' 
  }, 
  componentIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12, 
    backgroundColor: '#1F2937' 
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
    color: '#FFFFFF' 
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
    color: '#2F4F7F' 
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
    backgroundColor: '#2F4F7F' 
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
    color: '#FFFFFF' 
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
    color: '#2F4F7F' 
  }, 
  optionCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10, 
    backgroundColor: '#2F4F7F' 
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
    color: '#FFFFFF' 
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
    backgroundColor: '#2F4F7F' 
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
    color: '#FFFFFF' 
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

export default LayerMemory;
