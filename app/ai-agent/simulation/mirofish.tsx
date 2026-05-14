import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import MassiveSimulationViz, { 
  VizModeSelector, 
  AgentScaleSelector 
} from '@/components/ai-agent/MassiveSimulationViz';

const { width } = Dimensions.get('window');

type VizMode = 'central-hub' | 'hierarchical' | 'dense-field' | 'particle-swarm';
type ComplexityLevel = 'simple' | 'medium' | 'complex';

interface ComplexityOption {
  level: ComplexityLevel;
  label: string;
  description: string;
  minAgents: number;
  maxAgents: number;
  icon: string;
  color: string;
  useCases: string[];
}

const COMPLEXITY_OPTIONS: ComplexityOption[] = [
  {
    level: 'simple',
    label: 'Simple',
    description: 'Quick tests & basic scenarios',
    minAgents: 100,
    maxAgents: 1000,
    icon: 'Zap',
    color: '#10B981',
    useCases: ['Customer queries', 'Basic workflows', 'Single task testing'],
  },
  {
    level: 'medium',
    label: 'Medium',
    description: 'Business processes & team simulations',
    minAgents: 1000,
    maxAgents: 10000,
    icon: 'Layers',
    color: '#F59E0B',
    useCases: ['Department workflows', 'Multi-team scenarios', 'Customer journey mapping'],
  },
  {
    level: 'complex',
    label: 'Complex',
    description: 'Enterprise-scale stress testing',
    minAgents: 10000,
    maxAgents: 100000,
    icon: 'Cpu',
    color: '#8B5CF6',
    useCases: ['Market crash simulation', 'Full enterprise digital twins', 'Risk modeling'],
  },
];

interface SimulationStats {
  activeAgents: number;
  messagesPerSecond: number;
  cpuUtilization: number;
  memoryUsage: number;
  scenariosCompleted: number;
  successRate: number;
}

const AGENT_GROUPS = [
  { id: 'motor', name: 'MOTOR CORTEX', color: '#FF6B6B', count: 250000, firingRate: 0.45 },
  { id: 'concept', name: 'CONCEPT LAYER', color: '#4ECDC4', count: 180000, firingRate: 0.32 },
  { id: 'presidential', name: 'PRESIDENTIAL', color: '#9B59B6', count: 200000, firingRate: 1.85 },
  { id: 'sensory', name: 'SENSORY', color: '#3498DB', count: 320000, firingRate: 0.58 },
  { id: 'memory', name: 'MEMORY', color: '#F39C12', count: 150000, firingRate: 0.25 },
  { id: 'emotion', name: 'EMOTION', color: '#E74C3C', count: 120000, firingRate: 0.67 },
];

