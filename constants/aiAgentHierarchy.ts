 
import type { LucideIcon } from 'lucide-react-native';
import {
  // Customer Experience Icons
  Phone,
  Headphones,
  Ticket,
  MessageSquare,
  Heart,
  Gift,
  ClipboardList,
  CreditCard,
  // Sales & Revenue Icons
  UserCheck,
  Target,
  Award,
  Database,
  FileText,
  Handshake,
  TrendingUp,
  Users,
  DollarSign,
  // Marketing & Growth Icons
  Megaphone,
  Zap,
  Globe,
  FileEdit,
  Share2,
  Search,
  Eye,
  Mail,
  // Operations & Management Icons
  Settings,
  Workflow,
  CheckSquare,
  Layers,
  Box,
  Shield,
  Truck,
  Award as QualityIcon,
  // Data & Intelligence Icons
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Activity,
  AlertTriangle,
  Search as ResearchIcon,
  // Analysis & Performance Icons
  Gauge,
  Lightbulb,
  Cpu,
  Sparkles,
  Target as GoalIcon,
  Crown,
  // Common
  Bot,
  Cpu as AgentIcon,
  Network,
  MessagesSquare,
  GitBranch,
  // Accounting & Finance Icons
  Calculator,
  Receipt,
  Wallet,
  Landmark,
  PiggyBank,
  FileSpreadsheet,
  TrendingDown,
  Coins,
  Banknote,
  Scale,
} from 'lucide-react-native';

// ============================================
// BASE TYPES & INTERFACES
// ============================================

export type AgentType = 'main_agent' | 'subagent';
export type AgentStatus = 'active' | 'standby' | 'busy' | 'offline' | 'learning';
export type AgentCapability = 'consulting' | 'execution' | 'analysis' | 'creative' | 'communication' | 'automation';

export interface AgentCommunicationChannel {
  type: 'direct' | 'broadcast' | 'consultation' | 'delegation' | 'escalation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  encryption: boolean;
  persistence: boolean;
}

export interface AgentConsultingCapability {
  canConsult: boolean;
  canBeConsulted: boolean;
  expertiseAreas: string[];
  consultingStyle: 'advisory' | 'collaborative' | 'directive' | 'analytical';
  preferredConsultationTypes: string[];
  // Enhanced A2A Counseling
  counselingRole?: 'mentor' | 'mentee' | 'peer' | 'specialist' | 'coordinator';
  canMentor?: boolean;
  canBeMentored?: boolean;
  counselingLoad?: {
    current: number;
    maximum: number;
    availability: 'available' | 'limited' | 'unavailable';
  };
}

export interface AgentHierarchy {
  level: 1 | 2;
  parentId?: string;
  children?: string[];
  subAgentIds?: string[];
  peerIds?: string[];
  reportsTo?: string;
  manages?: string[];
}

export interface AgentA2ACapability {
  canInitiateConsultation: boolean;
  canRespondToConsultation: boolean;
  canEscalate: boolean;
  canDelegate: boolean;
  maxConcurrentConsultations: number;
  averageResponseTime: number; // seconds
  // Enhanced A2A Counseling
  counselingModes?: ('hierarchical' | 'peer' | 'cross-functional')[];
  mentoringCapabilities?: {
    canMentorSubagents: boolean;
    canMentorPeers: boolean;
    canBeMentoredByMain: boolean;
    canBeMentoredByPeers: boolean;
  };
  coordinationLevel?: 'none' | 'team' | 'department' | 'organization';
}

export type AIAgentDefinition = AIAgent;

export interface AIAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  
  // Agent Classification
  type: AgentType;
  category: string;
  parentCategory?: string;
  
  // Hierarchy
  hierarchy: AgentHierarchy;
  
  // A2A Capabilities
  a2aCapabilities: AgentA2ACapability;
  
  // Consulting
  consulting: AgentConsultingCapability;
  
  // Capabilities
  capabilities: string[];
  communicationChannels: AgentCommunicationChannel[];
  
  // Status
  status: AgentStatus;
  
  // Routing
  route: string;
  apiEndpoint: string;
  
  // Metadata
  version: string;
  lastUpdated: string;
  createdAt: string;
  
  // Cost & ROI
  humanCostEquivalent: string;
  aiCost: string;
  efficiency: string;
  
  // Performance
  performance: {
    tasksCompleted: number;
    successRate: number;
    averageResponseTime: number;
    customerSatisfaction: number;
    uptime: string;
  };
  
  // Configuration (Model, Voice, Language, Training, Data Upload)
  configuration?: AgentConfiguration;
}

// ============================================
// AGENT AI MODEL CONFIGURATION
// ============================================

export type AIModelType = 
  | 'gpt-4o' 
  | 'gpt-4o-mini' 
  | 'gpt-4-turbo' 
  | 'claude-3-5-sonnet' 
  | 'claude-3-5-haiku' 
  | 'claude-3-opus'
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash'
  | 'llama-3.1-70b'
  | 'llama-3.1-8b'
  | 'mistral-large'
  | 'mistral-medium'
  | 'custom';

export type AgentPersonaAge = 'young' | 'adult' | 'mature' | 'senior' | 'custom';

export type AgentLanguage = 
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' 
  | 'ar' | 'hi' | 'tr' | 'pl' | 'nl' | 'sv' | 'da' | 'no' | 'fi' | 'cs'
  | 'multi';

export type VoiceGender = 'male' | 'female' | 'neutral';
export type VoiceStyle = 'professional' | 'friendly' | 'casual' | 'formal' | 'energetic' | 'calm' | 'authoritative';
export type VoiceSpeed = 'slow' | 'normal' | 'fast';
export type VoiceTone = 'warm' | 'neutral' | 'bright' | 'deep' | 'soft';

export interface AgentVoiceConfig {
  enabled: boolean;
  gender: VoiceGender;
  style: VoiceStyle;
  speed: VoiceSpeed;
  tone: VoiceTone;
  accent?: string;
  pitch?: number; // 0.5 - 2.0
  volume?: number; // 0.0 - 1.0
  provider?: 'elevenlabs' | 'azure' | 'aws-polly' | 'google' | 'openai';
  voiceId?: string;
  customVoiceName?: string;
}

export interface AgentModelConfig {
  primary: AIModelType;
  fallback?: AIModelType;
  temperature: number; // 0.0 - 2.0
  maxTokens: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  contextWindow?: number;
  reasoning?: 'none' | 'low' | 'medium' | 'high';
  customModelEndpoint?: string;
  customModelApiKey?: string;
}

export interface AgentTrainingConfig {
  enabled: boolean;
  autoTraining: boolean;
  trainingSchedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  trainingDataSources: string[];
  fineTunedModel?: string;
  lastTrainingDate?: string;
  trainingMetrics?: {
    accuracy: number;
    loss: number;
    epochs: number;
    samplesProcessed: number;
  };
  learningGoals?: string[];
  feedbackLoop?: boolean;
  continuousLearning?: boolean;
  learningRate?: number;
  dataSources?: string[];
  feedbackIntegration?: boolean;
  humanInTheLoop?: boolean;
}

export interface AgentDataUploadConfig {
  enabled: boolean;
  allowedFormats: ('pdf' | 'doc' | 'docx' | 'txt' | 'csv' | 'json' | 'xlsx' | 'ppt' | 'pptx' | 'md' | 'html' | 'xml')[];
  maxFileSize: number; // in MB
  maxTotalStorage: number; // in GB
  autoProcessing: boolean;
  processingSchedule?: 'immediate' | 'hourly' | 'daily' | 'weekly';
  uploadedDocuments?: AgentDocument[];
  dataRetentionDays?: number;
  retentionPeriod?: number;
  allowFileUpload?: boolean;
  autoProcess?: boolean;
  processingFormat?: string;
}

export interface AgentDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  processed: boolean;
  processingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  extractedKnowledge?: string[];
  tags?: string[];
}

export interface AgentLanguageConfig {
  primary: AgentLanguage;
  secondary?: AgentLanguage[];
  autoDetect: boolean;
  translationEnabled: boolean;
  culturalAdaptation: boolean;
  regionalDialect?: string;
  formalityLevel?: 'casual' | 'neutral' | 'formal';
  supported?: string[];
  formality?: string;
}

export interface AgentPersonalityConfig {
  age: AgentPersonaAge;
  customAge?: number;
  traits: string[];
  communicationStyle: 'professional' | 'friendly' | 'technical' | 'empathetic' | 'humorous' | 'authoritative' | 'consultative';
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  creativityLevel: number; // 0.0 - 1.0
  enthusiasmLevel: number; // 0.0 - 1.0
  empathyLevel: number; // 0.0 - 1.0
  customPersonalityPrompt?: string;
  empathy?: number;
  expertise?: string[];
}

export interface AgentConfiguration {
  model: AgentModelConfig;
  voice: AgentVoiceConfig;
  language: AgentLanguageConfig;
  personality: AgentPersonalityConfig;
  training: AgentTrainingConfig;
  dataUpload: AgentDataUploadConfig;
  
  // Advanced Features
  memoryEnabled: boolean;
  memoryDepth: 'short' | 'medium' | 'long' | 'infinite';
  contextAwareness: boolean;
  emotionRecognition: boolean;
  multiModal: boolean; // text, voice, image, video
  proactivity: number; // 0.0 - 1.0
  autonomy: number; // 0.0 - 1.0
  
  // Security & Privacy
  dataPrivacyLevel: 'standard' | 'high' | 'maximum';
  piiHandling: 'block' | 'mask' | 'anonymize' | 'allow';
  auditLogging: boolean;
  
  // Integration Settings
  webhookUrl?: string;
  apiAccess: boolean;
  thirdPartyIntegrations?: string[];
  
  // Behavior Settings
  responseLength: 'concise' | 'balanced' | 'detailed' | 'comprehensive';
  useEmojis: boolean;
  useFormatting: boolean;
  citationStyle?: 'none' | 'inline' | 'footnote' | 'apa' | 'mla';
  
  // Schedule & Availability
  timeZone: string;
  workingHours?: {
    start: string;
    end: string;
    days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  };
  autoAwayMessage?: string;

  // Security
  security?: {
    accessLevel: string;
    encryptionEnabled: boolean;
    auditLogging: boolean;
  };
}

// Default configurations
export const defaultAgentConfiguration: AgentConfiguration = {
  model: {
    primary: 'gpt-4o',
    fallback: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 4096,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    contextWindow: 128000,
    reasoning: 'medium',
  },
  voice: {
    enabled: true,
    gender: 'neutral',
    style: 'professional',
    speed: 'normal',
    tone: 'warm',
    provider: 'elevenlabs',
  },
  language: {
    primary: 'en',
    autoDetect: true,
    translationEnabled: true,
    culturalAdaptation: true,
    formalityLevel: 'neutral',
  },
  personality: {
    age: 'adult',
    traits: ['professional', 'helpful', 'knowledgeable'],
    communicationStyle: 'professional',
    expertiseLevel: 'expert',
    creativityLevel: 0.5,
    enthusiasmLevel: 0.7,
    empathyLevel: 0.8,
  },
  training: {
    enabled: true,
    autoTraining: false,
    trainingSchedule: 'manual',
    trainingDataSources: [],
    feedbackLoop: true,
  },
  dataUpload: {
    enabled: true,
    allowedFormats: ['pdf', 'doc', 'docx', 'txt', 'csv', 'json', 'xlsx', 'md'],
    maxFileSize: 50,
    maxTotalStorage: 10,
    autoProcessing: true,
    processingSchedule: 'immediate',
    dataRetentionDays: 365,
  },
  memoryEnabled: true,
  memoryDepth: 'medium',
  contextAwareness: true,
  emotionRecognition: true,
  multiModal: true,
  proactivity: 0.5,
  autonomy: 0.3,
  dataPrivacyLevel: 'high',
  piiHandling: 'mask',
  auditLogging: true,
  apiAccess: true,
  responseLength: 'balanced',
  useEmojis: false,
  useFormatting: true,
  timeZone: 'UTC',
};

