 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Eye, User, Calendar, CircleCheck, CircleX } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

export default function AccessLogsScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const accessLogs = trpc.privacy.accessLogs.useQuery({
    limit: 50,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await accessLogs.refetch();
    setRefreshing(false);
  };

  const getAccessTypeColor = (type: string) => {
    switch (type) {
      case 'read': return theme.colors.primary;
      case 'write': return theme.colors.warning;
      case 'delete': return theme.colors.error;
      case 'export': return theme.colors.primary;
      default: return theme.colors.secondaryText;
    }
  };

  const getAccessTypeIcon = (type: string) => {
    switch (type) {
      case 'read': return Eye;
      case 'write': return User;
      default: return Eye;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Access Logs</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.infoCard, { backgroundColor: theme.colors.primary + '15' }]}>
          <Eye size={24} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            This shows every time your data has been accessed. We log all access for transparency and security.
          </Text>
        </View>

        <View style={[styles.statsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {accessLogs.data?.total || 0}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Total Access Events
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              {accessLogs.data?.logs.filter((l: any) => l.success).length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Successful
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.error }]}>
              {accessLogs.data?.logs.filter((l: any) => !l.success).length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Failed
            </Text>
          </View>
        </View>

        {accessLogs.isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
              Loading access logs...
            </Text>
          </View>
        ) : (
          <View style={styles.logsList}>
            {accessLogs.data?.logs.map((log: any) => {
              const IconComponent = getAccessTypeIcon(log.accessType);
              const typeColor = getAccessTypeColor(log.accessType);

              return (
                <View
                  key={log.id}
                  style={[styles.logCard, { backgroundColor: theme.colors.cardBackground }]}
                >
                  <View style={styles.logHeader}>
                    <View style={[styles.logIcon, { backgroundColor: typeColor + '20' }]}>
                      <IconComponent size={20} color={typeColor} />
                    </View>
                    <View style={styles.logInfo}>
                      <Text style={[styles.logAction, { color: theme.colors.text }]}>
                        {log.accessType.toUpperCase()} - {log.dataType}
                      </Text>
                      <Text style={[styles.logReason, { color: theme.colors.secondaryText }]}>
                        {log.reason}
                      </Text>
                    </View>
                    {log.success ? (
                      <CircleCheck size={20} color={theme.colors.success} />
                    ) : (
                      <CircleX size={20} color={theme.colors.error} />
                    )}
                  </View>

                  <View style={styles.logDetails}>
                    <View style={styles.detailRow}>
                      <User size={16} color={theme.colors.secondaryText} />
                      <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                        Accessed by: {log.accessedBy}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color={theme.colors.secondaryText} />
                      <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                        {new Date(log.timestamp).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  statsCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  logsList: {
    gap: 12,
  },
  logCard: {
    padding: 16,
    borderRadius: 12,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInfo: {
    flex: 1,
  },
  logAction: {
    fontSize: 15,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  logReason: {
    fontSize: 13,
  },
  logDetails: {
    gap: 8,
    paddingLeft: 52,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
  },
});
