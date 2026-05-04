 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { Mail, Users, TrendingUp, Settings, Send, Eye, ChartBar, FileText, Zap, Clock } from 'lucide-react-native';

type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';

interface ColdEmailCampaign {
  id: string;
  name: string;
  status: CampaignStatus;
  subject: string;
  totalRecipients: number;
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  scheduled: Date;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  openRate: number;
  replyRate: number;
}

export default function ColdEmailScreen() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'analytics' | 'settings'>('campaigns');
  const [aiWriting, setAiWriting] = useState(true);
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [trackOpens, setTrackOpens] = useState(true);

  const campaigns: ColdEmailCampaign[] = [
    {
      id: '1',
      name: 'Q1 Product Launch',
      status: 'sending',
      subject: 'Transform your workflow with our new platform',
      totalRecipients: 5000,
      sent: 2345,
      opened: 1123,
      clicked: 234,
      replied: 89,
      scheduled: new Date('2025-01-15'),
    },
    {
      id: '2',
      name: 'Enterprise Outreach',
      status: 'scheduled',
      subject: 'Exclusive offer for enterprise teams',
      totalRecipients: 1500,
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      scheduled: new Date('2025-01-20'),
    },
    {
      id: '3',
      name: 'Follow-up Campaign',
      status: 'completed',
      subject: 'Following up on our conversation',
      totalRecipients: 800,
      sent: 800,
      opened: 456,
      clicked: 123,
      replied: 67,
      scheduled: new Date('2025-01-10'),
    },
  ];

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Cold Outreach - SaaS',
      subject: 'Quick question about [Company]',
      body: `Hi [Name],

I noticed [Company] is using [Current Tool] for [Use Case]. We help companies like yours increase productivity by 40% through our unified platform.

Would you be open to a 15-minute call next week to explore how we can help?

Best regards,
[Your Name]`,
      category: 'Outreach',
      openRate: 42,
      replyRate: 18,
    },
    {
      id: '2',
      name: 'Follow-up Template',
      subject: 'Re: Quick question about [Company]',
      body: `Hi [Name],

I wanted to follow up on my previous email. I understand you're busy, but I believe our solution could save your team 20+ hours per week.

Would a quick 10-minute call work for you this week?

Best,
[Your Name]`,
      category: 'Follow-up',
      openRate: 38,
      replyRate: 15,
    },
    {
      id: '3',
      name: 'Value Proposition',
      subject: 'How [Company Name] increased ROI by 300%',
      body: `Hi [Name],

I wanted to share a quick case study. [Company Name] was facing similar challenges with [Pain Point].

After implementing our solution:
• 300% increase in ROI
• 40% reduction in costs
• 50% faster time-to-market

Would you like to see how we can achieve similar results for [Company]?

Best regards,
[Your Name]`,
      category: 'Case Study',
      openRate: 45,
      replyRate: 22,
    },
  ];

  const renderCampaigns = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Email Campaigns</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ New Campaign</Text>
        </TouchableOpacity>
      </View>

      {campaigns.map((campaign) => (
        <View key={campaign.id} style={styles.campaignCard}>
          <View style={styles.campaignHeader}>
            <View style={styles.campaignInfo}>
              <Text style={styles.campaignName}>{campaign.name}</Text>
              <Text style={styles.campaignSubject}>{campaign.subject}</Text>
              <Text style={styles.campaignDate}>
                {campaign.status === 'scheduled' ? 'Scheduled: ' : 'Started: '}
                {campaign.scheduled.toLocaleDateString()}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
              <Text style={styles.statusText}>{campaign.status}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{campaign.sent}/{campaign.totalRecipients}</Text>
              <Text style={styles.statLabel}>Sent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>Open Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {campaign.opened > 0 ? Math.round((campaign.clicked / campaign.opened) * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>Click Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{campaign.replied}</Text>
              <Text style={styles.statLabel}>Replies</Text>
            </View>
          </View>

          {campaign.status === 'sending' && (
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(campaign.sent / campaign.totalRecipients) * 100}%` },
                ]}
              />
            </View>
          )}

          <View style={styles.campaignActions}>
            {campaign.status === 'sending' ? (
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Pause</Text>
              </TouchableOpacity>
            ) : campaign.status === 'scheduled' ? (
              <TouchableOpacity style={styles.actionButton}>
                <Send size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Send Now</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.secondaryButton}>
              <ChartBar size={16} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTemplates = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Email Templates</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ New Template</Text>
        </TouchableOpacity>
      </View>

      {templates.map((template) => (
        <View key={template.id} style={styles.templateCard}>
          <View style={styles.templateHeader}>
            <View style={styles.templateInfo}>
              <View style={styles.templateTitleRow}>
                <FileText size={20} color="#007AFF" />
                <Text style={styles.templateName}>{template.name}</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{template.category}</Text>
              </View>
            </View>
          </View>

          <View style={styles.templateContent}>
            <Text style={styles.templateLabel}>Subject:</Text>
            <Text style={styles.templateSubject}>{template.subject}</Text>

            <Text style={styles.templateLabel}>Body:</Text>
            <Text style={styles.templateBody} numberOfLines={6}>
              {template.body}
            </Text>
          </View>

          <View style={styles.templateStats}>
            <View style={styles.templateStat}>
              <Eye size={16} color="#34C759" />
              <Text style={styles.templateStatText}>{template.openRate}% open rate</Text>
            </View>
            <View style={styles.templateStat}>
              <Mail size={16} color="#007AFF" />
              <Text style={styles.templateStatText}>{template.replyRate}% reply rate</Text>
            </View>
          </View>

          <View style={styles.templateActions}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Use Template</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aiButton}>
              <Zap size={16} color="#FF9500" />
              <Text style={styles.aiButtonText}>AI Improve</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Email Analytics</Text>

      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsCard}>
          <Mail size={32} color="#007AFF" />
          <Text style={styles.analyticsValue}>12,345</Text>
          <Text style={styles.analyticsLabel}>Total Sent</Text>
          <Text style={styles.analyticsChange}>+23% vs last month</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Eye size={32} color="#34C759" />
          <Text style={styles.analyticsValue}>5,234</Text>
          <Text style={styles.analyticsLabel}>Opened</Text>
          <Text style={styles.analyticsChange}>42.4% open rate</Text>
        </View>

        <View style={styles.analyticsCard}>
          <TrendingUp size={32} color="#FF9500" />
          <Text style={styles.analyticsValue}>1,456</Text>
          <Text style={styles.analyticsLabel}>Clicked</Text>
          <Text style={styles.analyticsChange}>27.8% click rate</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Mail size={32} color="#5856D6" />
          <Text style={styles.analyticsValue}>567</Text>
          <Text style={styles.analyticsLabel}>Replies</Text>
          <Text style={styles.analyticsChange}>10.8% reply rate</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Campaign Performance</Text>
        <View style={styles.performanceList}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceName}>Q1 Product Launch</Text>
            <View style={styles.performanceMetrics}>
              <Text style={styles.performanceMetric}>Open: 45%</Text>
              <Text style={styles.performanceMetric}>Click: 28%</Text>
              <Text style={styles.performanceMetric}>Reply: 12%</Text>
            </View>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceName}>Enterprise Outreach</Text>
            <View style={styles.performanceMetrics}>
              <Text style={styles.performanceMetric}>Open: 38%</Text>
              <Text style={styles.performanceMetric}>Click: 22%</Text>
              <Text style={styles.performanceMetric}>Reply: 9%</Text>
            </View>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceName}>Follow-up Campaign</Text>
            <View style={styles.performanceMetrics}>
              <Text style={styles.performanceMetric}>Open: 57%</Text>
              <Text style={styles.performanceMetric}>Click: 35%</Text>
              <Text style={styles.performanceMetric}>Reply: 16%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Best Sending Times</Text>
        <View style={styles.timeSlots}>
          <View style={styles.timeSlot}>
            <View style={styles.timeInfo}>
              <Clock size={20} color="#007AFF" />
              <Text style={styles.timeLabel}>Tuesday 10 AM</Text>
            </View>
            <Text style={styles.timeRate}>48% open rate</Text>
          </View>
          <View style={styles.timeSlot}>
            <View style={styles.timeInfo}>
              <Clock size={20} color="#007AFF" />
              <Text style={styles.timeLabel}>Thursday 2 PM</Text>
            </View>
            <Text style={styles.timeRate}>45% open rate</Text>
          </View>
          <View style={styles.timeSlot}>
            <View style={styles.timeInfo}>
              <Clock size={20} color="#007AFF" />
              <Text style={styles.timeLabel}>Wednesday 9 AM</Text>
            </View>
            <Text style={styles.timeRate}>42% open rate</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cold Email Settings</Text>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Email Features</Text>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>AI Email Writing</Text>
            <Text style={styles.settingDescription}>Generate personalized emails with AI</Text>
          </View>
          <Switch value={aiWriting} onValueChange={setAiWriting} />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Auto Follow-up</Text>
            <Text style={styles.settingDescription}>Automatically send follow-up emails</Text>
          </View>
          <Switch value={autoFollowUp} onValueChange={setAutoFollowUp} />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Track Opens & Clicks</Text>
            <Text style={styles.settingDescription}>Monitor email engagement</Text>
          </View>
          <Switch value={trackOpens} onValueChange={setTrackOpens} />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Sending Settings</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Daily send limit</Text>
          <TextInput
            style={styles.input}
            placeholder="500"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
          <Text style={styles.inputHint}>Recommended: 200-500 per day to maintain deliverability</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Time between emails (seconds)</Text>
          <TextInput
            style={styles.input}
            placeholder="30"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Follow-up delay (days)</Text>
          <TextInput
            style={styles.input}
            placeholder="3"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Max follow-ups</Text>
          <TextInput
            style={styles.input}
            placeholder="3"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Email Configuration</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>From Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>From Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@company.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Reply-to Email</Text>
          <TextInput
            style={styles.input}
            placeholder="reply@company.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Signature</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Best regards,&#10;Your Name&#10;Company Name"
            multiline
            numberOfLines={4}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Compliance</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Unsubscribe Link</Text>
          <TextInput
            style={styles.input}
            placeholder="https://yourcompany.com/unsubscribe"
            autoCapitalize="none"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Company Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="123 Main St, City, State, ZIP"
            multiline
            numberOfLines={2}
            placeholderTextColor="#8E8E93"
          />
          <Text style={styles.inputHint}>Required by CAN-SPAM Act</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const getStatusColor = (status: CampaignStatus): string => {
    switch (status) {
      case 'sending':
        return '#34C759';
      case 'scheduled':
        return '#007AFF';
      case 'completed':
        return '#8E8E93';
      case 'paused':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Cold Email',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }}
      />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'campaigns' && styles.activeTab]}
          onPress={() => setActiveTab('campaigns')}
        >
          <Mail size={20} color={activeTab === 'campaigns' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'campaigns' && styles.activeTabText]}>
            Campaigns
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'templates' && styles.activeTab]}
          onPress={() => setActiveTab('templates')}
        >
          <FileText size={20} color={activeTab === 'templates' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>
            Templates
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <ChartBar size={20} color={activeTab === 'analytics' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
            Analytics
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Settings size={20} color={activeTab === 'settings' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500' as const,
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  campaignInfo: {
    flex: 1,
    marginRight: 12,
  },
  campaignName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 4,
  },
  campaignSubject: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 4,
  },
  campaignDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  campaignActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  templateHeader: {
    marginBottom: 16,
  },
  templateInfo: {
    gap: 8,
  },
  templateTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#3C3C43',
    fontWeight: '500' as const,
  },
  templateContent: {
    marginBottom: 16,
  },
  templateLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 8,
    marginTop: 8,
  },
  templateSubject: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
  },
  templateBody: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
  templateStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  templateStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  templateStatText: {
    fontSize: 14,
    color: '#3C3C43',
    fontWeight: '500' as const,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  aiButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  aiButtonText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  analyticsCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  analyticsValue: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#000',
    marginTop: 12,
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  analyticsChange: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500' as const,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 16,
  },
  performanceList: {
    gap: 16,
  },
  performanceItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  performanceName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 8,
  },
  performanceMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  performanceMetric: {
    fontSize: 14,
    color: '#3C3C43',
  },
  timeSlots: {
    gap: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000',
  },
  timeRate: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500' as const,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  settingsGroupTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
