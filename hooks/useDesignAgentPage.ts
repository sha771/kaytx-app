/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { useEffect } from 'react';
import { useDesignAgent } from '@/providers/DesignAgentProvider';

/**
 * Hook to register the current page in the Design Agent system.
 * This allows the DesignAgentPanel to know which page is active.
 * 
 * @param pagePath - The route path of the current page (e.g., "/home", "/dashboard")
 * @param pageName - A human-readable name of the current page (e.g., "Home Dashboard")
 */
export function useDesignAgentPage(pagePath: string, pageName: string) {
  const { getPageCustomization, openPanel } = useDesignAgent();

  const customization = getPageCustomization(pagePath);

  useEffect(() => {
    // Store current page info for the global panel
    // This could be expanded to track page navigation
  }, [pagePath, pageName]);

  return {
    customization,
    hasCustomization: !!customization,
    openDesignAgent: openPanel,
  };
}