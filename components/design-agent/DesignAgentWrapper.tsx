/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DesignAgentButton } from './DesignAgentButton';
import { DesignAgentPanel } from './DesignAgentPanel';

interface DesignAgentWrapperProps {
  pagePath: string;
  pageName: string;
  children?: ReactNode;
  /** Position of the button: 'header-right' (default) or 'floating' */
  position?: 'header-right' | 'floating';
  /** Variant of the button */
  variant?: 'icon' | 'minimal';
  /** Size of the button */
  size?: 'small' | 'medium';
  /** If true, renders the button inline (for header areas) */
  inline?: boolean;
  /** Custom styles for the container */
  style?: any;
}

/**
 * DesignAgentWrapper - Adds the Design Agent button and panel to any page.
 * 
 * Usage:
 * ```tsx
 * <DesignAgentWrapper pagePath="/home" pageName="Home Dashboard">
 *   <YourPageContent />
 * </DesignAgentWrapper>
 * ```
 * 
 * For header areas:
 * ```tsx
 * <View style={header}>
 *   <Text>Page Title</Text>
 *   <DesignAgentWrapper pagePath="/home" pageName="Home" inline />
 * </View>
 * ```
 */
export function DesignAgentWrapper({
  pagePath,
  pageName,
  children,
  position = 'header-right',
  variant = 'icon',
  size = 'small',
  inline = false,
  style,
}: DesignAgentWrapperProps) {
  const insets = useSafeAreaInsets();

  // Inline mode - just render the button (for header integration)
  if (inline) {
    return (
      <DesignAgentButton
        pagePath={pagePath}
        pageName={pageName}
        size={size}
        variant={variant}
      />
    );
  }

  // Floating mode - button floats at top-right
  if (position === 'floating') {
    return (
      <View style={[styles.container, style]}>
        {children}
        <View
          style={[
            styles.floatingButtonContainer,
            {
              top: insets.top + 8,
              right: 12,
            },
          ]}
          pointerEvents="box-none"
        >
          <DesignAgentButton
            pagePath={pagePath}
            pageName={pageName}
            size={size}
            variant={variant}
          />
        </View>
        <DesignAgentPanel
          currentPagePath={pagePath}
          currentPageName={pageName}
        />
      </View>
    );
  }

  // Header-right mode - button positioned at top-right of the content area
  return (
    <View style={[styles.container, style]}>
      {children}
      <View style={styles.headerRightContainer} pointerEvents="box-none">
        <DesignAgentButton
          pagePath={pagePath}
          pageName={pageName}
          size={size}
          variant={variant}
        />
      </View>
      <DesignAgentPanel
        currentPagePath={pagePath}
        currentPageName={pageName}
      />
    </View>
  );
}

/**
 * DesignAgentHeaderButton - A standalone button for use in custom header layouts.
 * Use this when you want to place the button in a specific header position.
 */
export function DesignAgentHeaderButton({
  pagePath,
  pageName,
  size = 'small',
  variant = 'icon',
}: {
  pagePath: string;
  pageName: string;
  size?: 'small' | 'medium';
  variant?: 'icon' | 'minimal';
}) {
  return (
    <DesignAgentButton
      pagePath={pagePath}
      pageName={pageName}
      size={size}
      variant={variant}
    />
  );
}

/**
 * DesignAgentPage - A complete page wrapper that includes both the button and panel.
 * This is the simplest way to add design agent to any page.
 */
export function DesignAgentPage({
  pagePath,
  pageName,
  children,
  style,
}: {
  pagePath: string;
  pageName: string;
  children: ReactNode;
  style?: any;
}) {
  return (
    <View style={[styles.pageContainer, style]}>
      {children}
      <DesignAgentPanel
        currentPagePath={pagePath}
        currentPageName={pageName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pageContainer: {
    flex: 1,
    position: 'relative',
  },
  floatingButtonContainer: {
    position: 'absolute',
    zIndex: 100,
  },
  headerRightContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 12,
    right: 12,
    zIndex: 100,
  },
});