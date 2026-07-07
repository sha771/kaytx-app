import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Clock } from 'lucide-react-native';
import { DashboardHeaderProps } from './types';

export default function DashboardHeader({ 
  departmentName, 
  timestamp, 
  mode, 
  wallet 
}: DashboardHeaderProps) {
  const { theme } = useTheme();
  const currentTime = timestamp || new Date().toLocaleTimeString();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
      <View style={styles.topRow}>
        <Text style={[styles.departmentName, { color: theme.colors.text }]}>
          {departmentName}
        </Text>
        <View style={styles.timestampRow}>
          <Clock size={14} color={theme.colors.textSecondary} />
          <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
            {currentTime}
          </Text>
        </View>
      </View>
      
      {(mode || wallet) && (
        <View style={styles.bottomRow}>
          {mode && (
            <View style={[styles.modeBadge, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.modeText, { color: theme.colors.primary }]}>
                {mode}
              </Text>
            </View>
          )}
          {wallet && (
            <Text style={[styles.walletText, { color: theme.colors.textSecondary }]}>
              {wallet}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  departmentName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  modeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  walletText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
