/**
 * =============================================================================
 * AI AGENTS & EMPLOYEES BUILDER
 * =============================================================================
 *
 * Main builder interface for creating custom:
 * - AI Agents (Tier 6)
 * - Employees (Tier 5-6)
 * - Departments (Tier 5)
 *
 * Uses the 7-tier enterprise hierarchy structure.
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-21
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
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
  TrendingDown,
  Heart,
  Shield,
  Check,
  X,
  Layers,
  Target,
  MapPin,
  Lightbulb,
  Leaf,
  RefreshCw,
  Crown,
  Settings,
  User,
  Code,
  ChartBar,
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
  ChartBarBig,
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
import { AGENT_TYPES, INTELLIGENCE_FEATURES, SKILL_LIBRARY, PERSONALITY_TRAITS, AGENT_TEMPLATES, calculateDetailedAgentCost, validateAgentName, validateAgentSkills, validateTokenBudget, AGENT_PRESETS_BY_USECASE } from '../constants/agentBuilder';
import { EMPLOYEE_LEVELS, EMPLOYMENT_TYPES, EMPLOYEE_SKILL_LIBRARY, DEPARTMENT_ROLES, AI_COLLABORATION_TEMPLATES, PERFORMANCE_METRICS_TEMPLATES, EMPLOYEE_TEMPLATES, generateEmployeeId, getRoleForLevel, calculateAIWorkloadRecommendation, calculateEmployeeCost, AI_COLLABORATION_PRESETS, TEAM_PRESETS } from '../constants/employeeBuilder';
import { DEPARTMENT_CATEGORIES, DEPARTMENT_FUNCTION_TEMPLATES, DEPARTMENT_KPI_TEMPLATES, C_SUITE_LIAISONS, COMMAND_CENTER_CONNECTIONS, AGENT_ALLOCATION_TEMPLATES, DEPARTMENT_TEMPLATES, DEFAULT_DEPARTMENTS, generateDepartmentId, calculateDepartmentBudget, getRecommendedCSuite, DEPARTMENT_PRESETS_BY_USECASE } from '../constants/departmentBuilder';

// ============================================
// MAIN COMPONENT
// ============================================

export default function AIAgentsEmployeesBuilder() {
  const router = useRouter();
  
  // Builder State
  const [activeTab, setActiveTab] = useState<BuilderMode>('agent');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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

  const [showPreview, setShowPreview] = useState(false);

  // Tabs Configuration
  const tabs: BuilderTab[] = [
    { id: 'agent', label: 'AI Agent Builder', icon: 'Bot', description: 'Create custom AI agents' },
    { id: 'employee', label: 'Employee Builder', icon: 'Users', description: 'Add employees to hierarchy' },
    { id: 'department', label: 'Department Builder', icon: 'Building2', description: 'Create custom departments' },
  ];

  // ============================================
  // STEP NAVIGATION
  // ============================================

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
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationErrors([]);
    }
  }, [currentStep]);

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
  // SAVE & EXPORT
  // ============================================

  const handleSave = useCallback(() => {
    if (activeTab === 'agent') {
      const newAgent: CustomAgent = {
        id: `agent-${Date.now()}`,
        name: agentData.name || 'New Agent',
        role: agentData.role || 'Agent',
        departmentId: agentData.departmentId || 'technology',
        departmentName: agentData.departmentName || 'Technology',
        agentType: agentData.agentType || 'reactive',
        skills: agentData.skills || [],
        personality: agentData.personality || PERSONALITY_TRAITS,
        intelligenceFeatures: agentData.intelligenceFeatures || [],
        reportsTo: agentData.reportsTo || 'cto',
        commandCenter: agentData.commandCenter || { cdo: 'cdoo', ddo: 'ddo', wol: 'wol', aod: 'aod' },
        tokenBudget: agentData.tokenBudget || 15000,
        monthlyCost: getAgentCost().monthlyCostFormatted,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        version: 1,
      };
      setSavedItems(prev => ({ ...prev, agents: [...prev.agents, newAgent] }));
    } else if (activeTab === 'employee') {
      const newEmployee: CustomEmployee = {
        id: generateEmployeeId(employeeData.departmentId || 'tech', employeeData.level || 'mid'),
        firstName: employeeData.firstName || '',
        lastName: employeeData.lastName || '',
        email: employeeData.email || '',
        employeeId: `EMP-${Date.now()}`,
        departmentId: employeeData.departmentId || 'technology',
        departmentName: employeeData.departmentName || 'Technology',
        role: employeeData.role || 'Employee',
        level: employeeData.level || 'mid',
        employmentType: employeeData.employmentType || 'full_time',
        reportsTo: employeeData.reportsTo || '',
        manages: employeeData.manages || [],
        skills: employeeData.skills || [],
        aiPartners: employeeData.aiPartners || [],
        aiWorkloadBalance: employeeData.aiWorkloadBalance || 40,
        performanceMetrics: employeeData.performanceMetrics || [],
        goals: employeeData.goals || [],
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
      };
      setSavedItems(prev => ({ ...prev, employees: [...prev.employees, newEmployee] }));
    }

    Alert.alert(
      'Success',
      `${activeTab === 'agent' ? 'AI Agent' : activeTab === 'employee' ? 'Employee' : 'Department'} created successfully!`,
      [{ text: 'OK' }]
    );
  }, [activeTab, agentData, employeeData, getAgentCost]);

  // ============================================
  // RENDER TAB SELECTOR
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

  // ============================================
  // STEP 1: SELECT TEMPLATE / TYPE
  // ============================================

  const [departmentMode, setDepartmentMode] = useState<'existing' | 'custom' | 'template'>('existing');
  const [promptBuilderMode, setPromptBuilderMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGeneratedConfig, setAiGeneratedConfig] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Validation & Cost State
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [savedItems, setSavedItems] = useState<{
    agents: CustomAgent[];
    employees: CustomEmployee[];
    departments: CustomDepartment[];
  }>({ agents: [], employees: [], departments: [] });

  const renderStep1 = () => {
    if (activeTab === 'agent') {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 1: Choose Agent Template</Text>
          <Text style={styles.stepSubtitle}>Start with a preset or build from scratch</Text>
          
          <View style={styles.templatesGrid}>
            {/* AI-Powered Prompt Builder */}
            <TouchableOpacity
              style={[styles.templateCard, styles.templateCardFeatured]}
              onPress={() => {
                setPromptBuilderMode(true);
                setCurrentStep(2);
              }}
            >
              <Brain size={32} color="#fff" />
              <Text style={[styles.templateName, styles.templateNameFeatured]}>✨ AI-Powered Creation</Text>
              <Text style={[styles.templateDesc, styles.templateDescFeatured]}>Just describe what you need - AI builds it for you!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.templateCard}
              onPress={() => {
                setPromptBuilderMode(false);
                setAgentData({ ...agentData, name: '', role: '' });
              }}
            >
              <Sparkles size={32} color="#6366f1" />
              <Text style={styles.templateName}>Build from Scratch</Text>
              <Text style={styles.templateDesc}>Custom agent configuration</Text>
            </TouchableOpacity>
            
            {AGENT_TEMPLATES.map((template) => {
              const Icon = template.icon === 'Headphones' ? Headphones :
                          template.icon === 'DollarSign' ? DollarSign :
                          template.icon === 'TrendingUp' ? TrendingUp :
                          template.icon === 'Shield' ? Shield :
                          template.icon === 'Users' ? Users :
                          template.icon === 'Cpu' ? Cpu :
                          template.icon === 'Scale' ? Scale :
                          Bot;
              return (
                <TouchableOpacity
                  key={template.id}
                  style={styles.templateCard}
                  onPress={() => {
                    const preset = template.presetData;
                    const presetSkills = (preset.skills as string[] | undefined) || [];
                    setAgentData({
                      ...agentData,
                      agentType: (preset.agentType as AgentType) || 'reactive',
                      skills: SKILL_LIBRARY[template.category]?.filter(s => presetSkills.includes(s.id)) || [],
                      tokenBudget: (preset.tokenBudget as number) || 15000,
                    });
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
      );
    }

    if (activeTab === 'employee') {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 1: Choose Employee Template</Text>
          <Text style={styles.stepSubtitle}>Select a role preset or create custom</Text>
          
          <View style={styles.templatesGrid}>
            {/* AI-Powered Prompt Builder */}
            <TouchableOpacity
              style={[styles.templateCard, styles.templateCardFeatured]}
              onPress={() => {
                setPromptBuilderMode(true);
                setCurrentStep(2);
              }}
            >
              <Brain size={32} color="#fff" />
              <Text style={[styles.templateName, styles.templateNameFeatured]}>✨ AI-Powered Creation</Text>
              <Text style={[styles.templateDesc, styles.templateDescFeatured]}>Just describe what you need - AI builds it for you!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.templateCard}
              onPress={() => {
                setPromptBuilderMode(false);
                setEmployeeData({ ...employeeData, firstName: '', lastName: '' });
              }}
            >
              <User size={32} color="#6366f1" />
              <Text style={styles.templateName}>Custom Employee</Text>
              <Text style={styles.templateDesc}>Build from scratch</Text>
            </TouchableOpacity>
            
            {EMPLOYEE_TEMPLATES.map((template) => {
              const Icon = template.icon === 'Code' ? Code :
                          template.icon === 'ChartBarBig' ? ChartBarBig :
                          template.icon === 'Megaphone' ? Megaphone :
                          template.icon === 'Headphones' ? Headphones :
                          template.icon === 'Users' ? Users :
                          template.icon === 'DollarSign' ? DollarSign :
                          template.icon === 'Shield' ? Shield :
                          template.icon === 'Box' ? Box :
                          User;
              return (
                <TouchableOpacity
                  key={template.id}
                  style={styles.templateCard}
                  onPress={() => {
                    const preset = template.presetData;
                    const presetSkills = (preset.skills as string[] | undefined) || [];
                    setEmployeeData({
                      ...employeeData,
                      level: (preset.level as EmployeeLevel) || 'mid',
                      employmentType: (preset.employmentType as EmploymentType) || 'full_time',
                      skills: (Object.values(EMPLOYEE_SKILL_LIBRARY)
                        .flat()
                        .filter(s => presetSkills.includes(s.id))
                        .map(s => ({ ...s, proficiency: 3 as 1 | 2 | 3 | 4 | 5 })) || []) as EmployeeSkill[],
                      aiWorkloadBalance: (preset.aiWorkloadBalance as number) || 40,
                    });
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
      );
    }

    // Department
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Step 1: Choose Department Source</Text>
        <Text style={styles.stepSubtitle}>Use existing, create custom, or start from template</Text>
        
        {/* Mode Selection */}
        <View style={styles.departmentModeContainer}>
          <TouchableOpacity
            style={[styles.departmentModeCard, departmentMode === 'existing' && styles.departmentModeCardActive]}
            onPress={() => setDepartmentMode('existing')}
          >
            <Building2 size={28} color={departmentMode === 'existing' ? '#6366f1' : '#64748b'} />
            <Text style={[styles.departmentModeTitle, departmentMode === 'existing' && styles.departmentModeTitleActive]}>
              Use Existing
            </Text>
            <Text style={styles.departmentModeDesc}>21 default departments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.departmentModeCard, departmentMode === 'custom' && styles.departmentModeCardActive]}
            onPress={() => setDepartmentMode('custom')}
          >
            <Sparkles size={28} color={departmentMode === 'custom' ? '#6366f1' : '#64748b'} />
            <Text style={[styles.departmentModeTitle, departmentMode === 'custom' && styles.departmentModeTitleActive]}>
              Create Custom
            </Text>
            <Text style={styles.departmentModeDesc}>Build from scratch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.departmentModeCard, departmentMode === 'template' && styles.departmentModeCardActive]}
            onPress={() => setDepartmentMode('template')}
          >
            <Layers size={28} color={departmentMode === 'template' ? '#6366f1' : '#64748b'} />
            <Text style={[styles.departmentModeTitle, departmentMode === 'template' && styles.departmentModeTitleActive]}>
              Use Template
            </Text>
            <Text style={styles.departmentModeDesc}>Specialized presets</Text>
          </TouchableOpacity>
        </View>

        {/* EXISTING DEPARTMENTS */}
        {departmentMode === 'existing' && (
          <>
            <Text style={styles.sectionTitle}>Select from 21 Default Departments</Text>
            <View style={styles.existingDeptsGrid}>
              {DEFAULT_DEPARTMENTS.map((dept) => {
                const isSelected = departmentData.id === dept.id;
                return (
                  <TouchableOpacity
                    key={dept.id}
                    style={[styles.existingDeptCard, isSelected && styles.existingDeptCardSelected]}
                    onPress={() => {
                      setDepartmentData({
                        ...departmentData,
                        id: dept.id,
                        name: dept.name,
                        category: dept.category as any,
                        functions: dept.functions || [],
                        head: dept.head,
                      });
                      handleNext();
                    }}
                  >
                    <Text style={[styles.existingDeptName, isSelected && styles.existingDeptNameSelected]}>
                      {dept.name}
                    </Text>
                    <Text style={styles.existingDeptCategory}>{dept.category}</Text>
                    {dept.head && (
                      <Text style={styles.existingDeptHead}>Head: {dept.head.title}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* CUSTOM DEPARTMENT */}
        {departmentMode === 'custom' && (
          <>
            <Text style={styles.sectionTitle}>Create Custom Department</Text>
            <TouchableOpacity
              style={styles.customDeptCard}
              onPress={() => {
                setDepartmentData({
                  ...departmentData,
                  id: generateDepartmentId('Custom'),
                  name: '',
                  category: 'support',
                  functions: [],
                  agentAllocation: AGENT_ALLOCATION_TEMPLATES.minimal,
                  intelligenceFeatures: { predictive: false, sentiment: false, anomaly: false },
                });
                handleNext();
              }}
            >
              <Sparkles size={40} color="#6366f1" />
              <Text style={styles.customDeptTitle}>Start Building Custom Department</Text>
              <Text style={styles.customDeptDesc}>
                Define your own department functions, KPIs, agent allocation, and leadership structure
              </Text>
              <View style={styles.customDeptFeatures}>
                <Text style={styles.customDeptFeature}>• Custom functions & activities</Text>
                <Text style={styles.customDeptFeature}>• Define your own KPIs</Text>
                <Text style={styles.customDeptFeature}>• Configure agent workforce</Text>
                <Text style={styles.customDeptFeature}>• Set intelligence features</Text>
              </View>
            </TouchableOpacity>
          </>
        )}

        {/* TEMPLATES */}
        {departmentMode === 'template' && (
          <>
            <Text style={styles.sectionTitle}>Specialized Department Templates</Text>
            <View style={styles.templatesGrid}>
              {DEPARTMENT_TEMPLATES.map((template) => {
                const Icon = template.icon === 'Lightbulb' ? Lightbulb :
                            template.icon === 'Users' ? Users :
                            template.icon === 'Leaf' ? Leaf :
                            template.icon === 'RefreshCw' ? RefreshCw :
                            Building2;
                return (
                  <TouchableOpacity
                    key={template.id}
                    style={styles.templateCard}
                    onPress={() => {
                      const deptPreset = template.presetData as Partial<CustomDepartment>;
                      setDepartmentData({
                        ...departmentData,
                        category: deptPreset.category as 'core' | 'support' | 'specialized' | 'regional',
                        functions: deptPreset.functions || [],
                        kpis: deptPreset.kpis || [],
                        agentAllocation: deptPreset.agentAllocation || [],
                        intelligenceFeatures: deptPreset.intelligenceFeatures || { predictive: false, sentiment: false, anomaly: false },
                        head: deptPreset.head,
                      });
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
          </>
        )}
      </View>
    );
  };

  // ============================================
  // ADVANCED AI PROMPT PARSER
  // ============================================

  const INDUSTRIES = {
    healthcare: ['health', 'medical', 'hospital', 'patient', 'doctor', 'clinic', 'pharma', 'medicine'],
    finance: ['bank', 'finance', 'investment', 'trading', 'crypto', 'insurance', 'loan', 'credit'],
    retail: ['retail', 'ecommerce', 'shop', 'store', 'product', 'merchandise', 'cart'],
    manufacturing: ['factory', 'manufacturing', 'production', 'assembly', 'quality control', 'plant'],
    education: ['school', 'education', 'student', 'teacher', 'university', 'course', 'learning'],
    logistics: ['shipping', 'logistics', 'delivery', 'transport', 'freight', 'cargo'],
    hospitality: ['hotel', 'restaurant', 'hospitality', 'booking', 'reservation', 'guest'],
    realestate: ['real estate', 'property', 'rental', 'landlord', 'tenant', 'apartment'],
    legal: ['legal', 'law', 'attorney', 'contract', 'compliance', 'regulation'],
    nonprofit: ['nonprofit', 'ngo', 'charity', 'donation', 'volunteer', 'fundraising'],
  };

  const INTEGRATIONS = {
    slack: ['slack', 'chat', 'message', 'team communication'],
    email: ['email', 'gmail', 'outlook', 'mail'],
    crm: ['salesforce', 'hubspot', 'crm', 'zoho', 'pipedrive'],
    calendar: ['calendar', 'schedule', 'meeting', 'appointment', 'google calendar', 'outlook calendar'],
    database: ['database', 'sql', 'postgres', 'mysql', 'mongodb'],
    api: ['api', 'webhook', 'integration', 'rest api', 'graphql'],
    documents: ['document', 'pdf', 'word', 'google docs', 'sharepoint'],
    spreadsheet: ['spreadsheet', 'excel', 'google sheets', 'csv'],
    social: ['social media', 'twitter', 'facebook', 'linkedin', 'instagram'],
    voice: ['voice', 'phone', 'call', 'twilio', 'voip'],
  };

  const COMPLIANCE_REQUIREMENTS = {
    gdpr: ['gdpr', 'europe', 'eu', 'data privacy', 'personal data'],
    hipaa: ['hipaa', 'health data', 'medical record', 'phi'],
    soc2: ['soc2', 'security compliance', 'audit'],
    pci: ['pci', 'payment', 'credit card', 'transaction'],
    iso: ['iso', 'certification', 'quality standard'],
  };

  const parseAgentPrompt = useCallback((prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // ========== ADVANCED AGENT TYPE DETECTION ==========
    let agentType: AgentType = 'reactive';
    let confidence = 0.7;
    
    const learningKeywords = ['learn', 'smart', 'adapt', 'improve', 'train', 'evolve', 'self-improving', 'ai-powered', 'intelligent', 'smart assistant'];
    const swarmKeywords = ['swarm', 'multiple', 'team', 'coordinator', 'collaborative', 'distributed', 'multi-agent', 'fleet'];
    const reactiveKeywords = ['simple', 'basic', 'quick', 'fast', 'immediate', 'instant', 'automated'];
    
    const learningScore = learningKeywords.filter(k => lowerPrompt.includes(k)).length;
    const swarmScore = swarmKeywords.filter(k => lowerPrompt.includes(k)).length;
    const reactiveScore = reactiveKeywords.filter(k => lowerPrompt.includes(k)).length;
    
    if (swarmScore > learningScore && swarmScore > 0) {
      agentType = 'swarm';
      confidence = 0.85 + (swarmScore * 0.05);
    } else if (learningScore > 0) {
      agentType = 'learning';
      confidence = 0.8 + (learningScore * 0.05);
    } else {
      confidence = 0.6 + (reactiveScore * 0.05);
    }
    confidence = Math.min(confidence, 0.99);

    // ========== INDUSTRY DETECTION ==========
    let detectedIndustry = 'general';
    let industryConfidence = 0;
    
    Object.entries(INDUSTRIES).forEach(([industry, keywords]) => {
      const matches = keywords.filter(k => lowerPrompt.includes(k)).length;
      if (matches > industryConfidence) {
        industryConfidence = matches;
        detectedIndustry = industry;
      }
    });

    // ========== DEPARTMENT DETECTION (Enhanced) ==========
    let category = 'operations';
    let departmentName = 'Operations';
    
    const deptKeywords: Record<string, { name: string; keywords: string[] }> = {
      sales: { name: 'Sales', keywords: ['sales', 'selling', 'revenue', 'deal', 'quota', 'pipeline'] },
      marketing: { name: 'Marketing', keywords: ['marketing', 'campaign', 'brand', 'advertising', 'promotion', 'seo', 'content'] },
      customer_experience: { name: 'Customer Experience', keywords: ['support', 'help', 'service', 'customer', 'ticket', 'complaint', 'feedback'] },
      finance: { name: 'Finance', keywords: ['finance', 'accounting', 'budget', 'invoice', 'payment', 'expense', 'revenue'] },
      security: { name: 'Security', keywords: ['security', 'protect', 'threat', 'risk', 'compliance', 'audit', 'breach'] },
      human_resources: { name: 'Human Resources', keywords: ['hr', 'hiring', 'recruiting', 'payroll', 'benefits', 'performance'] },
      technology: { name: 'Technology', keywords: ['it', 'tech', 'software', 'development', 'coding', 'infrastructure'] },
      data_intelligence: { name: 'Data & Intelligence', keywords: ['data', 'analytics', 'report', 'insight', 'bi', 'dashboard'] },
      operations: { name: 'Operations', keywords: ['operations', 'supply', 'inventory', 'logistics', 'warehouse', 'procurement'] },
    };
    
    let maxDeptScore = 0;
    Object.entries(deptKeywords).forEach(([dept, data]) => {
      const score = data.keywords.filter(k => lowerPrompt.includes(k)).length;
      if (score > maxDeptScore) {
        maxDeptScore = score;
        category = dept;
        departmentName = data.name;
      }
    });

    // ========== ADVANCED SKILL DETECTION ==========
    const skills: any[] = [];
    const skillKeywords: Record<string, string[]> = {
      // Customer Experience
      'cx_1': ['support', 'help', 'ticket', 'customer', 'inquiry', 'assistance'],
      'cx_2': ['email', 'chat', 'communication', 'messaging', 'whatsapp'],
      'cx_3': ['feedback', 'survey', 'review', 'rating', 'satisfaction', 'nps'],
      'cx_4': ['escalation', 'urgent', 'priority', 'critical', 'complaint'],
      // Sales
      'sales_1': ['lead', 'prospect', 'qualify', 'opportunity', 'outreach'],
      'sales_2': ['crm', 'salesforce', 'hubspot', 'zoho', 'pipedrive', 'contact'],
      'sales_3': ['demo', 'presentation', 'pitch', 'proposal', 'quote'],
      'sales_4': ['negotiation', 'contract', 'closing', 'deal', 'agreement'],
      'sales_5': ['forecast', 'pipeline', 'predict', 'revenue', 'quota'],
      // Marketing
      'mkt_1': ['campaign', 'marketing', 'ad', 'advertising', 'promotion'],
      'mkt_2': ['content', 'blog', 'article', 'write', 'copy', 'seo'],
      'mkt_3': ['social', 'twitter', 'linkedin', 'facebook', 'instagram', 'post'],
      'mkt_4': ['event', 'webinar', 'conference', 'trade show', 'expo'],
      'mkt_5': ['seo', 'search', 'google', 'ranking', 'keyword', 'organic'],
      'mkt_6': ['analytics', 'tracking', 'metric', 'kpi', 'performance'],
      // Finance
      'fin_1': ['report', 'financial', 'statement', 'balance', 'income'],
      'fin_2': ['forecast', 'budget', 'projection', 'planning', 'estimate'],
      'fin_3': ['audit', 'compliance', 'regulatory', 'sox', 'gaap'],
      'fin_4': ['expense', 'reimbursement', 'spend', 'cost', 'invoice'],
      'fin_5': ['tax', 'vat', 'gst', 'filing', 'compliance'],
      'fin_6': ['investment', 'portfolio', 'asset', 'allocation', 'return'],
      // Security
      'sec_1': ['monitor', 'watch', 'detect', 'surveillance', 'observe'],
      'sec_2': ['incident', 'response', 'breach', 'emergency', 'crisis'],
      'sec_3': ['vulnerability', 'scan', 'assessment', 'penetration', 'test'],
      'sec_4': ['threat', 'attack', 'virus', 'malware', 'phishing', 'ransomware'],
      'sec_5': ['compliance', 'policy', 'standard', 'framework', 'certification'],
      // Technology
      'tech_1': ['development', 'code', 'program', 'software', 'application'],
      'tech_2': ['testing', 'qa', 'quality', 'bug', 'defect', 'automation'],
      'tech_3': ['deploy', 'release', 'ci/cd', 'pipeline', 'devops'],
      'tech_4': ['monitor', 'uptime', 'performance', 'latency', 'alert'],
      'tech_5': ['cloud', 'aws', 'azure', 'gcp', 'infrastructure', 'server'],
      'tech_6': ['security', 'vulnerability', 'patch', 'update', 'hardening'],
      // Data Intelligence
      'data_1': ['analyze', 'insight', 'pattern', 'trend', 'correlation'],
      'data_2': ['visualization', 'chart', 'graph', 'dashboard', 'reporting'],
      'data_3': ['clean', 'transform', 'preprocess', 'etl', 'pipeline'],
      'data_4': ['predict', 'forecast', 'model', 'machine learning', 'ml', 'ai'],
      'data_5': ['query', 'sql', 'database', 'extract', 'warehouse'],
      // Operations
      'ops_1': ['planning', 'schedule', 'timeline', 'milestone', 'coordination'],
      'ops_2': ['resource', 'allocate', 'optimize', 'capacity', 'workload'],
      'ops_3': ['process', 'workflow', 'automation', 'efficiency', 'bottleneck'],
      'ops_4': ['supply', 'chain', 'inventory', 'warehouse', 'logistic', 'procurement', 'vendor'],
      'ops_5': ['quality', 'control', 'assurance', 'qc', 'qa', 'standard'],
    };

    Object.entries(skillKeywords).forEach(([skillId, keywords]) => {
      const matches = keywords.filter(k => lowerPrompt.includes(k)).length;
      if (matches > 0) {
        const allSkills = Object.values(SKILL_LIBRARY).flat();
        const skill = allSkills.find(s => s.id === skillId);
        if (skill && !skills.find(s => s.id === skillId)) {
          skills.push({ ...skill, relevance: matches });
        }
      }
    });

    // Sort by relevance and limit
    skills.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
    const finalSkills = skills.slice(0, 6).map(s => ({ id: s.id, name: s.name, category: s.category }));

    // Add default skills if none detected
    if (finalSkills.length === 0) {
      const defaultSkills = SKILL_LIBRARY[category as keyof typeof SKILL_LIBRARY];
      if (defaultSkills) {
        finalSkills.push(...defaultSkills.slice(0, 3));
      }
    }

    // ========== INTEGRATION DETECTION ==========
    const detectedIntegrations: string[] = [];
    Object.entries(INTEGRATIONS).forEach(([integration, keywords]) => {
      if (keywords.some(k => lowerPrompt.includes(k))) {
        detectedIntegrations.push(integration);
      }
    });

    // ========== COMPLIANCE DETECTION ==========
    const detectedCompliance: string[] = [];
    Object.entries(COMPLIANCE_REQUIREMENTS).forEach(([compliance, keywords]) => {
      if (keywords.some(k => lowerPrompt.includes(k))) {
        detectedCompliance.push(compliance);
      }
    });

    // ========== WORKFLOW PATTERN DETECTION ==========
    const workflowPatterns: string[] = [];
    if (lowerPrompt.includes('approval') || lowerPrompt.includes('approve') || lowerPrompt.includes('authorize')) {
      workflowPatterns.push('approval_chain');
    }
    if (lowerPrompt.includes('escalation') || lowerPrompt.includes('escalate') || lowerPrompt.includes('manager')) {
      workflowPatterns.push('escalation');
    }
    if (lowerPrompt.includes('notification') || lowerPrompt.includes('alert') || lowerPrompt.includes('notify')) {
      workflowPatterns.push('notifications');
    }
    if (lowerPrompt.includes('schedule') || lowerPrompt.includes('recurring') || lowerPrompt.includes('daily') || lowerPrompt.includes('weekly')) {
      workflowPatterns.push('scheduled_tasks');
    }
    if (lowerPrompt.includes('multi-step') || lowerPrompt.includes('workflow') || lowerPrompt.includes('process')) {
      workflowPatterns.push('multi_step');
    }

    // ========== INTELLIGENCE FEATURES (Enhanced) ==========
    const intelligenceFeatures: IntelligenceFeature[] = [];
    
    if (lowerPrompt.includes('predict') || lowerPrompt.includes('forecast') || lowerPrompt.includes('future') || lowerPrompt.includes('anticipate')) {
      const feature = INTELLIGENCE_FEATURES.find(f => f.id === 'predictive');
      if (feature) intelligenceFeatures.push({ ...feature, enabled: true });
    }
    if (lowerPrompt.includes('sentiment') || lowerPrompt.includes('emotion') || lowerPrompt.includes('feel') || lowerPrompt.includes('tone') || lowerPrompt.includes('mood')) {
      const feature = INTELLIGENCE_FEATURES.find(f => f.id === 'sentiment');
      if (feature) intelligenceFeatures.push({ ...feature, enabled: true });
    }
    if (lowerPrompt.includes('anomaly') || lowerPrompt.includes('fraud') || lowerPrompt.includes('detect') || lowerPrompt.includes('unusual') || lowerPrompt.includes('outlier')) {
      const feature = INTELLIGENCE_FEATURES.find(f => f.id === 'anomaly');
      if (feature) intelligenceFeatures.push({ ...feature, enabled: true });
    }
    if (lowerPrompt.includes('reason') || lowerPrompt.includes('explain') || lowerPrompt.includes('why') || lowerPrompt.includes('logic')) {
      const feature = INTELLIGENCE_FEATURES.find(f => f.id === 'reasoning');
      if (feature) intelligenceFeatures.push({ ...feature, enabled: true });
    }
    if (lowerPrompt.includes('memory') || lowerPrompt.includes('remember') || lowerPrompt.includes('context') || lowerPrompt.includes('history')) {
      const feature = INTELLIGENCE_FEATURES.find(f => f.id === 'memory');
      if (feature) intelligenceFeatures.push({ ...feature, enabled: true });
    }

    // ========== ADVANCED TOKEN BUDGET CALCULATION ==========
    let tokenBudget = 15000;
    let complexityScore = 0;
    
    // Base complexity
    if (lowerPrompt.includes('complex') || lowerPrompt.includes('advanced') || lowerPrompt.includes('enterprise')) {
      tokenBudget = 50000;
      complexityScore = 3;
    } else if (lowerPrompt.includes('moderate') || lowerPrompt.includes('medium') || lowerPrompt.includes('standard')) {
      tokenBudget = 25000;
      complexityScore = 2;
    } else if (lowerPrompt.includes('simple') || lowerPrompt.includes('basic') || lowerPrompt.includes('light')) {
      tokenBudget = 10000;
      complexityScore = 1;
    }
    
    // Adjust for features
    if (intelligenceFeatures.length > 1) tokenBudget += 10000;
    if (intelligenceFeatures.length > 2) tokenBudget += 5000;
    
    // Adjust for integrations
    tokenBudget += detectedIntegrations.length * 2000;
    
    // Adjust for workflow complexity
    tokenBudget += workflowPatterns.length * 3000;
    
    // Cap at reasonable maximum
    tokenBudget = Math.min(tokenBudget, 100000);

    // ========== PERFORMANCE PREDICTION ==========
    const performanceScore = Math.min(
      95,
      60 + 
      (intelligenceFeatures.length * 8) + 
      (finalSkills.length * 3) +
      (confidence * 10)
    );
    
    const estimatedEfficiency = Math.round(
      40 + 
      (intelligenceFeatures.length * 10) + 
      (workflowPatterns.length * 5) +
      (detectedIntegrations.length * 3)
    );

    // ========== COST OPTIMIZATION SUGGESTIONS ==========
    const costSuggestions: string[] = [];
    if (tokenBudget > 40000 && intelligenceFeatures.length < 2) {
      costSuggestions.push('Consider adding intelligence features to maximize value');
    }
    if (tokenBudget > 30000 && finalSkills.length < 3) {
      costSuggestions.push('Add more skills to utilize budget effectively');
    }
    if (intelligenceFeatures.length > 3) {
      costSuggestions.push('High intelligence overhead - consider removing unused features');
    }
    if (detectedIntegrations.length > 5) {
      costSuggestions.push('Many integrations - consolidate if possible to reduce costs');
    }

    // ========== RISK ASSESSMENT ==========
    const risks: { level: 'low' | 'medium' | 'high'; description: string }[] = [];
    
    if (detectedCompliance.includes('hipaa') || detectedCompliance.includes('gdpr')) {
      risks.push({ level: 'high', description: 'Compliance requirements need strict data handling' });
    }
    if (intelligenceFeatures.length > 3) {
      risks.push({ level: 'medium', description: 'High AI complexity may require more training data' });
    }
    if (agentType === 'swarm') {
      risks.push({ level: 'medium', description: 'Swarm agents require orchestration infrastructure' });
    }
    if (detectedIntegrations.length > 7) {
      risks.push({ level: 'high', description: 'Integration complexity may cause reliability issues' });
    }
    if (workflowPatterns.includes('approval_chain') && workflowPatterns.includes('escalation')) {
      risks.push({ level: 'low', description: 'Multiple workflows - ensure clear handoff rules' });
    }

    // ========== ADVANCED NAME GENERATION ==========
    const industryPrefixes: Record<string, string[]> = {
      healthcare: ['Medical', 'Health', 'Clinical', 'Care'],
      finance: ['Finance', 'Wealth', 'Capital', 'Trading'],
      retail: ['Retail', 'Commerce', 'Store', 'Shop'],
      manufacturing: ['Factory', 'Production', 'Assembly', 'Industrial'],
      logistics: ['Logistics', 'Supply', 'Freight', 'Cargo'],
      general: ['Smart', 'Intelligent', 'Advanced', 'Pro'],
    };
    
    const prefixes = industryPrefixes[detectedIndustry] || industryPrefixes.general;
    const suffixes = ['Assistant', 'Bot', 'Agent', 'Manager', 'Specialist', 'AI'];
    
    const suggestedName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${departmentName.split(' ')[0]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;

    return {
      agentType,
      category,
      departmentId: category,
      departmentName,
      skills: finalSkills,
      intelligenceFeatures,
      tokenBudget,
      suggestedName,
      suggestedRole: `${departmentName} ${detectedIndustry !== 'general' ? `[${detectedIndustry.toUpperCase()}]` : ''} Specialist`,
      
      // Advanced metadata
      industry: detectedIndustry,
      industryConfidence,
      integrations: detectedIntegrations,
      compliance: detectedCompliance,
      workflowPatterns,
      performanceScore,
      estimatedEfficiency,
      complexityScore,
      confidence,
      costSuggestions,
      risks,
    };
  }, []);

  const handleGenerateFromPrompt = useCallback(() => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing (in real app, this would call an AI API)
    setTimeout(() => {
      const config = parseAgentPrompt(aiPrompt);
      setAiGeneratedConfig(config);
      
      // Auto-fill the agent data
      setAgentData({
        ...agentData,
        name: config.suggestedName,
        role: config.suggestedRole,
        agentType: config.agentType,
        departmentId: config.departmentId,
        departmentName: config.departmentName,
        skills: config.skills,
        intelligenceFeatures: config.intelligenceFeatures,
        tokenBudget: config.tokenBudget,
      });
      
      setIsGenerating(false);
    }, 1500);
  }, [aiPrompt, agentData, parseAgentPrompt]);

  const handleApplyGeneratedConfig = useCallback(() => {
    setPromptBuilderMode(false);
    setCurrentStep(3);
  }, []);

  // ============================================
  // STEP 2: BASIC INFO & CONFIGURATION
  // ============================================

  const renderStep2 = () => {
    // AI Prompt Builder Mode
    if (promptBuilderMode && activeTab === 'agent') {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>✨ AI-Powered Agent Creation</Text>
          <Text style={styles.stepSubtitle}>Describe what you need in plain English</Text>

          {/* Prompt Input */}
          <View style={styles.promptCard}>
            <Text style={styles.promptLabel}>What do you want your AI agent to do?</Text>
            <TextInput
              style={styles.promptInput}
              multiline
              numberOfLines={4}
              placeholder="Example: I need a supply chain manager that tracks inventory, predicts demand, and optimizes shipping routes. It should learn from past data and alert me about any delays."
              value={aiPrompt}
              onChangeText={setAiPrompt}
              textAlignVertical="top"
            />
            
            <TouchableOpacity
              style={[styles.generateButton, (!aiPrompt.trim() || isGenerating) && styles.generateButtonDisabled]}
              onPress={handleGenerateFromPrompt}
              disabled={!aiPrompt.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Sparkles size={20} color="#fff" />
                  <Text style={styles.generateButtonText}>AI is thinking...</Text>
                </>
              ) : (
                <>
                  <Brain size={20} color="#fff" />
                  <Text style={styles.generateButtonText}>Generate Agent</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Example Prompts */}
          {!aiGeneratedConfig && (
            <View style={styles.examplesCard}>
              <Text style={styles.examplesTitle}>💡 Try these examples:</Text>
              {[
                "Customer support bot that handles refunds and tracks tickets",
                "Sales assistant that qualifies leads and schedules meetings",
                "Security guardian that monitors threats and sends alerts",
                "Marketing analyst that tracks campaigns and predicts trends",
              ].map((example, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.exampleChip}
                  onPress={() => setAiPrompt(example)}
                >
                  <Text style={styles.exampleText}>{example}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Generated Configuration Preview - ADVANCED */}
          {aiGeneratedConfig && (
            <View style={styles.generatedConfigCard}>
              <View style={styles.generatedHeader}>
                <Check size={24} color="#10b981" />
                <Text style={styles.generatedTitle}>🎉 AI-Generated Configuration</Text>
              </View>

              {/* Performance Score */}
              <View style={styles.performanceCard}>
                <View style={styles.performanceRow}>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>Performance Score</Text>
                    <Text style={[styles.performanceValue, { color: aiGeneratedConfig.performanceScore > 80 ? '#10b981' : aiGeneratedConfig.performanceScore > 60 ? '#f59e0b' : '#ef4444' }]}>
                      {aiGeneratedConfig.performanceScore}%
                    </Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>Efficiency Boost</Text>
                    <Text style={styles.performanceValue}>{aiGeneratedConfig.estimatedEfficiency}%</Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Text style={styles.performanceLabel}>AI Confidence</Text>
                    <Text style={styles.performanceValue}>{Math.round(aiGeneratedConfig.confidence * 100)}%</Text>
                  </View>
                </View>
              </View>

              {/* Basic Info */}
              <View style={styles.generatedSection}>
                <Text style={styles.generatedLabel}>🤖 Agent Name</Text>
                <Text style={styles.generatedValue}>{aiGeneratedConfig.suggestedName}</Text>
              </View>

              {/* Industry & Department */}
              <View style={styles.generatedRow}>
                <View style={styles.generatedHalf}>
                  <Text style={styles.generatedLabel}>🏭 Industry</Text>
                  <Text style={styles.generatedValue}>{aiGeneratedConfig.industry.charAt(0).toUpperCase() + aiGeneratedConfig.industry.slice(1)}</Text>
                </View>
                <View style={styles.generatedHalf}>
                  <Text style={styles.generatedLabel}>🏢 Department</Text>
                  <Text style={styles.generatedValue}>{aiGeneratedConfig.departmentName}</Text>
                </View>
              </View>

              <View style={styles.generatedSection}>
                <Text style={styles.generatedLabel}>📋 Type</Text>
                <Text style={styles.generatedValue}>{aiGeneratedConfig.agentType} Agent (Complexity: {aiGeneratedConfig.complexityScore}/3)</Text>
              </View>

              {/* Skills */}
              <View style={styles.generatedSection}>
                <Text style={styles.generatedLabel}>🎯 Skills ({aiGeneratedConfig.skills.length})</Text>
                <View style={styles.generatedSkills}>
                  {aiGeneratedConfig.skills.map((skill: any) => (
                    <View key={skill.id} style={styles.generatedSkillChip}>
                      <Text style={styles.generatedSkillText}>{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Intelligence Features */}
              {aiGeneratedConfig.intelligenceFeatures.length > 0 && (
                <View style={styles.generatedSection}>
                  <Text style={styles.generatedLabel}>🧠 Intelligence Features</Text>
                  <View style={styles.generatedFeatures}>
                    {aiGeneratedConfig.intelligenceFeatures.map((feature: any) => (
                      <View key={feature.id} style={styles.generatedFeatureChip}>
                        <Text style={styles.generatedFeatureText}>{feature.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Integrations */}
              {aiGeneratedConfig.integrations.length > 0 && (
                <View style={styles.generatedSection}>
                  <Text style={styles.generatedLabel}>🔗 Integrations ({aiGeneratedConfig.integrations.length})</Text>
                  <View style={styles.generatedFeatures}>
                    {aiGeneratedConfig.integrations.map((integration: string) => (
                      <View key={integration} style={styles.integrationChip}>
                        <Text style={styles.integrationText}>{integration.charAt(0).toUpperCase() + integration.slice(1)}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Workflow Patterns */}
              {aiGeneratedConfig.workflowPatterns.length > 0 && (
                <View style={styles.generatedSection}>
                  <Text style={styles.generatedLabel}>⚡ Workflow Patterns</Text>
                  <View style={styles.generatedFeatures}>
                    {aiGeneratedConfig.workflowPatterns.map((pattern: string) => (
                      <View key={pattern} style={styles.workflowChip}>
                        <Text style={styles.workflowText}>{pattern.replace('_', ' ').toUpperCase()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Compliance */}
              {aiGeneratedConfig.compliance.length > 0 && (
                <View style={[styles.generatedSection, styles.complianceSection]}>
                  <Text style={styles.generatedLabel}>⚠️ Compliance Requirements</Text>
                  <View style={styles.complianceList}>
                    {aiGeneratedConfig.compliance.map((item: string) => (
                      <View key={item} style={styles.complianceItem}>
                        <Shield size={16} color="#ef4444" />
                        <Text style={styles.complianceText}>{item.toUpperCase()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Budget & Cost */}
              <View style={styles.budgetSection}>
                <Text style={styles.generatedLabel}>💰 Monthly Budget</Text>
                <Text style={styles.budgetValue}>{aiGeneratedConfig.tokenBudget.toLocaleString()} tokens</Text>
                <Text style={styles.budgetEstimate}>~${(aiGeneratedConfig.tokenBudget / 1000).toFixed(0)}K/month</Text>
              </View>

              {/* Cost Optimization Suggestions */}
              {aiGeneratedConfig.costSuggestions.length > 0 && (
                <View style={styles.suggestionsSection}>
                  <Text style={styles.suggestionsTitle}>💡 Cost Optimization Tips</Text>
                  {aiGeneratedConfig.costSuggestions.map((suggestion: string, idx: number) => (
                    <View key={idx} style={styles.suggestionItem}>
                      <TrendingDown size={16} color="#10b981" />
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Risk Assessment */}
              {aiGeneratedConfig.risks.length > 0 && (
                <View style={styles.riskSection}>
                  <Text style={styles.riskTitle}>⚠️ Risk Assessment</Text>
                  {aiGeneratedConfig.risks.map((risk: any, idx: number) => (
                    <View key={idx} style={[styles.riskItem, risk.level === 'high' ? styles.riskHigh : risk.level === 'medium' ? styles.riskMedium : styles.riskLow]}>
                      <CircleAlert size={16} color={risk.level === 'high' ? '#ef4444' : risk.level === 'medium' ? '#f59e0b' : '#10b981'} />
                      <Text style={[styles.riskText, { color: risk.level === 'high' ? '#ef4444' : risk.level === 'medium' ? '#f59e0b' : '#10b981' }]}>
                        {risk.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyGeneratedConfig}
                >
                  <Text style={styles.applyButtonText}>✓ Use This Configuration →</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.modifyButton}
                  onPress={() => setAiGeneratedConfig(null)}
                >
                  <Text style={styles.modifyButtonText}>✎ Modify Prompt</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      );
    }

    // Normal Step 2 - Agent Configuration
    if (activeTab === 'agent') {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 2: Agent Configuration</Text>
          
          {/* Agent Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Agent Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Support Bot Alpha"
              value={agentData.name}
              onChangeText={(text) => setAgentData({ ...agentData, name: text })}
            />
          </View>

          {/* Agent Type */}
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

          {/* Token Budget */}
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
      );
    }

    if (activeTab === 'employee') {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 2: Employee Information</Text>
          
          {/* Name */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John"
                value={employeeData.firstName}
                onChangeText={(text) => setEmployeeData({ ...employeeData, firstName: text })}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                value={employeeData.lastName}
                onChangeText={(text) => setEmployeeData({ ...employeeData, lastName: text })}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john.doe@company.com"
              keyboardType="email-address"
              value={employeeData.email}
              onChangeText={(text) => setEmployeeData({ ...employeeData, email: text })}
            />
          </View>

          {/* Level */}
          <Text style={styles.sectionTitle}>Employee Level</Text>
          <View style={styles.levelGrid}>
            {EMPLOYEE_LEVELS.map((level) => {
              const isSelected = employeeData.level === level.id;
              return (
                <TouchableOpacity
                  key={level.id}
                  style={[styles.levelCard, isSelected && styles.levelCardSelected]}
                  onPress={() => setEmployeeData({ ...employeeData, level: level.id })}
                >
                  <Text style={[styles.levelLabel, isSelected && styles.levelLabelSelected]}>
                    {level.label}
                  </Text>
                  <Text style={styles.levelDesc}>{level.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Employment Type */}
          <Text style={styles.sectionTitle}>Employment Type</Text>
          <View style={styles.employmentGrid}>
            {EMPLOYMENT_TYPES.map((type) => {
              const isSelected = employeeData.employmentType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.employmentCard, isSelected && styles.employmentCardSelected]}
                  onPress={() => setEmployeeData({ ...employeeData, employmentType: type.id })}
                >
                  <Text style={[styles.employmentLabel, isSelected && styles.employmentLabelSelected]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }

    // Department
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Step 2: Department Configuration</Text>
        
        {/* Department Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Digital Transformation Office"
            value={departmentData.name}
            onChangeText={(text) => setDepartmentData({ ...departmentData, name: text })}
          />
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>Department Category</Text>
        <View style={styles.categoryGrid}>
          {DEPARTMENT_CATEGORIES.map((cat) => {
            const Icon = cat.icon === 'Target' ? Target :
                        cat.icon === 'Settings' ? Settings :
                        cat.icon === 'Sparkles' ? Sparkles :
                        MapPin;
            const isSelected = departmentData.category === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                onPress={() => setDepartmentData({ ...departmentData, category: cat.id as any })}
              >
                <Icon size={24} color={isSelected ? '#6366f1' : '#64748b'} />
                <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
                  {cat.name}
                </Text>
                <Text style={styles.categoryDesc}>{cat.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Functions */}
        <Text style={styles.sectionTitle}>Department Functions</Text>
        {departmentData.category && DEPARTMENT_FUNCTION_TEMPLATES[departmentData.category]?.map((func) => (
          <TouchableOpacity
            key={func.id}
            style={[
              styles.functionItem,
              departmentData.functions?.some(f => f.id === func.id) && styles.functionItemSelected
            ]}
            onPress={() => {
              const current = departmentData.functions || [];
              const exists = current.some(f => f.id === func.id);
              const updated = exists
                ? current.filter(f => f.id !== func.id)
                : [...current, func];
              setDepartmentData({ ...departmentData, functions: updated });
            }}
          >
            <View style={styles.functionCheckbox}>
              {departmentData.functions?.some(f => f.id === func.id) && (
                <Check size={16} color="#6366f1" />
              )}
            </View>
            <View style={styles.functionContent}>
              <Text style={styles.functionName}>{func.name}</Text>
              <Text style={styles.functionDesc}>{func.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // ============================================
  // STEP 3: SKILLS & INTELLIGENCE
  // ============================================

  const renderStep3 = () => {
    if (activeTab === 'agent') {
      const availableSkills = Object.values(SKILL_LIBRARY).flat();
      
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 3: Skills & Intelligence</Text>
          
          {/* Skills */}
          <Text style={styles.sectionTitle}>Agent Skills ({agentData.skills?.length || 0} selected)</Text>
          <View style={styles.skillsContainer}>
            {availableSkills.map((skill) => {
              const isSelected = agentData.skills?.some(s => s.id === skill.id);
              return (
                <TouchableOpacity
                  key={skill.id}
                  style={[styles.skillChip, isSelected && styles.skillChipSelected]}
                  onPress={() => {
                    const current = agentData.skills || [];
                    const updated = isSelected
                      ? current.filter(s => s.id !== skill.id)
                      : [...current, skill];
                    setAgentData({ ...agentData, skills: updated });
                  }}
                >
                  <Text style={[styles.skillText, isSelected && styles.skillTextSelected]}>
                    {skill.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Intelligence Features */}
          <Text style={styles.sectionTitle}>Intelligence Layer Features</Text>
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
      );
    }

    if (activeTab === 'employee') {
      const allSkills = Object.values(EMPLOYEE_SKILL_LIBRARY).flat();
      
      return (
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Step 3: Skills & AI Collaboration</Text>
          
          {/* Skills */}
          <Text style={styles.sectionTitle}>Employee Skills ({employeeData.skills?.length || 0} selected)</Text>
          <View style={styles.skillsContainer}>
            {allSkills.map((skill) => {
              const isSelected = employeeData.skills?.some(s => s.id === skill.id);
              return (
                <TouchableOpacity
                  key={skill.id}
                  style={[styles.skillChip, isSelected && styles.skillChipSelected]}
                  onPress={() => {
                    const current = employeeData.skills || [];
                    const updated = isSelected
                      ? current.filter(s => s.id !== skill.id)
                      : [...current, { ...skill, proficiency: 3 as 1 | 2 | 3 | 4 | 5 }];
                    setEmployeeData({ ...employeeData, skills: updated });
                  }}
                >
                  <Text style={[styles.skillText, isSelected && styles.skillTextSelected]}>
                    {skill.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* AI Workload Balance */}
          <Text style={styles.sectionTitle}>AI Collaboration Level</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>
              {employeeData.aiWorkloadBalance}% AI-assisted
            </Text>
            <View style={styles.balanceBar}>
              <View 
                style={[styles.balanceFill, { width: `${employeeData.aiWorkloadBalance || 0}%` }]} 
              />
            </View>
            <View style={styles.balanceButtons}>
              <TouchableOpacity
                style={styles.balanceButton}
                onPress={() => setEmployeeData({ ...employeeData, aiWorkloadBalance: Math.max(0, (employeeData.aiWorkloadBalance || 40) - 10) })}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.balanceButton}
                onPress={() => setEmployeeData({ ...employeeData, aiWorkloadBalance: Math.min(100, (employeeData.aiWorkloadBalance || 40) + 10) })}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    // Department - Agent Allocation
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Step 3: Agent Allocation & KPIs</Text>
        
        {/* Quick Presets */}
        <Text style={styles.sectionTitle}>Allocation Presets</Text>
        <View style={styles.presetRow}>
          {Object.entries(AGENT_ALLOCATION_TEMPLATES).map(([key, allocation]) => (
            <TouchableOpacity
              key={key}
              style={styles.presetButton}
              onPress={() => setDepartmentData({ ...departmentData, agentAllocation: allocation })}
            >
              <Text style={styles.presetButtonText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Agent Counts */}
        <Text style={styles.sectionTitle}>Agent Counts</Text>
        {AGENT_TYPES.map((type) => {
          const allocation = departmentData.agentAllocation?.find(a => a.agentType === type.id);
          const count = allocation?.count || 0;
          return (
            <View key={type.id} style={styles.agentCountRow}>
              <View style={styles.agentCountInfo}>
                <Text style={styles.agentCountName}>{type.name}</Text>
                <Text style={styles.agentCountDesc}>{type.description}</Text>
              </View>
              <View style={styles.agentCountControls}>
                <TouchableOpacity
                  style={styles.countButton}
                  onPress={() => {
                    const current = departmentData.agentAllocation || [];
                    const existing = current.find(a => a.agentType === type.id);
                    const updated = existing
                      ? current.map(a => a.agentType === type.id ? { ...a, count: Math.max(0, a.count - 1) } : a)
                      : current;
                    setDepartmentData({ ...departmentData, agentAllocation: updated.filter(a => a.count > 0) });
                  }}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.countValue}>{count}</Text>
                <TouchableOpacity
                  style={styles.countButton}
                  onPress={() => {
                    const current = departmentData.agentAllocation || [];
                    const existing = current.find(a => a.agentType === type.id);
                    const updated = existing
                      ? current.map(a => a.agentType === type.id ? { ...a, count: a.count + 1 } : a)
                      : [...current, { agentType: type.id, count: 1, purpose: type.useCases[0] }];
                    setDepartmentData({ ...departmentData, agentAllocation: updated });
                  }}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* Intelligence Features */}
        <Text style={styles.sectionTitle}>Department Intelligence Features</Text>
        {(() => {
          const features = departmentData.intelligenceFeatures || { predictive: false, sentiment: false, anomaly: false };
          return Object.entries(features).map(([key, enabled]) => {
          const labels: Record<string, string> = {
            predictive: 'Predictive Engine',
            sentiment: 'Sentiment Core',
            anomaly: 'Anomaly Detector',
          };
          return (
            <View key={key} style={styles.intelligenceToggle}>
              <Text style={styles.intelligenceToggleLabel}>{labels[key]}</Text>
              <Switch
                value={enabled}
                onValueChange={(value) => {
                  setDepartmentData({
                    ...departmentData,
                    intelligenceFeatures: {
                      ...(departmentData.intelligenceFeatures || { predictive: false, sentiment: false, anomaly: false }),
                      [key]: value,
                    },
                  });
                }}
                trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
                thumbColor={enabled ? '#6366f1' : '#94a3b8'}
              />
            </View>
          );
        })})()}
      </View>
    );
  };

  // ============================================
  // STEP 4: HIERARCHY & REVIEW
  // ============================================

  const renderStep4 = () => {
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Step 4: Hierarchy & Review</Text>
        
        {/* Hierarchy Preview */}
        <View style={styles.hierarchyCard}>
          <Text style={styles.hierarchyTitle}>7-Tier Hierarchy Position</Text>
          
          <View style={styles.hierarchyChain}>
            {/* Tier 1: C-Suite */}
            <View style={styles.hierarchyItem}>
              <Crown size={20} color="#f59e0b" />
              <Text style={styles.hierarchyLevel}>Tier 1: C-Suite</Text>
              <Text style={styles.hierarchyRole}>
                {activeTab === 'agent' ? 'CDAO / CAO' : activeTab === 'employee' ? 'CHRO' : 'CEO'}
              </Text>
            </View>
            <View style={styles.hierarchyLine} />
            
            {/* Tier 4: Command Center */}
            <View style={styles.hierarchyItem}>
              <Layers size={20} color="#6366f1" />
              <Text style={styles.hierarchyLevel}>Tier 4: Command Center</Text>
              <Text style={styles.hierarchyRole}>CDOO → WOL → AOD</Text>
            </View>
            <View style={styles.hierarchyLine} />
            
            {/* Tier 5: Department */}
            <View style={styles.hierarchyItem}>
              <Building2 size={20} color="#10b981" />
              <Text style={styles.hierarchyLevel}>Tier 5: Department</Text>
              <Text style={styles.hierarchyRole}>
                {activeTab === 'department' ? departmentData.name || 'New Department' : 'Assigned Department'}
              </Text>
            </View>
            
            {activeTab !== 'department' && (
              <>
                <View style={styles.hierarchyLine} />
                {/* Tier 6: Agent/Employee */}
                <View style={styles.hierarchyItem}>
                  {activeTab === 'agent' ? <Bot size={20} color="#ec4899" /> : <User size={20} color="#ec4899" />}
                  <Text style={styles.hierarchyLevel}>Tier 6: Workforce</Text>
                  <Text style={styles.hierarchyRole}>
                    {activeTab === 'agent' ? agentData.name || 'New Agent' : 
                     `${employeeData.firstName || ''} ${employeeData.lastName || ''}` || 'New Employee'}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Configuration Summary</Text>
          
          {activeTab === 'agent' && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>{agentData.name || 'Not set'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Type:</Text>
                <Text style={styles.summaryValue}>{agentData.agentType}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Skills:</Text>
                <Text style={styles.summaryValue}>{agentData.skills?.length || 0} selected</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Token Budget:</Text>
                <Text style={styles.summaryValue}>{agentData.tokenBudget?.toLocaleString()}/month</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Intelligence:</Text>
                <Text style={styles.summaryValue}>
                  {agentData.intelligenceFeatures?.filter(f => f.enabled).length || 0} features
                </Text>
              </View>
            </>
          )}
          
          {activeTab === 'employee' && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>
                  {employeeData.firstName || ''} {employeeData.lastName || ''}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Level:</Text>
                <Text style={styles.summaryValue}>{employeeData.level}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Type:</Text>
                <Text style={styles.summaryValue}>{employeeData.employmentType}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Skills:</Text>
                <Text style={styles.summaryValue}>{employeeData.skills?.length || 0} selected</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>AI Collaboration:</Text>
                <Text style={styles.summaryValue}>{employeeData.aiWorkloadBalance}%</Text>
              </View>
            </>
          )}
          
          {activeTab === 'department' && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>{departmentData.name || 'Not set'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Category:</Text>
                <Text style={styles.summaryValue}>{departmentData.category}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Functions:</Text>
                <Text style={styles.summaryValue}>{departmentData.functions?.length || 0}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Agents:</Text>
                <Text style={styles.summaryValue}>
                  {departmentData.agentAllocation?.reduce((sum, a) => sum + a.count, 0) || 0} total
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Intelligence:</Text>
                <Text style={styles.summaryValue}>
                  {Object.values(departmentData.intelligenceFeatures || {}).filter(Boolean).length} features
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Cost Breakdown */}
        {activeTab === 'agent' && (
          <View style={styles.costCard}>
            <View style={styles.costHeader}>
              <Calculator size={24} color="#6366f1" />
              <Text style={styles.costTitle}>Cost Breakdown</Text>
            </View>
            {(() => {
              const cost = getAgentCost();
              return (
                <>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Base Cost (Tokens)</Text>
                    <Text style={styles.costValue}>${cost.baseCost.toFixed(2)}</Text>
                  </View>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Intelligence Features</Text>
                    <Text style={styles.costValue}>${cost.intelligenceCost.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.costRow, styles.costRowTotal]}>
                    <Text style={styles.costLabelTotal}>Total Monthly</Text>
                    <Text style={styles.costValueTotal}>{cost.monthlyCostFormatted}</Text>
                  </View>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Cost per Request</Text>
                    <Text style={styles.costValue}>{cost.costPerRequest}</Text>
                  </View>
                </>
              );
            })()}
          </View>
        )}

        {activeTab === 'employee' && (
          <View style={styles.costCard}>
            <View style={styles.costHeader}>
              <Calculator size={24} color="#6366f1" />
              <Text style={styles.costTitle}>Cost Breakdown</Text>
            </View>
            {(() => {
              const cost = getEmployeeCost();
              return (
                <>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Base Salary</Text>
                    <Text style={styles.costValue}>${(cost.baseSalary / 1000).toFixed(1)}K</Text>
                  </View>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>AI Assistance Value</Text>
                    <Text style={styles.costValue}>${(cost.aiAssistanceValue / 1000).toFixed(1)}K</Text>
                  </View>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Productivity Boost</Text>
                    <Text style={[styles.costValue, styles.costPositive]}>{cost.productivityBoost}</Text>
                  </View>
                  <View style={[styles.costRow, styles.costRowTotal]}>
                    <Text style={styles.costLabelTotal}>Annual Cost (with benefits)</Text>
                    <Text style={styles.costValueTotal}>{cost.costFormatted}</Text>
                  </View>
                </>
              );
            })()}
          </View>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <View style={styles.validationCard}>
            <View style={styles.validationHeader}>
              <CircleAlert size={20} color="#ef4444" />
              <Text style={styles.validationTitle}>Please fix the following:</Text>
            </View>
            {validationErrors.map((error, index) => (
              <View key={index} style={styles.validationItem}>
                <X size={16} color="#ef4444" />
                <Text style={styles.validationText}>{error}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Agents & Employees Builder</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs */}
      {renderTabSelector()}

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonSecondary, currentStep === 1 && styles.footerButtonDisabled]}
          onPress={handleBack}
          disabled={currentStep === 1}
        >
          <Text style={[styles.footerButtonText, styles.footerButtonTextSecondary]}>Back</Text>
        </TouchableOpacity>
        
        {currentStep < totalSteps ? (
          <TouchableOpacity style={styles.footerButton} onPress={handleNext}>
            <Text style={styles.footerButtonText}>Next</Text>
            <ChevronRight size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.footerButton, styles.footerButtonSave]} onPress={handleSave}>
            <Save size={20} color="#fff" />
            <Text style={styles.footerButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#fff',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  stepContent: {
    gap: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '47%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  templateName: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  templateDesc: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
  },
  hint: {
    marginTop: 4,
    fontSize: 12,
    color: '#94a3b8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  optionCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  optionTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  optionTitleSelected: {
    color: '#6366f1',
  },
  optionDesc: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b',
  },
  levelGrid: {
    gap: 8,
  },
  levelCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  levelCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  levelLabelSelected: {
    color: '#6366f1',
  },
  levelDesc: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b',
  },
  employmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  employmentCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  employmentCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  employmentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  employmentLabelSelected: {
    color: '#6366f1',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  categoryCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  categoryLabelSelected: {
    color: '#6366f1',
  },
  categoryDesc: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  functionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  functionItemSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  functionCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  functionContent: {
    flex: 1,
  },
  functionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  functionDesc: {
    fontSize: 14,
    color: '#64748b',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  skillChipSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  skillText: {
    fontSize: 14,
    color: '#64748b',
  },
  skillTextSelected: {
    color: '#fff',
  },
  intelligenceCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  intelligenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  intelligenceName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  intelligenceDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b',
  },
  intelligenceImpact: {
    marginTop: 4,
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  balanceContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  balanceBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  balanceFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  balanceButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  balanceButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  agentCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  agentCountInfo: {
    flex: 1,
  },
  agentCountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  agentCountDesc: {
    fontSize: 12,
    color: '#64748b',
  },
  agentCountControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    minWidth: 30,
    textAlign: 'center',
  },
  intelligenceToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  intelligenceToggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  hierarchyCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  hierarchyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  hierarchyChain: {
    alignItems: 'center',
  },
  hierarchyItem: {
    alignItems: 'center',
    padding: 12,
  },
  hierarchyLevel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hierarchyRole: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 2,
  },
  hierarchyLine: {
    width: 2,
    height: 30,
    backgroundColor: '#e2e8f0',
  },
  summaryCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    gap: 8,
  },
  footerButtonSecondary: {
    backgroundColor: '#f1f5f9',
  },
  footerButtonDisabled: {
    opacity: 0.5,
  },
  footerButtonSave: {
    backgroundColor: '#10b981',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footerButtonTextSecondary: {
    color: '#64748b',
  },
  // Department Builder Styles
  departmentModeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  departmentModeCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  departmentModeCardActive: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  departmentModeTitle: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  departmentModeTitleActive: {
    color: '#6366f1',
  },
  departmentModeDesc: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
  },
  existingDeptsGrid: {
    gap: 8,
  },
  existingDeptCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  existingDeptCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  existingDeptName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  existingDeptNameSelected: {
    color: '#6366f1',
  },
  existingDeptCategory: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  existingDeptHead: {
    marginTop: 4,
    fontSize: 13,
    color: '#6366f1',
  },
  customDeptCard: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6366f1',
    alignItems: 'center',
  },
  customDeptTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  customDeptDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  customDeptFeatures: {
    marginTop: 16,
    gap: 4,
  },
  customDeptFeature: {
    fontSize: 13,
    color: '#475569',
  },
  // Cost Breakdown Styles
  costCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  costTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  costRowTotal: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
    marginTop: 8,
    paddingTop: 12,
  },
  costLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  costLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  costValueTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
  costPositive: {
    color: '#10b981',
  },
  // Validation Styles
  validationCard: {
    padding: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  validationText: {
    fontSize: 14,
    color: '#dc2626',
  },
  // AI Prompt Builder Styles
  templateCardFeatured: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  templateNameFeatured: {
    color: '#fff',
  },
  templateDescFeatured: {
    color: '#c7d2fe',
  },
  promptCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  promptLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  promptInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1e293b',
    minHeight: 120,
    backgroundColor: '#f8fafc',
    marginBottom: 16,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    gap: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  examplesCard: {
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  exampleChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  exampleText: {
    fontSize: 13,
    color: '#64748b',
  },
  generatedConfigCard: {
    padding: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#86efac',
  },
  generatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  generatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
  generatedSection: {
    marginBottom: 12,
  },
  generatedLabel: {
    fontSize: 12,
    color: '#22c55e',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  generatedValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  generatedSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  generatedSkillChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
  },
  generatedSkillText: {
    fontSize: 12,
    color: '#4338ca',
  },
  generatedFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  generatedFeatureChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fef3c7',
    borderRadius: 6,
  },
  generatedFeatureText: {
    fontSize: 12,
    color: '#b45309',
  },
  applyButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#10b981',
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modifyButton: {
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  // Performance Card Styles
  performanceCard: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  generatedRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  generatedHalf: {
    flex: 1,
  },
  // Integration & Workflow Styles
  integrationChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 6,
  },
  integrationText: {
    fontSize: 12,
    color: '#1e40af',
  },
  workflowChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fce7f3',
    borderRadius: 6,
  },
  workflowText: {
    fontSize: 11,
    color: '#be185d',
    fontWeight: '600',
  },
  // Compliance Styles
  complianceSection: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  complianceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
  },
  complianceText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  // Budget Section
  budgetSection: {
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    marginVertical: 12,
  },
  budgetValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e40af',
  },
  budgetEstimate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  // Cost Optimization Styles
  suggestionsSection: {
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  suggestionText: {
    fontSize: 13,
    color: '#15803d',
    flex: 1,
  },
  // Risk Assessment Styles
  riskSection: {
    padding: 16,
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    marginBottom: 12,
  },
  riskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 4,
  },
  riskHigh: {
    backgroundColor: '#fee2e2',
  },
  riskMedium: {
    backgroundColor: '#fef3c7',
  },
  riskLow: {
    backgroundColor: '#d1fae5',
  },
  riskText: {
    fontSize: 13,
    flex: 1,
  },
});
