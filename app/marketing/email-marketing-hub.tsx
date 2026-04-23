 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Mail, Send, Users, BarChart3, Settings, Plus, Search, Filter, Calendar, Target, Eye } from 'lucide-react-native';

interface EmailCampaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'sent' | 'active';
  recipients: number;
  openRate: number;
  clickRate: number;
  sentDate?: string;
  scheduledDate?: string;
}

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Welcome Series - New Users',
    status: 'active',
    recipients: 1250,
    openRate: 24.5,
    clickRate: 3.8,
    sentDate: '2024-01-14'
  },
  {
    id: '2',
    name: 'Product Launch Announcement',
    status: 'scheduled',
    recipients: 5600,
    openRate: 0,
    clickRate: 0,
    scheduledDate: '2024-01-16'
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    status: 'sent',
    recipients: 3200,
    openRate: 31.2,
    clickRate: 5.4,
    sentDate: '2024-01-10'
  },
  {
    id: '4',
    name: 'Holiday Sale Campaign',
    status: 'draft',
    recipients: 0,
    openRate: 0,
    clickRate: 0
  }
];

interface EmailTemplate {
  id: string;
  name: string;
  category: 'welcome' | 'promotional' | 'newsletter' | 'transactional';
  description: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    category: 'welcome',
    description: 'Onboard new subscribers with a warm welcome'
  },
  {
    id: '2',
    name: 'Product Promotion',
    category: 'promotional',
    description: 'Showcase your latest products and offers'
  },
  {
    id: '3',
    name: 'Weekly Newsletter',
    category: 'newsletter',
    description: 'Keep your audience updated with news and insights'
  },
  {
    id: '4',
    name: 'Order Confirmation',
    category: 'transactional',
    description: 'Confirm customer orders and provide details'
  }
];

export default function EmailMarketingHubScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getStatusColor = (status: EmailCampaign['status']) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'sent': return '#6B7280';
      case 'draft': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: EmailCampaign['status']) => {
    switch (status) {
      case 'active': return 'Active';
      case 'scheduled': return 'Scheduled';
      case 'sent': return 'Sent';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  const getCategoryColor = (category: EmailTemplate['category']) => {
    switch (category) {
      case 'welcome': return '#3B82F6';
      case 'promotional': return '#10B981';
      case 'newsletter': return '#F59E0B';
      case 'transactional': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Email Marketing Hub',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search campaigns..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Create Campaign</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Mail size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Total Campaigns</Text>
          </View>
          
          <View style={styles.statCard}>
            <Send size={24} color="#10B981" />
            <Text style={styles.statNumber}>10,050</Text>
            <Text style={styles.statLabel}>Emails Sent</Text>
          </View>
          
          <View style={styles.statCard}>
            <Eye size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>27.9%</Text>
            <Text style={styles.statLabel}>Avg Open Rate</Text>
          </View>
          
          <View style={styles.statCard}>
            <Target size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>4.6%</Text>
            <Text style={styles.statLabel}>Avg Click Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Campaigns</Text>
          
          {mockCampaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <View style={styles.campaignInfo}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(campaign.status)}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.campaignStats}>
                <View style={styles.statItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.statText}>{campaign.recipients.toLocaleString()} recipients</Text>
                </View>
                
                {campaign.status !== 'draft' && (
                  <>
                    <View style={styles.statItem}>
                      <Eye size={16} color="#6B7280" />
                      <Text style={styles.statText}>{campaign.openRate}% open rate</Text>
                    </View>
                    
                    <View style={styles.statItem}>
                      <Target size={16} color="#6B7280" />
                      <Text style={styles.statText}>{campaign.clickRate}% click rate</Text>
                    </View>
                  </>
                )}
                
                {campaign.sentDate && (
                  <View style={styles.statItem}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.statText}>Sent: {campaign.sentDate}</Text>
                  </View>
                )}
                
                {campaign.scheduledDate && (
                  <View style={styles.statItem}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.statText}>Scheduled: {campaign.scheduledDate}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.campaignActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <BarChart3 size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Analytics</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Mail size={16} color="#10B981" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Templates</Text>
          
          <View style={styles.templateGrid}>
            {mockTemplates.map((template) => (
              <TouchableOpacity key={template.id} style={styles.templateCard}>
                <View style={[styles.templateIcon, { backgroundColor: getCategoryColor(template.category) }]}>
                  <Mail size={20} color="#FFFFFF" />
                </View>
                
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category.toUpperCase()}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                
                <TouchableOpacity style={styles.useTemplateButton}>
                  <Text style={styles.useTemplateText}>Use Template</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Mail size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Create Campaign</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Manage Lists</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <BarChart3 size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>View Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Email Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bestPractices}>
          <Text style={styles.sectionTitle}>Email Marketing Tips</Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Target size={20} color="#3B82F6" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Optimize Subject Lines</Text>
                <Text style={styles.tipDescription}>
                  Keep subject lines under 50 characters for better mobile visibility
                </Text>
              </View>
            </View>
            
            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Users size={20} color="#10B981" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Segment Your Audience</Text>
                <Text style={styles.tipDescription}>
                  Personalized emails generate 6x higher transaction rates
                </Text>
              </View>
            </View>
            
            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Calendar size={20} color="#F59E0B" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Time Your Sends</Text>
                <Text style={styles.tipDescription}>
                  Tuesday-Thursday, 10 AM - 2 PM typically see highest engagement
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  campaignCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignHeader: {
    marginBottom: 12,
  },
  campaignInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  campaignStats: {
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  campaignActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  templateCategory: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  useTemplateButton: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  useTemplateText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  bestPractices: {
    marginBottom: 24,
  },
  tipsList: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});