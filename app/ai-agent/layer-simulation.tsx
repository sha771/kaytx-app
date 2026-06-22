import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import MassiveSimulationViz from '@/components/ai-agent/MassiveSimulationViz';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'simulation',
  layerNumber: 3,
  name: 'Simulation',
  description: 'Test scenarios BEFORE execution using digital twins and multi-agent simulations. Predict outcomes and make risk-free decisions with comprehensive testing environments.',
  color: '#8B5CF6',
  gradient: ['#8B5CF6', '#7C3AED'] as [string, string],
  agentCount: 12,
  tokenUsage: 800,
  optimizedTokenUsage: 200,
  workType: 'Testing',
  flow: 'Test',
  features: ['Multi-Agent Simulations', 'Digital Twin Technology', 'Scenario Stress-Testing', 'Real-Time Decision Testing', 'Market Digital Twin', 'Crisis Simulator'],
  components: [
    { id: 'mirofish-engine', name: 'MiroFish Engine', description: '10K-1M virtual agent simulations', icon: 'Microscope', route: '/ai-agent/simulation/mirofish' },
    { id: 'digital-twin-core', name: 'Digital Twin Core', description: 'Customer, Employee, Business twins', icon: 'Layers', route: '/ai-agent/simulation/digital-twin' },
    { id: 'customer-twin', name: 'Customer Digital Twins', description: 'Virtual customer profiles for testing', icon: 'Users', route: '/ai-agent/simulation/customer-twin' },
    { id: 'employee-twin', name: 'Employee Digital Twins', description: 'Virtual employee simulations', icon: 'Bot', route: '/ai-agent/simulation/employee-twin' },
    { id: 'business-twin', name: 'Business Process Twins', description: 'Process simulation environments', icon: 'Workflow', route: '/ai-agent/simulation/business-twin' },
    { id: 'scenario-lab', name: 'Scenario Lab', description: 'Stress testing and risk simulation', icon: 'Binoculars', route: '/ai-agent/simulation/scenario-lab' },
    { id: 'stress-testing', name: 'Stress Testing Suite', description: 'Test extreme scenarios', icon: 'AlertTriangle', route: '/ai-agent/simulation/stress-testing' },
    { id: 'risk-simulation', name: 'Risk Simulation Engine', description: 'Simulate operational risks', icon: 'TrendingUp', route: '/ai-agent/simulation/risk-simulation' },
    { id: 'opportunity-explorer', name: 'Opportunity Explorer', description: 'Find new market opportunities', icon: 'Search', route: '/ai-agent/simulation/opportunity' },
    { id: 'decision-validation', name: 'Decision Validation', description: 'A/B testing and ROI forecasting', icon: 'CheckCircle', route: '/ai-agent/simulation/decision-validation' },
    { id: 'ab-test-simulator', name: 'A/B Test Simulator', description: 'Virtual A/B testing', icon: 'Play', route: '/ai-agent/simulation/ab-test' },
    { id: 'roi-forecaster', name: 'ROI Forecaster', description: 'Predict return on investment', icon: 'TrendingUp', route: '/ai-agent/simulation/roi-forecaster' },
  ],

};
const iconMap: Record<string, any> = { Microscope: Icons.Microscope, Layers: Icons.Layers, Users: Icons.Users, Bot: Icons.Bot, Workflow: Icons.Workflow, Binoculars: Icons.Binoculars, AlertTriangle: Icons.AlertTriangle, TrendingUp: Icons.TrendingUp, Search: Icons.Search, CheckCircle: Icons.CheckCircle, Play: Icons.Play };

