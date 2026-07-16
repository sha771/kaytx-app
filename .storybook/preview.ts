/**
 * Storybook Preview Configuration
 * Global decorators, theme providers, and viewport setup
 */

import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    viewport: {
      viewports: {
        iPhoneSE: { name: 'iPhone SE', styles: { width: '375px', height: '667px' } },
        iPhone14: { name: 'iPhone 14', styles: { width: '390px', height: '844px' } },
        iPad: { name: 'iPad', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
      defaultViewport: 'iPhone14',
    },
    layout: 'centered',
    docs: {
      theme: undefined, // Will be set by theme provider
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'system-ui' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
