import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard, 
  Bot, 
  Users, 
  Briefcase, 
  TrendingUp, 
  BarChart3, 
  Building2, 
  Target, 
  Zap, 
  Award, 
  Settings 
} from 'lucide-react-native';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Sales Agents', icon: Bot, badge: 3 },
  { id: 'leads', label: 'Leads', icon: Users, badge: 1240 },
  { id: 'opportunities', label: 'Opportunities', icon: Briefcase, badge: 87 },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'forecasting', label: 'Forecasting', icon: BarChart3 },
  { id: 'analytics', label: 'Revenue Analytics', icon: TrendingUp },
  { id: 'accounts', label: 'Accounts', icon: Building2 },
  { id: 'intelligence', label: 'Customer Intelligence', icon: Target },
  { id: 'automation', label: 'Sales Automation', icon: Zap },
  { id: 'performance', label: 'Performance', icon: Award },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface LeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function LeftSidebar({ activeSection, onSectionChange }: LeftSidebarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Sales & Revenue
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          AI Command Center
        </Text>
      </View>

      <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              activeSection === item.id && styles.activeNavItem,
              { backgroundColor: activeSection === item.id ? '#10B981' + '20' : 'transparent' }
            ]}
            onPress={() => onSectionChange(item.id)}
          >
            <View style={styles.navItemContent}>
              <item.icon 
                size={18} 
                color={activeSection === item.id ? '#10B981' : theme.colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.navItemText, 
                  { color: activeSection === item.id ? '#10B981' : theme.colors.text }
                ]}
              >
                {item.label}
              </Text>
            </View>
            {item.badge && (
              <View style={[styles.badge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  navigation: {
    flex: 1,
    padding: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeNavItem: {
    borderRadius: 8,
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navItemText: {
    fontSize: 13,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  }
});