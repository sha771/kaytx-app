import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
  badge?: string;
}

interface LeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function LeftSidebar({ activeSection, onSectionChange }: LeftSidebarProps) {
  const { theme } = useTheme();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'agents', label: 'AI Product Agents', icon: '🤖', count: 3 },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️', count: 5 },
    { id: 'analytics', label: 'Product Analytics', icon: '📈' },
    { id: 'feedback', label: 'User Feedback', icon: '💬', count: 842 },
    { id: 'features', label: 'Feature Requests', icon: '💡', count: 312 },
    { id: 'experiments', label: 'Experimentation', icon: '🧪', count: 128 },
    { id: 'discovery', label: 'Product Discovery', icon: '✨' },
    { id: 'releases', label: 'Releases', icon: '🚀', count: 4 },
    { id: 'segments', label: 'User Segments', icon: '👥' },
    { id: 'insights', label: 'Insights', icon: '🧠', count: 47 },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const groupedNavItems = {
    main: navItems.slice(0, 7),
    secondary: navItems.slice(7),
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.98)' }]}>
      {/* Logo Section */}
      <View style={[styles.logoSection, { borderBottomColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <Text style={styles.logoIconText}>🧠</Text>
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={[styles.logoText, { color: theme.colors.text }]}>
              Product
            </Text>
            <Text style={[styles.logoSubtext, { color: '#06B6D4' }]}>
              Intelligence
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <ScrollView 
        style={styles.navScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Navigation */}
        <View style={styles.navSection}>
          <Text style={[styles.navSectionTitle, { color: theme.colors.textSecondary }]}>
            Main
          </Text>
          {groupedNavItems.main.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                {
                  backgroundColor: activeSection === item.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  borderLeftColor: activeSection === item.id ? '#06B6D4' : 'transparent',
                }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={styles.navContent}>
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={[
                  styles.navLabel, 
                  { color: activeSection === item.id ? '#06B6D4' : theme.colors.text }
                ]}>
                  {item.label}
                </Text>
              </View>
              {item.count && (
                <View style={[styles.countBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Text style={[styles.countText, { color: '#06B6D4' }]}>{item.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Secondary Navigation */}
        <View style={styles.navSection}>
          <Text style={[styles.navSectionTitle, { color: theme.colors.textSecondary }]}>
            Advanced
          </Text>
          {groupedNavItems.secondary.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                {
                  backgroundColor: activeSection === item.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  borderLeftColor: activeSection === item.id ? '#06B6D4' : 'transparent',
                }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={styles.navContent}>
                <Text style={styles.navIcon}>{item.icon}</Text>
                <Text style={[
                  styles.navLabel, 
                  { color: activeSection === item.id ? '#06B6D4' : theme.colors.text }
                ]}>
                  {item.label}
                </Text>
              </View>
              {item.count && (
                <View style={[styles.countBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Text style={[styles.countText, { color: '#06B6D4' }]}>{item.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* System Status */}
      <View style={[styles.statusSection, { borderTopColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
          <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
            All Systems Operational
          </Text>
        </View>
        <View style={styles.statusDetails}>
          <View style={styles.statusDetail}>
            <Text style={[styles.statusDetailLabel, { color: theme.colors.textSecondary }]}>
              Agents
            </Text>
            <Text style={[styles.statusDetailValue, { color: theme.colors.text }]}>
              3/3 Online
            </Text>
          </View>
          <View style={styles.statusDetail}>
            <Text style={[styles.statusDetailLabel, { color: theme.colors.textSecondary }]}>
              Latency
            </Text>
            <Text style={[styles.statusDetailValue, { color: '#22C55E' }]}>
              24ms
            </Text>
          </View>
        </View>
        <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
          v2.4.1 • Enterprise
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.08)',
  },
  logoSection: {
    padding: 20,
    borderBottomWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoIconText: {
    fontSize: 22,
  },
  logoTextContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  navScroll: {
    flex: 1,
    paddingVertical: 16,
  },
  navSection: {
    marginBottom: 8,
  },
  navSectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderLeftWidth: 3,
    marginHorizontal: 0,
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
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusSection: {
    padding: 20,
    borderTopWidth: 1,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statusDetail: {
    flex: 1,
  },
  statusDetailLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  statusDetailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 10,
    opacity: 0.6,
  },
});
