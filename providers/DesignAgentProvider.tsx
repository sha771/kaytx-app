/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DesignCustomization {
  id: string;
  pagePath: string;
  pageName: string;
  prompt: string;
  changes: DesignChanges;
  createdAt: string;
  appliedAt?: string;
}

export interface DesignChanges {
  layout?: {
    type?: 'default' | 'compact' | 'spacious' | 'grid' | 'list';
    padding?: number;
    gap?: number;
  };
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    cardBackground?: string;
    text?: string;
    accent?: string;
    headerBg?: string;
    sidebarBg?: string;
  };
  widgets?: {
    hidden?: string[];
    reordered?: string[];
    added?: string[];
    sizing?: Record<string, 'small' | 'medium' | 'large' | 'full'>;
  };
  typography?: {
    fontSize?: number;
    fontFamily?: string;
    headingSize?: number;
    lineHeight?: number;
  };
  visibility?: {
    showStats?: boolean;
    showCharts?: boolean;
    showSidebar?: boolean;
    showHeader?: boolean;
    showQuickActions?: boolean;
  };
  customCSS?: Record<string, string>;
}

interface DesignAgentContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  currentCustomizations: DesignCustomization | null;
  customizationHistory: DesignCustomization[];
  applyCustomization: (customization: DesignCustomization) => Promise<void>;
  resetCustomization: (pagePath: string) => Promise<void>;
  getPageCustomization: (pagePath: string) => DesignCustomization | null;
  isLoading: boolean;
  processingPrompt: boolean;
  processDesignPrompt: (prompt: string, pagePath: string, pageName: string) => Promise<DesignChanges>;
  undoLastCustomization: (pagePath: string) => Promise<void>;
}

const DesignAgentContext = createContext<DesignAgentContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = '@kaytx_design_customizations_';
const HISTORY_KEY = '@kaytx_design_history';

