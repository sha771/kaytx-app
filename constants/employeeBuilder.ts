/**
 * =============================================================================
 * EMPLOYEE BUILDER - Configuration & Templates
 * =============================================================================
 *
 * Default configurations, templates, and presets for creating custom employees
 * within the 7-tier enterprise hierarchy.
 *
 * @version 1.0.0
 * @lastUpdated 2026-04-21
 */

import type {
  EmployeeSkill,
  EmployeeLevel,
  EmploymentType,
  AICollaboration,
  PerformanceMetrics,
  BuilderTemplate,
} from '../types/builder';

// ============================================
// EMPLOYEE LEVELS
// ============================================

export const EMPLOYEE_LEVELS: { id: EmployeeLevel; label: string; description: string }[] = [
  {
    id: 'entry',
    label: 'Entry Level',
    description: '0-2 years experience, learning and development focus',
  },
  {
    id: 'mid',
    label: 'Mid Level',
    description: '2-5 years experience, independent contributor',
  },
  {
    id: 'senior',
    label: 'Senior Level',
    description: '5-8 years experience, mentors others, complex problems',
  },
  {
    id: 'lead',
    label: 'Lead / Manager',
    description: '8+ years experience, manages team, strategic decisions',
  },
  {
    id: 'executive',
    label: 'Executive',
    description: 'Department head, C-suite reports, company-wide impact',
  },
];

// ============================================
// EMPLOYMENT TYPES
// ============================================

export const EMPLOYMENT_TYPES: { id: EmploymentType; label: string; description: string }[] = [
  {
    id: 'full_time',
    label: 'Full Time',
    description: '40+ hours/week, benefits eligible',
  },
  {
    id: 'part_time',
    label: 'Part Time',
    description: '< 40 hours/week, limited benefits',
  },
  {
    id: 'contract',
    label: 'Contract',
    description: 'Project-based, fixed term, no benefits',
  },
  {
    id: 'intern',
    label: 'Intern',
    description: 'Temporary, learning position, supervised',
  },
];

// ============================================
// SKILL LIBRARY BY CATEGORY
// ============================================

