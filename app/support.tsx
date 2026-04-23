 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, Book, Video, Search, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function SupportScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: theme.colors.primary,
      available: true,
      responseTime: 'Usually responds in 2-5 minutes',
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      color: theme.colors.success,
      available: true,
      responseTime: 'Usually responds within 24 hours',
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: Phone,
      color: theme.colors.warning,
      available: false,
      responseTime: 'Available Mon-Fri 9AM-6PM EST',
    },
  ];

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        'How do I create my first campaign?',
        'Setting up your account',
        'Understanding the dashboard',
        'Connecting your social media accounts',
      ],
    },
    {
      id: 'automation',
      title: 'Automation & Workflows',
      icon: '⚡',
      questions: [
        'Creating your first workflow',
        'Setting up triggers and actions',
        'Troubleshooting workflow issues',
        'Best practices for automation',
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: '📊',
      questions: [
        'Understanding your analytics dashboard',
        'Exporting reports',
        'Setting up custom metrics',
        'Tracking ROI and conversions',
      ],
    },
    {
      id: 'billing',
      title: 'Billing & Subscriptions',
      icon: '💳',
      questions: [
        'Changing your subscription plan',
        'Understanding billing cycles',
        'Refund and cancellation policy',
        'Adding payment methods',
      ],
    },
  ];

  const resources = [
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: Book,
      color: theme.colors.primary,
    },
    {
      id: 'video-tutorials',
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: Video,
      color: theme.colors.error,
    },
    {
      id: 'community',
      title: 'Community Forum',
      description: 'Connect with other users and experts',
      icon: MessageCircle,
      color: theme.colors.success,
    },
  ];

  const recentTickets = [
    {
      id: 'T-001',
      subject: 'Workflow not triggering properly',
      status: 'Open',
      priority: 'High',
      created: '2024-01-15T10:30:00Z',
      lastUpdate: '2024-01-15T14:20:00Z',
    },
    {
      id: 'T-002',
      subject: 'Question about analytics data',
      status: 'Resolved',
      priority: 'Medium',
      created: '2024-01-14T16:45:00Z',
      lastUpdate: '2024-01-15T09:15:00Z',
    },
    {
      id: 'T-003',
      subject: 'Billing inquiry',
      status: 'In Progress',
      priority: 'Low',
      created: '2024-01-13T11:20:00Z',
      lastUpdate: '2024-01-14T15:30:00Z',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return theme.colors.error;
      case 'in progress': return theme.colors.warning;
      case 'resolved': return theme.colors.success;
      default: return theme.colors.secondaryText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.secondaryText;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <HelpCircle size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>How can we help?</Text>
          </View>
          <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Get the support you need to make the most of our platform
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.searchInput, { borderColor: theme.colors.border }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Search for help articles..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Support</Text>
          
          <View style={styles.supportOptions}>
            {supportOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.supportOption,
                    {
                      borderColor: theme.colors.border,
                      opacity: option.available ? 1 : 0.6,
                    },
                  ]}
                  disabled={!option.available}
                >
                  <View style={styles.optionInfo}>
                    <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                      <IconComponent size={24} color={option.color} />
                    </View>
                    <View style={styles.optionDetails}>
                      <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
                        {option.title}
                      </Text>
                      <Text style={[styles.optionDescription, { color: theme.colors.secondaryText }]}>
                        {option.description}
                      </Text>
                      <Text style={[styles.responseTime, { color: theme.colors.secondaryText }]}>
                        {option.responseTime}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Frequently Asked Questions</Text>
          
          <View style={styles.faqCategories}>
            {faqCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.faqCategory, { borderColor: theme.colors.border }]}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[styles.categoryTitle, { color: theme.colors.text }]}>
                    {category.title}
                  </Text>
                  <ChevronRight size={20} color={theme.colors.secondaryText} />
                </View>
                <View style={styles.questionsList}>
                  {category.questions.slice(0, 2).map((question, index) => (
                    <Text key={index} style={[styles.questionText, { color: theme.colors.secondaryText }]}>
                      • {question}
                    </Text>
                  ))}
                  {category.questions.length > 2 && (
                    <Text style={[styles.moreQuestions, { color: theme.colors.primary }]}>
                      +{category.questions.length - 2} more questions
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resources</Text>
          
          <View style={styles.resourcesList}>
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <TouchableOpacity
                  key={resource.id}
                  style={[styles.resourceCard, { borderColor: theme.colors.border }]}
                >
                  <View style={[styles.resourceIcon, { backgroundColor: `${resource.color}20` }]}>
                    <IconComponent size={24} color={resource.color} />
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={[styles.resourceTitle, { color: theme.colors.text }]}>
                      {resource.title}
                    </Text>
                    <Text style={[styles.resourceDescription, { color: theme.colors.secondaryText }]}>
                      {resource.description}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Support Tickets</Text>
          
          <View style={styles.ticketsList}>
            {recentTickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={[styles.ticketCard, { borderColor: theme.colors.border }]}
              >
                <View style={styles.ticketHeader}>
                  <Text style={[styles.ticketId, { color: theme.colors.primary }]}>
                    {ticket.id}
                  </Text>
                  <View style={styles.ticketBadges}>
                    <View 
                      style={[
                        styles.statusBadge, 
                        { backgroundColor: getStatusColor(ticket.status) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{ticket.status}</Text>
                    </View>
                    <View 
                      style={[
                        styles.priorityBadge, 
                        { backgroundColor: getPriorityColor(ticket.priority) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{ticket.priority}</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={[styles.ticketSubject, { color: theme.colors.text }]}>
                  {ticket.subject}
                </Text>
                
                <View style={styles.ticketMeta}>
                  <Text style={[styles.ticketDate, { color: theme.colors.secondaryText }]}>
                    Created: {new Date(ticket.created).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.ticketDate, { color: theme.colors.secondaryText }]}>
                    Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <MessageCircle size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Still need help?</Text>
          </View>
          
          <Text style={[styles.helpText, { color: theme.colors.secondaryText }]}>
            Can&apos;t find what you&apos;re looking for? Our support team is here to help you succeed.
          </Text>
          
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}
          >
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Start a Conversation</Text>
          </TouchableOpacity>
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
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  supportOptions: {
    gap: 12,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  responseTime: {
    fontSize: 12,
  },
  faqCategories: {
    gap: 16,
  },
  faqCategory: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  questionsList: {
    gap: 6,
  },
  questionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  moreQuestions: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  resourcesList: {
    gap: 12,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
  },
  ticketsList: {
    gap: 12,
  },
  ticketCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 14,
    fontWeight: '600',
  },
  ticketBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  ticketMeta: {
    gap: 4,
  },
  ticketDate: {
    fontSize: 12,
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});