import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'intelligence',
  layerNumber: 4,
  name: 'Intelligence',
  description: 'Analyze data, predict trends, detect anomalies, and provide actionable insights. This layer uses advanced AI to turn raw data into strategic intelligence.',
  color: '#06B6D4',
  gradient: ['#06B6D4', '#0891B2'] as [string, string],
  agentCount: 36,
  tokenUsage: 500,
  optimizedTokenUsage: 150,
  workType: 'Analysis',
  flow: 'Predict',
  features: ['Predictive Analytics', 'Sentiment Analysis', 'Anomaly Detection', 'Trend Forecasting', 'Risk Assessment', 'Competitive Intelligence'],
  components: [
    { id: 'predictive-engine', name: 'Predictive Engine', description: 'Demand, churn, revenue forecasting', icon: 'TrendingUp', route: '/ai-agent/intelligence/predictive' },
    { id: 'demand-predictor', name: 'Demand Predictor', description: 'Forecast product demand', icon: 'BarChart3', route: '/ai-agent/intelligence/demand' },
    { id: 'churn-predictor', name: 'Churn Predictor', description: 'Predict customer churn', icon: 'Users', route: '/ai-agent/intelligence/churn' },
    { id: 'revenue-forecaster', name: 'Revenue Forecaster', description: 'Predict revenue trends', icon: 'TrendingUp', route: '/ai-agent/intelligence/revenue' },
    { id: 'sentiment-core', name: 'Sentiment Core', description: 'Emotion detection and CSAT analysis', icon: 'Brain', route: '/ai-agent/intelligence/sentiment' },
    { id: 'emotion-detection', name: 'Emotion Detection', description: 'Analyze customer emotions', icon: 'Lightbulb', route: '/ai-agent/intelligence/emotion' },
    { id: 'anomaly-detector', name: 'Anomaly Detector', description: 'Fraud, security, risk detection', icon: 'AlertTriangle', route: '/ai-agent/intelligence/anomaly' },
    { id: 'fraud-detector', name: 'Fraud Detector', description: 'Detect fraudulent activities', icon: 'Shield', route: '/ai-agent/intelligence/fraud' },
    { id: 'security-analyzer', name: 'Security Analyzer', description: 'Identify security threats', icon: 'Shield', route: '/ai-agent/intelligence/security' },
    { id: 'risk-analyzer', name: 'Risk Analyzer', description: 'Analyze operational risks', icon: 'AlertTriangle', route: '/ai-agent/intelligence/risk' },
    { id: 'market-intelligence', name: 'Market Intelligence', description: 'Competitive analysis', icon: 'Binoculars', route: '/ai-agent/intelligence/market' },
  ],
};

const iconMap: Record<string, any> = { TrendingUp: Icons.TrendingUp, BarChart3: Icons.BarChart3, Users: Icons.Users, Brain: Icons.Brain, Lightbulb: Icons.Lightbulb, AlertTriangle: Icons.AlertTriangle, Shield: Icons.Shield, Binoculars: Icons.Binoculars };