// AI prompt processing - generates design changes based on natural language
function parseDesignPrompt(prompt: string, _pagePath: string): DesignChanges {
  const changes: DesignChanges = {};
  const lower = prompt.toLowerCase();

  // Layout detection
  if (lower.includes('compact') || lower.includes('tight') || lower.includes('dense')) {
    changes.layout = { ...changes.layout, type: 'compact', padding: 8, gap: 4 };
  } else if (lower.includes('spacious') || lower.includes('airy') || lower.includes('wide')) {
    changes.layout = { ...changes.layout, type: 'spacious', padding: 24, gap: 16 };
  } else if (lower.includes('grid')) {
    changes.layout = { ...changes.layout, type: 'grid' };
  } else if (lower.includes('list')) {
    changes.layout = { ...changes.layout, type: 'list' };
  }

  // Color scheme detection
  const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
    blue: { primary: '#007AFF', secondary: '#5AC8FA', accent: '#0A84FF' },
    dark: { primary: '#0A84FF', secondary: '#636366', accent: '#5E5CE6' },
    green: { primary: '#34C759', secondary: '#30D158', accent: '#32D74B' },
    red: { primary: '#FF3B30', secondary: '#FF453A', accent: '#FF375F' },
    purple: { primary: '#AF52DE', secondary: '#BF5AF2', accent: '#5E5CE6' },
    orange: { primary: '#FF9500', secondary: '#FF9F0A', accent: '#FF6482' },
    yellow: { primary: '#FFCC02', secondary: '#FFD60A', accent: '#FF9F0A' },
    teal: { primary: '#5AC8FA', secondary: '#64D2FF', accent: '#0A84FF' },
    pink: { primary: '#FF2D92', secondary: '#FF375F', accent: '#FF6482' },
    indigo: { primary: '#5856D6', secondary: '#5E5CE6', accent: '#3634A3' },
  };

  // Single color mentions
  const singleColors = ['blue', 'dark', 'green', 'red', 'purple', 'orange', 'yellow', 'teal', 'pink', 'indigo'];
  for (const color of singleColors) {
    if (lower.includes(color)) {
      const palette = colorMap[color];
      changes.colors = {
        ...changes.colors,
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent,
      };

      if (lower.includes('light') || lower.includes('white')) {
        changes.colors.background = '#FFFFFF';
        changes.colors.text = '#000000';
        changes.colors.cardBackground = '#F2F2F7';
      } else if (lower.includes('dark') || color === 'dark') {
        changes.colors.background = '#000000';
        changes.colors.text = '#FFFFFF';
        changes.colors.cardBackground = '#1C1C1E';
      }
      break;
    }
  }

  if (lower.includes('minimal') || lower.includes('simple') || lower.includes('clean')) {
    changes.visibility = {
      ...changes.visibility,
      showStats: lower.includes('stats') ? true : false,
      showCharts: lower.includes('chart') ? true : false,
      showSidebar: lower.includes('sidebar') ? true : false,
    };
    changes.layout = { ...changes.layout, padding: 16, gap: 8 };
  }

  if (lower.includes('professional') || lower.includes('corporate')) {
    changes.colors = {
      ...changes.colors,
      primary: '#007AFF',
      secondary: '#5856D6',
      text: '#1C1C1E',
      background: '#FFFFFF',
      cardBackground: '#F8F8FA',
    };
    changes.typography = {
      ...changes.typography,
      fontSize: 14,
      headingSize: 20,
      lineHeight: 1.5,
    };
  }

  if (lower.includes('modern')) {
    changes.colors = {
      ...changes.colors,
      primary: '#0A84FF',
      accent: '#5E5CE6',
    };
    changes.layout = { ...changes.layout, gap: 12, padding: 20 };
  }

  // Widget visibility
  if (lower.includes('hide') || lower.includes('remove')) {
    changes.widgets = { hidden: [] };
    const hideTargets = ['stats', 'chart', 'graph', 'sidebar', 'header', 'menu', 'card', 'widget', 'table', 'list'];
    for (const target of hideTargets) {
      if (lower.includes(`hide ${target}`) || lower.includes(`remove ${target}`) || (lower.includes('hide') && lower.includes(target))) {
        changes.widgets.hidden!.push(target);
      }
    }
  }

  // Typography
  if (lower.includes('larger text') || lower.includes('bigger font')) {
    changes.typography = { ...changes.typography, fontSize: 16, headingSize: 24 };
  } else if (lower.includes('smaller text') || lower.includes('smaller font')) {
    changes.typography = { ...changes.typography, fontSize: 12, headingSize: 18 };
  }

  // Add chart or widget
  if (lower.includes('add chart') || lower.includes('add graph') || lower.includes('add visualization')) {
    changes.widgets = {
      ...changes.widgets,
      added: [...(changes.widgets?.added || []), 'data-chart'],
    };
  }

  if (lower.includes('add revenue') || lower.includes('revenue chart') || lower.includes('revenue graph')) {
    changes.widgets = {
      ...changes.widgets,
      added: [...(changes.widgets?.added || []), 'revenue-chart'],
    };
  }

  return changes;
}

