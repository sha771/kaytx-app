 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Mail, Users, Target, TrendingUp, Zap, Settings } from 'lucide-react-native';

interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social';
  status: 'active' | 'paused' | 'completed';
  audience: number;
  openRate: number;
  clickRate: number;
  conversions: number;
  revenue: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
  executions: number;
}

const mockCampaigns: MarketingCampaign[] = [
  {
    id: '1',
    name: 'Welcome Series',
    type: 'email',
    status: 'active',
    audience: 1250,
    openRate: 68,
    clickRate: 24,
    conversions: 89,
    revenue: '$12,450'
  },
  {
    id: '2',
    name: 'Product Launch SMS',
    type: 'sms',
    status: 'active',
    audience: 850,
    openRate: 95,
    clickRate: 32,
    conversions: 156,
    revenue: '$8,920'
  }
];

const mockRules: AutomationRule[] = [
  {
    id: '1',
    name: 'New Subscriber Welcome',
    trigger: 'User signs up',
    action: 'Send welcome email series',
    isActive: true,
    executions: 245
  },
  {
    id: '2',
    name: 'Abandoned Cart Recovery',
    trigger: 'Cart abandoned for 2 hours',
    action: 'Send reminder email',
    isActive: true,
    executions: 89
  }
];

export default function MarketingAutomationScreen() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(mockCampaigns);
  const [rules, setRules] = useState<AutomationRule[]>(mockRules);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'rules'>('campaigns');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={20} color="#007AFF" />;
      case 'sms': return <Zap size={20} color="#34C759" />;
      case 'social': return <Users size={20} color="#FF9500" />;
      default: return <Mail size={20} color="#8E8E93" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'completed': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const CampaignCard = ({ campaign }: { campaign: MarketingCampaign }) => (
    <TouchableOpacity style={styles.campaignCard}>
      <View style={styles.campaignHeader}>
        <View style={styles.campaignInfo}>
          {getTypeIcon(campaign.type)}
          <View style={styles.campaignDetails}>
            <Text style={styles.campaignName}>{campaign.name}</Text>
            <Text style={styles.campaignAudience}>{campaign.audience} recipients</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
          <Text style={styles.statusText}>{campaign.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.campaignMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{campaign.openRate}%</Text>
          <Text style={styles.metricLabel}>Open Rate</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{campaign.clickRate}%</Text>
          <Text style={styles.metricLabel}>Click Rate</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{campaign.conversions}</Text>
          <Text style={styles.metricLabel}>Conversions</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{campaign.revenue}</Text>
          <Text style={styles.metricLabel}>Revenue</Text>
        </View>
      </View>
      
      <View style={styles.campaignActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Settings size={16} color="#007AFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <TrendingUp size={16} color="#007AFF" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const RuleCard = ({ rule }: { rule: AutomationRule }) => (
    <TouchableOpacity style={styles.ruleCard}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleInfo}>
          <Text style={styles.ruleName}>{rule.name}</Text>
          <Text style={styles.ruleExecutions}>{rule.executions} executions</Text>
        </View>
        <View style={[styles.activeIndicator, { backgroundColor: rule.isActive ? '#34C759' : '#8E8E93' }]} />
      </View>
      
      <View style={styles.ruleFlow}>
        <View style={styles.flowStep}>
          <Text style={styles.flowLabel}>TRIGGER</Text>
          <Text style={styles.flowText}>{rule.trigger}</Text>
        </View>
        <View style={styles.flowArrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
        <View style={styles.flowStep}>
          <Text style={styles.flowLabel}>ACTION</Text>
          <Text style={styles.flowText}>{rule.action}</Text>
        </View>
      </View>
      
      <View style={styles.ruleActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Settings size={16} color="#007AFF" />
          <Text style={styles.actionText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, rule.isActive && styles.pauseButton]}>
          <Zap size={16} color={rule.isActive ? "#FF9500" : "#34C759"} />
          <Text style={[styles.actionText, rule.isActive && styles.pauseText]}>
            {rule.isActive ? 'Pause' : 'Activate'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Marketing Automation',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Target size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Marketing Automation</Text>
              <Text style={styles.subtitle}>Automate your marketing campaigns</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Mail size={24} color="#007AFF" />
            <Text style={styles.statValue}>2,100</Text>
            <Text style={styles.statLabel}>Total Sent</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#34C759" />
            <Text style={styles.statValue}>76%</Text>
            <Text style={styles.statLabel}>Avg Open Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={24} color="#FF9500" />
            <Text style={styles.statValue}>245</Text>
            <Text style={styles.statLabel}>Conversions</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'campaigns' && styles.activeTab]}
            onPress={() => setActiveTab('campaigns')}
          >
            <Mail size={20} color={activeTab === 'campaigns' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'campaigns' && styles.activeTabText]}>
              Campaigns
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'rules' && styles.activeTab]}
            onPress={() => setActiveTab('rules')}
          >
            <Zap size={20} color={activeTab === 'rules' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'rules' && styles.activeTabText]}>
              Automation Rules
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'campaigns' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Campaigns</Text>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Campaign</Text>
              </TouchableOpacity>
            </View>
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Automation Rules</Text>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Rule</Text>
              </TouchableOpacity>
            </View>
            {rules.map(rule => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Mail size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Email Campaign</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Zap size={24} color="#34C759" />
              <Text style={styles.quickActionText}>SMS Campaign</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <TrendingUp size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Analytics</Text>
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
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  activeTab: {
    backgroundColor: '#007AFF'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabText: {
    color: '#fff'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  campaignInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  campaignDetails: {
    flex: 1
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  campaignAudience: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  metric: {
    alignItems: 'center'
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  metricLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2
  },
  campaignActions: {
    flexDirection: 'row',
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    gap: 4,
    flex: 1,
    justifyContent: 'center'
  },
  pauseButton: {
    backgroundColor: '#fff5f0'
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  pauseText: {
    color: '#FF9500'
  },
  ruleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  ruleInfo: {
    flex: 1
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  ruleExecutions: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  activeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  ruleFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  flowStep: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8
  },
  flowLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4
  },
  flowText: {
    fontSize: 12,
    color: '#1a1a1a'
  },
  flowArrow: {
    paddingHorizontal: 12
  },
  arrowText: {
    fontSize: 18,
    color: '#666'
  },
  ruleActions: {
    flexDirection: 'row',
    gap: 12
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  quickActionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center'
  }
});