import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Settings, Zap, Brain, Shield, Activity, Target, Layers, 
  Check, ChevronRight, Sparkles, TrendingUp, Clock, DollarSign,
  User, Briefcase, Globe, Lock, Database, Cpu, Headphones,
  AlertCircle, Plus, ArrowRight
} from 'lucide-react-native';

export default function AgentBuilderSetupPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('reactive');
  const [selectedDepartment, setSelectedDepartment] = useState('customer-experience');
  const [agentName, setAgentName] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [capabilityStrengths, setCapabilityStrengths] = useState<Record<string, number>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  
  const SAVED_PRESETS = [
    { id: 1, name: 'Standard Support Agent', type: 'reactive', department: 'customer-experience', date: '2 days ago' },
    { id: 2, name: 'Advanced Data Analyst', type: 'learning', department: 'data-intelligence', date: '1 week ago' },
    { id: 3, name: 'Security Monitor', type: 'reactive', department: 'security', date: '3 days ago' },
  ];
  const [advancedSettings, setAdvancedSettings] = useState<Record<string, any>>({
    // Behavioral settings
    personality: 'Professional',
    tone: 'Neutral',
    language_style: 'Concise',
    creativity_level: 30,
    
    // Performance settings
    response_time: 1500,
    concurrency: 10,
    cache_ttl: 300,
    batch_size: 5,
    
    // AI Model settings
    model_provider: 'OpenAI',
    model_name: 'GPT-4',
    temperature: 70,
    max_tokens: 2000,
    top_p: 90,
    
    // Memory settings
    context_window: 16000,
    memory_retention: 'Medium-term (24h)',
    knowledge_base: true,
    learning_enabled: false,
    memory_limit: 1000,
    
    // Skills settings
    reasoning_depth: 'Intermediate',
    task_complexity: 'Moderate',
    domain_knowledge: 'Specialized',
    multi_modal: false,
    code_execution: false,
    
    // Security settings
    encryption: true,
    audit_logging: true,
    access_control: 'Internal',
    content_filtering: true,
    rate_limiting: true,
    
    // Scaling settings
    enable_scaling: false,
    scale_threshold: 80,
    scale_down_threshold: 30,
    min_instances: 1,
    max_instances: 10,
    
    // Integration settings
    webhook: '',
    api_key: '',
    slack_alerts: false,
    email_notifications: false,
    custom_api: false,
    
    // Monitoring settings
    health_checks: true,
    performance_monitoring: true,
    error_alerting: true,
    log_level: 'Info',
    metrics_retention: '30 days'
  });

  const AGENT_TEMPLATES = [
    {
      id: 'customer-support',
      name: 'Customer Support',
      icon: Headphones,
      color: '#00BCD4',
      description: 'Handle customer inquiries and support requests',
      recommendedType: 'learning',
      recommendedCapabilities: ['Multi-language Support', 'Sentiment Analysis', 'Knowledge Base Integration', 'Real-time Monitoring'],
      presetSettings: {
        response_time: 1000,
        concurrency: 25,
        encryption: true,
        audit_logging: true
      }
    },
    {
      id: 'sales-assistant',
      name: 'Sales Assistant',
      icon: DollarSign,
      color: '#10B981',
      description: 'Assist with sales processes and lead management',
      recommendedType: 'reactive',
      recommendedCapabilities: ['Task Automation', 'Data Processing', 'Integration Ready', 'Custom Training'],
      presetSettings: {
        response_time: 2000,
        concurrency: 15,
        encryption: true,
        audit_logging: false
      }
    },
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      icon: Database,
      color: '#7C3AED',
      description: 'Process and analyze data for insights',
      recommendedType: 'learning',
      recommendedCapabilities: ['Data Processing', 'Predictive Analytics', 'Advanced Security', 'Real-time Monitoring'],
      presetSettings: {
        response_time: 5000,
        concurrency: 5,
        encryption: true,
        audit_logging: true
      }
    },
    {
      id: 'security-monitor',
      name: 'Security Monitor',
      icon: Shield,
      color: '#EF4444',
      description: 'Monitor security threats and anomalies',
      recommendedType: 'reactive',
      recommendedCapabilities: ['Advanced Security', 'Real-time Monitoring', 'Task Automation', 'Workflow Management'],
      presetSettings: {
        response_time: 500,
        concurrency: 50,
        encryption: true,
        audit_logging: true
      }
    }
  ];

  const AGENT_TYPES = [
    {
      id: 'reactive',
      name: 'Reactive Agent',
      icon: Activity,
      color: '#3B82F6',
      description: 'Responds to requests with intelligent answers',
      bestFor: 'Standard support, FAQs, routine queries',
      features: ['24/7 Availability', 'Instant Response', 'Knowledge Base Integration']
    },
    {
      id: 'learning',
      name: 'Learning Agent',
      icon: Brain,
      color: '#8B5CF6',
      description: 'Self-improves from every interaction',
      bestFor: 'Complex tasks requiring adaptation',
      features: ['Continuous Learning', 'Performance Improvement', 'Error Reduction']
    },
    {
      id: 'swarm',
      name: 'Swarm Agent',
      icon: Zap,
      color: '#F59E0B',
      description: 'Teams up dynamically for complex tasks',
      bestFor: 'High-volume or complex multi-agent scenarios',
      features: ['Dynamic Scaling', 'Load Balancing', 'Parallel Processing']
    }
  ];

  const DEPARTMENTS = [
    { id: 'customer-experience', name: 'Customer Experience', icon: User, color: '#00BCD4' },
    { id: 'sales', name: 'Sales & Revenue', icon: DollarSign, color: '#10B981' },
    { id: 'marketing', name: 'Marketing & Growth', icon: Target, color: '#F59E0B' },
    { id: 'operations', name: 'Operations', icon: Briefcase, color: '#3B82F6' },
    { id: 'finance', name: 'Finance', icon: TrendingUp, color: '#8B5CF6' },
    { id: 'technology', name: 'Technology', icon: Cpu, color: '#EC4899' },
    { id: 'security', name: 'Security', icon: Shield, color: '#EF4444' },
    { id: 'data', name: 'Data & Intelligence', icon: Database, color: '#7C3AED' }
  ];

  const CAPABILITIES = [
    'Task Automation',
    'Data Processing',
    'Workflow Management',
    'Sentiment Analysis',
    'Predictive Analytics',
    'Multi-language Support',
    'Integration Ready',
    'Custom Training',
    'Real-time Monitoring',
    'Advanced Security'
  ];

  const ADVANCED_OPTIONS = [
    {
      id: 'behavior',
      name: 'Behavioral Configuration',
      icon: Brain,
      color: '#8B5CF6',
      options: [
        { id: 'personality', name: 'Agent Personality', type: 'select', options: ['Professional', 'Friendly', 'Technical', 'Creative', 'Formal'], default: 'Professional' },
        { id: 'tone', name: 'Communication Tone', type: 'select', options: ['Neutral', 'Empathetic', 'Assertive', 'Collaborative', 'Direct'], default: 'Neutral' },
        { id: 'language_style', name: 'Language Style', type: 'select', options: ['Concise', 'Detailed', 'Technical', 'Simplified', 'Conversational'], default: 'Concise' },
        { id: 'creativity_level', name: 'Creativity Level', type: 'slider', min: 0, max: 100, default: 30, unit: '%' }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Settings',
      icon: Activity,
      color: '#3B82F6',
      options: [
        { id: 'response_time', name: 'Max Response Time', type: 'slider', min: 500, max: 5000, default: 1500, unit: 'ms' },
        { id: 'concurrency', name: 'Concurrent Requests', type: 'slider', min: 1, max: 100, default: 10, unit: 'requests' },
        { id: 'cache_ttl', name: 'Cache Duration', type: 'slider', min: 0, max: 3600, default: 300, unit: 'seconds' },
        { id: 'batch_size', name: 'Batch Processing Size', type: 'slider', min: 1, max: 50, default: 5, unit: 'items' }
      ]
    },
    {
      id: 'ai_model',
      name: 'AI Model Configuration',
      icon: Cpu,
      color: '#EC4899',
      options: [
        { id: 'model_provider', name: 'Model Provider', type: 'select', options: ['OpenAI', 'Anthropic', 'Google', 'Cohere', 'Local'], default: 'OpenAI' },
        { id: 'model_name', name: 'Model Selection', type: 'select', options: ['GPT-4', 'GPT-3.5-Turbo', 'Claude-3-Opus', 'Claude-3-Sonnet', 'Gemini-Pro'], default: 'GPT-4' },
        { id: 'temperature', name: 'Temperature', type: 'slider', min: 0, max: 100, default: 70, unit: '%' },
        { id: 'max_tokens', name: 'Max Tokens', type: 'slider', min: 100, max: 4000, default: 2000, unit: 'tokens' },
        { id: 'top_p', name: 'Top P Sampling', type: 'slider', min: 0, max: 100, default: 90, unit: '%' }
      ]
    },
    {
      id: 'memory',
      name: 'Memory & Context',
      icon: Database,
      color: '#10B981',
      options: [
        { id: 'context_window', name: 'Context Window Size', type: 'slider', min: 1000, max: 128000, default: 16000, unit: 'tokens' },
        { id: 'memory_retention', name: 'Memory Retention', type: 'select', options: ['Short-term (1h)', 'Medium-term (24h)', 'Long-term (7d)', 'Permanent'], default: 'Medium-term (24h)' },
        { id: 'knowledge_base', name: 'Knowledge Base Access', type: 'toggle', default: true },
        { id: 'learning_enabled', name: 'Continuous Learning', type: 'toggle', default: false },
        { id: 'memory_limit', name: 'Memory Limit', type: 'slider', min: 100, max: 10000, default: 1000, unit: 'MB' }
      ]
    },
    {
      id: 'skills',
      name: 'Skills & Capabilities',
      icon: Target,
      color: '#F59E0B',
      options: [
        { id: 'reasoning_depth', name: 'Reasoning Depth', type: 'select', options: ['Basic', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
        { id: 'task_complexity', name: 'Task Complexity', type: 'select', options: ['Simple', 'Moderate', 'Complex', 'Expert'], default: 'Moderate' },
        { id: 'domain_knowledge', name: 'Domain Knowledge Level', type: 'select', options: ['General', 'Specialized', 'Expert'], default: 'Specialized' },
        { id: 'multi_modal', name: 'Multi-modal Capabilities', type: 'toggle', default: false },
        { id: 'code_execution', name: 'Code Execution', type: 'toggle', default: false }
      ]
    },
    {
      id: 'security',
      name: 'Security Configuration',
      icon: Shield,
      color: '#EF4444',
      options: [
        { id: 'encryption', name: 'Data Encryption', type: 'toggle', default: true },
        { id: 'audit_logging', name: 'Audit Logging', type: 'toggle', default: true },
        { id: 'access_control', name: 'Access Control Level', type: 'select', options: ['Public', 'Internal', 'Restricted'], default: 'Internal' },
        { id: 'content_filtering', name: 'Content Filtering', type: 'toggle', default: true },
        { id: 'rate_limiting', name: 'Rate Limiting', type: 'toggle', default: true }
      ]
    },
    {
      id: 'scaling',
      name: 'Auto-Scaling',
      icon: TrendingUp,
      color: '#7C3AED',
      options: [
        { id: 'enable_scaling', name: 'Enable Auto-Scaling', type: 'toggle', default: false },
        { id: 'scale_threshold', name: 'Scale-up Threshold', type: 'slider', min: 50, max: 95, default: 80, unit: '%' },
        { id: 'scale_down_threshold', name: 'Scale-down Threshold', type: 'slider', min: 10, max: 50, default: 30, unit: '%' },
        { id: 'min_instances', name: 'Min Instances', type: 'slider', min: 1, max: 10, default: 1, unit: 'instances' },
        { id: 'max_instances', name: 'Max Instances', type: 'slider', min: 1, max: 50, default: 10, unit: 'instances' }
      ]
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: Globe,
      color: '#06B6D4',
      options: [
        { id: 'webhook', name: 'Webhook URL', type: 'text', placeholder: 'https://your-webhook-url.com' },
        { id: 'api_key', name: 'API Key', type: 'text', placeholder: 'Enter API key' },
        { id: 'slack_alerts', name: 'Slack Alerts', type: 'toggle', default: false },
        { id: 'email_notifications', name: 'Email Notifications', type: 'toggle', default: false },
        { id: 'custom_api', name: 'Custom API Integration', type: 'toggle', default: false }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Alerting',
      icon: AlertCircle,
      color: '#F97316',
      options: [
        { id: 'health_checks', name: 'Health Checks', type: 'toggle', default: true },
        { id: 'performance_monitoring', name: 'Performance Monitoring', type: 'toggle', default: true },
        { id: 'error_alerting', name: 'Error Alerting', type: 'toggle', default: true },
        { id: 'log_level', name: 'Log Level', type: 'select', options: ['Debug', 'Info', 'Warning', 'Error', 'Critical'], default: 'Info' },
        { id: 'metrics_retention', name: 'Metrics Retention', type: 'select', options: ['7 days', '30 days', '90 days', '1 year'], default: '30 days' }
      ]
    }
  ];

  const SETUP_STEPS = [
    { step: 1, title: 'Choose Agent Type', description: 'Select the type of AI agent' },
    { step: 2, title: 'Select Department', description: 'Choose the business function' },
    { step: 3, title: 'Configure Capabilities', description: 'Define agent capabilities' },
    { step: 4, title: 'Review & Deploy', description: 'Review and deploy your agent' }
  ];

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev =>
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Settings size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Agent Builder Setup</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Configure and deploy custom AI agents
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Sparkles size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Easy Setup</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Check size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Quick Deploy</Text>
          </View>
        </View>
      </View>

      {/* Setup Steps */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Setup Steps</Text>
        <View style={styles.stepsContainer}>
          {SETUP_STEPS.map((step, index) => (
            <View key={step.step} style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: '#8B5CF6' }]}>
                <Text style={styles.stepNumberText}>{step.step}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>{step.title}</Text>
                <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>{step.description}</Text>
              </View>
              {index < SETUP_STEPS.length - 1 && <ChevronRight size={20} color="#8B5CF6" />}
            </View>
          ))}
        </View>
      </View>

      {/* Agent Type Selection */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Step 1: Choose Agent Type</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Select the type of AI agent that best fits your needs
        </Text>
        {AGENT_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => setSelectedType(type.id)}
            style={[
              styles.typeCard,
              { 
                backgroundColor: theme.colors.background || '#F2F2F7',
                borderColor: selectedType === type.id ? type.color : 'transparent'
              }
            ]}
          >
            <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
              <type.icon size={28} color={type.color} />
            </View>
            <View style={styles.typeInfo}>
              <Text style={[styles.typeName, { color: theme.colors.text }]}>{type.name}</Text>
              <Text style={[styles.typeDesc, { color: theme.colors.textSecondary }]}>{type.description}</Text>
              <Text style={[styles.typeBest, { color: type.color }]}>Best for: {type.bestFor}</Text>
            </View>
            {selectedType === type.id && (
              <View style={[styles.checkIcon, { backgroundColor: type.color }]}>
                <Check size={16} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Department Selection */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Step 2: Select Department</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Choose the business function for this agent
        </Text>
        <View style={styles.departmentsGrid}>
          {DEPARTMENTS.map((dept) => (
            <TouchableOpacity
              key={dept.id}
              onPress={() => setSelectedDepartment(dept.id)}
              style={[
                styles.deptCard,
                { 
                  backgroundColor: selectedDepartment === dept.id ? dept.color + '20' : (theme.colors.background || '#F2F2F7'),
                  borderColor: selectedDepartment === dept.id ? dept.color : 'transparent'
                }
              ]}
            >
              <dept.icon size={24} color={dept.color} />
              <Text style={[styles.deptName, { color: theme.colors.text }]}>{dept.name}</Text>
              {selectedDepartment === dept.id && (
                <View style={[styles.deptCheck, { backgroundColor: dept.color }]}>
                  <Check size={12} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Templates */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Templates</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Start with a pre-configured template for faster setup
        </Text>
        <View style={styles.templatesGrid}>
          {AGENT_TEMPLATES.map((template) => (
            <TouchableOpacity
              key={template.id}
              onPress={() => {
                setSelectedType(template.recommendedType);
                setSelectedCapabilities(template.recommendedCapabilities);
                setAdvancedSettings({...advancedSettings, ...template.presetSettings});
                setAgentName(template.name);
              }}
              style={[styles.templateCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
            >
              <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                <template.icon size={32} color={template.color} />
              </View>
              <Text style={[styles.templateName, { color: theme.colors.text }]}>{template.name}</Text>
              <Text style={[styles.templateDesc, { color: theme.colors.textSecondary }]}>{template.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Agent Name Input */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Step 3: Configure Agent</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Agent Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.background || '#F2F2F7', color: theme.colors.text, borderColor: theme.colors.border || '#E5E5EA' }]}
            placeholder="Enter agent name..."
            placeholderTextColor={theme.colors.textSecondary}
            value={agentName}
            onChangeText={setAgentName}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Select the capabilities for your agent
          </Text>
          <View style={styles.capabilitiesGrid}>
            {CAPABILITIES.map((capability) => (
              <TouchableOpacity
                key={capability}
                onPress={() => toggleCapability(capability)}
                style={[
                  styles.capabilityCard,
                  {
                    backgroundColor: selectedCapabilities.includes(capability) 
                      ? '#8B5CF620' 
                      : (theme.colors.background || '#F2F2F7'),
                    borderColor: selectedCapabilities.includes(capability) ? '#8B5CF6' : 'transparent'
                  }
                ]}
              >
                {selectedCapabilities.includes(capability) && (
                  <View style={styles.capabilityCheck}>
                    <Check size={14} color="#8B5CF6" />
                  </View>
                )}
                <Text style={[
                  styles.capabilityText,
                  { color: selectedCapabilities.includes(capability) ? '#8B5CF6' : theme.colors.text }
                ]}>
                  {capability}
                </Text>
                {selectedCapabilities.includes(capability) && (
                  <View style={styles.strengthContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setCapabilityStrengths({...capabilityStrengths, [capability]: Math.max((capabilityStrengths[capability] || 50) - 10, 10)});
                      }}
                      style={styles.strengthButton}
                    >
                      <Text style={styles.strengthButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.strengthText}>{capabilityStrengths[capability] || 50}%</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCapabilityStrengths({...capabilityStrengths, [capability]: Math.min((capabilityStrengths[capability] || 50) + 10, 100)});
                      }}
                      style={styles.strengthButton}
                    >
                      <Text style={styles.strengthButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Advanced Configuration */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity 
          onPress={() => setShowAdvanced(!showAdvanced)}
          style={styles.advancedHeader}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Advanced Configuration</Text>
          <Text style={[styles.advancedSubtitle, { color: theme.colors.textSecondary }]}>
            8 configuration categories with 35+ options
          </Text>
          <ChevronRight size={24} color={theme.colors.textSecondary} style={[showAdvanced && styles.chevronRotated]} />
        </TouchableOpacity>
        
        {showAdvanced && (
          <View style={styles.advancedContent}>
            {ADVANCED_OPTIONS.map((section) => (
              <View key={section.id} style={[styles.advancedSection, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
                <View style={styles.advancedSectionHeader}>
                  <section.icon size={24} color={section.color} />
                  <Text style={[styles.advancedSectionTitle, { color: theme.colors.text }]}>{section.name}</Text>
                  <View style={[styles.optionCount, { backgroundColor: section.color + '20' }]}>
                    <Text style={[styles.optionCountText, { color: section.color }]}>{section.options.length}</Text>
                  </View>
                </View>
                {section.options.map((option) => (
                  <View key={option.id} style={styles.optionRow}>
                    <View style={styles.optionInfo}>
                      <Text style={[styles.optionLabel, { color: theme.colors.text }]}>{option.name}</Text>
                      {option.type === 'slider' && (
                        <Text style={[styles.optionHint, { color: theme.colors.textSecondary }]}>
                          Range: {option.min}-{option.max} {option.unit}
                        </Text>
                      )}
                      {option.type === 'select' && (
                        <Text style={[styles.optionHint, { color: theme.colors.textSecondary }]}>
                          Options: {option.options.length}
                        </Text>
                      )}
                    </View>
                    {option.type === 'slider' && (
                      <View style={styles.sliderContainer}>
                        <Text style={[styles.sliderValue, { color: section.color }]}>{advancedSettings[option.id]} {option.unit}</Text>
                        <View style={[styles.sliderTrack, { backgroundColor: section.color + '30' }]}>
                          <View style={[
                            styles.sliderFill, 
                            { 
                              backgroundColor: section.color,
                              width: `${((advancedSettings[option.id] - option.min) / (option.max - option.min)) * 100}%`
                            }
                          ]} />
                        </View>
                      </View>
                    )}
                    {option.type === 'toggle' && (
                      <TouchableOpacity 
                        style={[
                          styles.toggle,
                          { backgroundColor: advancedSettings[option.id] ? section.color : '#E5E5EA' }
                        ]}
                        onPress={() => setAdvancedSettings({...advancedSettings, [option.id]: !advancedSettings[option.id]})}
                      >
                        <View style={[
                          styles.toggleKnob, 
                          advancedSettings[option.id] && styles.toggleKnobActive
                        ]} />
                      </TouchableOpacity>
                    )}
                    {option.type === 'select' && (
                      <View style={styles.selectContainer}>
                        {option.options.map((opt) => (
                          <TouchableOpacity
                            key={opt}
                            onPress={() => setAdvancedSettings({...advancedSettings, [option.id]: opt})}
                            style={[
                              styles.selectOption,
                              {
                                backgroundColor: advancedSettings[option.id] === opt ? section.color + '20' : 'transparent',
                                borderColor: advancedSettings[option.id] === opt ? section.color : '#E5E5EA'
                              }
                            ]}
                          >
                            <Text style={[
                              styles.selectOptionText,
                              { color: advancedSettings[option.id] === opt ? section.color : theme.colors.text }
                            ]}>
                              {opt}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {option.type === 'text' && (
                      <TextInput
                        style={[
                          styles.textInput,
                          { 
                            backgroundColor: theme.colors.card || '#F2F2F7',
                            color: theme.colors.text,
                            borderColor: theme.colors.border || '#E5E5EA'
                          }
                        ]}
                        placeholder={option.placeholder}
                        placeholderTextColor={theme.colors.textSecondary}
                        value={advancedSettings[option.id] || ''}
                        onChangeText={(text) => setAdvancedSettings({...advancedSettings, [option.id]: text})}
                      />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* AI Model Configuration */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity 
          onPress={() => setShowAdvanced(!showAdvanced)}
          style={styles.advancedHeader}
        >
          <Cpu size={24} color="#EC4899" />
          <View style={styles.advancedTitleSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Model Configuration</Text>
            <Text style={[styles.advancedSubtitle, { color: theme.colors.textSecondary }]}>
              Select AI provider, model, and fine-tuning parameters
            </Text>
          </View>
          <ChevronRight size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        
        <View style={styles.modelConfigContainer}>
          <View style={[styles.configRow, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.configLabel, { color: theme.colors.text }]}>Model Provider</Text>
            <View style={styles.configValue}>
              <Text style={[styles.configText, { color: theme.colors.text }]}>{advancedSettings.model_provider}</Text>
            </View>
          </View>
          
          <View style={[styles.configRow, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.configLabel, { color: theme.colors.text }]}>Selected Model</Text>
            <View style={styles.configValue}>
              <Text style={[styles.configText, { color: theme.colors.text }]}>{advancedSettings.model_name}</Text>
            </View>
          </View>

          <View style={[styles.configRow, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.configLabel, { color: theme.colors.text }]}>Temperature</Text>
            <View style={styles.configValue}>
              <Text style={[styles.configText, { color: '#EC4899' }]}>{advancedSettings.temperature}%</Text>
            </View>
          </View>

          <View style={[styles.configRow, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.configLabel, { color: theme.colors.text }]}>Max Tokens</Text>
            <View style={styles.configValue}>
              <Text style={[styles.configText, { color: theme.colors.text }]}>{advancedSettings.max_tokens}</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.configButton, { backgroundColor: '#EC4899' }]}>
            <Settings size={18} color="white" />
            <Text style={styles.configButtonText}>Configure Model</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Configuration Summary */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration Summary</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Review your agent configuration before deployment
        </Text>
        
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={styles.summarySection}>
            <Text style={[styles.summarySectionTitle, { color: theme.colors.text }]}>Basic Configuration</Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Agent Type:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{selectedType}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Department:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{selectedDepartment}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Capabilities:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{selectedCapabilities.length} selected</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summarySection}>
            <Text style={[styles.summarySectionTitle, { color: theme.colors.text }]}>AI Model</Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Provider:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{advancedSettings.model_provider}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Model:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{advancedSettings.model_name}</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summarySection}>
            <Text style={[styles.summarySectionTitle, { color: theme.colors.text }]}>Performance</Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Response Time:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{advancedSettings.response_time}ms</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Concurrency:</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{advancedSettings.concurrency} requests</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.savePresetButton, { backgroundColor: '#10B981' }]}>
          <Settings size={20} color="white" />
          <Text style={styles.savePresetButtonText}>Save as Preset</Text>
        </TouchableOpacity>
      </View>

      {/* Preset Management */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity 
          onPress={() => setShowPresets(!showPresets)}
          style={styles.advancedHeader}
        >
          <Settings size={24} color="#F59E0B" />
          <View style={styles.advancedTitleSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration Presets</Text>
            <Text style={[styles.advancedSubtitle, { color: theme.colors.textSecondary }]}>
              Save and load agent configurations
            </Text>
          </View>
          <ChevronRight size={24} color={theme.colors.textSecondary} style={[showPresets && styles.chevronRotated]} />
        </TouchableOpacity>
        
        {showPresets && (
          <View style={styles.presetsList}>
            {SAVED_PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[styles.presetCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
              >
                <View style={styles.presetInfo}>
                  <Text style={[styles.presetName, { color: theme.colors.text }]}>{preset.name}</Text>
                  <View style={styles.presetMeta}>
                    <Text style={[styles.presetMetaText, { color: theme.colors.textSecondary }]}>
                      {preset.type} • {preset.department}
                    </Text>
                    <Text style={[styles.presetDate, { color: theme.colors.textSecondary }]}>• {preset.date}</Text>
                  </View>
                </View>
                <View style={styles.presetActions}>
                  <TouchableOpacity style={styles.presetActionButton}>
                    <Settings size={16} color="#8B5CF6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.presetActionButton}>
                    <Activity size={16} color="#10B981" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={[styles.createPresetButton, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}
            >
              <Plus size={20} color="#F59E0B" />
              <Text style={[styles.createPresetText, { color: '#F59E0B' }]}>Create New Preset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Estimated Performance */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Estimated Performance</Text>
        <View style={styles.performanceGrid}>
          <View style={[styles.perfCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Clock size={24} color="#3B82F6" />
            <Text style={[styles.perfValue, { color: theme.colors.text }]}>&lt;1.5s</Text>
            <Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Response Time</Text>
          </View>
          <View style={[styles.perfCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Activity size={24} color="#10B981" />
            <Text style={[styles.perfValue, { color: theme.colors.text }]}>95%</Text>
            <Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
          </View>
          <View style={[styles.perfCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <TrendingUp size={24} color="#8B5CF6" />
            <Text style={[styles.perfValue, { color: theme.colors.text }]}>18x</Text>
            <Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
          </View>
          <View style={[styles.perfCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <DollarSign size={24} color="#F59E0B" />
            <Text style={[styles.perfValue, { color: theme.colors.text }]}>89%</Text>
            <Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Cost Savings</Text>
          </View>
        </View>
      </View>

      {/* Deploy Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity 
          style={[styles.deployButton, { backgroundColor: '#8B5CF6' }]}
          onPress={() => router.push('/ai-agent/ai-agents-employees')}
        >
          <Zap size={24} color="white" />
          <Text style={styles.deployButtonText}>Deploy Agent</Text>
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.deployOptions}>
          <TouchableOpacity style={[styles.deployOption, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.deployOptionText, { color: theme.colors.text }]}>Deploy to Production</Text>
            <ArrowRight size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.deployOption, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <Text style={[styles.deployOptionText, { color: theme.colors.text }]}>Deploy to Staging</Text>
            <ArrowRight size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.deployNote, { color: theme.colors.textSecondary }]}>
          Your agent will be deployed with 35+ advanced configuration options and will be ready to use within minutes
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  stepsContainer: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    gap: 16,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDesc: {
    fontSize: 14,
    marginBottom: 4,
  },
  typeBest: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deptCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
  },
  deptName: {
    fontSize: 12,
    fontWeight: '600',
  },
  deptCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
  },
  subsection: {
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  capabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    gap: 8,
  },
  capabilityCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
  },
  capabilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
  },
  strengthButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strengthButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    lineHeight: 18,
  },
  strengthText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
    minWidth: 32,
    textAlign: 'center',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  perfCard: {
    flex: 1,
    minWidth: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  perfValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  perfLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  deployButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  deployButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deployNote: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
  advancedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  advancedSubtitle: {
    fontSize: 12,
  },
  advancedTitleSection: {
    flex: 1,
    marginLeft: 12,
  },
  optionCount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  optionCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  optionRow: {
    marginBottom: 16,
    gap: 8,
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionHint: {
    fontSize: 11,
  },
  advancedContent: {
    gap: 16,
  },
  advancedSection: {
    padding: 20,
    borderRadius: 12,
  },
  advancedSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  advancedSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  modelConfigContainer: {
    marginTop: 16,
    gap: 12,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  configValue: {
    alignItems: 'flex-end',
  },
  configText: {
    fontSize: 14,
    fontWeight: '600',
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  configButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  summarySection: {
    marginBottom: 16,
  },
  summarySectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#8B5CF6',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 16,
  },
  savePresetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  savePresetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  presetsList: {
    gap: 12,
  },
  presetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  presetInfo: {
    flex: 1,
  },
  presetName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  presetMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetMetaText: {
    fontSize: 12,
  },
  presetDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  presetActions: {
    flexDirection: 'row',
    gap: 8,
  },
  presetActionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  createPresetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  createPresetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sliderContainer: {
    gap: 8,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#999',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectOptionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    flex: 1,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  templateIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  templateDesc: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  deployOptions: {
    marginTop: 12,
    gap: 8,
  },
  deployOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  deployOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});