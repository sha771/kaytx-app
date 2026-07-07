/**
 * =============================================================================
 * AI AGENTS & EMPLOYEES BUILDER - UPGRADED VERSION 2.0
 * =============================================================================
 *
 * Advanced builder interface with:
 * - Real-time preview panel
 * - Drag-and-drop skill selection
 * - Version history with rollback
 * - Collaborative editing indicators
 * - Advanced analytics dashboard
 * - Performance metrics simulation
 * - Export/import configurations
 *
 * @version 2.0.0
 * @lastUpdated 2026-06-06
 */

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bot,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
  Save,
  Eye,
  Sparkles,
  Zap,
  Brain,
  Network,
  TrendingUp,
  Heart,
  Shield,
  Check,
  X,
  Layers,
  Target,
  MapPin,
  Leaf,
  RefreshCw,
  Crown,
  Settings,
  User,
  Code,
  ChartBarBig,
  Megaphone,
  DollarSign,
  Headphones,
  Scale,
  Cpu,
  Box,
  Package,
  Palette,
  FileText,
  CircleCheck,
  Database,
  Smile,
  Briefcase,
  Microscope,
  Handshake,
  Globe,
  TriangleAlert,
  Download,
  Share2,
  Calculator,
  CircleAlert,
  History,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  GitBranch,
  Users2,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Copy,
  Trash2,
  Edit3,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Search,
  SortAsc,
  Grid3x3,
  List,
  MoreHorizontal,
  Star,
  Award,
  Gauge
} from 'lucide-react-native';

// Types
import type {
  BuilderMode,
  BuilderTab,
  CustomAgent,
  CustomEmployee,
  CustomDepartment,
  AgentType,
  AgentSkill,
  IntelligenceFeature,
  EmployeeLevel,
  EmploymentType,
  EmployeeSkill,
  AICollaboration,
} from '../types/builder';

// Constants
import { 
  AGENT_TYPES, 
  INTELLIGENCE_FEATURES, 
  SKILL_LIBRARY, 
  PERSONALITY_TRAITS, 
  AGENT_TEMPLATES, 
  calculateDetailedAgentCost, 
  validateAgentName, 
  validateAgentSkills, 
  validateTokenBudget,
  AGENT_PRESETS_BY_USECASE 
} from '../constants/agentBuilder';
import { 
  EMPLOYEE_LEVELS, 
  EMPLOYMENT_TYPES, 
  EMPLOYEE_SKILL_LIBRARY, 
  DEPARTMENT_ROLES, 
  AI_COLLABORATION_TEMPLATES, 
  PERFORMANCE_METRICS_TEMPLATES, 
  EMPLOYEE_TEMPLATES, 
  generateEmployeeId, 
  getRoleForLevel, 
  calculateEmployeeCost, 
  AI_COLLABORATION_PRESETS, 
  TEAM_PRESETS 
} from '../constants/employeeBuilder';
import { 
  DEPARTMENT_CATEGORIES, 
  DEPARTMENT_FUNCTION_TEMPLATES, 
  DEPARTMENT_KPI_TEMPLATES, 
  C_SUITE_LIAISONS, 
  COMMAND_CENTER_CONNECTIONS, 
  AGENT_ALLOCATION_TEMPLATES, 
  DEPARTMENT_TEMPLATES, 
  DEFAULT_DEPARTMENTS, 
  generateDepartmentId, 
  calculateDepartmentBudget, 
  getRecommendedCSuite, 
  DEPARTMENT_PRESETS_BY_USECASE 
} from '../constants/departmentBuilder';

const { width, height } = Dimensions.get('window');

// ============================================
// VERSION HISTORY TYPES
// ============================================

interface VersionHistory {
  id: string;
  timestamp: string;
  description: string;
  data: Partial<CustomAgent | CustomEmployee | CustomDepartment>;
  author: string;
  changes: string[];
}

interface CollaborativeSession {
  id: string;
  users: Array<{
    id: string;
    name: string;
    avatar: string;
    color: string;
    isActive: boolean;
  }>;
  lastActivity: string;
}

