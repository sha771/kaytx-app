// Web stub for react-native-chart-kit
// Provides mock implementations for web builds
 

import React from 'react';
import { View, Text, Dimensions } from 'react-native';

// Mock chart components
export const LineChart = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Line Chart (Web Placeholder)</Text>
    </View>
  );
};

export const BarChart = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bar Chart (Web Placeholder)</Text>
    </View>
  );
};

export const PieChart = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pie Chart (Web Placeholder)</Text>
    </View>
  );
};

export const ProgressChart = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Progress Chart (Web Placeholder)</Text>
    </View>
  );
};

export const ContributionGraph = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contribution Graph (Web Placeholder)</Text>
    </View>
  );
};

export const StackedBarChart = (props: any) => {
  const { width, height, chartConfig } = props;
  return (
    <View style={{ width, height, backgroundColor: chartConfig?.backgroundColor || '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Stacked Bar Chart (Web Placeholder)</Text>
    </View>
  );
};

// Helper to get chart dimensions
export const chartDimensions = () => {
  const { width } = Dimensions.get('window');
  return {
    width: width - 32,
    height: 220,
  };
};

// Default chart config helper
export const defaultChartConfig = (props: any = {}) => ({
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  ...props,
});

export default {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
  chartDimensions,
  defaultChartConfig,
};
