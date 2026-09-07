/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

// ============================================================
// Design Agent Types & Interfaces
// ============================================================

export interface DesignCustomization {
  id: string;
  pageId: string;
  userId: string;
  name: string;
  description: string;
  prompt: string;
  changes: DesignChanges;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface DesignChanges {
  colors?: Partial<ColorOverrides>;
  layout?: LayoutChanges;
  widgets?: WidgetChanges;
  typography?: TypographyChanges;
  spacing?: SpacingChanges;
  visibility?: VisibilityChanges;
  customCSS?: string;
}

export interface ColorOverrides {
  primary?: string;
  background?: string;
  text?: string;
  secondaryText?: string;
  border?: string;
  cardBackground?: string;
  sidebarBackground?: string;
  accent?: string;
  success?: string;
  error?: string;
  warning?: string;
}

export interface LayoutChanges {
  gridColumns?: number;
  maxWidth?: number | string;
  padding?: number | string;
  cardArrangement?: 'grid' | 'list' | 'masonry' | 'compact';
  sidebarPosition?: 'left' | 'right' | 'hidden';
  headerStyle?: 'sticky' | 'static' | 'hidden';
  borderRadius?: number | string;
}

export interface WidgetChanges {
  visible?: string[];
  hidden?: string[];
  reorder?: { id: string; position: number }[];
  resize?: { id: string; width: number; height: number }[];
}

export interface TypographyChanges {
  fontFamily?: string;
  headingSize?: string;
  bodySize?: string;
  headingWeight?: string;
  bodyWeight?: string;
  lineHeight?: number;
}

export interface SpacingChanges {
  gap?: number | string;
  sectionPadding?: number | string;
  cardPadding?: number | string;
  margin?: number | string;
}

export interface VisibilityChanges {
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  showStats?: boolean;
  showCharts?: boolean;
  showQuickActions?: boolean;
}

export interface DesignAgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  preview?: DesignChanges;
}

export interface DesignAgentState {
  isOpen: boolean;
  currentPageId: string | null;
  messages: DesignAgentMessage[];
  activeCustomization: DesignCustomization | null;
  customizations: DesignCustomization[];
  isProcessing: boolean;
  previewChanges: DesignChanges | null;
}

export interface DesignAgentContextType {
  state: DesignAgentState;
  openDesignAgent: (pageId: string) => void;
  closeDesignAgent: () => void;
  sendPrompt: (prompt: string) => Promise<void>;
  applyCustomization: (customization: DesignCustomization) => Promise<void>;
  resetCustomization: (pageId: string) => Promise<void>;
  getCustomization: (pageId: string) => DesignCustomization | undefined;
  clearPreview: () => void;
}

export const DEFAULT_DESIGN_AGENT_STATE: DesignAgentState = {
  isOpen: false,
  currentPageId: null,
  messages: [],
  activeCustomization: null,
  customizations: [],
  isProcessing: false,
  previewChanges: null,
};

export const PAGE_ID_MAP: Record<string, string> = {
  'home': 'home',
  'messages': 'messages',
  'platforms': 'platforms',
  'automations': 'automations',
  'scheduling': 'scheduling',
  'chatter': 'chatter',
  'ai-assistant': 'ai-assistant',
  'mindmap': 'mindmap',
  'education': 'education',
  'fashion-luxury-command-center': 'fashion-luxury-command-center',
  'enterprise-dashboard': 'enterprise-dashboard',
  'settings': 'settings',
  'profile': 'profile',
  'notification': 'notification',
  'support': 'support',
  'archive': 'archive',
  'security-privacy': 'security-privacy',
  'privacy-dashboard': 'privacy-dashboard',
  'command-center-main': 'command-center-main',
  'enterprise-admin': 'enterprise-admin',
  'agent-hierarchy-mindmap': 'agent-hierarchy-mindmap',
  'ai-agents-employees-builder': 'ai-agents-employees-builder',
  'ai-agents-employees-builder-upgraded': 'ai-agents-employees-builder-upgraded',
  'add-service': 'add-service',
};