export function DesignAgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPrompt, setProcessingPrompt] = useState(false);
  const [currentCustomizations, setCurrentCustomizations] = useState<DesignCustomization | null>(null);
  const [customizationHistory, setCustomizationHistory] = useState<DesignCustomization[]>([]);
  const [pageCustomizations, setPageCustomizations] = useState<Map<string, DesignCustomization>>(new Map());

  // Load saved customizations on mount
  useEffect(() => {
    loadCustomizations();
  }, []);

  const loadCustomizations = async () => {
    try {
      const historyData = await AsyncStorage.getItem(HISTORY_KEY);
      if (historyData) {
        const history: DesignCustomization[] = JSON.parse(historyData);
        setCustomizationHistory(history);

        const pageMap = new Map<string, DesignCustomization>();
        for (const item of history) {
          if (item.appliedAt) {
            pageMap.set(item.pagePath, item);
          }
        }
        setPageCustomizations(pageMap);
      }
    } catch (error) {
      console.error('Error loading design customizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = async (customizations: DesignCustomization[]) => {
    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(customizations));
    } catch (error) {
      console.error('Error saving design customizations:', error);
    }
  };

  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const togglePanel = useCallback(() => setIsOpen((prev) => !prev), []);

  const applyCustomization = useCallback(async (customization: DesignCustomization) => {
    const updated = { ...customization, appliedAt: new Date().toISOString() };
    setCurrentCustomizations(updated);

    const newHistory = customizationHistory.filter(h => h.id !== customization.id);
    newHistory.push(updated);
    setCustomizationHistory(newHistory);

    const newPageMap = new Map(pageCustomizations);
    newPageMap.set(customization.pagePath, updated);
    setPageCustomizations(newPageMap);

    await saveToStorage(newHistory);
  }, [customizationHistory, pageCustomizations]);

  const resetCustomization = useCallback(async (pagePath: string) => {
    const newPageMap = new Map(pageCustomizations);
    newPageMap.delete(pagePath);
    setPageCustomizations(newPageMap);

    const newHistory = customizationHistory.filter(h => h.pagePath !== pagePath);
    setCustomizationHistory(newHistory);

    if (currentCustomizations?.pagePath === pagePath) {
      setCurrentCustomizations(null);
    }

    await saveToStorage(newHistory);
  }, [currentCustomizations, customizationHistory, pageCustomizations]);

  const getPageCustomization = useCallback((pagePath: string): DesignCustomization | null => {
    return pageCustomizations.get(pagePath) || null;
  }, [pageCustomizations]);

  const processDesignPrompt = useCallback(async (
    prompt: string,
    pagePath: string,
    pageName: string
  ): Promise<DesignChanges> => {
    setProcessingPrompt(true);
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const changes = parseDesignPrompt(prompt, pagePath);

      const newCustomization: DesignCustomization = {
        id: `design-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        pagePath,
        pageName,
        prompt,
        changes,
        createdAt: new Date().toISOString(),
      };

      setCurrentCustomizations(newCustomization);

      const newHistory = [...customizationHistory, newCustomization];
      setCustomizationHistory(newHistory);
      await saveToStorage(newHistory);

      return changes;
    } finally {
      setProcessingPrompt(false);
    }
  }, [customizationHistory]);

  const undoLastCustomization = useCallback(async (pagePath: string) => {
    const pageHistory = customizationHistory
      .filter(h => h.pagePath === pagePath && h.appliedAt)
      .sort((a, b) => new Date(b.appliedAt!).getTime() - new Date(a.appliedAt!).getTime());

    if (pageHistory.length <= 1) {
      await resetCustomization(pagePath);
      return;
    }

    // Remove the latest applied customization
    const latest = pageHistory[0];
    const newHistory = customizationHistory.filter(h => h.id !== latest.id);
    setCustomizationHistory(newHistory);

    // Restore the previous one
    const previous = pageHistory[1];
    if (previous) {
      setCurrentCustomizations(previous);
      const newPageMap = new Map(pageCustomizations);
      newPageMap.set(pagePath, previous);
      setPageCustomizations(newPageMap);
    }

    await saveToStorage(newHistory);
  }, [customizationHistory, pageCustomizations, resetCustomization]);

  return (
    <DesignAgentContext.Provider
      value={{
        isOpen,
        openPanel,
        closePanel,
        togglePanel,
        currentCustomizations,
        customizationHistory,
        applyCustomization,
        resetCustomization,
        getPageCustomization,
        isLoading,
        processingPrompt,
        processDesignPrompt,
        undoLastCustomization,
      }}
    >
      {children}
    </DesignAgentContext.Provider>
  );
}

export function useDesignAgent(): DesignAgentContextType {
  const context = useContext(DesignAgentContext);
  if (!context) {
    throw new Error('useDesignAgent must be used within a DesignAgentProvider');
  }
  return context;
}