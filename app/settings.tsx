import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  X,
  Moon,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  Palette,
  Shield,
  Smartphone,
  Download,
  Trash2,
  LucideIcon,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

type SettingItem = {
  icon: LucideIcon;
  label: string;
} & (
  | { isToggle: true; value: boolean; onToggle: (value: boolean) => void; isDestructive?: never; onPress?: never }
  | { isToggle?: never; isDestructive: true; onPress: () => void; value?: never; onToggle?: never }
  | { isToggle?: never; isDestructive?: never; onPress: () => void; value?: string; onToggle?: never }
);

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const settingsSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          value: 'John Doe',
          onPress: () => router.push('/profile'),
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          onPress: () => {},
        },
        {
          icon: Smartphone,
          label: 'Connected Services',
          value: '8 services',
          onPress: () => router.push('/add-service'),
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: Moon,
          label: 'Dark Mode',
          isToggle: true,
          value: isDark,
          onToggle: toggleTheme,
        },
        {
          icon: Palette,
          label: 'Theme Color',
          value: 'Blue',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          isToggle: true,
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: Bell,
          label: 'Sound',
          isToggle: true,
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          icon: Download,
          label: 'Auto-download Media',
          isToggle: true,
          value: autoDownload,
          onToggle: setAutoDownload,
        },
        {
          icon: Trash2,
          label: 'Clear Cache',
          value: '124 MB',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help Center',
          onPress: () => {},
        },
        {
          icon: Globe,
          label: 'Language',
          value: 'English',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        {
          icon: LogOut,
          label: 'Sign Out',
          isDestructive: true,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => router.back()}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.secondaryText }]}>
                {section.title}
              </Text>
              
              <View style={[styles.sectionContent, { backgroundColor: theme.colors.cardBackground }]}>
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === section.items.length - 1;
                  
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      style={[
                        styles.settingItem,
                        !isLast && styles.settingItemBorder,
                        { borderBottomColor: theme.colors.border },
                      ]}
                      onPress={item.onPress}
                      disabled={item.isToggle}
                    >
                      <View style={styles.settingItemLeft}>
                        <Icon
                          size={20}
                          color={item.isDestructive ? '#FF3B30' : theme.colors.text}
                        />
                        <Text
                          style={[
                            styles.settingLabel,
                            { color: item.isDestructive ? '#FF3B30' : theme.colors.text },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </View>
                      
                      <View style={styles.settingItemRight}>
                        {item.isToggle ? (
                          <Switch
                            value={item.value}
                            onValueChange={item.onToggle}
                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                          />
                        ) : (
                          <>
                            {item.value && (
                              <Text style={[styles.settingValue, { color: theme.colors.secondaryText }]}>
                                {item.value}
                              </Text>
                            )}
                            {!item.isDestructive && (
                              <ChevronRight size={18} color={theme.colors.secondaryText} />
                            )}
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
          
          <View style={styles.footer}>
            <Text style={[styles.version, { color: theme.colors.secondaryText }]}>
              Version 1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 15,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
  },
  version: {
    fontSize: 13,
  },
});