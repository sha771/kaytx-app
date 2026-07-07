import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Conversation {
  id: string;
  customerName: string;
  channel: string;
  intent: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated' | 'happy';
  assignedAgent: string;
  status: 'resolved' | 'in_progress' | 'escalated';
  duration: string;
}

interface ConversationMonitorProps {
  conversations: Conversation[];
}

export default function ConversationMonitor({ conversations }: ConversationMonitorProps) {
  const { theme } = useTheme();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#10B981';
      case 'neutral': return '#F59E0B';
      case 'negative': return '#EF4444';
      case 'frustrated': return '#DC2626';
      case 'happy': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return '#22C55E';
      case 'in_progress': return '#F59E0B';
      case 'escalated': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved': return 'Resolved';
      case 'in_progress': return 'In Progress';
      case 'escalated': return 'Escalated';
      default: return status;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'chat': return '💬';
      case 'email': return '📧';
      case 'whatsapp': return '📱';
      case 'phone': return '📞';
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      default: return '💬';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Live Conversation Monitor
      </Text>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {conversations.map((conversation) => (
          <View 
            key={conversation.id}
            style={[styles.conversationCard, { 
              backgroundColor: 'rgba(11, 15, 20, 0.6)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              borderWidth: 1
            }]}
          >
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.customerInfo}>
                <Text style={[styles.customerName, { color: '#FFFFFF' }]}>
                  {conversation.customerName}
                </Text>
                <View style={styles.channelRow}>
                  <Text style={styles.channelIcon}>{getChannelIcon(conversation.channel)}</Text>
                  <Text style={[styles.channelText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {conversation.channel}
                  </Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: `${getStatusColor(conversation.status)}20`, borderColor: `${getStatusColor(conversation.status)}40`, borderWidth: 1 }
              ]}>
                <Text style={[styles.statusText, { color: getStatusColor(conversation.status) }]}>
                  {getStatusLabel(conversation.status)}
                </Text>
              </View>
            </View>

            {/* Intent & Sentiment */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Intent
                </Text>
                <Text style={[styles.detailValue, { color: '#FFFFFF' }]}>
                  {conversation.intent}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Sentiment
                </Text>
                <View style={styles.sentimentRow}>
                  <View style={[styles.sentimentDot, { backgroundColor: getSentimentColor(conversation.sentiment) }]} />
                  <Text style={[styles.sentimentText, { color: '#FFFFFF' }]}>
                    {conversation.sentiment}
                  </Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Duration
                </Text>
                <Text style={[styles.detailValue, { color: '#FFFFFF' }]}>
                  {conversation.duration}
                </Text>
              </View>
            </View>

            {/* Agent Assignment */}
            <View style={[styles.agentRow, { borderTopColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Text style={[styles.agentLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                Assigned to: <Text style={[styles.agentName, { color: '#10B981' }]}>
                  {conversation.assignedAgent}
                </Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    maxHeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  conversationCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  channelText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 10,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  sentimentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  sentimentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  agentLabel: {
    fontSize: 11,
  },
  agentName: {
    fontWeight: '600',
  },
});