export default function MiroFishEngine() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [vizMode, setVizMode] = useState<VizMode>('central-hub');
  const [complexity, setComplexity] = useState<ComplexityLevel>('medium');
  const [agentCount, setAgentCount] = useState(1000);
  const [activeTab, setActiveTab] = useState<'visualization' | 'scenarios' | 'metrics'>('visualization');
  
  const [options, setOptions] = useState({
    enableDigitalTwins: true,
    enableStressTesting: true,
    enableRiskAnalysis: true,
    enableABTesting: true,
    enableChaosEngineering: false,
    enableRealtimeMetrics: true,
  });

  const [stats, setStats] = useState<SimulationStats>({
    activeAgents: 0,
    messagesPerSecond: 0,
    cpuUtilization: 0,
    memoryUsage: 0,
    scenariosCompleted: 0,
    successRate: 0,
  });

  const toggleSimulation = useCallback(() => {
    if (simulationRunning) {
      setSimulationRunning(false);
      setStats(prev => ({ ...prev, activeAgents: 0, messagesPerSecond: 0 }));
    } else {
      setSimulationRunning(true);
      setStats(prev => ({ 
        ...prev, 
        activeAgents: agentCount,
        messagesPerSecond: Math.floor(agentCount * 0.1),
        cpuUtilization: 45,
        memoryUsage: 32,
      }));
    }
  }, [simulationRunning, agentCount]);

  const runScenario = useCallback((scenarioName: string) => {
    setSimulationRunning(true);
    setStats(prev => ({
      ...prev,
      activeAgents: agentCount,
      scenariosCompleted: prev.scenariosCompleted + 1,
      successRate: Math.min(99, prev.successRate + Math.random() * 5),
    }));
  }, [agentCount]);

  const currentComplexity = COMPLEXITY_OPTIONS.find(c => c.level === complexity)!;
  
  const handleComplexityChange = (level: ComplexityLevel) => {
    setComplexity(level);
    const opt = COMPLEXITY_OPTIONS.find(c => c.level === level);
    if (opt) {
      // Set agent count to middle of range
      setAgentCount(Math.floor((opt.minAgents + opt.maxAgents) / 2));
    }
  };

  const renderComplexitySelector = () => (
    <View style={styles.complexityContainer}>
      {COMPLEXITY_OPTIONS.map((opt) => {
        const isActive = complexity === opt.level;
        const IconComponent = Icons[opt.icon as keyof typeof Icons] || Icons.Zap;
        
        return (
          <TouchableOpacity
            key={opt.level}
            style={[
              styles.complexityOption,
              { backgroundColor: isActive ? opt.color + '20' : colors.card },
              isActive && { borderColor: opt.color, borderWidth: 2 },
            ]}
            onPress={() => handleComplexityChange(opt.level)}
          >
            <View style={[styles.complexityIconContainer, { backgroundColor: opt.color + '20' }]}>
              <IconComponent size={20} color={opt.color} />
            </View>
            <View style={styles.complexityInfo}>
              <Text style={[styles.complexityLabel, { color: isActive ? opt.color : colors.text }]}>
                {opt.label}
              </Text>
              <Text style={[styles.complexityRange, { color: colors.textSecondary }]}>
                {opt.minAgents >= 1000 ? `${(opt.minAgents / 1000).toFixed(0)}K` : opt.minAgents} - {opt.maxAgents >= 1000 ? `${(opt.maxAgents / 1000).toFixed(0)}K` : opt.maxAgents}
              </Text>
              <Text style={[styles.complexityDescription, { color: colors.textSecondary }]}>
                {opt.description}
              </Text>
            </View>
            {isActive && (
              <View style={[styles.complexityCheck, { backgroundColor: opt.color }]}>
                <Icons.Check size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
      
      {/* Use Cases for selected complexity */}
      <View style={[styles.useCasesContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.useCasesTitle, { color: colors.text }]}>Best Use Cases</Text>
        <View style={styles.useCasesList}>
          {currentComplexity.useCases.map((useCase, idx) => (
            <View key={idx} style={styles.useCaseItem}>
              <Icons.ChevronRight size={14} color={currentComplexity.color} />
              <Text style={[styles.useCaseText, { color: colors.textSecondary }]}>{useCase}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderVisualizationTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.controlsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulation Complexity</Text>
        {renderComplexitySelector()}
        
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>Visualization Mode</Text>
        <VizModeSelector currentMode={vizMode} onChange={setVizMode} />
      </View>

      <View style={styles.vizCard}>
        <MassiveSimulationViz
          simulationRunning={simulationRunning}
          mode={vizMode}
          agentCount={agentCount}
          groups={AGENT_GROUPS}
        />
      </View>

      <View style={styles.controlButtons}>
        <TouchableOpacity
          style={[styles.controlButton, simulationRunning && styles.controlButtonActive]}
          onPress={toggleSimulation}
        >
          <Icons.Play size={20} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>
            {simulationRunning ? 'Pause Simulation' : 'Start Simulation'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.card }]}
          onPress={() => setSimulationRunning(false)}
        >
          <Icons.Square size={20} color={colors.text} />
          <Text style={[styles.controlButtonText, { color: colors.text }]}>Stop</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Icons.Users size={20} color="#8B5CF6" />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.activeAgents >= 1000000 
              ? `${(stats.activeAgents / 1000000).toFixed(1)}M` 
              : stats.activeAgents >= 1000 
                ? `${(stats.activeAgents / 1000).toFixed(0)}K` 
                : stats.activeAgents}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Agents</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Icons.Activity size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.messagesPerSecond >= 1000 
              ? `${(stats.messagesPerSecond / 1000).toFixed(1)}K` 
              : stats.messagesPerSecond}/s
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Messages</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Icons.Cpu size={20} color="#F59E0B" />
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.cpuUtilization}%</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>CPU Usage</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Icons.Database size={20} color="#6366F1" />
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.memoryUsage}GB</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Memory</Text>
        </View>
      </View>
    </View>
  );

  const renderScenariosTab = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Pre-Built Scenarios</Text>
      
      {[
        { name: 'Market Crash', desc: 'Simulate 2008-level market collapse with 1M trading agents', icon: Icons.TrendingDown, color: '#EF4444', duration: '5m' },
        { name: 'Viral Outbreak', desc: 'Test pandemic response with healthcare agent swarm', icon: Icons.Biohazard, color: '#F59E0B', duration: '8m' },
        { name: 'Cyber Attack', desc: 'DDoS and breach simulation with security agents', icon: Icons.ShieldAlert, color: '#DC2626', duration: '3m' },
        { name: 'Supply Collapse', desc: 'Global supply chain disruption scenario', icon: Icons.Truck, color: '#3B82F6', duration: '6m' },
        { name: 'Rapid Scaling', desc: '10x agent spawn rate stress test', icon: Icons.Zap, color: '#10B981', duration: '4m' },
        { name: 'Cascading Failure', desc: 'Multi-system failure propagation test', icon: Icons.AlertTriangle, color: '#7C3AED', duration: '7m' },
      ].map((scenario, idx) => (
        <TouchableOpacity 
          key={idx} 
          style={[styles.scenarioCard, { backgroundColor: colors.card }]}
          onPress={() => runScenario(scenario.name)}
        >
          <View style={[styles.scenarioIcon, { backgroundColor: scenario.color + '20' }]}>
            <scenario.icon size={24} color={scenario.color} />
          </View>
          <View style={styles.scenarioContent}>
            <View style={styles.scenarioHeader}>
              <Text style={[styles.scenarioName, { color: colors.text }]}>{scenario.name}</Text>
              <View style={styles.durationBadge}>
                <Icons.Clock size={12} color="#9CA3AF" />
                <Text style={styles.durationText}>{scenario.duration}</Text>
              </View>
            </View>
            <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]} numberOfLines={2}>
              {scenario.desc}
            </Text>
          </View>
          <Icons.Play size={20} color="#8B5CF6" />
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Custom Parameters</Text>
      
      {[
        { key: 'enableDigitalTwins', label: 'Digital Twins', desc: 'Create virtual replicas of real entities' },
        { key: 'enableStressTesting', label: 'Stress Testing', desc: 'Push systems beyond normal limits' },
        { key: 'enableRiskAnalysis', label: 'Risk Analysis', desc: 'Calculate potential failure points' },
        { key: 'enableABTesting', label: 'A/B Testing', desc: 'Compare different agent strategies' },
        { key: 'enableChaosEngineering', label: 'Chaos Engineering', desc: 'Introduce random failures' },
        { key: 'enableRealtimeMetrics', label: 'Real-time Metrics', desc: 'Live performance monitoring' },
      ].map((opt) => (
        <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
          <View style={styles.optionRow}>
            <View style={styles.optionInfo}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
              <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
            </View>
            <Switch
              value={options[opt.key as keyof typeof options]}
              onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
              trackColor={{ false: colors.border, true: '#8B5CF680' }}
              thumbColor={options[opt.key as keyof typeof options] ? '#8B5CF6' : '#f4f3f4'}
            />
          </View>
        </View>
      ))}
    </View>
  );

  const renderMetricsTab = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent Group Distribution</Text>
      
      <View style={[styles.groupsCard, { backgroundColor: colors.card }]}>
        {AGENT_GROUPS.map((group, idx) => (
          <View key={idx} style={styles.groupRow}>
            <View style={styles.groupHeader}>
              <View style={[styles.groupDot, { backgroundColor: group.color }]} />
              <Text style={[styles.groupName, { color: colors.text }]}>{group.name}</Text>
            </View>
            <View style={styles.groupStats}>
              <Text style={[styles.groupCount, { color: colors.textSecondary }]}>
                {(group.count / 1000).toFixed(0)}K agents
              </Text>
              <View style={styles.firingRate}>
                <Icons.Activity size={12} color={group.color} />
                <Text style={[styles.firingText, { color: group.color }]}>
                  {group.firingRate.toFixed(2)} Hz
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: group.color, 
                    width: `${(group.count / 320000) * 100}%` 
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Performance Metrics</Text>
      
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <Icons.CheckCircle size={20} color="#10B981" />
          <Text style={[styles.metricValue, { color: colors.text }]}>{stats.successRate.toFixed(1)}%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Success Rate</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <Icons.FileCheck size={20} color="#6366F1" />
          <Text style={[styles.metricValue, { color: colors.text }]}>{stats.scenariosCompleted}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Scenarios</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <Icons.Clock size={20} color="#F59E0B" />
          <Text style={[styles.metricValue, { color: colors.text }]}>2.4s</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Avg Latency</Text>
        </View>
        
        <View style={[styles.metricCard, { backgroundColor: colors.card }]}>
          <Icons.Network size={20} color="#EC4899" />
          <Text style={[styles.metricValue, { color: colors.text }]}>99.9%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Uptime</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>MiroFish Engine</Text>
            <Text style={styles.headerSubtitle}>Massive-Scale Agent Simulation</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Icons.Settings size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerDescription}>
          Run 100 to 1M virtual agents in real-time simulation environments. Test scenarios, predict outcomes, and validate decisions before real-world execution.
        </Text>
        
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Icons.Users size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>100 - 1M Agents</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Zap size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>Real-time</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Shield size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>Risk-free</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[
          { key: 'visualization', label: 'Visualization', icon: Icons.Eye },
          { key: 'scenarios', label: 'Scenarios', icon: Icons.TestTube },
          { key: 'metrics', label: 'Metrics', icon: Icons.BarChart3 },
        ].map((tab) => (
          <TouchableOpacity 
            key={tab.key} 
            style={[styles.tab, activeTab === tab.key && styles.tabActive]} 
            onPress={() => setActiveTab(tab.key as any)}
          >
            {activeTab === tab.key && <View style={styles.tabIndicator} />}
            <tab.icon size={18} color={activeTab === tab.key ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'visualization' && renderVisualizationTab()}
        {activeTab === 'scenarios' && renderScenariosTab()}
        {activeTab === 'metrics' && renderMetricsTab()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    padding: 16, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24 
  },
  headerTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  backButton: { padding: 8, marginRight: 8 },
  headerTitleContainer: { flex: 1 },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.7)', 
    marginTop: 2 
  },
  settingsButton: { padding: 8 },
  headerDescription: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.85)', 
    lineHeight: 20, 
    marginBottom: 12 
  },
  headerStats: { 
    flexDirection: 'row', 
    gap: 16 
  },
  headerStat: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  headerStatText: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)' 
  },
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 8 
  },
  tab: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 10, 
    borderRadius: 12, 
    backgroundColor: 'rgba(139,92,246,0.1)', 
    position: 'relative' 
  },
  tabActive: { 
    backgroundColor: 'rgba(139,92,246,0.2)' 
  },
  tabIndicator: { 
    position: 'absolute', 
    top: 0, 
    left: '25%', 
    right: '25%', 
    height: 3, 
    backgroundColor: '#8B5CF6', 
    borderBottomLeftRadius: 3, 
    borderBottomRightRadius: 3 
  },
  tabLabel: { 
    fontSize: 12, 
    color: '#9CA3AF', 
    marginTop: 4, 
    fontWeight: '500' 
  },
  tabLabelActive: { 
    color: '#8B5CF6', 
    fontWeight: '600' 
  },
  content: { flex: 1 },
  tabContent: { padding: 16 },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 12 
  },
  controlsContainer: { marginBottom: 16 },
  vizCard: { 
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 16,
  },
  controlButtons: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 20 
  },
  controlButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    backgroundColor: '#8B5CF6', 
    paddingVertical: 14, 
    borderRadius: 12 
  },
  controlButtonActive: { 
    backgroundColor: '#10B981' 
  },
  controlButtonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  complexityContainer: {
    gap: 10,
    marginTop: 8,
  },
  complexityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  complexityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  complexityInfo: {
    flex: 1,
  },
  complexityLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  complexityRange: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  complexityDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  complexityCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  useCasesContainer: {
    padding: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  useCasesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  useCasesList: {
    gap: 8,
  },
  useCaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  useCaseText: {
    fontSize: 13,
  },
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  statCard: { 
    width: (width - 42) / 2, 
    padding: 16, 
    borderRadius: 14, 
    alignItems: 'center' 
  },
  statValue: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginTop: 8 
  },
  statLabel: { 
    fontSize: 12, 
    marginTop: 4 
  },
  scenarioCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    borderRadius: 14, 
    marginBottom: 10,
    gap: 12,
  },
  scenarioIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  scenarioContent: { flex: 1 },
  scenarioHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scenarioName: { 
    fontSize: 15, 
    fontWeight: '600' 
  },
  durationBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  durationText: { 
    fontSize: 11, 
    color: '#9CA3AF' 
  },
  scenarioDesc: { 
    fontSize: 13, 
    lineHeight: 18 
  },
  optionCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10 
  },
  optionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  optionInfo: { flex: 1 },
  optionLabel: { 
    fontSize: 15, 
    fontWeight: '600', 
    marginBottom: 2 
  },
  optionDesc: { 
    fontSize: 13 
  },
  groupsCard: { 
    padding: 16, 
    borderRadius: 16 
  },
  groupRow: { 
    marginBottom: 16 
  },
  groupHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 8 
  },
  groupDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5 
  },
  groupName: { 
    fontSize: 14, 
    fontWeight: '600' 
  },
  groupStats: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  groupCount: { 
    fontSize: 13 
  },
  firingRate: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  firingText: { 
    fontSize: 12, 
    fontWeight: '600' 
  },
  progressBar: { 
    height: 4, 
    backgroundColor: 'rgba(139,92,246,0.1)', 
    borderRadius: 2 
  },
  progressFill: { 
    height: 4, 
    borderRadius: 2 
  },
  metricsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  metricCard: { 
    width: (width - 42) / 2, 
    padding: 16, 
    borderRadius: 14, 
    alignItems: 'center' 
  },
  metricValue: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginTop: 8 
  },
  metricLabel: { 
    fontSize: 12, 
    marginTop: 4 
  },
});
