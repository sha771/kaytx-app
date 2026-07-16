/**
 * Example Storybook story — Button component
 * Demonstrates the pattern for documenting other components
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary button component used across the app. Supports variants, sizes, and loading state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Button label' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean', description: 'Shows spinner and disables interaction' },
    onPress: { action: 'pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Click me',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary action',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline button',
    variant: 'outline',
  },
};

export const Danger: Story = {
  args: {
    title: 'Delete',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    title: 'Saving...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button title="Small" size="small" />
      <Button title="Medium" size="medium" />
      <Button title="Large" size="large" />
    </div>
  ),
};