const LayerSimulation = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'network' | 'overview' | 'components' | 'environment' | 'options'>('network');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [environment, setEnvironment] = useState({ mode: 'balanced', speed: 'realtime', agents: 1000, duration: 60 });
  const [options, setOptions] = useState({ enableDigitalTwins: true, enableStressTesting: true, enableRiskAnalysis: true, enableABTesting: true, enableROI: true, enableCrisisSim: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationRunning(false);
          Alert.alert('Complete', 'Simulation completed successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const stats = useMemo(() => [
    { label: 'Virtual Agents', value: '1M+', icon: Icons.Users, color: '#8B5CF6', trend: '+12%' },
    { label: 'Digital Twins', value: '500K', icon: Icons.Layers, color: '#6366F1', trend: '+8%' },
    { label: 'Scenarios Tested', value: '2,847', icon: Icons.Binoculars, color: '#F59E0B', trend: '+23%' },
    { label: 'Success Rate', value: '97.8%', icon: Icons.CheckCircle, color: '#10B981', trend: '+2%' },
  ], []);

  const simulationMetrics = useMemo(() => [
    { type: 'Customer Twin', active: 1240, success: 96, avgTime: '2.3s' },
    { type: 'Employee Twin', active: 856, success: 94, avgTime: '1.8s' },
    { type: 'Business Twin', active: 324, success: 92, avgTime: '3.1s' },
    { type: 'Market Twin', active: 180, success: 89, avgTime: '4.2s' },
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Simulation Types</Text>
        <View style={[styles.simCard, { backgroundColor: colors.card }]}>
          {simulationMetrics.map((sim, idx) => (
            <View key={idx} style={styles.simRow}>
              <View style={styles.simInfo}>
                <Text style={[styles.simType, { color: colors.text }]}>{sim.type}</Text>
                <View style={[styles.simBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.simProgress, { width: `${sim.success}%`, backgroundColor: '#8B5CF6' }]} />
                </View>
              </View>
              <View style={styles.simStats}>
                <Text style={[styles.simActive, { color: colors.text }]}>{sim.active}</Text>
                <Text style={[styles.simSuccess, { color: sim.success >= 90 ? '#10B981' : '#F59E0B' }]}>{sim.success}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Run Simulation</Text>
        <View style={[styles.simulationCard, { backgroundColor: colors.card }]}>
          {simulationRunning && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${simulationProgress}%` }]} /></View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>{simulationProgress}%</Text>
            </View>
          )}
          <TouchableOpacity style={[styles.runButton, { backgroundColor: layerData.color }]} onPress={runSimulation} disabled={simulationRunning}>
            <Icons.Play size={20} color="#FFFFFF" />
            <Text style={styles.runButtonText}>{simulationRunning ? 'Running...' : 'Start New Simulation'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Massive-Scale Preview</Text>
        <View style={[styles.networkPreviewCard, { backgroundColor: colors.card }]}>
          <MassiveSimulationViz 
            simulationRunning={simulationRunning} 
            compact 
            mode="hierarchical"
            agentCount={1000}
          />
          <TouchableOpacity style={styles.networkPreviewButton} onPress={() => setActiveTab('network')}>
            <Text style={[styles.networkPreviewButtonText, { color: layerData.color }]}>Open Full Simulation View</Text>
            <Icons.ChevronRight size={16} color={layerData.color} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#8B5CF6" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search simulations..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Simulation Mode</Text>
        <View style={styles.modeButtons}>
          {(['conservative', 'balanced', 'aggressive'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Speed</Text>
        <View style={styles.modeButtons}>
          {(['slow', 'realtime', 'fast'] as const).map(speed => (
            <TouchableOpacity key={speed} style={[styles.modeButton, environment.speed === speed && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, speed }))}>
              <Text style={[styles.modeButtonText, environment.speed === speed && { color: '#FFFFFF' }]}>{speed.charAt(0).toUpperCase() + speed.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Simulation environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const [vizMode, setVizMode] = useState<'central-hub' | 'hierarchical' | 'dense-field' | 'particle-swarm'>('central-hub');
  const [complexity, setComplexity] = useState<'basic' | 'standard' | 'enterprise'>('standard');
  const [agentScale, setAgentScale] = useState(5000);

  const complexityOptions = [
    { level: 'basic', label: 'Basic', sublabel: '100-1000', min: 100, max: 1000, color: '#10B981', description: 'Small business & personal use' },
    { level: 'standard', label: 'Standard', sublabel: '1K-10K', min: 1000, max: 10000, color: '#F59E0B', description: 'Growing teams & customer base' },
    { level: 'enterprise', label: 'Enterprise', sublabel: '10K-100K', min: 10000, max: 100000, color: '#8B5CF6', description: 'Large scale operations' },
  ];

  const handleComplexityChange = (level: 'basic' | 'standard' | 'enterprise') => {
    setComplexity(level);
    const opt = complexityOptions.find(o => o.level === level);
    if (opt) {
      setAgentScale(Math.floor((opt.min + opt.max) / 2));
      Alert.alert(
        `${opt.label} Simulation Activated`,
        `Running simulation with ${opt.min}-${opt.max >= 1000 ? `${opt.max/1000}K` : opt.max} agents\n${opt.description}`,
        [{ text: 'OK' }]
      );
    }
  };

  const currentComplexity = complexityOptions.find(o => o.level === complexity)!;

  const renderNetwork = () => (
    <ScrollView style={styles.networkContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.networkHeader}>
        <Text style={[styles.networkTitle, { color: colors.text }]}>Massive-Scale Simulation</Text>
        <Text style={[styles.networkSubtitle, { color: colors.textSecondary }]}>
          100 - 1M virtual agents • {vizMode === 'central-hub' ? 'Central Hub' : vizMode === 'hierarchical' ? 'Hierarchical' : vizMode === 'dense-field' ? 'Dense Field' : 'Particle Swarm'} Mode
        </Text>
      </View>

      <View style={styles.vizControls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vizModeContainer}>
          {[
            { key: 'central-hub', label: 'Central', icon: Icons.CircleDot },
            { key: 'hierarchical', label: 'Hierarchy', icon: Icons.Network },
            { key: 'dense-field', label: 'Dense', icon: Icons.Grid3X3 },
            { key: 'particle-swarm', label: 'Swarm', icon: Icons.Sparkles },
          ].map((mode) => (
            <TouchableOpacity
              key={mode.key}
              style={[styles.vizModeButton, vizMode === mode.key && styles.vizModeButtonActive]}
              onPress={() => setVizMode(mode.key as any)}
            >
              <mode.icon size={16} color={vizMode === mode.key ? '#FFFFFF' : '#9CA3AF'} />
              <Text style={[styles.vizModeLabel, vizMode === mode.key && styles.vizModeLabelActive]}>
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Complexity Selector - 3 Options */}
        <View style={styles.complexitySelector}>
          <Text style={[styles.complexityLabel, { color: colors.textSecondary }]}>Select Complexity Level:</Text>
          <View style={styles.complexityButtons}>
            {complexityOptions.map((opt) => (
              <TouchableOpacity
                key={opt.level}
                style={[
                  styles.complexityButton,
                  complexity === opt.level && { backgroundColor: opt.color, borderColor: opt.color },
                ]}
                onPress={() => handleComplexityChange(opt.level as any)}
              >
                <Text style={[
                  styles.complexityButtonText,
                  { color: complexity === opt.level ? '#FFFFFF' : colors.text },
                ]}>
                  {opt.label}
                </Text>
                <Text style={[
                  styles.complexityRangeText,
                  { color: complexity === opt.level ? 'rgba(255,255,255,0.9)' : colors.textSecondary },
                ]}>
                  {opt.sublabel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.complexityDescription, { color: colors.textSecondary }]}>
            {complexityOptions.find(o => o.level === complexity)?.description}
          </Text>
        </View>

        {/* Quick Select - Auto-sets based on complexity tier */}
        <View style={styles.scaleSelector}>
          {complexityOptions.map((opt) => (
            <TouchableOpacity
              key={opt.level}
              style={[
                styles.scaleButton,
                complexity === opt.level && { backgroundColor: opt.color },
                agentScale >= opt.min && agentScale <= opt.max && complexity !== opt.level && styles.scaleButtonActive,
              ]}
              onPress={() => {
                setComplexity(opt.level as any);
                setAgentScale(Math.floor((opt.min + opt.max) / 2));
              }}
            >
              <Text style={[
                styles.scaleLabel, 
                (complexity === opt.level || (agentScale >= opt.min && agentScale <= opt.max)) && styles.scaleLabelActive
              ]}>
                {opt.sublabel}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.scaleButton, { backgroundColor: '#6366F1' }]}
            onPress={() => setAgentScale(1000000)}
          >
            <Text style={[styles.scaleLabel, agentScale === 1000000 && styles.scaleLabelActive]}>1M</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MassiveSimulationViz 
        simulationRunning={simulationRunning} 
        mode={vizMode}
        agentCount={agentScale}
        compact={false}
      />

      <View style={styles.networkControls}>
        <TouchableOpacity
          style={[styles.networkControlButton, simulationRunning && styles.networkControlButtonActive]}
          onPress={runSimulation}
          disabled={simulationRunning}
        >
          <Icons.Play size={18} color="#FFFFFF" />
          <Text style={styles.networkControlText}>
            {simulationRunning ? 'Running...' : 'Start Simulation'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.networkControlButton, { backgroundColor: colors.card }]}
          onPress={() => setSimulationRunning(false)}
        >
          <Icons.Square size={18} color={colors.text} />
          <Text style={[styles.networkControlText, { color: colors.text }]}>Stop</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.networkMetrics}>
        <Text style={[styles.sectionTitle, { color: colors.text, marginHorizontal: 16 }]}>Simulation Metrics</Text>
        <View style={styles.metricsGrid}>
          {[
            { label: 'Virtual Agents', value: agentScale >= 1000000 ? '1M' : agentScale >= 1000 ? `${(agentScale / 1000).toFixed(0)}K` : String(agentScale), icon: Icons.Users, color: '#8B5CF6' },
            { label: 'Active Connections', value: simulationRunning ? `${(agentScale * 0.002).toFixed(0)}K` : '0', icon: Icons.Activity, color: '#6366F1' },
            { label: 'Simulations/sec', value: simulationRunning ? `${(agentScale * 0.01).toFixed(0)}K` : '0', icon: Icons.Zap, color: '#10B981' },
            { label: 'Mode', value: vizMode === 'central-hub' ? 'Central' : vizMode === 'hierarchical' ? 'Hierarchical' : vizMode === 'dense-field' ? 'Dense' : 'Swarm', icon: Icons.Eye, color: '#F59E0B' },
          ].map((metric, idx) => (
            <View key={idx} style={[styles.metricCard, { backgroundColor: colors.card }]}>
              <metric.icon size={20} color={metric.color} />
              <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{metric.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.networkScenarios}>
        <Text style={[styles.sectionTitle, { color: colors.text, marginHorizontal: 16 }]}>Quick Scenarios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scenariosList}>
          {[
            { name: 'Market Crash', desc: 'Stress test market conditions', icon: Icons.TrendingDown, color: '#EF4444' },
            { name: 'Rapid Growth', desc: 'Scale up 10x agents', icon: Icons.TrendingUp, color: '#10B981' },
            { name: 'Cyber Attack', desc: 'Security breach response', icon: Icons.ShieldAlert, color: '#F59E0B' },
            { name: 'Supply Chain', desc: 'Logistics disruption', icon: Icons.Truck, color: '#3B82F6' },
          ].map((scenario, idx) => (
            <TouchableOpacity key={idx} style={[styles.scenarioCard, { backgroundColor: colors.card }]}>
              <View style={[styles.scenarioIcon, { backgroundColor: scenario.color + '20' }]}>
                <scenario.icon size={22} color={scenario.color} />
              </View>
              <Text style={[styles.scenarioName, { color: colors.text }]}>{scenario.name}</Text>
              <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]} numberOfLines={2}>{scenario.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Simulation Options</Text>
        {[{ key: 'enableDigitalTwins', label: 'Digital Twins', desc: 'Virtual entity simulations' }, { key: 'enableStressTesting', label: 'Stress Testing', desc: 'Extreme scenario testing' }, { key: 'enableRiskAnalysis', label: 'Risk Analysis', desc: 'Risk assessment tools' }, { key: 'enableABTesting', label: 'A/B Testing', desc: 'Compare alternatives' }, { key: 'enableROI', label: 'ROI Forecasting', desc: 'Predict returns' }, { key: 'enableCrisisSim', label: 'Crisis Simulator', desc: 'Emergency scenarios' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L3</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
        {[{ key: 'network', label: 'Network', icon: Icons.Network }, { key: 'overview', label: 'Overview', icon: Icons.LayoutDashboard }, { key: 'components', label: 'Components', icon: Icons.Layers }, { key: 'environment', icon: Icons.Server, label: 'Environment' }, { key: 'options', label: 'Options', icon: Icons.Settings }].map(tab => (
          <TouchableOpacity key={tab.key} style={[styles.tab, activeTab === tab.key && styles.tabActive]} onPress={() => setActiveTab(tab.key as any)}>
            {activeTab === tab.key && <View style={styles.tabIndicator} />}
            <tab.icon size={18} color={activeTab === tab.key ? layerData.color : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'network' && renderNetwork()}
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Simulation</Text></TouchableOpacity>
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
  container: { flex: 1 },  header: { padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, backgroundColor: '#2F4F7F' }, headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, backButton: { padding: 8, marginRight: 8 }, headerTitleContainer: { flex: 1 }, headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, layerNumber: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }, headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, settingsButton: { padding: 8 }, headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18, marginBottom: 12 }, headerStats: { flexDirection: 'row', gap: 16 }, headerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 }, headerStatText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' }, tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, backgroundColor: '#2F4F7F' }, tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }, tabActive: { backgroundColor: 'rgba(255,255,255,0.15)' }, tabIndicator: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }, tabLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }, tabLabelActive: { color: '#FFFFFF', fontWeight: '600' }, content: { flex: 1, paddingHorizontal: 16 }, overviewContainer: { paddingVertical: 16 }, statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },  statCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  statTrend: { fontSize: 11, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 2 },
  simCard: { padding: 16, borderRadius: 12 },
  simRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  simInfo: { flex: 1, marginRight: 16 },
  simType: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  simBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  simProgress: { height: '100%', borderRadius: 3 },
  simStats: { alignItems: 'flex-end' },
  simActive: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  simSuccess: { fontSize: 12, fontWeight: '700' }, section: { marginBottom: 20 }, sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 }, simulationCard: { padding: 16, borderRadius: 12 }, progressContainer: { marginBottom: 12 }, progressBar: { height: 6, backgroundColor: '#374151', borderRadius: 3, overflow: 'hidden' }, progressFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 3 }, progressText: { fontSize: 12, marginTop: 4, textAlign: 'right' }, runButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 10, gap: 8 }, runButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' }, featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 }, featureText: { fontSize: 13, fontWeight: '500' }, componentsContainer: { paddingVertical: 16 }, searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2937', borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 }, searchInput: { flex: 1, fontSize: 14, marginLeft: 8 }, componentsList: { gap: 10 }, componentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 }, componentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, componentContent: { flex: 1 }, componentName: { fontSize: 15, fontWeight: '600', marginBottom: 2 }, componentDescription: { fontSize: 12 }, environmentContainer: { paddingVertical: 16 }, envSection: { marginBottom: 24 }, envTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, modeButtons: { flexDirection: 'row', gap: 8 }, modeButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' }, modeButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' }, optionsContainer: { paddingVertical: 16 }, optionsSection: { marginBottom: 24 }, optionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, optionCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, optionInfo: { flex: 1, marginRight: 12 }, optionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, optionDesc: { fontSize: 12 }, saveButton: { marginTop: 8, marginBottom: 32 }, saveButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, saveButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' }, modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }, modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }, modalHeader: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 }, modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, modalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }, modalCloseButton: { padding: 8 }, modalTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, modalBody: { padding: 20 }, modalDescription: { fontSize: 15, lineHeight: 22, marginBottom: 20 }, modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },  modalActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  networkContainer: { flex: 1 },
  networkHeader: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  networkTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  networkSubtitle: { fontSize: 13, lineHeight: 18 },
  networkControls: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 12, marginBottom: 20 },
  networkControlButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#8B5CF6', paddingVertical: 12, borderRadius: 12 },
  networkControlButtonActive: { backgroundColor: '#10B981' },
  networkControlText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  networkMetrics: { marginBottom: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginTop: 12 },
  metricCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' },
  metricValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  metricLabel: { fontSize: 11, marginTop: 2 },
  networkScenarios: { marginBottom: 24 },
  scenariosList: { paddingHorizontal: 16, gap: 10 },
  scenarioCard: { width: 140, padding: 14, borderRadius: 14, marginRight: 10 },
  scenarioIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  scenarioName: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  scenarioDesc: { fontSize: 11, lineHeight: 15 },
  networkPreviewCard: { borderRadius: 16, overflow: 'hidden', marginTop: 8 },
  networkPreviewButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  networkPreviewButtonText: { fontSize: 13, fontWeight: '600' },
  vizControls: { marginBottom: 16 },
  vizModeContainer: { flexDirection: 'row', gap: 8, paddingRight: 16 },
  complexitySelector: { marginTop: 12 },
  complexityLabel: { fontSize: 13, fontWeight: '500' },
  complexityButtons: { flexDirection: 'row', gap: 8, flex: 1 },
  complexityButton: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  complexityButtonText: { fontSize: 13, fontWeight: '600' },
  complexityRangeText: { fontSize: 10, marginTop: 2 },
  complexityDescription: { fontSize: 12, marginTop: 8, textAlign: 'center', fontStyle: 'italic' },
  vizModeButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 10, 
    backgroundColor: 'rgba(255,255,255,0.05)' 
  },
  vizModeButtonActive: { backgroundColor: '#8B5CF6' },
  vizModeLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  vizModeLabelActive: { color: '#FFFFFF', fontWeight: '600' },
  scaleSelector: { 
    flexDirection: 'row', 
    gap: 6, 
    marginTop: 12,
    flexWrap: 'wrap',
  },
  scaleButton: { 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 12,
    borderRadius: 8, 
    backgroundColor: 'rgba(255,255,255,0.05)',
    minWidth: 50,
  },
  scaleButtonActive: { backgroundColor: '#10B981' },
  scaleLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  scaleLabelActive: { color: '#FFFFFF' },
});

export default LayerSimulation;