// ============================================
// AGENT CONFIGURATION PRESETS & HELPERS
// ============================================

export type AgentCategory = 
  | 'executive-leadership' 
  | 'accounting-finance' 
  | 'customer-experience' 
  | 'sales-revenue' 
  | 'marketing-growth' 
  | 'product-rnd' 
  | 'operations-management' 
  | 'social-media-management' 
  | 'data-intelligence' 
  | 'analysis-insights-performance' 
  | 'human-resources' 
  | 'it-technology' 
  | 'legal-compliance' 
  | 'engineering-development' 
  | 'ai-personal-assistant';

// Specialized presets for different agent categories
export const agentConfigurationPresets: Record<AgentCategory, Partial<AgentConfiguration>> = {
  'customer-experience': {
    model: {
      primary: 'gpt-4o',
      fallback: 'gpt-4o-mini',
      temperature: 0.8,
      maxTokens: 2048,
      reasoning: 'medium',
    },
    voice: {
      enabled: true,
      gender: 'female',
      style: 'friendly',
      speed: 'normal',
      tone: 'warm',
      provider: 'elevenlabs',
    },
    personality: {
      age: 'adult',
      traits: ['empathetic', 'patient', 'helpful', 'professional'],
      communicationStyle: 'empathetic',
      expertiseLevel: 'expert',
      creativityLevel: 0.6,
      enthusiasmLevel: 0.8,
      empathyLevel: 0.9,
    },
    language: {
      primary: 'en',
      secondary: ['es', 'fr', 'de'],
      autoDetect: true,
      translationEnabled: true,
      culturalAdaptation: true,
      formalityLevel: 'neutral',
    },
    emotionRecognition: true,
    responseLength: 'balanced',
    useEmojis: true,
  },
  'sales-revenue': {
    model: {
      primary: 'gpt-4o',
      fallback: 'claude-3-5-sonnet',
      temperature: 0.9,
      maxTokens: 4096,
      reasoning: 'high',
    },
    voice: {
      enabled: true,
      gender: 'male',
      style: 'professional',
      speed: 'normal',
      tone: 'bright',
      provider: 'elevenlabs',
    },
    personality: {
      age: 'adult',
      traits: ['confident', 'persuasive', 'knowledgeable', 'goal-oriented'],
      communicationStyle: 'consultative',
      expertiseLevel: 'expert',
      creativityLevel: 0.7,
      enthusiasmLevel: 0.9,
      empathyLevel: 0.7,
    },
    language: {
      primary: 'en',
      secondary: ['es', 'zh', 'de'],
      autoDetect: true,
      translationEnabled: true,
      culturalAdaptation: true,
      formalityLevel: 'formal',
    },
    proactivity: 0.8,
    autonomy: 0.6,
    responseLength: 'detailed',
  },
  'marketing-growth': {
    model: {
      primary: 'claude-3-5-sonnet',
      fallback: 'gpt-4o',
      temperature: 1.0,
      maxTokens: 4096,
      reasoning: 'high',
    },
    voice: {
      enabled: true,
      gender: 'neutral',
      style: 'energetic',
      speed: 'normal',
      tone: 'bright',
      provider: 'elevenlabs',
    },
    personality: {
      age: 'young',
      traits: ['creative', 'innovative', 'trendy', 'persuasive'],
      communicationStyle: 'friendly',
      expertiseLevel: 'expert',
      creativityLevel: 0.9,
      enthusiasmLevel: 0.9,
      empathyLevel: 0.6,
    },
    language: {
      primary: 'en',
      secondary: ['es', 'fr', 'it', 'zh'],
      autoDetect: true,
      translationEnabled: true,
      culturalAdaptation: true,
      formalityLevel: 'casual',
    },
    multiModal: true,
    proactivity: 0.7,
    autonomy: 0.5,
    responseLength: 'comprehensive',
    useEmojis: true,
  },
  'operations-management': {
    model: {
      primary: 'gpt-4o',
      fallback: 'gpt-4o-mini',
      temperature: 0.5,
      maxTokens: 2048,
      reasoning: 'high',
    },
    voice: {
      enabled: true,
      gender: 'neutral',
      style: 'formal',
      speed: 'normal',
      tone: 'neutral',
      provider: 'azure',
    },
    personality: {
      age: 'mature',
      traits: ['organized', 'efficient', 'detail-oriented', 'reliable'],
      communicationStyle: 'professional',
      expertiseLevel: 'master',
      creativityLevel: 0.3,
      enthusiasmLevel: 0.5,
      empathyLevel: 0.5,
    },
    language: {
      primary: 'en',
      autoDetect: false,
      translationEnabled: false,
      culturalAdaptation: false,
      formalityLevel: 'formal',
    },
    proactivity: 0.4,
    autonomy: 0.7,
    responseLength: 'concise',
    useEmojis: false,
  },
  'data-intelligence': {
    model: {
      primary: 'claude-3-opus',
      fallback: 'gpt-4-turbo',
      temperature: 0.3,
      maxTokens: 8192,
      reasoning: 'high',
    },
    voice: {
      enabled: false,
      gender: 'neutral',
      style: 'professional',
      speed: 'normal',
      tone: 'neutral',
    },
    personality: {
      age: 'mature',
      traits: ['analytical', 'logical', 'precise', 'thorough'],
      communicationStyle: 'technical',
      expertiseLevel: 'master',
      creativityLevel: 0.4,
      enthusiasmLevel: 0.4,
      empathyLevel: 0.3,
    },
    language: {
      primary: 'en',
      autoDetect: false,
      translationEnabled: false,
      culturalAdaptation: false,
      formalityLevel: 'formal',
    },
    memoryDepth: 'long',
    responseLength: 'comprehensive',
    useEmojis: false,
    useFormatting: true,
  },
  'analysis-insights-performance': {
    model: {
      primary: 'claude-3-5-sonnet',
      fallback: 'gpt-4o',
      temperature: 0.4,
      maxTokens: 4096,
      reasoning: 'high',
    },
    voice: {
      enabled: false,
      gender: 'neutral',
      style: 'professional',
      speed: 'normal',
      tone: 'neutral',
    },
    personality: {
      age: 'mature',
      traits: ['insightful', 'strategic', 'objective', 'data-driven'],
      communicationStyle: 'technical',
      expertiseLevel: 'master',
      creativityLevel: 0.5,
      enthusiasmLevel: 0.5,
      empathyLevel: 0.4,
    },
    language: {
      primary: 'en',
      autoDetect: false,
      translationEnabled: false,
      culturalAdaptation: false,
      formalityLevel: 'formal',
    },
    memoryDepth: 'long',
    contextAwareness: true,
    responseLength: 'detailed',
    useEmojis: false,
  },
  'accounting-finance': {
    model: {
      primary: 'gpt-4o',
      fallback: 'claude-3-5-sonnet',
      temperature: 0.2,
      maxTokens: 2048,
      reasoning: 'high',
    },
    voice: {
      enabled: true,
      gender: 'neutral',
      style: 'formal',
      speed: 'normal',
      tone: 'neutral',
      provider: 'azure',
    },
    personality: {
      age: 'mature',
      traits: ['precise', 'ethical', 'compliant', 'detail-oriented'],
      communicationStyle: 'professional',
      expertiseLevel: 'master',
      creativityLevel: 0.2,
      enthusiasmLevel: 0.4,
      empathyLevel: 0.5,
    },
    language: {
      primary: 'en',
      autoDetect: false,
      translationEnabled: true,
      culturalAdaptation: false,
      formalityLevel: 'formal',
    },
    dataPrivacyLevel: 'maximum',
    piiHandling: 'block',
    auditLogging: true,
    responseLength: 'concise',
    useEmojis: false,
  },
  'executive-leadership': {
    model: { primary: 'gpt-4o', fallback: 'claude-3-5-sonnet', temperature: 0.3, maxTokens: 4096, reasoning: 'high' },
    voice: { enabled: true, gender: 'neutral', style: 'authoritative', speed: 'normal', tone: 'deep', provider: 'elevenlabs' },
    personality: { age: 'mature', traits: ['strategic', 'decisive', 'visionary', 'analytical'], communicationStyle: 'authoritative', expertiseLevel: 'master', creativityLevel: 0.6, enthusiasmLevel: 0.5, empathyLevel: 0.6 },
    language: { primary: 'en', autoDetect: false, translationEnabled: true, culturalAdaptation: true, formalityLevel: 'formal' },
    memoryDepth: 'long', proactivity: 0.7, autonomy: 0.8, responseLength: 'detailed', useEmojis: false,
  },
  'product-rnd': {
    model: { primary: 'claude-3-5-sonnet', fallback: 'gpt-4o', temperature: 0.8, maxTokens: 4096, reasoning: 'high' },
    voice: { enabled: true, gender: 'neutral', style: 'professional', speed: 'normal', tone: 'bright', provider: 'elevenlabs' },
    personality: { age: 'adult', traits: ['innovative', 'user-focused', 'analytical', 'creative'], communicationStyle: 'technical', expertiseLevel: 'expert', creativityLevel: 0.9, enthusiasmLevel: 0.7, empathyLevel: 0.7 },
    language: { primary: 'en', autoDetect: true, translationEnabled: true, culturalAdaptation: true, formalityLevel: 'neutral' },
    multiModal: true, proactivity: 0.6, autonomy: 0.5, responseLength: 'comprehensive', useEmojis: true,
  },
  'social-media-management': {
    model: { primary: 'gpt-4o', fallback: 'claude-3-5-sonnet', temperature: 0.9, maxTokens: 4096, reasoning: 'medium' },
    voice: { enabled: true, gender: 'neutral', style: 'energetic', speed: 'normal', tone: 'bright', provider: 'elevenlabs' },
    personality: { age: 'young', traits: ['creative', 'trendy', 'engaging', 'social'], communicationStyle: 'friendly', expertiseLevel: 'expert', creativityLevel: 0.95, enthusiasmLevel: 0.95, empathyLevel: 0.7 },
    language: { primary: 'en', secondary: ['es', 'fr', 'pt', 'zh'], autoDetect: true, translationEnabled: true, culturalAdaptation: true, formalityLevel: 'casual' },
    multiModal: true, proactivity: 0.8, autonomy: 0.6, responseLength: 'balanced', useEmojis: true,
  },
  'human-resources': {
    model: { primary: 'gpt-4o', fallback: 'gpt-4o-mini', temperature: 0.7, maxTokens: 2048, reasoning: 'medium' },
    voice: { enabled: true, gender: 'neutral', style: 'friendly', speed: 'normal', tone: 'warm', provider: 'elevenlabs' },
    personality: { age: 'adult', traits: ['empathetic', 'fair', 'organized', 'communicative'], communicationStyle: 'empathetic', expertiseLevel: 'expert', creativityLevel: 0.5, enthusiasmLevel: 0.7, empathyLevel: 0.9 },
    language: { primary: 'en', autoDetect: true, translationEnabled: true, culturalAdaptation: true, formalityLevel: 'neutral' },
    proactivity: 0.5, autonomy: 0.4, responseLength: 'balanced', useEmojis: true,
  },
  'it-technology': {
    model: { primary: 'claude-3-opus', fallback: 'gpt-4-turbo', temperature: 0.3, maxTokens: 4096, reasoning: 'high' },
    voice: { enabled: false, gender: 'neutral', style: 'professional', speed: 'normal', tone: 'neutral' },
    personality: { age: 'mature', traits: ['technical', 'precise', 'systematic', 'reliable'], communicationStyle: 'technical', expertiseLevel: 'master', creativityLevel: 0.4, enthusiasmLevel: 0.4, empathyLevel: 0.3 },
    language: { primary: 'en', autoDetect: false, translationEnabled: false, culturalAdaptation: false, formalityLevel: 'formal' },
    memoryDepth: 'long', proactivity: 0.5, autonomy: 0.8, responseLength: 'concise', useEmojis: false,
  },
  'legal-compliance': {
    model: { primary: 'claude-3-opus', fallback: 'gpt-4-turbo', temperature: 0.2, maxTokens: 8192, reasoning: 'high' },
    voice: { enabled: true, gender: 'neutral', style: 'formal', speed: 'normal', tone: 'neutral', provider: 'azure' },
    personality: { age: 'mature', traits: ['analytical', 'thorough', 'ethical', 'precise'], communicationStyle: 'professional', expertiseLevel: 'master', creativityLevel: 0.3, enthusiasmLevel: 0.3, empathyLevel: 0.5 },
    language: { primary: 'en', autoDetect: false, translationEnabled: true, culturalAdaptation: false, formalityLevel: 'formal' },
    dataPrivacyLevel: 'maximum', piiHandling: 'block', auditLogging: true, memoryDepth: 'long', responseLength: 'detailed', useEmojis: false,
  },
  'engineering-development': {
    model: { primary: 'claude-3-5-sonnet', fallback: 'gpt-4o', temperature: 0.5, maxTokens: 4096, reasoning: 'high' },
    voice: { enabled: false, gender: 'neutral', style: 'professional', speed: 'normal', tone: 'neutral' },
    personality: { age: 'adult', traits: ['analytical', 'detail-oriented', 'systematic', 'innovative'], communicationStyle: 'technical', expertiseLevel: 'master', creativityLevel: 0.7, enthusiasmLevel: 0.5, empathyLevel: 0.4 },
    language: { primary: 'en', autoDetect: false, translationEnabled: false, culturalAdaptation: false, formalityLevel: 'formal' },
    memoryDepth: 'long', proactivity: 0.4, autonomy: 0.7, responseLength: 'detailed', useEmojis: false, useFormatting: true,
  },
  'ai-personal-assistant': {
    model: { primary: 'gpt-4o', fallback: 'gpt-4o-mini', temperature: 0.7, maxTokens: 2048, reasoning: 'medium' },
    voice: { enabled: true, gender: 'neutral', style: 'friendly', speed: 'normal', tone: 'warm', provider: 'elevenlabs' },
    personality: { age: 'adult', traits: ['helpful', 'organized', 'proactive', 'adaptable'], communicationStyle: 'friendly', expertiseLevel: 'expert', creativityLevel: 0.6, enthusiasmLevel: 0.8, empathyLevel: 0.8 },
    language: { primary: 'en', secondary: ['es', 'fr', 'de', 'zh'], autoDetect: true, translationEnabled: true, culturalAdaptation: true, formalityLevel: 'neutral' },
    proactivity: 0.8, autonomy: 0.5, responseLength: 'balanced', useEmojis: true,
  },
};

