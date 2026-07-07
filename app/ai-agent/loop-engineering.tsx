/**
 * Loop Engineering Main Page
 * 
 * Main entry point for the loop engineering system in the AI agent app.
 * Provides access to loop management, templates, and analytics.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopManager } from '@/components/loop-engineering/LoopManager';
import { getDepartmentAgents, getAllTemplates, getSuggestedLoopsForAgent } from '@/lib/loop-engineering';
import {
  Network, Layers, Zap, Target, BarChart3, Settings,
  ArrowRight, ChevronRight, Plus, Activity, TrendingUp
} from 'lucide-react-native';

export default function LoopEngineeringPage() {
  const { theme } = useTheme();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('marketing-growth');
  const [availableAgents, setAvailableAgents] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'manager' | 'analytics'>('overview');

  useEffect(() => {
    loadDepartmentData(selectedDepartment);
  }, [selectedDepartment]);

  const loadDepartmentData = (departmentId: string) => {
    const agents = getDepartmentAgents(departmentId);
    setAvailableAgents([...agents.main, ...agents.sub]);
    
    const allTemplates = getAllTemplates();
    setTemplates(allTemplates);
  };

  const departments = [
    { id: 'marketing-growth', name: 'Marketing & Growth', icon: Target },
    { id: 'sales-revenue', name: 'Sales & Revenue', icon: TrendingUp },
    { id: 'customer-experience', name: 'Customer Experience', icon: Activity },
    { id: 'operations-management', name: 'Operations & Management', icon: Layers },
    { id: 'finance-accounting', name: 'Finance & Accounting', icon: BarChart3 },
    { id: 'technology-engineering', name: 'Technology & Engineering', icon: Zap },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Loop Engineering
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Automated AI Agent Workflows
          </Text>
        </View>
        <Pressable style={[styles.createButton, { backgroundColor: theme.colors.primary }]}>
          <Plus size={20} color="#fff" />
          <Text style={styles.createButtonText}>New Loop</Text>
        </Pressable>
      </View>

      {/* Department Selector */}
      <ScrollView 
        horizontal 
        style={[styles.departmentSelector, { borderBottomColor: theme.colors.border }]}
        showsHorizontalScrollIndicator={false}
      >
        {departments.map((dept) => {
          const Icon = dept.icon;
          return (
            <Pressable
              key={dept.id}
              style={[
                styles.departmentCard,
                selectedDepartment === dept.id && { 
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.primary 
                },
                { borderColor: theme.colors.border }
              ]}
              onPress={() => setSelectedDepartment(dept.id)}
            >
              <Icon 
                size={24} 
                color={selectedDepartment === dept.id ? '#fff' : theme.colors.textSecondary} 
              />
              <Text
                style={[
                  styles.departmentName,
                  { color: selectedDepartment === dept.id ? '#fff' : theme.colors.text }
                ]}
              >
                {dept.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Content Tabs */}
      <View style={[styles.tabs, { borderBottomColor: theme.colors.border }]}>
        {['overview', 'manager', 'analytics'].map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.colors.primary : theme.colors.textSecondary }
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'overview' && (
        <ScrollView style={styles.content}>
          <OverviewSection
            departmentId={selectedDepartment}
            availableAgents={availableAgents}
            templates={templates}
            onSelectTemplate={(template) => {
              console.log('Selected template:', template);
              setActiveTab('manager');
            }}
            theme={theme}
          />
        </ScrollView>
      )}

      {activeTab === 'manager' && (
        <LoopManager
          departmentId={selectedDepartment}
          availableAgents={availableAgents}
          templates={templates.filter(t => 
            t.config.integration?.departmentId === selectedDepartment ||
            t.category === 'coordination' ||
            t.category === 'universal'
          )}
        />
      )}

      {activeTab === 'analytics' && (
        <ScrollView style={styles.content}>
          <AnalyticsOverview
            departmentId={selectedDepartment}
            theme={theme}
          />
        </ScrollView>
      )}
    </View>
  );
}

// Overview Section Component
interface OverviewSectionProps {
  departmentId: string;
  availableAgents: any[];
  templates: any[];
  onSelectTemplate: (template: any) => void;
  theme: any;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  departmentId,
  availableAgents,
  templates,
  onSelectTemplate,
  theme
}) => {
  const departmentTemplates = templates.filter(t => 
    t.config.integration?.departmentId === departmentId
  );

  return (
    <View style={styles.overviewContent}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Available Agents"
          value={availableAgents.length}
          icon={Network}
          theme={theme}
        />
        <StatCard
          title="Templates"
          value={departmentTemplates.length}
          icon={Layers}
          theme={theme}
        />
        <StatCard
          title="Active Loops"
          value="0"
          icon={Activity}
          theme={theme}
        />
        <StatCard
          title="Success Rate"
          value="0%"
          icon={Target}
          theme={theme}
        />
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.quickActions}>
          <QuickAction
            icon={Plus}
            label="Create Loop"
            description="Design a new workflow"
            theme={theme}
          />
          <QuickAction
            icon={Layers}
            label="Use Template"
            description="Start from pre-built workflow"
            theme={theme}
          />
          <QuickAction
            icon={Network}
            label="Agent Coordination"
            description="Coordinate multiple agents"
            theme={theme}
          />
        </View>
      </View>

      {/* Available Templates */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Templates for {departmentId.replace('-', ' ')}
          </Text>
          <Pressable>
            <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
              See All
            </Text>
          </Pressable>
        </View>
        
        {departmentTemplates.length > 0 ? (
          departmentTemplates.slice(0, 3).map((template) => (
            <Pressable
              key={template.id}
              style={[styles.templateCard, { borderBottomColor: theme.colors.border }]}
              onPress={() => onSelectTemplate(template)}
            >
              <View style={styles.templateInfo}>
                <Text style={[styles.templateName, { color: theme.colors.text }]}>
                  {template.name}
                </Text>
                <Text style={[styles.templateDescription, { color: theme.colors.textSecondary }]}>
                  {template.description}
                </Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </Pressable>
          ))
        ) : (
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            No templates available for this department
          </Text>
        )}
      </View>

      {/* Capabilities-Based Suggestions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Suggested Workflows
        </Text>
        {availableAgents.slice(0, 3).map((agent) => {
          const suggestions = getSuggestedLoopsForAgent(agent.id);
          return (
            <View key={agent.id} style={styles.suggestionItem}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>
                {agent.name}
              </Text>
              {suggestions.slice(0, 2).map((suggestion) => (
                <Pressable
                  key={suggestion.id}
                  style={[styles.suggestionCard, { backgroundColor: theme.colors.background }]}
                  onPress={() => onSelectTemplate(suggestion)}
                >
                  <Text style={[styles.suggestionName, { color: theme.colors.text }]}>
                    {suggestion.name}
                  </Text>
                  <Text style={[styles.suggestionCategory, { color: theme.colors.primary }]}>
                    {suggestion.category}
                  </Text>
                </Pressable>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Analytics Overview Component
interface AnalyticsOverviewProps {
  departmentId: string;
  theme: any;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ departmentId, theme }) => {
  return (
    <View style={styles.analyticsContent}>
      <View style={[styles.placeholder, { backgroundColor: theme.colors.card }]}>
        <BarChart3 size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
          Analytics Dashboard
        </Text>
        <Text style={[styles.placeholderSubtext, { color: theme.colors.textSecondary }]}>
          Select a loop to view detailed analytics
        </Text>
      </View>
    </View>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  theme: any;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, theme }) => {
  return (
    <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
      <Icon size={24} color={theme.colors.primary} />
      <Text style={[styles.statValue, { color: theme.colors.text }]}>
        {value}
      </Text>
      <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>
        {title}
      </Text>
    </View>
  );
};

// Quick Action Component
interface QuickActionProps {
  icon: any;
  label: string;
  description: string;
  theme: any;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon: Icon, label, description, theme }) => {
  return (
    <Pressable style={[styles.quickAction, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${theme.colors.primary}20` }]}>
        <Icon size={24} color={theme.colors.primary} />
      </View>
      <Text style={[styles.quickActionLabel, { color: theme.colors.text }]}>
        {label}
      </Text>
      <Text style={[styles.quickActionDescription, { color: theme.colors.textSecondary }]}>
        {description}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  departmentSelector: {
    padding: 16,
    borderBottomWidth: 1,
  },
  departmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 12,
  },
  departmentName: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  overviewContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  quickActionIcon: {
    borderRadius: 20,
    padding: 8,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  templateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  suggestionItem: {
    marginBottom: 16,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  suggestionName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  suggestionCategory: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  analyticsContent: {
    padding: 16,
  },
  placeholder: {
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  placeholderSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});