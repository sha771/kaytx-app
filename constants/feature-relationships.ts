/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 * @description Feature Relationships Configuration - Maps related options and features for cross-linking
 */

import {
  Zap,
  Bot,
  MessageSquare,
  Calendar,
  BarChart3,
  Users,
  Mail,
  Phone,
  Workflow,
  Target,
  Megaphone,
  FileText,
  Settings,
  Shield,
  Globe,
  TrendingUp,
  Briefcase,
  Headphones,
  Video,
  Share2,
  Layers,
  CheckCircle,
  Sparkles,
  Clock,
  Brain,
  type LucideIcon,
} from 'lucide-react-native';

export interface RelatedFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  route: string;
  category: string;
}

export interface FeatureRelationship {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  route: string;
  relatedFeatures: string[];
}

// Map of all feature relationships
export const FEATURE_RELATIONSHIPS: Record<string, FeatureRelationship> = {
  // AI Agent Features
  'ai-agent': {
    id: 'ai-agent',
    title: 'AI Agent',
    description: 'Intelligent AI agents for automation',
    icon: Bot,
    color: '#6366F1',
    route: '/ai-agent/ai-agent',
    relatedFeatures: [
      'ai-receptionist',
      'ai-voice-assistant',
      'ai-workflow',
      'ai-data-analytics',
      'automation-hub',
      'workflow-builder',
      'ai-negotiation',
      'personal-assistant',
    ],
  },
  'ai-receptionist': {
    id: 'ai-receptionist',
    title: 'AI Receptionist',
    description: 'Automated call handling and reception',
    icon: Headphones,
    color: '#8B5CF6',
    route: '/ai-agent/ai-receptionist',
    relatedFeatures: [
      'ai-agent',
      'ai-voice-assistant',
      'phone-call',
      'call-center',
      'scheduling-calendar',
      'ai-negotiation',
      'contacts',
    ],
  },
  'ai-voice-assistant': {
    id: 'ai-voice-assistant',
    title: 'AI Voice Assistant',
    description: 'Voice-enabled AI assistance',
    icon: Phone,
    color: '#EC4899',
    route: '/ai-agent/ai-voice-assistant',
    relatedFeatures: [
      'ai-agent',
      'ai-receptionist',
      'phone-call',
      'voice-call',
      'ai-negotiation',
    ],
  },
  'ai-workflow': {
    id: 'ai-workflow',
    title: 'AI Workflow',
    description: 'AI-powered workflow automation',
    icon: Workflow,
    color: '#F59E0B',
    route: '/ai-agent/ai-workflow',
    relatedFeatures: [
      'ai-agent',
      'automation-hub',
      'workflow-builder',
      'task-management',
      'smart-task-automation',
    ],
  },
  'ai-data-analytics': {
    id: 'ai-data-analytics',
    title: 'AI Data Analytics',
    description: 'AI-powered data analysis',
    icon: Brain,
    color: '#10B981',
    route: '/ai-agent/ai-data-analytics',
    relatedFeatures: [
      'ai-agent',
      'analytics-performance',
      'reports-insights',
      'advance-analytics',
      'business-analysis',
    ],
  },
  'ai-negotiation': {
    id: 'ai-negotiation',
    title: 'AI Negotiation',
    description: 'AI-powered negotiation assistant',
    icon: Sparkles,
    color: '#3B82F6',
    route: '/ai-negotiation/dashboard',
    relatedFeatures: [
      'ai-agent',
      'ai-receptionist',
      'ai-voice-assistant',
      'phone-call',
      'call-center',
      'crm',
      'deals',
    ],
  },
  'personal-assistant': {
    id: 'personal-assistant',
    title: 'Personal Assistant',
    description: 'Your personal AI assistant',
    icon: Bot,
    color: '#6366F1',
    route: '/ai-agent/personal-assistant',
    relatedFeatures: [
      'ai-agent',
      'ai-assistant',
      'scheduling-calendar',
      'task-management',
      'emails',
      'calendar',
    ],
  },

  // Automation Features
  'automation-hub': {
    id: 'automation-hub',
    title: 'Automation Hub',
    description: 'Central hub for all automations',
    icon: Zap,
    color: '#F59E0B',
    route: '/automation/automation-hub',
    relatedFeatures: [
      'workflow-builder',
      'marketing-automation',
      'lead-generation',
      'sales-automation',
      'ai-workflow',
      'smart-task-automation',
      'integrations',
    ],
  },
  'workflow-builder': {
    id: 'workflow-builder',
    title: 'Workflow Builder',
    description: 'Build custom workflows',
    icon: Workflow,
    color: '#8B5CF6',
    route: '/automation/workflow-builder',
    relatedFeatures: [
      'automation-hub',
      'ai-workflow',
      'task-management',
      'task-assignment',
      'team-performance',
    ],
  },
  'marketing-automation': {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    description: 'Automate marketing campaigns',
    icon: Megaphone,
    color: '#EC4899',
    route: '/automation/marketing-automation',
    relatedFeatures: [
      'automation-hub',
      'email-marketing',
      'sms-marketing-hub',
      'marketing-hub',
      'campaign',
      'lead-generation',
    ],
  },
  'lead-generation': {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'Automated lead generation',
    icon: Target,
    color: '#10B981',
    route: '/automation/lead-generation',
    relatedFeatures: [
      'automation-hub',
      'marketing-automation',
      'crm',
      'customer-management',
      'sales-pipeline',
      'cold-calling',
      'cold-email',
    ],
  },
  'sales-automation': {
    id: 'sales-automation',
    title: 'Sales Automation',
    description: 'Automate sales processes',
    icon: TrendingUp,
    color: '#3B82F6',
    route: '/automation/sales-automation',
    relatedFeatures: [
      'automation-hub',
      'crm',
      'sales-management',
      'sales-pipeline',
      'revenue-tracking',
      'lead-generation',
    ],
  },
  'task-management': {
    id: 'task-management',
    title: 'Task Management',
    description: 'Manage and track tasks',
    icon: CheckCircle,
    color: '#6366F1',
    route: '/automation/task-management',
    relatedFeatures: [
      'workflow-builder',
      'task-assignment',
      'team-performance',
      'time-management',
      'project-management',
      'scheduling-calendar',
    ],
  },
  'scheduling-calendar': {
    id: 'scheduling-calendar',
    title: 'Scheduling & Calendar',
    description: 'Schedule and manage events',
    icon: Calendar,
    color: '#8B5CF6',
    route: '/automation/scheduling-calendar',
    relatedFeatures: [
      'task-management',
      'time-management',
      'ai-receptionist',
      'personal-assistant',
      'event-calendar',
      'appointments',
    ],
  },
  'time-management': {
    id: 'time-management',
    title: 'Time Management',
    description: 'Track and manage time',
    icon: Clock,
    color: '#F59E0B',
    route: '/automation/time-management',
    relatedFeatures: [
      'scheduling-calendar',
      'task-management',
      'team-performance',
      'productivity',
    ],
  },

  // Communications Features
  'chats-messaging': {
    id: 'chats-messaging',
    title: 'Chats & Messaging',
    description: 'Unified messaging platform',
    icon: MessageSquare,
    color: '#6366F1',
    route: '/communications/chats-messaging',
    relatedFeatures: [
      'unified-inbox',
      'instant-chats',
      'sms-text',
      'whatsapp',
      'telegram',
      'instagram',
      'messenger',
    ],
  },
  'unified-inbox': {
    id: 'unified-inbox',
    title: 'Unified Inbox',
    description: 'All messages in one place',
    icon: Mail,
    color: '#8B5CF6',
    route: '/communications/unified-inbox',
    relatedFeatures: [
      'chats-messaging',
      'email',
      'sms-text',
      'instant-chats',
      'social-media',
    ],
  },
  'phone-call': {
    id: 'phone-call',
    title: 'Phone Call',
    description: 'Voice calling features',
    icon: Phone,
    color: '#10B981',
    route: '/communications/phone-call',
    relatedFeatures: [
      'ai-receptionist',
      'ai-voice-assistant',
      'voice-call',
      'call-center',
      'ai-negotiation',
      'call-logs',
    ],
  },
  'voice-call': {
    id: 'voice-call',
    title: 'Voice Call',
    description: 'Voice communication',
    icon: Phone,
    color: '#3B82F6',
    route: '/communications/voice-call',
    relatedFeatures: [
      'phone-call',
      'ai-receptionist',
      'ai-voice-assistant',
      'video-call',
      'meeting',
    ],
  },
  'video-call': {
    id: 'video-call',
    title: 'Video Call',
    description: 'Video communication',
    icon: Video,
    color: '#EC4899',
    route: '/communications/video-call',
    relatedFeatures: [
      'voice-call',
      'meeting',
      'conference',
      'video-interview-survey',
      'team-communication',
    ],
  },
  'email': {
    id: 'email',
    title: 'Email',
    description: 'Email management',
    icon: Mail,
    color: '#F59E0B',
    route: '/communications/email',
    relatedFeatures: [
      'unified-inbox',
      'email-marketing',
      'cold-email',
      'ai-assistant-emails',
      'message-scheduling',
    ],
  },
  'sms-text': {
    id: 'sms-text',
    title: 'SMS & Text',
    description: 'SMS messaging',
    icon: MessageSquare,
    color: '#6366F1',
    route: '/communications/sms-text',
    relatedFeatures: [
      'chats-messaging',
      'sms-marketing-hub',
      'text-voice-survey',
      'instant-chats',
      'cold-calling',
    ],
  },
  'meeting': {
    id: 'meeting',
    title: 'Meeting',
    description: 'Meeting management',
    icon: Users,
    color: '#8B5CF6',
    route: '/communications/meeting',
    relatedFeatures: [
      'video-call',
      'conference',
      'scheduling-calendar',
      'team-communication',
      'event-calendar',
    ],
  },
  'conference': {
    id: 'conference',
    title: 'Conference',
    description: 'Conference calls',
    icon: Users,
    color: '#10B981',
    route: '/communications/conference',
    relatedFeatures: [
      'meeting',
      'video-call',
      'team-communication',
      'call-center',
    ],
  },
  'call-center': {
    id: 'call-center',
    title: 'Call Center',
    description: 'Call center management',
    icon: Headphones,
    color: '#3B82F6',
    route: '/communications/call-center',
    relatedFeatures: [
      'ai-receptionist',
      'phone-call',
      'voice-call',
      'ai-negotiation',
      'customer-support',
      'contact-center',
    ],
  },
  'team-communication': {
    id: 'team-communication',
    title: 'Team Communication',
    description: 'Team collaboration tools',
    icon: Users,
    color: '#EC4899',
    route: '/communications/team-communication',
    relatedFeatures: [
      'meeting',
      'conference',
      'team-collaboration',
      'team-management',
      'project-management',
      'instant-chats',
    ],
  },

  // Business Features
  'crm': {
    id: 'crm',
    title: 'CRM',
    description: 'Customer relationship management',
    icon: Users,
    color: '#6366F1',
    route: '/business/crm',
    relatedFeatures: [
      'customer-management',
      'sales-management',
      'sales-pipeline',
      'lead-generation',
      'crm-integration',
      'ai-negotiation-crm',
    ],
  },
  'customer-management': {
    id: 'customer-management',
    title: 'Customer Management',
    description: 'Manage customers',
    icon: Users,
    color: '#8B5CF6',
    route: '/business/customer-management',
    relatedFeatures: [
      'crm',
      'customer-support',
      'cohort-analysis',
      'contacts',
      'ai-receptionist-contacts',
    ],
  },
  'sales-management': {
    id: 'sales-management',
    title: 'Sales Management',
    description: 'Sales operations',
    icon: TrendingUp,
    color: '#10B981',
    route: '/business/sales-management',
    relatedFeatures: [
      'crm',
      'sales-pipeline',
      'revenue-tracking',
      'roi-analysis',
      'sales-automation',
    ],
  },
  'sales-pipeline': {
    id: 'sales-pipeline',
    title: 'Sales Pipeline',
    description: 'Sales pipeline tracking',
    icon: Layers,
    color: '#3B82F6',
    route: '/business/sales-pipeline',
    relatedFeatures: [
      'crm',
      'sales-management',
      'lead-generation',
      'deals',
      'ai-negotiation-deals',
    ],
  },
  'business-analysis': {
    id: 'business-analysis',
    title: 'Business Analysis',
    description: 'Business intelligence',
    icon: BarChart3,
    color: '#EC4899',
    route: '/business/business-analysis',
    relatedFeatures: [
      'ai-data-analytics',
      'analytics-performance',
      'reports-insights',
      'advance-analytics',
      'roi-analysis',
    ],
  },
  'revenue-tracking': {
    id: 'revenue-tracking',
    title: 'Revenue Tracking',
    description: 'Track revenue',
    icon: TrendingUp,
    color: '#F59E0B',
    route: '/business/revenue-tracking',
    relatedFeatures: [
      'sales-management',
      'roi-analysis',
      'analytics-performance',
      'sales-automation',
    ],
  },
  'customer-support': {
    id: 'customer-support',
    title: 'Customer Support',
    description: 'Support management',
    icon: Headphones,
    color: '#6366F1',
    route: '/business/customer-support',
    relatedFeatures: [
      'customer-management',
      'call-center',
      'contact-center',
      'ai-receptionist',
      'helpdesk',
    ],
  },

  // Marketing Features
  'marketing-hub': {
    id: 'marketing-hub',
    title: 'Marketing Hub',
    description: 'Central marketing dashboard',
    icon: Megaphone,
    color: '#EC4899',
    route: '/marketing/marketing-hub',
    relatedFeatures: [
      'email-marketing',
      'sms-marketing-hub',
      'social-media-management',
      'content-creation',
      'campaign',
      'marketing-automation',
    ],
  },
  'email-marketing': {
    id: 'email-marketing',
    title: 'Email Marketing',
    description: 'Email campaigns',
    icon: Mail,
    color: '#6366F1',
    route: '/marketing/email-marketing',
    relatedFeatures: [
      'marketing-hub',
      'email-marketing-hub',
      'campaign',
      'cold-email',
      'marketing-automation',
      'email',
    ],
  },
  'sms-marketing-hub': {
    id: 'sms-marketing-hub',
    title: 'SMS Marketing',
    description: 'SMS campaigns',
    icon: MessageSquare,
    color: '#8B5CF6',
    route: '/marketing/sms-marketing-hub',
    relatedFeatures: [
      'marketing-hub',
      'sms-text',
      'campaign',
      'cold-calling',
      'text-voice-survey',
    ],
  },
  'social-media-management': {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Manage social media',
    icon: Share2,
    color: '#10B981',
    route: '/marketing/social-media-management',
    relatedFeatures: [
      'marketing-hub',
      'content-creation',
      'advertising',
      'campaign',
      'social-media-communications',
    ],
  },
  'content-creation': {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Create marketing content',
    icon: FileText,
    color: '#3B82F6',
    route: '/marketing/content-creation',
    relatedFeatures: [
      'social-media-management',
      'email-marketing',
      'advertising',
      'advance-marketing',
      'llmo',
    ],
  },
  'campaign': {
    id: 'campaign',
    title: 'Campaign',
    description: 'Marketing campaigns',
    icon: Target,
    color: '#F59E0B',
    route: '/marketing/campaign',
    relatedFeatures: [
      'marketing-hub',
      'email-marketing',
      'sms-marketing-hub',
      'marketing-automation',
      'ads-manager',
    ],
  },
  'seo-optimization': {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Search engine optimization',
    icon: Globe,
    color: '#6366F1',
    route: '/marketing/seo-optimization',
    relatedFeatures: [
      'content-creation',
      'advance-marketing',
      'growth-optimization',
      'llmo',
    ],
  },
  'cold-calling': {
    id: 'cold-calling',
    title: 'Cold Calling',
    description: 'Outbound calling campaigns',
    icon: Phone,
    color: '#8B5CF6',
    route: '/marketing/cold-calling',
    relatedFeatures: [
      'lead-generation',
      'ai-negotiation',
      'ai-receptionist',
      'phone-call',
      'call-center',
      'sms-marketing-hub',
    ],
  },
  'cold-email': {
    id: 'cold-email',
    title: 'Cold Email',
    description: 'Outbound email campaigns',
    icon: Mail,
    color: '#EC4899',
    route: '/marketing/cold-email',
    relatedFeatures: [
      'lead-generation',
      'email-marketing',
      'email',
      'ai-assistant-emails',
      'marketing-automation',
    ],
  },

  // Analytics Features
  'analytics-performance': {
    id: 'analytics-performance',
    title: 'Analytics & Performance',
    description: 'Performance analytics',
    icon: BarChart3,
    color: '#10B981',
    route: '/analytics/analytics-performance',
    relatedFeatures: [
      'reports-insights',
      'data-visualization',
      'advance-analytics',
      'ai-data-analytics',
      'business-analysis',
    ],
  },
  'reports-insights': {
    id: 'reports-insights',
    title: 'Reports & Insights',
    description: 'Business reports',
    icon: FileText,
    color: '#3B82F6',
    route: '/analytics/reports-insights',
    relatedFeatures: [
      'analytics-performance',
      'data-visualization',
      'advance-analytics',
      'best-time-analysis',
      'ab-testing',
    ],
  },
  'data-visualization': {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Visual data representation',
    icon: BarChart3,
    color: '#EC4899',
    route: '/analytics/data-visualization',
    relatedFeatures: [
      'analytics-performance',
      'reports-insights',
      'advance-analytics',
      'business-analysis',
    ],
  },
  'advance-analytics': {
    id: 'advance-analytics',
    title: 'Advanced Analytics',
    description: 'Advanced data analysis',
    icon: Brain,
    color: '#F59E0B',
    route: '/analytics/advance-analytics',
    relatedFeatures: [
      'ai-data-analytics',
      'analytics-performance',
      'reports-insights',
      'best-time-analysis',
      'ab-testing',
    ],
  },

  // Collaboration Features
  'team-collaboration': {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description: 'Team collaboration tools',
    icon: Users,
    color: '#6366F1',
    route: '/collaboration/team-collaboration',
    relatedFeatures: [
      'team-management',
      'project-management',
      'file-sharing',
      'event-calendar',
      'team-communication',
    ],
  },
  'team-management': {
    id: 'team-management',
    title: 'Team Management',
    description: 'Manage team members',
    icon: Users,
    color: '#8B5CF6',
    route: '/collaboration/team-management',
    relatedFeatures: [
      'team-collaboration',
      'project-management',
      'team-performance',
      'task-assignment',
    ],
  },
  'project-management': {
    id: 'project-management',
    title: 'Project Management',
    description: 'Manage projects',
    icon: Briefcase,
    color: '#10B981',
    route: '/collaboration/project-management',
    relatedFeatures: [
      'team-collaboration',
      'team-management',
      'task-management',
      'workflow-builder',
      'event-calendar',
    ],
  },
  'file-sharing': {
    id: 'file-sharing',
    title: 'File Sharing',
    description: 'Share files with team',
    icon: Share2,
    color: '#3B82F6',
    route: '/collaboration/file-sharing',
    relatedFeatures: [
      'team-collaboration',
      'project-management',
      'document-management',
    ],
  },
  'event-calendar': {
    id: 'event-calendar',
    title: 'Event Calendar',
    description: 'Team calendar',
    icon: Calendar,
    color: '#EC4899',
    route: '/collaboration/event-calendar',
    relatedFeatures: [
      'scheduling-calendar',
      'meeting',
      'project-management',
      'team-collaboration',
      'appointments',
    ],
  },

  // Settings & Administration
  'settings': {
    id: 'settings',
    title: 'Settings',
    description: 'App settings',
    icon: Settings,
    color: '#6366F1',
    route: '/settings',
    relatedFeatures: [
      'security-privacy',
      'profile',
      'notification',
      'enterprise-admin',
      'integrations',
    ],
  },
  'security-privacy': {
    id: 'security-privacy',
    title: 'Security & Privacy',
    description: 'Security settings',
    icon: Shield,
    color: '#8B5CF6',
    route: '/security-privacy',
    relatedFeatures: [
      'settings',
      'enterprise-security',
      'privacy-compliance',
      'gdpr',
    ],
  },
  'profile': {
    id: 'profile',
    title: 'Profile',
    description: 'User profile',
    icon: Users,
    color: '#10B981',
    route: '/profile',
    relatedFeatures: [
      'settings',
      'enterprise-organization',
    ],
  },
  'enterprise-admin': {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise administration',
    icon: Briefcase,
    color: '#3B82F6',
    route: '/enterprise-admin',
    relatedFeatures: [
      'enterprise-dashboard',
      'enterprise-security',
      'enterprise-organization',
      'enterprise-reporting',
      'settings',
    ],
  },
  'enterprise-dashboard': {
    id: 'enterprise-dashboard',
    title: 'Enterprise Dashboard',
    description: 'Enterprise overview',
    icon: BarChart3,
    color: '#EC4899',
    route: '/enterprise-dashboard',
    relatedFeatures: [
      'enterprise-admin',
      'enterprise-reporting',
      'analytics-performance',
      'team-management',
    ],
  },
};