export const EMPLOYEE_SKILL_LIBRARY: Record<string, EmployeeSkill[]> = {
  technical: [
    { id: 'tech_js', name: 'JavaScript/TypeScript', category: 'technical', proficiency: 1 },
    { id: 'tech_python', name: 'Python', category: 'technical', proficiency: 1 },
    { id: 'tech_cloud', name: 'Cloud Computing (AWS/Azure/GCP)', category: 'technical', proficiency: 1 },
    { id: 'tech_data', name: 'Data Analysis', category: 'technical', proficiency: 1 },
    { id: 'tech_ai', name: 'AI/ML', category: 'technical', proficiency: 1 },
    { id: 'tech_security', name: 'Cybersecurity', category: 'technical', proficiency: 1 },
    { id: 'tech_devops', name: 'DevOps', category: 'technical', proficiency: 1 },
    { id: 'tech_mobile', name: 'Mobile Development', category: 'technical', proficiency: 1 },
    { id: 'tech_db', name: 'Database Management', category: 'technical', proficiency: 1 },
    { id: 'tech_api', name: 'API Design', category: 'technical', proficiency: 1 },
  ],
  soft: [
    { id: 'soft_comm', name: 'Communication', category: 'soft', proficiency: 1 },
    { id: 'soft_lead', name: 'Leadership', category: 'soft', proficiency: 1 },
    { id: 'soft_team', name: 'Teamwork', category: 'soft', proficiency: 1 },
    { id: 'soft_prob', name: 'Problem Solving', category: 'soft', proficiency: 1 },
    { id: 'soft_time', name: 'Time Management', category: 'soft', proficiency: 1 },
    { id: 'soft_adapt', name: 'Adaptability', category: 'soft', proficiency: 1 },
    { id: 'soft_crit', name: 'Critical Thinking', category: 'soft', proficiency: 1 },
    { id: 'soft_emo', name: 'Emotional Intelligence', category: 'soft', proficiency: 1 },
    { id: 'soft_neg', name: 'Negotiation', category: 'soft', proficiency: 1 },
    { id: 'soft_pres', name: 'Presentation', category: 'soft', proficiency: 1 },
  ],
  leadership: [
    { id: 'lead_strat', name: 'Strategic Planning', category: 'leadership', proficiency: 1 },
    { id: 'lead_dec', name: 'Decision Making', category: 'leadership', proficiency: 1 },
    { id: 'lead_coach', name: 'Coaching & Mentoring', category: 'leadership', proficiency: 1 },
    { id: 'lead_change', name: 'Change Management', category: 'leadership', proficiency: 1 },
    { id: 'lead_conflict', name: 'Conflict Resolution', category: 'leadership', proficiency: 1 },
    { id: 'lead_vision', name: 'Vision Setting', category: 'leadership', proficiency: 1 },
    { id: 'lead_deleg', name: 'Delegation', category: 'leadership', proficiency: 1 },
    { id: 'lead_inspire', name: 'Inspiration & Motivation', category: 'leadership', proficiency: 1 },
  ],
  domain: [
    { id: 'dom_fin', name: 'Finance & Accounting', category: 'domain', proficiency: 1 },
    { id: 'dom_mkt', name: 'Marketing & Sales', category: 'domain', proficiency: 1 },
    { id: 'dom_hr', name: 'Human Resources', category: 'domain', proficiency: 1 },
    { id: 'dom_ops', name: 'Operations', category: 'domain', proficiency: 1 },
    { id: 'dom_legal', name: 'Legal & Compliance', category: 'domain', proficiency: 1 },
    { id: 'dom_prod', name: 'Product Management', category: 'domain', proficiency: 1 },
    { id: 'dom_research', name: 'Research & Development', category: 'domain', proficiency: 1 },
    { id: 'dom_customer', name: 'Customer Success', category: 'domain', proficiency: 1 },
    { id: 'dom_supply', name: 'Supply Chain', category: 'domain', proficiency: 1 },
    { id: 'dom_health', name: 'Healthcare', category: 'domain', proficiency: 1 },
  ],
};

// ============================================
// DEPARTMENT ROLES
// ============================================

export const DEPARTMENT_ROLES: Record<string, string[]> = {
  finance: [
    'Financial Analyst',
    'Accountant',
    'Budget Manager',
    'Auditor',
    'Controller',
    'Treasury Manager',
    'CFO',
  ],
  technology: [
    'Software Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Security Engineer',
    'QA Engineer',
    'System Architect',
    'CTO',
  ],
  marketing: [
    'Marketing Specialist',
    'Content Creator',
    'SEO Specialist',
    'Social Media Manager',
    'Brand Manager',
    'Marketing Analyst',
    'CMO',
  ],
  sales: [
    'Sales Representative',
    'Account Manager',
    'Sales Engineer',
    'Business Development',
    'Sales Operations',
    'Regional Sales Manager',
    'VP of Sales',
  ],
  customer_experience: [
    'Support Specialist',
    'Customer Success Manager',
    'Technical Support',
    'CX Analyst',
    'Support Team Lead',
    'Head of Customer Experience',
    'CCO',
  ],
  operations: [
    'Operations Analyst',
    'Process Manager',
    'Supply Chain Coordinator',
    'Quality Assurance',
    'Operations Manager',
    'COO',
  ],
  human_resources: [
    'HR Specialist',
    'Recruiter',
    'HR Business Partner',
    'Training Coordinator',
    'Compensation Analyst',
    'HR Director',
    'CHRO',
  ],
  legal_compliance: [
    'Legal Assistant',
    'Compliance Officer',
    'Contract Manager',
    'Risk Analyst',
    'Corporate Counsel',
    'General Counsel',
    'CLO',
  ],
  data_intelligence: [
    'Data Analyst',
    'Business Intelligence Analyst',
    'Data Engineer',
    'ML Engineer',
    'Analytics Manager',
    'Chief Data Officer',
    'CDAO',
  ],
  product: [
    'Product Analyst',
    'Associate Product Manager',
    'Product Manager',
    'Senior Product Manager',
    'Group Product Manager',
    'VP of Product',
    'CPO',
  ],
  security: [
    'Security Analyst',
    'SOC Analyst',
    'Penetration Tester',
    'Security Engineer',
    'Security Architect',
    'CISO-AI',
    'CISO',
  ],
};

