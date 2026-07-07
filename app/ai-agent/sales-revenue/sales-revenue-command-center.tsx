import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import SalesRevenueCommandCenter from '@/components/ai-agent/dashboard/sales-revenue/SalesRevenueCommandCenter';

export default function SalesRevenueCommandCenterPage() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SalesRevenueCommandCenter />
    </View>
  );
}