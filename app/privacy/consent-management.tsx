 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, Shield, CheckCircle, XCircle, Clock, FileText, 
  Download, Eye, Settings, Info, ChevronRight 
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

const purposeConfig = {
  marketing: {
    title: 'Marketing Communications',
    description: 'Receive product updates, newsletters, and promotional content',
    icon: FileText,
    color: '#3B82F6',
    required: false,
  },
  analytics: {
    title: 'Analytics & Usage Data',
    description: 'Help us improve our services by analyzing usage patterns',
    icon: Eye,
    color: '#10B981',
    required: false,
  },
  personalization: {
    title: 'Personalization',
    description: 'Get personalized recommendations and tailored experiences',
    icon: Settings,
    color: '#8B5CF6',
    required: false,
  },
  essential: {
    title: 'Essential Services',
    description: 'Required for basic functionality and account management',
    icon: Shield,
    color: '#EF4444',
    required: true,
  },
  third_party_sharing: {
    title: 'Third Party Sharing',
    description: 'Share data with trusted partners for enhanced services',
    icon: Download,
    color: '#F59E0B',
    required: false,
  },
};

export default function ConsentManagementScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: consentRecords, refetch } = trpc.gdpr.getConsentRecords.useQuery();
  const updateConsent = trpc.gdpr.recordConsent.useMutation();
  const withdrawConsent = trpc.gdpr.withdrawConsent.useMutation();

  const handleConsentToggle = async (purpose: keyof typeof purposeConfig, granted: boolean) => {
    try {
      // This would typically get the current user ID from auth context
      const userId = 'current-user-id'; // Placeholder
      
      if (granted) {
        await updateConsent.mutateAsync({
          userId,
          purpose,
          granted: true,
          consentText: `User consented to ${purposeConfig[purpose].title}`,
          legalBasis: 'consent',
          processingActivities: [`${purpose}_processing`],
          dataCategories: [`${purpose}_data`],
        });
      } else {
        await withdrawConsent.mutateAsync({
          userId,
          purpose,
          reason: 'User withdrew consent via consent management interface',
        });
      }
      
      Alert.alert('Success', `Consent for ${purposeConfig[purpose].title} has been ${granted ? 'granted' : 'withdrawn'}`);
      refetch();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update consent');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const getConsentStatus = (purpose: string) => {
    const record = consentRecords?.find(r => r.purpose === purpose);
    return record?.status || 'withdrawn';
  };

  const getConsentDate = (purpose: string) => {
    const record = consentRecords?.find(r => r.purpose === purpose);
    return record?.consentDate;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Consent Management</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={[styles.banner, { backgroundColor: theme.colors.primary + '15' }]}>
          <Shield size={32} color={theme.colors.primary} />
          <View style={styles.bannerContent}>
            <Text style={[styles.bannerTitle, { color: theme.colors.text }]}>
              Your Privacy Rights
            </Text>
            <Text style={[styles.bannerText, { color: theme.colors.secondaryText }]}>
              Manage your consent preferences and control how your data is used. You can withdraw consent at any time.
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Consent Preferences</Text>
          <View style={styles.consentList}>
            {Object.entries(purposeConfig).map(([purpose, config]) => {
              const IconComponent = config.icon;
              const status = getConsentStatus(purpose);
              const consentDate = getConsentDate(purpose);
              const isGranted = status === 'granted';
              
              return (
                <View key={purpose} style={[styles.consentItem, { borderColor: theme.colors.border }]}>
                  <View style={styles.consentInfo}>
                    <View style={[styles.iconContainer, { backgroundColor: config.color + '20' }]}>
                      <IconComponent size={20} color={config.color} />
                    </View>
                    <View style={styles.consentDetails}>
                      <View style={styles.consentHeader}>
                        <Text style={[styles.consentTitle, { color: theme.colors.text }]}>
                          {config.title}
                        </Text>
                        {config.required && (
                          <View style={[styles.requiredBadge, { backgroundColor: theme.colors.error + '20' }]}>
                            <Text style={[styles.requiredText, { color: theme.colors.error }]}>
                              Required
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.consentDescription, { color: theme.colors.secondaryText }]}>
                        {config.description}
                      </Text>
                      {consentDate && (
                        <Text style={[styles.consentDate, { color: theme.colors.tertiaryText }]}>
                          Last updated: {new Date(consentDate).toLocaleDateString()}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.consentStatus}>
                    <View style={styles.statusContainer}>
                      {isGranted ? (
                        <CheckCircle size={16} color={theme.colors.success} />
                      ) : (
                        <XCircle size={16} color={theme.colors.error} />
                      )}
                      <Text style={[
                        styles.statusText, 
                        { color: isGranted ? theme.colors.success : theme.colors.error }
                      ]}>
                        {isGranted ? 'Granted' : 'Withdrawn'}
                      </Text>
                    </View>
                    
                    {!config.required && (
                      <Switch
                        value={isGranted}
                        onValueChange={(value) => handleConsentToggle(purpose as keyof typeof purposeConfig, value)}
                        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                        thumbColor="#FFFFFF"
                        disabled={updateConsent.isPending || withdrawConsent.isPending}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Info size={24} color={theme.colors.primary} />
            <Text style={[styles.cardHeaderTitle, { color: theme.colors.text }]}>
              About Your Consent
            </Text>
          </View>
          
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Clock size={16} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                You can withdraw your consent at any time
              </Text>
            </View>
            <View style={styles.infoItem}>
              <FileText size={16} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                All consent changes are logged for transparency
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Shield size={16} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Essential services require consent for basic functionality
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Rights</Text>
          <View style={styles.rightsList}>
            <TouchableOpacity style={styles.rightItem}>
              <ChevronRight size={20} color={theme.colors.primary} />
              <View style={styles.rightContent}>
                <Text style={[styles.rightTitle, { color: theme.colors.text }]}>
                  Right to Access
                </Text>
                <Text style={[styles.rightDescription, { color: theme.colors.secondaryText }]}>
                  Request a copy of your personal data
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rightItem}>
              <ChevronRight size={20} color={theme.colors.primary} />
              <View style={styles.rightContent}>
                <Text style={[styles.rightTitle, { color: theme.colors.text }]}>
                  Right to Rectification
                </Text>
                <Text style={[styles.rightDescription, { color: theme.colors.secondaryText }]}>
                  Correct inaccurate personal data
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rightItem}>
              <ChevronRight size={20} color={theme.colors.primary} />
              <View style={styles.rightContent}>
                <Text style={[styles.rightTitle, { color: theme.colors.text }]}>
                  Right to Erasure
                </Text>
                <Text style={[styles.rightDescription, { color: theme.colors.secondaryText }]}>
                  Request deletion of your personal data
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rightItem}>
              <ChevronRight size={20} color={theme.colors.primary} />
              <View style={styles.rightContent}>
                <Text style={[styles.rightTitle, { color: theme.colors.text }]}>
                  Right to Data Portability
                </Text>
                <Text style={[styles.rightDescription, { color: theme.colors.secondaryText }]}>
                  Export your data in a machine-readable format
                </Text>
              </View>
            </TouchableOpacity>
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
  consentList: {
    gap: 16,
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  consentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentDetails: {
    flex: 1,
  },
  consentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  consentTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginRight: 8,
  },
  requiredBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requiredText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  consentDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  consentDate: {
    fontSize: 12,
  },
  consentStatus: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500' as const,
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
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
  rightsList: {
    gap: 4,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  rightContent: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    marginBottom: 2,
  },
  rightDescription: {
    fontSize: 14,
  },
});