// ============================================
// AI COLLABORATION TEMPLATES
// ============================================

export const AI_COLLABORATION_TEMPLATES: AICollaboration[] = [
  {
    agentId: 'support_assistant',
    agentName: 'Support Assistant',
    collaborationType: 'assistant',
    tasks: ['Ticket triage', 'FAQ responses', 'Escalation routing'],
    enabled: true,
  },
  {
    agentId: 'research_partner',
    agentName: 'Research Partner',
    collaborationType: 'partner',
    tasks: ['Data gathering', 'Analysis support', 'Report drafting'],
    enabled: true,
  },
  {
    agentId: 'workflow_supervisor',
    agentName: 'Workflow Supervisor',
    collaborationType: 'supervisor',
    tasks: ['Process monitoring', 'Quality checks', 'Optimization suggestions'],
    enabled: false,
  },
  {
    agentId: 'learning_guide',
    agentName: 'Learning Guide',
    collaborationType: 'trainee',
    tasks: ['Onboarding', 'Skill development', 'Knowledge sharing'],
    enabled: true,
  },
];

// ============================================
// PERFORMANCE METRICS TEMPLATES
// ============================================

export const PERFORMANCE_METRICS_TEMPLATES: PerformanceMetrics[] = [
  {
    kpiCategory: 'Productivity',
    metrics: [
      { name: 'Tasks Completed', target: '25/week', frequency: 'weekly' },
      { name: 'Response Time', target: '< 2 hours', frequency: 'daily' },
      { name: 'Project Delivery', target: 'On-time 95%', frequency: 'monthly' },
    ],
  },
  {
    kpiCategory: 'Quality',
    metrics: [
      { name: 'Error Rate', target: '< 1%', frequency: 'weekly' },
      { name: 'Customer Satisfaction', target: '> 4.5/5', frequency: 'monthly' },
      { name: 'Code Quality Score', target: '> 90%', frequency: 'monthly' },
    ],
  },
  {
    kpiCategory: 'Collaboration',
    metrics: [
      { name: 'Team Participation', target: 'Active', frequency: 'weekly' },
      { name: 'Knowledge Sharing', target: '2 sessions/month', frequency: 'monthly' },
      { name: 'Cross-functional Projects', target: '1/quarter', frequency: 'quarterly' },
    ],
  },
  {
    kpiCategory: 'Innovation',
    metrics: [
      { name: 'New Ideas Submitted', target: '2/month', frequency: 'monthly' },
      { name: 'Process Improvements', target: '1/quarter', frequency: 'quarterly' },
      { name: 'AI Tool Adoption', target: '> 80%', frequency: 'monthly' },
    ],
  },
];

// ============================================
// VALIDATION FUNCTIONS
// ============================================

import type { ValidationResult } from '../types/builder';

export function validateEmployeeName(firstName: string, lastName: string): ValidationResult {
  if (!firstName || firstName.trim().length === 0) {
    return { field: 'firstName', isValid: false, message: 'First name is required', severity: 'error' };
  }
  if (!lastName || lastName.trim().length === 0) {
    return { field: 'lastName', isValid: false, message: 'Last name is required', severity: 'error' };
  }
  if (firstName.length < 2 || lastName.length < 2) {
    return { field: 'name', isValid: false, message: 'Names must be at least 2 characters', severity: 'error' };
  }
  return { field: 'name', isValid: true, severity: 'info' };
}

export function validateEmployeeEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { field: 'email', isValid: false, message: 'Email is required', severity: 'error' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: 'email', isValid: false, message: 'Please enter a valid email', severity: 'error' };
  }
  return { field: 'email', isValid: true, severity: 'info' };
}