const LayerIntelligence = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'balanced', refreshRate: 'realtime', dataSources: 'all', aiModel: 'advanced' });
  const [options, setOptions] = useState({ enablePredictions: true, enableSentiment: true, enableAnomaly: true, enableTrends: true, enableRisk: true, enableCompetitive: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Insights Generated', value: '3.2K', icon: Icons.Lightbulb, color: '#06B6D4', trend: '+420' },
    { label: 'Predictions', value: '892', icon: Icons.TrendingUp, color: '#10B981', trend: '+156' },
    { label: 'Anomalies Found', value: '47', icon: Icons.AlertTriangle, color: '#EF4444', trend: '-12' },
    { label: 'Accuracy', value: '96.8%', icon: Icons.CheckCircle, color: '#6366F1', trend: '+1.2%' },
  ], []);

  const insightMetrics = useMemo(() => [
    { type: 'Demand Forecast', confidence: 96, predictions: 234 },
    { type: 'Churn Prediction', confidence: 94, predictions: 156 },
    { type: 'Revenue Forecast', confidence: 92, predictions: 189 },
    { type: 'Sentiment Analysis', confidence: 89, predictions: 312 },
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Prediction Models</Text>
        <View style={[styles.insightCard, { backgroundColor: colors.card }]}>
          {insightMetrics.map((item, idx) => (
            <View key={idx} style={styles.insightRow}>
              <View style={styles.insightInfo}>
                <Text style={[styles.insightType, { color: colors.text }]}>{item.type}</Text>
                <View style={[styles.insightBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.insightProgress, { width: `${item.confidence}%`, backgroundColor: '#06B6D4' }]} />
                </View>
              </View>
              <View style={styles.insightStats}>
                <Text style={[styles.insightPred, { color: colors.text }]}>{item.predictions}</Text>
                <Text style={[styles.insightConf, { color: item.confidence >= 90 ? '#10B981' : '#F59E0B' }]}>{item.confidence}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Insights</Text>
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.insightCard, { backgroundColor: colors.card }]}>
            <View style={[styles.insightIcon, { backgroundColor: layerData.color + '20' }]}><Icons.Lightbulb size={18} color={layerData.color} /></View>
            <View style={styles.insightContent}><Text style={[styles.insightTitle, { color: colors.text }]}>Market Trend Detected</Text><Text style={[styles.insightDesc, { color: colors.textSecondary }]}>Customer demand shifting toward premium products</Text></View>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#06B6D4" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search intelligence..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Intelligence Mode</Text>
        <View style={styles.modeButtons}>
          {(['basic', 'balanced', 'advanced'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Refresh Rate</Text>
        <View style={styles.modeButtons}>
          {(['hourly', 'realtime', 'streaming'] as const).map(rate => (
            <TouchableOpacity key={rate} style={[styles.modeButton, environment.refreshRate === rate && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, refreshRate: rate }))}>
              <Text style={[styles.modeButtonText, environment.refreshRate === rate && { color: '#FFFFFF' }]}>{rate.charAt(0).toUpperCase() + rate.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Intelligence environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Intelligence Options</Text>
        {[{ key: 'enablePredictions', label: 'Predictive Analytics', desc: 'Forecast future trends' }, { key: 'enableSentiment', label: 'Sentiment Analysis', desc: 'Analyze customer emotions' }, { key: 'enableAnomaly', label: 'Anomaly Detection', desc: 'Find unusual patterns' }, { key: 'enableTrends', label: 'Trend Forecasting', desc: 'Track market trends' }, { key: 'enableRisk', label: 'Risk Assessment', desc: 'Evaluate risks' }, { key: 'enableCompetitive', label: 'Competitive Intel', desc: 'Monitor competitors' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L4</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Analyzer</Text></TouchableOpacity>
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
    backgroundColor: '#2F343A'
  }, 
  headerTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    justifyContent: 'space-between'
  }, 
  backButton: { 
    padding: 8, 
    marginRight: 8, 
    backgroundColor: '#1F2937', 
    borderRadius: 10
  }, 
  headerTitleContainer: { 
    flex: 1, 
    justifyContent: 'center'
  }, 
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8
  }, 
  layerNumber: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#06B6D4', 
    backgroundColor: 'rgba(6,182,212,0.1)', 
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
    padding: 8, 
    backgroundColor: '#1F2937', 
    borderRadius: 10
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
    backgroundColor: '#2F343A'
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
    backgroundColor: '#06B6D4', 
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
    color: 'rgba(255,255,255,0.7)'
  }, 
  insightCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#1F2937'
  }, 
  insightRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10
  }, 
  insightInfo: { 
    flex: 1, 
    marginRight: 16
  }, 
  insightType: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#FFFFFF'
  }, 
  insightBar: { 
    height: 6, 
    borderRadius: 3, 
    overflow: 'hidden', 
    backgroundColor: '#2F343A'
  }, 
  insightProgress: { 
    height: '100%', 
    borderRadius: 3, 
    backgroundColor: '#06B6D4'
  }, 
  insightStats: { 
    alignItems: 'flex-end'
  }, 
  insightPred: { 
    fontSize: 12, 
    fontWeight: '500', 
    marginBottom: 2, 
    color: '#FFFFFF'
  }, 
  insightConf: { 
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
    color: '#FFFFFF'
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
    backgroundColor: '#1F2937'
  }, 
  componentIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12, 
    backgroundColor: '#2F343A'
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
    borderTopRightRadius: 24, 
    backgroundColor: '#2F343A'
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
    gap: 8, 
    backgroundColor: '#06B6D4'
  }, 
  modalActionText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#FFFFFF'
  },
});

export default LayerIntelligence;