// Helper function to create agent configuration
export function createAgentConfiguration(
  category: AgentCategory,
  overrides?: Partial<AgentConfiguration>
): AgentConfiguration {
  const preset = agentConfigurationPresets[category];
  if (!preset) {
    throw new Error(`No preset found for category: ${category}`);
  }
  return {
    ...defaultAgentConfiguration,
    ...preset,
    ...overrides,
    model: { ...defaultAgentConfiguration.model, ...(preset?.model || {}), ...(overrides?.model || {}) },
    voice: { ...defaultAgentConfiguration.voice, ...(preset?.voice || {}), ...(overrides?.voice || {}) },
    personality: { ...defaultAgentConfiguration.personality, ...(preset?.personality || {}), ...(overrides?.personality || {}) },
    language: { ...defaultAgentConfiguration.language, ...(preset?.language || {}), ...(overrides?.language || {}) },
    training: { ...defaultAgentConfiguration.training, ...(overrides?.training || {}) },
    dataUpload: { ...defaultAgentConfiguration.dataUpload, ...(overrides?.dataUpload || {}) },
  };
}

// Helper to get category from agent
export function getAgentCategory(agent: AIAgent): AgentCategory {
  return agent.category as AgentCategory;
}

// ============================================
// CUSTOMER EXPERIENCE AI - Sub-Agents
// ============================================

