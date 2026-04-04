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
import { Phone, Users, Clock, TrendingUp, Settings, Play, Pause, BarChart3, FileText, Calendar } from 'lucide-react-native';

type CallStatus = 'idle' | 'calling' | 'paused' | 'completed';
type CallOutcome = 'answered' | 'voicemail' | 'no-answer' | 'busy' | 'interested' | 'not-interested';

interface ColdCallCampaign {
  id: string;
  name: string;
  status: CallStatus;
  totalCalls: number;
  completed: number;
  connected: number;
  interested: number;
  scheduled: Date;
}

interface CallScript {
  id: string;
  name: string;
  opening: string;
  pitch: string;
  objectionHandling: string[];
  closing: string;
}

export default function ColdCallingScreen() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'scripts' | 'analytics' | 'settings'>('campaigns');
  const [autoDialer, setAutoDialer] = useState(false);
  const [callRecording, setCallRecording] = useState(true);
  const [aiAssistance, setAiAssistance] = useState(true);

  const campaigns: ColdCallCampaign[] = [
    {
      id: '1',
      name: 'Q1 Enterprise Outreach',
      status: 'calling',
      totalCalls: 500,
      completed: 234,
      connected: 89,
      interested: 23,
      scheduled: new Date('2025-01-15'),
    },
    {
      id: '2',
      name: 'SMB Product Launch',
      status: 'paused',
      totalCalls: 300,
      completed: 145,
      connected: 52,
      interested: 18,
      scheduled: new Date('2025-01-20'),
    },
    {
      id: '3',
      name: 'Follow-up Campaign',
      status: 'idle',
      totalCalls: 150,
      completed: 0,
      connected: 0,
      interested: 0,
      scheduled: new Date('2025-01-25'),
    },
  ];

  const scripts: CallScript[] = [
    {
      id: '1',
      name: 'Enterprise Sales Script',
      opening: 'Hi [Name], this is [Your Name] from [Company]. How are you today?',
      pitch: 'I wanted to reach out because we help companies like yours increase productivity by 40% through our unified communication platform.',
      objectionHandling: [
        'Not interested: I understand. Can I ask what communication challenges you\'re currently facing?',
        'Too busy: I appreciate that. Would a 5-minute call next week work better?',
        'Already have solution: That\'s great! How is it working for you? Many of our clients switched from [competitor].',
      ],
      closing: 'Would you be open to a 15-minute demo next week to see how we can help?',
    },
    {
      id: '2',
      name: 'SMB Quick Pitch',
      opening: 'Hi [Name], I\'m [Your Name] calling from [Company]. Do you have 2 minutes?',
      pitch: 'We help small businesses save 20+ hours per week by automating their customer communications.',
      objectionHandling: [
        'Send email: Absolutely! Can I ask one quick question first?',
        'Not decision maker: Who would be the best person to speak with about communication tools?',
      ],
      closing: 'Can I send you a quick video showing how it works?',
    },
  ];

  const renderCampaigns = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Campaigns</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ New Campaign</Text>
        </TouchableOpacity>
      </View>

      {campaigns.map((campaign) => (
        <View key={campaign.id} style={styles.campaignCard}>
          <View style={styles.campaignHeader}>
            <View>
              <Text style={styles.campaignName}>{campaign.name}</Text>
              <Text style={styles.campaignDate}>
                Scheduled: {campaign.scheduled.toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{campaign.status}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{campaign.completed}/{campaign.totalCalls}</Text>
              <Text style={styles.statLabel}>Calls Made</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{campaign.connected}</Text>
              <Text style={styles.statLabel}>Connected</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{campaign.interested}</Text>
              <Text style={styles.statLabel}>Interested</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {campaign.connected > 0 ? Math.round((campaign.connected / campaign.completed) * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>Connect Rate</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(campaign.completed / campaign.totalCalls) * 100}%` },
              ]}
            />
          </View>

          <View style={styles.campaignActions}>
            {campaign.status === 'calling' ? (
              <TouchableOpacity style={styles.actionButton}>
                <Pause size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.actionButton}>
                <Play size={16} color="#fff" />
                <Text style={styles.actionButtonText}>Start</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.secondaryButton}>
              <BarChart3 size={16} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderScripts = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Call Scripts</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>+ New Script</Text>
        </TouchableOpacity>
      </View>

      {scripts.map((script) => (
        <View key={script.id} style={styles.scriptCard}>
          <View style={styles.scriptHeader}>
            <FileText size={24} color="#007AFF" />
            <Text style={styles.scriptName}>{script.name}</Text>
          </View>

          <View style={styles.scriptSection}>
            <Text style={styles.scriptLabel}>Opening:</Text>
            <Text style={styles.scriptText}>{script.opening}</Text>
          </View>

          <View style={styles.scriptSection}>
            <Text style={styles.scriptLabel}>Pitch:</Text>
            <Text style={styles.scriptText}>{script.pitch}</Text>
          </View>

          <View style={styles.scriptSection}>
            <Text style={styles.scriptLabel}>Objection Handling:</Text>
            {script.objectionHandling.map((objection, index) => (
              <Text key={index} style={styles.scriptText}>• {objection}</Text>
            ))}
          </View>

          <View style={styles.scriptSection}>
            <Text style={styles.scriptLabel}>Closing:</Text>
            <Text style={styles.scriptText}>{script.closing}</Text>
          </View>

          <View style={styles.scriptActions}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Use in Campaign</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Call Analytics</Text>

      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsCard}>
          <Phone size={32} color="#007AFF" />
          <Text style={styles.analyticsValue}>1,234</Text>
          <Text style={styles.analyticsLabel}>Total Calls</Text>
          <Text style={styles.analyticsChange}>+12% vs last week</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Users size={32} color="#34C759" />
          <Text style={styles.analyticsValue}>456</Text>
          <Text style={styles.analyticsLabel}>Connected</Text>
          <Text style={styles.analyticsChange}>37% connect rate</Text>
        </View>

        <View style={styles.analyticsCard}>
          <TrendingUp size={32} color="#FF9500" />
          <Text style={styles.analyticsValue}>89</Text>
          <Text style={styles.analyticsLabel}>Interested</Text>
          <Text style={styles.analyticsChange}>19.5% interest rate</Text>
        </View>

        <View style={styles.analyticsCard}>
          <Calendar size={32} color="#5856D6" />
          <Text style={styles.analyticsValue}>34</Text>
          <Text style={styles.analyticsLabel}>Meetings Booked</Text>
          <Text style={styles.analyticsChange}>38% conversion</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Call Outcomes</Text>
        <View style={styles.outcomeList}>
          <View style={styles.outcomeItem}>
            <View style={[styles.outcomeBar, { width: '45%', backgroundColor: '#34C759' }]} />
            <Text style={styles.outcomeLabel}>Answered (45%)</Text>
          </View>
          <View style={styles.outcomeItem}>
            <View style={[styles.outcomeBar, { width: '30%', backgroundColor: '#FF9500' }]} />
            <Text style={styles.outcomeLabel}>Voicemail (30%)</Text>
          </View>
          <View style={styles.outcomeItem}>
            <View style={[styles.outcomeBar, { width: '15%', backgroundColor: '#FF3B30' }]} />
            <Text style={styles.outcomeLabel}>No Answer (15%)</Text>
          </View>
          <View style={styles.outcomeItem}>
            <View style={[styles.outcomeBar, { width: '10%', backgroundColor: '#8E8E93' }]} />
            <Text style={styles.outcomeLabel}>Busy (10%)</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Best Calling Times</Text>
        <View style={styles.timeSlots}>
          <View style={styles.timeSlot}>
            <Text style={styles.timeLabel}>9-11 AM</Text>
            <Text style={styles.timeRate}>42% connect rate</Text>
          </View>
          <View style={styles.timeSlot}>
            <Text style={styles.timeLabel}>2-4 PM</Text>
            <Text style={styles.timeRate}>38% connect rate</Text>
          </View>
          <View style={styles.timeSlot}>
            <Text style={styles.timeLabel}>4-6 PM</Text>
            <Text style={styles.timeRate}>35% connect rate</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cold Calling Settings</Text>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Dialer Settings</Text>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Auto Dialer</Text>
            <Text style={styles.settingDescription}>Automatically dial next number</Text>
          </View>
          <Switch value={autoDialer} onValueChange={setAutoDialer} />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Call Recording</Text>
            <Text style={styles.settingDescription}>Record all calls for training</Text>
          </View>
          <Switch value={callRecording} onValueChange={setCallRecording} />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>AI Call Assistance</Text>
            <Text style={styles.settingDescription}>Real-time suggestions during calls</Text>
          </View>
          <Switch value={aiAssistance} onValueChange={setAiAssistance} />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Call Timing</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Calls per hour</Text>
          <TextInput
            style={styles.input}
            placeholder="30"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Time between calls (seconds)</Text>
          <TextInput
            style={styles.input}
            placeholder="60"
            keyboardType="number-pad"
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Working hours</Text>
          <View style={styles.timeRange}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="9:00 AM"
              placeholderTextColor="#8E8E93"
            />
            <Text style={styles.timeSeparator}>to</Text>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="5:00 PM"
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsGroupTitle}>Compliance</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Do Not Call List</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload DNC List</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Call Recording Disclaimer</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="This call may be recorded for quality assurance..."
            multiline
            numberOfLines={3}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Cold Calling',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
        }}
      />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'campaigns' && styles.activeTab]}
          onPress={() => setActiveTab('campaigns')}
        >
          <Phone size={20} color={activeTab === 'campaigns' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'campaigns' && styles.activeTabText]}>
            Campaigns
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'scripts' && styles.activeTab]}
          onPress={() => setActiveTab('scripts')}
        >
          <FileText size={20} color={activeTab === 'scripts' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'scripts' && styles.activeTabText]}>
            Scripts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <BarChart3 size={20} color={activeTab === 'analytics' ? '#007AFF' : '#8E8E93'} />
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
        {activeTab === 'scripts' && renderScripts()}
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
  campaignName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 4,
  },
  campaignDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    backgroundColor: '#34C759',
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
    fontSize: 20,
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
  scriptCard: {
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
  scriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  scriptName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
  },
  scriptSection: {
    marginBottom: 16,
  },
  scriptLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 8,
  },
  scriptText: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
    marginBottom: 4,
  },
  scriptActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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
  outcomeList: {
    gap: 12,
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  outcomeBar: {
    height: 24,
    borderRadius: 4,
  },
  outcomeLabel: {
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
    height: 80,
    textAlignVertical: 'top',
  },
  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeInput: {
    flex: 1,
  },
  timeSeparator: {
    fontSize: 16,
    color: '#8E8E93',
  },
  uploadButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600' as const,
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
