/**
 * =============================================================================
 * AI AGENTS & EMPLOYEES BUILDER - TypeScript Types
 * =============================================================================
 *
 * Type definitions for creating custom AI Agents, Employees, and Departments
 * using the 7-tier enterprise hierarchy structure.
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-21
 */

import type { LucideIcon } from 'lucide-react-native';

// ============================================
// BUILDER MODES
// ============================================

export type BuilderMode = 'agent' | 'employee' | 'department';

export interface BuilderTab {
  id: BuilderMode;
  label: string;
  icon: string;
  description: string;
}

// ============================================
// AGENT BUILDER TYPES
// ============================================

export type AgentType = 'reactive' | 'learning' | 'swarm';

export interface AgentTypeConfig {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  features: string[];
  tokenBudget: {
    min: number;
    max: number;
    default: number;
  };
  responseTime: string;
  useCases: string[];
}

export interface IntelligenceFeature {
  id: 'predictive' | 'sentiment' | 'anomaly';
  name: string;
  icon: string;
  description: string;
  businessImpact: string;
  enabled: boolean;
}

export interface AgentSkill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
}

export interface AgentPersonality {
  trait: string;
  value: number; // 1-10 scale
  description: string;
}

export interface CustomAgent {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  departmentName: string;
  agentType: AgentType;
  
  // Configuration
  skills: AgentSkill[];
  personality: AgentPersonality[];
  intelligenceFeatures: IntelligenceFeature[];
  
  // Hierarchy Position
  reportsTo: string; // Department Head ID
  commandCenter: {
    cdo: string;
    ddo: string;
    wol: string;
    aod: string;
  };
  
  // Token & Resource Management
  tokenBudget: number;
  monthlyCost: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  version: number;
}

// ============================================
// EMPLOYEE BUILDER TYPES
// ============================================

export type EmployeeLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern';

export interface EmployeeSkill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'leadership' | 'domain';
  proficiency: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  certification?: string;
}

export interface AICollaboration {
  agentId: string;
  agentName: string;
  collaborationType: 'assistant' | 'partner' | 'supervisor' | 'trainee';
  tasks: string[];
  enabled: boolean;
}

export interface PerformanceMetrics {
  kpiCategory: string;
  metrics: {
    name: string;
    target: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  }[];
}

export interface CustomEmployee {
  id: string;
  
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  
  // Position
  departmentId: string;
  departmentName: string;
  role: string;
  level: EmployeeLevel;
  employmentType: EmploymentType;
  
  // Hierarchy
  reportsTo: string; // Manager ID
  manages?: string[]; // Subordinate IDs
  
  // Skills
  skills: EmployeeSkill[];
  
  // AI Collaboration
  aiPartners: AICollaboration[];
  aiWorkloadBalance: number; // 0-100% AI assistance
  
  // Performance
  performanceMetrics: PerformanceMetrics[];
  goals: string[];
  
  // Metadata
  startDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'on_leave' | 'suspended' | 'terminated';
}

// ============================================
// DEPARTMENT BUILDER TYPES
// ============================================

export interface DepartmentFunction {
  id: string;
  name: string;
  description: string;
  keyActivities: string[];
}

export interface DepartmentKPI {
  metric: string;
  target: string;
  measurement: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export interface DepartmentAgentAllocation {
  agentType: AgentType;
  count: number;
  purpose: string;
}

export interface DepartmentHead {
  title: string;
  requiredSkills: string[];
  reportingLine: 'c_suite' | 'command_center';
  cSuiteLiaison: string; // Which C-Suite executive
}

export interface CustomDepartment {
  id: string;
  name: string;
  
  // Classification
  category: 'core' | 'support' | 'specialized' | 'regional';
  
  // Functions
  functions: DepartmentFunction[];
  
  // Hierarchy Position
  tier: 5; // Always Tier 5
  reportsTo: {
    cdo: string; // CDOO
    ddo: string; // DDO
    wol: string; // WOL
    aod: string; // AOD
    cSuite: string; // Which C-Suite executive owns this
  };
  
  // Leadership
  head: DepartmentHead;
  
  // Workforce
  agentAllocation: DepartmentAgentAllocation[];
  employeeCount: number;
  
  // KPIs
  kpis: DepartmentKPI[];
  
  // Intelligence Integration
  intelligenceFeatures: {
    predictive: boolean;
    sentiment: boolean;
    anomaly: boolean;
  };
  
