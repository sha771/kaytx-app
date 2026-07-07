import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface LeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function LeftSidebar({ activeSection, onSectionChange }: LeftSidebarProps) {
  const { theme } = useTheme();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'agents', label: 'AI Engineering Agents', icon: '🤖' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { id: 'deployments', label: 'Deployments', icon: '🚀' },
    { id: 'observability', label: 'Observability', icon: '📈' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'architecture', label: 'Architecture', icon: '🔧' },
    { id: 'incidents', label: 'Incidents', icon: '⚠️', count: 2 },
    { id: 'productivity', label: 'Productivity', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      {/* Logo Section */}
      <View style={[styles.logoSection, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.logoText, { color: theme.colors.text }]}>
          AI Technology
        </Text>
        <Text style={[styles.logoSubtext, { color: theme.colors.textSecondary }]}>
          & Engineering
        </Text>
      </View>

      {/* Navigation */}
      <ScrollView 
        style={styles.navScroll}
        showsVerticalScrollIndicator={false}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              {
                backgroundColor: activeSection === item.id ? `${theme.colors.primary}20` : 'transparent',
                borderLeftColor: activeSection === item.id ? theme.colors.primary : 'transparent',
              }
            ]}
            onPress={() => onSectionChange(item.id)}
          >
            <View style={styles.navContent}>
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text style={[
                styles.navLabel, 
                { color: activeSection === item.id ? theme.colors.primary : theme.colors.text }
              ]}>
                {item.label}
              </Text>
            </View>
            {item.count && (
              <View style={[styles.countBadge, { backgroundColor: '#EF4444' }]}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* System Status */}
      <View style={[styles.statusSection, { borderTopColor: theme.colors.border }]}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
          <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
            System Online
          </Text>
        </View>
        <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
          v2.4.1
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  logoSection: {
    padding: 20,
    borderBottomWidth: 1,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  logoSubtext: {
    fontSize: 12,
  },
  navScroll: {
    flex: 1,
    paddingVertical: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderLeftWidth: 3,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusSection: {
    padding: 20,
    borderTopWidth: 1,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
  },
  versionText: {
    fontSize: 10,
  },
});