// Helper function to get related features for a given feature ID
export function getRelatedFeatures(featureId: string): RelatedFeature[] {
  const feature = FEATURE_RELATIONSHIPS[featureId];
  if (!feature) return [];

  return feature.relatedFeatures
    .map(id => {
      const related = FEATURE_RELATIONSHIPS[id];
      if (!related) return null;
      return {
        id: related.id,
        title: related.title,
        description: related.description,
        icon: related.icon,
        color: related.color,
        route: related.route,
        category: getCategoryFromRoute(related.route),
      };
    })
    .filter((f): f is RelatedFeature => f !== null);
}

// Helper function to get category from route
function getCategoryFromRoute(route: string): string {
  const parts = route.split('/');
  if (parts.length > 1) {
    return parts[1].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  return 'General';
}

// Helper function to get features by category
export function getFeaturesByCategory(category: string): RelatedFeature[] {
  return Object.values(FEATURE_RELATIONSHIPS)
    .filter(f => getCategoryFromRoute(f.route).toLowerCase() === category.toLowerCase())
    .map(f => ({
      id: f.id,
      title: f.title,
      description: f.description,
      icon: f.icon,
      color: f.color,
      route: f.route,
      category: getCategoryFromRoute(f.route),
    }));
}

// Navigation groups for quick access
export const NAVIGATION_GROUPS = {
  ai: ['ai-agent', 'ai-receptionist', 'ai-voice-assistant', 'ai-workflow', 'ai-data-analytics', 'ai-negotiation', 'personal-assistant'],
  automation: ['automation-hub', 'workflow-builder', 'marketing-automation', 'lead-generation', 'sales-automation', 'task-management', 'scheduling-calendar', 'time-management'],
  communications: ['chats-messaging', 'unified-inbox', 'phone-call', 'voice-call', 'video-call', 'email', 'sms-text', 'meeting', 'conference', 'call-center', 'team-communication'],
  business: ['crm', 'customer-management', 'sales-management', 'sales-pipeline', 'business-analysis', 'revenue-tracking', 'customer-support'],
  marketing: ['marketing-hub', 'email-marketing', 'sms-marketing-hub', 'social-media-management', 'content-creation', 'campaign', 'seo-optimization', 'cold-calling', 'cold-email'],
  analytics: ['analytics-performance', 'reports-insights', 'data-visualization', 'advance-analytics'],
  collaboration: ['team-collaboration', 'team-management', 'project-management', 'file-sharing', 'event-calendar'],
  administration: ['settings', 'security-privacy', 'profile', 'enterprise-admin', 'enterprise-dashboard'],
};

// Cross-category relationships for intelligent navigation
export const CROSS_CATEGORY_LINKS: Record<string, string[]> = {
  'ai-agent': ['automation', 'analytics'],
  'automation-hub': ['ai', 'business', 'marketing'],
  'crm': ['communications', 'marketing', 'analytics'],
  'marketing-hub': ['communications', 'automation', 'analytics'],
  'analytics-performance': ['business', 'marketing', 'ai'],
  'team-collaboration': ['communications', 'project-management'],
};
