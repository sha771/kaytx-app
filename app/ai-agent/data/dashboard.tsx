import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { dataDashboardConfig } from '@/constants/dashboardMetrics';
import { Database } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

export default function DataDashboard() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Navigation Card */}
      <TouchableOpacity 
        style={[styles.navCard, { backgroundColor: theme.colors.card, borderColor: '#00ACC1' }]}
        onPress={() => router.push('/ai-agent/data/data-intelligence-command-center')}
      >
        <View style={styles.navCardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#00ACC1' + '20' }]}>
            <Database size={24} color="#00ACC1" />
          </View>
          <View style={styles.navCardInfo}>
            <Text style={[styles.navCardTitle, { color: theme.colors.text }]}>AI Data & Intelligence Command Center</Text>
            <Text style={[styles.navCardSubtitle, { color: theme.colors.textSecondary }]}>Advanced Intelligence Dashboard</Text>
          </View>
        </View>
        <View style={[styles.navCardBadge, { backgroundColor: '#00ACC1' }]}>
          <Text style={styles.navCardBadgeText}>NEW</Text>
        </View>
      </TouchableOpacity>

      {/* Standard Dashboard */}
      <DepartmentDashboard 
        config={dataDashboardConfig}
        mode="DATA MODE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navCardInfo: {
    flex: 1,
  },
  navCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  navCardSubtitle: {
    fontSize: 12,
  },
  navCardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  navCardBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
