import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard, 
  Bot, 
  Briefcase, 
  FlaskConical, 
  Network, 
  FileText, 
  Search, 
  TrendingUp, 
  Zap, 
  Lightbulb, 
  Users, 
  Activity,
  Settings,
  ChevronRight
} from 'lucide-react-native';

interface LeftSidebarProps {
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Research Agents', icon: Bot },
  { id: 'portfolio', label: 'Research Portfolio', icon: Briefcase },
  { id: 'experiments', label: 'Experiments', icon: FlaskConical },
  { id: 'pipeline', label: 'Innovation Pipeline', icon: TrendingUp },
  { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
  { id: 'patents', label: 'Patent Intelligence', icon: FileText },
  { id: 'scouting', label: 'Technology Scouting', icon: Search },
  { id: 'competitive', label: 'Competitive Research', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'insights', label: 'AI Insights', icon: Lightbulb },
  { id: 'collaboration', label: 'Collaboration', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function LeftSidebar({ selectedSection, onSelectSection }: LeftSidebarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderRightColor: theme.colors.border }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          R&D Command Center
        </Text>
      </View>

      {/* Navigation Menu */}
      <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedSection === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                {
                  backgroundColor: isSelected ? '#0B8AFF' + '15' : 'transparent',
                  borderLeftColor: isSelected ? '#0B8AFF' : 'transparent',
                }
              ]}
              onPress={() => onSelectSection(item.id)}
            >
              <View style={styles.menuItemLeft}>
                <Icon 
                  size={18} 
                  color={isSelected ? '#0B8AFF' : theme.colors.textSecondary} 
                />
                <Text style={[
                  styles.menuItemText,
                  { 
                    color: isSelected ? '#0B8AFF' : theme.colors.textSecondary,
                    fontWeight: isSelected ? '600' : '400'
                  }
                ]}>
                  {item.label}
                </Text>
              </View>
              {isSelected && (
                <ChevronRight size={16} color="#0B8AFF" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          AI Research System v2.4
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRightWidth: 1,
    height: '100%',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  menuScroll: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 14,
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
  },
});