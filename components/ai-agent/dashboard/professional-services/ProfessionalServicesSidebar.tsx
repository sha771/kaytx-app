import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard, 
  Bot, 
  FolderKanban, 
  Users, 
  UserCog, 
  Clock, 
  FileText, 
  BookOpen, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  TrendingUp,
  Building2,
  ShieldCheck,
  Database,
  Globe,
  Activity
} from 'lucide-react-native';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Service Agents', icon: Bot },
  { id: 'projects', label: 'Project Portfolio', icon: FolderKanban },
  { id: 'resources', label: 'Resource Management', icon: UserCog },
  { id: 'clients', label: 'Client Success', icon: Users },
  { id: 'revenue', label: 'Revenue Forecasting', icon: TrendingUp },
  { id: 'proposals', label: 'Proposals & SOW', icon: FileText },
  { id: 'pmo', label: 'PMO Command Center', icon: Building2 },
  { id: 'risk', label: 'Risk & Compliance', icon: ShieldCheck },
  { id: 'knowledge', label: 'Knowledge Intelligence', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'operations', label: 'Global Operations', icon: Globe },
  { id: 'system', label: 'System Health', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface ProfessionalServicesSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function ProfessionalServicesSidebar({ activeSection, onSectionChange }: ProfessionalServicesSidebarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderRightColor: 'rgba(16, 185, 129, 0.2)', borderRightWidth: 1 }]}>
      {/* Logo/Brand */}
      <View style={styles.brandSection}>
        <View style={[styles.brandIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Text style={styles.brandEmoji}>🎯</Text>
        </View>
        <View style={styles.brandText}>
          <Text style={[styles.brandName, { color: '#FFFFFF' }]}>Professional Services</Text>
          <Text style={[styles.brandSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Command Center</Text>
        </View>
      </View>

      {/* Navigation */}
      <ScrollView style={styles.navigationScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Executive</Text>
          {navigationItems.slice(0, 2).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Delivery Operations</Text>
          {navigationItems.slice(2, 6).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Sales & Revenue</Text>
          {navigationItems.slice(6, 8).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Governance & Risk</Text>
          {navigationItems.slice(8, 10).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Intelligence</Text>
          {navigationItems.slice(10, 12).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationSection}>
          <Text style={[styles.sectionLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>Global & System</Text>
          {navigationItems.slice(12).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                activeSection === item.id && { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderLeftColor: '#10B981', borderLeftWidth: 3 }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <View style={[styles.navIcon, { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]}>
                <item.icon size={18} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              </View>
              <Text style={[styles.navLabel, { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.8)' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* User Profile */}
      <View style={[styles.userSection, { borderTopColor: 'rgba(255, 255, 255, 0.1)', borderTopWidth: 1 }]}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitials}>CDO</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: '#FFFFFF' }]}>Chief Delivery Officer</Text>
          <Text style={[styles.userRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>Executive Access</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: '100%',
    paddingTop: 60,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandText: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  brandSubtitle: {
    fontSize: 12,
  },
  navigationScroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  navigationSection: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
  },
});