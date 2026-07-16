/**
 * Accessibility (a11y) Configuration & Helpers
 * Utilities for building accessible React Native components and running audits.
 *
 * Native: uses React Native's accessibilityProps
 * Web:    uses standard ARIA attributes (via react-native-web)
 */

import React from 'react';

// ============================================================================
// Accessibility Roles (subset of React Native's AccessibilityRole)
// ============================================================================

export type A11yRole =
  | 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey'
  | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary'
  | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem'
  | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton'
  | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';

// ============================================================================
// Semantic Helpers
// ============================================================================

/**
 * Generate standard accessibility props for a button
 */
export function buttonA11y(label: string, hint?: string, disabled = false) {
  return {
    accessibilityRole: 'button' as const,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: { disabled },
    accessible: true,
  };
}

/**
 * Generate accessibility props for a link
 */
export function linkA11y(label: string, hint?: string) {
  return {
    accessibilityRole: 'link' as const,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessible: true,
  };
}

/**
 * Generate accessibility props for a header/heading
 */
export function headerA11y(level: 1 | 2 | 3 | 4 | 5 | 6 = 1) {
  // On web, react-native-web maps 'header' role + accessibilityLevel to <h1>-<h6>
  return {
    accessibilityRole: 'header' as const,
    accessibilityLevel: level,
    accessible: true,
  };
}

/**
 * Generate accessibility props for an image
 */
export function imageA11y(label: string) {
  return {
    accessibilityRole: 'image' as const,
    accessibilityLabel: label,
    accessible: true,
  };
}

/**
 * Generate accessibility props for a form field with label
 */
export function fieldA11y(label: string, required = false, invalid = false) {
  return {
    accessibilityLabel: label,
    accessibilityHint: required ? 'Required field' : undefined,
    accessibilityState: { required, invalid },
    accessible: true,
  };
}

/**
 * Generate live region props for dynamic content (status messages)
 */
export function liveRegion(polite = true) {
  // 'polite' = wait until idle, 'assertive' = interrupt immediately
  return {
    accessibilityLiveRegion: polite ? ('polite' as const) : ('assertive' as const),
    accessible: true,
  };
}

// ============================================================================
// Focus Management
// ============================================================================

/**
 * Hook to announce a message to screen readers
 */
export function useAnnouncement() {
  return React.useCallback((message: string) => {
    // On native, AccessibilityInfo.announceForAccessibility(message)
    // On web, update an aria-live region
    if (typeof window !== 'undefined') {
      const announcer = document.getElementById('a11y-announcer');
      if (announcer) {
        announcer.textContent = message;
      }
    }
  }, []);
}

// ============================================================================
// Color Contrast Helpers (WCAG 2.1 AA)
// ============================================================================

/**
 * Calculate contrast ratio between two hex colors.
 * WCAG AA requires 4.5:1 for normal text, 3:1 for large text.
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
}

/**
 * Check if a foreground/background pair meets WCAG AA
 */
export function meetsWCAGAA(fg: string, bg: string, largeText = false): boolean {
  const ratio = contrastRatio(fg, bg);
  return ratio >= (largeText ? 3 : 4.5);
}

/**
 * Check if a pair meets WCAG AAA
 */
export function meetsWCAGAAA(fg: string, bg: string, largeText = false): boolean {
  const ratio = contrastRatio(fg, bg);
  return ratio >= (largeText ? 4.5 : 7);
}

// ============================================================================
// Reduced Motion
// ============================================================================

/**
 * Check if the user has requested reduced motion.
 * On native, use AccessibilityInfo.isReduceMotionEnabled().
 */
export function prefersReducedMotion(): boolean {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}
