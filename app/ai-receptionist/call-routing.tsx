 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { GitBranch, Plus, PenLine, Trash2, Clock, Users, Phone, CircleAlert, Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

export default function CallRoutingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: rules = [], isLoading, refetch } = trpc.receptionist.getRoutingRules.useQuery();
  const utils = trpc.useUtils();

  const toggleRuleMutation = trpc.receptionist.updateRoutingRule.useMutation({
    onSuccess: () => utils.receptionist.getRoutingRules.invalidate(),
  });

  const deleteRuleMutation = trpc.receptionist.deleteRoutingRule.useMutation({
    onSuccess: () => utils.receptionist.getRoutingRules.invalidate(),
  });

  const toggleRule = (id: string, isActive: boolean) => {
    toggleRuleMutation.mutate({ id, isActive: !isActive });
  };

  const deleteRule = (id: string) => {
    deleteRuleMutation.mutate({ id });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen 
        options={{
          title: 'Call Routing Rules',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Routing Configuration</Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>
                {rules.filter(r => r.isActive).length} of {rules.length} rules active
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => !isEnterprise ? router.push('/enterprise-admin') : null}
            >
              {!isEnterprise && (
                <View style={styles.lockOverlayMini}>
                  <Lock size={12} color="white" />
                </View>
              )}
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.colors.primary + '20' }]}>
            <CircleAlert size={20} color={theme.colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoText, { color: theme.colors.primary }]}>
                Rules are evaluated in priority order. First matching rule will be applied.
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Phone size={18} color={theme.colors.success} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>1,234</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Calls Routed</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Users size={18} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>89%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Clock size={18} color="#F59E0B" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>12s</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg. Time</Text>
            </View>
          </View>

          <View style={styles.rulesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Routing Rules</Text>
            
            {rules.map((rule) => (
              <View key={rule.id} style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground, borderLeftColor: theme.colors.primary }]}>
                {!isEnterprise && (
                  <TouchableOpacity 
                    style={styles.lockOverlay}
                    onPress={() => router.push('/enterprise-admin')}
                  >
                    <Lock size={20} color={theme.colors.text} />
                  </TouchableOpacity>
                )}
                <View style={styles.ruleHeader}>
                  <View style={[styles.priorityBadge, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.priorityText, { color: theme.colors.primary }]}>#{rule.priority}</Text>
                  </View>
                  <Text style={[styles.ruleName, { color: theme.colors.text }]}>{rule.name}</Text>
                  <Switch
                    value={rule.isActive}
                    onValueChange={() => toggleRule(rule.id, rule.isActive)}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.ruleDetails}>
                  <View style={styles.ruleRow}>
                    <Text style={[styles.ruleLabel, { color: theme.colors.secondaryText }]}>Condition:</Text>
                    <Text style={[styles.ruleValue, { color: theme.colors.text }]}>{rule.condition}</Text>
                  </View>
                  <View style={styles.ruleRow}>
                    <Text style={[styles.ruleLabel, { color: theme.colors.secondaryText }]}>Action:</Text>
                    <Text style={[styles.ruleValue, { color: theme.colors.text }]}>{rule.action}</Text>
                  </View>
                  <View style={styles.ruleRow}>
                    <Text style={[styles.ruleLabel, { color: theme.colors.secondaryText }]}>Destination:</Text>
                    <Text style={[styles.ruleValue, { color: theme.colors.text }]}>{rule.destination}</Text>
                  </View>
                </View>

                <View style={[styles.ruleActions, { borderTopColor: theme.colors.border }]}>
                  <TouchableOpacity style={styles.actionButton}>
                    <PenLine size={16} color={theme.colors.primary} />
                    <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => deleteRule(rule.id)}
                  >
                    <Trash2 size={16} color={theme.colors.error} />
                    <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.defaultSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Default Behavior</Text>
            <View style={[styles.defaultCard, { backgroundColor: theme.colors.cardBackground }]}>
              <GitBranch size={20} color={theme.colors.secondaryText} />
              <View style={styles.defaultContent}>
                <Text style={[styles.defaultTitle, { color: theme.colors.text }]}>When no rules match</Text>
                <Text style={[styles.defaultDescription, { color: theme.colors.secondaryText }]}>
                  AI Receptionist handles the call with general greeting script
                </Text>
              </View>
              <TouchableOpacity style={[styles.changeButton, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.changeButtonText, { color: theme.colors.primary }]}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    backgroundColor: '#60A5FA',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1E3A5F',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 13,
    color: '#93C5FD',
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  rulesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  ruleCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#60A5FA',
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  priorityBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#60A5FA',
  },
  ruleName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ruleDetails: {
    gap: 8,
    marginBottom: 12,
  },
  ruleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ruleLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
    minWidth: 80,
  },
  ruleValue: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
  },
  ruleActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#60A5FA',
  },
  defaultSection: {
    padding: 16,
  },
  defaultCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  defaultContent: {
    flex: 1,
  },
  defaultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  defaultDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  changeButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockOverlayMini: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 2,
    zIndex: 10,
  },
});
