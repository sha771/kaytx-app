import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { GitBranch, Plus, Edit2, Trash2, Clock, Users, Phone, AlertCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RoutingRule {
  id: string;
  name: string;
  priority: number;
  condition: string;
  action: string;
  destination: string;
  isActive: boolean;
}

export default function CallRoutingScreen() {
  const insets = useSafeAreaInsets();
  const [rules, setRules] = useState<RoutingRule[]>([
    {
      id: '1',
      name: 'VIP Customers',
      priority: 1,
      condition: 'Contact Tag = VIP',
      action: 'Transfer to Sales Manager',
      destination: '+1 (555) 123-4567',
      isActive: true,
    },
    {
      id: '2',
      name: 'Technical Support',
      priority: 2,
      condition: 'Keyword: "technical", "support", "bug"',
      action: 'Transfer to Tech Team',
      destination: '+1 (555) 765-4321',
      isActive: true,
    },
    {
      id: '3',
      name: 'After Hours',
      priority: 3,
      condition: 'Time: Outside 9AM-5PM',
      action: 'AI Handles + Send Email',
      destination: 'support@company.com',
      isActive: true,
    },
    {
      id: '4',
      name: 'New Customers',
      priority: 4,
      condition: 'First Time Caller',
      action: 'Welcome Script + Record',
      destination: 'AI Receptionist',
      isActive: true,
    },
  ]);



  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Call Routing Rules',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Routing Configuration</Text>
            <Text style={styles.headerSubtitle}>
              {rules.filter(r => r.isActive).length} of {rules.length} rules active
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <AlertCircle size={20} color="#60A5FA" />
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Rules are evaluated in priority order. First matching rule will be applied.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Phone size={18} color="#10B981" />
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Calls Routed</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={18} color="#60A5FA" />
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={18} color="#F59E0B" />
            <Text style={styles.statValue}>12s</Text>
            <Text style={styles.statLabel}>Avg. Time</Text>
          </View>
        </View>

        <View style={styles.rulesSection}>
          <Text style={styles.sectionTitle}>Routing Rules</Text>
          
          {rules.map((rule) => (
            <View key={rule.id} style={styles.ruleCard}>
              <View style={styles.ruleHeader}>
                <View style={styles.priorityBadge}>
                  <Text style={styles.priorityText}>#{rule.priority}</Text>
                </View>
                <Text style={styles.ruleName}>{rule.name}</Text>
                <Switch
                  value={rule.isActive}
                  onValueChange={() => toggleRule(rule.id)}
                  trackColor={{ false: '#374151', true: '#60A5FA' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.ruleDetails}>
                <View style={styles.ruleRow}>
                  <Text style={styles.ruleLabel}>Condition:</Text>
                  <Text style={styles.ruleValue}>{rule.condition}</Text>
                </View>
                <View style={styles.ruleRow}>
                  <Text style={styles.ruleLabel}>Action:</Text>
                  <Text style={styles.ruleValue}>{rule.action}</Text>
                </View>
                <View style={styles.ruleRow}>
                  <Text style={styles.ruleLabel}>Destination:</Text>
                  <Text style={styles.ruleValue}>{rule.destination}</Text>
                </View>
              </View>

              <View style={styles.ruleActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit2 size={16} color="#60A5FA" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => deleteRule(rule.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                  <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.defaultSection}>
          <Text style={styles.sectionTitle}>Default Behavior</Text>
          <View style={styles.defaultCard}>
            <GitBranch size={20} color="#9CA3AF" />
            <View style={styles.defaultContent}>
              <Text style={styles.defaultTitle}>When no rules match</Text>
              <Text style={styles.defaultDescription}>
                AI Receptionist handles the call with general greeting script
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    color: '#60A5FA',
  },
});