  // Budget
  monthlyTokenBudget: number;
  operationalBudget: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'archived';
  customFields: Record<string, any>;
}

// ============================================
// BUILDER STATE & CONFIGURATION
// ============================================

export interface BuilderState {
  mode: BuilderMode;
  step: number;
  totalSteps: number;
  data: Partial<CustomAgent | CustomEmployee | CustomDepartment>;
  validation: {
    isValid: boolean;
    errors: string[];
  };
  preview: {
    show: boolean;
    hierarchy: any;
  };
}

export interface BuilderTemplate {
  id: string;
  name: string;
  description: string;
  mode: BuilderMode;
  category: string;
  presetData: Record<string, any>;
  icon: string;
}

// ============================================
// HIERARCHY VISUALIZATION
// ============================================

export interface HierarchyNode {
  id: string;
  name: string;
  level: number;
  type: 'c_suite' | 'command' | 'department' | 'agent' | 'employee';
  icon?: string;
  children?: HierarchyNode[];
  metadata?: any;
}

export interface HierarchyPreview {
  root: HierarchyNode;
  paths: Array<{
    from: string;
    to: string;
    relationship: string;
  }>;
}

// ============================================
// COST CALCULATION
// ============================================

export interface CostBreakdown {
  baseCost: number;
  intelligenceCost: number;
  totalMonthly: number;
  costPerRequest: number;
  estimatedRequests: number;
  currency: string;
}

export interface AgentCostConfig {
  tokenRate: number; // Cost per token
  intelligenceRates: Record<string, number>;
  minCost: number;
  maxCost: number;
}

// ============================================
// VALIDATION
// ============================================

export interface ValidationRule {
  field: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  minCount?: number;
  maxCount?: number;
  allowedValues?: string[];
  customValidator?: (value: any) => boolean;
}

export interface ValidationResult {
  field: string;
  isValid: boolean;
  message?: string;
  severity: 'error' | 'warning' | 'info';
  suggestions?: string[];
}

export interface BuilderValidation {
  isValid: boolean;
  results: ValidationResult[];
  errors: ValidationResult[];
  warnings: ValidationResult[];
}

// ============================================
// EXPORT / IMPORT
// ============================================

export interface BuilderExport {
  version: string;
  exportedAt: string;
  exportedBy?: string;
  organization?: string;
  agents: CustomAgent[];
  employees: CustomEmployee[];
  departments: CustomDepartment[];
  metadata: {
    totalAgents: number;
    totalEmployees: number;
    totalDepartments: number;
    totalMonthlyCost: string;
    hierarchyVersion: string;
  };
}

export interface ImportResult {
  success: boolean;
  imported: {
    agents: number;
    employees: number;
    departments: number;
  };
  errors: string[];
  warnings: string[];
}

// ============================================
// SEARCH & Filter
// ============================================

export interface SearchFilters {
  query: string;
  department?: string;
  type?: string;
  level?: string;
  category?: string;
  status?: string;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================
// PREVIEW & SIMULATION
// ============================================

export interface PreviewConfig {
  showHierarchy: boolean;
  showCosts: boolean;
  showMetrics: boolean;
  showDependencies: boolean;
}

export interface SimulationResult {
  agentResponse: string;
  estimatedTime: number;
  tokenUsage: number;
  confidence: number;
}

// ============================================
// BATCH OPERATIONS
// ============================================

export interface BatchOperation {
  type: 'create' | 'update' | 'delete' | 'clone';
  target: 'agent' | 'employee' | 'department';
  ids: string[];
  data?: any;
}

export interface BatchResult {
  success: boolean;
  completed: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

// ============================================
// DEPARTMENT TEMPLATES (21 Default + Custom)
// ============================================

export const DEFAULT_DEPARTMENT_IDS = [
  'executive',
  'finance',
  'technology',
  'marketing',
  'sales',
  'customer_experience',
  'operations',
  'human_resources',
  'legal_compliance',
  'data_intelligence',
  'product',
  'security',
  'research',
  'administrative',
  'trading_investments',
  'real_estate_property',
  'insurance_risk',
  'healthcare_medical',
  'manufacturing_production',
  'transportation_logistics',
  'government_public',
  'customer_insights_analytics',
] as const;

export type DefaultDepartmentId = typeof DEFAULT_DEPARTMENT_IDS[number];

// ============================================
// BUILDER CONSTANTS
// ============================================

export const BUILDER_CONSTANTS = {
  MAX_AGENTS: 1000,
  MAX_EMPLOYEES: 10000,
  MAX_DEPARTMENTS: 50,
  MAX_SKILLS_PER_AGENT: 10,
  MAX_SKILLS_PER_EMPLOYEE: 15,
  MIN_TOKEN_BUDGET: 5000,
  MAX_TOKEN_BUDGET: 500000,
  DEFAULT_TOKEN_RATE: 0.00001, // $0.01 per 1000 tokens
  INTELLIGENCE_COSTS: {
    predictive: 50,
    sentiment: 30,
    anomaly: 40,
  },
  VERSION: '1.0.0',
  SUPPORTED_EXPORT_FORMATS: ['json', 'csv', 'yaml'],
};