export function validateEmployeeRole(role: string): ValidationResult {
  if (!role || role.trim().length === 0) {
    return { field: 'role', isValid: false, message: 'Role is required', severity: 'error' };
  }
  if (role.length < 3) {
    return { field: 'role', isValid: false, message: 'Role must be at least 3 characters', severity: 'error' };
  }
  return { field: 'role', isValid: true, severity: 'info' };
}

export function validateEmployeeSkills(skills: any[]): ValidationResult {
  if (!skills || skills.length === 0) {
    return { field: 'skills', isValid: false, message: 'At least one skill is required', severity: 'error' };
  }
  if (skills.length > 15) {
    return { field: 'skills', isValid: false, message: 'Maximum 15 skills allowed', severity: 'warning' };
  }
  return { field: 'skills', isValid: true, severity: 'info' };
}

// ============================================
// SALARY & COST CALCULATION
// ============================================

export function calculateEmployeeCost(
  level: string,
  department: string,
  aiWorkloadBalance: number
): {
  baseSalary: number;
  aiAssistanceValue: number;
  productivityBoost: string;
  annualCost: number;
  costFormatted: string;
} {
  const baseSalaries: Record<string, number> = {
    entry: 50000,
    mid: 75000,
    senior: 100000,
    lead: 130000,
    executive: 180000,
  };
  
  const baseSalary = baseSalaries[level] || 75000;
  
  // AI assistance value (productivity boost worth)
  const aiAssistanceValue = (aiWorkloadBalance / 100) * baseSalary * 0.3;
  
  // Productivity boost percentage
  const productivityBoost = `${Math.round((aiWorkloadBalance / 100) * 40)}%`;
  
  // Annual cost with benefits (1.3x salary)
  const annualCost = (baseSalary + aiAssistanceValue) * 1.3;
  
  return {
    baseSalary,
    aiAssistanceValue,
    productivityBoost,
    annualCost,
    costFormatted: `$${(annualCost / 1000).toFixed(1)}K/year`,
  };
}

// ============================================
// AI COLLABORATION PRESETS
// ============================================

export const AI_COLLABORATION_PRESETS = {
  low: {
    name: 'Minimal AI Support',
    description: 'Employee handles most tasks independently',
    balance: 20,
    recommendedRoles: ['executive', 'creative_lead', 'strategist'],
  },
  medium: {
    name: 'Balanced Collaboration',
    description: 'Equal split between human and AI work',
    balance: 50,
    recommendedRoles: ['analyst', 'manager', 'coordinator'],
  },
  high: {
    name: 'AI-Assisted Worker',
    description: 'AI handles routine, human focuses on complex decisions',
    balance: 70,
    recommendedRoles: ['support', 'data_entry', 'researcher'],
  },
  full: {
    name: 'AI-Augmented',
    description: 'Heavy AI assistance with human oversight',
    balance: 85,
    recommendedRoles: ['operator', 'monitor', 'reviewer'],
  },
};

// ============================================
// TEAM COMPOSITION PRESETS
// ============================================

export const TEAM_PRESETS = {
  startup_core: {
    name: 'Startup Core Team',
    description: 'Essential roles for a new company',
    employees: [
      { template: 'senior_analyst', count: 1 },
      { template: 'marketing_manager', count: 1 },
      { template: 'support_specialist', count: 2 },
      { template: 'junior_dev', count: 2 },
    ],
  },
  enterprise_sales: {
    name: 'Enterprise Sales Squad',
    description: 'High-performance sales team',
    employees: [
      { template: 'finance_controller', count: 1 },
      { template: 'support_specialist', count: 1 },
      { template: 'product_manager', count: 1 },
    ],
  },
  security_team: {
    name: 'Security Operations Team',
    description: 'Cybersecurity professionals',
    employees: [
      { template: 'security_analyst', count: 2 },
      { template: 'senior_analyst', count: 1 },
    ],
  },
  product_squad: {
    name: 'Product Development Squad',
    description: 'Cross-functional product team',
    employees: [
      { template: 'product_manager', count: 1 },
      { template: 'junior_dev', count: 2 },
      { template: 'senior_analyst', count: 1 },
    ],
  },
};

