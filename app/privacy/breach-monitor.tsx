 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TriangleAlert, Shield, CircleCheck, Clock, CircleAlert } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

export default function BreachMonitorScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const breachCheck = trpc.privacy.breachCheck.useQuery({});

  const onRefresh = async () => {
    setRefreshing(true);
    await breachCheck.refetch();
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.primary;
      default: return theme.colors.secondaryText;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Breach Monitor</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: breachCheck.data?.breachesFound
                ? theme.colors.error + '15'
                : theme.colors.success + '15',
            },
          ]}
        >
          {breachCheck.data?.breachesFound ? (
            <>
              <TriangleAlert size={48} color={theme.colors.error} />
              <Text style={[styles.statusTitle, { color: theme.colors.error }]}>
                Breaches Detected
              </Text>
              <Text style={[styles.statusText, { color: theme.colors.text }]}>
                Your information was found in {breachCheck.data.breachesFound} data breaches
              </Text>
            </>
          ) : (
            <>
              <Shield size={48} color={theme.colors.success} />
              <Text style={[styles.statusTitle, { color: theme.colors.success }]}>
                All Clear
              </Text>
              <Text style={[styles.statusText, { color: theme.colors.text }]}>
                No breaches found. Your data appears secure.
              </Text>
            </>
          )}
          <View style={styles.lastChecked}>
            <Clock size={16} color={theme.colors.secondaryText} />
            <Text style={[styles.lastCheckedText, { color: theme.colors.secondaryText }]}>
              Last checked: {new Date(breachCheck.data?.lastChecked || Date.now()).toLocaleString()}
            </Text>
          </View>
        </View>

        {breachCheck.data?.breaches && breachCheck.data.breaches.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Breach Details
            </Text>
            <View style={styles.breachesList}>
              {breachCheck.data.breaches.map((breach: any) => {
                const severityColor = getSeverityColor(breach.severity);
                return (
                  <View
                    key={breach.id}
                    style={[styles.breachCard, { backgroundColor: theme.colors.cardBackground }]}
                  >
                    <View style={styles.breachHeader}>
                      <View style={[styles.severityBadge, { backgroundColor: severityColor + '20' }]}>
                        <CircleAlert size={16} color={severityColor} />
                        <Text style={[styles.severityText, { color: severityColor }]}>
                          {breach.severity.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.breachService, { color: theme.colors.text }]}>
                      {breach.service}
                    </Text>
                    <Text style={[styles.breachDescription, { color: theme.colors.secondaryText }]}>
                      {breach.description}
                    </Text>

                    <View style={styles.breachMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                          {breach.breachDate}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <TriangleAlert size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                          {breach.affectedData.join(', ')}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.recommendations, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.recommendationsTitle, { color: theme.colors.text }]}>
                        Recommended Actions:
                      </Text>
                      {breach.recommendations.map((recommendation: any, index: number) => (
                        <View key={index} style={styles.recommendationItem}>
                          <CircleCheck size={14} color={theme.colors.primary} />
                          <Text style={[styles.recommendationText, { color: theme.colors.text }]}>
                            {recommendation}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Shield size={24} color={theme.colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
              What is Breach Monitoring?
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
              We continuously monitor known data breaches to check if your information has been compromised.
              If we find a breach, we&apos;ll alert you immediately with steps to protect your account.
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
    fontWeight: '600' as const,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginTop: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  lastChecked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastCheckedText: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  breachesList: {
    gap: 16,
    marginBottom: 20,
  },
  breachCard: {
    padding: 16,
    borderRadius: 12,
  },
  breachHeader: {
    marginBottom: 12,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    gap: 6,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  breachService: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  breachDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  breachMeta: {
    gap: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  recommendations: {
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  recommendationText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