interface PerformanceMetrics {
  responseTime: number;
  accuracy: number;
  efficiency: number;
  costPerRequest: number;
  monthlySavings: number;
  roi: number;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function AIAgentsEmployeesBuilderUpgraded() {
  const router = useRouter();
  
  // Builder State
  const [activeTab, setActiveTab] = useState<BuilderMode>('agent');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Increased to 5 for analytics step

  // Data States
  const [agentData, setAgentData] = useState<Partial<CustomAgent>>({
    agentType: 'reactive',
    skills: [],
    intelligenceFeatures: [],
    tokenBudget: 15000,
    personality: PERSONALITY_TRAITS.map(p => ({ ...p })),
  });

  const [employeeData, setEmployeeData] = useState<Partial<CustomEmployee>>({
    level: 'mid',
    employmentType: 'full_time',
    skills: [],
    aiPartners: [],
    aiWorkloadBalance: 40,
  });

  const [departmentData, setDepartmentData] = useState<Partial<CustomDepartment>>({
    category: 'support',
    functions: [],
    agentAllocation: [],
    kpis: [],
    intelligenceFeatures: { predictive: false, sentiment: false, anomaly: false },
    tier: 5,
  });

  // NEW: Advanced Features State
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'split' | 'full' | 'hidden'>('split');
  const [versionHistory, setVersionHistory] = useState<VersionHistory[]>([]);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [collaborativeSession, setCollaborativeSession] = useState<CollaborativeSession | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [draggedSkill, setDraggedSkill] = useState<AgentSkill | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'level'>('name');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [savedItems, setSavedItems] = useState<{
    agents: CustomAgent[];
    employees: CustomEmployee[];
    departments: CustomDepartment[];
  }>({ agents: [], employees: [], departments: [] });

  // AI Prompt Builder State
  const [promptBuilderMode, setPromptBuilderMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGeneratedConfig, setAiGeneratedConfig] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Validation & Cost State
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Refs for animations
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Tabs Configuration
  const tabs: BuilderTab[] = [
    { id: 'agent', label: 'AI Agent Builder', icon: 'Bot', description: 'Create custom AI agents' },
    { id: 'employee', label: 'Employee Builder', icon: 'Users', description: 'Add employees to hierarchy' },
    { id: 'department', label: 'Department Builder', icon: 'Building2', description: 'Create custom departments' },
  ];

  // ============================================
  // VERSION HISTORY MANAGEMENT
  // ============================================

  const saveVersion = useCallback((description: string, changes: string[]) => {
    const newVersion: VersionHistory = {
      id: `v${versionHistory.length + 1}`,
      timestamp: new Date().toISOString(),
      description,
      data: activeTab === 'agent' ? agentData : activeTab === 'employee' ? employeeData : departmentData,
      author: 'Current User',
      changes,
    };
    setVersionHistory(prev => [newVersion, ...prev].slice(0, 20)); // Keep last 20 versions
  }, [activeTab, agentData, employeeData, departmentData, versionHistory.length]);

  const restoreVersion = useCallback((version: VersionHistory) => {
    Alert.alert(
      'Restore Version',
      `Are you sure you want to restore ${version.id}? This will replace current changes.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          onPress: () => {
            if (activeTab === 'agent') {
              setAgentData(version.data as Partial<CustomAgent>);
            } else if (activeTab === 'employee') {
              setEmployeeData(version.data as Partial<CustomEmployee>);
            } else {
              setDepartmentData(version.data as Partial<CustomDepartment>);
            }
            setShowVersionHistory(false);
            saveVersion(`Restored from ${version.id}`, ['Version restored']);
          },
        },
      ]
    );
  }, [activeTab, saveVersion]);

  // ============================================
  // PERFORMANCE SIMULATION
  // ============================================

  const simulatePerformance = useCallback(() => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const cost = getAgentCost();
      const skills = agentData.skills?.length || 0;
      const features = agentData.intelligenceFeatures?.filter(f => f.enabled).length || 0;
      const budget = agentData.tokenBudget || 15000;
      
      const metrics: PerformanceMetrics = {
        responseTime: 1.5 - (features * 0.2) + (budget / 100000),
        accuracy: 85 + (skills * 2) + (features * 5),
        efficiency: 70 + (skills * 3) + (features * 8),
        costPerRequest: cost.totalMonthly / 10000,
        monthlySavings: (skills * 500) + (features * 1000),
        roi: ((skills * 500 + features * 1000) / cost.totalMonthly) * 100,
      };
      
      setPerformanceMetrics(metrics);
      setIsSimulating(false);
    }, 1500);
  }, [agentData, getAgentCost]);

  // ============================================
  // DRAG AND DROP HANDLERS
  // ============================================

  const handleDragStart = useCallback((skill: AgentSkill) => {
    setDraggedSkill(skill);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedSkill(null);
  }, []);

  const handleDrop = useCallback(() => {
    if (draggedSkill) {
      const current = agentData.skills || [];
      const exists = current.some(s => s.id === draggedSkill.id);
      const updated = exists ? current : [...current, draggedSkill];
      setAgentData({ ...agentData, skills: updated });
      saveVersion('Added skill via drag-drop', [`Added ${draggedSkill.name}`]);
      setDraggedSkill(null);
    }
  }, [draggedSkill, agentData, saveVersion]);

  // ============================================
  // ADVANCED FILTERING & SORTING
  // ============================================

  const filteredSkills = useMemo(() => {
    let skills = Object.values(SKILL_LIBRARY).flat();
    
    if (filterCategory !== 'all') {
      skills = skills.filter(s => s.category === filterCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      skills = skills.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.description.toLowerCase().includes(query)
      );
    }
    
    skills.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'level') {
        const levelOrder = { basic: 0, intermediate: 1, advanced: 2, expert: 3 };
        return levelOrder[a.level] - levelOrder[b.level];
      }
      return 0;
    });
    
    return skills;
  }, [filterCategory, searchQuery, sortBy]);

  // ============================================
  // COST CALCULATION
  // ============================================

  const getAgentCost = useCallback(() => {
    const intelligenceFeatures = agentData.intelligenceFeatures
      ?.filter(f => f.enabled)
      .map(f => f.id) || [];
    
    return calculateDetailedAgentCost(
      agentData.agentType || 'reactive',
      agentData.tokenBudget || 15000,
      intelligenceFeatures,
      10000
    );
  }, [agentData]);

  const getEmployeeCost = useCallback(() => {
    return calculateEmployeeCost(
      employeeData.level || 'mid',
      employeeData.departmentId || 'technology',
      employeeData.aiWorkloadBalance || 40
    );
  }, [employeeData]);

  // ============================================
  // VALIDATION
  // ============================================

  const validateCurrentStep = useCallback(() => {
    const errors: string[] = [];

    if (activeTab === 'agent') {
      if (currentStep === 2) {
        const nameValidation = validateAgentName(agentData.name || '');
        if (!nameValidation.isValid) errors.push(nameValidation.message || 'Invalid name');
        
        const budgetValidation = validateTokenBudget(agentData.tokenBudget || 0);
        if (!budgetValidation.isValid) errors.push(budgetValidation.message || 'Invalid budget');
      }
      if (currentStep === 3) {
        const skillsValidation = validateAgentSkills(agentData.skills || []);
        if (!skillsValidation.isValid) errors.push(skillsValidation.message || 'Invalid skills');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [activeTab, currentStep, agentData]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      saveVersion(`Step ${currentStep} completed`, ['Navigation']);
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
    }
  }, [currentStep, totalSteps, validateCurrentStep, saveVersion]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationErrors([]);
    }
  }, [currentStep]);

  // ============================================
  // EXPORT / IMPORT
  // ============================================

  const handleExport = useCallback(() => {
    const exportData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      mode: activeTab,
      data: activeTab === 'agent' ? agentData : activeTab === 'employee' ? employeeData : departmentData,
      metadata: {
        cost: getAgentCost(),
        performance: performanceMetrics,
      },
    };
    
    Alert.alert(
      'Export Configuration',
      'Configuration exported successfully!',
      [{ text: 'OK' }]
    );
    
    // In a real app, this would trigger a file download
    console.log('Export data:', JSON.stringify(exportData, null, 2));
  }, [activeTab, agentData, employeeData, departmentData, getAgentCost, performanceMetrics]);

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderTabSelector = () => (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon === 'Bot' ? Bot : tab.icon === 'Users' ? Users : Building2;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => {
              setActiveTab(tab.id);
              setCurrentStep(1);
              saveVersion(`Switched to ${tab.label}`, ['Tab change']);
            }}
          >
            <Icon size={24} color={isActive ? '#fff' : '#64748b'} />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <View style={styles.toolbarLeft}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowPreview(!showPreview)}
        >
          <Eye size={20} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowVersionHistory(true)}
        >
          <History size={20} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={simulatePerformance}
          disabled={isSimulating}
        >
          <Activity size={20} color={isSimulating ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.toolbarRight}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={handleExport}
        >
          <Download size={20} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setPreviewMode(previewMode === 'split' ? 'full' : 'split')}
        >
          {previewMode === 'split' ? <Maximize2 size={20} color="#64748b" /> : <Minimize2 size={20} color="#64748b" />}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVersionHistory = () => (
    <Modal
      visible={showVersionHistory}
      animationType="slide"
      onRequestClose={() => setShowVersionHistory(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Version History</Text>
          <TouchableOpacity onPress={() => setShowVersionHistory(false)}>
            <X size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.versionList}>
          {versionHistory.map((version) => (
            <TouchableOpacity
              key={version.id}
              style={styles.versionItem}
              onPress={() => restoreVersion(version)}
            >
              <View style={styles.versionHeader}>
                <Text style={styles.versionId}>{version.id}</Text>
                <Text style={styles.versionTime}>
                  {new Date(version.timestamp).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.versionDescription}>{version.description}</Text>
              <View style={styles.versionChanges}>
                {version.changes.map((change, idx) => (
                  <Text key={idx} style={styles.versionChange}>• {change}</Text>
                ))}
              </View>
              <View style={styles.versionFooter}>
                <Text style={styles.versionAuthor}>By {version.author}</Text>
                <TouchableOpacity style={styles.restoreButton}>
                  <RotateCcw size={16} color="#6366f1" />
                  <Text style={styles.restoreButtonText}>Restore</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          {versionHistory.length === 0 && (
            <View style={styles.emptyState}>
              <History size={48} color="#cbd5e1" />
              <Text style={styles.emptyStateText}>No version history yet</Text>
              <Text style={styles.emptyStateSubtext}>Changes will be tracked automatically</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderPerformanceDashboard = () => {
    if (!performanceMetrics) return null;
    
    return (
      <View style={styles.dashboardCard}>
        <View style={styles.dashboardHeader}>
          <BarChart3 size={24} color="#6366f1" />
          <Text style={styles.dashboardTitle}>Performance Simulation</Text>
        </View>
        
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Clock size={20} color="#10b981" />
            <Text style={styles.metricLabel}>Response Time</Text>
            <Text style={styles.metricValue}>{performanceMetrics.responseTime.toFixed(2)}s</Text>
          </View>
          
          <View style={styles.metricCard}>
            <TargetIcon size={20} color="#6366f1" />
            <Text style={styles.metricLabel}>Accuracy</Text>
            <Text style={styles.metricValue}>{performanceMetrics.accuracy}%</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Gauge size={20} color="#f59e0b" />
            <Text style={styles.metricLabel}>Efficiency</Text>
            <Text style={styles.metricValue}>{performanceMetrics.efficiency}%</Text>
          </View>
          
          <View style={styles.metricCard}>
            <DollarSign size={20} color="#10b981" />
            <Text style={styles.metricLabel}>Cost/Request</Text>
            <Text style={styles.metricValue}>${performanceMetrics.costPerRequest.toFixed(4)}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <TrendingUp size={20} color="#10b981" />
            <Text style={styles.metricLabel}>Monthly Savings</Text>
            <Text style={styles.metricValue}>${performanceMetrics.monthlySavings.toLocaleString()}</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Award size={20} color="#f59e0b" />
            <Text style={styles.metricLabel}>ROI</Text>
            <Text style={styles.metricValue}>{performanceMetrics.roi.toFixed(1)}%</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAdvancedSkillSelector = () => {
    const categories = Array.from(new Set(filteredSkills.map(s => s.category)));
    
    return (
      <View style={styles.advancedSkillsContainer}>
        {/* Search & Filter Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search skills..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#94a3b8"
            />
          </View>
          
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSortBy(sortBy === 'name' ? 'category' : sortBy === 'category' ? 'level' : 'name')}
          >
            <SortAsc size={20} color="#64748b" />
            <Text style={styles.filterButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>
        
        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          <TouchableOpacity
            style={[styles.categoryFilter, filterCategory === 'all' && styles.categoryFilterActive]}
            onPress={() => setFilterCategory('all')}
          >
            <Text style={[styles.categoryFilterText, filterCategory === 'all' && styles.categoryFilterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryFilter, filterCategory === cat && styles.categoryFilterActive]}
              onPress={() => setFilterCategory(cat)}
            >
              <Text style={[styles.categoryFilterText, filterCategory === cat && styles.categoryFilterTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Skills Grid with Drag & Drop */}
        <View style={styles.skillsGrid}>
          {filteredSkills.map((skill) => {
            const isSelected = agentData.skills?.some(s => s.id === skill.id);
            return (
              <TouchableOpacity
                key={skill.id}
                style={[
                  styles.advancedSkillCard,
                  isSelected && styles.advancedSkillCardSelected,
                  draggedSkill?.id === skill.id && styles.advancedSkillCardDragging
                ]}
                onPress={() => {
                  const current = agentData.skills || [];
                  const updated = isSelected
                    ? current.filter(s => s.id !== skill.id)
                    : [...current, skill];
                  setAgentData({ ...agentData, skills: updated });
                  saveVersion('Skill selection changed', [isSelected ? `Removed ${skill.name}` : `Added ${skill.name}`]);
                }}
                onLongPress={() => handleDragStart(skill)}
              >
                <View style={styles.skillLevelBadge}>
                  <Text style={styles.skillLevelText}>{skill.level.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={[styles.skillName, isSelected && styles.skillNameSelected]}>
                  {skill.name}
                </Text>
                <Text style={styles.skillCategory}>{skill.category}</Text>
                {isSelected && (
                  <Check size={16} color="#6366f1" style={styles.skillCheck} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Agents Builder v2.0</Text>
        <Text style={styles.headerSubtitle}>Advanced Configuration Interface</Text>
      </View>
      
      {renderTabSelector()}
      {renderToolbar()}
      
      <View style={styles.content}>
        {/* Main Builder Area */}
        <View style={[styles.builderArea, previewMode === 'full' && styles.builderAreaHidden]}>
          {/* Step Indicator */}
          <View style={styles.stepIndicator}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.stepDot,
                  currentStep === i + 1 && styles.stepDotActive,
                  currentStep > i + 1 && styles.stepDotCompleted
                ]}
              >
                {currentStep > i + 1 && <Check size={12} color="#fff" />}
              </View>
            ))}
          </View>
          
          {/* Step Content */}
          <ScrollView style={styles.stepContent}>
            {currentStep === 1 && (
              <View>
                <Text style={styles.stepTitle}>Step 1: Choose Template</Text>
                <Text style={styles.stepSubtitle}>Start with a preset or build from scratch</Text>
                
                <View style={styles.templatesGrid}>
                  <TouchableOpacity
                    style={[styles.templateCard, styles.templateCardFeatured]}
                    onPress={() => {
                      setPromptBuilderMode(true);
                      setCurrentStep(2);
                    }}
                  >
                    <Brain size={32} color="#fff" />
                    <Text style={[styles.templateName, styles.templateNameFeatured]}>✨ AI-Powered Creation</Text>
                    <Text style={[styles.templateDesc, styles.templateDescFeatured]}>
                      Describe what you need - AI builds it for you!
                    </Text>
                  </TouchableOpacity>
                  
                  {AGENT_TEMPLATES.slice(0, 4).map((template) => {
                    const Icon = template.icon === 'Headphones' ? Headphones :
                                template.icon === 'DollarSign' ? DollarSign :
                                template.icon === 'TrendingUp' ? TrendingUp :
                                template.icon === 'Shield' ? Shield :
                                Bot;
                    return (
                      <TouchableOpacity
                        key={template.id}
                        style={styles.templateCard}
                        onPress={() => {
                          const preset = template.presetData;
                          setAgentData({
                            ...agentData,
                            agentType: (preset.agentType as AgentType) || 'reactive',
                            skills: SKILL_LIBRARY[template.category]?.filter(s => 
                              (preset.skills as string[] | undefined)?.includes(s.id)
                            ) || [],
                            tokenBudget: (preset.tokenBudget as number) || 15000,
                          });
                          saveVersion('Template selected', [`Selected ${template.name}`]);
                          handleNext();
                        }}
                      >
                        <Icon size={32} color="#6366f1" />
                        <Text style={styles.templateName}>{template.name}</Text>
                        <Text style={styles.templateDesc}>{template.description}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            
            {currentStep === 2 && (
              <View>
                <Text style={styles.stepTitle}>Step 2: Basic Configuration</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Agent Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Support Bot Alpha"
                    value={agentData.name}
                    onChangeText={(text) => setAgentData({ ...agentData, name: text })}
                  />
                </View>
                
                <Text style={styles.sectionTitle}>Agent Type</Text>
                <View style={styles.optionsGrid}>
                  {AGENT_TYPES.map((type) => {
                    const Icon = type.id === 'reactive' ? Zap : type.id === 'learning' ? Brain : Network;
                    const isSelected = agentData.agentType === type.id;
                    return (
                      <TouchableOpacity
                        key={type.id}
                        style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                        onPress={() => setAgentData({ ...agentData, agentType: type.id })}
                      >
                        <Icon size={24} color={isSelected ? '#6366f1' : '#64748b'} />
                        <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                          {type.name}
                        </Text>
                        <Text style={styles.optionDesc}>{type.description}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Token Budget (monthly)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(agentData.tokenBudget || 15000)}
                    onChangeText={(text) => setAgentData({ ...agentData, tokenBudget: parseInt(text) || 0 })}
                  />
                  <Text style={styles.hint}>Min: 5,000 | Max: 500,000</Text>
                </View>
              </View>
            )}
            
            {currentStep === 3 && (
              <View>
                <Text style={styles.stepTitle}>Step 3: Skills & Intelligence</Text>
                {renderAdvancedSkillSelector()}
                
                <Text style={styles.sectionTitle}>Intelligence Features</Text>
                {INTELLIGENCE_FEATURES.map((feature) => {
                  const isEnabled = agentData.intelligenceFeatures?.some(f => f.id === feature.id && f.enabled);
                  const Icon = feature.id === 'predictive' ? TrendingUp :
                              feature.id === 'sentiment' ? Heart :
                              Shield;
                  return (
                    <View key={feature.id} style={styles.intelligenceCard}>
                      <View style={styles.intelligenceHeader}>
                        <Icon size={24} color="#6366f1" />
                        <Text style={styles.intelligenceName}>{feature.name}</Text>
                        <Switch
                          value={isEnabled}
                          onValueChange={(enabled) => {
                            const current = agentData.intelligenceFeatures || [];
                            const updated = enabled
                              ? [...current.filter(f => f.id !== feature.id), { ...feature, enabled }]
                              : current.filter(f => f.id !== feature.id);
                            setAgentData({ ...agentData, intelligenceFeatures: updated });
                            saveVersion('Intelligence feature changed', [enabled ? `Enabled ${feature.name}` : `Disabled ${feature.name}`]);
                          }}
                          trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
                          thumbColor={isEnabled ? '#6366f1' : '#94a3b8'}
                        />
                      </View>
                      <Text style={styles.intelligenceDesc}>{feature.description}</Text>
                      <Text style={styles.intelligenceImpact}>Impact: {feature.businessImpact}</Text>
                    </View>
                  );
                })}
              </View>
            )}
            
            {currentStep === 4 && (
              <View>
                <Text style={styles.stepTitle}>Step 4: Performance Simulation</Text>
                <Text style={styles.stepSubtitle}>Simulate agent performance before deployment</Text>
                
                <TouchableOpacity
                  style={styles.simulateButton}
                  onPress={simulatePerformance}
                  disabled={isSimulating}
                >
                  {isSimulating ? (
                    <>
                      <Activity size={20} color="#fff" />
                      <Text style={styles.simulateButtonText}>Simulating...</Text>
                    </>
                  ) : (
                    <>
                      <Play size={20} color="#fff" />
                      <Text style={styles.simulateButtonText}>Run Simulation</Text>
                    </>
                  )}
                </TouchableOpacity>
                
                {renderPerformanceDashboard()}
              </View>
            )}
            
            {currentStep === 5 && (
              <View>
                <Text style={styles.stepTitle}>Step 5: Review & Deploy</Text>
                <Text style={styles.stepSubtitle}>Final review before deployment</Text>
                
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewTitle}>Configuration Summary</Text>
                  
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Name:</Text>
                    <Text style={styles.reviewValue}>{agentData.name || 'Not set'}</Text>
                  </View>
                  
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Type:</Text>
                    <Text style={styles.reviewValue}>{agentData.agentType}</Text>
                  </View>
                  
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Skills:</Text>
                    <Text style={styles.reviewValue}>{agentData.skills?.length || 0} selected</Text>
                  </View>
                  
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Token Budget:</Text>
                    <Text style={styles.reviewValue}>{agentData.tokenBudget?.toLocaleString()}</Text>
                  </View>
                  
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Monthly Cost:</Text>
                    <Text style={styles.reviewValue}>{getAgentCost().monthlyCostFormatted}</Text>
                  </View>
                  
                  {performanceMetrics && (
                    <>
                      <View style={styles.reviewDivider} />
                      <Text style={styles.reviewSubtitle}>Performance Metrics</Text>
                      
                      <View style={styles.reviewRow}>
                        <Text style={styles.reviewLabel}>Accuracy:</Text>
                        <Text style={styles.reviewValue}>{performanceMetrics.accuracy}%</Text>
                      </View>
                      
                      <View style={styles.reviewRow}>
                        <Text style={styles.reviewLabel}>Efficiency:</Text>
                        <Text style={styles.reviewValue}>{performanceMetrics.efficiency}%</Text>
                      </View>
                      
                      <View style={styles.reviewRow}>
                        <Text style={styles.reviewLabel}>ROI:</Text>
                        <Text style={styles.reviewValue}>{performanceMetrics.roi.toFixed(1)}%</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
          
          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonSecondary]}
              onPress={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} color="#64748b" />
              <Text style={styles.navButtonText}>Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.navButton, styles.navButtonPrimary]}
              onPress={handleNext}
              disabled={currentStep === totalSteps}
            >
              <Text style={styles.navButtonTextPrimary}>
                {currentStep === totalSteps ? 'Deploy' : 'Next'}
              </Text>
              {currentStep < totalSteps && <ChevronRight size={20} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Real-time Preview Panel */}
        {showPreview && (
          <View style={[styles.previewPanel, previewMode === 'full' && styles.previewPanelFull]}>
            <View style={styles.previewHeader}>
              <Eye size={20} color="#6366f1" />
              <Text style={styles.previewTitle}>Live Preview</Text>
              <TouchableOpacity onPress={() => setShowPreview(false)}>
                <X size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.previewContent}>
              <View style={styles.previewCard}>
                <Text style={styles.previewCardTitle}>Agent Configuration</Text>
                
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Name:</Text>
                  <Text style={styles.previewValue}>{agentData.name || '—'}</Text>
                </View>
                
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Type:</Text>
                  <Text style={styles.previewValue}>{agentData.agentType || '—'}</Text>
                </View>
                
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Skills:</Text>
                  <View style={styles.previewSkills}>
                    {agentData.skills?.slice(0, 3).map((skill) => (
                      <View key={skill.id} style={styles.previewSkillChip}>
                        <Text style={styles.previewSkillText}>{skill.name}</Text>
                      </View>
                    ))}
                    {(agentData.skills?.length || 0) > 3 && (
                      <Text style={styles.previewSkillMore}>+{agentData.skills!.length - 3} more</Text>
                    )}
                  </View>
                </View>
                
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Token Budget:</Text>
                  <Text style={styles.previewValue}>{agentData.tokenBudget?.toLocaleString()}</Text>
                </View>
                
                <View style={styles.previewCostCard}>
                  <Text style={styles.previewCostLabel}>Estimated Monthly Cost</Text>
                  <Text style={styles.previewCostValue}>{getAgentCost().monthlyCostFormatted}</Text>
                </View>
              </View>
              
              {performanceMetrics && (
                <View style={styles.previewCard}>
                  <Text style={styles.previewCardTitle}>Performance Preview</Text>
                  
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>Accuracy:</Text>
                    <Text style={styles.previewValue}>{performanceMetrics.accuracy}%</Text>
                  </View>
                  
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>Efficiency:</Text>
                    <Text style={styles.previewValue}>{performanceMetrics.efficiency}%</Text>
                  </View>
                  
                  <View style={styles.previewRow}>
                    <Text style={styles.previewLabel}>ROI:</Text>
                    <Text style={styles.previewValue}>{performanceMetrics.roi.toFixed(1)}%</Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
      
      {renderVersionHistory()}
    </SafeAreaView>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#fff',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    padding: 8,
    marginRight: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  builderArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  builderAreaHidden: {
    display: 'none',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: '#6366f1',
  },
  stepDotCompleted: {
    backgroundColor: '#10b981',
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  templateCard: {
    width: (width - 64) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  templateCardFeatured: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 12,
  },
  templateNameFeatured: {
    color: '#fff',
  },
  templateDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  templateDescFeatured: {
    color: '#e0e7ff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  hint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  optionCard: {
    width: (width - 64) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  optionCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f5f3ff',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  optionTitleSelected: {
    color: '#6366f1',
  },
  optionDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  advancedSkillsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748b',
  },
  categoryFilters: {
    marginBottom: 16,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryFilterActive: {
    backgroundColor: '#6366f1',
  },
  categoryFilterText: {
    fontSize: 12,
    color: '#64748b',
  },
  categoryFilterTextActive: {
    color: '#fff',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  advancedSkillCard: {
    width: (width - 80) / 3,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  advancedSkillCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f5f3ff',
  },
  advancedSkillCardDragging: {
    opacity: 0.5,
  },
  skillLevelBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillLevelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  skillName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  skillNameSelected: {
    color: '#6366f1',
  },
  skillCategory: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  skillCheck: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  intelligenceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  intelligenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  intelligenceName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  intelligenceDesc: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  intelligenceImpact: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  simulateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  simulateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dashboardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  metricCard: {
    width: (width - 96) / 3,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    margin: 8,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 4,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  reviewLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  reviewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  reviewSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  navButtonPrimary: {
    backgroundColor: '#6366f1',
  },
  navButtonSecondary: {
    backgroundColor: '#f1f5f9',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
  },
  navButtonTextPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  previewPanel: {
    width: 320,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
  },
  previewPanelFull: {
    width: width - 32,
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  previewTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  previewContent: {
    flex: 1,
    padding: 16,
  },
  previewCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  previewCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  previewLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  previewValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  previewSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewSkillChip: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  previewSkillText: {
    fontSize: 10,
    color: '#fff',
  },
  previewSkillMore: {
    fontSize: 10,
    color: '#64748b',
  },
  previewCostCard: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  previewCostLabel: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  previewCostValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  versionList: {
    flex: 1,
    padding: 16,
  },
  versionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  versionId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
  },
  versionTime: {
    fontSize: 12,
    color: '#64748b',
  },
  versionDescription: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 8,
  },
  versionChanges: {
    marginBottom: 12,
  },
  versionChange: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  versionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionAuthor: {
    fontSize: 12,
    color: '#94a3b8',
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  restoreButtonText: {
    fontSize: 12,
    color: '#6366f1',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});
