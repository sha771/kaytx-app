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
    { id: 'agents', label: 'AI Agents', icon: '🤖' },
    { id: 'conversations', label: 'Live Conversations', icon: '💬' },
    { id: 'tickets', label: 'Tickets', icon: '🎫' },
    { id: 'knowledge', label: 'Knowledge Base', icon: '📚' },
    { id: 'escalations', label: 'Escalations', icon: '⚠️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'insights', label: 'Customer Insights', icon: '💡' },
    { id: 'voice', label: 'Voice Support', icon: '📞' },
    { id: 'email', label: 'Email Support', icon: '📧' },
    { id: 'automation', label: 'Automation Workflows', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderRightColor: 'rgba(16, 185, 129, 0.2)' }]}>
      {/* Logo Section */}
      <View style={[styles.logoSection, { borderBottomColor: 'rgba(16, 185, 129, 0.2)' }]}>
        <Text style={[styles.logoText, { color: '#10B981' }]}>
          AI Support Command
        </Text>
        <Text style={[styles.logoSubtext, { color: 'rgba(255, 255, 255, 0.6)' }]}>
          Center
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
                backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                borderLeftColor: activeSection === item.id ? '#10B981' : 'transparent',
              }
            ]}
            onPress={() => onSectionChange(item.id)}
          >
            <View style={styles.navContent}>
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text style={[
                styles.navLabel, 
                { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }
              ]}>
                {item.label}
              </Text>
            </View>
            {item.count && (
              <View style={[styles.countBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* System Status */}
      <View style={[styles.statusSection, { borderTopColor: 'rgba(16, 185, 129, 0.2)' }]}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.statusText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            System Online
          </Text>
        </View>
        <Text style={[styles.versionText, { color: 'rgba(255, 255, 255, 0.4)' }]}>
          v2.4.1
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRightWidth: 1,
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
    paddingVertical: 14,
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