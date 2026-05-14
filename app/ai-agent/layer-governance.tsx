import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'governance',
  layerNumber: 1,
  name: 'Governance',
  description: 'Sets rules, ensures compliance, and manages ethical AI usage across the entire organization. This layer acts as the foundation for all AI operations, establishing policies, security protocols, and ethical guidelines.',
  color: '#6366F1',
  gradient: ['#6366F1', '#4F46E5'] as [string, string],
  agentCount: 28,
  tokenUsage: 0,
  optimizedTokenUsage: 0,
  workType: 'Security',
  flow: 'Rules',
  features: [
    'Policy Management',
    'Compliance Tracking',
    'Risk Assessment',
    'Audit Logging',
    'Ethical AI Oversight',
    'Security Enforcement',
  ],
  components: [
    { id: 'ethics-board', name: 'AI Ethics Board', description: 'Oversees ethical AI practices and decision-making', icon: 'Scale', route: '/ai-agent/governance/ethics' },
    { id: 'ciso-ai', name: 'CISO-AI', description: 'AI Security and threat protection', icon: 'Shield', route: '/ai-agent/governance/security' },
    { id: 'data-privacy', name: 'Data Privacy Council', description: 'Manages data privacy and compliance', icon: 'Shield', route: '/ai-agent/governance/privacy' },
    { id: 'compliance-monitor', name: 'Compliance Monitor', description: 'Real-time compliance tracking', icon: 'CheckCircle', route: '/ai-agent/governance/compliance' },
    { id: 'audit-trail', name: 'Audit Trail System', description: 'Complete activity logging and auditing', icon: 'FileText', route: '/ai-agent/governance/audit' },
    { id: 'policy-enforcer', name: 'Policy Enforcer', description: 'Automated policy enforcement', icon: 'AlertTriangle', route: '/ai-agent/governance/policy' },
    { id: 'risk-committee', name: 'AI Risk Committee', description: 'Enterprise risk assessment and mitigation', icon: 'AlertTriangle', route: '/ai-agent/governance/risk-committee' },
    { id: 'data-governance', name: 'Data Governance', description: 'Data quality and management', icon: 'Database', route: '/ai-agent/governance/data-governance' },
    { id: 'access-control', name: 'Access Control Manager', description: 'Role-based access management', icon: 'Lock', route: '/ai-agent/governance/access-control' },
    { id: 'threat-detection', name: 'Threat Detection AI', description: 'Real-time threat identification', icon: 'ShieldAlert', route: '/ai-agent/governance/threat-detection' },
    { id: 'incident-response', name: 'Incident Response Team', description: 'Security incident handling', icon: 'AlertTriangle', route: '/ai-agent/governance/incident-response' },
    { id: 'vulnerability-scanner', name: 'Vulnerability Scanner', description: 'Automated vulnerability detection', icon: 'ScanEye', route: '/ai-agent/governance/vulnerability' },
    { id: 'security-audit', name: 'Security Audit System', description: 'Regular security assessments', icon: 'FileCheck', route: '/ai-agent/governance/security-audit' },
    { id: 'encryption-manager', name: 'Encryption Manager', description: 'Data encryption at rest and transit', icon: 'Lock', route: '/ai-agent/governance/encryption' },
  ],
};

const iconMap: Record<string, any> = {
  Scale: Icons.Scale,
  Shield: Icons.Shield,
  CheckCircle: Icons.CheckCircle,
  FileText: Icons.FileText,
  AlertTriangle: Icons.AlertTriangle,
  Database: Icons.Database,
  Lock: Icons.Lock,
  ShieldAlert: Icons.ShieldAlert,
  ScanEye: Icons.ScanEye,
  FileCheck: Icons.FileCheck,
};

interface GovernanceEnvironment {
  mode: 'strict' | 'balanced' | 'flexible';
  autoEnforce: boolean;
  auditLevel: 'basic' | 'detailed' | 'comprehensive';
  complianceFramework: 'SOC2' | 'HIPAA' | 'GDPR' | 'PCI-DSS' | 'all';
  threatDetection: boolean;
  encryptionRequired: boolean;
  dataRetention: number;
}