// ============================================
// EMPLOYEE TEMPLATES (EXPANDED)
// ============================================

export const EMPLOYEE_TEMPLATES: BuilderTemplate[] = [
  {
    id: 'junior_dev',
    name: 'Junior Developer',
    description: 'Entry-level software developer',
    mode: 'employee',
    category: 'technology',
    icon: 'Code',
    presetData: {
      level: 'entry',
      employmentType: 'full_time',
      skills: ['tech_js', 'tech_db', 'soft_comm', 'soft_prob'],
      aiWorkloadBalance: 30,
    },
  },
  {
    id: 'senior_analyst',
    name: 'Senior Analyst',
    description: 'Experienced data or business analyst',
    mode: 'employee',
    category: 'data_intelligence',
    icon: 'BarChart3',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['tech_data', 'tech_python', 'soft_crit', 'dom_fin', 'lead_strat'],
      aiWorkloadBalance: 50,
    },
  },
  {
    id: 'marketing_manager',
    name: 'Marketing Manager',
    description: 'Marketing team leader',
    mode: 'employee',
    category: 'marketing',
    icon: 'Megaphone',
    presetData: {
      level: 'lead',
      employmentType: 'full_time',
      skills: ['dom_mkt', 'soft_lead', 'soft_comm', 'lead_dec', 'lead_vision', 'tech_ai'],
      aiWorkloadBalance: 40,
    },
  },
  {
    id: 'support_specialist',
    name: 'Support Specialist',
    description: 'Customer support representative',
    mode: 'employee',
    category: 'customer_experience',
    icon: 'Headphones',
    presetData: {
      level: 'entry',
      employmentType: 'full_time',
      skills: ['soft_comm', 'soft_emo', 'dom_customer', 'tech_ai'],
      aiWorkloadBalance: 60,
    },
  },
  {
    id: 'hr_business_partner',
    name: 'HR Business Partner',
    description: 'Strategic HR role',
    mode: 'employee',
    category: 'human_resources',
    icon: 'Users',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['dom_hr', 'lead_coach', 'soft_emo', 'soft_neg', 'lead_conflict'],
      aiWorkloadBalance: 35,
    },
  },
  {
    id: 'finance_controller',
    name: 'Finance Controller',
    description: 'Senior finance position',
    mode: 'employee',
    category: 'finance',
    icon: 'DollarSign',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['dom_fin', 'lead_strat', 'soft_crit', 'tech_data', 'lead_dec'],
      aiWorkloadBalance: 45,
    },
  },
  {
    id: 'security_analyst',
    name: 'Security Analyst',
    description: 'Cybersecurity professional',
    mode: 'employee',
    category: 'security',
    icon: 'Shield',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['tech_security', 'tech_cloud', 'soft_prob', 'soft_crit'],
      aiWorkloadBalance: 55,
    },
  },
  {
    id: 'product_manager',
    name: 'Product Manager',
    description: 'Product development leader',
    mode: 'employee',
    category: 'product',
    icon: 'Box',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['dom_prod', 'lead_strat', 'soft_comm', 'tech_data', 'dom_mkt'],
      aiWorkloadBalance: 40,
    },
  },
  // NEW: Additional Templates
  {
    id: 'ux_designer',
    name: 'UX Designer',
    description: 'User experience and interface designer',
    mode: 'employee',
    category: 'product',
    icon: 'Palette',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['dom_prod', 'soft_comm', 'tech_mobile', 'soft_crit', 'soft_creat'],
      aiWorkloadBalance: 45,
    },
  },
  {
    id: 'content_writer',
    name: 'Content Writer',
    description: 'Creates marketing and product content',
    mode: 'employee',
    category: 'marketing',
    icon: 'FileText',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['dom_mkt', 'soft_comm', 'soft_creat', 'soft_crit'],
      aiWorkloadBalance: 60,
    },
  },
  {
    id: 'qa_engineer',
    name: 'QA Engineer',
    description: 'Software quality assurance specialist',
    mode: 'employee',
    category: 'technology',
    icon: 'CheckCircle',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['tech_js', 'tech_python', 'soft_prob', 'soft_crit', 'tech_devops'],
      aiWorkloadBalance: 55,
    },
  },
  {
    id: 'data_engineer',
    name: 'Data Engineer',
    description: 'Builds data pipelines and infrastructure',
    mode: 'employee',
    category: 'data_intelligence',
    icon: 'Database',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['tech_data', 'tech_cloud', 'tech_db', 'tech_devops', 'soft_prob'],
      aiWorkloadBalance: 50,
    },
  },
  {
    id: 'customer_success_manager',
    name: 'Customer Success Manager',
    description: 'Ensures customer satisfaction and retention',
    mode: 'employee',
    category: 'customer_experience',
    icon: 'Smile',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['dom_customer', 'soft_comm', 'soft_emo', 'lead_coach', 'soft_neg'],
      aiWorkloadBalance: 45,
    },
  },
  {
    id: 'operations_manager',
    name: 'Operations Manager',
    description: 'Oversees day-to-day business operations',
    mode: 'employee',
    category: 'operations',
    icon: 'Settings',
    presetData: {
      level: 'lead',
      employmentType: 'full_time',
      skills: ['dom_ops', 'lead_strat', 'soft_prob', 'soft_comm', 'lead_dec'],
      aiWorkloadBalance: 35,
    },
  },
  {
    id: 'executive_assistant',
    name: 'Executive Assistant',
    description: 'Supports C-suite executives',
    mode: 'employee',
    category: 'executive',
    icon: 'Briefcase',
    presetData: {
      level: 'mid',
      employmentType: 'full_time',
      skills: ['soft_comm', 'soft_time', 'soft_adapt', 'soft_prob'],
      aiWorkloadBalance: 65,
    },
  },
  {
    id: 'research_scientist',
    name: 'Research Scientist',
    description: 'Conducts R&D and innovation research',
    mode: 'employee',
    category: 'research',
    icon: 'Microscope',
    presetData: {
      level: 'senior',
      employmentType: 'full_time',
      skills: ['dom_research', 'tech_ai', 'tech_data', 'soft_crit', 'soft_prob'],
      aiWorkloadBalance: 40,
    },
  },
];