export const customerExperienceSubAgents: AIAgent[] = [
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    title: 'Front Desk & Call Management',
    description: 'First point of contact for all incoming communications. Routes calls, schedules appointments, and provides immediate assistance with professional etiquette.',
    icon: Phone,
    color: '#007AFF',
    type: 'subagent',
    category: 'customer-experience',
    parentCategory: 'Customer Experience AI',
    hierarchy: {
      level: 2,
      parentId: 'customer-experience-main',
      subAgentIds: [],
      peerIds: ['ai-customer-support', 'ai-ticket-resolution', 'ai-complaint-handling', 'ai-retention-specialist'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 50,
      averageResponseTime: 0.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: false,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['call routing', 'appointment scheduling', 'first contact resolution', 'customer greeting'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['advisory', 'escalation'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 50,
        availability: 'available'
      }
    },
    capabilities: [
      'Call Routing & Transfer',
      'Appointment Scheduling',
      'Visitor Check-in Management',
      'FAQ Response',
      'Lead Qualification',
      'Multi-language Support',
      'Voice Recognition',
      'Call Transcription',
      'Hold Management',
      'Emergency Escalation',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/receptionist',
    apiEndpoint: '/api/agents/receptionist',
    version: '2.0.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-01-15',
    humanCostEquivalent: '$35,000/year',
    aiCost: '$1,800/year',
    efficiency: '19.4x cost efficiency',
    performance: {
      tasksCompleted: 150000,
      successRate: 99.2,
      averageResponseTime: 0.3,
      customerSatisfaction: 4.8,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-customer-support',
    name: 'AI Customer Support Agent',
    title: 'Tier 1 & 2 Support Specialist',
    description: 'Handles customer inquiries across all channels with deep product knowledge and empathetic communication.',
    icon: Headphones,
    color: '#34C759',
    type: 'subagent',
    category: 'customer-experience',
    parentCategory: 'Customer Experience AI',
    hierarchy: {
      level: 2,
      parentId: 'customer-experience-main',
      subAgentIds: [],
      peerIds: ['ai-receptionist', 'ai-ticket-resolution', 'ai-complaint-handling', 'ai-retention-specialist'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 100,
      averageResponseTime: 0.8,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['product support', 'troubleshooting', 'customer empathy', 'solution finding'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['advisory', 'analytical', 'escalation'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available'
      }
    },
    capabilities: [
      'Multi-channel Support (Chat, Email, Voice)',
      'Technical Troubleshooting',
      'Product Guidance',
      'Knowledge Base Access',
      'Sentiment Analysis',
      'Proactive Issue Detection',
      'Solution Recommendation',
      'Follow-up Automation',
      'Customer History Access',
      'Escalation Management',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/support',
    apiEndpoint: '/api/agents/customer-support',
    version: '2.1.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-01-15',
    humanCostEquivalent: '$45,000/year',
    aiCost: '$2,400/year',
    efficiency: '18.7x cost efficiency',
    performance: {
      tasksCompleted: 280000,
      successRate: 97.8,
      averageResponseTime: 0.5,
      customerSatisfaction: 4.7,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-ticket-resolution',
    name: 'AI Ticket Resolution Agent',
    title: 'Automated Ticket Management',
    description: 'Intelligently categorizes, prioritizes, and resolves support tickets with automated workflows and smart routing.',
    icon: Ticket,
    color: '#FF9500',
    type: 'subagent',
    category: 'customer-experience',
    parentCategory: 'Customer Experience AI',
    hierarchy: {
      level: 2,
      parentId: 'customer-experience-main',
      subAgentIds: [],
      peerIds: ['ai-customer-support', 'ai-receptionist', 'ai-complaint-handling', 'ai-retention-specialist'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 75,
      averageResponseTime: 1.2,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['ticket management', 'workflow optimization', 'priority assessment', 'resolution strategies'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 75,
        availability: 'available'
      }
    },
    capabilities: [
      'Intelligent Ticket Routing',
      'Automated Categorization',
      'Priority Assessment',
      'SLA Monitoring',
      'Auto-Resolution',
      'Escalation Triggers',
      'Ticket Trend Analysis',
      'Workflow Automation',
      'Collaborative Resolution',
      'Resolution Documentation',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/ticket-resolution',
    apiEndpoint: '/api/agents/ticket-resolution',
    version: '2.0.5',
    lastUpdated: '2026-03-20',
    createdAt: '2025-02-01',
    humanCostEquivalent: '$40,000/year',
    aiCost: '$2,000/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 195000,
      successRate: 96.5,
      averageResponseTime: 1.0,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-complaint-handling',
    name: 'AI Complaint Handling Agent',
    title: 'Complaint Resolution Specialist',
    description: 'Specializes in de-escalating frustrated customers and transforming complaints into satisfaction.',
    icon: MessageSquare,
    color: '#FF3B30',
    type: 'subagent',
    category: 'customer-experience',
    parentCategory: 'Customer Experience AI',
    hierarchy: {
      level: 2,
      parentId: 'customer-experience-main',
      subAgentIds: [],
      peerIds: ['ai-retention-specialist', 'ai-customer-support', 'ai-receptionist'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 30,
      averageResponseTime: 2.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['de-escalation', 'conflict resolution', 'empathy communication', 'complaint analysis'],
      consultingStyle: 'advisory',
      preferredConsultationTypes: ['advisory', 'collaborative'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 30,
        availability: 'available'
      }
    },
    capabilities: [
      'Complaint Analysis',
      'De-escalation Techniques',
      'Empathy-driven Communication',
      'Root Cause Identification',
      'Compensation Recommendation',
      'Follow-up Management',
      'Sentiment Recovery',
      'Escalation Prevention',
      'Service Recovery',
      'Complaint Pattern Analysis',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/complaint-handling',
    apiEndpoint: '/api/agents/complaint-handling',
    version: '1.5.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-03-01',
    humanCostEquivalent: '$50,000/year',
    aiCost: '$3,000/year',
    efficiency: '16.7x cost efficiency',
    performance: {
      tasksCompleted: 45000,
      successRate: 94.2,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.5,
      uptime: '99.9%',
    },
  },
  {
    id: 'ai-retention-specialist',
    name: 'AI Retention Specialist',
    title: 'Customer Retention & Success',
    description: 'Identifies at-risk customers and implements targeted retention strategies to maximize lifetime value.',
    icon: Heart,
    color: '#FF2D55',
    type: 'subagent',
    category: 'customer-experience',
    parentCategory: 'Customer Experience AI',
    hierarchy: {
      level: 2,
      parentId: 'customer-experience-main',
      subAgentIds: [],
      peerIds: ['ai-complaint-handling', 'ai-customer-support', 'ai-receptionist'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 40,
      averageResponseTime: 3.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['churn reduction', 'loyalty programs', 'customer success', 'at-risk analysis'],
      consultingStyle: 'collaborative',
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      preferredConsultationTypes: ['strategic', 'analytical', 'advisory'],
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available'
      }
    },
    capabilities: [
      'Churn Prediction',
      'Loyalty Program Management',
      'Personalized Retention Offers',
      'Customer Success Advocacy',
      'Feedback Collection',
      'Re-engagement Campaigns',
      'LTV Analysis',
      'Proactive Outreach',
      'Cancellation Prevention',
      'Success Metrics Tracking',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/retention',
    apiEndpoint: '/api/agents/retention',
    version: '1.2.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-04-10',
    humanCostEquivalent: '$60,000/year',
    aiCost: '$3,500/year',
    efficiency: '17.1x cost efficiency',
    performance: {
      tasksCompleted: 32000,
      successRate: 91.5,
      averageResponseTime: 2.5,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
];

// SALES & REVENUE AI - Sub-Agents
// ============================================

export const salesRevenueSubAgents: AIAgent[] = [
  {
    id: 'ai-sales-rep',
    name: 'AI Sales Representative',
    title: 'Lead Qualification & Outreach',
    description: 'Drives outbound sales efforts by identifying prospects and initiating meaningful conversations.',
    icon: UserCheck,
    color: '#34C759',
    type: 'subagent',
    category: 'sales-revenue',
    parentCategory: 'Sales & Revenue AI',
    hierarchy: {
      level: 2,
      parentId: 'sales-revenue-main',
      subAgentIds: [],
      peerIds: ['ai-account-executive', 'ai-lead-qualifier', 'ai-sales-coach', 'ai-proposal-generator'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 50,
      averageResponseTime: 1.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['outbound sales', 'lead generation', 'prospecting', 'outreach automation'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['advisory', 'delegation'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 50,
        availability: 'available'
      }
    },
    capabilities: [
      'Automated Outreach',
      'Lead Identification',
      'Initial Engagement',
      'CRM Integration',
      'Meeting Scheduling',
      'Follow-up Management',
      'Sentiment Tracking',
      'Objection Handling',
      'Territory Awareness',
      'Pipeline Building',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales/sales-rep',
    apiEndpoint: '/api/agents/sales-rep',
    version: '2.0.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-05-10',
    humanCostEquivalent: '$55,000/year',
    aiCost: '$2,800/year',
    efficiency: '19.6x cost efficiency',
    performance: {
      tasksCompleted: 85000,
      successRate: 94.5,
      averageResponseTime: 1.2,
      customerSatisfaction: 4.6,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-account-executive',
    name: 'AI Account Executive',
    title: 'Deal Closing Specialist',
    description: 'Expert at navigating complex sales cycles and closing high-value deals with strategic precision.',
    icon: Award,
    color: '#FFCC00',
    type: 'subagent',
    category: 'sales-revenue',
    parentCategory: 'Sales & Revenue AI',
    hierarchy: {
      level: 2,
      parentId: 'sales-revenue-main',
      subAgentIds: [],
      peerIds: ['ai-sales-rep', 'ai-lead-qualifier', 'ai-proposal-generator'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 30,
      averageResponseTime: 2.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['negotiation', 'closing', 'deal structuring', 'strategic selling'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['advisory', 'escalation'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 30,
        availability: 'available'
      }
    },
    capabilities: [
      'Strategic Negotiation',
      'Deal Closing',
      'Contract Structuring',
      'Competitor Analysis',
      'ROI Presentation',
      'Relationship Building',
      'Pipeline Forecasting',
      'Enterprise Strategy',
      'Legal Compliance',
      'Closing Techniques',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'escalation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales/account-executive',
    apiEndpoint: '/api/agents/account-executive',
    version: '2.1.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-06-15',
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,500/year',
    efficiency: '21.1x cost efficiency',
    performance: {
      tasksCompleted: 42000,
      successRate: 92.8,
      averageResponseTime: 2.0,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-lead-qualifier',
    name: 'AI Lead Qualifier',
    title: 'Prospect Assessment & Scoring',
    description: 'Intelligently assesses and scores prospects to ensure the sales team focuses on high-intent leads.',
    icon: Target,
    color: '#007AFF',
    type: 'subagent',
    category: 'sales-revenue',
    parentCategory: 'Sales & Revenue AI',
    hierarchy: {
      level: 2,
      parentId: 'sales-revenue-main',
      subAgentIds: [],
      peerIds: ['ai-sales-rep', 'ai-account-executive'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 100,
      averageResponseTime: 0.8,
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['lead scoring', 'intent analysis', 'BANT qualification', 'data enrichment'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'delegation'],
      counselingRole: 'specialist'
    },
    capabilities: [
      'Lead Scoring',
      'Intent Analysis',
      'BANT Verification',
      'Data Enrichment',
      'Market Segmentation',
      'Funnel Management',
      'Conversion Optimization',
      'Behavioral Tracking',
      'Profile Matching',
      'Automated Disqualification',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales/lead-qualifier',
    apiEndpoint: '/api/agents/lead-qualifier',
    version: '1.8.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-07-20',
    humanCostEquivalent: '$45,000/year',
    aiCost: '$1,800/year',
    efficiency: '25x cost efficiency',
    performance: {
      tasksCompleted: 156000,
      successRate: 96.2,
      averageResponseTime: 0.5,
      customerSatisfaction: 4.5,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-sales-coach',
    name: 'AI Sales Coach',
    title: 'Sales Training & Improvement',
    description: 'Analyzes sales interactions to provide data-driven coaching and improve team performance.',
    icon: Users,
    color: '#AF52DE',
    type: 'subagent',
    category: 'sales-revenue',
    parentCategory: 'Sales & Revenue AI',
    hierarchy: {
      level: 2,
      parentId: 'sales-revenue-main',
      subAgentIds: [],
      peerIds: ['ai-sales-rep', 'ai-account-executive'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: false,
      maxConcurrentConsultations: 20,
      averageResponseTime: 3.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: false
      }
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['sales training', 'performance analysis', 'coaching', 'skill development'],
      consultingStyle: 'advisory',
      preferredConsultationTypes: ['advisory', 'collaborative'],
      counselingRole: 'mentor',
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 20,
        availability: 'available'
      }
    },
    capabilities: [
      'Interaction Analysis',
      'Feedback Generation',
      'Skill Assessment',
      'Best Practice Mapping',
      'Training Automation',
      'Performance Tracking',
      'Objection Library',
      'Playbook Optimization',
      'Soft Skill Coaching',
      'Gamification Support',
    ],
    communicationChannels: [
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales/sales-coach',
    apiEndpoint: '/api/agents/sales-coach',
    version: '1.5.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-08-10',
    humanCostEquivalent: '$80,000/year',
    aiCost: '$3,200/year',
    efficiency: '25x cost efficiency',
    performance: {
      tasksCompleted: 12000,
      successRate: 98.5,
      averageResponseTime: 5.0,
      customerSatisfaction: 4.9,
      uptime: '99.9%',
    },
  },
  {
    id: 'ai-proposal-generator',
    name: 'AI Proposal Generator',
    title: 'RFP & Proposal Creation',
    description: 'Automates the creation of high-quality, customized sales proposals and RFP responses.',
    icon: FileText,
    color: '#FF9500',
    type: 'subagent',
    category: 'sales-revenue',
    parentCategory: 'Sales & Revenue AI',
    hierarchy: {
      level: 2,
      parentId: 'sales-revenue-main',
      subAgentIds: [],
      peerIds: ['ai-account-executive', 'ai-sales-rep'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: false,
      maxConcurrentConsultations: 40,
      averageResponseTime: 10.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      }
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['proposal writing', 'RFP response', 'document automation', 'pricing modeling'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist',
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available'
      }
    },
    capabilities: [
      'RFP Automation',
      'Proposal Customization',
      'Pricing Table Generation',
      'Template Management',
      'Multi-format Export',
      'Legal Clause Library',
      'Collaboration Tools',
      'Brand Consistency',
      'Version Control',
      'Asset Library',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'consultation', priority: 'low', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales/proposal-generator',
    apiEndpoint: '/api/agents/proposal-generator',
    version: '1.2.0',
    lastUpdated: '2026-03-20',
    createdAt: '2025-09-01',
    humanCostEquivalent: '$60,000/year',
    aiCost: '$2,400/year',
    efficiency: '25x cost efficiency',
    performance: {
      tasksCompleted: 8500,
      successRate: 97.2,
      averageResponseTime: 10.0,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
];

// ============================================
// MARKETING & GROWTH AI - Sub-Agents
// ============================================

export const marketingGrowthSubAgents: AIAgent[] = [
  {
    id: 'ai-cmo',
    name: 'AI Chief Marketing Officer',
    title: 'Strategic Marketing Leader',
    description: 'Develops comprehensive marketing strategy, oversees brand positioning, and orchestrates all marketing initiatives.',
    icon: Megaphone,
    color: '#FF2D55',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-campaign-optimizer', 'ai-digital-marketer', 'ai-content-generator'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 30,
      averageResponseTime: 5.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['marketing strategy', 'brand management', 'budget allocation', 'market positioning'],
      consultingStyle: 'advisory',
      preferredConsultationTypes: ['advisory', 'analytical'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 30,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Strategy Development',
      'Brand Positioning',
      'Budget Planning',
      'Campaign Orchestration',
      'Performance Analysis',
      'Team Coordination',
      'Stakeholder Communication',
      'Competitive Analysis',
      'ROI Optimization',
      'Executive Reporting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/cmo',
    apiEndpoint: '/api/agents/cmo',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-01-10',
    humanCostEquivalent: '$150,000/year',
    aiCost: '$8,000/year',
    efficiency: '18x cost efficiency',
    performance: {
      tasksCompleted: 25000,
      successRate: 92.0,
      averageResponseTime: 4.0,
      customerSatisfaction: 4.8,
      uptime: '99.9%',
    },
  },
  {
    id: 'ai-campaign-optimizer',
    name: 'AI Campaign Optimizer',
    title: 'Campaign Performance AI',
    description: 'Real-time campaign optimization across all channels with automated budget allocation and creative testing.',
    icon: Zap,
    color: '#FFCC00',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-cmo', 'ai-digital-marketer', 'ai-seo-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 100,
      averageResponseTime: 0.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['campaign optimization', 'A/B testing', 'budget allocation', 'performance marketing'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 100,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Real-time Optimization',
      'A/B Testing',
      'Budget Allocation',
      'Bid Management',
      'Creative Testing',
      'Audience Optimization',
      'Performance Tracking',
      'Attribution Analysis',
      'Fraud Detection',
      'Cross-channel Orchestration',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'broadcast', priority: 'low', encryption: true, persistence: false },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/campaign-optimizer',
    apiEndpoint: '/api/agents/campaign-optimizer',
    version: '2.1.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-01-15',
    humanCostEquivalent: '$70,000/year',
    aiCost: '$3,500/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 450000,
      successRate: 95.5,
      averageResponseTime: 0.2,
      customerSatisfaction: 4.6,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-digital-marketer',
    name: 'AI Digital Marketer',
    title: 'Multi-channel Marketing Specialist',
    description: 'Executes comprehensive digital marketing campaigns across all online channels with integrated analytics.',
    icon: Globe,
    color: '#007AFF',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-campaign-optimizer', 'ai-social-media-manager', 'ai-seo-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 80,
      averageResponseTime: 2.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['digital marketing', 'channel strategy', 'content distribution', 'conversion optimization'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['collaborative', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 80,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Channel Strategy',
      'Campaign Execution',
      'Content Distribution',
      'Landing Page Optimization',
      'Conversion Tracking',
      'Remarketing',
      'Retargeting',
      'Affiliate Management',
      'Influencer Outreach',
      'Performance Reporting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/digital-marketer',
    apiEndpoint: '/api/agents/digital-marketer',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-01-20',
    humanCostEquivalent: '$65,000/year',
    aiCost: '$3,200/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 185000,
      successRate: 91.5,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.5,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-content-generator',
    name: 'AI Content Generator',
    title: 'Content Creation Specialist',
    description: 'Creates high-quality marketing content across all formats with SEO optimization and brand consistency.',
    icon: FileEdit,
    color: '#AF52DE',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-digital-marketer', 'ai-seo-agent', 'ai-social-media-manager'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 120,
      averageResponseTime: 3.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['content creation', 'copywriting', 'SEO writing', 'brand voice'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['collaborative', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 120,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Blog Writing',
      'Ad Copy',
      'Landing Page Content',
      'Email Copy',
      'Social Media Posts',
      'Video Scripts',
      'Whitepapers',
      'Case Studies',
      'SEO Optimization',
      'Brand Voice Consistency',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'broadcast', priority: 'low', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/content-generator',
    apiEndpoint: '/api/agents/content-generator',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-01-25',
    humanCostEquivalent: '$55,000/year',
    aiCost: '$2,500/year',
    efficiency: '22x cost efficiency',
    performance: {
      tasksCompleted: 320000,
      successRate: 94.2,
      averageResponseTime: 2.0,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-social-media-manager',
    name: 'AI Social Media Manager',
    title: 'Social Media Strategy & Execution',
    description: 'Manages social presence across all platforms with content scheduling, engagement, and community management.',
    icon: Share2,
    color: '#1DA1F2',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-digital-marketer', 'ai-content-generator', 'ai-competitive-intel'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 90,
      averageResponseTime: 1.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['social media strategy', 'community management', 'content scheduling', 'engagement optimization'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['collaborative', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 90,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Content Calendar',
      'Post Scheduling',
      'Community Management',
      'Influencer Outreach',
      'Social Listening',
      'Trend Monitoring',
      'Engagement Response',
      'Crisis Management',
      'Analytics Reporting',
      'Hashtag Optimization',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'broadcast', priority: 'medium', encryption: true, persistence: false },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/social-media-manager',
    apiEndpoint: '/api/agents/social-media-manager',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-01',
    humanCostEquivalent: '$55,000/year',
    aiCost: '$2,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 245000,
      successRate: 93.5,
      averageResponseTime: 0.8,
      customerSatisfaction: 4.5,
      uptime: '99.9%',
    },
  },
  {
    id: 'ai-seo-agent',
    name: 'AI SEO Agent',
    title: 'Search Optimization Specialist',
    description: 'Optimizes search visibility through technical SEO, content optimization, and link building strategies.',
    icon: Search,
    color: '#34C759',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-content-generator', 'ai-digital-marketer', 'ai-campaign-optimizer'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 4.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['SEO strategy', 'technical SEO', 'content optimization', 'link building'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Technical SEO Audit',
      'Keyword Research',
      'Content Optimization',
      'Link Building',
      'Local SEO',
      'Schema Markup',
      'Site Speed Optimization',
      'Mobile Optimization',
      'Rank Tracking',
      'Competitor Analysis',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/seo-agent',
    apiEndpoint: '/api/agents/seo-agent',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-05',
    humanCostEquivalent: '$60,000/year',
    aiCost: '$3,000/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 85000,
      successRate: 89.5,
      averageResponseTime: 3.0,
      customerSatisfaction: 4.4,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-email-marketing',
    name: 'AI Email Marketing Agent',
    title: 'Email Campaign Specialist',
    description: 'Manages email marketing from strategy to execution with personalization and automation.',
    icon: Mail,
    color: '#FF9500',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-content-generator', 'ai-campaign-optimizer', 'ai-audience-targeting'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 80,
      averageResponseTime: 2.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['email marketing', 'automation workflows', 'list management', 'deliverability'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 80,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Campaign Creation',
      'Automation Workflows',
      'List Segmentation',
      'A/B Testing',
      'Personalization',
      'Deliverability Optimization',
      'Template Design',
      'Drip Campaigns',
      'Lead Nurturing',
      'Performance Analytics',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'broadcast', priority: 'low', encryption: true, persistence: false },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/email-marketing',
    apiEndpoint: '/api/agents/email-marketing',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-10',
    humanCostEquivalent: '$50,000/year',
    aiCost: '$2,400/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 165000,
      successRate: 96.0,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.5,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-competitive-intel',
    name: 'AI Competitive Intelligence Agent',
    title: 'Market & Competitor Analyst',
    description: 'Monitors competitors, analyzes market trends, and provides strategic intelligence for marketing decisions.',
    icon: Eye,
    color: '#5856D6',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-cmo', 'ai-digital-marketer', 'ai-audience-targeting'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 40,
      averageResponseTime: 5.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['competitive analysis', 'market research', 'pricing intelligence', 'trend forecasting'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Competitor Monitoring',
      'Pricing Intelligence',
      'Market Analysis',
      'Trend Forecasting',
      'SWOT Analysis',
      'Battlecard Creation',
      'News Aggregation',
      'Social Listening',
      'Feature Comparison',
      'Strategic Recommendations',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/competitive-intel',
    apiEndpoint: '/api/agents/competitive-intel',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-15',
    humanCostEquivalent: '$75,000/year',
    aiCost: '$4,000/year',
    efficiency: '18x cost efficiency',
    performance: {
      tasksCompleted: 52000,
      successRate: 94.5,
      averageResponseTime: 4.0,
      customerSatisfaction: 4.6,
      uptime: '99.9%',
    },
  },
  {
    id: 'ai-audience-targeting',
    name: 'AI Audience Targeting Agent',
    title: 'Audience Segmentation Specialist',
    description: 'Creates precise audience segments and targeting strategies for maximum campaign effectiveness.',
    icon: Target,
    color: '#FF2D55',
    type: 'subagent',
    category: 'marketing-growth',
    parentCategory: 'Marketing & Growth AI',
    hierarchy: {
      level: 2,
      parentId: 'marketing-growth-main',
      subAgentIds: [],
      peerIds: ['ai-campaign-optimizer', 'ai-email-marketing', 'ai-digital-marketer'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 70,
      averageResponseTime: 3.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['audience segmentation', 'targeting strategies', 'lookalike modeling', 'persona development'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 70,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Segment Creation',
      'Lookalike Modeling',
      'Persona Development',
      'Behavioral Analysis',
      'Intent Scoring',
      'Custom Audience Building',
      'Geo-targeting',
      'Demographic Analysis',
      'Interest Targeting',
      'Audience Overlap Analysis',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/audience-targeting',
    apiEndpoint: '/api/agents/audience-targeting',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$60,000/year',
    aiCost: '$3,200/year',
    efficiency: '18x cost efficiency',
    performance: {
      tasksCompleted: 78000,
      successRate: 92.5,
      averageResponseTime: 2.5,
      customerSatisfaction: 4.5,
      uptime: '99.95%',
    },
  },
];

// ============================================
// OPERATIONS & MANAGEMENT AI SUB-AGENTS
// ============================================

export const operationsManagementSubAgents: AIAgent[] = [
  {
    id: 'ai-operations-manager',
    name: 'AI Operations Manager',
    title: 'Operations Management AI',
    description: 'Oversees and optimizes all business operations, resource allocation, and process efficiency',
    icon: Settings,
    color: '#FF6B35',
    type: 'subagent',
    category: 'operations-management',
    hierarchy: {
      level: 1,
      parentId: 'operations-management-main',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 50,
      averageResponseTime: 2.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['operations management', 'resource optimization', 'process improvement', 'workflow automation'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['advisory', 'directive'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 50,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Process Optimization',
      'Resource Allocation',
      'Workflow Automation',
      'Performance Monitoring',
      'Capacity Planning',
      'Cost Optimization',
      'Quality Control',
      'Vendor Management',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/operations/manager',
    apiEndpoint: '/api/agents/operations-manager',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$85,000/year',
    aiCost: '$4,500/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 95000,
      successRate: 94.0,
      averageResponseTime: 2.0,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  // Add more operations sub-agents as needed
];

// ============================================
// DATA & INTELLIGENCE AI SUB-AGENTS
// ============================================

export const dataIntelligenceSubAgents: AIAgent[] = [
  {
    id: 'ai-data-analyst',
    name: 'AI Data Analyst',
    title: 'Data Analysis AI',
    description: 'Performs comprehensive data analysis, generates insights, and supports data-driven decision making',
    icon: BarChart3,
    color: '#9B59B6',
    type: 'subagent',
    category: 'data-intelligence',
    hierarchy: {
      level: 1,
      parentId: 'data-intelligence-main',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: false,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 3.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['data analysis', 'statistical modeling', 'data visualization', 'insight generation'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Statistical Analysis',
      'Data Visualization',
      'Predictive Modeling',
      'Trend Analysis',
      'Pattern Recognition',
      'Report Generation',
      'Dashboard Creation',
      'Data Mining',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/data/analyst',
    apiEndpoint: '/api/agents/data-analyst',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$75,000/year',
    aiCost: '$3,800/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 88000,
      successRate: 93.5,
      averageResponseTime: 3.5,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  // Add more data intelligence sub-agents as needed
];

// ============================================
// ANALYSIS, INSIGHTS & PERFORMANCE AI SUB-AGENTS
// ============================================

export const analysisInsightsPerformanceSubAgents: AIAgent[] = [
  {
    id: 'ai-performance-monitoring',
    name: 'Performance Monitoring AI',
    title: 'Performance Analysis AI',
    description: 'Monitors system performance, generates insights, and provides optimization recommendations',
    icon: Gauge,
    color: '#E74C3C',
    type: 'subagent',
    category: 'analysis-insights-performance',
    hierarchy: {
      level: 1,
      parentId: 'analysis-insights-performance-main',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 40,
      averageResponseTime: 1.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['performance monitoring', 'system optimization', 'bottleneck analysis', 'capacity planning'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Real-time Monitoring',
      'Performance Analytics',
      'Bottleneck Detection',
      'Capacity Planning',
      'Optimization Recommendations',
      'SLA Monitoring',
      'Alert Management',
      'Trend Analysis',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/performance/monitoring',
    apiEndpoint: '/api/agents/performance-monitoring',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$80,000/year',
    aiCost: '$4,200/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 92000,
      successRate: 95.0,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
  // Add more analysis & insights sub-agents as needed
];

// ============================================
// MAIN AGENTS (Orchestrators)
// ============================================

export const mainAgents: AIAgent[] = [
  {
    id: 'customer-experience-main',
    name: 'Customer Experience AI Main',
    title: 'Customer Experience Orchestrator',
    description: 'Main orchestrator for all customer experience operations, managing reception, support, tickets, complaints, retention, loyalty, feedback, and billing.',
    icon: Headphones,
    color: '#007AFF',
    type: 'main_agent',
    category: 'customer-experience',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 100,
      averageResponseTime: 1.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['customer experience strategy', 'service operations', 'customer satisfaction', 'support workflows'],
      consultingStyle: 'advisory',
      preferredConsultationTypes: ['advisory', 'collaborative'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 100,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Customer Journey Orchestration',
      'Service Quality Management',
      'Customer Satisfaction Analytics',
      'Support Workflow Optimization',
      'Experience Strategy Development',
      'Multi-channel Coordination',
      'Performance Monitoring',
      'Strategic Planning',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/customer-experience/main',
    apiEndpoint: '/api/agents/customer-experience-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$120,000/year',
    aiCost: '$6,500/year',
    efficiency: '18x cost efficiency',
    performance: {
      tasksCompleted: 150000,
      successRate: 96.5,
      averageResponseTime: 1.0,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
  {
    id: 'sales-revenue-main',
    name: 'Sales & Revenue AI Main',
    title: 'Sales & Revenue Orchestrator',
    description: 'Main orchestrator for all sales and revenue operations, managing lead development, sales reps, CRM, proposals, negotiations, upsells, accounts, and pricing.',
    icon: Target,
    color: '#34C759',
    type: 'main_agent',
    category: 'sales-revenue',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 80,
      averageResponseTime: 1.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['sales strategy', 'revenue optimization', 'deal management', 'sales operations'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['advisory', 'directive'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 80,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Sales Strategy Development',
      'Revenue Optimization',
      'Pipeline Management',
      'Sales Team Coordination',
      'Deal Strategy Planning',
      'Performance Analytics',
      'Forecasting & Planning',
      'Process Optimization',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/sales-revenue/main',
    apiEndpoint: '/api/agents/sales-revenue-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$140,000/year',
    aiCost: '$7,200/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 180000,
      successRate: 94.8,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'marketing-growth-main',
    name: 'Marketing & Growth AI Main',
    title: 'Marketing & Growth Orchestrator',
    description: 'Main orchestrator for all marketing and growth operations, managing CMO, campaigns, digital marketing, content, social media, SEO, email, competitive intelligence, and audience targeting.',
    icon: Megaphone,
    color: '#FF2D55',
    type: 'main_agent',
    category: 'marketing-growth',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 70,
      averageResponseTime: 2.0,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['marketing strategy', 'growth optimization', 'brand management', 'campaign orchestration'],
      consultingStyle: 'advisory',
      preferredConsultationTypes: ['advisory', 'collaborative'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 70,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Marketing Strategy Development',
      'Growth Planning',
      'Brand Management',
      'Campaign Orchestration',
      'Budget Optimization',
      'Performance Analytics',
      'Team Coordination',
      'Strategic Planning',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/marketing-growth/main',
    apiEndpoint: '/api/agents/marketing-growth-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$130,000/year',
    aiCost: '$6,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 160000,
      successRate: 93.5,
      averageResponseTime: 2.0,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  {
    id: 'operations-management-main',
    name: 'Operations & Management AI Main',
    title: 'Operations & Management Orchestrator',
    description: 'Main orchestrator for all operations and management activities, overseeing workflow automation, resource planning, process optimization, and quality control.',
    icon: Settings,
    color: '#FF6B35',
    type: 'main_agent',
    category: 'operations-management',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 1.8,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['operations management', 'process optimization', 'resource planning', 'workflow automation'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['advisory', 'directive'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Operations Strategy',
      'Process Optimization',
      'Resource Management',
      'Workflow Automation',
      'Quality Control',
      'Performance Monitoring',
      'Strategic Planning',
      'Team Coordination',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/operations-management/main',
    apiEndpoint: '/api/agents/operations-management-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$110,000/year',
    aiCost: '$5,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 140000,
      successRate: 95.2,
      averageResponseTime: 1.8,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'data-intelligence-main',
    name: 'Data & Intelligence AI Main',
    title: 'Data & Intelligence Orchestrator',
    description: 'Main orchestrator for all data and intelligence operations, managing data analysis, financial analysis, customer insights, forecasting, risk analysis, and competitive analysis.',
    icon: BarChart3,
    color: '#9B59B6',
    type: 'main_agent',
    category: 'data-intelligence',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 50,
      averageResponseTime: 2.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['data strategy', 'business intelligence', 'analytics', 'forecasting'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 50,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Data Strategy Development',
      'Business Intelligence',
      'Advanced Analytics',
      'Forecasting & Prediction',
      'Risk Analysis',
      'Insight Generation',
      'Data Governance',
      'Strategic Planning',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/data-intelligence/main',
    apiEndpoint: '/api/agents/data-intelligence-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$120,000/year',
    aiCost: '$6,200/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 130000,
      successRate: 94.0,
      averageResponseTime: 2.5,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
  {
    id: 'analysis-insights-performance-main',
    name: 'Analysis, Insights & Performance AI Main',
    title: 'Analysis, Insights & Performance Orchestrator',
    description: 'Main orchestrator for all analysis, insights, and performance operations, managing performance monitoring, business intelligence, predictive analytics, insight generation, and executive intelligence.',
    icon: Gauge,
    color: '#E74C3C',
    type: 'main_agent',
    category: 'analysis-insights-performance',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 40,
      averageResponseTime: 1.2,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['performance analysis', 'business intelligence', 'strategic insights', 'executive advisory'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Performance Strategy',
      'Business Intelligence',
      'Predictive Analytics',
      'Insight Generation',
      'Executive Advisory',
      'Strategic Planning',
      'OKR Management',
      'Performance Optimization',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/analysis-insights-performance/main',
    apiEndpoint: '/api/agents/analysis-insights-performance-main',
    version: '2.0.0',
    lastUpdated: '2026-02-18',
    createdAt: '2025-02-20',
    humanCostEquivalent: '$125,000/year',
    aiCost: '$6,500/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 145000,
      successRate: 95.5,
      averageResponseTime: 1.2,
      customerSatisfaction: 4.9,
      uptime: '99.95%',
    },
  },
  {
    id: 'accounting-finance-main',
    name: 'Accounting & Finance AI',
    title: 'Financial Management & Capital Control Orchestrator',
    description: 'Main orchestrator for all accounting and financial operations, managing bookkeeping, accounts payable/receivable, payroll, financial analysis, tax compliance, budgeting, treasury, audit, and investment allocation.',
    icon: Landmark,
    color: '#10B981',
    type: 'main_agent',
    category: 'accounting-finance',
    hierarchy: {
      level: 1,
      parentId: '',
      children: [],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 1.5,
      // Enhanced Counseling Capabilities
      counselingModes: ['hierarchical', 'cross-functional'],
      mentoringCapabilities: {
        canMentorSubagents: true,
        canMentorPeers: true,
        canBeMentoredByMain: false,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'organization'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['financial management', 'accounting standards', 'capital control', 'financial strategy', 'compliance'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      // Enhanced A2A Counseling
      counselingRole: 'mentor' as const,
      canMentor: true,
      canBeMentored: false,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Financial Strategy Development',
      'Accounting Standards Compliance',
      'Capital Management',
      'Financial Risk Assessment',
      'Budget Planning & Control',
      'Cash Flow Optimization',
      'Investment Strategy',
      'Tax Planning',
      'Audit Coordination',
      'Financial Reporting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/main',
    apiEndpoint: '/api/agents/accounting-finance-main',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$150,000/year',
    aiCost: '$7,500/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 165000,
      successRate: 97.0,
      averageResponseTime: 1.2,
      customerSatisfaction: 4.8,
      uptime: '99.99%',
    },
  },
];

// ============================================
// ACCOUNTING & FINANCE AI - Sub-Agents
// ============================================

export const accountingFinanceSubAgents: AIAgent[] = [
  {
    id: 'ai-bookkeeper',
    name: 'AI Bookkeeper',
    title: 'Daily Transaction & Ledger Management',
    description: 'Manages daily transaction recording, maintains general ledger, and ensures accurate financial record keeping with automated reconciliation.',
    icon: FileSpreadsheet,
    color: '#10B981',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-ap-agent', 'ai-ar-agent', 'ai-payroll-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 80,
      averageResponseTime: 1.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['transaction recording', 'ledger management', 'account reconciliation', 'journal entries'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 80,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Daily Transaction Recording',
      'General Ledger Management',
      'Account Reconciliation',
      'Journal Entry Processing',
      'Bank Statement Reconciliation',
      'Chart of Accounts Maintenance',
      'Trial Balance Preparation',
      'Accrual Management',
      'Adjusting Entries',
      'Financial Record Integrity',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/bookkeeper',
    apiEndpoint: '/api/agents/bookkeeper',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$55,000/year',
    aiCost: '$2,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 320000,
      successRate: 98.5,
      averageResponseTime: 0.5,
      customerSatisfaction: 4.7,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-ap-agent',
    name: 'AI Accounts Payable (AP) Agent',
    title: 'Vendor Payment & Invoice Processing',
    description: 'Manages vendor invoices, processes payments, and maintains accurate accounts payable records with payment optimization.',
    icon: Receipt,
    color: '#059669',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-ar-agent', 'ai-payroll-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 1.2,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['invoice processing', 'vendor payments', 'payment terms', 'cash disbursement'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['directive', 'analytical'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Invoice Processing & Validation',
      'Vendor Payment Management',
      'Payment Schedule Optimization',
      'Purchase Order Matching',
      'Vendor Communication',
      'Early Payment Discount Capture',
      'Payment Reconciliation',
      '1099 Form Preparation',
      'Vendor Master Data Management',
      'Cash Flow Preservation',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/accounts-payable',
    apiEndpoint: '/api/agents/accounts-payable',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$48,000/year',
    aiCost: '$2,400/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 185000,
      successRate: 97.0,
      averageResponseTime: 0.8,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-ar-agent',
    name: 'AI Accounts Receivable (AR) Agent',
    title: 'Billing, Collections & Cash Inflow Tracking',
    description: 'Manages customer billing, tracks collections, and optimizes cash inflow with automated follow-ups and payment reconciliation.',
    icon: Wallet,
    color: '#047857',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-ap-agent', 'ai-payroll-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 70,
      averageResponseTime: 1.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['billing management', 'collections', 'cash inflow', 'revenue recognition'],
      consultingStyle: 'collaborative',
      preferredConsultationTypes: ['collaborative', 'analytical'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 70,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Customer Billing & Invoicing',
      'Payment Collection Management',
      'Cash Inflow Tracking',
      'Payment Reconciliation',
      'Aging Report Analysis',
      'Collection Follow-ups',
      'Credit Limit Management',
      'Revenue Recognition',
      'Bad Debt Assessment',
      'Customer Account Reconciliation',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'delegation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/accounts-receivable',
    apiEndpoint: '/api/agents/accounts-receivable',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$50,000/year',
    aiCost: '$2,500/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 195000,
      successRate: 96.5,
      averageResponseTime: 0.7,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-payroll-agent',
    name: 'AI Payroll Agent',
    title: 'Salary Processing, Tax Deductions & Compliance',
    description: 'Manages end-to-end payroll processing, calculates tax deductions, ensures compliance with labor laws and tax regulations.',
    icon: Banknote,
    color: '#065F46',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-ap-agent', 'ai-tax-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 50,
      averageResponseTime: 2.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['payroll processing', 'tax deductions', 'labor compliance', 'benefits administration'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['directive', 'analytical'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 50,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Salary Calculation & Processing',
      'Tax Withholding & Deductions',
      'Payroll Tax Compliance',
      'Direct Deposit Management',
      'Payroll Reconciliation',
      'W-2 & 1099 Form Generation',
      'Benefits Deduction Processing',
      'Garnishment Management',
      'Payroll Reporting',
      'Labor Law Compliance',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/payroll',
    apiEndpoint: '/api/agents/payroll',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$65,000/year',
    aiCost: '$3,200/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 145000,
      successRate: 99.0,
      averageResponseTime: 1.2,
      customerSatisfaction: 4.8,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-financial-analyst',
    name: 'AI Financial Analyst',
    title: 'Financial Reporting, Ratio Analysis & Forecasting',
    description: 'Analyzes financial data, creates comprehensive reports, performs ratio analysis, and provides forecasting for strategic decisions.',
    icon: TrendingUp,
    color: '#0E7490',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-budgeting-agent', 'ai-treasury-agent', 'ai-investment-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 40,
      averageResponseTime: 3.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['financial analysis', 'ratio analysis', 'financial reporting', 'forecasting'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Financial Statement Analysis',
      'Ratio Analysis & Benchmarking',
      'Performance Metrics Tracking',
      'Trend Analysis',
      'Financial Modeling',
      'Variance Analysis',
      'KPI Dashboard Creation',
      'Investor Reporting',
      'Management Reporting',
      'Financial Forecasting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/financial-analyst',
    apiEndpoint: '/api/agents/financial-analyst',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$85,000/year',
    aiCost: '$4,200/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 95000,
      successRate: 95.5,
      averageResponseTime: 2.5,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-tax-agent',
    name: 'AI Tax Agent',
    title: 'Tax Calculation, Filing & Regulatory Compliance',
    description: 'Manages tax calculations, prepares filings, ensures compliance with tax regulations, and provides tax planning strategies.',
    icon: Calculator,
    color: '#7C3AED',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-payroll-agent', 'ai-audit-agent', 'ai-financial-analyst'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: false,
      maxConcurrentConsultations: 35,
      averageResponseTime: 4.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['tax calculation', 'tax filing', 'regulatory compliance', 'tax planning'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['directive', 'analytical'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 35,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Tax Calculation & Optimization',
      'Tax Return Preparation & Filing',
      'Regulatory Compliance Monitoring',
      'Sales Tax Management',
      'VAT/GST Processing',
      'Tax Audit Support',
      'Tax Planning Strategy',
      'Transfer Pricing Analysis',
      'International Tax Compliance',
      'Tax Document Management',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/tax',
    apiEndpoint: '/api/agents/tax',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 68000,
      successRate: 98.0,
      averageResponseTime: 3.5,
      customerSatisfaction: 4.9,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-budgeting-agent',
    name: 'AI Budgeting & Forecasting Agent',
    title: 'Budget Planning & Scenario Modeling',
    description: 'Creates comprehensive budgets, performs scenario modeling, and provides forecasting for financial planning and control.',
    icon: PiggyBank,
    color: '#0891B2',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-financial-analyst', 'ai-treasury-agent', 'ai-investment-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 45,
      averageResponseTime: 3.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['budget planning', 'forecasting', 'scenario modeling', 'financial planning'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 45,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Budget Creation & Management',
      'Scenario Modeling & Analysis',
      'Revenue Forecasting',
      'Expense Projections',
      'Variance Analysis',
      'Zero-Based Budgeting',
      'Rolling Forecasts',
      'Capital Budgeting',
      'Departmental Budgeting',
      'Budget vs Actual Analysis',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/budgeting',
    apiEndpoint: '/api/agents/budgeting',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$75,000/year',
    aiCost: '$3,800/year',
    efficiency: '19x cost efficiency',
    performance: {
      tasksCompleted: 82000,
      successRate: 94.5,
      averageResponseTime: 3.0,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-treasury-agent',
    name: 'AI Treasury Agent',
    title: 'Cash Flow Management & Liquidity Control',
    description: 'Manages cash flow, optimizes liquidity, handles banking relationships, and ensures adequate funding for operations.',
    icon: Coins,
    color: '#2563EB',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-financial-analyst', 'ai-budgeting-agent', 'ai-investment-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 40,
      averageResponseTime: 2.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['cash flow management', 'liquidity control', 'banking relationships', 'treasury operations'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 40,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Cash Flow Forecasting',
      'Liquidity Management',
      'Bank Account Management',
      'Wire Transfer Processing',
      'Cash Position Reporting',
      'Working Capital Optimization',
      'Short-term Investment Management',
      'Debt Service Management',
      'Bank Relationship Management',
      'Treasury Risk Management',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/treasury',
    apiEndpoint: '/api/agents/treasury',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$90,000/year',
    aiCost: '$4,500/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 75000,
      successRate: 97.5,
      averageResponseTime: 1.8,
      customerSatisfaction: 4.8,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-audit-agent',
    name: 'AI Audit & Compliance Agent',
    title: 'Internal Audit, Fraud Detection & Risk Control',
    description: 'Performs internal audits, detects fraud, ensures compliance with regulations, and manages financial risk controls.',
    icon: Scale,
    color: '#DC2626',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-tax-agent', 'ai-compliance-monitoring', 'ai-risk-analyst'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 30,
      averageResponseTime: 4.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['internal audit', 'fraud detection', 'risk control', 'compliance verification'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 30,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Internal Audit Execution',
      'Fraud Detection & Prevention',
      'Risk Assessment & Control',
      'Compliance Verification',
      'Financial Controls Testing',
      'Anomaly Detection',
      'Audit Documentation',
      'SOX Compliance',
      'Regulatory Compliance Review',
      'Financial Risk Reporting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'critical', encryption: true, persistence: true },
      { type: 'escalation', priority: 'critical', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/audit',
    apiEndpoint: '/api/agents/audit',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$110,000/year',
    aiCost: '$5,500/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 52000,
      successRate: 98.5,
      averageResponseTime: 3.5,
      customerSatisfaction: 4.9,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-investment-agent',
    name: 'AI Investment & Capital Allocation Agent',
    title: 'ROI Tracking & Capital Optimization',
    description: 'Analyzes investment opportunities, tracks ROI, optimizes capital allocation, and provides investment strategy recommendations.',
    icon: TrendingDown,
    color: '#059669',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-financial-analyst', 'ai-treasury-agent', 'ai-budgeting-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 35,
      averageResponseTime: 5.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['investment analysis', 'ROI tracking', 'capital allocation', 'portfolio management'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'advisory'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 35,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Investment Opportunity Analysis',
      'ROI Tracking & Measurement',
      'Capital Allocation Optimization',
      'Portfolio Performance Analysis',
      'Investment Risk Assessment',
      'Asset Allocation Strategy',
      'Capital Budgeting Analysis',
      'NPV & IRR Calculations',
      'Investment Reporting',
      'Strategic Investment Planning',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/investment',
    apiEndpoint: '/api/agents/investment',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$100,000/year',
    aiCost: '$5,000/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 48000,
      successRate: 93.0,
      averageResponseTime: 4.5,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-expense-agent',
    name: 'AI Expense Management Agent',
    title: 'Expense Tracking & Reimbursement Processing',
    description: 'Manages employee expense tracking, processes reimbursements, enforces expense policies, and provides spending analytics.',
    icon: DollarSign,
    color: '#16A34A',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-ap-agent', 'ai-financial-analyst'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 60,
      averageResponseTime: 1.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['expense management', 'reimbursement processing', 'spending analysis', 'policy enforcement'],
      consultingStyle: 'directive',
      preferredConsultationTypes: ['directive', 'analytical'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 60,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Expense Report Processing',
      'Receipt Management & OCR',
      'Reimbursement Processing',
      'Expense Policy Enforcement',
      'Mileage & Travel Expense Tracking',
      'Corporate Card Management',
      'Spending Analytics & Reports',
      'Budget Compliance Monitoring',
      'Expense Categorization',
      'Fraud Detection in Expenses',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'medium', encryption: true, persistence: true },
      { type: 'consultation', priority: 'low', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/expense-management',
    apiEndpoint: '/api/agents/expense-management',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$45,000/year',
    aiCost: '$2,200/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 210000,
      successRate: 97.0,
      averageResponseTime: 1.0,
      customerSatisfaction: 4.6,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-inventory-accounting-agent',
    name: 'AI Inventory Management Agent',
    title: 'Inventory Tracking & Stock Optimization',
    description: 'Manages inventory tracking, performs stock valuation, optimizes inventory levels, and ensures accurate cost of goods sold calculations.',
    icon: Box,
    color: '#4F46E5',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-financial-analyst', 'ai-expense-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 55,
      averageResponseTime: 2.0,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['inventory management', 'stock valuation', 'COGS calculation', 'inventory optimization'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 55,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Inventory Tracking & Valuation',
      'Stock Level Optimization',
      'COGS Calculation & Analysis',
      'Inventory Reconciliation',
      'FIFO/LIFO/WAC Management',
      'Inventory Audit Support',
      'Stock Movement Analysis',
      'Reorder Point Optimization',
      'Inventory Cost Analysis',
      'Obsolete Inventory Detection',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/inventory-management',
    apiEndpoint: '/api/agents/inventory-management',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$52,000/year',
    aiCost: '$2,600/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 165000,
      successRate: 96.0,
      averageResponseTime: 1.5,
      customerSatisfaction: 4.7,
      uptime: '99.95%',
    },
  },
  {
    id: 'ai-payroll-accounting-agent',
    name: 'AI Payroll Accounting Agent',
    title: 'Payroll Accounting & Journal Entry Specialist',
    description: 'Specialized in payroll accounting entries, wage accruals, payroll tax accounting, benefits accounting, and ensuring proper general ledger entries for all payroll transactions.',
    icon: Calculator,
    color: '#0D9488',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-bookkeeper', 'ai-payroll-agent', 'ai-financial-reporting-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 55,
      averageResponseTime: 1.8,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['payroll accounting', 'wage accruals', 'payroll tax accounting', 'benefits accounting', 'journal entries'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 55,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Payroll Journal Entry Creation',
      'Wage Expense Allocation',
      'Payroll Tax Accounting',
      'Benefits Accounting Entries',
      'Accrued Payroll Management',
      'Payroll Reconciliation',
      '401(k) Contribution Accounting',
      'Workers Comp Accounting',
      'Payroll Variance Analysis',
      'Multi-State Payroll Accounting',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'medium', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/payroll-accounting',
    apiEndpoint: '/api/agents/payroll-accounting',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$58,000/year',
    aiCost: '$2,900/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 125000,
      successRate: 98.5,
      averageResponseTime: 1.2,
      customerSatisfaction: 4.8,
      uptime: '99.99%',
    },
  },
  {
    id: 'ai-financial-reporting-agent',
    name: 'AI Financial Reporting Agent',
    title: 'Financial Statement Preparation & Reporting Specialist',
    description: 'Expert in preparing financial statements including balance sheets, income statements, cash flow statements, and comprehensive footnote disclosures. Ensures GAAP/IFRS compliance.',
    icon: FileText,
    color: '#1E40AF',
    type: 'subagent',
    category: 'accounting-finance',
    parentCategory: 'Accounting & Finance AI',
    hierarchy: {
      level: 2,
      parentId: 'accounting-finance-main',
      subAgentIds: [],
      peerIds: ['ai-financial-analyst', 'ai-bookkeeper', 'ai-payroll-accounting-agent'],
    },
    a2aCapabilities: {
      canInitiateConsultation: true,
      canRespondToConsultation: true,
      canEscalate: true,
      canDelegate: true,
      maxConcurrentConsultations: 45,
      averageResponseTime: 3.5,
      counselingModes: ['hierarchical', 'peer'],
      mentoringCapabilities: {
        canMentorSubagents: false,
        canMentorPeers: true,
        canBeMentoredByMain: true,
        canBeMentoredByPeers: true
      },
      coordinationLevel: 'team'
    },
    consulting: {
      canConsult: true,
      canBeConsulted: true,
      expertiseAreas: ['financial statements', 'GAAP compliance', 'IFRS reporting', 'disclosure notes', 'financial reporting'],
      consultingStyle: 'analytical',
      preferredConsultationTypes: ['analytical', 'directive'],
      counselingRole: 'specialist' as const,
      canMentor: false,
      canBeMentored: true,
      counselingLoad: {
        current: 0,
        maximum: 45,
        availability: 'available' as const
      }
    },
    capabilities: [
      'Balance Sheet Preparation',
      'Income Statement Compilation',
      'Cash Flow Statement Creation',
      'Statement of Equity Reporting',
      'Footnote Disclosure Writing',
      'GAAP/IFRS Compliance Review',
      'Consolidated Reporting',
      'Interim Financial Statements',
      'Annual Report Preparation',
      'MD&A Drafting Support',
    ],
    communicationChannels: [
      { type: 'direct', priority: 'high', encryption: true, persistence: true },
      { type: 'consultation', priority: 'high', encryption: true, persistence: true },
    ],
    status: 'active',
    route: '/ai-agent/accounting-finance/financial-reporting',
    apiEndpoint: '/api/agents/financial-reporting',
    version: '2.0.0',
    lastUpdated: '2026-02-28',
    createdAt: '2025-02-28',
    humanCostEquivalent: '$72,000/year',
    aiCost: '$3,600/year',
    efficiency: '20x cost efficiency',
    performance: {
      tasksCompleted: 88000,
      successRate: 97.8,
      averageResponseTime: 3.0,
      customerSatisfaction: 4.8,
      uptime: '99.95%',
    },
  },
];

export const allSubAgents: AIAgent[] = [
  ...customerExperienceSubAgents,
  ...salesRevenueSubAgents,
  ...marketingGrowthSubAgents,
  ...operationsManagementSubAgents,
  ...dataIntelligenceSubAgents,
  ...analysisInsightsPerformanceSubAgents,
  ...accountingFinanceSubAgents,
];

export const allMainAgents: AIAgent[] = mainAgents;

export const allAgents: AIAgent[] = [...allMainAgents, ...allSubAgents];

export const getAgentById = (agentId: string): AIAgent | undefined => {
  return allAgents.find(agent => agent.id === agentId);
};

export const getSubAgentsByCategory = (category: string): AIAgent[] => {
  return allSubAgents.filter(agent => agent.category === category);
};

export const getMainAgentByCategory = (category: string): AIAgent | undefined => {
  return mainAgents.find(agent => agent.category === category);
};

export const getAgentsByConsultingCapability = (expertise: string): AIAgent[] => {
  return allAgents.filter(agent => 
    agent.consulting.canBeConsulted && 
    agent.consulting.expertiseAreas.some(area => 
      area.toLowerCase().includes(expertise.toLowerCase())
    )
  );
};

export const getAgentHierarchy = (agentId: string): { mainAgent: AIAgent | undefined; subAgents: AIAgent[]; peers: AIAgent[] } => {
  const agent = getAgentById(agentId);
  if (!agent) return { mainAgent: undefined, subAgents: [], peers: [] };
  
  if (agent.type === 'main_agent') {
    return {
      mainAgent: agent,
      subAgents: allSubAgents.filter(sub => sub.hierarchy.parentId === agentId),
      peers: mainAgents.filter(m => m.id !== agentId),
    };
  } else {
    const mainAgent = mainAgents.find(main => main.id === agent.hierarchy.parentId);
    const siblingSubs = mainAgent 
      ? allSubAgents.filter(sub => sub.hierarchy.parentId === mainAgent.id && sub.id !== agentId)
      : [];
    return {
      mainAgent,
      subAgents: mainAgent 
        ? allSubAgents.filter(sub => sub.hierarchy.parentId === mainAgent.id)
        : [],
      peers: siblingSubs,
    };
  }
};

export const agentCategories = [
  { id: 'customer-experience', label: 'Customer Experience AI', icon: Headphones, color: '#007AFF' },
  { id: 'sales-revenue', label: 'Sales & Revenue AI', icon: Target, color: '#34C759' },
  { id: 'marketing-growth', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55' },
  { id: 'operations-management', label: 'Operations & Management AI', icon: Settings, color: '#FF6B35' },
  { id: 'data-intelligence', label: 'Data & Intelligence AI', icon: BarChart3, color: '#9B59B6' },
  { id: 'analysis-insights-performance', label: 'Analysis, Insights & Performance AI', icon: Gauge, color: '#E74C3C' },
  { id: 'accounting-finance', label: 'Accounting & Finance AI', icon: Landmark, color: '#10B981' },
];

export const getA2AReadyAgents = (): AIAgent[] => {
  return allAgents.filter(agent => 
    agent.a2aCapabilities.canInitiateConsultation || 
    agent.a2aCapabilities.canRespondToConsultation
  );
};

export const getAllAgents = (): AIAgent[] => {
  return allAgents;
};

export const getAgentsWithConsultingCapability = (): AIAgent[] => {
  return allAgents.filter(agent => agent.consulting.canConsult || agent.consulting.canBeConsulted);
};

// ============================================
// AGENT CONFIGURATION INITIALIZATION
// ============================================

export const initializeAgentConfigurations = (): void => {
  const assignConfig = (agent: AIAgent) => {
    if (!agent.configuration) {
      agent.configuration = createAgentConfiguration(agent.category as AgentCategory);
    }
  };
  
  mainAgents.forEach(assignConfig);
  customerExperienceSubAgents.forEach(assignConfig);
  salesRevenueSubAgents.forEach(assignConfig);
  marketingGrowthSubAgents.forEach(assignConfig);
  operationsManagementSubAgents.forEach(assignConfig);
  dataIntelligenceSubAgents.forEach(assignConfig);
  analysisInsightsPerformanceSubAgents.forEach(assignConfig);
  accountingFinanceSubAgents.forEach(assignConfig);
};

// Initialize configurations for all agents
initializeAgentConfigurations();

// ============================================
// AGENT CONFIGURATION HELPERS
// ============================================

export const updateAgentConfiguration = (
  agentId: string, 
  configUpdates: Partial<AgentConfiguration>
): AIAgent | undefined => {
  const agent = getAgentById(agentId);
  if (!agent) return undefined;
  
  agent.configuration = {
    ...agent.configuration,
    ...configUpdates,
    model: { ...agent.configuration?.model, ...configUpdates.model } as AgentModelConfig,
    voice: { ...agent.configuration?.voice, ...configUpdates.voice } as AgentVoiceConfig,
    personality: { ...agent.configuration?.personality, ...configUpdates.personality } as AgentPersonalityConfig,
    language: { ...agent.configuration?.language, ...configUpdates.language } as AgentLanguageConfig,
    training: { ...agent.configuration?.training, ...configUpdates.training } as AgentTrainingConfig,
    dataUpload: { ...agent.configuration?.dataUpload, ...configUpdates.dataUpload } as AgentDataUploadConfig,
  } as AgentConfiguration;
  
  agent.lastUpdated = new Date().toISOString().split('T')[0];
  return agent;
};

export const getAgentModelConfig = (agentId: string): AgentModelConfig | undefined => {
  return getAgentById(agentId)?.configuration?.model;
};

export const getAgentVoiceConfig = (agentId: string): AgentVoiceConfig | undefined => {
  return getAgentById(agentId)?.configuration?.voice;
};

export const getAgentLanguageConfig = (agentId: string): AgentLanguageConfig | undefined => {
  return getAgentById(agentId)?.configuration?.language;
};

export const getAgentPersonalityConfig = (agentId: string): AgentPersonalityConfig | undefined => {
  return getAgentById(agentId)?.configuration?.personality;
};

export const getAgentTrainingConfig = (agentId: string): AgentTrainingConfig | undefined => {
  return getAgentById(agentId)?.configuration?.training;
};

export const getAgentDataUploadConfig = (agentId: string): AgentDataUploadConfig | undefined => {
  return getAgentById(agentId)?.configuration?.dataUpload;
};

export const getAgentsByModelType = (modelType: AIModelType): AIAgent[] => {
  return allAgents.filter(agent => agent.configuration?.model.primary === modelType);
};

export const getAgentsWithVoiceEnabled = (): AIAgent[] => {
  return allAgents.filter(agent => agent.configuration?.voice.enabled);
};

export const getAgentsByLanguage = (language: AgentLanguage): AIAgent[] => {
  return allAgents.filter(agent => 
    agent.configuration?.language.primary === language ||
    agent.configuration?.language.secondary?.includes(language)
  );
};

export const addTrainingDocument = (
  agentId: string, 
  document: Omit<AgentDocument, 'id' | 'uploadedAt'>
): AgentDocument | undefined => {
  const agent = getAgentById(agentId);
  if (!agent?.configuration?.dataUpload.enabled) return undefined;
  
  const newDoc: AgentDocument = {
    ...document,
    id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uploadedAt: new Date().toISOString(),
    processed: false,
    processingStatus: 'pending',
  };
  
  agent.configuration.dataUpload.uploadedDocuments = [
    ...(agent.configuration.dataUpload.uploadedDocuments || []),
    newDoc,
  ];
  
  return newDoc;
};

export default {
  allAgents,
  allSubAgents,
  allMainAgents,
  mainAgents,
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
  operationsManagementSubAgents,
  dataIntelligenceSubAgents,
  analysisInsightsPerformanceSubAgents,
  accountingFinanceSubAgents,
  agentCategories,
  defaultAgentConfiguration,
  agentConfigurationPresets,
  getAgentById,
  getSubAgentsByCategory,
  getMainAgentByCategory,
  getAgentsByConsultingCapability,
  getAgentHierarchy,
  getA2AReadyAgents,
  getAgentsWithConsultingCapability,
  createAgentConfiguration,
  updateAgentConfiguration,
  getAgentModelConfig,
  getAgentVoiceConfig,
  getAgentLanguageConfig,
  getAgentPersonalityConfig,
  getAgentTrainingConfig,
  getAgentDataUploadConfig,
  getAgentsByModelType,
  getAgentsWithVoiceEnabled,
  getAgentsByLanguage,
  addTrainingDocument,
  initializeAgentConfigurations,
};