const LayerGovernance = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [environment, setEnvironment] = useState<GovernanceEnvironment>({
    mode: 'balanced',
    autoEnforce: true,
    auditLevel: 'detailed',
    complianceFramework: 'all',
    threatDetection: true,
    encryptionRequired: true,
    dataRetention: 365,
  });

  const [options, setOptions] = useState({
    enableRealTimeMonitoring: true,
    enableAutoRemediation: true,
    enableThreatIntelligence: true,
    enableComplianceReports: true,
    enableAccessAuditing: true,
    enableDataClassification: true,
    enableEncryptionAtRest: true,
    enableEncryptionInTransit: true,
    enableMultiFactorAuth: true,
    enableSessionManagement: true,
    enableIpWhitelisting: false,
    enableGeographicRestrictions: false,
  });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Active Policies', value: '156', icon: Icons.FileText, color: '#6366F1', trend: '+12' },
    { label: 'Compliance Score', value: '98.5%', icon: Icons.CheckCircle, color: '#10B981', trend: '+2.3%' },
    { label: 'Active Threats', value: '0', icon: Icons.ShieldAlert, color: '#EF4444', trend: '-5' },
    { label: 'Audit Events', value: '12.4K', icon: Icons.Activity, color: '#F59E0B', trend: '+1.2K' },
  ], []);

  const complianceData = useMemo(() => [
    { framework: 'SOC2', score: 98, status: 'pass' },
    { framework: 'HIPAA', score: 96, status: 'pass' },
    { framework: 'GDPR', score: 94, status: 'pass' },
    { framework: 'PCI-DSS', score: 99, status: 'pass' },
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Compliance Overview</Text>
        <View style={[styles.complianceCard, { backgroundColor: colors.card }]}>
          {complianceData.map((item, idx) => (
            <View key={idx} style={styles.complianceRow}>
              <View style={styles.complianceInfo}>
                <Text style={[styles.complianceFramework, { color: colors.text }]}>{item.framework}</Text>
                <View style={[styles.complianceBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.complianceProgress, { width: `${item.score}%`, backgroundColor: item.score >= 95 ? '#10B981' : item.score >= 80 ? '#F59E0B' : '#EF4444' }]} />
                </View>
              </View>
              <View style={styles.complianceStatus}>
                <Text style={[styles.complianceScore, { color: item.score >= 95 ? '#10B981' : item.score >= 80 ? '#F59E0B' : '#EF4444' }]}>{item.score}%</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'pass' ? '#10B98120' : '#EF444420' }]}>
                  <Text style={[styles.statusBadgeText, { color: item.status === 'pass' ? '#10B981' : '#EF4444' }]}>{item.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Layer Status</Text>
        <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
          <View style={styles.statusRow}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.statusText, { color: colors.text }]}>Operational</Text>
            </View>
            <Text style={[styles.statusValue, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.statusDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Agents Running</Text>
            <Text style={[styles.statusValue, { color: colors.text }]}>{layerData.agentCount}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Token Usage</Text>
            <Text style={[styles.statusValue, { color: colors.text }]}>{layerData.optimizedTokenUsage}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Success Rate</Text>
            <Text style={[styles.statusValue, { color: '#10B981' }]}>99.2%</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Uptime</Text>
            <Text style={[styles.statusValue, { color: '#10B981' }]}>99.99%</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Last Audit</Text>
            <Text style={[styles.statusValue, { color: colors.text }]}>2 hours ago</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#6366F1" />
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6366F1' }]}>
            <Icons.FileText size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View Policies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]}>
            <Icons.ShieldCheck size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Run Audit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}>
            <Icons.AlertTriangle size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View Alerts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderComponents = () => (
    <View style={styles.componentsContainer}>
      <View style={styles.searchContainer}>
        <Icons.Search size={18} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search components..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredComponents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const IconComponent = iconMap[item.icon] || Icons.Circle;
          return (
            <TouchableOpacity
              style={[styles.componentCard, { backgroundColor: colors.card }]}
              onPress={() => {
                setSelectedComponent(item);
                setShowComponentModal(true);
              }}
            >
              <View style={[styles.componentIcon, { backgroundColor: layerData.color + '20' }]}>
                <IconComponent size={22} color={layerData.color} />
              </View>
              <View style={styles.componentContent}>
                <Text style={[styles.componentName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.componentDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <Icons.ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.componentsList}
      />
    </View>
  );

  const renderEnvironment = () => (
    <ScrollView style={styles.environmentContainer}>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Mode</Text>
        <View style={styles.modeButtons}>
          {(['strict', 'balanced', 'flexible'] as const).map(mode => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                environment.mode === mode && { backgroundColor: layerData.color }
              ]}
              onPress={() => setEnvironment(prev => ({ ...prev, mode }))}
            >
              <Text style={[
                styles.modeButtonText,
                environment.mode === mode && { color: '#FFFFFF' }
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.envDescription, { color: colors.textSecondary }]}>
          {environment.mode === 'strict' && 'Maximum security with minimal exceptions'}
          {environment.mode === 'balanced' && 'Standard security with reasonable flexibility'}
          {environment.mode === 'flexible' && 'Adaptive security with maximum flexibility'}
        </Text>
      </View>

      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Audit Level</Text>
        <View style={styles.modeButtons}>
          {(['basic', 'detailed', 'comprehensive'] as const).map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.modeButton,
                environment.auditLevel === level && { backgroundColor: layerData.color }
              ]}
              onPress={() => setEnvironment(prev => ({ ...prev, auditLevel: level }))}
            >
              <Text style={[
                styles.modeButtonText,
                environment.auditLevel === level && { color: '#FFFFFF' }
              ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Compliance Framework</Text>
        <View style={styles.modeButtons}>
          {(['SOC2', 'HIPAA', 'GDPR', 'PCI-DSS', 'all'] as const).map(framework => (
            <TouchableOpacity
              key={framework}
              style={[
                styles.modeButton,
                environment.complianceFramework === framework && { backgroundColor: layerData.color }
              ]}
              onPress={() => setEnvironment(prev => ({ ...prev, complianceFramework: framework }))}
            >
              <Text style={[
                styles.modeButtonText,
                environment.complianceFramework === framework && { color: '#FFFFFF' }
              ]}>
                {framework.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Security Options</Text>
        
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Auto Enforcement</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Automatically enforce policies
              </Text>
            </View>
            <Switch
              value={environment.autoEnforce}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, autoEnforce: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.autoEnforce ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Threat Detection</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Enable real-time threat detection
              </Text>
            </View>
            <Switch
              value={environment.threatDetection}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, threatDetection: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.threatDetection ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Encryption Required</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Require encryption for all data
              </Text>
            </View>
            <Switch
              value={environment.encryptionRequired}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, encryptionRequired: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.encryptionRequired ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => Alert.alert('Environment Saved', 'Governance environment settings updated.')}
      >
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
          <Icons.Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Environment</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Monitoring</Text>
        
        {[
          { key: 'enableRealTimeMonitoring', label: 'Real-Time Monitoring', desc: 'Live dashboard updates' },
          { key: 'enableAutoRemediation', label: 'Auto Remediation', desc: 'Automatic issue resolution' },
          { key: 'enableThreatIntelligence', label: 'Threat Intelligence', desc: 'AI-powered threat detection' },
        ].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
              </View>
              <Switch
                value={options[opt.key as keyof typeof options] as boolean}
                onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
                trackColor={{ false: colors.border, true: layerData.color + '80' }}
                thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Compliance</Text>
        
        {[
          { key: 'enableComplianceReports', label: 'Compliance Reports', desc: 'Automated compliance reporting' },
          { key: 'enableAccessAuditing', label: 'Access Auditing', desc: 'Track all access attempts' },
          { key: 'enableDataClassification', label: 'Data Classification', desc: 'Auto-classify sensitive data' },
        ].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
              </View>
              <Switch
                value={options[opt.key as keyof typeof options] as boolean}
                onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
                trackColor={{ false: colors.border, true: layerData.color + '80' }}
                thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Security</Text>
        
        {[
          { key: 'enableEncryptionAtRest', label: 'Encryption at Rest', desc: 'Encrypt stored data' },
          { key: 'enableEncryptionInTransit', label: 'Encryption in Transit', desc: 'Encrypt network traffic' },
          { key: 'enableMultiFactorAuth', label: 'Multi-Factor Auth', desc: 'Require MFA for access' },
          { key: 'enableSessionManagement', label: 'Session Management', desc: 'Active session control' },
          { key: 'enableIpWhitelisting', label: 'IP Whitelisting', desc: 'Restrict by IP address' },
          { key: 'enableGeographicRestrictions', label: 'Geo Restrictions', desc: 'Limit access by location' },
        ].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
              </View>
              <Switch
                value={options[opt.key as keyof typeof options] as boolean}
                onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
                trackColor={{ false: colors.border, true: layerData.color + '80' }}
                thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => Alert.alert('Options Saved', 'Governance options updated.')}
      >
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
          <Icons.Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Options</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={layerData.gradient}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.layerNumber}>L1</Text>
              <Text style={styles.headerTitle}>{layerData.name}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{layerData.workType} Layer</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Icons.Settings size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerDescription}>{layerData.description}</Text>
        
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Icons.Users size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.agentCount} Agents</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Zap size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.optimizedTokenUsage} Tokens</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Activity size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.flow}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[
          { key: 'overview', label: 'Overview', icon: Icons.LayoutDashboard },
          { key: 'components', label: 'Components', icon: Icons.Layers },
          { key: 'environment', icon: Icons.Server, label: 'Environment' },
          { key: 'options', label: 'Options', icon: Icons.Settings },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            {activeTab === tab.key && <View style={styles.tabIndicator} />}
            <tab.icon size={18} color={activeTab === tab.key ? layerData.color : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'components' && renderComponents()}
        {activeTab === 'environment' && renderEnvironment()}
        {activeTab === 'options' && renderOptions()}
      </ScrollView>

      <Modal
        visible={showComponentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowComponentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            {selectedComponent && (
              <>
                <LinearGradient
                  colors={layerData.gradient}
                  style={styles.modalHeader}
                >
                  <View style={styles.modalHeaderRow}>
                    <View style={styles.modalIconContainer}>
                      {React.createElement(iconMap[selectedComponent.icon] || Icons.Circle, { size: 28, color: '#FFFFFF' })}
                    </View>
                    <TouchableOpacity 
                      style={styles.modalCloseButton}
                      onPress={() => setShowComponentModal(false)}
                    >
                      <Icons.X size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalTitle}>{selectedComponent.name}</Text>
                </LinearGradient>
                
                <ScrollView style={styles.modalBody}>
                  <Text style={[styles.modalDescription, { color: colors.text }]}>
                    {selectedComponent.description}
                  </Text>
                  
                  <View style={styles.modalStats}>
                    <View style={[styles.modalStatItem, { backgroundColor: colors.card }]}>
                      <Icons.Activity size={20} color={layerData.color} />
                      <Text style={[styles.modalStatValue, { color: colors.text }]}>Active</Text>
                      <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Status</Text>
                    </View>
                    <View style={[styles.modalStatItem, { backgroundColor: colors.card }]}>
                      <Icons.Zap size={20} color={layerData.color} />
                      <Text style={[styles.modalStatValue, { color: colors.text }]}>0</Text>
                      <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Tokens</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={[styles.modalActionButton, { backgroundColor: layerData.color }]}
                    onPress={() => {
                      setShowComponentModal(false);
                      if (selectedComponent.route) router.push(selectedComponent.route as any);
                    }}
                  >
                    <Icons.ExternalLink size={18} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Open Component</Text>
                  </TouchableOpacity>
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
  complianceCard: { padding: 16, borderRadius: 12 },
  complianceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  complianceInfo: { flex: 1, marginRight: 16 },
  complianceFramework: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  complianceBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  complianceProgress: { height: '100%', borderRadius: 3 },
  complianceStatus: { alignItems: 'flex-end' },
  complianceScore: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  statusBadgeText: { fontSize: 9, fontWeight: '700' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  statusCard: { padding: 16, borderRadius: 12 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '500' },
  statusValue: { fontSize: 14, fontWeight: '600' },
  statusLabel: { fontSize: 13 },
  statusDivider: { height: 1, marginVertical: 4 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 },
  featureText: { fontSize: 13, fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, gap: 6 },
  actionButtonText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
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
  envDescription: { fontSize: 12, color: '#9CA3AF', marginTop: 8 },
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
  modalStats: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  modalStatItem: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  modalStatValue: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  modalStatLabel: { fontSize: 11, marginTop: 2 },
  modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  modalActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default LayerGovernance;
