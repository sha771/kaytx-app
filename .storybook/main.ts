/**
 * Storybook Configuration
 * Visual documentation and component testing for the 317+ shared components.
 *
 * NOTE: Storybook for React Native requires @storybook/react-native.
 * This config supports both:
 *   - React Native (mobile): @storybook/react-native
 *   - React Native Web: @storybook/react-webpack5 (for browser preview)
 *
 * Setup (one-time):
 *   npx storybook@latest init --type react
 *
 * Run:
 *   npm run storybook      # web viewer
 *   npm run storybook:ios  # iOS viewer
 */

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(ts|tsx)',
    '../app/components/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials', // Controls, Actions, Docs, Viewport, Backgrounds
    '@storybook/addon-a11y', // Accessibility audit panel
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Support React Native Web
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.js', '.web.ts', '.web.tsx', ...config.resolve.extensions || []];
    return config;
  },
};

export default config;
