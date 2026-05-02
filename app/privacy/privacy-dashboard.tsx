 
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, Shield, Lock, Download, Eye, FileText, 
  TriangleAlert, CircleCheck, Clock, Database, UserX, Settings 
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

export default function PrivacyDashboardScreen() {
  const { theme } = useTheme();
  const exportFormat = 'json' as const;

  const privacySettings = trpc.privacy.getSettings.useQuery();
  const updateSettings = trpc.privacy.updateSettings.useMutation();
  const exportData = trpc.privacy.exportData.useMutation();
  const deleteData = trpc.privacy.deleteData.useMutation();
  const breachCheck = trpc.privacy.breachCheck.useQuery({});

  const handleUpdateSetting = async (key: string, value: boolean) => {
    try {
      await updateSettings.mutateAsync({ [key]: value });
      Alert.alert('Success', 'Privacy settings updated');
      privacySettings.refetch();
    } catch {
      Alert.alert('Error', 'Failed to update settings');
    }
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Your Data',
      'This will create a complete export of your data. You will be notified when ready.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Export',
          onPress: async () => {
            try {
              const result = await exportData.mutateAsync({
                format: exportFormat,
                includeMessages: true,
                includeContacts: true,
                includeCallLogs: true,
                includeAnalytics: true,
              });
              Alert.alert('Success', result.message);
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to create export request');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. You have 30 days to cancel.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.prompt(
              'Confirm Password',
              'Enter your password to confirm account deletion',
              async (password) => {
                try {
                  const result = await deleteData.mutateAsync({
                    deleteType: 'full',
                    dataTypes: ['all'],
                    confirmPassword: password,
                  });
                  Alert.alert('Account Deletion Scheduled', result.message);
                } catch (error: any) {
                  Alert.alert('Error', error.message || 'Failed to schedule deletion');
                }
              },
              'secure-text'
            );
          },
        },
      ]
    );
  };

  const privacyCards = [
    {
      id: 'data-protection',
      title: 'Data Protection',
      description: 'Your data is encrypted and secure',
      icon: Shield,
      color: theme.colors.success,
      action: () => router.push('/security-privacy'),
    },
    {
      id: 'privacy-settings',
      title: 'Privacy Settings',
      description: 'Manage your privacy preferences',
      icon: Settings,
      color: theme.colors.primary,
      action: () => router.push('/security-privacy'),
    },
    {
      id: 'data-export',
      title: 'Export Data',
      description: 'Download all your data',
      icon: Download,
      color: theme.colors.primary,
      action: handleExportData,
    },
    {
      id: 'breach-check',
      title: 'Breach Monitor',
      description: `${breachCheck.data?.breachesFound || 0} breaches found`,
      icon: TriangleAlert,
      color: breachCheck.data?.breachesFound ? theme.colors.error : theme.colors.success,
      action: () => router.push('/privacy/breach-monitor'),
    },
    {
      id: 'access-logs',
      title: 'Access Logs',
      description: 'View who accessed your data',
      icon: Eye,
      color: theme.colors.warning,
      action: () => router.push('/privacy/access-logs'),
    },
    {
      id: 'consents',
      title: 'Consents',
      description: 'Manage your consent preferences',
      icon: FileText,
      color: theme.colors.primary,
      action: () => {}, // Placeholder
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      description: `${privacySettings.data?.settings.dataRetentionDays || 365} days`,
      icon: Clock,
      color: theme.colors.primary,
      action: () => {}, // Placeholder
    },
    {
      id: 'delete-account',
      title: 'Delete Account',
      description: 'Permanently delete your account',
      icon: UserX,
      color: theme.colors.error,
      action: handleDeleteAccount,
    },
  ];

  const quickSettings = [
    {
      key: 'allowAnalytics',
      title: 'Analytics',
      description: 'Help improve the app',
      value: privacySettings.data?.settings.allowAnalytics ?? true,
    },
    {
      key: 'allowMarketing',
      title: 'Marketing Communications',
      description: 'Receive product updates',
      value: privacySettings.data?.settings.allowMarketing ?? false,
    },
    {
      key: 'allowPersonalization',
      title: 'Personalization',
      description: 'Personalized experience',
      value: privacySettings.data?.settings.allowPersonalization ?? true,
    },
    {
      key: 'showOnlineStatus',
      title: 'Online Status',
      description: 'Show when you\'re online',
      value: privacySettings.data?.settings.showOnlineStatus ?? true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Privacy & Data</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.banner, { backgroundColor: theme.colors.primary + '15' }]}>
          <Lock size={32} color={theme.colors.primary} />
          <View style={styles.bannerContent}>
            <Text style={[styles.bannerTitle, { color: theme.colors.text }]}>
              Your Privacy Matters
            </Text>
            <Text style={[styles.bannerText, { color: theme.colors.secondaryText }]}>
              You have full control over your data. Manage, export, or delete it anytime.
            </Text>
          </View>
        </View>

        {breachCheck.data && breachCheck.data.breachesFound > 0 && (
          <View style={[styles.alertBanner, { backgroundColor: theme.colors.error + '15' }]}>
            <TriangleAlert size={24} color={theme.colors.error} />
            <View style={styles.alertContent}>
              <Text style={[styles.alertTitle, { color: theme.colors.error }]}>
                Data Breach Detected
              </Text>
              <Text style={[styles.alertText, { color: theme.colors.text }]}>
                Your information was found in {breachCheck.data.breachesFound} data breaches
              </Text>
              <TouchableOpacity
                style={[styles.alertButton, { backgroundColor: theme.colors.error }]}
                onPress={() => router.push('/privacy/breach-monitor')}
              >
                <Text style={styles.alertButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Settings</Text>
          <View style={styles.settingsList}>
            {quickSettings.map((setting) => (
              <View key={setting.key} style={[styles.settingItem, { borderColor: theme.colors.border }]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                    {setting.title}
                  </Text>
                  <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                    {setting.description}
                  </Text>
                </View>
                <Switch
                  value={setting.value}
                  onValueChange={(value) => handleUpdateSetting(setting.key, value)}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor="#FFFFFF"
                  disabled={updateSettings.isPending}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardsGrid}>
          {privacyCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <TouchableOpacity
                key={card.id}
                style={[styles.privacyCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={card.action}
              >
                <View style={[styles.iconCircle, { backgroundColor: card.color + '20' }]}>
                  <IconComponent size={24} color={card.color} />
                </View>
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                  {card.title}
                </Text>
                <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
                  {card.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Database size={24} color={theme.colors.primary} />
            <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
              Data Summary
            </Text>
          </View>
          <View style={styles.statsList}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                Account Created
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                Data Retention
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {privacySettings.data?.settings.dataRetentionDays || 365} days
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                Last Export
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                Never
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <CircleCheck size={24} color={theme.colors.success} />
            <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
              GDPR Compliance
            </Text>
          </View>
          <Text style={[styles.complianceText, { color: theme.colors.secondaryText }]}>
            We are fully compliant with GDPR, CCPA, and other privacy regulations. Your data rights are protected.
          </Text>
          <View style={styles.complianceList}>
            <View style={styles.complianceItem}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.complianceItemText, { color: theme.colors.text }]}>
                Right to access your data
              </Text>
            </View>
            <View style={styles.complianceItem}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.complianceItemText, { color: theme.colors.text }]}>
                Right to rectification
              </Text>
            </View>
            <View style={styles.complianceItem}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.complianceItemText, { color: theme.colors.text }]}>
                Right to erasure
              </Text>
            </View>
            <View style={styles.complianceItem}>
              <CircleCheck size={16} color={theme.colors.success} />
              <Text style={[styles.complianceItemText, { color: theme.colors.text }]}>
                Right to data portability
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    gap: 16,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  alertBanner: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    marginBottom: 12,
  },
  alertButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  privacyCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  statsList: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  complianceText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  complianceList: {
    gap: 12,
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  complianceItemText: {
    fontSize: 14,
  },
});