// ============================================
// VALIDATION RULES
// ============================================

export const EMPLOYEE_VALIDATION_RULES = {
  firstName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s-]+$/,
    required: true,
  },
  lastName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s-]+$/,
    required: true,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
  },
  departmentId: {
    required: true,
  },
  role: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  skills: {
    minCount: 1,
    maxCount: 15,
    required: true,
  },
  aiWorkloadBalance: {
    min: 0,
    max: 100,
    required: true,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateEmployeeId(department: string, level: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const deptCode = department.substring(0, 3).toUpperCase();
  const levelCode = level.substring(0, 1).toUpperCase();
  return `EMP-${deptCode}-${levelCode}-${timestamp}`;
}

export function getRoleForLevel(department: string, level: EmployeeLevel): string[] {
  const roles = DEPARTMENT_ROLES[department] || [];
  
  switch (level) {
    case 'entry':
      return roles.slice(0, 3);
    case 'mid':
      return roles.slice(1, 4);
    case 'senior':
      return roles.slice(2, 5);
    case 'lead':
      return roles.slice(3, 6);
    case 'executive':
      return roles.slice(-2);
    default:
      return roles;
  }
}

export function calculateAIWorkloadRecommendation(
  level: EmployeeLevel,
  department: string
): number {
  const baseRecommendations: Record<EmployeeLevel, number> = {
    entry: 50,
    mid: 40,
    senior: 35,
    lead: 30,
    executive: 25,
  };
  
  // Adjust based on department
  const techHeavyDepts = ['technology', 'data_intelligence', 'security'];
  const adjustment = techHeavyDepts.includes(department) ? 10 : 0;
  
  return Math.min(95, baseRecommendations[level] + adjustment);
}
