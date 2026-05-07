 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, TriangleAlert, CircleCheck } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function SecurityPrivacyScreen() {
  const { theme } = useTheme();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);
  const [dataEncryption, setDataEncryption] = useState<boolean>(true);
  const [activityLogging, setActivityLogging] = useState<boolean>(true);
  const [autoLogout, setAutoLogout] = useState<boolean>(false);

  const securityFeatures = [
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      icon: Key,
      status: 'active',
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition to login',
      enabled: biometricEnabled,
      onToggle: setBiometricEnabled,
      icon: Eye,
      status: 'inactive',
    },
    {
      id: 'encryption',
      title: 'Data Encryption',
      description: 'Encrypt all data stored on your device',
      enabled: dataEncryption,
      onToggle: setDataEncryption,
      icon: Lock,
      status: 'active',
    },
    {
      id: 'logging',
      title: 'Activity Logging',
      description: 'Track all account activities and login attempts',
      enabled: activityLogging,
      onToggle: setActivityLogging,
      icon: Shield,
      status: 'active',
    },
    {
      id: 'auto-logout',
      title: 'Auto Logout',
      description: 'Automatically logout after 30 minutes of inactivity',
      enabled: autoLogout,
      onToggle: setAutoLogout,
      icon: TriangleAlert,
      status: 'inactive',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Login',
      device: 'iPhone 14 Pro',
      location: 'New York, NY',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'success',
    },
    {
      id: '2',
      action: 'Password Change',
      device: 'MacBook Pro',
      location: 'New York, NY',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'success',
    },
    {
      id: '3',
      action: 'Failed Login Attempt',
      device: 'Unknown Device',
      location: 'Los Angeles, CA',
      timestamp: '2024-01-14T09:15:00Z',
      status: 'failed',
    },
    {
      id: '4',
      action: 'Data Export',
      device: 'iPad Air',
      location: 'New York, NY',
      timestamp: '2024-01-13T14:20:00Z',
      status: 'success',
    },
  ];

  const privacySettings = [
    { id: 'analytics', title: 'Analytics Tracking', enabled: true },
    { id: 'marketing', title: 'Marketing Communications', enabled: false },
    { id: 'data-sharing', title: 'Data Sharing with Partners', enabled: false },
    { id: 'location', title: 'Location Services', enabled: true },
    { id: 'cookies', title: 'Cookie Preferences', enabled: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return theme.colors.success;
      case 'failed': return theme.colors.error;
      case 'active': return theme.colors.success;
      case 'inactive': return theme.colors.secondaryText;
      default: return theme.colors.secondaryText;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Security & Privacy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Shield size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Security Overview</Text>
          </View>
          <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Manage your account security settings and privacy preferences
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <CircleCheck size={20} color={theme.colors.success} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {securityFeatures.filter(f => f.enabled).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Active Features
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TriangleAlert size={20} color={theme.colors.warning} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {recentActivity.filter(a => a.status === 'failed').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Failed Attempts
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Eye size={20} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {recentActivity.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Recent Activities
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security Features</Text>
          
          <View style={styles.featuresList}>
            {securityFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <View key={feature.id} style={[styles.featureCard, { borderColor: theme.colors.border }]}>
                  <View style={styles.featureInfo}>
                    <View style={styles.featureHeader}>
                      <IconComponent size={20} color={theme.colors.primary} />
                      <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                        {feature.title}
                      </Text>
                      <View 
                        style={[
                          styles.statusDot, 
                          { backgroundColor: getStatusColor(feature.status) }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.featureDescription, { color: theme.colors.secondaryText }]}>
                      {feature.description}
                    </Text>
                  </View>
                  <Switch
                    value={feature.enabled}
                    onValueChange={feature.onToggle}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
          
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={[styles.activityCard, { borderColor: theme.colors.border }]}>
                <View style={styles.activityInfo}>
                  <View style={styles.activityHeader}>
                    <Text style={[styles.activityAction, { color: theme.colors.text }]}>
                      {activity.action}
                    </Text>
                    <View 
                      style={[
                        styles.activityStatus, 
                        { backgroundColor: getStatusColor(activity.status) }
                      ]}
                    >
                      <Text style={styles.activityStatusText}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.activityDevice, { color: theme.colors.secondaryText }]}>
                    {activity.device} • {activity.location}
                  </Text>
                  <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Settings</Text>
          
          <View style={styles.privacyList}>
            {privacySettings.map((setting) => (
              <View key={setting.id} style={[styles.privacyCard, { borderColor: theme.colors.border }]}>
                <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>
                  {setting.title}
                </Text>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => console.log(`Toggle ${setting.id}`)}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Lock size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Security Actions</Text>
          </View>
          
          <View style={styles.actionsList}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            >
              <Key size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Change Password</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.warning }]}
            >
              <Shield size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Setup 2FA</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
            >
              <Eye size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Download Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
            >
              <TriangleAlert size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <EyeOff size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Privacy Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Use strong, unique passwords for all your accounts
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Enable two-factor authentication whenever possible
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Regularly review and update your privacy settings
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Be cautious about sharing personal information online
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Keep your apps and devices updated with latest security patches
            </Text>
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
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  featureInfo: {
    flex: 1,
    marginRight: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  activityInfo: {
    gap: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  activityDevice: {
    fontSize: 14,
  },
  activityTime: {
    fontSize: 12,
  },
  privacyList: {
    gap: 12,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionsList: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

