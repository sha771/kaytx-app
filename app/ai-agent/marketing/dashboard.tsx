import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { marketingDashboardConfig } from '@/constants/dashboardMetrics';
import { Sparkles } from 'lucide-react-native';

export default function MarketingDashboard() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Navigation Card */}
      <TouchableOpacity 
        style={[styles.navCard, { backgroundColor: theme.colors.card, borderColor: '#EC4899' }]}
        onPress={() => router.push('/ai-agent/marketing/marketing-command-center')}
      >
        <View style={styles.navCardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#EC4899' + '20' }]}>
            <Sparkles size={24} color="#EC4899" />
          </View>
          <View style={styles.navCardInfo}>
            <Text style={[styles.navCardTitle, { color: theme.colors.text }]}>AI Marketing Command Center</Text>
            <Text style={[styles.navCardSubtitle, { color: theme.colors.textSecondary }]}>Advanced Marketing Dashboard</Text>
          </View>
        </View>
        <View style={[styles.navCardBadge, { backgroundColor: '#EC4899' }]}>
          <Text style={styles.navCardBadgeText}>NEW</Text>
        </View>
      </TouchableOpacity>

      {/* Standard Dashboard */}
      <DepartmentDashboard 
        config={marketingDashboardConfig}
        mode="MARKETING MODE"
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
